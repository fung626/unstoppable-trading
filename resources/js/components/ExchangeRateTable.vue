<template>
    <div>
        <CRow class="p-2">
            <CCol class="text-right">
                <CButton color="primary" size="sm" v-on:click="reload">
                    <CIcon name="cil-reload" size="sm" />
                </CButton>
            </CCol>
        </CRow>
        <v-data-table
            class="elevation-1"
            :headers="headers"
            :items="items"
            :options.sync="options"
            :loading="loading"
            :hide-default-footer="true"
        >
            <template v-slot:[`item.updated_at`]="{ item }">
                {{ item.updated_at | moment("dddd, Do MMMM YYYY") }}
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
        </v-data-table>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "ExchangeRateTable",
    computed: {
        ...mapState(["exchangerate"]),
        items() {
            return this.exchangerate.data;
        },
    },
    data() {
        return {
            loading: false,
            options: {},
            headers: [
                { title: this.$t("Base"), value: "base" },
                { title: this.$t("Symbol"), value: "symbol" },
                { title: this.$t("rate"), value: "rate" },
                { title: this.$t("updatedat"), value: "updated_at" },
                {
                    title: this.$t("actions"),
                    value: "actions",
                    sortable: false,
                },
            ],
        };
    },
    watch: {
        options: {
            handler() {
                this.fetch();
            },
        },
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
                symbol: self.symbol,
            };
            this.$store
                .dispatch("exchangerate/get", data)
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
        async click(item, action) {
            let type = action.type;
            switch (type) {
                case "RouterPush":
                    this.$router.push({
                        name: "ExchangeRateDetails",
                        params: { base: item.base, symbol: item.symbol },
                    });
                    break;
            }
            // console.log(id, key);
        },
    },
};
</script>
