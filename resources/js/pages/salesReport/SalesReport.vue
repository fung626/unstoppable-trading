<template>
    <div>
        <CRow>
            <CCol col="12" sm="6" lg="6">
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
            <CCol col="12" sm="6" lg="6">
                <CWidgetIcon
                    :header="data.inventory_turnover"
                    :text="
                        `${$t('lastthreemonths')}${$t('inventoryturnover')}${$t(
                            'price.cost'
                        )}`
                    "
                    color="success"
                >
                    <CIcon name="cil-calculator" width="24" />
                </CWidgetIcon>
            </CCol>
        </CRow>
    </div>
</template>
<script>
//
import { mapState } from "vuex";

export default {
    name: "SalesReport",
    props: {},
    computed: {
        ...mapState(["salesreport"]),
        data() {
            return this["salesreport"].data;
        }
    },
    data: {
        loading: false
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
