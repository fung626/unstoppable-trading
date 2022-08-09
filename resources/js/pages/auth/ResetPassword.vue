<template>
    <div>
        <Snackbar />
        <CContainer class="c-app flex-row align-items-center">
            <CRow class="justify-content-center">
                <CCol md="8">
                    <v-progress-linear
                        :active="fetching"
                        indeterminate
                        color="cyan"
                    ></v-progress-linear>
                    <CCard class="p-4">
                        <CCardBody>
                            <CForm
                                autocomplete="off"
                                @submit.prevent="submit"
                                method="POST"
                            >
                                <h1>{{ $t("resetpassword") }}</h1>
                                <p></p>
                                <v-text-field
                                    v-model="password"
                                    :label="$t('password')"
                                    type="password"
                                    :error="errors.password ? true : false"
                                    :error-messages="errors.password"
                                    required
                                    outlined
                                    dense
                                ></v-text-field>
                                <v-text-field
                                    v-model="confirmPassword"
                                    :label="$t('confirmpassword')"
                                    type="password"
                                    :error="
                                        errors.confirm_password ? true : false
                                    "
                                    :error-messages="errors.confirm_password"
                                    required
                                    outlined
                                    dense
                                ></v-text-field>
                                <button type="submit" class="btn btn-primary">
                                    {{ $t("button.submit") }}
                                    <v-progress-circular
                                        v-if="submitting"
                                        indeterminate
                                        color="primary"
                                        :size="15"
                                    ></v-progress-circular>
                                </button>
                            </CForm>
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<script>
import { Snackbar } from "@/components";

export default {
    name: "ResetPassword",
    components: {
        Snackbar
    },
    data() {
        return {
            errors: {},
            fetching: false,
            submitting: false,
            password: null,
            confirmPassword: null
        };
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            let self = this;
            if (self.fetching) {
                return;
            }
            let data = {
                id: self.$route.params.id,
                token: self.$route.params.token
            };
            self.fetching = true;
            self.$store
                .dispatch("auth/forgot/password/find", data)
                .then(function(response) {
                    self.fetching = false;
                })
                .catch(error => {
                    self.fetching = false;
                    self.errors = error.response.data?.data;
                });
        },
        submit() {
            let self = this;
            if (self.submitting) {
                return;
            }
            let data = {
                id: this.$route.params.id,
                token: this.$route.params.token,
                password: self.password,
                confirm_password: self.confirmPassword
            };
            self.submitting = true;
            self.$store
                .dispatch("auth/forgot/password/reset", data)
                .then(function(response) {
                    self.submitting = false;
                    self.errors = {};
                    self.$store.dispatch("snackbar/show", {
                        text: self.$t("auth.resetpassword.success")
                    });
                    self.$router.push({ name: "Login" });
                })
                .catch(error => {
                    self.submitting = false;
                    self.errors = error.response.data?.data;
                });
        }
    }
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
