<template>
    <CCard>
        <CCardBody>
            <h4>
                {{
                    `${$t("shipping.invoice")}/${$t("purchase.invoice")} ${$t(
                        "quicksearch"
                    )}`
                }}
            </h4>
            <hr />
            <CRow>
                <CCol md="10" sm="10">
                    <v-autocomplete
                        v-model="data"
                        :items="autocomplete.data.items"
                        :loading="autocomplete.data.loading"
                        :search-input.sync="autocomplete.data.search"
                        :disabled="autocomplete.data.loading"
                        required
                        outlined
                        dense
                        hide-no-data
                        hide-selected
                        item-text="name"
                        item-value="id"
                        return-object
                    ></v-autocomplete>
                </CCol>
                <CCol md="2" sm="2">
                    <CButton
                        @click="details"
                        color="primary"
                        class="btn-block px-4"
                        size="lg"
                        :disabled="autocomplete.data.loading || !data"
                    >
                        {{ $t("details") }}
                    </CButton>
                </CCol>
            </CRow>
        </CCardBody>
    </CCard>
</template>

<script>
export default {
    name: "ShippingPurchaseQuickSearch",
    data() {
        return {
            data: null,
            autocomplete: {
                data: {
                    items: [],
                    loading: false
                }
            }
        };
    },
    watch: {
        "autocomplete.data.search": function(newVal, oldVal) {
            // console.log(newVal);
            let self = this;
            let cli = self.autocomplete.data;
            if (newVal == "") {
                self.data = null;
            }
            if ((newVal == oldVal && newVal != "") || !newVal || cli.loading) {
                return;
            }
            self.autocomplete.data.loading = true;
            let data = {
                search: newVal
            };
            this.$store
                .dispatch("goods/shipping/purchase/quicksearch/get", data)
                .then(response => {
                    // let data = response.data;
                    self.autocomplete.data.items = response.data;
                    self.autocomplete.data.loading = false;
                })
                .catch(error => {
                    self.autocomplete.data.loading = false;
                });
        }
    },
    methods: {
        details() {
            if (this.data) {
                const { id, type } = this.data;
                switch (type) {
                    case "SHIPPING":
                        this.$router.push({
                            name: "ShippingDetails",
                            params: { id: id }
                        });
                        break;
                    case "PURCHASE":
                        this.$router.push({
                            name: "PurchaseDetails",
                            params: { id: id }
                        });
                        break;
                }
            }
        }
    }
};
</script>
