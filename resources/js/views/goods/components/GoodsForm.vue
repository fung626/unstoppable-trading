<template>
    <CCard class="border-0">
        <v-progress-linear
            :active="fetchLoading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CCardBody>
            <form v-on:submit.prevent>
                <v-text-field
                    v-model="formData.name"
                    :label="$t('name')"
                    :error="errors.name ? true : false"
                    :error-messages="errors.name"
                    required
                    outlined
                    dense
                    clearable
                    maxlength="45"
                ></v-text-field>
                <v-text-field
                    v-model="formData.stock_alert"
                    :label="$t('stockalert')"
                    :error="errors.stock_alert ? true : false"
                    :error-messages="errors.stock_alert"
                    type="number"
                    required
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <CRow>
                    <CCol md="3" sm="3">
                        <v-text-field
                            v-model="formData.cost_price"
                            :error="errors.cost_price ? true : false"
                            :error-messages="errors.cost_price"
                            :label="$t('price.cost')"
                            type="number"
                            required
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </CCol>
                    <CCol md="3" sm="3">
                        <v-text-field
                            v-model="formData.wholesale_price"
                            :error="errors.wholesale_price ? true : false"
                            :error-messages="errors.wholesale_price"
                            :label="$t('price.wholesale')"
                            type="number"
                            required
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </CCol>
                    <CCol md="3" sm="3">
                        <v-text-field
                            v-model="formData.retail_price"
                            :error="errors.retail_price ? true : false"
                            :error-messages="errors.retail_price"
                            :label="$t('price.retail')"
                            type="number"
                            required
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </CCol>
                    <CCol md="3" sm="3">
                        <v-select
                            v-model="formData.type"
                            :items="goodsTypes"
                            :label="$t('type')"
                            :error="errors.type ? true : false"
                            :error-messages="errors.type"
                            item-text="name"
                            item-value="name"
                            disabled
                            required
                            outlined
                            dense
                        ></v-select>
                    </CCol>
                </CRow>
                <v-autocomplete
                    v-model="formData.supplier"
                    :items="supplier.items"
                    :loading="supplier.loading"
                    :search-input.sync="supplier.search"
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
                    v-model="formData.categories"
                    :items="category.items"
                    :loading="category.loading"
                    :search-input.sync="category.search"
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
                    v-model="formData.warehouses"
                    :items="warehouse.items"
                    :loading="warehouse.loading"
                    :search-input.sync="warehouse.search"
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
                    v-model="formData.description"
                    :label="$t('description')"
                    required
                    outlined
                    dense
                    clearable
                >
                </v-text-field>
                <hr />
                <CButton
                    @click="update"
                    v-if="$store.getters.isAdmin"
                    color="primary"
                    class="px-4"
                >
                    {{ $t("button.update") }}
                    <v-progress-circular
                        v-if="updateLoading"
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
//
import { goodsTypes } from "@/constants";

export default {
    name: "GoodsForm",
    components: {},
    props: {
        id: null
    },
    data() {
        return {
            formData: {},
            errors: {},
            fetchLoading: false,
            updateLoading: false,
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
            },
            goodsTypes: goodsTypes
        };
    },
    watch: {
        supplier: [
            function search(val) {
                let self = this;
                if (self.supplier.length > 0 || self.supplier.loading) return;
                self.supplier.loading = true;
                this.$store
                    .dispatch("goods/supplier/get", {})
                    .then(response => {
                        self.supplier.items = response.data;
                        self.supplier.loading = false;
                    })
                    .catch(error => {
                        self.supplier.loading = false;
                    });
            }
        ],
        category: [
            function search(val) {
                let self = this;
                if (self.category.length > 0 || self.category.loading) return;
                self.category.loading = true;
                this.$store
                    .dispatch("goods/category/get", {})
                    .then(response => {
                        self.category.items = response.data;
                        self.category.loading = false;
                    })
                    .catch(error => {
                        self.category.loading = false;
                    });
            }
        ],
        warehouse: [
            function search(val) {
                let self = this;
                if (self.warehouse.length > 0 || self.warehouse.loading) return;
                self.warehouse.loading = true;
                this.$store
                    .dispatch("goods/warehouse/get", {})
                    .then(response => {
                        self.warehouse.items = response.data;
                        self.warehouse.loading = false;
                    })
                    .catch(error => {
                        self.warehouse.loading = false;
                    });
            }
        ]
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            let self = this;
            if (self.fetchLoading) {
                return;
            }
            let data = {
                id: self.$props.id
            };
            self.fetchLoading = true;
            this.$store
                .dispatch("goods/details", data)
                .then(response => {
                    self.formData = JSON.parse(JSON.stringify(response.data));
                    self.fetchLoading = false;
                })
                .catch(error => {
                    self.fetchLoading = false;
                });
        },
        update() {
            let self = this;
            if (self.updateLoading) {
                return;
            }
            self.updateLoading = true;
            this.$store
                .dispatch("goods/update", self.formData)
                .then(response => {
                    self.formData = JSON.parse(JSON.stringify(response.data));
                    self.errors = {};
                    self.updateLoading = false;
                })
                .catch(error => {
                    self.errors = error.response.data?.data;
                    self.updateLoading = false;
                });
        }
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
