<template>
    <div>
        <Dialog ref="dialog" />
        <ScannerDialog ref="scannerDialog" />
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
                        <CButton
                            color="primary"
                            size="sm"
                            v-on:click="scanner"
                            :disabled="fetchLoading.form || fetchLoading.form"
                        >
                            <CIcon name="cil-barcode" size="sm" />
                        </CButton>
                    </CCol>
                </CRow>
                <hr />
                <form>
                    <v-autocomplete
                        v-model="client"
                        v-model:search="search"
                        :items="autocomplete.client.items"
                        :loading="autocomplete.client.loading"
                        required
                        outlined
                        dense
                        hide-no-data
                        hide-selected
                        item-title="name"
                        item-value="id"
                        :label="$t('client')"
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
                                <CFormInput
                                    size="sm"
                                    v-model="table.item.search"
                                />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <v-data-table
                        class="my-2 elevation-1"
                        :headers="table.item.headers"
                        :items="items"
                        :search="table.item.search"
                        :loading="fetchLoading.table"
                        hide-default-footer
                    >
                        <template v-slot:loading>
                            <v-skeleton-loader
                                type="table-row@10"
                            ></v-skeleton-loader>
                        </template>
                        <template v-slot:[`item.32-S`]="{ index, item }">
                            <div v-if="item['32-S']">
                                <v-text-field
                                    v-model="item['32-S'].unit"
                                    type="number"
                                    variant="plain"
                                    control-variant="split"
                                    hide-details
                                    @change="change(index, item)"
                                ></v-text-field>
                            </div>
                            <span v-else>－</span>
                        </template>
                        <template v-slot:[`item.34-M`]="{ index, item }">
                            <div v-if="item['34-M']">
                                <v-text-field
                                    v-model="item['34-M'].unit"
                                    type="number"
                                    variant="plain"
                                    hide-details
                                    hide-spin-buttons
                                    @change="change(index, item)"
                                ></v-text-field>
                            </div>
                            <span v-else>－</span>
                        </template>
                        <template v-slot:[`item.36-L`]="{ index, item }">
                            <div>
                                <v-text-field
                                    v-if="item['36-L']"
                                    v-model="item['36-L'].unit"
                                    type="number"
                                    variant="plain"
                                    hide-details
                                    hide-spin-buttons
                                    @change="change(index, item)"
                                ></v-text-field>
                                <span v-else>－</span>
                            </div>
                        </template>
                        <template v-slot:[`item.38-XL`]="{ index, item }">
                            <div>
                                <v-text-field
                                    v-if="item['38-XL']"
                                    v-model="item['38-XL'].unit"
                                    type="number"
                                    variant="plain"
                                    hide-details
                                    hide-spin-buttons
                                    @change="change(index, item)"
                                ></v-text-field>
                                <span v-else>－</span>
                            </div>
                        </template>
                        <template v-slot:[`item.40-Q`]="{ index, item }">
                            <div>
                                <v-text-field
                                    v-if="item['40-Q']"
                                    v-model="item['40-Q'].unit"
                                    type="number"
                                    variant="plain"
                                    hide-details
                                    hide-spin-buttons
                                    @change="change(index, item)"
                                ></v-text-field>
                                <span v-else>－</span>
                            </div>
                        </template>
                        <template v-slot:[`item.42-EQ`]="{ index, item }">
                            <div>
                                <v-text-field
                                    v-if="item['42-EQ']"
                                    v-model="item['42-EQ'].unit"
                                    type="number"
                                    variant="plain"
                                    hide-details
                                    hide-spin-buttons
                                    @change="change(index, item)"
                                ></v-text-field>
                                <span v-else>－</span>
                            </div>
                        </template>
                        <template v-slot:[`item.44-Free`]="{ index, item }">
                            <div>
                                <v-text-field
                                    v-if="item['44-Free']"
                                    v-model="item['44-Free'].unit"
                                    type="number"
                                    variant="plain"
                                    hide-details
                                    hide-spin-buttons
                                    @change="change(index, item)"
                                ></v-text-field>
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
import { Dialog, ScannerDialog } from "@/components";
import {
    countryCodes,
    currencies,
    goodsSizes,
    shippingStatus,
} from "@/constants";
import { mapState } from "vuex";

export default {
    name: "CreateShipping",
    components: {
        Dialog,
        ScannerDialog,
    },
    computed: {
        ...mapState(["goods/create-shipping-config"]),
        ...mapState(["goods/shippings"]),
        config() {
            let data = this["goods/create-shipping-config"].data;
            if (data) {
                return JSON.parse(JSON.stringify(data));
            }
            return {};
        },
        shippingData() {
            return this["goods/shippings"].shippingData;
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
                    items: [],
                    loading: false,
                },
            },
            table: {
                item: {
                    search: "",
                    headers: [
                        { title: "#ID", value: "id" },
                        { title: this.$t("name"), value: "name" },
                        { title: this.$t("type"), value: "type" },
                        { title: this.$t("cup"), value: "cup" },
                        { title: this.$t("color"), value: "color" },
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
                        },
                        { title: this.$t("total-unit"), value: "total_unit" },
                        {
                            title: `${this.$t("cost")}($)`,
                            value: "cost",
                        },
                    ],
                },
            },
            errors: {},
            countryCodes: countryCodes,
            currencies: currencies,
            shippingStatus: shippingStatus,
        };
    },
    watch: {
        shippingData() {
            this.fetch();
        },
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
            }
        },
    },
    mounted() {
        this.fetch();
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
                items: this.shippingData,
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
                    self.$store.dispatch("goods/shippings/clear");
                    self.$router.push({ path: "#/shippings" });
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
    },
};
</script>

<style scoped>
/* .num-wrapper {
    max-width: 124px;
    min-width: 124px;
} */
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
