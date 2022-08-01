<template>
    <CCard class="p-4">
        <CCardBody>
            <h4>{{ $t("create") }}</h4>
            <hr />
            <form>
                <v-text-field
                    v-model="number"
                    :label="$t('number')"
                    :error="errors.number ? true : false"
                    :error-messages="errors.number"
                    required
                    outlined
                    dense
                    clearable
                ></v-text-field>
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
                    v-model="contact"
                    :label="$t('contact')"
                    :error="errors.contact ? true : false"
                    :error-messages="errors.contact"
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <v-row>
                    <c-col md="2" sm="2">
                        <v-select
                            v-model="phoneCountryCode"
                            :items="countryCodes"
                            :label="$t('countrycode')"
                            :error="errors.phone_country_code ? true : false"
                            :error-messages="errors.phone_country_code"
                            item-text="name"
                            item-value="value"
                            required
                            outlined
                            dense
                        ></v-select>
                    </c-col>
                    <c-col md="10" sm="10">
                        <v-text-field
                            v-model="phone"
                            :label="$t('phone')"
                            :error="errors.phone ? true : false"
                            :error-messages="errors.phone"
                            required
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </c-col>
                </v-row>
                <v-row>
                    <c-col md="2" sm="2">
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
                    </c-col>
                    <c-col md="10" sm="10">
                        <v-text-field
                            v-model="fax"
                            :label="$t('fax')"
                            required
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </c-col>
                </v-row>
                <v-text-field
                    v-model="email"
                    :label="$t('email')"
                    :error="errors.email ? true : false"
                    :error-messages="errors.email"
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <v-text-field
                    v-model="address"
                    :label="$t('address')"
                    :error="errors.address ? true : false"
                    :error-messages="errors.address"
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <v-select
                    v-model="costPriceCurrency"
                    :items="currencies"
                    :label="$t('price.cost') + ' ' + $t('currency')"
                    item-text="name"
                    item-value="value"
                    required
                    outlined
                    dense
                    :error="errors['cost_price_currency'] ? true : false"
                    :error-messages="errors['cost_price_currency']"
                ></v-select>
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
import { countryCodes, currencies } from "../../constants";

export default {
    name: "CreateSupplier",
    data() {
        return {
            number: "",
            name: "",
            contact: "",
            email: "",
            phoneCountryCode: "",
            phone: "",
            faxCountryCode: "",
            fax: "",
            address: "",
            costPriceCurrency: "",
            errors: {},
            loading: false,
            countryCodes: countryCodes,
            currencies: currencies
        };
    },
    methods: {
        submit() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {
                number: self.number,
                name: self.name,
                contact: self.contact,
                phone_country_code: self.phoneCountryCode,
                phone: self.phone,
                fax_country_code: self.faxCountryCode,
                fax: self.fax,
                email: self.email,
                address: self.address,
                cost_price_currency: self.costPriceCurrency
            };
            this.$store
                .dispatch("goods/supplier/create", data)
                .then(response => {
                    self.loading = false;
                    self.errors = {};
                    self.$router.back();
                })
                .catch(error => {
                    self.errors = error.response.data?.data;
                    self.loading = false;
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
