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
            :loading="loading"
            :mobile="mobile"
            :hide-default-footer="true"
        >
            <template v-slot:[`item.updated_at`]="{ item }">
                {{ this.$formatDate(item.updated_at) }}
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
        ...mapState(["exchange-rate"]),
        base() {
            return this["exchange-rate"].details.base;
        },
        symbol() {
            return this["exchange-rate"].details.symbol;
        },
        items() {
            if (Array.isArray(this["exchange-rate"].data)) {
                return this["exchange-rate"].data;
            }
            return [];
        },
        details() {
            return this["exchange-rate"].details;
        },
    },
    data() {
        return {
            loading: false,
            mobile: window.innerWidth < 769,
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
        details: function (newVal, oldVal) {
            this.fetch();
        },
    },
    mounted() {
        window.addEventListener("resize", this.onResize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    },
    methods: {
        onResize() {
            this.mobile = window.innerWidth < 769;
        },
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
                .dispatch("exchange-rate/get", data)
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
                        path: "exchange-rate/details",
                        params: { base: item.base, symbol: item.symbol },
                    });
                    break;
            }
            // console.log(id, key);
        },
    },
};
</script>
