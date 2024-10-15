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
                <v-textarea
                    v-model="description"
                    :label="$t('description')"
                    :error="errors.description ? true : false"
                    :error-messages="errors.description"
                    outlined
                    dense
                    clearable
                ></v-textarea>
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
import { countryCodes } from "@/constants";

export default {
    name: "CreateCategory",
    components: { Dialog, Snackbar },
    data() {
        return {
            name: "",
            description: "",
            errors: {},
            loading: false,
            countryCodes: countryCodes,
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
                description: self.description,
            };
            this.$store
                .dispatch("categories/create", data)
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
