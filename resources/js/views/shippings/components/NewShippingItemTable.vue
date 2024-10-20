<template>
    <div>
        <NewShippingItemDialog ref="dialog" />
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
        <v-data-table-server
            class="my-2 elevation-1"
            :headers="headers"
            :items="items"
            :items-length="serverItemsLength"
            :search="search"
            :loading="loading"
            @update:options="fetch"
            :mobile="mobile"
        >
            <template
                v-for="x of [
                    '32-S',
                    '34-M',
                    '36-L',
                    '38-XL',
                    '40-Q',
                    '42-EQ',
                    '44-Free',
                ]"
                v-slot:[`item.${x}`]="{ item }"
                :key="x"
            >
                <div v-if="item[x]">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                                {{ item[x].stock_unit }}
                            </span>
                        </template>
                        <span>
                            <barcode
                                v-if="item[x].barcode"
                                :value="item[x].barcode"
                                :options="{ format: 'CODE39', height: 32 }"
                            ></barcode>
                        </span>
                    </v-tooltip>
                </div>
                <div v-else>－</div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <CButtonGroup>
                    <CButton
                        v-for="action in item.actions"
                        :key="action.key"
                        :color="action.color"
                        :disabled="action.disabled"
                        size="sm"
                        @click="click(item, action)"
                    >
                        {{ action.title }}
                    </CButton>
                </CButtonGroup>
            </template>
        </v-data-table-server>
    </div>
</template>
<script>
//
import { mapState } from "vuex";
import NewShippingItemDialog from "./NewShippingItemDialog.vue";

export default {
    name: "NewShippingItemTable",
    props: {
        goodsShipId: null,
    },
    components: {
        NewShippingItemDialog,
    },
    computed: {
        ...mapState(["goods/shippings/available-shippings-items"]),
        serverItemsLength() {
            return this["goods/shippings/available-shippings-items"].data
                ?.total;
        },
        pageCount() {
            return this["goods/shippings/available-shippings-items"].data
                ?.last_page;
        },
        page() {
            return this["goods/shippings/available-shippings-items"].data
                ?.current_page;
        },
        items() {
            return this["goods/shippings/available-shippings-items"].data?.data;
        },
    },
    data() {
        return {
            search: null,
            loading: false,
            options: {},
            sortBy: "goods.name",

            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { title: this.$t("name"), value: "goods.name", sortable: true },
                { title: this.$t("type"), value: "goods.type", sortable: true },
                { title: this.$t("cup"), value: "cup", sortable: true },
                { title: this.$t("color"), value: "color", sortable: true },
                { title: "32-S", value: "32-S", sortable: false },
                { title: "34-M", value: "34-M", sortable: false },
                { title: "36-L", value: "36-L", sortable: false },
                { title: "38-XL", value: "38-XL", sortable: false },
                { title: "40-Q", value: "40-Q", sortable: false },
                { title: "42-EQ", value: "42-EQ", sortable: false },
                { title: "44-Free", value: "44-Free", sortable: false },
                {
                    title: this.$t("total-unit"),
                    value: "total_unit",
                    sortable: true,
                },
                {
                    title: this.$t("actions"),
                    value: "actions",
                    sortable: false,
                },
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
            if (self.loading) {
                return;
            }
            self.loading = true;
            self.options.page = page;
            self.options.itemsPerPage = itemsPerPage;
            self.options.sortBy = sortBy;
            let data = {
                goods_shipping_id: self.$props.goodsShipId,
                page: page,
                per_page: itemsPerPage,
                sort_by: sortBy,

                search: search,
            };
            this.$store
                .dispatch("goods/shippings/available-shippings-items/get", data)
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
        async click(item, action) {
            let self = this;
            let type = action.type;
            switch (type) {
                case "Dialog":
                    let _item = JSON.parse(JSON.stringify(item));
                    if (
                        await self.$refs.dialog.open(
                            self.$props.goodsShipId,
                            _item
                        )
                    ) {
                        this.fetch({ ...this.options });
                    }
                    break;
            }
            // console.log(id, key);
        },
    },
};
</script>
