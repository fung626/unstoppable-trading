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
                            <SupplierForm
                                :id="this.$route.params.id"
                            ></SupplierForm>
                        </CTab>
                        <CTab
                            :title="tab.values[1].toUpperCase()"
                            :active="tab.index === 1 ? true : false"
                        >
                            <hr />
                            <GoodsTable
                                :supplierId="this.$route.params.id"
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
import SupplierForm from "./components/SupplierForm";
import GoodsTable from "../goods/components/GoodsTable";

export default {
    name: "SupplierDetails",
    components: {
        SupplierForm,
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
