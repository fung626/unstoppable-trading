<template>
    <Snackbar />
    <CCard class="border-0">
        <v-progress-linear
            :active="fetchLoading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CCardBody>
            <form>
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
                <CRow>
                    <CCol md="6" sm="6">
                        <v-text-field
                            v-model="formData.phone"
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
                            v-model="formData.email"
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
                    v-model="formData.role"
                    :items="roles"
                    :label="$t('role')"
                    :error="errors.role ? true : false"
                    :error-messages="errors.role"
                    item-title="value"
                    item-value="value"
                    required
                    outlined
                    dense
                    return-object
                    :disabled="!$store.getters.isAdmin"
                ></v-select>
                <v-text-field
                    v-model="formData.updated_at"
                    :label="$t('updatedat')"
                    outlined
                    dense
                    disabled
                ></v-text-field>
                <v-text-field
                    v-model="formData.created_at"
                    :label="$t('createdat')"
                    outlined
                    dense
                    disabled
                ></v-text-field>
                <CButton @click="update" color="primary" class="px-4"
                    ><v-progress-circular
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
import { Snackbar } from "@/components";
import { roles } from "@/constants";

export default {
    name: "UserForm",
    props: {
        id: null,
    },
    components: {
        Snackbar,
    },
    data() {
        return {
            formData: {},
            errors: {},
            fetchLoading: false,
            updateLoading: false,
            roles: roles,
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
                .dispatch("users/details", data)
                .then((response) => {
                    self.formData = response.data;
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
            };
            this.$store
                .dispatch("users/update", data)
                .then((response) => {
                    self.formData = response.data.data;
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
