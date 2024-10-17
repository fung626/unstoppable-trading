<template>
    <AddNewShippingItemTableDialog ref="dialog" />
    <div>
        <h4 class="mb-4">
            {{ `${$t("shipping.quick-search-goods")}` }}
        </h4>
        <CRow>
            <CCol>
                <v-autocomplete
                    v-model="value"
                    v-model:search="search"
                    :items="autocomplete.data.items"
                    :loading="autocomplete.data.loading"
                    required
                    outlined
                    dense
                    hide-selected
                    density="compact"
                    item-title="name"
                    item-value="id"
                    return-object
                ></v-autocomplete>
            </CCol>
        </CRow>
        <CRow>
            <CCol class="text-right">
                <CButton
                    @click="table"
                    color="primary"
                    class="btn-block px-4"
                    size="sm"
                >
                    {{ $t("shipping.add-shipment-goods") }}
                </CButton>
                <CButton
                    @click="add"
                    color="primary"
                    class="btn-block ms-2 px-4"
                    size="sm"
                    :disabled="autocomplete.data.loading || !value"
                >
                    {{ $t("shipping.add-shipment-goods") }}
                </CButton>
            </CCol>
        </CRow>
    </div>
</template>

<script>
import { debounce } from "lodash";
import AddNewShippingItemTableDialog from "./AddNewShippingItemTableDialog.vue";

export default {
    name: "GoodsQuickSearch",
    components: {
        AddNewShippingItemTableDialog,
    },
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
            this.fetch(this, newVal, oldVal);
        },
    },
    methods: {
        fetch: debounce((self, newVal, oldVal) => {
            // let cli = self.autocomplete.data;
            if ((newVal == oldVal && newVal != "") || !newVal || newVal == "") {
                return;
            }
            const found = self.autocomplete.data.items.find(
                (x) => x.name === newVal
            );
            if (found) {
                return;
            }
            // console.log(newVal, oldVal);
            self.autocomplete.data.loading = true;
            let data = {
                search: newVal,
            };
            self.$store
                .dispatch("goods/quicksearch/get", data)
                .then((response) => {
                    // console.log(response);
                    // let data = response.data;
                    self.autocomplete.data.items = response.data;
                    self.autocomplete.data.loading = false;
                })
                .catch((error) => {
                    self.autocomplete.data.loading = false;
                });
        }, 300),
        async table() {
            await this.$refs.dialog.open();
        },
        add() {
            if (this.value) {
                //     const { id, type } = this.value;
                //     switch (type) {
                //         case "SHIPPING":
                //             this.$router.push({
                //                 path: `shippings/details/${id}`,
                //             });
                //             break;
                //         case "PURCHASE":
                //             this.$router.push({
                //                 path: `purchases/details/${id}`,
                //             });
                //             break;
                //     }
            }
        },
    },
};
</script>
