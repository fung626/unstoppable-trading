<template>
    <Snackbar />
    <Dialog ref="dialog" />
    <CCard class="p-4">
        <CCardBody>
            <h4>{{ $t("create") }}</h4>
            <hr />
            <form>
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
                <CRow>
                    <CCol md="6" sm="6">
                        <v-text-field
                            v-model="phone"
                            :label="$t('phone')"
                            :error="errors.phone ? true : false"
                            :error-messages="errors.phone"
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </CCol>
                    <CCol md="6" sm="6">
                        <v-text-field
                            v-model="email"
                            :label="$t('email')"
                            :error="errors.email ? true : false"
                            :error-messages="errors.email"
                            required
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </CCol>
                </CRow>
                <v-select
                    v-model="role"
                    :items="roles"
                    :label="$t('role')"
                    :error="errors.role ? true : false"
                    :error-messages="errors.role"
                    item-title="name"
                    item-value="value"
                    required
                    outlined
                    dense
                ></v-select>
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
import { Dialog, Snackbar } from "@/components";
import { roles } from "@/constants";

export default {
    name: "CreateUser",
    components: { Dialog, Snackbar },
    data() {
        return {
            name: "",
            phone: "",
            email: "",
            password: "",
            role: "",
            errors: {},
            loading: false,
            passwordVisible: false,
            roles: roles,
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
                name: self.name,
                email: self.email,
                phone: self.phone,
                password: self.password,
                role: self.role,
            };
            this.$store
                .dispatch("users/create", data)
                .then((response) => {
                    self.loading = false;
                    self.errors = {};
                    self.$router.back();
                })
                .catch((error) => {
                    self.errors = error.response.data?.data;
                    self.loading = false;
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
