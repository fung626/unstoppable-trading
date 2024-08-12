<template>
    <div>
        <Dialog ref="dialog" />
        <CRow class="p-2">
            <CCol md="9" sm="9">
                <CInput
                    size="sm"
                    v-model="searchText"
                    v-on:keyup.enter="search"
                >
                    <template #prepend>
                        <CButton
                            color="primary"
                            size="sm"
                            v-on:click="search"
                            :disabled="loading"
                        >
                            <CIcon name="cil-magnifying-glass" size="sm" />
                        </CButton>
                    </template>
                </CInput>
            </CCol>
            <CCol md="3" sm="3" class="text-right">
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
            </CCol>
        </CRow>
        <v-data-table
            class="elevation-1"
            :page="page"
            :pageCount="pageCount"
            :headers="headers"
            :items="items"
            :options.sync="options"
            :server-items-length="serverItemsLength"
            :loading="loading"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
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
            searchText: null,
            page: 1,
            serverItemsLength: 0,
            pageCount: 0,
            items: [],
            loading: false,
            options: {},
            sortBy: "updated_at",
            sortDesc: false,
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                {
                    text: `${this.$t("name")}`,
                    value: "item.goods.name",
                },
                {
                    text: `${this.$t("type")}`,
                    value: "item.goods.type",
                },
                {
                    text: `${this.$t("size")}`,
                    value: "item.size",
                },
                {
                    text: `${this.$t("color")}`,
                    value: "item.color",
                },
                {
                    text: `${this.$t("barcode")}`,
                    value: "item.barcode",
                },
                {
                    text: `${this.$t("unit")}`,
                    value: "unit",
                },
                {
                    text: `${this.$t("altered")}${this.$t("unit")}`,
                    value: "altered_unit",
                },
                {
                    text: `${this.$t("alteration")}${this.$t("type")}`,
                    value: "type",
                },
                { title: this.$t("updatedat"), value: "updated_at" },
            ],
        };
    },
    watch: {
        options: {
            handler() {
                this.fetch();
            },
        },
        loading() {
            this.disableItemsPerPage = this.loading;
            this.disablePagination = this.loading;
        },
    },
    methods: {
        fetch(reset = false) {
            let self = this;
            self.loading = true;
            const { page, itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                goods_shipping_id: self.$props.goodsShipId,
                page: reset ? 1 : page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                keyword: self.searchText,
            };
            this.$store
                .dispatch("goods/shippings/alteration/get", data)
                .then((response) => {
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
        search() {
            this.fetch(true);
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
                search: self.searchText,
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
            this.fetch();
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
