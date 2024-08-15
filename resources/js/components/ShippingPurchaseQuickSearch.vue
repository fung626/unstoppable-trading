<template>
    <CCard>
        <CCardBody>
            <h4>
                {{
                    `${$t("quicksearch")} ${$t("shipping.invoice")} / ${$t(
                        "purchase.invoice"
                    )} `
                }}
            </h4>
            <hr />
            <CRow>
                <CCol>
                    <v-autocomplete
                        v-model="value"
                        v-model:search="search"
                        :items="autocomplete.data.items"
                        :disabled="autocomplete.data.loading"
                        :loading="autocomplete.data.loading"
                        @update:search="autocomplete.data.search"
                        required
                        outlined
                        dense
                        hide-no-data
                        hide-selected
                        item-title="name"
                        item-value="id"
                        return-object
                    ></v-autocomplete>
                </CCol>
            </CRow>
            <CRow>
                <CCol class="text-right">
                    <CButton
                        @click="details"
                        color="primary"
                        class="btn-block px-4"
                        size="sm"
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
            value: null,
            search: null,
            autocomplete: {
                data: {
                    items: [],
                    loading: false,
                },
            },
        };
    },
    watch: {
        search: function (newVal, oldVal) {
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
                search: newVal,
            };
            this.$store
                .dispatch("goods/shippings/purchase/quicksearch/get", data)
                .then((response) => {
                    // let data = response.data;
                    self.autocomplete.data.items = response.data;
                    self.autocomplete.data.loading = false;
                })
                .catch((error) => {
                    self.autocomplete.data.loading = false;
                });
        },
    },
    methods: {
        fetch() {},
        details() {
            if (this.data) {
                const { id, type } = this.data;
                switch (type) {
                    case "SHIPPING":
                        this.$router.push({
                            path: `shippings/details/${id}`,
                        });
                        break;
                    case "PURCHASE":
                        this.$router.push({
                            path: `purchases/details/${id}`,
                        });
                        break;
                }
            }
        },
    },
};
</script>
