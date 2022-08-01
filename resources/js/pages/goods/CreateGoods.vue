<template>
    <CCard class="p-4">
        <CCardBody>
            <h4>{{ $t("create") }}</h4>
            <hr />
            <form>
                <v-text-field
                    v-model="name"
                    :label="$t('name')"
                    :error="errors.name ? true : false"
                    :error-messages="errors.name"
                    required
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <v-text-field
                    v-model="stockAlert"
                    :label="$t('stockalert')"
                    :error="errors.stock_alert ? true : false"
                    :error-messages="errors.stockAlert"
                    type="number"
                    required
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <v-row>
                    <c-col md="3" sm="3">
                        <v-text-field
                            v-model="costprice"
                            :label="$t('price.cost')"
                            :error="errors.cost_price ? true : false"
                            :error-messages="errors.cost_price"
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </c-col>
                    <c-col md="3" sm="3">
                        <v-text-field
                            v-model="wholesaleprice"
                            :label="$t('price.wholesale')"
                            :error="errors.wholesale_price ? true : false"
                            :error-messages="errors.wholesale_price"
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </c-col>
                    <c-col md="3" sm="3">
                        <v-text-field
                            v-model="retailprice"
                            :label="$t('price.retail')"
                            :error="errors.retail_price ? true : false"
                            :error-messages="errors.retail_price"
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </c-col>
                    <c-col md="3" sm="3">
                        <v-select
                            v-model="type"
                            :items="goodsTypes"
                            item-text="name"
                            item-value="name"
                            :label="$t('type')"
                            :error="errors.type ? true : false"
                            :error-messages="errors.type"
                            outlined
                            dense
                        ></v-select>
                    </c-col>
                </v-row>
                <v-autocomplete
                    v-model="supplier"
                    :items="autocomplete.supplier.items"
                    :loading="autocomplete.supplier.loading"
                    :search-input.sync="autocomplete.supplier.search"
                    required
                    outlined
                    dense
                    hide-no-data
                    hide-selected
                    item-text="name"
                    item-value="id"
                    :label="$t('supplier')"
                    :error="errors.supplier ? true : false"
                    :error-messages="errors.supplier"
                    return-object
                ></v-autocomplete>
                <v-autocomplete
                    v-model="categories"
                    :items="autocomplete.category.items"
                    :loading="autocomplete.category.loading"
                    :search-input.sync="autocomplete.category.search"
                    hide-no-data
                    hide-selected
                    outlined
                    item-text="name"
                    item-value="id"
                    :label="$t('categories')"
                    return-object
                    chips
                    small-chips
                    deletable-chips
                    multiple
                ></v-autocomplete>
                <v-autocomplete
                    v-model="warehouses"
                    :items="autocomplete.warehouse.items"
                    :loading="autocomplete.warehouse.loading"
                    :search-input.sync="autocomplete.warehouse.search"
                    required
                    outlined
                    dense
                    hide-no-data
                    hide-selected
                    item-text="name"
                    item-value="id"
                    :label="$t('warehouse')"
                    return-object
                    chips
                    small-chips
                    deletable-chips
                    multiple
                ></v-autocomplete>
                <v-text-field
                    v-model="description"
                    :label="$t('description')"
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <CRow class="p-2">
                    <CCol md="9" sm="9">
                        <h4 class="my-2">{{ $t("goodsitem") }}</h4>
                    </CCol>
                    <CCol md="3" sm="3" class="text-right">
                        <CButton
                            color="primary"
                            size="sm"
                            v-on:click="add('item')"
                        >
                            <CIcon name="cil-plus" size="sm" />
                        </CButton>
                    </CCol>
                </CRow>
                <hr />
                <v-data-table
                    class="my-2 elevation-1"
                    :headers="table.item.headers"
                    :items="table.item.items"
                    :options.sync="table.item.options"
                    :hide-default-footer="true"
                >
                    <template v-slot:[`item.cup`]="{ item }">
                        <v-autocomplete
                            v-model="item.cup"
                            :items="goodsCups"
                            item-text="name"
                            item-value="name"
                            :disabled="type === 'BF'"
                            hide-details
                            rounded
                        ></v-autocomplete>
                    </template>
                    <template v-slot:[`item.color`]="{ item }">
                        <v-autocomplete
                            v-model="item.color"
                            :items="goodsColors"
                            item-text="name"
                            item-value="name"
                            hide-details
                            rounded
                        ></v-autocomplete>
                    </template>
                    <template v-slot:[`item.size`]="{ item }">
                        <v-autocomplete
                            v-model="item.size"
                            :items="goodsSizes"
                            item-text="name"
                            item-value="name"
                            hide-details
                            rounded
                        ></v-autocomplete>
                    </template>
                    <template v-slot:[`item.barcode`]="{ item }">
                        <v-edit-dialog
                            :return-value.sync="item.barcode"
                            @save="save"
                            @cancel="cancel"
                            :save-text="$t('button.confirm')"
                            :cancel-text="$t('button.cancel')"
                            large
                        >
                            {{ item.barcode }}
                            <template v-slot:input>
                                <v-text-field
                                    v-model="item.barcode"
                                    :label="$t('button.edit')"
                                    single-line
                                    counter
                                ></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <CButtonGroup>
                            <CButton
                                v-for="action in item.actions"
                                :key="action.key"
                                :color="action.color"
                                size="sm"
                                @click="remove(item, action)"
                            >
                                {{ action.title }}
                            </CButton>
                        </CButtonGroup>
                    </template>
                </v-data-table>
                <CRow class="p-2">
                    <CCol md="9" sm="9">
                        <h4 class="my-2">{{ $t("goodscontent") }}</h4>
                    </CCol>
                    <CCol md="3" sm="3" class="text-right">
                        <CButton
                            color="primary"
                            size="sm"
                            v-on:click="add('content')"
                        >
                            <CIcon name="cil-plus" size="sm" />
                        </CButton>
                    </CCol>
                </CRow>
                <hr />
                <v-data-table
                    class="my-2 elevation-1"
                    :headers="table.content.headers"
                    :items="table.content.items"
                    :options.sync="table.content.options"
                    :hide-default-footer="true"
                >
                    <template v-slot:[`item.key`]="{ item }">
                        <v-edit-dialog
                            :return-value.sync="item.key"
                            @save="save"
                            @cancel="cancel"
                            :save-text="$t('button.confirm')"
                            :cancel-text="$t('button.cancel')"
                            large
                        >
                            {{ item.key }}
                            <template v-slot:input>
                                <v-text-field
                                    v-model="item.key"
                                    :label="$t('button.edit')"
                                    single-line
                                    counter
                                ></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:[`item.value`]="{ item }">
                        <v-edit-dialog
                            :return-value.sync="item.value"
                            @save="save"
                            @cancel="cancel"
                            :save-text="$t('button.confirm')"
                            :cancel-text="$t('button.cancel')"
                            large
                        >
                            {{ item.value }}
                            <template v-slot:input>
                                <v-text-field
                                    v-model="item.value"
                                    :label="$t('button.edit')"
                                    single-line
                                    counter
                                ></v-text-field>
                            </template>
                        </v-edit-dialog>
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <CButtonGroup>
                            <CButton
                                v-for="action in item.actions"
                                :key="action.key"
                                :color="action.color"
                                size="sm"
                                @click="remove(item, action)"
                            >
                                {{ action.title }}
                            </CButton>
                        </CButtonGroup>
                    </template>
                </v-data-table>
                <hr />
                <CButton @click="submit" color="primary" class="px-4">
                    {{ $t("button.submit") }}
                    <v-progress-circular
                        v-if="loading"
                        indeterminate
                        color="primary"
                        :size="15"
                    ></v-progress-circular>
                </CButton>
            </form>
        </CCardBody>
    </CCard>
