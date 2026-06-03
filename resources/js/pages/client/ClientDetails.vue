<template>
    <CRow>
        <CCol>
            <CCard class="p-2">
                <CCardBody>
                    <CTabs
                        variant="pills"
                        @update:activeTab="(index) => activeTabUpdated(index)"
                    >
                        <CTab
                            :title="$t(tab.values[0]).toUpperCase()"
                            :active="tab.index === 0 ? true : false"
                        >
                            <hr />
                            <ClientForm
                                :id="this.$route.params.id"
                            ></ClientForm>
                        </CTab>
                        <CTab
                            :title="$t(tab.values[1]).toUpperCase()"
                            :active="tab.index === 1 ? true : false"
                        >
                            <hr />
                            <ShippingTable :clientId="this.$route.params.id" />
                        </CTab>
                        <CTab
                            :title="$t(tab.values[2]).toUpperCase()"
                            :active="tab.index === 2 ? true : false"
                        >
                            <hr />
                            <MonthlyStatement
                                :clientId="this.$route.params.id"
                            />
                        </CTab>
                    </CTabs>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
//
import ShippingTable from "../shipping/components/ShippingTable";
import ClientForm from "./components/ClientForm";
import MonthlyStatement from "./components/MonthlyStatement";

export default {
    name: "ClientDetails",
    components: {
        ClientForm,
        MonthlyStatement,
        ShippingTable,
    },
    data() {
        return {
            tab: {
                values: ["info", "shipping", "monthlystatement"],
                index: 0,
            },
        };
    },
    created() {
        this.syncTabFromRoute(this.$route.query.tab);
    },
    watch: {
        "$route.query.tab"(value) {
            this.syncTabFromRoute(value);
        },
    },
    methods: {
        activeTabUpdated(index) {
            this.tab.index = Number(index) || 0;
            this.syncRouteFromTab();
        },
        syncTabFromRoute(tabKey) {
            const index = this.tab.values.indexOf(tabKey);
            if (index >= 0) {
                this.tab.index = index;
                return;
            }

            this.tab.index = 0;
            this.syncRouteFromTab();
        },
        syncRouteFromTab() {
            const selectedTab =
                this.tab.values[this.tab.index] || this.tab.values[0];

            if (this.$route.query.tab === selectedTab) {
                return;
            }

            this.$router
                .replace({
                    query: {
                        ...this.$route.query,
                        tab: selectedTab,
                    },
                })
                .catch(() => {});
        },
    },
};
</script>
