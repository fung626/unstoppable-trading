<template>
    <CModal :visible="dialog" :centered="true" @close="() => (dialog = false)">
        <CModalHeader>
            <CModalTitle>{{ title }}</CModalTitle>
        </CModalHeader>
        <div class="mb-4">
            <v-progress-linear
                :active="loading"
                indeterminate
                color="cyan"
            ></v-progress-linear>
        </div>
        <CModalBody>
            <v-data-table-server
                class="my-2 elevation-1"
                :headers="headers"
                :items="items"
                :items-length="serverItemsLength"
                :search="search"
                :loading="loading"
                @update:options="fetch"
                :mobile="mobile"
                show-select
                :footer-props="{
                    disableItemsPerPage: disableItemsPerPage,
                    disablePagination: disablePagination,
                    showFirstLastPage: true,
                    showCurrentPage: true,
                    itemsPerPageOptions: [10, 20, 50, 100],
                }"
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
            <CButton @click="confirm" color="danger" class="px-4">
                {{ $t("button.confirm") }}
            </CButton>
            <CButton @click="cancel" color="secondary" class="px-4 ml-2">
                {{ $t("button.cancel") }}
            </CButton>
        </CModalFooter>
    </CModal>
</template>

<script>
export default {
    name: "AddNewShippingItemTableDialog",
    data() {
        return {
            search: null,
            loading: false,
            items: [],
            page: 1,
            pageCount: 0,
            serverItemsLength: 0,
            options: {
                page: 1,
                itemsPerPage: 5,
                sortBy: null,
                sortDesc: false,
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
    methods: {
        open() {
            this.title = ``;
            this.dialog = true;
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
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
                .dispatch("goods/stocks/get", data)
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
        confirm() {
            let self = this;
            if (self.loading) {
                return;
            }
            let data = {
                id: self.id,
                item: self.item,
                type: "NEW",
            };
            self.loading = true;
            this.$store
                .dispatch("goods/shippings/update", data)
                .then((response) => {
                    self.loading = false;
                    self.resolve(true);
                    self.dialog = false;
                })
                .catch((error) => {
                    self.loading = false;
                    self.resolve(true);
                    self.dialog = false;
                });

            self.clear();
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
