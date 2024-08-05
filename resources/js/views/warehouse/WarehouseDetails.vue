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
                            <WarehouseForm
                                :id="this.$route.params.id"
                            ></WarehouseForm>
                        </CTab>
                        <CTab
                            :title="tab.values[1].toUpperCase()"
                            :active="tab.index === 1 ? true : false"
                        >
                            <hr />
                            <GoodsTable
                                :warehouseId="this.$route.params.id"
                            ></GoodsTable>
                        </CTab>
                    </CTabs>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
//
import WarehouseForm from "./components/WarehouseForm";
import GoodsTable from "../goods/components/GoodsTable";

export default {
    name: "WarehouseDetails",
    components: {
        WarehouseForm,
        GoodsTable
    },
    data() {
        return {
            tab: {
                values: [this.$t("info"), this.$t("goods")],
                index: 0
            }
        };
    },
    methods: {
        activeTabUpdated(index) {}
    }
};
</script>
