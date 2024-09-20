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
    props: {
        base: null,
        symbol: null,
    },
    computed: {
        ...mapState(["exchange-rates"]),
        // base() {
        //     return this["exchange-rates"].details.base;
        // },
        // symbol() {
        //     return this["exchange-rates"].details.symbol;
        // },
        items() {
            if (Array.isArray(this["exchange-rates"].data)) {
                return this["exchange-rates"].data;
            }
            return [];
        },
        details() {
            return this["exchange-rates"].details;
        },
    },
    data() {
        return {
            loading: false,
            mobile: window.innerWidth < 769,
            headers: [
                { title: this.$t("base"), value: "base" },
                { title: this.$t("symbol"), value: "symbol" },
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
    // watch: {
    //     details: function (newVal, oldVal) {
    //         this.fetch();
    //     },
    // },
    mounted() {
        this.fetch();
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
            // console.log(data);
            this.$store
                .dispatch("exchange-rates/get", data)
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
            // console.log(item);
            let type = action.type;
            switch (type) {
                case "RouterPush":
                    let route = action.route;
                    this.$router.push({
                        path: route,
                    });
                    break;
            }
            // console.log(id, key);
        },
    },
};
</script>
