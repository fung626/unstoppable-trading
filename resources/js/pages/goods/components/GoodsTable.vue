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
                    v-on:click="add"
                    :disabled="loading"
                >
                    <CIcon name="cil-plus" size="sm" />
                </CButton>
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
                itemsPerPageOptions: [10, 20, 50, 100]
            }"
        >
            <template v-slot:[`item.warehouses`]="{ item }">
                <v-chip
                    class="mr-2"
                    v-for="warehouse in item.warehouses"
                    :key="warehouse.id"
                    color="primary"
                    text-color="white"
                    x-small
                    label
                >
                    {{ warehouse.sector }} {{ $t("sector") }}
                    {{ warehouse.shelf }} {{ $t("shelf") }}
                    {{ warehouse.segment }} {{ $t("segment") }}
                </v-chip>
            </template>
            <template v-slot:[`item.categories`]="{ item }">
                <v-chip
                    class="mr-2"
                    v-for="cat in item.categories"
                    :key="cat.id"
                    color="primary"
                    text-color="white"
                    x-small
                    label
                >
                    {{ cat.name }}
                </v-chip>
            </template>
            <template v-slot:[`item.created_at`]="{ item }">
                {{ item.created_at | moment("dddd, Do MMMM YYYY") }}
            </template>
            <template v-slot:[`item.updated_at`]="{ item }">
                {{ item.updated_at | moment("dddd, Do MMMM YYYY") }}
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
import { Dialog } from "../../../components";

export default {
    name: "GoodsTable",
    props: {
        supplierId: null,
        categoryId: null,
        warehouseId: null
    },
    components: {
        Dialog
    },
    computed: {
        ...mapState(["goods"]),
        serverItemsLength() {
            return this.goods.data?.total;
        },
        pageCount() {
            return this.goods.data?.last_page;
        },
        page() {
            return this.goods.data?.current_page;
        },
        items() {
            return this.goods.data?.data;
        }
    },
    data() {
        return {
            searchText: null,
            loading: false,
            options: {},
            sortBy: "name",
            sortDesc: false,
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { text: this.$t("name"), value: "name" },
                { text: this.$t("type"), value: "type" },
                {
                    text: this.$t("warehouse"),
                    value: "warehouses",
                    sortable: false
                },
                {
                    text: this.$t("stockunit"),
                    value: "stock_unit",
                    sortable: false
                },
                {
                    text: this.$t("supplier"),
                    value: "supplier.name",
                    sortable: false
                },
                {
                    text: this.$t("categories"),
                    value: "categories",
                    sortable: false
                },
                { text: this.$t("updatedat"), value: "updated_at" },
                { text: this.$t("actions"), value: "actions", sortable: false }
            ]
        };
    },
    watch: {
        options: {
            handler() {
                this.fetch();
            }
        },
        loading() {
            this.disableItemsPerPage = this.loading;
            this.disablePagination = this.loading;
        }
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
                supplier_id: self.supplierId,
                category_id: self.categoryId,
                warehouse_id: self.warehouseId,
                page: reset ? 1 : page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText
            };
            this.$store
                .dispatch("goods/get", data)
                .then(response => {
                    self.loading = false;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        search() {
            this.fetch(true);
        },
        add() {
            this.$router.push({ name: "CreateGoods" });
        },
        download() {
            let self = this;
            self.loading = true;
            const { itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                supplier_id: self.supplierId,
                category_id: self.categoryId,
                warehouse_id: self.warehouseId,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText,
                extension: "pdf"
            };
            this.$store
                .dispatch("goods/export", data)
                .then(response => {
                    self.loading = false;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        reload() {
            this.fetch();
        },
        async click(item, action) {
            let type = action.type;
            switch (type) {
                case "RouterPush":
                    let route = action.route;
                    switch (route) {
                        case "CreatePurchase":
                            this.$router.push({
                                name: route,
                                params: { id: item.supplier.id }
                            });
                            break;
                        case "GoodsDetails":
                            this.$router.push({
                                name: route,
                                params: { id: item.id }
                            });
                            break;
                    }
                    break;
                case "Delete":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("button.confirm"),
                            this.$t("alert.delete")
                        )
                    ) {
                        let self = this;
                        this.$store
                            .dispatch("goods/delete", { id: item.id })
                            .then(response => {
                                self.loading = false;
                                self.fetch();
                            })
                            .catch(error => {
                                self.loading = false;
                            });
                    }
                    break;
            }
            // console.log(id, key);
        }
    }
};
</script>
