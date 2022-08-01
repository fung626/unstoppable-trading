<template>
    <div>
        <CCard>
            <v-progress-linear
                :active="loading"
                indeterminate
                color="cyan"
            ></v-progress-linear>
            <CCardBody>
                <CRow>
                    <CCol sm="5">
                        <h4 id="traffic" class="card-title mb-0">
                            {{ $t("traffic") }}
                        </h4>
                    </CCol>
                    <CCol sm="7" class="d-none d-md-block">
                        <CButtonGroup class="float-right mr-3"> </CButtonGroup>
                    </CCol>
                </CRow>
                <CChartLine
                    style="height:300px"
                    :datasets="datasets"
                    :labels="labels"
                    :options="options"
                />
            </CCardBody>
        </CCard>
    </div>
</template>
<script>
//
import { mapState } from "vuex";
import { CChartLine } from "@coreui/vue-chartjs";

export default {
    name: "DashboardSummaryLineChart",
    components: { CChartLine },
    computed: {
        ...mapState(["chart/purchaseline"]),
        labels() {
            return this["chart/purchaseline"].data?.labels
                ? this["chart/purchaseline"].data?.labels
                : [];
        },
        datasets() {
            let datasets = this["chart/purchaseline"].data?.datasets;
            if (datasets) {
                return JSON.parse(JSON.stringify(datasets));
            }
            return [];
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
            self.loading = true;
            this.$store
                .dispatch("chart/purchaseline/get")
                .then(response => {
                    self.loading = false;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        reload() {
            this.fetch();
        }
    }
};
</script>
