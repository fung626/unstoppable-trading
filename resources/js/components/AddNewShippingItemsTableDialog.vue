<template>
    <CModal
        :visible="dialog"
        :centered="true"
        :fullscreen="true"
        size="xl"
        @close-prevented="console.log('close-prevented')"
        @close="() => (dialog = false)"
    >
        <CModalHeader>
            <CModalTitle>{{ $t(title) }}</CModalTitle>
        </CModalHeader>
        <div class="mb-4">
            <v-progress-linear
                :active="loading"
                indeterminate
                color="cyan"
            ></v-progress-linear>
        </div>
        <CModalBody>
            <CRow class="p-2">
                <CCol>
                    <CInputGroup class="mb-3">
                        <CButton color="primary" size="sm">
                            <CIcon name="cil-magnifying-glass" size="sm" />
                        </CButton>
                        <CFormInput size="sm" v-model="search" />
                    </CInputGroup>
                </CCol>
            </CRow>
            <v-data-table-server
                class="my-2 elevation-1"
                v-model="selected"
                :headers="headers"
                :items="items"
                :items-length="serverItemsLength"
                :search="search"
                :loading="loading"
                :items-per-page="options.itemsPerPage"
                @update:modelValue="console.log(options.itemsPerPage)"
                @update:options="fetch"
                :mobile="mobile"
                :items-per-page-options="[]"
                show-select
            >
                <template v-slot:loading>
                    <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
                </template>
                <template v-slot:[`item.32-S`]="{ item }">
                    <div v-if="item['32-S']">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ props }">
                                <span v-bind="props">
                                    {{ item["32-S"].stock_unit }}
                                </span>
                            </template>
                            <span>
                                <vue-barcode
                                    v-if="item['32-S'].barcode"
                                    :value="item['32-S'].barcode"
                                    :options="{ format: 'CODE39', height: 32 }"
                                ></vue-barcode>
                            </span>
                        </v-tooltip>
                    </div>
                    <div v-else>－</div>
                </template>
                <template v-slot:[`item.34-M`]="{ item }">
                    <div v-if="item['34-M']">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ props }">
                                <span v-bind="props" v-on="on">
                                    {{ item["34-M"].stock_unit }}
                                </span>
                            </template>
                            <span>
                                <vue-barcode
                                    v-if="item['34-M'].barcode"
                                    :value="item['34-M'].barcode"
                                    :options="{ format: 'CODE39', height: 32 }"
                                ></vue-barcode>
                            </span>
                        </v-tooltip>
                    </div>
                    <div v-else>－</div>
                </template>
                <template v-slot:[`item.36-L`]="{ item }">
                    <div v-if="item['36-L']">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ props }">
                                <span v-bind="props" v-on="on">
                                    {{ item["36-L"].stock_unit }}
                                </span>
                            </template>
                            <span>
                                <vue-barcode
                                    v-if="item['36-L'].barcode"
                                    :value="item['36-L'].barcode"
                                    :options="{ format: 'CODE39', height: 32 }"
                                ></vue-barcode>
                            </span>
                        </v-tooltip>
                    </div>
                    <div v-else>－</div>
                </template>
                <template v-slot:[`item.38-XL`]="{ item }">
                    <div v-if="item['38-XL']">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ props }">
                                <span v-bind="props" v-on="on">
                                    {{ item["38-XL"].stock_unit }}
                                </span>
                            </template>
                            <span>
                                <vue-barcode
                                    v-if="item['38-XL'].barcode"
                                    :value="item['38-XL'].barcode"
                                    :options="{ format: 'CODE39', height: 32 }"
                                ></vue-barcode>
                            </span>
                        </v-tooltip>
                    </div>
                    <div v-else>－</div>
                </template>
                <template v-slot:[`item.40-Q`]="{ item }">
                    <div v-if="item['40-Q']">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ props }">
                                <span v-bind="props" v-on="on">
                                    {{ item["40-Q"].stock_unit }}
                                </span>
                            </template>
                            <span>
                                <vue-barcode
                                    v-if="item['40-Q'].barcode"
                                    :value="item['40-Q'].barcode"
                                    :options="{ format: 'CODE39', height: 32 }"
                                ></vue-barcode>
                            </span>
                        </v-tooltip>
                    </div>
                    <div v-else>－</div>
                </template>
                <template v-slot:[`item.42-EQ`]="{ item }">
                    <div v-if="item['42-EQ']">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ props }">
                                <span v-bind="props" v-on="on">
                                    {{ item["42-EQ"].stock_unit }}
                                </span>
                            </template>
                            <span>
                                <vue-barcode
                                    v-if="item['42-EQ'].barcode"
                                    :value="item['42-EQ'].barcode"
                                    :options="{ format: 'CODE39', height: 32 }"
                                ></vue-barcode>
                            </span>
                        </v-tooltip>
                    </div>
                    <div v-else>－</div>
                </template>
                <template v-slot:[`item.44-Free`]="{ item }">
                    <div v-if="item['44-Free']">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ props }">
                                <span v-bind="props" v-on="on">
                                    {{ item["44-Free"].stock_unit }}
                                </span>
                            </template>
                            <span>
                                <vue-barcode
                                    v-if="item['44-Free'].barcode"
                                    :value="item['44-Free'].barcode"
                                    :options="{ format: 'CODE39', height: 32 }"
                                ></vue-barcode>
                            </span>
                        </v-tooltip>
                    </div>
                    <div v-else>－</div>
                </template>
            </v-data-table-server>
        </CModalBody>
        <CModalFooter>
            <CButton
                @click="confirm"
                color="primary"
                class="position-relative px-4"
                :disabled="selected.length === 0"
            >
                {{ $t("button.confirm") }}
                <CBadge
                    v-if="selected.length > 0"
                    color="warning"
                    shape="rounded-pill"
                >
                    {{ selected.length }}
                </CBadge>
            </CButton>
            <CButton @click="cancel" color="secondary" class="px-4 ml-2">
                {{ $t("button.cancel") }}
            </CButton>
        </CModalFooter>
    </CModal>