</template>

<script>
import { v4 as uuidv4 } from "uuid";
import {
    goodsTypes,
    goodsCups,
    goodsColors,
    goodsSizes
} from "../../constants";

export default {
    name: "CreateGoods",
    components: {},
    data() {
        return {
            name: "",
            stockAlert: "",
            type: "",
            costprice: "",
            retailprice: "",
            wholesaleprice: "",
            supplier: "",
            warehouses: "",
            categories: "",
            description: "",
            autocomplete: {
                supplier: {
                    items: [],
                    loading: false
                },
                category: {
                    items: [],
                    loading: false
                },
                warehouse: {
                    items: [],
                    loading: false
                }
            },
            table: {
                item: {
                    items: [],
                    headers: [
                        {
                            text: this.$t("cup"),
                            value: "cup",
                            sortable: false,
                            width: "20%"
                        },
                        {
                            text: this.$t("color"),
                            value: "color",
                            sortable: false,
                            width: "20%"
                        },
                        {
                            text: this.$t("size"),
                            value: "size",
                            sortable: false,
                            width: "20%"
                        },
                        {
                            text: this.$t("barcode"),
                            value: "barcode",
                            sortable: false,
                            width: "20%"
                        },
                        {
                            text: this.$t("actions"),
                            value: "actions",
                            sortable: false,
                            width: "20%"
                        }
                    ]
                },
                content: {
                    items: [],
                    headers: [
                        {
                            text: this.$t("contentkey"),
                            value: "key",
                            sortable: false
                        },
                        {
                            text: this.$t("contentvalue"),
                            value: "value",
                            sortable: false
                        },
                        {
                            text: this.$t("actions"),
                            value: "actions",
                            sortable: false
                        }
                    ]
                }
            },
            errors: {},
            loading: false,
            goodsCups: goodsCups,
            goodsTypes: goodsTypes,
            goodsColors: goodsColors,
            goodsSizes: goodsSizes
        };
    },
    watch: {
        "autocomplete.supplier.search": function(val) {
            let self = this;
            let sup = self.autocomplete.supplier;
            if (sup.items.length > 0 || sup.loading) {
                return;
            }
            self.autocomplete.supplier.loading = true;
            this.$store
                .dispatch("goods/supplier/get", {})
                .then(response => {
                    self.autocomplete.supplier.items = response.data;
                    self.autocomplete.supplier.loading = false;
                })
                .catch(error => {
                    self.autocomplete.supplier.loading = false;
                });
        },
        "autocomplete.category.search": function(val) {
            let self = this;
            let cat = self.autocomplete.category;
            if (cat.items.length > 0 || cat.loading) {
                return;
            }
            self.autocomplete.category.loading = true;
            this.$store
                .dispatch("goods/category/get", {})
                .then(response => {
                    self.autocomplete.category.items = response.data;
                    self.autocomplete.category.loading = false;
                })
                .catch(error => {
                    self.autocomplete.category.loading = false;
                });
        },
        "autocomplete.warehouse.search": function(val) {
            let self = this;
            let warehouse = self.autocomplete.warehouse;
            if (warehouse.items.length > 0 || warehouse.loading) {
                return;
            }
            self.autocomplete.warehouse.loading = true;
            this.$store
                .dispatch("goods/warehouse/get", {})
                .then(response => {
                    self.autocomplete.warehouse.items = response.data;
                    self.autocomplete.warehouse.loading = false;
                })
                .catch(error => {
                    self.autocomplete.warehouse.loading = false;
                });
        }
    },
    methods: {
        submit() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {
                name: self.name,
                stock_alert: self.stockAlert,
                type: self.type,
                cost_price: self.costprice,
                wholesale_price: self.wholesaleprice,
                retail_price: self.retailprice,
                supplier: self.supplier,
                categories: self.categories,
                warehouses: self.warehouses,
                description: self.description,
                items: self.table.item.items,
                contents: self.table.content.items
            };
            this.$store
                .dispatch("goods/create", data)
                .then(response => {
                    self.loading = false;
                    self.errors = {};
                    self.$router.back();
                })
                .catch(error => {
                    self.errors = error.response.data?.data;
                    self.loading = false;
                });
        },
        add(key) {
            let self = this;
            switch (key) {
                case "item":
                    self.table.item.items = [
                        ...self.table.item.items,
                        {
                            id: uuidv4(),
                            cup: "",
                            color: "",
                            size: "",
                            barcode: "",
                            actions: [
                                {
                                    key: uuidv4(),
                                    title: this.$t("button.delete"),
                                    type: "item"
                                }
                            ]
                        }
                    ];
                    break;
                case "content":
                    self.table.content.items = [
                        ...self.table.content.items,
                        {
                            id: uuidv4(),
                            key: "",
                            value: "",
                            actions: [
                                {
                                    key: uuidv4(),
                                    title: this.$t("button.delete"),
                                    type: "content"
                                }
                            ]
                        }
                    ];
                    break;
            }
        },
        remove(item, action) {
            let self = this;
            switch (action.type) {
                case "item":
                    {
                        const index = self.table.item.items.findIndex(obj => {
                            return obj.id === item.id;
                        });
                        self.table.item.items.splice(index, 1);
                    }
                    break;
                case "content":
                    {
                        const index = self.table.content.items.findIndex(
                            obj => {
                                return obj.id === item.id;
                            }
                        );
                        self.table.content.items.splice(index, 1);
                    }
                    break;
            }
        },
        save() {},
        cancel() {}
    }
};
</script>

<style scoped>
.v-select {
    font-size: 1em;
    font-weight: 100;
}
.v-text-field >>> input {
    font-size: 0.8em;
    font-weight: 100;
}
.v-text-field >>> label {
    font-size: 0.8em;
}
.v-text-field >>> button {
    font-size: 0.8em;
}
</style>
