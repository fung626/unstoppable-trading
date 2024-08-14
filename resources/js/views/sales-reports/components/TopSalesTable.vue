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
            :items-length="serverItemsLength"
            :search="search"
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
            items: [],
            page: 1,
            pageCount: 0,
            serverItemsLength: 0,
            options: {
                page: 1,
                itemsPerPage: 5,
                sortBy: null,
                sortDesc: false,
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
        window.addEventListener("resize", this.onResize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    },
    methods: {
        onResize() {
            this.mobile = window.innerWidth < 769;
        },
        fetch({ page, itemsPerPage, sortBy, search }) {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            self.options.page = page;
            self.options.itemsPerPage = itemsPerPage;
            self.options.sortBy = sortBy;
            let data = {
                page: page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: null,
                search: search,
            };
            this.$store
                .dispatch("sales-reports/top-sales/get", data)
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
