<template>
    <CContainer lg>
        <CRow>
            <CCol col="12" sm="6" lg="6">
                <CWidgetIcon
                    :header="data.last_30days_stock_costs"
                    :text="`${$t('last-some-days', { days: '30' })}${$t(
                        'stock'
                    )}${$t('price.cost')}`"
                    color="primary"
                >
                    <CIcon name="cib-server-fault" width="24" />
                </CWidgetIcon>
            </CCol>
            <CCol col="12" sm="6" lg="6">
                <CWidgetIcon
                    :header="data.last_30days_shipping_costs"
                    :text="`${$t('last-some-days', { days: '30' })}${$t(
                        'shipping.title'
                    )}${$t('price.cost')}`"
                    color="primary"
                >
                    <CIcon name="cib-codeship" width="24" />
                </CWidgetIcon>
            </CCol>
        </CRow>
        <CRow>
            <CCol md="12">
                <SalesReportLineChart />
            </CCol>
        </CRow>
        <CRow>
            <CCol col="12" sm="6" lg="3">
                <CWidgetIcon
                    :header="data.average_inventory"
                    :text="`${$t('last-three-months')}${$t(
                        'average-inventory'
                    )}${$t('price.cost')}`"
                    color="primary"
                >
                    <CIcon name="cil-chart-line" width="24" />
                </CWidgetIcon>
            </CCol>
            <CCol col="12" sm="6" lg="3">
                <CWidgetIcon
                    :header="data.inventory_turnover"
                    :text="`${$t('last-three-months')}${$t(
                        'inventory-turnover'
                    )}${$t('price.cost')}`"
                    color="primary"
                >
                    <CIcon name="cil-chart-line" width="24" />
                </CWidgetIcon>
            </CCol>
            <CCol col="12" sm="6" lg="3">
                <CWidgetIcon
                    :header="data.inventory_change"
                    :text="`${$t('price.cost')}${$t('inventory-change')}`"
                    color="primary"
                >
                    <CIcon name="cil-chart-line" width="24" />
                </CWidgetIcon>
            </CCol>
            <CCol col="12" sm="6" lg="3">
                <CWidgetIcon
                    :header="data.inventory_dio"
                    :text="`${$t('daysinventoryoutstanding')}`"
                    color="primary"
                >
                    <CIcon name="cil-chart-line" width="24" />
                </CWidgetIcon>
            </CCol>
        </CRow>
        <CRow>
            <CCol md="12">
                <CCard class="mb-4">
                    <CCardBody>
                        <CRow>
                            <CCol sm="12">
                                <h4 class="card-title mb-0">
                                    {{ $t("topsales") }}
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
                                    {{ $t("topstocks") }}
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
    name: "SalesReport",
    components: {
        SalesReportLineChart,
        TopSalesTable,
        TopStocksTable,
    },
    computed: {
        ...mapState(["salesreport"]),
        data() {
            return JSON.parse(JSON.stringify(this["salesreport"].data));
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
                .dispatch("salesreport/get", data)
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
