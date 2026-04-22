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
                            :title="tab.values[0].toUpperCase()"
                            :active="tab.index === 0 ? true : false"
                        >
                            <hr />
                            <ClientForm
                                :id="this.$route.params.id"
                            ></ClientForm>
                        </CTab>
                        <CTab
                            :title="tab.values[1].toUpperCase()"
                            :active="tab.index === 1 ? true : false"
                        >
                            <hr />
                            <ShippingTable :clientId="this.$route.params.id" />
                        </CTab>
                        <CTab
                            :title="tab.values[2].toUpperCase()"
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
                values: [
                    this.$t("info"),
                    this.$t("shipping"),
                    this.$t("monthlystatement"),
                ],
                index: 0,
            },
        };
    },
    methods: {
        activeTabUpdated(index) {
            this.tab.index = index;
        },
    },
};
</script>
