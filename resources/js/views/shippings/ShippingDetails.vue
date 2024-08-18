<template>
    <CRow>
        <CCol>
            <CCard class="p-2">
                <CCardBody>
                    <CTabs :activeItemKey="0">
                        <CTabList variant="pills">
                            <CTab :itemKey="0">
                                {{ tab.values[0].toUpperCase() }}
                            </CTab>
                            <CTab :itemKey="1">
                                {{ tab.values[1].toUpperCase() }}
                            </CTab>
                            <CTab :itemKey="2">
                                {{ tab.values[2].toUpperCase() }}
                            </CTab>
                        </CTabList>
                        <CTabContent>
                            <CTabPanel class="p-3" :itemKey="0">
                                <!-- <ShippingInvoice
                                    :id="this.$route.params.id"
                                ></ShippingInvoice> -->
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="1">
                                <!-- <NewShippingItemTable
                                    :goodsShipId="this.$route.params.id"
                                ></NewShippingItemTable> -->
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="2">
                                <!-- <ShippingAlterationTable
                                    :goodsShipId="this.$route.params.id"
                                ></ShippingAlterationTable> -->
                            </CTabPanel>
                        </CTabContent>
                    </CTabs>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
//
import NewShippingItemTable from "./components/NewShippingItemTable.vue";
import ShippingAlterationTable from "./components/ShippingAlterationTable.vue";
import ShippingInvoice from "./components/ShippingInvoice.vue";

export default {
    name: "ShippingDetails",
    components: {
        ShippingInvoice,
        NewShippingItemTable,
        ShippingAlterationTable,
    },
    data() {
        return {
            tab: {
                values: [
                    `${this.$t("shipping.invoice")}`,
                    `${this.$t("create")}${this.$t("shippings.title")}`,
                    this.$t("alteration"),
                ],
                index: 0,
            },
        };
    },
};
</script>
