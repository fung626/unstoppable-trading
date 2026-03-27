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
                    <h4>{{ $t("create") }}{{ $t("purchase") }}</h4>
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
                        <v-expansion-panel-header>
                            {{ $t("more") }}
                        </v-expansion-panel-header>
                        <v-expansion-panel-content>
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
                                <CCol md="2" sm="2">
                                    <v-select
                                        v-model="phoneCountryCode"
                                        :items="countryCodes"
                                        :label="$t('countrycode')"
                                        item-text="name"
                                        item-value="value"
                                        required
                                        outlined
                                        dense
                                    ></v-select>
                                </CCol>
                                <CCol md="10" sm="10">
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
                                <CCol md="2" sm="2">
                                    <v-select
                                        v-model="faxCountryCode"
                                        :items="countryCodes"
                                        :label="$t('countrycode')"
                                        item-text="name"
                                        item-value="value"
                                        required
                                        outlined
                                        dense
                                    ></v-select>
                                </CCol>
                                <CCol md="10" sm="10">
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
                                item-text="name"
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
                                item-text="name"
                                item-value="value"
                                required
                                outlined
                                dense
                                :error="errors['currency'] ? true : false"
                                :error-messages="errors['currency']"
                            ></v-select>
                            <v-menu
                                v-model="dateMenu"
                                :close-on-content-click="false"
                                :nudge-right="40"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-text-field
                                        v-model="date"
                                        :label="$t('date')"
                                        outlined
                                        dense
                                        clearable
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        :error="errors['date'] ? true : false"
                                        :error-messages="errors['date']"
                                    ></v-text-field>
                                </template>
                                <v-date-picker
                                    v-model="date"
                                    @input="dateMenu = false"
                                ></v-date-picker>
                            </v-menu>
                        </v-expansion-panel-content>
                    </v-expansion-panel>
                </v-expansion-panels>
                <CRow class="p-2">
                    <CCol md="12" sm="12">
                        <h4 class="my-2">{{ $t("purchase") }}</h4>
                    </CCol>
                </CRow>
                <hr />
                <CRow class="p-2">
                    <CCol md="12" sm="12">
                        <CInput
                            size="sm"
                            v-model="table.item.search"
                            v-on:keyup.enter="table.item.search"
                        >
                            <template #prepend>
                                <CButton
                                    color="primary"
                                    size="sm"
                                    v-on:click="table.item.search"
                                >
                                    <CIcon
                                        name="cil-magnifying-glass"
                                        size="sm"
                                    />
                                </CButton>
                            </template>
                        </CInput>
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
                    <template v-slot:body="{ items, headers }">
                        <tbody>
                            <tr v-for="(item, idx) in items" :key="idx">
                                <td v-for="(header, key) in headers" :key="key">
                                    <div
                                        v-if="
                                            isRowEditable(header.value) &&
                                                item[header.value]
                                        "
                                    >
                                        <v-edit-dialog
                                            :return-value.sync="
                                                item[header.value].unit
                                            "
                                            @save="save(item['id'] - 1)"
                                            :save-text="$t('button.confirm')"
                                            :cancel-text="$t('button.cancel')"
                                            large
                                        >
                                            {{ item[header.value].unit }}
                                            <template v-slot:input>
                                                <vue-number-input
                                                    class="m-4"
                                                    size="small"
                                                    v-model="
                                                        item[header.value].unit
                                                    "
                                                    :min="0"
                                                    inline
                                                    center
                                                    controls
                                                ></vue-number-input>
                                            </template>
                                        </v-edit-dialog>
                                    </div>
                                    <div
                                        v-else-if="isRowEditable(header.value)"
                                    >
                                        －
                                    </div>
                                    <div
                                        v-else-if="isCurrencyRow(header.value)"
                                    >
                                        {{
                                            item[header.value].toLocaleString()
                                        }}
                                    </div>
                                    <div v-else>{{ item[header.value] }}</div>
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
                                <td>{{ $t("totalunit") }} {{ " " }}</td>
                                <td colspan="4">
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
                                <td>{{ $t("subtotal") }} {{ " " }}</td>
                                <td colspan="4">
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
                        </tbody>
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
//
import {
    countryCodes,
    currencies,
    goodsSizes,
    purchaseStatus
} from "@/constants";
import { isMobile } from "react-device-detect";
import { mapState } from "vuex";
import CreatePurchaseDialog from "./components/CreatePurchaseDialog";

export default {
    name: "CreatePurchase",
    components: {
        CreatePurchaseDialog
    },
    computed: {
        ...mapState(["goods/purchase"]),
        items() {
            let items = this["goods/purchase"].items;
            if (items) {
                return JSON.parse(JSON.stringify(items));
            }
            return [];
        }
    },
    data() {
        return {
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
            date: new Date().toISOString().substr(0, 10),
            status: "PENDING",
            currency: "",
            totalunit: 0,
            subtotal: 0,
            table: {
                item: {
                    search: "",
                    headers: [
                        { text: "#ID", value: "id" },
                        { text: this.$t("name"), value: "name" },
                        { text: this.$t("type"), value: "type" },
                        { text: this.$t("cup"), value: "cup" },
                        { text: this.$t("color"), value: "color" },
                        { text: "32-S", value: "32-S" },
                        { text: "34-M", value: "34-M" },
                        { text: "36-L", value: "36-L" },
                        { text: "38-XL", value: "38-XL" },
                        { text: "40-Q", value: "40-Q" },
                        { text: "42-EQ", value: "42-EQ" },
                        { text: "44-Free", value: "44-Free" },
                        {
                            text: `${this.$t("unitprice")}($)`,
                            value: "unit_price"
                        },
                        { text: this.$t("totalunit"), value: "total_unit" },
                        { text: `${this.$t("cost")}($)`, value: "cost" }
                    ]
                }
            },
            dateMenu: false,
            fetchLoading: {
                form: false,
                table: false
            },
            loading: false,
            errors: {},
            countryCodes: countryCodes,
            purchaseStatus: purchaseStatus,
            currencies: currencies
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
                .dispatch("goods/purchase/items", {
                    id: self.$route.params.id
                })
                .then(response => {
                    self.fetchLoading.table = false;
                })
                .catch(error => {
                    self.fetchLoading.table = false;
                });
            this.$store
                .dispatch("goods/supplier/details", {
                    id: self.$route.params.id
                })
                .then(response => {
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
                .catch(error => {
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
                purchase_items: self.items
            };
            this.$store
                .dispatch("goods/purchase/create", data)
                .then(response => {
                    self.loading = false;
                    self.errors = {};
                    self.$router.back();
                })
                .catch(error => {
                    self.loading = false;
                    self.errors = error.response.data?.data;
                });
        },
        isRowEditable(value) {
            return goodsSizes.find(obj => obj.name === value);
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
            let res = await this.$refs.scannerDialog.open(this.items);
            if (res) {
                this.items.forEach(item => {
                    goodsSizes.forEach(size => {
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
        }
    }
};
</script>

<style scoped>
.v-select {
    font-size: 1em;
    font-weight: 100;
}
.v-text-field :deep(input) {
    font-size: 0.8em;
    font-weight: 100;
}
.v-text-field :deep(label) {
    font-size: 0.8em;
}
.v-text-field :deep(button) {
    font-size: 0.8em;
}
</style>
