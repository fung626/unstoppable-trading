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
                            :label="`${$t('employer')}${$t(
                                'mpf.contribution'
                            )} （％）`"
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
                            :label="`${$t('employee')}${$t(
                                'mpf.contribution'
                            )} （％）`"
                            :error="errors.employee_contribution ? true : false"
                            :error-messages="errors.employee_contribution"
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </CCol>
                </CRow>
                <CRow>
                    <CCol md="6" sm="6">
                        <v-date-input
                            :label="$t('joined-at')"
                            v-model="formData.joined_at"
                            prepend-icon=""
                            clearable
                            outlined
                        ></v-date-input>
                    </CCol>
                    <CCol md="6" sm="6">
                        <v-date-input
                            :label="$t('left-at')"
                            v-model="formData.left_at"
                            prepend-icon=""
                            clearable
                            outlined
                        ></v-date-input>
                    </CCol>
                </CRow>
                <v-text-field
                    :label="$t('annual-leave-days')"
                    v-model="formData.annual_leave_days"
                    type="number"
                    required
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <v-select
                    v-model="formData.type"
                    :items="employeeTypes"
                    :label="$t('type')"
                    item-title="value"
                    item-value="value"
                    required
                    outlined
                    dense
                ></v-select>
                <CRow class="g-0 mb-2" v-if="formData.duty_default_color">
                    <CCol md="12">
                        {{
                            `${this.$t("default")} ${this.$t(
                                "dutylist"
                            )} ${this.$t("color")}`
                        }}
                    </CCol>
                    <CCol md="12">
                        <TextFieldColorPicker
                            v-model="formData.duty_default_color"
                        />
                    </CCol>
                </CRow>
                <CButton @click="update" color="primary" class="px-4">
                    <v-progress-circular
                        v-if="updateLoading"
                        indeterminate
                        :size="15"
                    ></v-progress-circular>
                    {{ $t("button.update") }}
                </CButton>
            </form>
        </CCardBody>
    </CCard>
</template>
<script>
//
import { TextFieldColorPicker } from "@/components";
import { employeeTypes } from "@/constants";

export default {
    name: "EmployeeForm",
    props: {
        id: null,
    },
    components: {
        TextFieldColorPicker,
    },
    data() {
        return {
            formData: {},
            errors: {},
            datepicker: {
                joinedat: {
                    menu: false,
                },
                leftat: {
                    menu: false,
                },
            },
            employeeTypes: employeeTypes,
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
            self.fetchLoading = true;
            let data = {
                id: self.$props.id,
            };
            this.$store
                .dispatch("users/employee/get", data)
                .then((response) => {
                    self.formData = JSON.parse(JSON.stringify(response.data));
                    // console.log(self.formData);
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
            let data = {
                ...self.formData,
                id: self.$props.id,
                joined_at: self.formData.joined_at
                    ? new Date(self.formData.joined_at).toMyDateString()
                    : null,
                left_at: self.formData.left_at
                    ? new Date(self.formData.left_at).toMyDateString()
                    : null,
            };
            // console.log(data);
            this.$store
                .dispatch("users/employee/update", data)
                .then((response) => {
                    self.formData = JSON.parse(JSON.stringify(response.data));
                    self.errors = {};
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
