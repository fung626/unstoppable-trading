<template>
    <div>
        <Dialog ref="dialog" />
        <CRow class="p-2 mb-2 mt-4">
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
        <v-data-table
            class="elevation-1"
            :headers="headers"
            :items="items"
            :items-length="serverItemsLength"
            :search="search"
            :loading="loading"
            @update:options="fetch"
            :mobile="mobile"
            :footer-props="{
                disableItemsPerPage: disableItemsPerPage,
                disablePagination: disablePagination,
                showFirstLastPage: true,
                showCurrentPage: true,
                itemsPerPageOptions: [10, 20, 50, 100],
            }"
        >
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:[`item.status`]="{ item }">
                {{ $t(`shipping.status.${item.status}`) }}
            </template>
            <template v-slot:[`item.created_at`]="{ item }">
                {{ this.$formatDate(item.created_at) }}
            </template>
            <template v-slot:[`item.updated_at`]="{ item }">
                {{ this.$formatDate(item.updated_at) }}
            </template>
            <template v-slot:[`item.status_actions`]="{ item }">
                <CButtonGroup>
                    <CButton
                        v-for="action in item.status_actions"
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
        </v-data-table>
    </div>
</template>
<script>
//
import { Dialog } from "@/components";

export default {
    name: "ShippingTable",
    props: {
        clientId: null,
    },
    components: {
        Dialog,
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
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                {
                    title: this.$t("number"),
                    value: "generated_id",
                },
                {
                    title: `${this.$t("client")}${this.$t("number")}`,
                    value: "client_number",
                },
                {
                    title: `${this.$t("client")}${this.$t("name")}`,
                    value: "client_name",
                },
                {
                    title: `${this.$t("client")}${this.$t("contact")}`,
                    value: "client_contact",
                },
                {
                    title: `${this.$t("client")}${this.$t("phone")}`,
                    value: "formated_phone",
                    sortable: false,
                },
                {
                    title: `${this.$t("client")}${this.$t("address")}`,
                    value: "client_address",
                },
                {
                    title: `${this.$t("total-unit")}`,
                    value: "total_unit",
                    sortable: false,
                },
                {
                    title: `${this.$t("subtotal")}`,
                    value: "subtotal",
                    sortable: false,
                },
                {
                    title: `${this.$t("status")}`,
                    value: "status",
                    sortable: false,
                },
                { title: this.$t("updatedat"), value: "updated_at" },
                {
                    title: `${this.$t("status")}${this.$t("actions")}`,
                    value: "status_actions",
                    sortable: false,
                },
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
                client_id: self.$props.clientId,
                page: page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: null,
                search: search,
            };
            this.$store
                .dispatch("goods/shippings/get", data)
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
            this.$router.push({ path: "shippings/create" });
        },
        download() {
            let self = this;
            self.loading = true;
            const { itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                client_id: self.$props.clientId,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/shippings/export", data)
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
                case "UpdateStatus":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("alert.title"),
                            this.$t("alert.update")
                        )
                    ) {
                        let self = this;
                        if (self.loading) {
                            return;
                        }
                        self.loading = true;
                        this.$store
                            .dispatch("goods/shippings/update", {
                                id: item.id,
                                status: action.status,
                                type: "UPDATE",
                            })
                            .then((response) => {
                                self.loading = false;
                                self.fetch();
                            })
                            .catch((error) => {
                                self.loading = false;
                            });
                    }
                    break;
                case "RouterPush":
                    let route = action.route;
                    this.$router.push({
                        path: route,
                    });
                    break;
            }
            // console.log(id, key);
        },
    },
};
</script>

<style scoped>
.v-select {
    font-size: 1em;
    font-weight: 100;
}
</style>
