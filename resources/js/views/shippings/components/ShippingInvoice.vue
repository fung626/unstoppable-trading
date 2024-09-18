<template>
    <div>
        <Dialog ref="dialog" />
        <ShippingReturnDialog ref="ShippingReturnDialog" />
        <CCard
            ><v-progress-linear
                :active="loading"
                indeterminate
                color="cyan"
            ></v-progress-linear>
            <CCardBody>
                <CRow class="p-2">
                    <CCol class="text-right">
                        <CButtonGroup>
                            <CButton
                                color="primary"
                                size="sm"
                                v-on:click="exportPackingInfo"
                                :disabled="loading"
                            >
                                {{ $t("button.export") }}{{ $t("packing") }}
                            </CButton>
                            <CButton
                                color="primary"
                                size="sm"
                                v-on:click="exportMailerInfo"
                                :disabled="loading"
                            >
                                {{ $t("button.export") }}{{ $t("mailerinfo") }}
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
                <CRow class="p-2">
                    <CCol>
                        <img :src="logo" width="128" />
                    </CCol>
                    <CCol md="7" sm="7">
                        <h4>Unstoppable Trading Co. Ltd</h4>
                        <h4>永行貿易有限公司</h4>
                    </CCol>
                    <CCol class="text-right">
                        <h4>{{ $t("shipping.invoice") }}</h4>
                    </CCol>
                </CRow>
                <v-data-table
                    class="my-4 elevation-1 my-table"
                    :headers="table.header.headers"
                    :items="headerItems"
                    hide-default-footer
                    hide-default-header
                    :mobile-breakpoint="0"
                ></v-data-table>
                <CRow class="p-2">
                    <CCol>
                        <CInputGroup class="mb-3">
                            <CButton color="primary" size="sm">
                                <CIcon name="cil-magnifying-glass" size="sm" />
                            </CButton>
                            <CFormInput size="sm" v-model="search" />
                        </CInputGroup>
                    </CCol>
                </CRow>
                <v-data-table
                    class="my-2 elevation-1"
                    :loading="loading"
                    :headers="table.item.headers"
                    :items="shippingItems"
                    :search="search"
                    hide-default-footer
                    :mobile-breakpoint="0"
                >
                    <template v-slot:loading>
                        <v-skeleton-loader
                            type="table-row@10"
                        ></v-skeleton-loader>
                    </template>
                    <template v-slot:[`item.32-S`]="{ index, item }">
                        <div>
                            <v-text-field
                                v-if="item['32-S']"
                                v-model="item['32-S'].unit"
                                type="number"
                                variant="plain"
                                hide-details
                                hide-spin-buttons
                                @change="change(index, item)"
                            ></v-text-field>
                        </div>
                    </template>
                    <template v-slot:[`item.34-M`]="{ index, item }">
                        <div>
                            <v-text-field
                                v-if="item['34-M']"
                                v-model="item['34-M'].unit"
                                type="number"
                                variant="plain"
                                hide-details
                                hide-spin-buttons
                                @change="change(index, item)"
                            ></v-text-field>
                        </div>
                    </template>
                    <template v-slot:[`item.36-L`]="{ index, item }">
                        <div>
                            <v-text-field
                                v-if="item['36-L']"
                                v-model="item['36-L'].unit"
                                type="number"
                                variant="plain"
                                hide-details
                                hide-spin-buttons
                                @change="change(index, item)"
                            ></v-text-field>
                        </div>
                    </template>
                    <template v-slot:[`item.38-XL`]="{ index, item }">
                        <div>
                            <v-text-field
                                v-if="item['38-XL']"
                                v-model="item['38-XL'].unit"
                                type="number"
                                variant="plain"
                                hide-details
                                hide-spin-buttons
                                @change="change(index, item)"
                            ></v-text-field>
                        </div>
                    </template>
                    <template v-slot:[`item.40-Q`]="{ index, item }">
                        <div>
                            <v-text-field
                                v-if="item['40-Q']"
                                v-model="item['40-Q'].unit"
                                type="number"
                                variant="plain"
                                hide-details
                                hide-spin-buttons
                                @change="change(index, item)"
                            ></v-text-field>
                        </div>
                    </template>
                    <template v-slot:[`item.42-EQ`]="{ index, item }">
                        <div>
                            <v-text-field
                                v-if="item['42-EQ']"
                                v-model="item['42-EQ'].unit"
                                type="number"
                                variant="plain"
                                hide-details
                                hide-spin-buttons
                                @change="change(index, item)"
                            ></v-text-field>
                        </div>
                    </template>
                    <template v-slot:[`item.44-Free`]="{ index, item }">
                        <div>
                            <v-text-field
                                v-if="item['44-Free']"
                                v-model="item['44-Free'].unit"
                                type="number"
                                variant="plain"
                                hide-details
                                hide-spin-buttons
                                @change="change(index, item)"
                            ></v-text-field>
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
                <v-data-table
                    class="my-4 elevation-1"
                    :headers="table.footer.headers"
                    :items="footerItems"
                    hide-default-footer
                    :mobile-breakpoint="0"
                >
                </v-data-table>
            </CCardBody>
        </CCard>
    </div>
