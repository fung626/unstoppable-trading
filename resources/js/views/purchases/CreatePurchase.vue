<template>
    <CCard>
        <CreatePurchaseDialog ref="scannerDialog" />
        <v-progress-linear
            :active="fetchLoading.form"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CCardBody>
            <CRow class="px-2">
                <CCol md="9" sm="9">
                    <h4>{{ $t("create") }}{{ $t("purchase.title") }}</h4>
                </CCol>
                <CCol md="3" sm="3" class="text-right">
                    <CButton
                        color="primary"
                        size="sm"
                        v-on:click="scanner"
                        :disabled="fetchLoading.form"
                    >
                        <CIcon name="cil-barcode" size="sm" />
                    </CButton>
                </CCol>
            </CRow>
            <hr />
            <form>
                <v-text-field
                    v-model="supplierNumber"
                    :label="$t('number')"
                    required
                    outlined
                    dense
                    clearable
                    :error="errors['to_company_number'] ? true : false"
                    :error-messages="errors['to_company_number']"
                ></v-text-field>
                <v-text-field
                    v-model="supplierName"
                    :label="$t('supplier')"
                    required
                    outlined
                    dense
                    clearable
                    :error="errors['to_company'] ? true : false"
                    :error-messages="errors['to_company']"
                ></v-text-field>
                <v-expansion-panels>
                    <v-expansion-panel>
                        <v-expansion-panel-title>
                            {{ $t("more") }}
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <v-text-field
                                v-model="contact"
                                :label="$t('contact')"
                                required
                                outlined
                                dense
                                clearable
                                :error="errors['to_contact'] ? true : false"
                                :error-messages="errors['to_contact']"
                            ></v-text-field>
                            <CRow>
                                <CCol :md="2" :sm="5">
                                    <v-select
                                        v-model="phoneCountryCode"
                                        :items="countryCodes"
                                        :label="$t('countrycode')"
                                        item-title="name"
                                        item-value="value"
                                        required
                                        outlined
                                        dense
                                    ></v-select>
                                </CCol>
                                <CCol :md="10" :sm="7">
                                    <v-text-field
                                        v-model="phone"
                                        :label="$t('phone')"
                                        required
                                        outlined
                                        dense
                                        clearable
                                        :error="
                                            errors['to_phone'] ? true : false
                                        "
                                        :error-messages="errors['to_phone']"
                                    ></v-text-field>
                                </CCol>
                            </CRow>
                            <CRow>
                                <CCol :md="2" :sm="5">
                                    <v-select
                                        v-model="faxCountryCode"
                                        :items="countryCodes"
                                        :label="$t('countrycode')"
                                        item-title="name"
                                        item-value="value"
                                        required
                                        outlined
                                        dense
                                    ></v-select>
                                </CCol>
                                <CCol :md="10" :sm="7">
                                    <v-text-field
                                        v-model="fax"
                                        :label="$t('fax')"
                                        required
                                        outlined
                                        dense
                                        clearable
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
                                :error="errors['to_email'] ? true : false"
                                :error-messages="errors['to_email']"
                            ></v-text-field>
                            <v-text-field
                                v-model="address"
                                :label="$t('address')"
                                required
                                outlined
                                dense
                                clearable
                                :error="errors['address'] ? true : false"
                                :error-messages="errors['address']"
                            ></v-text-field>
                            <v-select
                                v-model="status"
                                :items="purchaseStatus"
                                :label="$t('status')"
                                item-title="name"
                                item-value="value"
                                required
                                outlined
                                dense
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
                                :error="errors['currency'] ? true : false"
                                :error-messages="errors['currency']"
                            ></v-select>
                            <v-date-input
                                :label="$t('date')"
                                v-model="date"
                                prepend-icon=""
                                clearable
                                outlined
                            ></v-date-input>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
                <CRow class="p-2">
                    <CCol md="12" sm="12">
                        <h4 class="my-2">{{ $t("purchase.title") }}</h4>
                    </CCol>
                </CRow>
                <hr />
                <CRow class="p-2">
                    <CCol md="12" sm="12">
                        <CInputGroup class="mb-3">
                            <CButton color="primary" size="sm">
                                <CIcon name="cil-magnifying-glass" size="sm" />
                            </CButton>
                            <CFormInput size="sm" v-model="table.item.search" />
                        </CInputGroup>
                    </CCol>
                </CRow>
                <v-data-table
                    class="my-2 elevation-1"
                    :headers="table.item.headers"
                    :items="items"
                    :search="table.item.search"
                    :loading="fetchLoading.table"
                    :mobile-breakpoint="0"
                >
                    <template v-slot:loading>
                        <v-skeleton-loader
                            type="table-row@10"
                        ></v-skeleton-loader>
                    </template>
                    <template v-slot:[`item.32-S`]="{ index, item }">
                        <v-number-input
                            v-if="item['32-S']"
                            v-model="item['32-S'].unit"
                            type="number"
                            variant="plain"
                            hide-details
                            required
                            dense
                            clearable
                            :min="0"
                            @change="change(index, item)"
                        ></v-number-input>
                        <span v-else>－</span>
                    </template>
                    <template v-slot:[`item.34-M`]="{ index, item }">
                        <v-number-input
                            v-if="item['34-M']"
                            v-model="item['34-M'].unit"
                            type="number"
                            variant="plain"
                            hide-details
                            required
                            dense
                            clearable
                            :min="0"
                            @change="change(index, item)"
                        ></v-number-input>
                        <span v-else>－</span>
                    </template>
                    <template v-slot:[`item.36-L`]="{ index, item }">
                        <v-number-input
                            v-if="item['36-L']"
                            v-model="item['36-L'].unit"
                            type="number"
                            variant="plain"
                            hide-details
                            required
                            dense
                            clearable
                            :min="0"
                            @change="change(index, item)"
                        ></v-number-input>
                        <span v-else>－</span>
                    </template>
                    <template v-slot:[`item.38-XL`]="{ index, item }">
                        <v-number-input
                            v-if="item['38-XL']"
                            v-model="item['38-XL'].unit"
                            type="number"
                            variant="plain"
                            hide-details
                            required
                            dense
                            clearable
                            :min="0"
                            @change="change(index, item)"
                        ></v-number-input>
                        <span v-else>－</span>
                    </template>
                    <template v-slot:[`item.40-Q`]="{ index, item }">
                        <v-number-input
                            v-if="item['40-Q']"
                            v-model="item['40-Q'].unit"
                            type="number"
                            variant="plain"
                            hide-details
                            required
                            dense
                            clearable
                            :min="0"
                            @change="change(index, item)"
                        ></v-number-input>
                        <span v-else>－</span>
                    </template>
                    <template v-slot:[`item.42-EQ`]="{ index, item }">
                        <v-number-input
                            v-if="item['42-EQ']"
                            v-model="item['42-EQ'].unit"
                            type="number"
                            variant="plain"
                            hide-details
                            required
                            dense
                            clearable
                            :min="0"
                            @change="change(index, item)"
                        ></v-number-input>
                        <span v-else>－</span>
                    </template>
                    <template v-slot:[`item.44-Free`]="{ index, item }">
                        <v-number-input
                            v-if="item['44-Free']"
                            v-model="item['44-Free'].unit"
                            type="number"
                            variant="plain"
                            hide-details
                            required
                            dense
                            clearable
                            :min="0"
                            @change="change(index, item)"
                        ></v-number-input>
                        <span v-else>－</span>
                    </template>
                    <template v-slot:[`body.append`]>
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
                            <td class="p-2">{{ $t("total-unit") }}</td>
                            <td class="p-2" colspan="4">
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
                            <td class="p-2">{{ $t("subtotal") }} {{ ": " }}</td>
                            <td class="p-2" colspan="4">
                                <span v-if="subtotal">
                                    {{ "$ " }}
                                    {{ subtotal.toLocaleString() }}
                                    {{ currency }}
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
</template>

