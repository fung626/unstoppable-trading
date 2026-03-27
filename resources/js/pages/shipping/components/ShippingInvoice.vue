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
                    </CCol>
                </CRow>
                <CRow class="p-2">
                    <CCol>
                        <img src="/images/logo-named.png" width="128" />
                    </CCol>
                    <CCol md="7" sm="7">
                        <h4>Unstoppable Trading Co. Ltd</h4>
                        <h4>永行貿易有限公司</h4>
                    </CCol>
                    <CCol class="text-right">
                        <h4>{{ $t("shipping") }}{{ $t("invoice") }}</h4>
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
                        <CInput
                            size="sm"
                            v-model="search"
                            v-on:keyup.enter="search"
                        >
                            <template #prepend>
                                <CButton
                                    color="primary"
                                    size="sm"
                                    v-on:click="search"
                                    :disabled="loading"
                                >
                                    <CIcon
                                        name="cil-magnifying-glass"
                                        size="sm"
                                    />
                                </CButton>
                            </template>
                        </CInput>
                    </CCol>
                </CRow>
                <v-data-table
                    class="my-2 elevation-1"
                    :headers="table.item.headers"
                    :items="shippingItems"
                    :search="search"
                    :mobile-breakpoint="0"
                >
                    <template v-slot:body="{ items, headers }">
                        <tbody>
                            <tr v-for="(item, idx) in items" :key="idx">
                                <td v-for="(header, key) in headers" :key="key">
                                    <div
                                        v-if="
                                            isRowEditable(header.value) &&
                                            item[header.value]
                                        "
                                    >
                                        <div v-if="data.status === 'DELIVERED'">
                                            {{ item[header.value].unit }}
                                        </div>
                                        <div v-else>
                                            <v-edit-dialog
                                                :return-value.sync="
                                                    item[header.value].unit
                                                "
                                                @save="save(item['id'] - 1)"
                                                :save-text="
                                                    $t('button.confirm')
                                                "
                                                :cancel-text="
                                                    $t('button.cancel')
                                                "
                                                large
                                            >
                                                {{ item[header.value].unit }}
                                                <template v-slot:input>
                                                    <vue-number-input
                                                        class="m-4"
                                                        size="small"
                                                        v-model="
                                                            item[header.value]
                                                                .unit
                                                        "
                                                        :min="0"
                                                        :max="
                                                            item[header.value]
                                                                .stock_unit
                                                        "
                                                        inline
                                                        center
                                                        controls
                                                    ></vue-number-input>
                                                </template>
                                            </v-edit-dialog>
                                        </div>
                                    </div>
                                    <div
                                        v-else-if="isRowEditable(header.value)"
                                    >
                                        －
                                    </div>
                                    <div v-else-if="header.value === 'actions'">
                                        <CButtonGroup>
                                            <CButton
                                                v-for="action in item[
                                                    header.value
                                                ]"
                                                :key="action.key"
                                                :color="action.color"
                                                :disabled="action.disabled"
                                                size="sm"
                                                @click="click(item, action)"
                                            >
                                                {{ action.title }}
                                            </CButton>
                                        </CButtonGroup>
                                    </div>
                                    <div v-else>{{ item[header.value] }}</div>
                                </td>
                            </tr>
                        </tbody>
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
import ShippingReturnDialog from "./ShippingReturnDialog";

export default {
    name: "ShippingInvoice",
    props: {
        id: null,
    },
    computed: {
        ...mapState(["goods/shipping"]),
        data() {
            return this["goods/shipping"].detailsData;
        },
        headerItems() {
            return this["goods/shipping"].detailsData.header_items;
        },
        shippingItems() {
            console.log("[DEBUG] Computed ShippingItems");
            const items = this["goods/shipping"].detailsData.shipping_items;
            if (!items) return [];
            return JSON.parse(JSON.stringify(items));
        },
        footerItems() {
            return this["goods/shipping"].detailsData.footer_items;
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
                        { text: "X1", value: "X1" },
                        { text: "X2", value: "X2" },
                        { text: "X3", value: "X3" },
                        { text: "X4", value: "X4" },
                        { text: "X5", value: "X5" },
                        { text: "X6", value: "X6" },
                    ],
                },
                footer: {
                    headers: [
                        {
                            text: "",
                            value: "X1",
                            align: "right",
                            width: "80%",
                            sortable: false,
                        },
                        {
                            text: "",
                            value: "X2",
                            align: "left",
                            width: "20%",
                            sortable: false,
                        },
                    ],
                },
                item: {
                    headers: [
                        { text: "#ID", value: "id" },
                        { text: this.$t("type"), value: "type" },
                        { text: this.$t("goodsname"), value: "name" },
                        { text: this.$t("cup"), value: "cup" },
                        { text: this.$t("color"), value: "color" },
                        { text: "32-S", value: "32-S" },
                        { text: "34-M", value: "34-M" },
                        { text: "36-L", value: "36-L" },
                        { text: "38-XL", value: "38-XL" },
                        { text: "40-Q", value: "40-Q" },
                        { text: "42-EQ", value: "42-EQ" },
                        { text: "44-Free", value: "44-Free" },
                        {
                            text: `${this.$t("unitprice")}($)`,
                            value: "formatted_unit_price",
                        },
                        { text: this.$t("totalunit"), value: "total_unit" },
                        {
                            text: `${this.$t("cost")}($)`,
                            value: "formatted_cost",
                        },
                        { text: this.$t("actions"), value: "actions" },
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
                .dispatch("goods/shipping/details", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        update() {},
        reload() {
            this.fetch();
        },
        isRowEditable(value) {
            return goodsSizes.find((obj) => obj.name === value);
        },
        isCurrencyRow(value) {
            const rows = ["unit_price", "cost"];
            const idx = rows.indexOf(value);
            return idx > -1 ? true : false;
        },
        save(idx) {
            let item = this.shippingItems[idx];
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
        download() {
            let self = this;
            self.loading = true;
            let data = {
                id: self.$props.id,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/shipping/invoice/export", data)
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
                .dispatch("goods/shipping/packing/export", data)
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
                .dispatch("goods/shipping/mailer/export", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
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
                        let data = {
                            id: self.data.id,
                            item: item,
                            type: "UPDATE",
                        };
                        this.$store
                            .dispatch("goods/shipping/update", data)
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
                        let data = {
                            id: self.data.id,
                            item: item,
                            type: "DELETE",
                        };
                        this.$store
                            .dispatch("goods/shipping/update", data)
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
