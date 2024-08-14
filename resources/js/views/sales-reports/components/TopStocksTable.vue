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
            class="my-2 elevation-1"
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
    name: "TopStocksTable",
    computed: {
        ...mapState(["sales-reports/top-stocks"]),
        items() {
            return this["sales-reports/top-stocks"].data;
        },
    },
    data() {
        return {
            loading: false,
            options: {},
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
    watch: {
        options: {
            handler() {
                this.fetch();
            },
        },
        loading() {},
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            const {} = self.options;
            let data = {};
            this.$store
                .dispatch("sales-reports/top-stocks/get", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        search() {
            this.fetch({ ...this.options });
        },
        reload() {
            this.fetch();
        },
    },
};
</script>
