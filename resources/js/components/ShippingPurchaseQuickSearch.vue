<template>
    <CCard>
        <CCardBody>
            <h4>
                {{ `${$t("shippingpurchasequicksearch")}` }}
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
                        :item-text="getItemText"
                        item-value="id"
                        return-object
                    >
                    </v-autocomplete>
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
import debounce from "lodash/debounce";

export default {
    name: "ShippingPurchaseQuickSearch",
    data() {
        return {
            data: null,
            debouncedFetchQuickSearch: null,
            autocomplete: {
                data: {
                    items: [],
                    loading: false,
                },
            },
        };
    },
    created() {
        this.debouncedFetchQuickSearch = debounce((search) => {
            this.fetchQuickSearch(search);
        }, 1000);
    },
    watch: {
        "autocomplete.data.search": function (newVal, oldVal) {
            // console.log(newVal);
            let self = this;
            if (newVal == "") {
                self.data = null;
                self.autocomplete.data.items = [];
            }
            if (!newVal || newVal == oldVal) {
                return;
            }
            self.debouncedFetchQuickSearch(newVal);
        },
    },
    beforeDestroy() {
        if (this.debouncedFetchQuickSearch) {
            this.debouncedFetchQuickSearch.cancel();
        }
    },
    methods: {
        fetchQuickSearch(search) {
            let self = this;
            let cli = self.autocomplete.data;

            if (cli.loading) {
                return;
            }

            cli.loading = true;
            let data = {
                search: search,
            };

            this.$store
                .dispatch("goods/shipping/purchase/quicksearch/get", data)
                .then((response) => {
                    // Ignore stale responses when input has changed.
                    if (self.autocomplete.data.search !== search) {
                        return;
                    }
                    self.autocomplete.data.items = response.data;
                })
                .catch((error) => {
                    // Keep existing behavior on request failure.
                })
                .finally(() => {
                    cli.loading = false;
                });
        },
        details() {
            if (this.data) {
                const { id, type } = this.data;
                switch (type) {
                    case "SHIPPING":
                        this.$router.push({
                            name: "ShippingDetails",
                            params: { id: id },
                        });
                        break;
                    case "PURCHASE":
                        this.$router.push({
                            name: "PurchaseDetails",
                            params: { id: id },
                        });
                        break;
                }
            }
        },
        getItemText(item) {
            // console.log(item);
            return `${item.name}`;
        },
    },
};
</script>
