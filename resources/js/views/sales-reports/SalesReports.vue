<template>
    <CContainer lg>
        <CRow class="py-2">
            <CCol class="py-2" :col="12" :sm="6" :lg="6">
                <CWidgetStatsF
                    color="primary"
                    :title="`${$t('last-some-days', { days: '30' })}${$t(
                        'stock'
                    )}${$t('price.cost')}`"
                    :value="data.last_30days_stock_cost"
                >
                    <template #icon>
                        <CIcon icon="cib-server-fault" size="xl" />
                    </template>
                </CWidgetStatsF>
            </CCol>
            <CCol class="py-2" :col="12" :sm="6" :lg="6">
                <CWidgetStatsF
                    color="primary"
                    :title="`${$t('last-some-days', { days: '30' })}${$t(
                        'shippings.title'
                    )}${$t('price.cost')}`"
                    :value="data.last_30days_shipping_costs"
                >
                    <template #icon>
                        <CIcon icon="cib-server-fault" size="xl" />
                    </template>
                </CWidgetStatsF>
            </CCol>
        </CRow>
        <CRow>
            <CCol md="12">
                <SalesReportLineChart />
            </CCol>
        </CRow>
        <CRow class="py-2">
            <CCol class="py-2" :col="12" :sm="6" :lg="3">
                <CWidgetStatsF
                    color="primary"
                    :title="`${$t('last-three-months')}${$t(
                        'average-inventory'
                    )}${$t('price.cost')}`"
                    :value="data.average_inventory"
                >
                    <template #icon>
                        <CIcon icon="cil-chart-line" size="xl" />
                    </template>
                </CWidgetStatsF>
            </CCol>
            <CCol class="py-2" :col="12" :sm="6" :lg="3">
                <CWidgetStatsF
                    color="primary"
                    :title="`${$t('last-three-months')}${$t(
                        'inventory-turnover'
                    )}${$t('price.cost')}`"
                    :value="data.inventory_turnover"
                >
                    <template #icon>
                        <CIcon icon="cil-chart-line" size="xl" />
                    </template>
                </CWidgetStatsF>
            </CCol>
            <CCol class="py-2" :col="12" :sm="6" :lg="3">
                <CWidgetStatsF
                    color="primary"
                    :title="`${$t('price.cost')}${$t('inventory-change')}`"
                    :value="data.inventory_change"
                >
                    <template #icon>
                        <CIcon icon="cil-chart-line" size="xl" />
                    </template>
                </CWidgetStatsF>
            </CCol>
            <CCol class="py-2" :col="12" :sm="6" :lg="3">
                <CWidgetStatsF
                    color="primary"
                    :title="`${$t('days-inventory-outstanding')}`"
                    :value="data.inventory_dio"
                >
                    <template #icon>
                        <CIcon icon="cil-chart-line" size="xl" />
                    </template>
                </CWidgetStatsF>
            </CCol>
        </CRow>
        <CRow>
            <CCol md="12">
                <CCard class="mb-4">
                    <CCardBody>
                        <CRow>
                            <CCol sm="12">
                                <h4 class="card-title mb-0">
                                    {{ $t("top-sales") }}
                                </h4>
                                <div class="small text-medium-emphasis"></div>
                            </CCol>
                        </CRow>
                        <TopSalesTable />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        <CRow>
            <CCol md="12">
                <CCard class="mb-4">
                    <CCardBody>
                        <CRow>
                            <CCol sm="12">
                                <h4 class="card-title mb-0">
                                    {{ $t("top-stocks") }}
                                </h4>
                                <div class="small text-medium-emphasis"></div>
                            </CCol>
                        </CRow>
                        <TopStocksTable />
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    </CContainer>
</template>
<script>
//
import { mapState } from "vuex";
import SalesReportLineChart from "./components/SalesReportLineChart.vue";
import TopSalesTable from "./components/TopSalesTable.vue";
import TopStocksTable from "./components/TopStocksTable.vue";

export default {
    name: "SalesReports",
    components: {
        SalesReportLineChart,
        TopSalesTable,
        TopStocksTable,
    },
    computed: {
        ...mapState(["sales-reports"]),
        data() {
            return JSON.parse(JSON.stringify(this["sales-reports"].data));
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
            let data = {};
            self.loading = true;
            this.$store
                .dispatch("sales-reports/get", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
    },
};
</script>
