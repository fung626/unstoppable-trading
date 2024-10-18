<template>
    <div>
        <Dialog ref="dialog" />
        <ScannerDialog ref="scannerDialog" />
        <AddNewShippingItemsTableDialog ref="newShippingItemsTableDialog" />
        <CCard>
            <v-progress-linear
                :active="fetchLoading.form"
                indeterminate
                color="cyan"
            ></v-progress-linear>
            <CCardBody>
                <CRow class="px-2">
                    <CCol md="9" sm="9">
                        <h4>{{ $t("create") }}{{ $t("shippings.title") }}</h4>
                    </CCol>
                    <CCol md="3" sm="3" class="text-right">
                        <CButtonGroup role="group">
                            <CButton
                                v-on:click="showNewShippingItemsTable"
                                class="d-flex align-items-center justify-content-center"
                                color="primary"
                                size="sm"
                                :disabled="
                                    fetchLoading.form || fetchLoading.form
                                "
                            >
                                <CIcon
                                    class="mx-1"
                                    name="cil-playlist-add"
                                    size="sm"
                                />
                                {{ $t("shipping.add-shipment-goods") }}
                            </CButton>
                            <CButton
                                v-on:click="scanner"
                                class="d-flex align-items-center justify-content-center"
                                color="primary"
                                size="sm"
                                :disabled="
                                    fetchLoading.form || fetchLoading.form
                                "
                            >
                                <CIcon
                                    class="mx-1"
                                    name="cil-barcode"
                                    size="sm"
                                />
                                {{ $t("scanner") }}
                            </CButton>
                        </CButtonGroup>
                    </CCol>
                </CRow>
                <hr />
                <form>
                    <v-autocomplete
                        v-model="client"
                        v-model:search="autocomplete.client.search"
                        :label="$t('client')"
                        :items="autocomplete.client.items"
                        :loading="autocomplete.client.loading"
                        required
                        outlined
                        dense
                        hide-selected
                        item-title="title"
                        item-value="id"
                        return-object
                        :error="errors['client'] ? true : false"
                        :error-messages="errors['client']"
                    ></v-autocomplete>
                    <v-text-field
                        v-model="number"
                        :label="$t('number')"
                        required
                        outlined
                        dense
                        clearable
                        :error="errors['client_number'] ? true : false"
                        :error-messages="errors['client_number']"
                    ></v-text-field>
                    <v-text-field
                        v-model="name"
                        :label="$t('name')"
                        required
                        outlined
                        dense
                        clearable
                        :error="errors['client_name'] ? true : false"
                        :error-messages="errors['client_name']"
                    ></v-text-field>
                    <v-text-field
                        v-model="contact"
                        :label="$t('contact')"
                        required
                        outlined
                        dense
                        clearable
                        :error="errors['client_contact'] ? true : false"
                        :error-messages="errors['client_contact']"
                    ></v-text-field>
                    <CRow>
                        <CCol md="2" sm="5">
                            <v-select
                                v-model="phoneCountryCode"
                                :items="countryCodes"
                                :label="$t('countrycode')"
                                item-title="name"
                                item-value="value"
                                required
                                outlined
                                dense
                                :error="
                                    errors['client_phone_country_code']
                                        ? true
                                        : false
                                "
                                :error-messages="
                                    errors['client_phone_country_code']
                                "
                            ></v-select>
                        </CCol>
                        <CCol md="10" sm="7">
                            <v-text-field
                                v-model="phone"
                                :label="$t('phone')"
                                required
                                outlined
                                dense
                                clearable
                                :error="errors['client_phone'] ? true : false"
                                :error-messages="errors['client_phone']"
                            ></v-text-field>
                        </CCol>
                    </CRow>
                    <v-text-field
                        v-model="email"
                        :label="$t('email')"
                        required
                        outlined
                        dense
                        clearable
                    ></v-text-field>
                    <v-text-field
                        v-model="address"
                        :label="$t('address')"
                        outlined
                        dense
                        clearable
                    ></v-text-field>
                    <v-select
                        v-model="status"
                        :items="shippingStatus"
                        :label="$t('status')"
                        item-title="name"
                        item-value="value"
                        required
                        outlined
                        dense
                        return-object
                        :error="errors['status'] ? true : false"
                        :error-messages="errors['status']"
                    ></v-select>
                    <v-select
                        v-model="currency"
                        :items="currencies"
                        :label="$t('currency')"
                        item-title="name"
                        item-value="value"
                        required
                        outlined
                        dense
                        return-object
                        :error="errors['currency'] ? true : false"
                        :error-messages="errors['currency']"
                    ></v-select>

                    <hr />
                    <CRow class="p-2">
                        <CCol>
                            <CInputGroup class="mb-3">
                                <CButton color="primary" size="sm">
                                    <CIcon
                                        name="cil-magnifying-glass"
                                        size="sm"
                                    />
                                </CButton>
                                <CFormInput size="sm" v-model="table.search" />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <v-data-table
                        class="my-2 elevation-1"
                        :headers="table.headers"
                        :items="items"
                        :search="table.search"
                        :loading="fetchLoading.table"
                        hide-default-footer
                    >
                        <template v-slot:loading>
                            <v-skeleton-loader
                                type="table-row@10"
                            ></v-skeleton-loader>
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
                            v-slot:[`item.${x}`]="{ index, item }"
                            :key="x"
                        >
                            <div
                                class="d-flex align-items-center justify-items-center"
                            >
                                <div
                                    v-if="item[x] && item[x].stock_unit > 0"
                                    :style="{ width: '94px' }"
                                >
                                    <CRow>
                                        <CCol :sm="8">
                                            <input
                                                v-model="item[x].unit"
                                                type="number"
                                                :min="0"
                                                :max="item[x].stock_unit"
                                                @change="change(index, item)"
                                            />
                                        </CCol>
                                        <CCol :sm="4">
                                            <strong
                                                class="nowrap"
                                                :style="{ width: '40%' }"
                                            >
                                                {{ `／${item[x].stock_unit}` }}
                                            </strong>
                                        </CCol>
                                    </CRow>
                                </div>
                                <span v-else>－</span>
                            </div>
                        </template>
                        <template v-slot:[`item.unit_price`]="{ item }">
                            <span v-if="item.unit_price">
                                {{
                                    `$ ${(
                                        item.unit_price * 1
                                    ).toLocaleString()}`
                                }}
                            </span>
                            <span v-else>－</span>
                        </template>
                        <template v-slot:[`item.total_unit`]="{ item }">
                            <span v-if="item.total_unit">
                                {{ (item.total_unit * 1).toLocaleString() }}
                            </span>
                            <span v-else>－</span>
                        </template>
                        <template v-slot:[`item.cost`]="{ item }">
                            <span v-if="item.cost">
                                {{ `$ ${(item.cost * 1).toLocaleString()}` }}
                            </span>
                            <span v-else>－</span>
                        </template>
                        <template v-slot:[`body.append`]>
                            <tr>
                                <td v-for="i in [...Array(10)]" :key="i"></td>
                                <td class="p-2" colspan="2">
                                    {{ `${$t("total-unit")}:` }}
                                </td>
                                <td class="p-2" colspan="4">
                                    <span v-if="totalunit">
                                        {{ (totalunit * 1).toLocaleString() }}
                                    </span>
                                    <span v-else>
                                        {{ "0".toLocaleString() }}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td v-for="i in [...Array(10)]" :key="i"></td>
                                <td class="p-2" colspan="2">
                                    {{ `${$t("subtotal")}:` }}
                                </td>
                                <td class="p-2" colspan="4">
                                    <span v-if="subtotal">
                                        {{
                                            `$ ${(
                                                subtotal * 1
                                            ).toLocaleString()} ${currency}`
                                        }}
                                    </span>
                                    <span v-else>
                                        {{ "$ " }}
                                        {{ "0".toLocaleString() }}
                                        {{ currency }}
                                    </span>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                    <hr />
                    <CButton @click="submit" color="primary" class="px-4">
                        <v-progress-circular
                            v-if="loading"
                            indeterminate
                            :size="15"
                        ></v-progress-circular>
                        {{ $t("button.submit") }}
                    </CButton>
                </form>
            </CCardBody>
        </CCard>
    </div>
