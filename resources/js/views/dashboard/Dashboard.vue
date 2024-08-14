<template>
    <CContainer lg>
        <!-- <WidgetsDropdown /> -->
        <ScannerDialog ref="scannerDialog" />
        <CRow>
            <CCol v-if="isPermissionGranted('goods')" sm="12" lg="4">
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
            <CCol v-if="isPermissionGranted('shipping')" sm="12" lg="4">
                <CWidgetIcon
                    :header="`${$t('barcode')}${$t('scanner')}`"
                    :text="`${$t('goods')}${$t('shippings.title')}`"
                    color="success"
                >
                    <CButton class="text-white" size="lg" @click="shipping">
                        <CIcon name="cil-barcode" size="lg" />
                    </CButton>
                </CWidgetIcon>
            </CCol>
            <CCol v-if="isPermissionGranted('stocktake')" sm="12" lg="4">
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
        <CRow>
            <CCol>
                <ShippingPurchaseQuickSearch
                    v-if="
                        isPermissionGranted('goods') &&
                        isPermissionGranted('shipping')
                    "
                />
            </CCol>
        </CRow>
        <DashboardSummaryLineChart v-if="$store.getters.isAdmin" />
        <div v-if="$store.getters.isAdmin">
            <DutyCalendar />
        </div>
        <div v-else>
            <DutyCalendar :userId="$store.getters.authUser.id" />
        </div>
        <ExchangeRate v-if="isPermissionGranted('exchangerate')" />
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
import DashboardSummaryLineChart from "./components/DashboardSummaryLineChart.vue";
import PurchaseTable from "./components/PurchaseTable.vue";

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
            loading: false,
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
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
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
            await this.$refs.scannerDialog.open("Stocktake");
        },
    },
};
</script>
