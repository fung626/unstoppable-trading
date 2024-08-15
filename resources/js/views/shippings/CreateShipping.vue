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
                        :items="autocomplete.client.items"
                        :loading="autocomplete.client.loading"
                        @update:search="getClients"
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
                        <CCol md="12" sm="12">
                            <CInputGroup class="mb-3">
                                <CButton color="primary" size="sm">
                                    <CIcon
                                        name="cil-magnifying-glass"
                                        size="sm"
                                    />
                                </CButton>
                                <CFormInput size="sm" v-model="search" />
                            </CInputGroup>
                        </CCol>
                    </CRow>
                    <v-data-table
                        class="my-2 elevation-1"
                        :headers="table.item.headers"
                        :items="items"
                        :search="table.item.search"
                        :loading="fetchLoading.table"
                    >
                        <template v-slot:body="{ items, headers }">
                            <tbody>
                                <tr v-for="(item, idx) in items" :key="idx">
                                    <td
                                        v-for="(header, key) in headers"
                                        :key="key"
                                    >
                                        <div
                                            v-if="
                                                isRowEditable(header.value) &&
                                                item[header.value]
                                            "
                                        >
                                            <v-edit-dialog
                                                :v-model:propName="
                                                    item[header.value].unit
                                                "
                                                @save="save(idx)"
                                                :save-text="
                                                    $t('button.confirm')
                                                "
                                                :cancel-text="
                                                    $t('button.cancel')
                                                "
                                                large
                                            >
                                                {{ item[header.value].unit }}
                                                <template v-slot:input>
                                                    <vue-number-input
                                                        class="m-4"
                                                        size="small"
                                                        v-model="
                                                            item[header.value]
                                                                .unit
                                                        "
                                                        :min="0"
                                                        :max="
                                                            item[header.value]
                                                                ? item[
                                                                      header
                                                                          .value
                                                                  ].stock_unit
                                                                : 0
                                                        "
                                                        inline
                                                        center
                                                        controls
                                                    ></vue-number-input>
                                                </template>
                                            </v-edit-dialog>
                                        </div>
                                        <div
                                            v-else-if="
                                                isRowEditable(header.value)
                                            "
                                        >
                                            －
                                        </div>
                                        <div
                                            v-else-if="
                                                isCurrencyRow(header.value)
                                            "
                                        >
                                            <div v-if="item[header.value]">
                                                {{
                                                    `${item[
                                                        header.value
                                                    ].toLocaleString()}`
                                                }}
                                            </div>
                                        </div>
                                        <div v-else>
                                            {{ item[header.value] }}
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class="p-2" colspan="4">
                                        {{ $t("totalunit") }} {{ ": " }}
                                        <span v-if="totalunit">
                                            {{ totalunit.toLocaleString() }}
                                        </span>
                                        <span v-else>
                                            {{ "0".toLocaleString() }}
                                        </span>
                                    </td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td class="p-2" colspan="4">
                                        {{ $t("subtotal") }} {{ ": " }}
                                        <span v-if="subtotal">
                                            {{ "$" }}
                                            {{ subtotal.toLocaleString() }}
                                            {{ currency }}
                                        </span>
                                        <span v-else>
                                            {{ "0".toLocaleString() }}
                                            {{ currency }}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
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

export default {
    name: "CreateShipping",
    components: {
        Dialog,
        ScannerDialog,
    },
    data() {
        return {
            fetchLoading: {
                form: false,
                table: false,
            },
            loading: false,
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
                        { text: "#ID", value: "id" },
                        { title: this.$t("name"), value: "name" },
                        { title: this.$t("type"), value: "type" },
                        { title: this.$t("cup"), value: "cup" },
                        { title: this.$t("color"), value: "color" },
                        { text: "32-S", value: "32-S" },
                        { text: "34-M", value: "34-M" },
                        { text: "36-L", value: "36-L" },
                        { text: "38-XL", value: "38-XL" },
                        { text: "40-Q", value: "40-Q" },
                        { text: "42-EQ", value: "42-EQ" },
                        { text: "44-Free", value: "44-Free" },
                        {
                            text: `${this.$t("unitprice")}($)`,
                            value: "unit_price",
                        },
                        { title: this.$t("totalunit"), value: "total_unit" },
                        {
                            text: `${this.$t("cost")}($)`,
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
            this.number = this.client.number;
            this.name = this.client.name;
            this.contact = this.client.contact;
            this.phoneCountryCode = this.client.phone_country_code;
            this.phone = this.client.phone;
            this.email = this.client.email;
            this.address = this.client.address;
            this.currency = this.client.currency;
        },
    },
    mounted() {
        this.fetch();
        this.getClients();
    },
    methods: {
        fetch() {
            let self = this;
            if (self.fetchLoading.table || this.shippingData.length === 0) {
                return;
            }
            self.fetchLoading.table = true;
            let data = {
                items: this.shippingData,
            };
            this.$store
                .dispatch("goods/shippings/format", data)
                .then((response) => {
                    self.updateTable();
                    self.fetchLoading.table = false;
                })
                .catch((error) => {
                    self.updateTable();
                    self.fetchLoading.table = false;
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
                    self.$router.back();
                })
                .catch((error) => {
                    self.loading = false;
                    self.errors = error.response.data?.data;
                });
        },
        isRowEditable(value) {
            return goodsSizes.find((obj) => obj.name === value);
        },
        isCurrencyRow(value) {
            const rows = ["unit_price", "cost"];
            const idx = rows.indexOf(value);
            return idx > -1 ? true : false;
        },
        save(idx) {
            let item = this.items[idx];
            let sizes = goodsSizes;
            let totalunit = 0;
            for (let size of sizes) {
                if (item[size.name]) {
                    if (item[size.name].unit > item[size.name].stock_unit) {
                        item[size.name].unit = item[size.name].stock_unit;
                        return false;
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
        getClients() {
            let self = this;
            let cli = self.autocomplete.client;
            if (cli.items.length > 0 || cli.loading) {
                return;
            }
            self.autocomplete.client.loading = true;
            this.$store
                .dispatch("clients/get", {})
                .then((response) => {
                    self.autocomplete.client.items = response.data;
                    self.autocomplete.client.loading = false;
                })
                .catch((error) => {
                    self.autocomplete.client.loading = false;
                });
        },
        async scanner() {
            await this.$refs.scannerDialog.open("Shipping");
        },
    },
};
</script>

<style scoped>
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
