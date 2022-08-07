<template>
    <div>
        <!-- <WidgetsDropdown /> -->
        <ScannerDialog ref="scannerDialog" />
        <CRow>
            <CCol sm="4" lg="4">
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
            <CCol sm="4" lg="4">
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
            <CCol sm="4" lg="4">
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
        </CRow>
        <DashboardSummaryLineChart />
        <DutyCalendar />
        <ExchangeRate />
        <CRow>
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
    </div>
</template>

<script>
import { mapState } from "vuex";
import { ExchangeRate } from "../../components";
import DutyCalendar from "../../components/DutyCalendar";
import ScannerDialog from "../../components/ScannerDialog";
import DashboardSummaryLineChart from "./components/DashboardSummaryLineChart";
import PurchaseTable from "./components/PurchaseTable";

export default {
    name: "Dashboard",
    components: {
        ExchangeRate,
        ScannerDialog,
        DashboardSummaryLineChart,
        DutyCalendar,
        PurchaseTable
    },
    computed: {
        ...mapState(["dashboard"]),
        totalStock() {
            return this.dashboard.data?.stock_count;
        },
        totalGoodsItem() {
            return this.dashboard.data?.item_count;
        }
    },
    data() {
        return {
            loading: false
        };
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {};
            this.$store
                .dispatch("dashboard/get", data)
                .then(response => {
                    self.loading = false;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        async search() {
            await this.$refs.scannerDialog.open("Search");
        },
        async shipping() {
            await this.$refs.scannerDialog.open("Shipping");
        },
        async stocktake() {
            await this.$refs.scannerDialog.open("StockTake");
        }
    }
};
</script>
