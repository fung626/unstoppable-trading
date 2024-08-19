<template>
    <CModal
        :visible="dialog"
        :centered="true"
        size="lg"
        @close="() => (dialog = false)"
    >
        <CModalHeader>
            <CModalTitle>{{ title }}</CModalTitle>
        </CModalHeader>
        <v-progress-linear
            :active="loading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CModalBody>
            <StreamBarcodeReader
                @decode="(a, b, c) => onDecode(a, b, c)"
                @loaded="() => onLoaded()"
                @error="() => error()"
            ></StreamBarcodeReader>
            <div v-if="readerError" class="d-flex justify-content-center">
                <h4>{{ $t("error.camera") }}</h4>
            </div>
            <div class="d-flex justify-content-center">
                <barcode
                    class="m-4"
                    v-if="barcode"
                    :value="barcode"
                    :options="{ format: 'CODE39', height: 32 }"
                ></barcode>
            </div>
            <div class="d-flex justify-content-center">
                <v-number-input
                    class="my-4"
                    size="small"
                    v-model="unit"
                    width="100%"
                    :min="0"
                    inline
                    center
                    controls
                    control-variant="split"
                ></v-number-input>
            </div>
        </CModalBody>
        <CModalFooter>
            <CButton
                @click="confirm"
                :disabled="data === null"
                color="danger"
                class="px-4"
            >
                <div>
                    {{ $t("button.confirm") }}
                </div>
            </CButton>
            <CButton @click="cancel" color="secondary" class="px-4 ml-2">
                {{ $t("button.cancel") }}
            </CButton>
        </CModalFooter>
    </CModal>
</template>

<script>
import { goodsSizes } from "@/constants";
import { StreamBarcodeReader } from "vue-barcode-reader";

export default {
    name: "CreatePurchaseDialog",
    components: {
        StreamBarcodeReader,
    },
    data() {
        return {
            dialog: false,
            resolve: null,
            reject: null,
            title: null,
            items: null,
            barcode: null,
            unit: 0,
            readerError: false,
            loading: false,
            data: null,
        };
    },
    methods: {
        fetch() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {
                barcode: self.barcode,
            };
            this.$store
                .dispatch("goods/items/details", data)
                .then((response) => {
                    let res = JSON.parse(JSON.stringify(response.data));
                    self.data = res.data;
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        open(items) {
            this.dialog = true;
            this.title = this.$t("purchase.title");
            this.items = items;
            // let temp = this.shippingData.find(obj => obj.id === item.id);
            this.unit = 0;
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        confirm() {
            this.resolve({
                confirmed: true,
                barcode: this.barcode,
                unit: this.unit,
            });
            this.item = null;
            this.unit = 0;
            this.dialog = false;
        },
        cancel() {
            this.resolve(false);
            this.dialog = false;
            this.clear();
        },
        onDecode(a, b, c) {
            // console.log(a, b, c);
            if (a) {
                this.barcode = a;
                this.items.forEach((item) => {
                    goodsSizes.forEach((size) => {
                        if (item[size.name]) {
                            if (item[size.name].barcode === a) {
                                this.unit = item[size.name].unit;
                                this.fetch();
                            }
                        }
                    });
                });
            }
        },
        onLoaded() {
            this.readerError = false;
        },
        error() {
            this.readerError = true;
        },
        clear() {
            this.unit = 0;
            this.barcode = null;
            this.data = null;
        },
    },
};
</script>
