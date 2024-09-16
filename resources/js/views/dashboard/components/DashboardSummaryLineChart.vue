<template>
    <div>
        <CCard>
            <v-progress-linear
                :active="loading"
                indeterminate
                color="cyan"
            ></v-progress-linear>
            <CCardBody>
                <CRow class="p-2">
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
                    style="height: 300px; max-height: 300px; margin-top: 40px"
                    :wrapper="false"
                    :options="options"
                    :data="data"
                />
            </CCardBody>
        </CCard>
    </div>
</template>
<script>
//
import { CChartLine } from "@coreui/vue-chartjs";
import { mapState } from "vuex";

export default {
    name: "DashboardSummaryLineChart",
    components: { CChartLine },
    computed: {
        ...mapState(["chart/purchase-line"]),
        data() {
            return JSON.parse(JSON.stringify(this["chart/purchase-line"].data));
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
                    x: {
                        gridLines: {
                            drawOnChartArea: false,
                        },
                    },
                    y: {
                        ticks: {
                            beginAtZero: true,
                            callback: (value, index, values) => {
                                return `${Number(value).abbreviateAmount()}`;
                            },
                        },
                    },
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
            self.loading = true;
            this.$store
                .dispatch("chart/purchase-line/get")
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
