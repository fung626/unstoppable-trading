<template>
    <CContainer md>
        <CCard class="p-4">
            <v-progress-linear
                :active="fetchLoading"
                indeterminate
                color="cyan"
            ></v-progress-linear>
            <CCardBody>
                <h4>{{ $t("details") }}</h4>
                <hr />
                <form>
                    <v-text-field
                        v-model="formData.base"
                        :label="$t('Base')"
                        :error="errors.base ? true : false"
                        :error-messages="errors.base"
                        required
                        outlined
                        dense
                        disabled
                    ></v-text-field>
                    <v-text-field
                        v-model="formData.symbol"
                        :label="$t('Symbol')"
                        :error="errors.symbol ? true : false"
                        :error-messages="errors.symbol"
                        required
                        outlined
                        dense
                        disabled
                    ></v-text-field>
                    <v-text-field
                        v-model="formData.rate"
                        :label="$t('rate')"
                        :error="errors.rate ? true : false"
                        :error-messages="errors.rate"
                        :hint="hint"
                        type="number"
                        required
                        outlined
                        dense
                        persistent-hint
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
    </CContainer>
</template>
<script>
//
export default {
    name: "ExchangeRateDetails",
    data() {
        return {
            formData: {},
            errors: {},
            fetchLoading: false,
            updateLoading: false
        };
    },
    computed: {
        hint() {
            const { base, symbol } = this.$route.params;
            if (this.formData.rate) {
                const { rate } = this.formData;
                return `1 ${base} = ${1 * rate} ${symbol}`;
            }
            return "";
        }
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
                base: self.$route.params.base,
                symbol: self.$route.params.symbol
            };
            self.fetchLoading = true;
            this.$store
                .dispatch("exchangerate/details", data)
                .then(response => {
                    // console.log(response.data);
                    self.formData = JSON.parse(
                        JSON.stringify(response.data.data)
                    );
                    self.errors = {};
                    self.fetchLoading = false;
                })
                .catch(error => {
                    self.errors = error.response.data?.data;
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
                .dispatch("exchangerate/update", self.formData)
                .then(response => {
                    self.formData = JSON.parse(JSON.stringify(response.data));
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
