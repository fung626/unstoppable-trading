<template>
    <div>
        <Dialog ref="dialog" />
        <CRow class="p-2 mb-2 mt-4">
            <CCol :md="10" :sm="10">
                <CInputGroup class="mb-3">
                    <CButton color="primary" size="sm">
                        <CIcon name="cil-magnifying-glass" size="sm" />
                    </CButton>
                    <CFormInput size="sm" v-model="search" />
                </CInputGroup>
            </CCol>
            <CCol :md="2" :sm="2" class="text-right">
                <CButtonGroup role="group">
                    <CButton color="primary" size="sm" v-on:click="reload">
                        <CIcon name="cil-reload" size="sm" />
                    </CButton>
                </CButtonGroup>
            </CCol>
        </CRow>
        <CRow class="p-2 mb-2">
            <CCol class="text-right">
                <CButtonGroup>
                    <CButton
                        v-for="p in periods"
                        :key="p.key"
                        :color="p.value === period ? 'primary' : 'secondary'"
                        size="sm"
                        :disabled="loading"
                        @click="fetch(p.value)"
                    >
                        {{ p.title }}
                    </CButton>
                </CButtonGroup>
            </CCol>
        </CRow>
        <v-data-table
            class="elevation-1"
            v-model:expanded="expanded"
            :headers="headers"
            :items="items"
            :search="search"
            :loading="loading"
            :hide-default-footer="true"
            :multi-sort="true"
            :items-per-page="100"
            :sort-by="sortBy"
            density="compact"
            disable-pagination
            show-expand
        >
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:expanded-row="{ columns, item }">
                <tr>
                    <td :colspan="columns.length" class="p-0">
                        <div
                            v-if="item.shippings && item.shippings.length > 0"
                            class="px-2"
                        >
                            <CRow>
                                <CCol class="border py-2" sm="4">
                                    {{ $t("number") }}
                                </CCol>
                                <CCol class="border py-2" sm="4">
                                    {{ $t("delivery-date") }}
                                </CCol>
                                <CCol class="border py-2" sm="4">
                                    {{ $t("amount") }}
                                </CCol>
                            </CRow>
                            <CRow v-for="s in item.shippings" v-bind:key="s.id">
                                <CCol class="border py-2" sm="4">
                                    {{ s.generated_id }}
                                </CCol>
                                <CCol class="border py-2" sm="4">
                                    {{ s.delivered_at }}
                                </CCol>
                                <CCol class="border py-2" sm="4">
                                    {{ s.sub_total }}
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol class="border py-2" sm="4"> </CCol>
                                <CCol class="border py-2" sm="4">
                                    {{ $t("subtotal") }}
                                </CCol>
                                <CCol class="border py-2" sm="4">
                                    {{ item.amount }}
                                </CCol>
                            </CRow>
                        </div>
                        <div
                            v-else
                            class="w-100 h-100 d-flex items-center justify-center py-6"
                        >
                            <span>{{ $t("no-data") }}</span>
                        </div>
                    </td>
                </tr>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <CButtonGroup>
                    <CButton
                        v-for="action in item.actions"
                        :key="action.key"
                        :color="action.color"
                        :disabled="action.disabled"
                        size="sm"
                        @click="click(item, action)"
                    >
                        {{ action.title }}
                    </CButton>
                </CButtonGroup>
            </template>
            <template v-if="!loading" v-slot:[`body.append`]>
                <tr>
                    <td v-for="i in [...Array(3)]" :key="i"></td>
                    <td class="p-2">
                        {{ $t("shipping.total-number-of-shipments") }}
                    </td>
                    <td class="p-2" colspan="2">
                        {{ data.total_number_of_shipments }}
                    </td>
                </tr>
                <tr>
                    <td v-for="i in [...Array(3)]" :key="i"></td>
                    <td class="p-2">
                        {{ $t("subtotal") }}
                    </td>
                    <td class="p-2" colspan="2">
                        {{ data.subtotal }}
                    </td>
                </tr>
            </template>
        </v-data-table>
    </div>
</template>
<script>
//
import { Dialog } from "@/components";

export default {
    name: "MonthlyStatementTable",
    props: {
        clientId: null,
    },
    components: {
        Dialog,
    },
    data() {
        return {
            search: null,
            period: 6,
            sortBy: [
                { key: "year", order: "desc" },
                { key: "month", order: "desc" },
            ],
            loading: false,
            mobile: window.innerWidth < 769,
            expanded: [],
            items: [],
            periods: [
                {
                    key: 0,
                    title: `6 ${this.$t("shipping.period.months")}`,
                    value: 6,
                },
                {
                    key: 1,
                    title: `9 ${this.$t("shipping.period.months")}`,
                    value: 9,
                },
                {
                    key: 2,
                    title: `1 ${this.$t("shipping.period.years")}`,
                    value: 12,
                },
                {
                    key: 3,
                    title: `2 ${this.$t("shipping.period.years")}`,
                    value: 24,
                },
            ],
            data: {},
            headers: [
                {
                    title: this.$t("month"),
                    value: "month",
                    sortable: true,
                },
                {
                    title: this.$t("year"),
                    value: "year",
                    sortable: true,
                },
                {
                    title: `${this.$t("shipping.number-of-shipments")}`,
                    value: "number_of_shipments",
                    sortable: true,
                },
                {
                    title: `${this.$t("amount")}`,
                    value: "amount",
                    sortable: true,
                },
                {
                    title: this.$t("actions"),
                    value: "actions",
                    sortable: false,
                },
            ],
        };
    },
    mounted() {
        window.addEventListener("resize", this.onResize);
        this.fetch(this.period);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    },
    methods: {
        onResize() {
            this.mobile = window.innerWidth < 769;
        },
        fetch(period) {
            let self = this;
            self.loading = true;
            self.period = period;
            let data = {
                period: period,
                client_id: self.$props.clientId,
            };
            this.$store
                .dispatch("clients/monthly-statements/get", data)
                .then((response) => {
                    let res = JSON.parse(JSON.stringify(response));
                    self.items = res.data.monthly_statements;
                    self.data = res.data;
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        reload() {
            this.fetch(this.period);
        },
        async click(item, action) {
            let type = action.type;
            switch (type) {
                case "Export":
                    {
                        let self = this;
                        self.loading = true;
                        let data = {
                            client_id: self.$props.clientId,
                            extension: "pdf",
                            ...item,
                        };
                        this.$store
                            .dispatch("clients/monthly-statements/export", data)
                            .then((response) => {
                                self.loading = false;
                            })
                            .catch((error) => {
                                self.loading = false;
                            });
                    }
                    break;
                case "Settle":
                    {
                        let self = this;
                        self.loading = true;
                        let data = {
                            client_id: self.$props.clientId,
                            month: item.month,
                            year: item.year,
                            goods_shipping_ids: item.shippings.map((x) => x.id),
                        };
                        this.$store
                            .dispatch("clients/monthly-statements/create", data)
                            .then((response) => {
                                this.reload();
                                self.loading = false;
                            })
                            .catch((error) => {
                                self.loading = false;
                            });
                    }
                    break;
            }
        },
    },
};
</script>

<style scoped>
.v-select {
    font-size: 1em;
    font-weight: 100;
}
</style>