</template>

<script>
import { goodsSizes } from "@/constants";
// import { debounce } from "vue-debounce";
import debounce from "lodash/debounce";

export default {
    name: "AddNewShippingItemsTableDialog",
    data() {
        return {
            dialog: false,
            resolve: null,
            reject: null,
            search: null,
            loading: false,
            items: [],
            selected: [],
            page: 1,
            pageCount: 0,
            serverItemsLength: 0,
            options: {
                page: 1,
                itemsPerPage: 25,
                sortBy: null,
            },
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
                    title: this.$t("total-unit"),
                    value: "total_unit",
                    sortable: false,
                },
            ],
        };
    },
    unmounted() {
        this.search = null;
        this.selected = [];
    },
    methods: {
        open() {
            this.title = `shipping.add-shipment-goods`;
            this.dialog = true;
            this.fetch({ ...this.options });
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        fetch({ page, itemsPerPage, sortBy, search }) {
            this.options.page = page;
            this.options.itemsPerPage = itemsPerPage;
            this.options.sortBy = sortBy;
            const d = debounce(() => {
                let self = this;
                self.loading = true;
                let data = {
                    page: self.options.page,
                    per_page: self.options.itemsPerPage,
                    sort_by: self.options.sortBy,
                    search: self.search,
                };
                this.$store
                    .dispatch("goods/stocks/get", data)
                    .then((response) => {
                        let res = JSON.parse(JSON.stringify(response.data));
                        self.items = res.data.map((x, index) => {
                            return { id: index, ...x };
                        });
                        self.serverItemsLength = res.total;
                        self.pageCount = res.last_page;
                        self.page = res.current_page;
                        self.selected = [];
                        self.loading = false;
                    })
                    .catch((error) => {
                        self.loading = false;
                    });
            }, 1000);
            d();
        },
        confirm() {
            let self = this;
            if (self.loading) {
                return;
            }
            let ids = [];
            for (const x of self.selected) {
                let found = self.items.find((y) => y.id === x);
                if (found) {
                    for (const y of goodsSizes) {
                        if (found[y.name]) {
                            ids = [...ids, found[y.name].goods_item_id];
                        }
                    }
                }
            }
            if (ids.length === 0) {
                return;
            }
            let data = {
                item_ids: ids,
            };
            self.loading = true;
            this.$store
                .dispatch("goods/items/get", data)
                .then((response) => {
                    let res = JSON.parse(JSON.stringify(response.data));
                    for (const x of res) {
                        this.$store.dispatch("goods/shipping-cart/add", {
                            data: { ...x, unit: 0 },
                        });
                    }
                    self.loading = false;
                    self.dialog = false;
                    self.selected = [];
                    // console.log(res);
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        cancel() {
            this.resolve(false);
            this.dialog = false;
            this.clear();
        },
        clear() {
            this.item = {};
        },
    },
};
</script>
<style scoped>
div:deep(.v-data-table-footer__items-per-page) {
    display: none;
}
</style>
