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

export default {
    name: "ClientDetails",
    components: {
        ClientForm,
        ShippingTable
    },
    data() {
        return {
            tab: {
                values: [this.$t("info"), this.$t("shipping")],
                index: 0
            }
        };
    },
    methods: {
        activeTabUpdated(index) {}
    }
};
</script>
