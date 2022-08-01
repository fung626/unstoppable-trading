<template>
    <CCard class="p-4">
        <CCardBody>
            <h4>{{ $t("create") }}</h4>
            <hr />
            <form v-on:submit.prevent>
                <v-text-field
                    v-model="sector"
                    :label="$t('sector')"
                    :error="errors.sector ? true : false"
                    :error-messages="errors.sector"
                    required
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <v-row>
                    <c-col md="6" sm="6">
                        <v-text-field
                            v-model="shelf"
                            :label="$t('shelf')"
                            :error="errors.shelf ? true : false"
                            :error-messages="errors.shelf"
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </c-col>
                    <c-col md="6" sm="6">
                        <v-text-field
                            v-model="segment"
                            :label="$t('segment')"
                            :error="errors.segment ? true : false"
                            :error-messages="errors.segment"
                            outlined
                            dense
                            clearable
                        ></v-text-field>
                    </c-col>
                </v-row>
                <v-text-field
                    v-model="description"
                    :label="$t('description')"
                    outlined
                    dense
                    clearable
                ></v-text-field>
                <hr />
                <CButton @click="submit" color="primary" class="px-4">
                    {{ $t("button.submit") }}
                    <v-progress-circular
                        v-if="loading"
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
    name: "CreateWarehouse",
    data() {
        return {
            sector: null,
            shelf: null,
            segment: null,
            description: null,
            errors: {},
            loading: false
        };
    },
    methods: {
        submit() {
            let self = this;
            if (self.loading) {
                return;
            }
            let data = {
                sector: self.sector,
                description: self.description
            };
            self.loading = true;
            this.$store
                .dispatch("goods/warehouse/create", data)
                .then(response => {
                    self.loading = false;
                    self.errors = {};
                    self.$router.back();
                })
                .catch(error => {
                    self.errors = error.response.data?.data;
                    self.loading = false;
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
