<template>
    <CModal :visible="dialog" :centered="true" :title="title" size="lg">
        <v-progress-linear
            :active="loading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <StreamBarcodeReader
            @decode="(a, b, c) => onDecode(a, b, c)"
            @loaded="() => onLoaded()"
            @error="() => onError()"
        ></StreamBarcodeReader>
        <div v-if="error" class="d-flex justify-content-center">
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
        <div v-if="type === 'Shipping'" class="d-flex justify-content-center">
            <vue-number-input
                class="my-4"
                size="small"
                v-model="unit"
                width="100%"
                :min="0"
                :max="data ? data.stock_unit : 0"
                inline
                center
                controls
            ></vue-number-input>
        </div>
        <template #footer>
            <CButton
                @click="confirm"
                :disabled="data === null"
                color="danger"
                class="px-4"
            >
                <div v-if="type === 'Shipping'">
                    {{ $t("button.confirm") }}
                </div>
                <div v-else-if="type === 'Search'">
                    {{ $t("button.jumpto") }}{{ $t("details") }}
                </div>
                <div v-else-if="type === 'Stocktake'">
                    {{ $t("button.confirm") }}
                </div>
            </CButton>
            <CButton @click="cancel" color="secondary" class="px-4 ml-2">
                {{ $t("button.cancel") }}
            </CButton>
        </template>
    </CModal>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";
import { mapState } from "vuex";
import { goodsSizes } from "../constants";

export default {
    name: "ScannerDialog",
    computed: {
        ...mapState(["goods/shippings"]),
        shippingData() {
            return this["goods/shippings"].shippingData;
        },
    },
    components: {
        StreamBarcodeReader,
    },
    data() {
        return {
            dialog: false,
            resolve: null,
            reject: null,
            barcode: null,
            title: null,
            type: null,
            unit: 0,
            error: false,
            loading: false,
            data: null,
            goodsSizes: goodsSizes,
        };
    },
    methods: {
        fetchItemDetails() {
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
                    let data = JSON.parse(JSON.stringify(response.data));
                    self.data = data;
                    // update();
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        fetchPurchaseDetails() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {
                barcode: self.barcode,
            };
            this.$store
                .dispatch("goods/purchases/details", data)
                .then((response) => {
                    let data = JSON.parse(JSON.stringify(response.data));
                    self.data = data;
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        update() {
            this.type = type;
            switch (type) {
                case "Shipping":
                    let xData = this.shippingData;
                    let yData = this.data;
                    for (const x of xData) {
                        if (x.unit && x.id === yData.id) {
                            this.data.unit = x.unit;
                        }
                    }
                    break;
            }
        },
        open(type, item) {
            this.dialog = true;
            this.type = type;
            switch (type) {
                case "Shipping":
                    this.title = `${this.$t("shippings.title")}${this.$t(
                        "scanner"
                    )}`;
                    if (item && "barcode" in item) {
                        this.barcode = item.barcode;
                        this.fetchItemDetails();
                    }
                    break;
                case "Search":
                    this.title = `${this.$t("search")}${this.$t("scanner")}`;
                    break;
                case "Stocktake":
                    this.title = `${this.$t("stocktake")}`;
                    break;
            }
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        confirm() {
            if (this.data) {
                switch (this.type) {
                    case "Shipping":
                        this.$store.dispatch("goods/shippings/add", {
                            data: { ...this.data, unit: this.unit },
                        });
                        break;
                    case "Search":
                        this.$router.push({
                            name: "GoodsDetails",
                            params: { id: this.data.goods.id },
                        });
                        break;
                    case "Stocktake":
                        this.$router.push({
                            name: "Stocktake",
                            params: { id: this.data.id },
                        });
                        break;
                }
            }
            this.resolve(true);
            this.dialog = false;
            this.clear();
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
                switch (this.type) {
                    case "Shipping":
                        this.fetchItemDetails();
                        break;
                    case "Search":
                        this.fetchItemDetails();
                        break;
                    case "Stocktake":
                        this.fetchPurchaseDetails();
                        break;
                }
            }
        },
        onLoaded() {
            this.error = false;
        },
        onError() {
            this.error = true;
        },
        clear() {
            this.unit = 0;
            this.barcode = null;
            this.data = null;
        },
    },
};
</script>
