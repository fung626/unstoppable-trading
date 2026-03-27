<template>
    <div>
        <Dialog ref="dialog" />
        <CRow class="p-2">
            <CCol md="9" sm="9">
                <CInput
                    size="sm"
                    v-model="searchText"
                    v-on:keyup.enter="search"
                >
                    <template #prepend>
                        <CButton color="primary" size="sm" v-on:click="search">
                            <CIcon name="cil-magnifying-glass" size="sm" />
                        </CButton>
                    </template>
                </CInput>
            </CCol>
            <CCol md="3" sm="3" class="text-right">
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
            </CCol>
        </CRow>
        <v-data-table
            class="elevation-1"
            :page="page"
            :pageCount="pageCount"
            :headers="headers"
            :items="items"
            :options.sync="options"
            :server-items-length="serverItemsLength"
            :loading="loading"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            :footer-props="{
                disableItemsPerPage: disableItemsPerPage,
                disablePagination: disablePagination,
                showFirstLastPage: true,
                showCurrentPage: true,
                itemsPerPageOptions: [10, 20, 50, 100]
            }"
        >
            <template v-slot:[`item.key`]="{ item }">
                <v-edit-dialog
                    :return-value.sync="item.key"
                    :save-text="$t('button.confirm')"
                    :cancel-text="$t('button.cancel')"
                    large
                >
                    {{ item.key }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="item.key"
                            :label="$t('button.edit')"
                            single-line
                            counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>
            <template v-slot:[`item.value`]="{ item }">
                <v-edit-dialog
                    :return-value.sync="item.value"
                    :save-text="$t('button.confirm')"
                    :cancel-text="$t('button.cancel')"
                    large
                >
                    {{ item.value }}
                    <template v-slot:input>
                        <v-text-field
                            v-model="item.value"
                            :label="$t('button.edit')"
                            single-line
                            counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
            </template>
            <template v-slot:[`item.created_at`]="{ item }">
                <div v-if="item.created_at">
                    {{ formatDate(item.created_at, "dddd, Do MMMM YYYY") }}
                </div>
            </template>
            <template v-slot:[`item.updated_at`]="{ item }">
                <div v-if="item.updated_at">
                    {{ formatDate(item.updated_at, "dddd, Do MMMM YYYY") }}
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
import { v4 as uuidv4 } from "uuid";

export default {
    name: "GoodsContentTable",
    props: {
        goodsId: null
    },
    components: {
        Dialog
    },
    data() {
        return {
            searchText: null,
            page: 1,
            serverItemsLength: 0,
            pageCount: 0,
            items: [],
            loading: false,
            options: {},
            sortBy: "key",
            sortDesc: false,
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { text: this.$t("contentkey"), value: "key" },
                { text: this.$t("contentvalue"), value: "value" },
                { text: this.$t("updatedat"), value: "updated_at" },
                { text: this.$t("actions"), value: "actions", sortable: false }
            ]
        };
    },
    watch: {
        options: {
            handler() {
                this.fetch();
            }
        },
        loading() {
            this.disableItemsPerPage = this.loading;
            this.disablePagination = this.loading;
        }
    },
    methods: {
        fetch(reset = false) {
            let self = this;
            self.loading = true;
            const { page, itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                goods_id: self.goodsId,
                page: reset ? 1 : page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText
            };
            this.$store
                .dispatch("goods/content/get", data)
                .then(response => {
                    let res = response.data;
                    self.items = res.data;
                    self.serverItemsLength = res.total;
                    self.pageCount = res.last_page;
                    self.page = res.current_page;
                    self.loading = false;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        search() {
            this.fetch(true);
        },
        add() {
            this.items = [
                ...this.items,
                { ...goodsDefaults.content.remote, id: uuidv4() }
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
                extension: "pdf"
            };
            this.$store
                .dispatch("goods/content/export", data)
                .then(response => {
                    self.loading = false;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        reload() {
            this.fetch();
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
                        let index = self.items.findIndex(obj => {
                            return obj.id === item.id;
                        });
                        this.$store
                            .dispatch("goods/content/update", data)
                            .then(response => {
                                self.loading = false;
                                self.items[index] = response.data.data;
                            })
                            .catch(error => {
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
                            let tempItems = self.items.filter(obj => {
                                if (obj.id) {
                                    return obj.id !== item.id;
                                }
                                return true;
                            });
                            self.items = tempItems;
                        } else {
                            self.loading = true;
                            this.$store
                                .dispatch("goods/content/delete", {
                                    id: item.id
                                })
                                .then(response => {
                                    self.loading = false;
                                    self.fetch();
                                })
                                .catch(error => {
                                    self.loading = false;
                                });
                        }
                    }
                    break;
            }
            // console.log(id, key);
        }
    }
};
</script>
