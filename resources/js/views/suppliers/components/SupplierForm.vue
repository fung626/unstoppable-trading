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
                    v-model="formData.number"
                    :label="$t('number')"
                    :error="errors.number ? true : false"
                    :error-messages="errors.number"
                    required
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <v-text-field
                    v-model="formData.name"
                    :label="$t('name')"
                    :error="errors.name ? true : false"
                    :error-messages="errors.name"
                    required
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <v-text-field
                    v-model="formData.contact"
                    :label="$t('contact')"
                    :error="errors.contact ? true : false"
                    :error-messages="errors.contact"
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <CRow>
                    <CCol md="2" sm="2">
                        <v-select
                            v-model="formData.phone_country_code"
                            :items="countryCodes"
                            :label="$t('countrycode')"
                            :error="errors.phone_country_code ? true : false"
                            :error-messages="errors.phone_country_code"
                            item-title="name"
                            item-value="value"
                            required
                            outlined
                            dense
                        ></v-select>
                    </CCol>
                    <CCol md="10" sm="10">
                        <v-text-field
                            v-model="formData.phone"
                            :label="$t('phone')"
                            :error="errors.phone ? true : false"
                            :error-messages="errors.phone"
                            required
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="2" sm="2">
                        <v-select
                            v-model="formData.fax_country_code"
                            :items="countryCodes"
                            :label="$t('countrycode')"
                            item-title="name"
                            item-value="value"
                            required
                            outlined
                            dense
                        ></v-select>
                    </CCol>
                    <CCol md="10" sm="10">
                        <v-text-field
                            v-model="formData.fax"
                            :label="$t('fax')"
                            required
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </CCol>
                </CRow>
                <v-text-field
                    v-model="formData.email"
                    :error="errors.email ? true : false"
                    :error-messages="errors.email"
                    :label="$t('email')"
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <v-text-field
                    v-model="formData.address"
                    :label="$t('address')"
                    :error="errors.address ? true : false"
                    :error-messages="errors.address"
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <v-select
                    v-model="formData.cost_price_currency"
                    :items="currencies"
                    :label="$t('price.cost') + ' ' + $t('currency')"
                    item-title="name"
                    item-value="value"
                    required
                    outlined
                    dense
                    :error="errors.cost_price_currency ? true : false"
                    :error-messages="errors.cost_price_currency"
                ></v-select>
                <hr />
                <CButton @click="update" color="primary" class="px-4">
                    {{ $t("button.submit") }}
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
import { countryCodes, currencies } from "@/constants";

export default {
    name: "SupplierForm",
    props: {
        id: null,
    },
    data() {
        return {
            formData: {},
            errors: {},
            countryCodes: countryCodes,
            currencies: currencies,
            fetchLoading: false,
            updateLoading: false,
        };
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
                id: self.$props.id,
            };
            self.fetchLoading = true;
            this.$store
                .dispatch("goods/suppliers/details", data)
                .then((response) => {
                    self.formData = JSON.parse(JSON.stringify(response.data));
                    self.fetchLoading = false;
                })
                .catch((error) => {
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
                .dispatch("goods/suppliers/update", self.formData)
                .then((response) => {
                    self.errors = {};
                    self.formData = JSON.parse(JSON.stringify(response.data));
                    self.updateLoading = false;
                })
                .catch((error) => {
                    self.errors = error.response.data?.data;
                    self.updateLoading = false;
                });
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
