<template>
    <CCard class="mb-4">
        <v-progress-linear
            :active="loading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CCardBody>
            <CRow>
                <CCol>
                    <h4 class="card-title mb-0">
                        {{ $t("sales-report") }}
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
</template>
<script>
//
import { CChartLine } from "@coreui/vue-chartjs";
import { mapState } from "vuex";

export default {
    name: "SalesReportLineChart",
    components: {
        CChartLine,
    },
    computed: {
        ...mapState(["sales-reports/chart"]),
        data() {
            return JSON.parse(JSON.stringify(this["sales-reports/chart"].data));
        },
    },
    data() {
        return {
            loading: false,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                tooltips: {
                    mode: "index",
                },
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [
                        {
                            gridLines: {
                                drawOnChartArea: false,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                callback: (value, index, values) => {
                                    return `${Number(
                                        value
                                    ).abbreviateAmount()}`;
                                },
                            },
                        },
                    ],
                },
                pan: {
                    enabled: true,
                    mode: "x",
                },
                zoom: {
                    enabled: true,
                    mode: "x",
                },
                elements: {
                    point: {
                        radius: 0,
                        hitRadius: 10,
                        hoverRadius: 4,
                        hoverBorderWidth: 3,
                    },
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
                return;
            }
            let data = {};
            self.loading = true;
            this.$store
                .dispatch("sales-reports/chart/get", data)
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
