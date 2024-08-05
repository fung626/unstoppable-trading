<template>
    <div>
        <CreateShippingDialog ref="dialog" />
        <CRow class="p-2">
            <CCol :md="9" :sm="9">
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
            <CCol :md="3" :sm="3" class="text-right">
                <CButtonGroup role="group">
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
            class="my-2 elevation-1"
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
import CreateShippingDialog from "@/components/CreateShippingDialog.vue";
import { mapState } from "vuex";

export default {
    name: "GoodsStock",
    components: {
        CreateShippingDialog,
    },
    computed: {
        ...mapState(["goods/stock"]),
        serverItemsLength() {
            return this["goods/stock"].data?.total;
        },
        pageCount() {
            return this["goods/stock"].data?.last_page;
        },
        page() {
            return this["goods/stock"].data?.current_page;
        },
        items() {
            return this["goods/stock"].data?.data;
        },
    },
    data() {
        return {
            searchText: null,
            // page: 1,
            loading: false,
            options: {},
            sortBy: "goods.name",
            sortDesc: false,
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { text: this.$t("name"), value: "goods.name" },
                { text: this.$t("type"), value: "goods.type" },
                { text: this.$t("cup"), value: "cup" },
                { text: this.$t("color"), value: "color" },
                { text: "32-S", value: "32-S", sortable: false },
                { text: "34-M", value: "34-M", sortable: false },
                { text: "36-L", value: "36-L", sortable: false },
                { text: "38-XL", value: "38-XL", sortable: false },
                { text: "40-Q", value: "40-Q", sortable: false },
                { text: "42-EQ", value: "42-EQ", sortable: false },
                { text: "44-Free", value: "44-Free", sortable: false },
                {
                    text: this.$t("totalunit"),
                    value: "total_unit",
                    sortable: false,
                },
                { text: this.$t("actions"), value: "actions", sortable: false },
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
    mounted() {
        this.fetch();
    },
    methods: {
        fetch(reset = false) {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            const { page, itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                page: reset ? 1 : page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText,
            };
            this.$store
                .dispatch("goods/stock/get", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        search() {
            this.fetch(true);
        },
        reload() {
            this.fetch();
        },
        download() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            const { page, itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                page: page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText,
            };
            this.$store
                .dispatch("goods/stock/export", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        async click(item, action) {
            let type = action.type;
            switch (type) {
                case "Dialog":
                    let _item = JSON.parse(JSON.stringify(item));
                    if (await this.$refs.dialog.open(_item)) {
                    }
                    break;
                case "RouterPush":
                    let route = action.route;
                    switch (route) {
                        case "CreatePurchase":
                            this.$router.push({
                                name: route,
                                params: { id: item.goods.supplier.id },
                            });
                            break;
                        case "GoodsDetails":
                            this.$router.push({
                                name: route,
                                params: { id: item.goods.id },
                            });
                            break;
                    }
                    break;
            }
            // console.log(id, key);
        },
    },
};
</script>
