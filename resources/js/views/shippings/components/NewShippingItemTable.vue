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
        <v-data-table
            class="my-2 elevation-1"
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
            <template v-slot:[`item.32-S`]="{ item }">
                <div v-if="item['32-S']">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                                {{ item["32-S"].stock_unit }}
                            </span>
                        </template>
                        <span>
                            <barcode
                                v-if="item['32-S'].barcode"
                                :value="item['32-S'].barcode"
                                :options="{ format: 'CODE39', height: 32 }"
                            ></barcode>
                        </span>
                    </v-tooltip>
                </div>
                <div v-else>－</div>
            </template>
            <template v-slot:[`item.34-M`]="{ item }">
                <div v-if="item['34-M']">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                                {{ item["34-M"].stock_unit }}
                            </span>
                        </template>
                        <span>
                            <barcode
                                v-if="item['34-M'].barcode"
                                :value="item['34-M'].barcode"
                                :options="{ format: 'CODE39', height: 32 }"
                            ></barcode>
                        </span>
                    </v-tooltip>
                </div>
                <div v-else>－</div>
            </template>
            <template v-slot:[`item.36-L`]="{ item }">
                <div v-if="item['36-L']">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                                {{ item["36-L"].stock_unit }}
                            </span>
                        </template>
                        <span>
                            <barcode
                                v-if="item['36-L'].barcode"
                                :value="item['36-L'].barcode"
                                :options="{ format: 'CODE39', height: 32 }"
                            ></barcode>
                        </span>
                    </v-tooltip>
                </div>
                <div v-else>－</div>
            </template>
            <template v-slot:[`item.38-XL`]="{ item }">
                <div v-if="item['38-XL']">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                                {{ item["38-XL"].stock_unit }}
                            </span>
                        </template>
                        <span>
                            <barcode
                                v-if="item['38-XL'].barcode"
                                :value="item['38-XL'].barcode"
                                :options="{ format: 'CODE39', height: 32 }"
                            ></barcode>
                        </span>
                    </v-tooltip>
                </div>
                <div v-else>－</div>
            </template>
            <template v-slot:[`item.40-Q`]="{ item }">
                <div v-if="item['40-Q']">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                                {{ item["40-Q"].stock_unit }}
                            </span>
                        </template>
                        <span>
                            <barcode
                                v-if="item['40-Q'].barcode"
                                :value="item['40-Q'].barcode"
                                :options="{ format: 'CODE39', height: 32 }"
                            ></barcode>
                        </span>
                    </v-tooltip>
                </div>
                <div v-else>－</div>
            </template>
            <template v-slot:[`item.42-EQ`]="{ item }">
                <div v-if="item['42-EQ']">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                                {{ item["42-EQ"].stock_unit }}
                            </span>
                        </template>
                        <span>
                            <barcode
                                v-if="item['42-EQ'].barcode"
                                :value="item['42-EQ'].barcode"
                                :options="{ format: 'CODE39', height: 32 }"
                            ></barcode>
                        </span>
                    </v-tooltip>
                </div>
                <div v-else>－</div>
            </template>
            <template v-slot:[`item.44-Free`]="{ item }">
                <div v-if="item['44-Free']">
                    <v-tooltip bottom>
                        <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on">
                                {{ item["44-Free"].stock_unit }}
                            </span>
                        </template>
                        <span>
                            <barcode
                                v-if="item['44-Free'].barcode"
                                :value="item['44-Free'].barcode"
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
        </v-data-table>
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
        ...mapState(["goods/shippings/available/shipping/item"]),
        serverItemsLength() {
            return this["goods/shippings/available/shipping/item"].data?.total;
        },
        pageCount() {
            return this["goods/shippings/available/shipping/item"].data
                ?.last_page;
        },
        page() {
            return this["goods/shippings/available/shipping/item"].data
                ?.current_page;
        },
        items() {
            return this["goods/shippings/available/shipping/item"].data?.data;
        },
    },
    data() {
        return {
            search: null,
            loading: false,
            options: {},
            sortBy: "goods.name",
            sortDesc: false,
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { title: this.$t("name"), value: "goods.name" },
                { title: this.$t("type"), value: "goods.type" },
                { title: this.$t("cup"), value: "cup" },
                { title: this.$t("color"), value: "color" },
                { title: "32-S", value: "32-S", sortable: false },
                { title: "34-M", value: "34-M", sortable: false },
                { title: "36-L", value: "36-L", sortable: false },
                { title: "38-XL", value: "38-XL", sortable: false },
                { title: "40-Q", value: "40-Q", sortable: false },
                { title: "42-EQ", value: "42-EQ", sortable: false },
                { title: "44-Free", value: "44-Free", sortable: false },
                {
                    title: this.$t("totalunit"),
                    value: "total_unit",
                    sortable: false,
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
                sort_desc: null,
                search: search,
            };
            this.$store
                .dispatch("goods/shippings/available/shipping/item/get", data)
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
                        this.fetch();
                    }
                    break;
            }
            // console.log(id, key);
        },
    },
};
</script>
