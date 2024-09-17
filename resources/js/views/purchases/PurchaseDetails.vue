<template>
    <CCard>
        <v-progress-linear
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
            <CRow>
                <CCol>
                    <barcode
                        class="m-4"
                        v-if="data.barcode"
                        :value="data.barcode"
                        :options="{ title: ' ', format: 'CODE39', height: 28 }"
                    ></barcode>
                </CCol>
            </CRow>
            <CRow class="p-2">
                <CCol>
                    <img :src="logo" width="128" />
                </CCol>
                <CCol md="8" sm="8">
                    <h4>Unstoppable Trading Co. Ltd</h4>
                    <h4>永行貿易有限公司</h4>
                </CCol>
                <CCol class="text-right">
                    <h4>{{ $t("purchase.invoice") }}</h4>
                </CCol>
            </CRow>
            <v-data-table
                class="my-4 elevation-1 my-table"
                :headers="table.header.headers"
                :items="headerItems"
                hide-default-footer
                hide-default-header
                :mobile-breakpoint="0"
            >
            </v-data-table>
            <v-data-table
                class="my-2 elevation-1"
                :headers="table.item.headers"
                :items="purchaseItems"
                :search="search"
                :mobile-breakpoint="0"
            >
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
</template>

<script>
//
import { mapState } from "vuex";

export default {
    name: "PurchaseDetails",
    components: {},
    computed: {
        ...mapState(["goods/purchases/invoices"]),
        logo() {
            return new URL("@images/logo-named.png", import.meta.url).href;
        },
        data() {
            return this["goods/purchases/invoices"].detailsData;
        },
        headerItems() {
            return this["goods/purchases/invoices"].detailsData.header_items;
        },
        purchaseItems() {
            return this["goods/purchases/invoices"].detailsData.purchase_items;
        },
        footerItems() {
            return this["goods/purchases/invoices"].detailsData.footer_items;
        },
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
                        { title: "32-S", value: "32-S.unit" },
                        { title: "34-M", value: "34-M.unit" },
                        { title: "36-L", value: "36-L.unit" },
                        { title: "38-XL", value: "38-XL.unit" },
                        { title: "40-Q", value: "40-Q.unit" },
                        { title: "42-EQ", value: "42-EQ.unit" },
                        { title: "44-Free", value: "44-Free.unit" },
                        {
                            title: `${this.$t("unit-price")}($)`,
                            value: "formatted_unit_price",
                        },
                        {
                            title: `${this.$t("total-unit")}`,
                            value: "total_unit",
                        },
                        {
                            title: `${this.$t("cost")}($)`,
                            value: "formatted_cost",
                        },
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
            if (self.loading) {
                return true;
            }
            self.loading = true;
            let data = {
                id: self.$route.params.id,
            };
            this.$store
                .dispatch("goods/purchases/invoices/details", data)
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
                return true;
            }
            self.loading = true;
            let data = {
                id: self.$route.params.id,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/purchases/invoices/export", data)
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
    },
};
</script>

<style scoped>
.v-data-table tbody tr:not(:last-child) td:not(.v-data-table__mobile-row) {
    border: none;
    border-bottom: none;
}
</style>
