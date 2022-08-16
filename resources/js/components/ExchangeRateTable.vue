<template>
    <v-data-table
        :headers="headers"
        :items="items"
        :options.sync="options"
        :hide-default-footer="true"
    ></v-data-table>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "ExchangeRateTable",
    computed: {
        ...mapState(["exchangerate"]),
        items() {
            console.log(this.exchangerate);
            return this.exchangerate.data;
        }
    },
    data() {
        return {
            loading: false,
            options: {},
            headers: [
                { text: this.$t("Base"), value: "base" },
                { text: this.$t("Symbol"), value: "symbol" },
                { text: this.$t("rate"), value: "rate" }
            ]
        };
    },
    watch: {
        options: {
            handler() {
                this.fetch();
            }
        }
    },
    methods: {
        fetch() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {
                base: self.base,
                symbol: self.symbol
            };
            this.$store
                .dispatch("exchangerate/get", data)
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
