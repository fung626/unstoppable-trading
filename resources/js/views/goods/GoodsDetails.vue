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
                            <GoodsForm :id="this.$route.params.id"></GoodsForm>
                        </CTab>
                        <CTab
                            :title="tab.values[1].toUpperCase()"
                            :active="tab.index === 1 ? true : false"
                        >
                            <hr />
                            <GoodsItemTable
                                :goodsId="this.$route.params.id"
                            ></GoodsItemTable>
                        </CTab>
                        <CTab
                            :title="tab.values[2].toUpperCase()"
                            :active="tab.index === 2 ? true : false"
                        >
                            <hr />
                            <GoodsContentTable
                                :goodsId="this.$route.params.id"
                            ></GoodsContentTable>
                        </CTab>
                    </CTabs>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
//
import GoodsForm from "./components/GoodsForm";
import GoodsItemTable from "./components/GoodsItemTable";
import GoodsContentTable from "./components/GoodsContentTable";

export default {
    name: "GoodsDetails",
    components: {
        GoodsForm,
        GoodsItemTable,
        GoodsContentTable
    },
    data() {
        return {
            tab: {
                values: [
                    this.$t("info"),
                    this.$t("goodsitem"),
                    this.$t("goodscontent")
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
