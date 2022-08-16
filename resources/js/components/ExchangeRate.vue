<template>
    <CCard>
        <v-progress-linear
            :active="loading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CCardBody>
            <h4>{{ $t("exchangerate") }}</h4>
            <CRow>
                <CCol md="3" sm="3">
                    <v-text-field
                        v-model="baseAmount"
                        type="number"
                        required
                        outlined
                        dense
                        clearable
                    ></v-text-field>
                </CCol>
                <CCol md="3" sm="3">
                    <v-select
                        v-model="base"
                        :items="currencies"
                        item-text="name"
                        item-value="value"
                        :error="errors.base ? true : false"
                        :error-messages="errors.base"
                        outlined
                        dense
                    ></v-select>
                </CCol>
                <CCol md="3" sm="3">
                    <v-text-field
                        v-model="symbolAmount"
                        type="number"
                        required
                        outlined
                        dense
                        clearable
                    ></v-text-field>
                </CCol>
                <CCol md="3" sm="3">
                    <v-select
                        v-model="symbol"
                        :items="currencies"
                        item-text="name"
                        item-value="value"
                        :error="errors.symbol ? true : false"
                        :error-messages="errors.symbol"
                        outlined
                        dense
                    ></v-select>
                </CCol>
            </CRow>
            <CRow v-if="updatedAt">
                <CCol class="text-right">
                    {{ $t("updatedat") }}{{ ": " }}
                    {{ updatedAt | moment("dddd, Do MMMM YYYY HH:mm") }}
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <ExchangeRateTable />
                </CCol>
            </CRow>
        </CCardBody>
    </CCard>
</template>

<script>
import { currencies } from "@/constants";
import ExchangeRateTable from "./ExchangeRateTable";

export default {
    name: "ExchangeRate",
    components: {
        ExchangeRateTable
    },
    data() {
        return {
            baseAmount: 0,
            symbolAmount: 0,
            base: null,
            symbol: null,
            rate: 0,
            currencies: currencies,
            updatedAt: null,
            errors: {},
            loading: false
        };
    },
    watch: {
        base: function(newVal, oldVal) {
            if (newVal === this.symbol) {
                currencies.forEach(element => {
                    if (this.symbol != element.value) {
                        this.symbol = element.value;
                    }
                });
            }
            if (newVal != oldVal) {
                this.fetch();
            }
        },
        symbol: function(newVal, oldVal) {
            if (newVal === this.base) {
                currencies.forEach(element => {
                    if (this.base != element.value) {
                        this.base = element.value;
                    }
                });
            }
            if (newVal != oldVal) {
                this.fetch();
            }
        },
        baseAmount: function(val) {
            this.symbolAmount = val * this.rate;
        },
        symbolAmount: function(val) {
            this.baseAmount = val / this.rate;
        }
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
                symbol: self.symbol
            };
            this.$store
                .dispatch("exchangerate/details", data)
                .then(response => {
                    let res = response.data;
                    self.base = res.base;
                    self.symbol = res.symbol;
                    self.rate = res.rate;
                    self.symbolAmount = self.baseAmount * this.rate;
                    self.updatedAt = res.updated_at;
                    self.loading = false;
                    self.errors = {};
                })
                .catch(error => {
                    self.errors = error.response.data?.data;
                    self.loading = false;
                });
        }
    }
};
</script>
