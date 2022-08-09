<template>
    <CCard class="border-0">
        <v-progress-linear
            :active="fetchLoading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CCardBody>
            <form>
                <v-text-field
                    v-model="formData.salary"
                    :label="$t('salary')"
                    :error="errors.salary ? true : false"
                    :error-messages="errors.salary"
                    type="number"
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <CRow>
                    <CCol md="6" sm="6">
                        <v-text-field
                            v-model="formData.employer_contribution"
                            :label="
                                `${$t('employer')}${$t('mpf.contribution')}`
                            "
                            :error="errors.employer_contribution ? true : false"
                            :error-messages="errors.employer_contribution"
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </CCol>
                    <CCol md="6" sm="6">
                        <v-text-field
                            v-model="formData.employee_contribution"
                            :label="
                                `${$t('employee')}${$t('mpf.contribution')}`
                            "
                            :error="errors.employee_contribution ? true : false"
                            :error-messages="errors.employee_contribution"
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </CCol>
                </CRow>
                <v-menu v-model="datepicker.joinedat.menu" min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="formData.joined_at"
                            :label="$t('joinedat')"
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="formData.joined_at"
                        no-title
                        @input="datepicker.joinedat.menu = false"
                    ></v-date-picker>
                </v-menu>
                <v-menu v-model="datepicker.leftat.menu" min-width="auto">
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="formData.left_at"
                            :label="$t('leftat')"
                            v-bind="attrs"
                            v-on="on"
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="formData.left_at"
                        no-title
                        @input="datepicker.leftat.menu = false"
                    ></v-date-picker>
                </v-menu>
                <CButton @click="update" color="primary" class="px-4">
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

export default {
    name: "EmployeeForm",
    props: {
        id: null
    },
    data() {
        return {
            formData: {},
            errors: {},
            datepicker: {
                joinedat: {
                    menu: false
                },
                leftat: {
                    menu: false
                }
            },
            fetchLoading: false,
            updateLoading: false
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
            self.fetchLoading = true;
            let data = {
                id: self.$props.id
            };
            this.$store
                .dispatch("user/employee/get", data)
                .then(response => {
                    self.formData = response.data;
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
            let data = {
                ...self.formData,
                id: self.$props.id
            };
            this.$store
                .dispatch("user/employee/update", data)
                .then(response => {
                    self.formData = response.data.data;
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