</template>
<script>
//
import {
    AddNewShippingItemsTableDialog,
    Dialog,
    ScannerDialog,
} from "@/components";
import {
    countryCodes,
    currencies,
    goodsSizes,
    shippingStatus,
} from "@/constants";
import { mapState } from "vuex";
import QuickAddNewShippingItem from "./components/QuickAddNewShippingItem.vue";

export default {
    name: "CreateShipping",
    components: {
        Dialog,
        AddNewShippingItemsTableDialog,
        QuickAddNewShippingItem,
        ScannerDialog,
    },
    computed: {
        ...mapState(["goods/create-shipping-config"]),
        ...mapState(["goods/shipping-cart"]),
        ...mapState(["goods/shippings"]),
        config() {
            let data = this["goods/create-shipping-config"].data;
            if (data) {
                return JSON.parse(JSON.stringify(data));
            }
            return {};
        },
        shippingItems() {
            return this["goods/shipping-cart"].items;
        },
    },
    data() {
        return {
            fetchLoading: {
                form: false,
                table: false,
            },
            loading: false,
            items: [],
            totalunit: 0,
            subtotal: 0,
            error: false,
            client: "",
            number: "",
            name: "",
            contact: "",
            phoneCountryCode: "",
            phone: "",
            email: "",
            address: "",
            currency: "",
            status: "PENDING",
            autocomplete: {
                client: {
                    search: null,
                    items: [],
                    loading: false,
                },
            },
            table: {
                search: null,
                headers: [
                    { title: "#ID", value: "id", sortable: true },
                    {
                        title: this.$t("name"),
                        value: "name",
                        sortable: true,
                    },
                    {
                        title: this.$t("type"),
                        value: "type",
                        sortable: true,
                    },
                    { title: this.$t("cup"), value: "cup", sortable: true },
                    {
                        title: this.$t("color"),
                        value: "color",
                        sortable: true,
                    },
                    { title: "32-S", value: "32-S" },
                    { title: "34-M", value: "34-M" },
                    { title: "36-L", value: "36-L" },
                    { title: "38-XL", value: "38-XL" },
                    { title: "40-Q", value: "40-Q" },
                    { title: "42-EQ", value: "42-EQ" },
                    { title: "44-Free", value: "44-Free" },
                    {
                        title: `${this.$t("unit-price")}($)`,
                        value: "unit_price",
                        sortable: true,
                    },
                    {
                        title: this.$t("total-unit"),
                        value: "total_unit",
                        sortable: true,
                    },
                    {
                        title: `${this.$t("cost")}($)`,
                        value: "cost",
                    },
                ],
            },
            errors: {},
            countryCodes: countryCodes,
            currencies: currencies,
            shippingStatus: shippingStatus,
        };
    },
    watch: {
        // shippingItems: {
        //     handler(val) {
        //     },
        //     deep: true,
        // },
        client() {
            // console.log(this.client);
            if (this.client) {
                this.number = this.client.number;
                this.name = this.client.name;
                this.contact = this.client.contact;
                this.phoneCountryCode = this.client.phone_country_code;
                this.phone = this.client.phone;
                this.email = this.client.email;
                this.address = this.client.address;
                this.currency = this.client.currency;
                this.$store.dispatch("goods/shipping-cart/update-client", {
                    data: this.client,
                });
            }
        },
    },
    mounted() {
        this.fetch();
        let client = this["goods/shipping-cart"].client;
        // console.log(client);
        if (client && Object.keys(client).length > 0) {
            this.client = client;
            this.number = this.client.number;
            this.name = this.client.name;
            this.contact = this.client.contact;
            this.phoneCountryCode = this.client.phone_country_code;
            this.phone = this.client.phone;
            this.email = this.client.email;
            this.address = this.client.address;
            this.currency = this.client.currency;
        }
    },
    methods: {
        fetch() {
            let self = this;
            if (self.fetchLoading.table) {
                return;
            }
            self.fetchLoading.table = true;
            self.autocomplete.client.loading = true;
            let data = {
                items: this.shippingItems,
            };
            this.$store
                .dispatch("goods/create-shipping-config/get", data)
                .then((response) => {
                    // console.log(response);
                    self.autocomplete.client.items = response.data.clients;
                    self.items = JSON.parse(
                        JSON.stringify(response.data.items)
                    );
                    self.fetchLoading.table = false;
                    self.autocomplete.client.loading = false;
                    self.updateTable();
                })
                .catch((error) => {
                    self.fetchLoading.table = false;
                    self.autocomplete.client.loading = false;
                    self.updateTable();
                });
        },
        submit() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {
                client: self.client,
                client_number: self.number,
                client_name: self.name,
                client_contact: self.contact,
                client_phone_country_code: self.phoneCountryCode,
                client_phone: self.phone,
                client_email: self.email,
                client_address: self.address,
                status: self.status,
                currency: self.currency,
                items: self.items,
            };
            this.$store
                .dispatch("goods/shippings/create", data)
                .then((response) => {
                    self.loading = false;
                    self.$store.dispatch("goods/shipping-cart/clear");
                    self.$router.push({ path: "/shippings" });
                })
                .catch((error) => {
                    self.loading = false;
                    self.errors = error.response.data?.data;
                });
        },
        change(idx, item) {
            // console.log(idx, item);
            // let item = this.items[idx];
            let sizes = goodsSizes;
            let totalunit = 0;
            for (let size of sizes) {
                if (item[size.name]) {
                    if (item[size.name].unit > item[size.name].stock_unit) {
                        item[size.name].unit = item[size.name].stock_unit;
                        return;
                    } else if (item[size.name].unit < 0) {
                        item[size.name].unit = 0;
                        return;
                    }
                    this.$store.dispatch(
                        "goods/shipping-cart/update-item-unit",
                        {
                            data: {
                                id: item[size.name].goods_item_id,
                                unit: item[size.name].unit,
                            },
                        }
                    );
                    totalunit += item[size.name].unit;
                }
            }
            this.items[idx].total_unit = totalunit;
            this.items[idx].cost = totalunit * this.items[idx].unit_price;
            this.updateTable();
        },
        updateTable() {
            this.totalunit = 0;
            this.subtotal = 0;
            for (let item of this.items) {
                this.totalunit += item.total_unit;
                this.subtotal += item.cost;
            }
        },
        async scanner() {
            await this.$refs.scannerDialog.open("Shipping");
        },
        async showNewShippingItemsTable() {
            if (await this.$refs.newShippingItemsTableDialog.open()) {
                this.fetch();
            }
        },
    },
};
</script>

<style scoped>
/* .num-wrapper {
    max-width: 124px;
    min-width: 124px;
} */
.nowrap {
    white-space: nowrap;
}
.v-select {
    font-size: 1em;
    font-weight: 100;
}
.v-text-field--outlined >>> fieldset {
    border-color: #ccc;
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
