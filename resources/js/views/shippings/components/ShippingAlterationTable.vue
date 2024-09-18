<template>
    <div>
        <Dialog ref="dialog" />
        <CRow class="p-2">
            <CCol :md="10" :sm="10">
                <CInputGroup class="mb-3">
                    <CButton color="primary" size="sm">
                        <CIcon name="cil-magnifying-glass" size="sm" />
                    </CButton>
                    <CFormInput size="sm" v-model="search" />
                </CInputGroup>
            </CCol>
            <CCol :md="2" :sm="2" class="text-right">
                <CButtonGroup>
                    <CButton
                        color="primary"
                        size="sm"
                        v-on:click="download"
                        :disabled="loading"
                    >
                        <CIcon name="cil-cloud-download" size="sm" />
                    </CButton>
                    <CButton
                        color="primary"
                        size="sm"
                        v-on:click="reload"
                        :disabled="loading"
                    >
                        <CIcon name="cil-reload" size="sm" />
                    </CButton>
                </CButtonGroup>
            </CCol>
        </CRow>
        <v-data-table
            class="elevation-1"
            :headers="headers"
            :items="items"
            :items-length="serverItemsLength"
            :search="search"
            :loading="loading"
            @update:options="fetch"
            :mobile="mobile"
            :footer-props="{
                disableItemsPerPage: disableItemsPerPage,
                disablePagination: disablePagination,
                showFirstLastPage: true,
                showCurrentPage: true,
                itemsPerPageOptions: [10, 20, 50, 100],
            }"
        >
            <template v-slot:[`item.type`]="{ item }">
                {{ $t(item.type.toLowerCase()) }}
            </template>
            <template v-slot:[`item.barcode`]="{ item }">
                <barcode
                    v-if="item.barcode"
                    :value="item.barcode"
                    :options="{ format: 'CODE39', height: 32 }"
                ></barcode>
            </template>
            <template v-slot:[`item.updated_at`]="{ item }">
                <div v-if="item.updated_at">
                    {{ this.$formatDate(item.updated_at) }}
                </div>
            </template>
        </v-data-table>
    </div>
</template>
<script>
//

export default {
    name: "ShippingAlterationTable",
    props: {
        goodsShipId: null,
    },
    data() {
        return {
            search: null,
            items: [],
            loading: false,
            mobile: window.innerWidth < 769,
            page: 1,
            serverItemsLength: 0,
            pageCount: 0,
            options: {},
            sortBy: "updated_at",
            sortDesc: false,
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                {
                    title: `${this.$t("name")}`,
                    value: "item.goods.name",
                },
                {
                    title: `${this.$t("type")}`,
                    value: "item.goods.type",
                },
                {
                    title: `${this.$t("size")}`,
                    value: "item.size",
                },
                {
                    title: `${this.$t("color")}`,
                    value: "item.color",
                },
                {
                    title: `${this.$t("barcode")}`,
                    value: "item.barcode",
                },
                {
                    title: `${this.$t("unit")}`,
                    value: "unit",
                },
                {
                    title: `${this.$t("altered")}${this.$t("unit")}`,
                    value: "altered_unit",
                },
                {
                    title: `${this.$t("alteration")}${this.$t("type")}`,
                    value: "type",
                },
                { title: this.$t("updatedat"), value: "updated_at" },
            ],
        };
    },
    mounted() {
        window.addEventListener("resize", this.onResize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    },
    methods: {
        onResize() {
            this.mobile = window.innerWidth < 769;
        },
        fetch({ page, itemsPerPage, sortBy, search }) {
            let self = this;
            self.loading = true;
            self.options.page = page;
            self.options.itemsPerPage = itemsPerPage;
            self.options.sortBy = sortBy;
            let data = {
                page: page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: null,
                search: search,
            };
            this.$store
                .dispatch("goods/shippings/alteration/get", data)
                .then((response) => {
                    // console.log(response);
                    let res = JSON.parse(JSON.stringify(response.data));
                    self.items = res.data;
                    self.serverItemsLength = res.total;
                    self.pageCount = res.last_page;
                    self.page = res.current_page;
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        download() {
            let self = this;
            self.loading = true;
            const { itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                goods_shipping_id: self.$props.goodsShipId,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.search,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/shippings/alteration/export", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        reload() {
            this.fetch({ ...this.options });
        },
    },
};
</script>

<style scoped>
.v-select {
    font-size: 1em;
    font-weight: 100;
}
</style>
