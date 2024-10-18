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
                <CButtonGroup>
                    <CButton
                        color="primary"
                        size="sm"
                        v-on:click="download"
                        :disabled="loading"
                    >
                        <CIcon name="cil-cloud-download" size="sm" />
                    </CButton>
                    <CButton
                        color="primary"
                        size="sm"
                        v-on:click="reload"
                        :disabled="loading"
                    >
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
            hide-default-footer
        >
            <template v-slot:[`item.status`]="{ item }">
                <div v-if="item.status">
                    {{ $t(`purchase.status.${item.status}`) }}
                </div>
            </template>
            <template v-slot:[`item.date`]="{ item }">
                <div v-if="item.date">
                    {{ this.$formatDate(item.date) }}
                </div>
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
        </v-data-table-server>
    </div>
</template>

<script>
//
import { Dialog } from "@/components";
import { mapState } from "vuex";

export default {
    name: "PurchaseTable",
    components: {
        Dialog,
    },
    computed: {
        ...mapState(["goods/purchases"]),
        serverItemsLength() {
            return this["goods/purchases"].data?.total;
        },
        pageCount() {
            return this["goods/purchases"].data?.last_page;
        },
        page() {
            return this["goods/purchases"].data?.current_page;
        },
        items() {
            return this["goods/purchases"].data?.data;
        },
    },
    data() {
        return {
            search: null,
            loading: false,
            options: {},
            sortBy: "updated_at",
            sortDesc: true,
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { title: this.$t("number"), value: "generated_id" },
                { title: this.$t("supplier"), value: "supplier.name" },
                { title: this.$t("user"), value: "users.name" },
                { title: this.$t("subtotal"), value: "subtotal" },
                { title: this.$t("status"), value: "status" },
                { title: this.$t("date"), value: "date" },
                { title: this.$t("updatedat"), value: "updated_at" },
                {
                    text: `${this.$t("status")}${this.$t("actions")}`,
                    value: "status_actions",
                },
                {
                    title: this.$t("actions"),
                    value: "actions",
                    sortable: false,
                },
            ],
        };
    },
    methods: {
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

                search: search,
            };
            this.$store
                .dispatch("goods/purchases/get", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        download() {
            let self = this;
            if (self.loading) {
                return;
            }
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
                .dispatch("goods/purchases/export", data)
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
                            .dispatch("goods/purchases/update", {
                                id: item.id,
                                status: action.status,
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
                    // console.log(route);
                    this.$router.push({
                        path: route,
                    });
                    break;
                case "Delete":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("alert.title"),
                            this.$t("alert.delete")
                        )
                    ) {
                        let self = this;
                        if (self.loading) {
                            return;
                        }
                        this.$store
                            .dispatch("goods/purchases/delete", {
                                id: item.id,
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
            }
            // console.log(id, key);
        },
    },
};
</script>
