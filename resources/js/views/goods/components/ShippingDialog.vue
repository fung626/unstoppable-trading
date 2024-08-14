<template>
    <v-dialog v-model="dialog" :max-width="options.width" @keydown.esc="cancel">
        <v-card>
            <v-toolbar dark :color="options.color" dense flat>
                <v-toolbar-title
                    class="text-body-2 font-weight-bold grey--text"
                >
                    {{ title }}
                </v-toolbar-title>
            </v-toolbar>
            <div class="d-flex justify-content-center">
                <barcode
                    class="m-4"
                    v-if="item && item.barcode"
                    :value="item.barcode"
                    :options="{ format: 'CODE39', height: 32 }"
                ></barcode>
            </div>
            <div class="d-flex justify-content-center">
                <vue-number-input
                    class="my-4"
                    size="small"
                    v-model="unit"
                    :min="0"
                    :max="item ? item.stock_unit : 0"
                    inline
                    center
                    controls
                ></vue-number-input>
            </div>
            <v-card-actions class="pt-3">
                <v-spacer></v-spacer>
                <CButton @click="confirm" color="danger" class="px-4">
                    {{ $t("button.confirm") }}
                </CButton>
                <CButton
                    v-if="!options.noconfirm"
                    @click="cancel"
                    color="secondary"
                    class="px-4 ml-2"
                >
                    {{ $t("button.cancel") }}
                </CButton>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "ShippingDialog",
    computed: {
        ...mapState(["goods/shippings"]),
        shippingData() {
            return this["goods/shippings"].shippingData;
        },
    },
    data() {
        return {
            dialog: false,
            resolve: null,
            reject: null,
            message: null,
            title: null,
            item: null,
            unit: 0,
            options: {
                color: "grey lighten-3",
                width: 400,
                zIndex: 200,
                noconfirm: false,
            },
        };
    },
    methods: {
        open(title, message, item) {
            this.dialog = true;
            this.title = title;
            this.message = message;
            this.item = item;
            let temp = this.shippingData.find((obj) => obj.id === item.id);
            this.unit = temp ? temp.unit : 0;
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        confirm() {
            this.$store.dispatch("goods/shippings/add", {
                data: { ...this.item, unit: this.unit },
            });
            this.resolve(true);
            this.item = null;
            this.unit = 0;
            this.dialog = false;
        },
        cancel() {
            this.resolve(false);
            this.item = null;
            this.unit = 0;
            this.dialog = false;
        },
    },
};
</script>
