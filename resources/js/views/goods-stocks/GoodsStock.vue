<template>
    <div>
        <CreateShippingDialog ref="dialog" />
        <CRow class="p-2 mb-2 mt-4">
            <CCol :md="10" :sm="10">
                <CInputGroup class="mb-3">
                    <CButton color="primary" size="sm">
                        <CIcon name="cil-magnifying-glass" size="sm" />
                    </CButton>
                    <CFormInput size="sm" v-model="search" />
                </CInputGroup>
            </CCol>
            <CCol :md="2" :sm="2" class="text-right">
                <CButtonGroup role="group">
                    <CButton color="primary" size="sm" v-on:click="download">
                        <CIcon name="cil-cloud-download" size="sm" />
                    </CButton>
                    <CButton color="primary" size="sm" v-on:click="reload">
                        <CIcon name="cil-reload" size="sm" />
                    </CButton>
                </CButtonGroup>
            </CCol>
        </CRow>
        <v-data-table-server
            class="my-2 elevation-1"
            :headers="headers"
            :items="items"
            :items-length="serverItemsLength"
            :search="search"
            :loading="loading"
            :items-per-page="options.itemsPerPage"
            @update:options="fetch"
            :mobile="mobile"
        >
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
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
                        <template v-slot:activator="{ props }">
                            <span v-bind="props">
                                {{ item[x].stock_unit }}
                            </span>
                        </template>
                        <span>
                            <vue-barcode
                                v-if="item[x].barcode"
                                :value="item[x].barcode"
                                :options="{ format: 'CODE39', height: 32 }"
                            ></vue-barcode>
                        </span>
                    </v-tooltip>
                </div>
                <div v-else>－</div>
            </template>
            <template v-if="!loading" v-slot:[`body.append`]>
                <tr>
                    <td v-for="i in [...Array(10)]" :key="i"></td>
                    <td class="p-2 text-right" colspan="2">
                        {{ `${$t("total-unit")}:` }}
                    </td>
                    <td class="p-2" colspan="4">
                        <span v-if="totalunit">
                            {{ `${(totalunit * 1).toLocaleString()}` }}
                        </span>
                        <span v-else>
                            {{ "0".toLocaleString() }}
                        </span>
                    </td>
                </tr>
                <tr>
                    <td v-for="i in [...Array(10)]" :key="i"></td>
                    <td class="p-2 text-right" colspan="2">
                        {{ `${$t("subtotal")}: ` }}
                    </td>
                    <td class="p-2" colspan="4">
                        <span v-if="subtotal">
                            {{ `$ ${(subtotal * 1).toLocaleString()}` }}
                        </span>
                        <span v-else>
                            {{ `$ ${"0".toLocaleString()}` }}
                        </span>
                    </td>
                </tr>
            </template>
            <template v-slot:[`item.subtotal`]="{ item }">
                <div v-if="item.subtotal">
                    {{ $filters.formatPrice(item.subtotal) }}
                </div>
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
import CreateShippingDialog from "@/components/CreateShippingDialog.vue";

export default {
    name: "GoodsStock",
    components: {
        CreateShippingDialog,
    },
    data() {
        return {
            totalunit: 0,
            subtotal: 0,
            search: null,
            loading: false,
            mobile: window.innerWidth < 769,
            items: [],
            page: 1,
            pageCount: 0,
            serverItemsLength: 0,
            options: {
                page: 1,
                itemsPerPage: 10,
                sortBy: [{ key: "goods.name", order: "desc" }],
            },
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
                    sortable: false,
                },
                {
                    title: this.$t("subtotal"),
                    value: "subtotal",
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
            self.loading = true;
            self.options.page = page;
            self.options.itemsPerPage = itemsPerPage;
            self.options.sortBy = sortBy;
            let data = {
                page: page,
                per_page: itemsPerPage,
                sort_by: sortBy,

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
                    self.totalunit = self.items.reduce(function (acc, obj) {
                        return acc + obj.total_unit;
                    }, 0);
                    self.subtotal = self.items.reduce(function (acc, obj) {
                        return acc + obj.subtotal;
                    }, 0);
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        reload() {
            this.fetch({ ...this.options });
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
                .dispatch("goods/stocks/export", data)
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
                    this.$router.push({
                        path: route,
                    });
                    break;
            }
            // console.log(id, key);
        },
    },
};
</script>
