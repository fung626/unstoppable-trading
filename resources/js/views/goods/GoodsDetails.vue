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
                                <GoodsForm
                                    :id="this.$route.params.id"
                                ></GoodsForm>
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="1">
                                <GoodsItemTable
                                    :goodsId="this.$route.params.id"
                                ></GoodsItemTable>
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="2">
                                <GoodsContentTable
                                    :goodsId="this.$route.params.id"
                                ></GoodsContentTable>
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
import GoodsContentTable from "./components/GoodsContentTable.vue";
import GoodsForm from "./components/GoodsForm.vue";
import GoodsItemTable from "./components/GoodsItemTable.vue";
import { Snackbar } from "@/components";

export default {
    name: "GoodsDetails",
    components: {
        Snackbar,
        GoodsForm,
        GoodsItemTable,
        GoodsContentTable,
    },
    data() {
        return {
            tab: {
                values: [
                    this.$t("info"),
                    this.$t("goodsitem"),
                    this.$t("goodscontent"),
                ],
                index: 0,
            },
        };
    },
};
</script>
