<template>
    <div>
        <Dialog ref="dialog" />
        <CRow class="p-2">
            <CCol :md="10" :sm="10">
                <CInputGroup class="mb-3">
                    <CButton color="primary" size="sm">
                        <CIcon name="cil-magnifying-glass" size="sm" />
                    </CButton>
                    <CFormInput size="sm" v-model="search" />
                </CInputGroup>
            </CCol>
            <CCol :md="2" :sm="2" class="text-right">
                <CButtonGroup role="group">
                    <CButton color="primary" size="sm" v-on:click="add">
                        <CIcon name="cil-plus" size="sm" />
                    </CButton>
                    <CButton color="primary" size="sm" v-on:click="download">
                        <CIcon name="cil-cloud-download" size="sm" />
                    </CButton>
                    <CButton color="primary" size="sm" v-on:click="reload">
                        <CIcon name="cil-reload" size="sm" />
                    </CButton>
                </CButtonGroup>
            </CCol>
        </CRow>
        <v-data-table-server
            class="elevation-1"
            :headers="headers"
            :items="items"
            :items-length="serverItemsLength"
            :search="search"
            :loading="loading"
            @update:options="fetch"
            :mobile="mobile"
        >
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:[`item.created_at`]="{ item }">
                {{ this.$formatDate(item.created_at) }}
            </template>
            <template v-slot:[`item.updated_at`]="{ item }">
                {{ this.$formatDate(item.updated_at) }}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <CButtonGroup>
                    <CButton
                        v-for="action in item.actions"
                        :key="action.key"
                        :color="action.color"
                        :disabled="action.disabled"
                        size="sm"
                        @click="click(item, action)"
                    >
                        {{ action.title }}
                    </CButton>
                </CButtonGroup>
            </template>
        </v-data-table-server>
    </div>
</template>
<script>
//
import { Dialog } from "@/components";

export default {
    name: "Warehouses",
    components: {
        Dialog,
    },
    data() {
        return {
            search: null,
            loading: false,
            mobile: window.innerWidth < 769,
            items: [],
            pageCount: 0,
            serverItemsLength: 0,
            options: {
                page: 1,
                itemsPerPage: 10,
                sortBy: "sector",
            },
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { title: this.$t("sector"), value: "sector", sortable: true },
                { title: this.$t("shelf"), value: "shelf", sortable: true },
                { title: this.$t("segment"), value: "segment", sortable: true },
                {
                    title: this.$t("stock-unit"),
                    value: "stock_unit",
                    sortable: false,
                },
                { title: this.$t("description"), value: "description" },
                { title: this.$t("updatedat"), value: "updated_at" },
                {
                    title: this.$t("actions"),
                    value: "actions",
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
            self.loading = true;
            self.options.page = page;
            self.options.itemsPerPage = itemsPerPage;
            self.options.sortBy = sortBy;
            let data = {
                page: page,
                per_page: itemsPerPage,
                sort_by: sortBy,

                search: search,
            };
            this.$store
                .dispatch("goods/warehouses/get", data)
                .then((response) => {
                    let res = JSON.parse(JSON.stringify(response.data));
                    self.items = res.data;
                    self.serverItemsLength = res.total;
                    self.pageCount = res.last_page;
                    self.page = res.current_page;
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        add() {
            this.$router.push({ path: "warehouses/create" });
        },
        download() {
            let self = this;
            self.loading = true;
            const { itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/warehouses/export", data)
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
        async click(item, action) {
            let type = action.type;
            switch (type) {
                case "RouterPush":
                    let route = action.route;
                    this.$router.push({
                        path: route,
                    });
                    break;
                case "Delete":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("button.confirm"),
                            this.$t("alert.delete")
                        )
                    ) {
                        let self = this;
                        self.loading = true;
                        this.$store
                            .dispatch("goods/warehouses/delete", { id: id })
                            .then((response) => {
                                self.loading = false;
                                self.fetch({ ...this.options });
                            })
                            .catch((error) => {
                                self.loading = false;
                            });
                    }
                    break;
            }
            // console.log(id, key);
        },
    },
};
</script>
