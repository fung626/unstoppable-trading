<template>
    <CRow>
        <CCol>
            <CCard class="p-2">
                <CCardBody>
                    <CTabs
                        variant="pills"
                        @update:activeTab="index => activeTabUpdated(index)"
                    >
                        <CTab
                            :title="tab.values[0].toUpperCase()"
                            :active="tab.index === 0 ? true : false"
                        >
                            <hr />
                            <ShippingInvoice
                                :id="this.$route.params.id"
                            ></ShippingInvoice>
                        </CTab>
                        <CTab
                            :title="tab.values[1].toUpperCase()"
                            :active="tab.index === 1 ? true : false"
                        >
                            <hr />
                            <NewShippingItemTable
                                :goodsShipId="this.$route.params.id"
                            ></NewShippingItemTable>
                        </CTab>
                        <CTab
                            :title="tab.values[2].toUpperCase()"
                            :active="tab.index === 2 ? true : false"
                        >
                            <hr />
                            <ShippingAlterationTable
                                :goodsShipId="this.$route.params.id"
                            ></ShippingAlterationTable>
                        </CTab>
                    </CTabs>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
//
import NewShippingItemTable from "./components/NewShippingItemTable";
import ShippingAlterationTable from "./components/ShippingAlterationTable";
import ShippingInvoice from "./components/ShippingInvoice";

export default {
    name: "ShippingDetails",
    components: {
        ShippingInvoice,
        NewShippingItemTable,
        ShippingAlterationTable
    },
    data() {
        return {
            tab: {
                values: [
                    `${this.$t("shipping")}${this.$t("invoice")}`,
                    `${this.$t("create")}${this.$t("shipping")}`,
                    this.$t("alteration")
                ],
                index: 0
            }
        };
    },
    methods: {
        activeTabUpdated(index) {}
    }
};
</script>
