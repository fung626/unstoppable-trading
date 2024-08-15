<template>
    <div>
        <Snackbar />
        <CContainer class="c-app flex-row align-items-center">
            <CRow class="justify-content-center">
                <CCol md="8">
                    <CCard class="p-4">
                        <CCardBody>
                            <CForm @submit.prevent="submit" method="POST">
                                <h1>{{ $t("auth.forgotpassword.title") }}</h1>
                                <p class="text-muted">
                                    {{ $t("auth.forgotpassword.msg") }}
                                </p>
                                <v-text-field
                                    v-model="email"
                                    :label="$t('email')"
                                    type="email"
                                    :error="errors.email ? true : false"
                                    :error-messages="errors.email"
                                    required
                                    dense
                                    variant="solo"
                                ></v-text-field>
                                <CRow>
                                    <CCol col="6" class="text-left">
                                        <CButton
                                            type="submit"
                                            color="primary"
                                            class="px-4"
                                        >
                                            <v-progress-circular
                                                v-if="submitting"
                                                indeterminate
                                                :size="15"
                                            ></v-progress-circular>
                                            {{ $t("button.submit") }}
                                        </CButton>
                                    </CCol>
                                </CRow>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<script>
//
import { Snackbar } from "@/components";

export default {
    name: "ForgotPassword",
    components: {
        Snackbar,
    },
    data() {
        return {
            email: "",
            errors: {},
            submitting: false,
        };
    },
    methods: {
        submit() {
            let self = this;
            if (self.submitting) {
                return;
            }
            self.submitting = true;
            self.$store
                .dispatch("auth/forgot/password/email", {
                    email: self.email,
                })
                .then(function (response) {
                    self.submitting = false;
                    self.errors = {};
                    self.email = "";
                })
                .catch((error) => {
                    self.submitting = false;
                    self.errors = error.response.data?.data;
                });
        },
    },
};
</script>

<style scoped>
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