</template>
<script>
//
import { Dialog } from "@/components";
import { goodsSizes } from "@/constants";
import { mapState } from "vuex";
import ShippingReturnDialog from "./ShippingReturnDialog.vue";

export default {
    name: "ShippingInvoice",
    props: {
        id: null,
    },
    computed: {
        ...mapState(["goods/shippings"]),
        logo() {
            return new URL("@images/logo-named.png", import.meta.url).href;
        },
        data() {
            return this["goods/shippings"].detailsData;
        },
        headerItems() {
            return this["goods/shippings"].detailsData.header_items;
        },
        shippingItems() {
            if (
                this["goods/shippings"] &&
                this["goods/shippings"].detailsData &&
                this["goods/shippings"].detailsData.shipping_items
            ) {
                return JSON.parse(
                    JSON.stringify(
                        this["goods/shippings"].detailsData.shipping_items
                    )
                );
            }
            return [];
        },
        footerItems() {
            return this["goods/shippings"].detailsData.footer_items;
        },
    },
    components: {
        Dialog,
        ShippingReturnDialog,
    },
    data() {
        return {
            search: null,
            loading: false,
            table: {
                header: {
                    headers: [
                        { title: "X1", value: "X1" },
                        { title: "X2", value: "X2" },
                        { title: "X3", value: "X3" },
                        { title: "X4", value: "X4" },
                        { title: "X5", value: "X5" },
                        { title: "X6", value: "X6" },
                    ],
                },
                footer: {
                    headers: [
                        {
                            title: "",
                            value: "X1",
                            align: "right",
                            width: "80%",
                            sortable: false,
                        },
                        {
                            title: "",
                            value: "X2",
                            align: "left",
                            width: "20%",
                            sortable: false,
                        },
                    ],
                },
                item: {
                    headers: [
                        { title: "#ID", value: "id" },
                        { title: this.$t("type"), value: "type" },
                        { title: this.$t("goodsname"), value: "name" },
                        { title: this.$t("cup"), value: "cup" },
                        { title: this.$t("color"), value: "color" },
                        { title: "32-S", value: "32-S" },
                        { title: "34-M", value: "34-M" },
                        { title: "36-L", value: "36-L" },
                        { title: "38-XL", value: "38-XL" },
                        { title: "40-Q", value: "40-Q" },
                        { title: "42-EQ", value: "42-EQ" },
                        { title: "44-Free", value: "44-Free" },
                        {
                            title: `${this.$t("unit-price")}($)`,
                            value: "formatted_unit_price",
                        },
                        { title: this.$t("total-unit"), value: "total_unit" },
                        {
                            title: `${this.$t("cost")}($)`,
                            value: "formatted_cost",
                        },
                        { title: this.$t("actions"), value: "actions" },
                    ],
                },
            },
        };
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            let self = this;
            self.loading = true;
            let data = {
                id: self.$props.id,
            };
            this.$store
                .dispatch("goods/shippings/details", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        download() {
            let self = this;
            self.loading = true;
            let data = {
                id: self.$props.id,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/shippings/invoice/export", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        exportPackingInfo() {
            let self = this;
            self.loading = true;
            let data = {
                shipping_id: self.$props.id,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/shippings/packing/export", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        exportMailerInfo() {
            let self = this;
            self.loading = true;
            let data = {
                id: self.$props.id,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/shippings/mailer/export", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        change(idx, item) {
            // let item = this.shippingItems[idx];
            if (item) {
                let sizes = goodsSizes;
                let totalunit = 0;
                for (let size of sizes) {
                    if (item[size.name]) {
                        totalunit += item[size.name].unit;
                    }
                }
                this.shippingItems[idx].total_unit = totalunit;
                this.shippingItems[idx].cost =
                    totalunit * this.shippingItems[idx].unit_price;
            }
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
                            this.$t("alert.title"),
                            this.$t("alert.update")
                        )
                    ) {
                        let self = this;
                        self.loading = true;
                        let data = {
                            id: self.data.id,
                            item: item,
                            type: "UPDATE",
                        };
                        this.$store
                            .dispatch("goods/shippings/update", data)
                            .then((response) => {
                                self.loading = false;
                                self.fetch();
                            })
                            .catch((error) => {
                                self.loading = false;
                            });
                    }
                    break;
                case "Return":
                    let self = this;
                    await this.$refs.ShippingReturnDialog.open(self.data, item);
                    break;
                case "Delete":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("alert.title"),
                            this.$t("alert.delete")
                        )
                    ) {
                        let self = this;
                        self.loading = true;
                        let data = {
                            id: self.data.id,
                            item: item,
                            type: "DELETE",
                        };
                        this.$store
                            .dispatch("goods/shippings/update", data)
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
