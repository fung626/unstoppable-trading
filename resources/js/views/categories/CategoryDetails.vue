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
                                <CategoryForm
                                    :id="this.$route.params.id"
                                ></CategoryForm>
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="1">
                                <GoodsTable
                                    :categoryId="this.$route.params.id"
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
import CategoryForm from "./components/CategoryForm.vue";

export default {
    name: "CategoryDetails",
    components: {
        CategoryForm,
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
