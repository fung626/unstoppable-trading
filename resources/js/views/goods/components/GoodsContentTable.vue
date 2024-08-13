<template>
    <div>
        <Dialog ref="dialog" />
        <CRow class="p-2">
            <CCol md="9" sm="9">
                <CInputGroup class="mb-3">
                    <CButton color="primary" size="sm">
                        <CIcon name="cil-magnifying-glass" size="sm" />
                    </CButton>
                    <CFormInput size="sm" v-model="search" />
                </CInputGroup>
            </CCol>
            <CCol md="3" sm="3" class="text-right">
                <CButtonGroup>
                    <CButton
                        color="primary"
                        size="sm"
                        v-on:click="add"
                        :disabled="loading"
                    >
                        <CIcon name="cil-plus" size="sm" />
                    </CButton>
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
            <template v-slot:[`item.key`]="{ item }">
                <v-text-field
                    v-model="item.key"
                    :label="$t('key')"
                    single-line
                    variant="plain"
                    hide-details
                    counter
                ></v-text-field>
            </template>
            <template v-slot:[`item.value`]="{ item }">
                <v-text-field
                    v-model="item.value"
                    :label="$t('value')"
                    single-line
                    variant="plain"
                    hide-details
                    counter
                ></v-text-field>
            </template>
            <template v-slot:[`item.created_at`]="{ item }">
                <div v-if="item.created_at">
                    {{ this.$formatDate(item.created_at) }}
                </div>
            </template>
            <template v-slot:[`item.updated_at`]="{ item }">
                <div v-if="item.updated_at">
                    {{ this.$formatDate(item.updated_at) }}
                </div>
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
import { goodsDefaults } from "@/constants";
import { CButtonGroup } from "@coreui/vue";
import { v4 as uuidv4 } from "uuid";

export default {
    name: "GoodsContentTable",
    props: {
        goodsId: null,
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
                sortBy: "key",
                sortDesc: false,
            },
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { title: this.$t("contentkey"), value: "key" },
                { title: this.$t("contentvalue"), value: "value" },
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
                goods_id: self.goodsId,
                page: page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: null,
                search: search,
            };
            this.$store
                .dispatch("goods/contents/get", data)
                .then((response) => {
                    let res = response.data;
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
        search() {
            this.fetch({ ...this.options });
        },
        add() {
            this.items = [
                ...this.items,
                { ...goodsDefaults.content.remote, id: uuidv4() },
            ];
            this.serverItemsLength += 1;
        },
        download() {
            let self = this;
            self.loading = true;
            const { itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                goods_id: self.goodsId,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/contents/export", data)
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
                case "Update":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("button.confirm"),
                            this.$t("alert.update")
                        )
                    ) {
                        let self = this;
                        if (self.loading) {
                            return;
                        }
                        self.loading = true;
                        let data = { ...item, goods_id: self.goodsId };
                        let index = self.items.findIndex((obj) => {
                            return obj.id === item.id;
                        });
                        this.$store
                            .dispatch("goods/contents/update", data)
                            .then((response) => {
                                self.loading = false;
                                self.items[index] = response.data.data;
                            })
                            .catch((error) => {
                                self.loading = false;
                            });
                    }
                    break;
                case "Delete":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("button.confirm"),
                            this.$t("alert.delete")
                        )
                    ) {
                        let self = this;
                        if (self.loading) {
                            return;
                        }
                        if (item.updated === false) {
                            let tempItems = self.items.filter((obj) => {
                                if (obj.id) {
                                    return obj.id !== item.id;
                                }
                                return true;
                            });
                            self.items = tempItems;
                        } else {
                            self.loading = true;
                            this.$store
                                .dispatch("goods/contents/delete", {
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
                    }
                    break;
            }
            // console.log(id, key);
        },
    },
};
</script>
