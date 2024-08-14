<template>
    <Snackbar />
    <CCard class="border-0">
        <v-progress-linear
            :active="fetchLoading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CCardBody>
            <form v-on:submit.prevent>
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
                <v-textarea
                    v-model="formData.description"
                    :label="$t('description')"
                    :error="errors.description ? true : false"
                    :error-messages="errors.description"
                    outlined
                    dense
                    clearable
                ></v-textarea>
                <hr />
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
import { Snackbar } from "@/components";

export default {
    name: "CategoryForm",
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
                .dispatch("categories/details", data)
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
                .dispatch("categories/update", self.formData)
                .then((response) => {
                    // console.log(response);
                    self.formData = JSON.parse(
                        JSON.stringify(response.data.data)
                    );
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
