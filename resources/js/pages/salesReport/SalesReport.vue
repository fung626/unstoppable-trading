<template>
    <div>
        <CRow>
            <CCol col="12" sm="6" lg="3">
                <CWidgetIcon
                    :header="data.average_inventory"
                    :text="
                        `${$t('lastthreemonths')}${$t('averageinventory')}${$t(
                            'price.cost'
                        )}`
                    "
                    color="primary"
                >
                    <CIcon name="cil-calculator" width="24" />
                </CWidgetIcon>
            </CCol>
            <CCol col="12" sm="6" lg="3">
                <CWidgetIcon
                    :header="data.inventory_turnover"
                    :text="
                        `${$t('lastthreemonths')}${$t('inventoryturnover')}${$t(
                            'price.cost'
                        )}`
                    "
                    color="primary"
                >
                    <CIcon name="cil-calculator" width="24" />
                </CWidgetIcon>
            </CCol>
            <CCol col="12" sm="6" lg="3">
                <CWidgetIcon
                    :header="data.inventory_change"
                    :text="`${$t('price.cost')}${$t('inventorychange')}`"
                    color="primary"
                >
                    <CIcon name="cil-calculator" width="24" />
                </CWidgetIcon>
            </CCol>
            <CCol col="12" sm="6" lg="3">
                <CWidgetIcon
                    :header="data.inventory_dio"
                    :text="`${$t('daysinventoryoutstanding')}`"
                    color="primary"
                >
                    <CIcon name="cil-calculator" width="24" />
                </CWidgetIcon>
            </CCol>
        </CRow>
        <CRow>
            <CCol md="12">
                <CCard class="mb-4">
                    <v-progress-linear
                        :active="loading"
                        indeterminate
                        color="cyan"
                    ></v-progress-linear>
                    <CCardBody>
                        <CRow>
                            <CCol sm="12">
                                <h4 class="card-title mb-0">
                                    {{ $t("salesreport") }}
                                </h4>
                                <div class="small text-medium-emphasis"></div>
                            </CCol>
                        </CRow>
                        <CChartLine
                            type="line"
                            style="height: 320px; max-height: 320px; margin-top: 40px"
                            :datasets="data.datasets"
                            :labels="data.labels"
                            :options="options"
                        />
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
    </div>
</template>
<script>
//
import { CChartLine } from "@coreui/vue-chartjs";
import { mapState } from "vuex";
import TopSalesTable from "./components/TopSalesTable";
import TopStocksTable from "./components/TopStocksTable";

export default {
    name: "SalesReport",
    props: {},
    components: {
        CChartLine,
        TopSalesTable,
        TopStocksTable
    },
    computed: {
        ...mapState(["salesreport/chart"]),
        data() {
            return JSON.parse(JSON.stringify(this["salesreport/chart"].data));
        }
    },
    data() {
        return {
            loading: false,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    mode: "index"
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                drawOnChartArea: false
                            }
                        }
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                callback: (value, index, values) => {
                                    return `${Number(
                                        value
                                    ).abbreviateAmount()}`;
                                }
                            }
                        }
                    ]
                },
                pan: {
                    enabled: true,
                    mode: "x"
                },
                zoom: {
                    enabled: true,
                    mode: "x"
                },
                elements: {
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                        hoverBorderWidth: 3
                    }
                }
            }
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
                .dispatch("salesreport/chart/get", data)
                .then(response => {
                    self.loading = false;
                })
                .catch(error => {
                    self.loading = false;
                });
        }
    }
};
</script>
