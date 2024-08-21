<template>
    <CCard class="my-2">
        <v-progress-linear
            :active="loading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CCardBody>
            <h4>{{ $t("exchange-rate") }}</h4>
            <CRow>
                <CCol :md="3" :sm="3">
                    <v-text-field
                        v-model="baseAmount"
                        :disabled="loading"
                        type="number"
                        required
                        outlined
                        dense
                        clearable
                    ></v-text-field>
                </CCol>
                <CCol :md="3" :sm="3">
                    <v-select
                        v-model="base"
                        :items="currencies"
                        item-title="name"
                        item-value="value"
                        :error="errors.base ? true : false"
                        :error-messages="errors.base"
                        :disabled="loading"
                        outlined
                        dense
                    ></v-select>
                </CCol>
                <CCol :md="3" :sm="3">
                    <v-text-field
                        v-model="symbolAmount"
                        :disabled="loading"
                        type="number"
                        required
                        outlined
                        dense
                        clearable
                    ></v-text-field>
                </CCol>
                <CCol :md="3" :sm="3">
                    <v-select
                        v-model="symbol"
                        :items="currencies"
                        item-title="name"
                        item-value="value"
                        :error="errors.symbol ? true : false"
                        :error-messages="errors.symbol"
                        :disabled="loading"
                        outlined
                        dense
                    ></v-select>
                </CCol>
            </CRow>
            <CRow v-if="updatedAt">
                <CCol class="text-right text-muted">
                    {{ `${$t("updatedat")}:` }}
                    {{ this.$formatDate(updatedAt) }}
                </CCol>
            </CRow>
            <!-- <CRow>
                <CCol>
                    <ExchangeRateTable />
                </CCol>
            </CRow> -->
        </CCardBody>
    </CCard>
</template>

<script>
import { currencies } from "@/constants";
import ExchangeRateTable from "./ExchangeRateTable.vue";

export default {
    name: "ExchangeRate",
    components: {
        ExchangeRateTable,
    },
    data() {
        return {
            baseAmount: 0,
            base: "HKD",
            symbolAmount: 0,
            symbol: "TWD",
            rate: 0,
            currencies: currencies,
            updatedAt: null,
            errors: {},
            loading: false,
        };
    },
    watch: {
        base: function (newVal, oldVal) {
            if (newVal === this.symbol) {
                currencies.forEach((element) => {
                    if (this.symbol != element.value) {
                        this.symbol = element.value;
                    }
                });
            }
            if (newVal != oldVal) {
                this.fetch();
            }
        },
        symbol: function (newVal, oldVal) {
            if (newVal === this.base) {
                currencies.forEach((element) => {
                    if (this.base != element.value) {
                        this.base = element.value;
                    }
                });
            }
            if (newVal != oldVal) {
                this.fetch();
            }
        },
        baseAmount: function (val) {
            this.symbolAmount = val * this.rate;
        },
        symbolAmount: function (val) {
            this.baseAmount = val / this.rate;
        },
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            let self = this;
            if (self.loading || !self.base || !self.symbol) {
                return;
            }
            self.loading = true;
            let data = {
                base: self.base,
                symbol: self.symbol,
            };
            this.$store
                .dispatch("exchange-rate/details", data)
                .then((response) => {
                    let res = response.data.data;
                    self.base = res.base;
                    self.symbol = res.symbol;
                    self.rate = res.rate;
                    self.symbolAmount = self.baseAmount * this.rate;
                    self.updatedAt = res.updated_at;
                    self.loading = false;
                    self.errors = {};
                })
                .catch((error) => {
                    self.errors = error.response.data?.data;
                    self.loading = false;
                });
        },
    },
};
</script>