<script>
//
import {
    countryCodes,
    currencies,
    goodsSizes,
    purchaseStatus,
} from "@/constants";
import { isMobile } from "react-device-detect";
import CreatePurchaseDialog from "./components/CreatePurchaseDialog.vue";

export default {
    name: "CreatePurchase",
    components: {
        CreatePurchaseDialog,
    },
    data() {
        return {
            items: [],
            supplier: "",
            supplierName: "",
            supplierNumber: "",
            contact: "",
            address: "",
            phoneCountryCode: "",
            phone: "",
            faxCountryCode: "",
            fax: "",
            email: "",
            date: new Date(),
            status: "PENDING",
            currency: "",
            totalunit: 0,
            subtotal: 0,
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
                        { title: `${this.$t("cost")}($)`, value: "cost" },
                    ],
                },
            },
            dateMenu: false,
            fetchLoading: {
                form: false,
                table: false,
            },
            loading: false,
            errors: {},
            countryCodes: countryCodes,
            purchaseStatus: purchaseStatus,
            currencies: currencies,
        };
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            let self = this;
            self.fetchLoading.table = true;
            self.fetchLoading.form = true;
            this.$store
                .dispatch("goods/purchases/items", {
                    id: self.$route.params.id,
                })
                .then((response) => {
                    let data = JSON.parse(JSON.stringify(response.data));
                    self.items = data;
                    self.fetchLoading.table = false;
                })
                .catch((error) => {
                    self.fetchLoading.table = false;
                });
            this.$store
                .dispatch("goods/suppliers/details", {
                    id: self.$route.params.id,
                })
                .then((response) => {
                    let res = response.data;
                    self.supplier = res;
                    self.supplierName = res.name;
                    self.supplierNumber = res.number;
                    self.phoneCountryCode = res.phone_country_code;
                    self.phone = res.phone;
                    self.faxCountryCode = res.fax_country_code;
                    self.fax = res.fax;
                    self.email = res.email;
                    self.contact = res.contact;
                    self.address = res.address;
                    self.currency = res.cost_price_currency;
                    self.fetchLoading.form = false;
                })
                .catch((error) => {
                    self.fetchLoading.form = false;
                });
        },
        submit() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {
                supplier: self.supplier,
                to_company: self.supplierName,
                to_company_number: self.supplierNumber,
                to_contact: self.contact,
                to_address: self.address,
                to_phone_country_code: self.phoneCountryCode,
                to_phone: self.phone,
                to_fax_country_code: self.faxCountryCode,
                to_fax: self.fax,
                to_email: self.email,
                date: self.date,
                status: self.status,
                currency: self.currency,
                purchase_items: self.items,
            };
            this.$store
                .dispatch("goods/purchases/create", data)
                .then((response) => {
                    self.loading = false;
                    self.errors = {};
                    self.$router.push({ path: "/purchases" });
                })
                .catch((error) => {
                    self.loading = false;
                    self.errors = error.response.data?.data;
                });
        },
        change(index, item) {
            const sizes = goodsSizes;
            let total = 0;
            for (let size of sizes) {
                const key = size.name;
                if (item[key]) {
                    total += item[key].unit * 1;
                }
            }
            this.items[index].total_unit = total;
            this.items[index].cost = total * this.items[index].unit_price;
            this.totalunit = 0;
            this.subtotal = 0;
            for (let item of this.items) {
                this.totalunit += item.total_unit;
                this.subtotal += item.cost;
            }
        },
        async scanner() {
            let res = await this.$refs.scannerDialog.open(this.items);
            if (res) {
                this.items.forEach((item) => {
                    goodsSizes.forEach((size) => {
                        if (item[size.name]) {
                            if (item[size.name].barcode === res.barcode) {
                                item[size.name].unit = res.unit;
                            }
                        }
                    });
                });
            }
        },
        isMobile() {
            return isMobile;
        },
    },
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
