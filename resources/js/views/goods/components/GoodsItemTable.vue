<template>
    <div>
        <Dialog ref="dialog" />
        <ShippingDialog ref="shippingDialog" />
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
        <v-data-table-server
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
            <template v-slot:[`item.cup`]="{ item }">
                <v-autocomplete
                    v-model="item.cup"
                    :items="goodsCups"
                    item-title="name"
                    item-value="name"
                    variant="plain"
                    hide-details
                ></v-autocomplete>
            </template>
            <template v-slot:[`item.color`]="{ item }">
                <v-autocomplete
                    v-model="item.color"
                    :items="goodsColors"
                    item-title="name"
                    item-value="name"
                    variant="plain"
                    hide-details
                ></v-autocomplete>
            </template>
            <template v-slot:[`item.size`]="{ item }">
                <v-autocomplete
                    v-model="item.size"
                    :items="goodsSizes"
                    item-title="name"
                    item-value="name"
                    variant="plain"
                    hide-details
                ></v-autocomplete>
            </template>
            <template v-slot:[`item.barcode`]="{ item }">
                <div
                    class="d-flex justify-content-center"
                    @dblclick.native="edit(item)"
                >
                    <input
                        v-if="item.isBarcodeEditing"
                        v-model="item.barcode"
                        :disabled="loading"
                        hide-details
                        variant="plain"
                        @blur="item.isBarcodeEditing = false"
                        @keydown.enter="item.isBarcodeEditing = false"
                    />
                    <vue-barcode
                        v-if="item.barcode && !item.isBarcodeEditing"
                        :value="item.barcode"
                        :options="{
                            format: 'CODE39',
                            height: 36,
                        }"
                    ></vue-barcode>
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
        </v-data-table-server>
    </div>
</template>
<script>
//
import { Dialog } from "@/components";
import { goodsColors, goodsCups, goodsDefaults, goodsSizes } from "@/constants";
import { v4 as uuidv4 } from "uuid";
import ShippingDialog from "./ShippingDialog.vue";

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
                sortBy: "cup",
                sortDesc: false,
            },
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { title: this.$t("cup"), value: "cup", sortable: true },
                { title: this.$t("color"), value: "color", sortable: true },
                { title: this.$t("size"), value: "size", sortable: true },
                { title: this.$t("barcode"), value: "barcode", sortable: true },
                {
                    title: this.$t("stock-unit"),
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
                goods_id: self.$props.goodsId,
                page: page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: null,
                search: search,
            };
            this.$store
                .dispatch("goods/items/get", data)
                .then((response) => {
                    let res = JSON.parse(JSON.stringify(response.data));
                    // self.headers = res.headers;
                    self.items = res.data.map((x) => {
                        return { ...x, isBarcodeEditing: false };
                    });

                    self.serverItemsLength = res.total;
                    self.pageCount = res.last_page;
                    self.page = res.current_page;
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        edit(item) {
            var index = 0;
            for (const x of this.items) {
                if (x.id === item.id) {
                    this.items[index].isBarcodeEditing =
                        !this.items[index].isBarcodeEditing;
                    break;
                }
                index++;
            }
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
                search: self.options.search,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/items/export", data)
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
                        /*let index = self.items.findIndex((obj) => {
                            return obj.id === item.id;
                        });*/
                        this.$store
                            .dispatch("goods/items/update", data)
                            .then((response) => {
                                self.loading = false;
                                self.fetch({ ...this.options });
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
                                .dispatch("goods/items/delete", { id: item.id })
                                .then((response) => {
                                    self.loading = false;
                                    self.fetch({ ...this.options });
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
