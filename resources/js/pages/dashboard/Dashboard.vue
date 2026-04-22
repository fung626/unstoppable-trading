<template>
    <CContainer lg>
        <!-- <WidgetsDropdown /> -->
        <ScannerDialog ref="scannerDialog" />
        <CRow>
            <CCol v-if="isPermissionGranted('goods')" sm="12" lg="3">
                <CWidgetIcon
                    :header="`${$t('barcode')}${$t('scanner')}`"
                    :text="`${$t('goods')}${$t('search')}`"
                    color="primary"
                >
                    <CButton class="text-white" size="lg" @click="search">
                        <CIcon name="cil-barcode" size="lg" />
                    </CButton>
                </CWidgetIcon>
            </CCol>
            <CCol v-if="isPermissionGranted('shippings')" sm="12" lg="3">
                <CWidgetIcon
                    :header="`${$t('barcode')}${$t('scanner')}`"
                    :text="`${$t('goods')}${$t('shipping')}`"
                    color="success"
                >
                    <CButton class="text-white" size="lg" @click="shipping">
                        <CIcon name="cil-barcode" size="lg" />
                    </CButton>
                </CWidgetIcon>
            </CCol>
            <CCol v-if="isPermissionGranted('stocks')" sm="12" lg="3">
                <CWidgetIcon
                    :header="`${$t('barcode')}${$t('scanner')}`"
                    :text="`${$t('stocktake')}`"
                    color="info"
                >
                    <CButton class="text-white" size="lg" @click="stocktake">
                        <CIcon name="cil-barcode" size="lg" />
                    </CButton>
                </CWidgetIcon>
            </CCol>
            <CCol sm="12" lg="3" v-if="$store.getters.isAdmin">
                <CWidgetIcon
                    :header="`${$t('button.import')}`"
                    :text="`${$t('goods')}`"
                    color="primary"
                >
                    <input
                        ref="importInput"
                        type="file"
                        accept=".csv,text/csv"
                        style="display: none"
                        @change="importGoods"
                    />

                    <CButton
                        class="text-white"
                        size="lg"
                        :disabled="loading.import"
                        @click="openImportPicker"
                    >
                        <CSpinner v-if="loading.import" size="sm" />
                        <CIcon v-else name="cil-cloud-upload" size="lg" />
                    </CButton>
                </CWidgetIcon>
            </CCol>
        </CRow>
        <CRow>
            <CCol>
                <ShippingPurchaseQuickSearch />
            </CCol>
        </CRow>
        <DashboardSummaryLineChart v-if="$store.getters.isAdmin" />
        <div v-if="$store.getters.isAdmin">
            <DutyCalendar />
        </div>
        <div v-else>
            <DutyCalendar :userId="$store.getters.authUser.id" />
        </div>
        <ExchangeRate />
        <CRow v-if="$store.getters.isAdmin">
            <CCol md="12">
                <CCard>
                    <CCardBody>
                        <CRow>
                            <CCol sm="12" lg="6">
                                <CRow>
                                    <CCol sm="12">
                                        <CCallout color="warning">
                                            <small class="text-muted">
                                                {{ $t("stock") }}
                                            </small>
                                            <br />
                                            <strong class="h4">
                                                {{ totalStock }}
                                            </strong>
                                        </CCallout>
                                    </CCol>
                                </CRow>
                            </CCol>
                            <CCol sm="12" lg="6">
                                <CRow>
                                    <CCol sm="12">
                                        <CCallout color="danger">
                                            <small class="text-muted">
                                                {{ $t("goods") }}
                                            </small>
                                            <br />
                                            <strong class="h4">
                                                {{ totalGoodsItem }}
                                            </strong>
                                        </CCallout>
                                    </CCol>
                                </CRow>
                            </CCol>
                        </CRow>
                        <br />
                        <PurchaseTable />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </CContainer>
</template>

<script>
import {
    DutyCalendar,
    ExchangeRate,
    ScannerDialog,
    ShippingPurchaseQuickSearch,
} from "@/components";
import { mapState } from "vuex";
import DashboardSummaryLineChart from "./components/DashboardSummaryLineChart";
import PurchaseTable from "./components/PurchaseTable";

export default {
    name: "Dashboard",
    components: {
        DutyCalendar,
        ExchangeRate,
        ScannerDialog,
        ShippingPurchaseQuickSearch,
        DashboardSummaryLineChart,
        PurchaseTable,
    },
    computed: {
        ...mapState(["dashboard"]),
        totalStock() {
            return this.dashboard.data?.stock_count;
        },
        totalGoodsItem() {
            return this.dashboard.data?.item_count;
        },
    },
    data() {
        return {
            loading: {
                dashboard: false,
                import: false,
            },
        };
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            let self = this;
            if (self.loading.dashboard) {
                return;
            }
            self.loading.dashboard = true;
            let data = {};
            this.$store
                .dispatch("dashboard/get", data)
                .then((response) => {
                    self.loading.dashboard = false;
                })
                .catch((error) => {
                    self.loading.dashboard = false;
                });
        },
        isPermissionGranted(key) {
            return this.$store.getters.isPermissionGranted(key);
        },
        async search() {
            await this.$refs.scannerDialog.open("Search");
        },
        async shipping() {
            await this.$refs.scannerDialog.open("Shipping");
        },
        async stocktake() {
            await this.$refs.scannerDialog.open("StockTake");
        },
        openImportPicker() {
            if (this.loading.import) {
                return;
            }
            this.$refs.importInput?.click();
        },
        importGoods(event) {
            let self = this;
            const file = event.target.files[0];
            if (!file || self.loading.import) {
                return;
            }
            self.loading.import = true;
            const data = new FormData();
            data.append("file", file);
            this.$store
                .dispatch("goods/import", data)
                .then(() => {
                    // self.fetch();
                    self.loading.import = false;
                })
                .finally(() => {
                    self.loading.import = false;
                    event.target.value = "";
                });
        },
    },
};
</script>
