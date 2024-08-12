<template>
    <div>
        <Dialog ref="dialog" />
        <ShippingDialog ref="shippingDialog" />
        <CRow class="p-2">
            <CCol md="9" sm="9">
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
                itemsPerPageOptions: [10, 20, 50, 100],
            }"
        >
            <template v-slot:[`item.cup`]="{ item }">
                <v-autocomplete
                    v-model="item.cup"
                    :items="goodsCups"
                    item-title="name"
                    item-value="name"
                    hide-details
                    rounded
                ></v-autocomplete>
            </template>
            <template v-slot:[`item.color`]="{ item }">
                <v-autocomplete
                    v-model="item.color"
                    :items="goodsColors"
                    item-title="name"
                    item-value="name"
                    hide-details
                    rounded
                ></v-autocomplete>
            </template>
            <template v-slot:[`item.size`]="{ item }">
                <v-autocomplete
                    v-model="item.size"
                    :items="goodsSizes"
                    item-title="name"
                    item-value="name"
                    hide-details
                    rounded
                ></v-autocomplete>
            </template>
            <template v-slot:[`item.barcode`]="{ item }">
                <v-edit-dialog
                    :return-value.sync="item.barcode"
                    :save-text="$t('button.confirm')"
                    :cancel-text="$t('button.cancel')"
                    large
                >
                    <barcode
                        v-if="item.barcode"
                        :value="item.barcode"
                        :options="{ format: 'CODE39', height: 32 }"
                    ></barcode>
                    <template v-slot:input>
                        <v-text-field
                            v-model="item.barcode"
                            :label="$t('button.edit')"
                            single-line
                            counter
                        ></v-text-field>
                    </template>
                </v-edit-dialog>
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
import { goodsColors, goodsCups, goodsDefaults, goodsSizes } from "@/constants";
import { v4 as uuidv4 } from "uuid";
import ShippingDialog from "./ShippingDialog";

export default {
    name: "GoodsItemTable",
    props: {
        goodsId: null,
    },
    components: {
        Dialog,
        ShippingDialog,
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
            sortBy: "cup",
            sortDesc: false,
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { title: this.$t("cup"), value: "cup" },
                { title: this.$t("color"), value: "color" },
                { title: this.$t("size"), value: "size" },
                { title: this.$t("barcode"), value: "barcode" },
                {
                    title: this.$t("stockunit"),
                    value: "stock_unit",
                    sortable: false,
                },
                { title: this.$t("updatedat"), value: "updated_at" },
                {
                    title: this.$t("actions"),
                    value: "actions",
                    sortable: false,
                },
            ],
            goodsCups: goodsCups,
            goodsColors: goodsColors,
            goodsSizes: goodsSizes,
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
            self.loading = true;
            const { page, itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                goods_id: self.$props.goodsId,
                page: reset ? 1 : page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText,
            };
            this.$store
                .dispatch("goods/item/get", data)
                .then((response) => {
                    let res = JSON.parse(JSON.stringify(response.data));
                    self.headers = res.headers;
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
            this.fetch(true);
        },
        add() {
            this.items = [
                ...this.items,
                { ...goodsDefaults.item.remote, id: uuidv4() },
            ];
            this.serverItemsLength += 1;
        },
        download() {
            let self = this;
            self.loading = true;
            const { itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                goods_id: self.$props.goodsId,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/item/export", data)
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
                            .dispatch("goods/item/update", data)
                            .then((response) => {
                                self.loading = false;
                                self.fetch();
                            })
                            .catch((error) => {
                                self.loading = false;
                            });
                    }
                    break;
                case "AddShipping":
                    await this.$refs.shippingDialog.open(
                        this.$t("alert.shipping"),
                        null,
                        item
                    );
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
                                .dispatch("goods/item/delete", { id: item.id })
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

<style scoped>
.v-select {
    font-size: 1em;
    font-weight: 100;
}
</style>
