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
            <CRow>
                <CCol>
                    <ExchangeRateTable :base="base" :symbol="symbol" />
                </CCol>
            </CRow>
        </CCardBody>
    </CCard>
</template>

<script>
import { currencies } from "@/constants";
import { mapState } from "vuex";
import ExchangeRateTable from "./ExchangeRateTable.vue";

export default {
    name: "ExchangeRate",
    components: {
        ExchangeRateTable,
    },
    computed: {
        ...mapState(["exchange-rate"]),
        rate() {
            if (this["exchange-rate"] && this["exchange-rate"].details) {
                return this["exchange-rate"].details.rate;
            }
            return 0;
        },
    },
    data() {
        return {
            baseAmount: 0,
            base: "HKD",
            symbolAmount: 0,
            symbol: "TWD",
            // rate: 0,
            currencies: currencies,
            updatedAt: null,
            errors: {},
            loading: false,
        };
    },
    watch: {
        base: function (newVal, oldVal) {
            let symbol = this.symbol;
            if (newVal === symbol) {
                for (const x of currencies) {
                    if (symbol !== x.value) {
                        symbol = x.value;
                        break;
                    }
                }
            }
            if (newVal != oldVal) {
                this.fetch(this.base, symbol);
            }
        },
        symbol: function (newVal, oldVal) {
            let base = this.base;
            if (newVal === base) {
                for (const x of currencies) {
                    if (base !== x.value) {
                        base = x.value;
                        break;
                    }
                }
            }
            if (newVal != oldVal) {
                this.fetch(base, this.symbol);
            }
        },
        baseAmount: function (val) {
            this.symbolAmount = val * this.rate;
        },
        symbolAmount: function (val) {
            this.baseAmount = (val / this.rate) * 1;
        },
    },
    mounted() {
        this.fetch(this.base, this.symbol);
    },
    methods: {
        fetch(base, symbol) {
            let self = this;
            if (
                self.loading ||
                !base ||
                !symbol ||
                (self.base === base && self.symbol === symbol)
            ) {
                return;
            }
            self.loading = true;
            let data = {
                base: base,
                symbol: symbol,
            };
            this.$store
                .dispatch("exchange-rates/details", data)
                .then((response) => {
                    let res = response.data.data;
                    self.base = res.base;
                    self.symbol = res.symbol;
                    // self.rate = res.rate;
                    self.symbolAmount = self.baseAmount * self.rate;
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
