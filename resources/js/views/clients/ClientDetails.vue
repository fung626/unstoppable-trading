<template>
    <Snackbar />
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
                                <ClientForm
                                    :id="this.$route.params.id"
                                ></ClientForm>
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="1">
                                <ShippingTable
                                    :clientId="this.$route.params.id"
                                />
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="2">
                                <MonthlyStatementTable
                                    :clientId="this.$route.params.id"
                                />
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
import { Snackbar } from "@/components";
import ShippingTable from "../shippings/components/ShippingTable.vue";
import ClientForm from "./components/ClientForm.vue";
import MonthlyStatementTable from "./components/MonthlyStatementTable.vue";

export default {
    name: "ClientDetails",
    components: {
        Snackbar,
        ClientForm,
        ShippingTable,
        MonthlyStatementTable,
    },
    data() {
        return {
            tab: {
                values: [
                    this.$t("info"),
                    this.$t("shippings.title"),
                    this.$t("shipping.monthly-statement"),
                ],
                index: 0,
            },
        };
    },
};
</script>
