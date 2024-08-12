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
                        </CTabList>
                        <CTabContent>
                            <CTabPanel class="p-3" :itemKey="0">
                                <SupplierForm
                                    :id="this.$route.params.id"
                                ></SupplierForm>
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="1">
                                <GoodsTable
                                    :supplierId="this.$route.params.id"
                                ></GoodsTable>
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
import GoodsTable from "../goods/components/GoodsTable.vue";
import SupplierForm from "./components/SupplierForm.vue";

export default {
    name: "SupplierDetails",
    components: {
        SupplierForm,
        GoodsTable,
    },
    data() {
        return {
            tab: {
                values: [this.$t("info"), this.$t("goods")],
                index: 0,
            },
        };
    },
};
</script>
