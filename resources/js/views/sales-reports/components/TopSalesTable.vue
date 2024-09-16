<template>
    <div>
        <CRow class="p-2">
            <CCol md="9" sm="9"> </CCol>
            <CCol md="3" sm="3" class="text-right">
                <CButton
                    color="primary"
                    size="sm"
                    v-on:click="reload"
                    :disabled="loading"
                >
                    <CIcon name="cil-reload" size="sm" />
                </CButton>
            </CCol>
        </CRow>
        <v-data-table
            :headers="headers"
            :items="items"
            :loading="loading"
            @update:options="fetch"
            :mobile="mobile"
            :hide-default-footer="true"
        >
        </v-data-table>
    </div>
</template>
<script>
//
import { mapState } from "vuex";

export default {
    name: "TopSalesTable",
    computed: {
        ...mapState(["sales-reports/top-sales"]),
        items() {
            return this["sales-reports/top-sales"].data;
        },
    },
    data() {
        return {
            search: null,
            loading: false,
            mobile: window.innerWidth < 769,
            options: {
                sortBy: null,
            },
            headers: [
                { title: this.$t("name"), value: "name", sortable: false },
                { title: this.$t("type"), value: "type", sortable: false },
                { title: this.$t("cup"), value: "cup", sortable: false },
                { title: this.$t("color"), value: "color", sortable: false },
                { title: this.$t("size"), value: "size", sortable: false },
                {
                    title: this.$t("unit"),
                    value: "unit",
                    sortable: false,
                },
            ],
        };
    },
    mounted() {
        // this.fetch({ ...this.options });
        window.addEventListener("resize", this.onResize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    },
    methods: {
        onResize() {
            this.mobile = window.innerWidth < 769;
        },
        fetch({ sortBy }) {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            self.options.sortBy = sortBy;
            let data = { sortBy: sortBy };
            this.$store
                .dispatch("sales-reports/top-sales/get", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        reload() {
            this.fetch({ ...this.options });
        },
    },
};
</script>
