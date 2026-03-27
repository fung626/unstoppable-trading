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
                            <CategoryForm
                                :id="this.$route.params.id"
                            ></CategoryForm>
                        </CTab>
                        <CTab
                            :title="tab.values[1].toUpperCase()"
                            :active="tab.index === 1 ? true : false"
                        >
                            <hr />
                            <GoodsTable
                                :categoryId="this.$route.params.id"
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
import CategoryForm from "./components/CategoryForm";
import GoodsTable from "../goods/components/GoodsTable";

export default {
    name: "CategoryDetails",
    components: {
        CategoryForm,
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
