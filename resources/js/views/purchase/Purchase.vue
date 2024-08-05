<template>
    <div>
        <StockCalendar stockType="purchase" />
        <Dialog ref="dialog" />
        <CRow class="p-2">
            <CCol :md="9" :sm="9">
                <CInput
                    size="sm"
                    v-model="searchText"
                    v-on:keyup.enter="search"
                >
                    <template #prepend>
                        <CButton
                            color="primary"
                            size="sm"
                            v-on:click="search"
                            :disabled="loading"
                        >
                            <CIcon name="cil-magnifying-glass" size="sm" />
                        </CButton>
                    </template>
                </CInput>
            </CCol>
            <CCol :md="3" :sm="3" class="text-right">
                <CButtonGroup role="group">
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
        <v-data-table
            class="elevation-1"
            :footer-props="{
                disableItemsPerPage: disableItemsPerPage,
                disablePagination: disablePagination,
                showFirstLastPage: true,
                showCurrentPage: true,
                itemsPerPageOptions: [10, 20, 50, 100],
            }"
        >
            <template v-slot:[`item.status`]="{ item }">
                <div v-if="item.status">
                    {{ $t(`purchase.status.${item.status}`) }}
                </div>
            </template>
            <!-- <template v-slot:[`item.date`]="{ item }">
                <div v-if="item.date">
                    {{ item.date | moment("dddd, Do MMMM YYYY") }}
                </div>
            </template>
            <template v-slot:[`item.created_at`]="{ item }">
                {{ item.created_at | moment("dddd, Do MMMM YYYY") }}
            </template>
            <template v-slot:[`item.updated_at`]="{ item }">
                {{ item.updated_at | moment("dddd, Do MMMM YYYY") }}
            </template> -->
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
import { Dialog, StockCalendar } from "@/components";
import { mapState } from "vuex";

export default {
    name: "Purchase",
    components: {
        Dialog,
        StockCalendar,
    },
    computed: {
        ...mapState(["goods/purchase"]),
        serverItemsLength() {
            return this["goods/purchase"].data?.total;
        },
        pageCount() {
            return this["goods/purchase"].data?.last_page;
        },
        page() {
            return this["goods/purchase"].data?.current_page;
        },
        items() {
            return this["goods/purchase"].data?.data;
        },
    },
    data() {
        return {
            searchText: null,
            loading: false,
            options: {},
            sortBy: "supplier.name",
            sortDesc: false,
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { text: this.$t("number"), value: "generated_id" },
                { text: this.$t("supplier"), value: "supplier.name" },
                { text: this.$t("creator"), value: "users.name" },
                { text: this.$t("subtotal"), value: "subtotal" },
                { text: this.$t("status"), value: "status" },
                { text: this.$t("date"), value: "date" },
                { text: this.$t("updatedat"), value: "updated_at" },
                {
                    text: `${this.$t("status")}${this.$t("actions")}`,
                    value: "status_actions",
                },
                { text: this.$t("actions"), value: "actions", sortable: false },
            ],
        };
    },
    watch: {
        options: {
            handler() {
                this.fetch();
            },
        },
        loading() {
            this.disableItemsPerPage = this.loading;
            this.disablePagination = this.loading;
        },
    },
    methods: {
        fetch(reset = false) {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            const { page, itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                page: reset ? 1 : page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText,
            };
            this.$store
                .dispatch("goods/purchase/get", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        search() {
            this.fetch(true);
        },
        add() {
            this.$router.push({ name: "CreatePurchase" });
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
                .dispatch("goods/purchase/export", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        reload() {
            this.fetch();
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
                            .dispatch("goods/purchase/update", {
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
                    this.$router.push({
                        name: route,
                        params: { id: item.id },
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
                        self.loading = true;
                        this.$store
                            .dispatch("goods/purchase/delete", { id: item.id })
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
