<template>
    <div>
        <CRow class="mb-3">
            <CCol md="4" sm="12" class="mb-2 mb-md-0">
                <CWidgetIcon
                    :header="String(summary.shipments)"
                    :text="$t('shipments')"
                    color="primary"
                    class="h-100"
                >
                    <CIcon name="cil-truck" size="lg" class="text-white" />
                </CWidgetIcon>
            </CCol>
            <CCol md="4" sm="12" class="mb-2 mb-md-0">
                <CWidgetIcon
                    :header="String(summary.totalUnits)"
                    :text="$t('totalunits')"
                    color="info"
                    class="h-100"
                >
                    <CIcon name="cil-layers" size="lg" class="text-white" />
                </CWidgetIcon>
            </CCol>
            <CCol md="4" sm="12">
                <CWidgetIcon
                    :header="formatCurrency(summary.totalAmount)"
                    :text="$t('totalamount')"
                    color="success"
                    class="h-100"
                >
                    <CIcon name="cil-dollar" size="lg" class="text-white" />
                </CWidgetIcon>
            </CCol>
        </CRow>

        <CCard>
            <CCardBody>
                <div
                    class="d-flex justify-content-between align-items-center mb-3"
                >
                    <h5 class="mb-0">{{ $t("monthlystatement") }}</h5>
                    <CButton
                        color="primary"
                        size="sm"
                        :disabled="loading"
                        @click="load"
                    >
                        <CIcon name="cil-reload" size="sm" />
                    </CButton>
                </div>
                <v-data-table
                    class="elevation-1"
                    :headers="headers"
                    :items="items"
                    :loading="loading"
                    :hide-default-footer="true"
                    :items-per-page="-1"
                >
                    <template v-slot:[`item.month`]="{ item }">
                        {{ item.monthLabel }}
                    </template>
                    <template v-slot:[`item.amount`]="{ item }">
                        {{ formatCurrency(item.amount) }}
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <CButton
                            color="primary"
                            size="sm"
                            :disabled="loading || exportingMonths[item.month]"
                            @click="download(item)"
                        >
                            <CIcon name="cil-cloud-download" size="sm" />
                        </CButton>
                    </template>
                </v-data-table>
            </CCardBody>
        </CCard>
    </div>
</template>

<script>
export default {
    name: "MonthlyStatement",
    props: {
        clientId: null,
    },
    data() {
        return {
            loading: false,
            client: {},
            exportingMonths: {},
            items: [],
            summary: {
                shipments: 0,
                totalUnits: 0,
                totalAmount: 0,
            },
        };
    },
    computed: {
        headers() {
            return [
                { text: this.$t("calendar.month"), value: "month" },
                { text: this.$t("shipments"), value: "shipments" },
                { text: this.$t("totalunits"), value: "totalUnits" },
                { text: this.$t("amount"), value: "amount" },
                { text: this.$t("actions"), value: "actions", sortable: false },
            ];
        },
        clientName() {
            return this.client.name || this.client.client_name || "";
        },
        clientNumber() {
            return this.client.number || this.client.client_number || "";
        },
    },
    async mounted() {
        this.load();
    },
    watch: {
        clientId() {
            this.load();
        },
    },
    methods: {
        load() {
            this.loading = true;
            const res1 = this.$store.dispatch(
                "goods/shipping/monthlyStatement/get",
                {
                    client_id: this.clientId,
                }
            );
            const res2 = this.clientId
                ? this.$store.dispatch("client/details", {
                      id: this.clientId,
                  })
                : Promise.resolve({ data: {} });
            Promise.all([res1, res2])
                .then(([res1, res2]) => {
                    this.client = res2?.data || {};
                    const payload = res1 || {};
                    const records = Array.isArray(payload.items)
                        ? payload.items
                        : [];
                    this.items = records.map((item) => ({
                        month: item.month,
                        monthLabel: item.month_label,
                        shipments: item.shipments,
                        totalUnits: item.total_units,
                        amount: item.total_amount,
                    }));
                    const summaryData = payload.summary || {};
                    this.summary = {
                        shipments: summaryData.shipments || 0,
                        totalUnits: summaryData.total_units || 0,
                        totalAmount: summaryData.total_amount || 0,
                    };
                    this.loading = false;
                })
                .catch(() => {
                    this.client = {};
                    this.items = [];
                    this.summary = {
                        shipments: 0,
                        totalUnits: 0,
                        totalAmount: 0,
                    };
                    this.loading = false;
                });
        },
        download(item) {
            let self = this;
            if (self.loading) {
                return;
            }
            this.$set(this.exportingMonths, item.month, true);
            self.loading = true;
            this.$store
                .dispatch("goods/shipping/monthlyStatement/export", {
                    client_id: this.clientId,
                    client_name: this.clientName,
                    client_number: this.clientNumber,
                    month: item.month,
                    extension: "pdf",
                })
                .finally(() => {
                    this.$set(this.exportingMonths, item.month, false);
                    self.loading = false;
                });
        },
        formatCurrency(value) {
            return new Intl.NumberFormat(undefined, {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
            }).format(value || 0);
        },
    },
};
</script>

<style scoped></style>
