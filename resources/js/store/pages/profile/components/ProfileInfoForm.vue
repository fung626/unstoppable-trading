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
                    v-model="formData.name"
                    :error="errors.name ? true : false"
                    :error-messages="errors.name"
                    :label="$t('name')"
                    required
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <CRow>
                    <CCol md="6" sm="6">
                        <v-text-field
                            v-model="formData.phone"
                            :error="errors.phone ? true : false"
                            :error-messages="errors.phone"
                            :label="$t('phone')"
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
                    item-text="name"
                    item-value="value"
                    required
                    outlined
                    dense
                    disabled
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
import { roles } from "@/constants";
import { mapState } from "vuex";

export default {
    name: "ProfileInfoForm",
    computed: {
        ...mapState(["profile"]),
        formData() {
            return JSON.parse(JSON.stringify(this.profile.data));
        }
    },
    data() {
        return {
            errors: {},
            fetchLoading: false,
            updateLoading: false,
            roles: roles
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
            this.$store
                .dispatch("profile/get")
                .then(response => {
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
            this.$store
                .dispatch("profile/update", this.formData)
                .then(response => {
                    self.updateLoading = false;
                    self.errors = {};
                })
                .catch(error => {
                    self.updateLoading = false;
                    self.errors = error.response.data?.data;
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
