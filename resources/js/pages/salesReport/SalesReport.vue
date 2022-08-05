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
                                    {{ $t("stock") }} & {{ $t("shipping") }}
                                </h4>
                                <div class="small text-medium-emphasis"></div>
                            </CCol>
                        </CRow>
                        <CChartLine
                            type="line"
                            style="height: 320px; max-height: 320px; margin-top: 40px"
                            :datasets="data.datasets"
                            :labels="data.labels"
                            :options="data.options"
                        />
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

export default {
    name: "SalesReport",
    props: {},
    components: {
        CChartLine
    },
    computed: {
        ...mapState(["salesreport/stockchart"]),
        data() {
            return this["salesreport/stockchart"].data;
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
            let data = {};
            self.loading = true;
            this.$store
                .dispatch("salesreport/stockchart/get", data)
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
