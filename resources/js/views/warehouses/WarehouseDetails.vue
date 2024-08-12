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
                                <WarehouseForm
                                    :id="this.$route.params.id"
                                ></WarehouseForm>
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="1">
                                <GoodsTable
                                    :warehouseId="this.$route.params.id"
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
import WarehouseForm from "./components/WarehouseForm.vue";

export default {
    name: "WarehouseDetails",
    components: {
        WarehouseForm,
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
