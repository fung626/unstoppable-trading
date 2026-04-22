<template>
    <CModal :show.sync="dialog" :centered="true" :title="title" size="lg">
        <v-progress-linear
            :active="loading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <StreamBarcodeReader
            v-if="dialog"
            :key="scannerKey"
            @decode="(a, b, c) => onDecode(a, b, c)"
            @loaded="() => onLoaded()"
            @error="() => onError()"
        ></StreamBarcodeReader>
        <div v-if="error" class="d-flex justify-content-center">
            <h4>{{ $t("error.camera") }}</h4>
        </div>
        <div class="d-flex justify-content-center barcode-preview">
            <barcode
                class="m-4"
                v-if="barcode"
                :value="barcode"
                :options="{ format: 'CODE39', height: 32 }"
            ></barcode>
        </div>
        <div
            v-if="msg"
            class="d-flex justify-content-center text-danger font-weight-bold my-2 px-3 text-center"
        >
            {{ msg }}
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
                <div v-else-if="type === 'StockTake'">
                    {{ $t("button.confirm") }}
                </div>
            </CButton>
            <CButton
                @click="clearScanResult"
                :disabled="barcode === null && data === null"
                color="warning"
                variant="outline"
                class="px-4 ml-2"
            >
                {{ $t("button.clear") }}
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
        ...mapState(["goods/shipping"]),
        shippingData() {
            return this["goods/shipping"].shippingData;
        },
    },
    watch: {
        dialog(value) {
            if (!value) {
                // Ensure caller promise is not left pending when modal closes via backdrop/ESC.
                if (this.resolve) {
                    this.resolve(false);
                }
                this.resolve = null;
                this.reject = null;
                this.clear();
                this.resetScanner();
            }
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
            msg: null,
            loading: false,
            data: null,
            goodsSizes: goodsSizes,
            scannerKey: 0,
        };
    },
    methods: {
        fetchItemDetails() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.msg = null;
            self.loading = true;
            let data = {
                barcode: self.barcode,
            };
            this.$store
                .dispatch("goods/item/details", data)
                .then((response) => {
                    let data = JSON.parse(JSON.stringify(response.data));
                    if (
                        self.type === "Shipping" &&
                        Number(data.stock_unit || 0) <= 0
                    ) {
                        self.data = null;
                        self.msg = self.$t("error.barcode_no_stock");
                    } else {
                        self.data = data;
                        self.msg = null;
                    }
                    // update();
                    self.loading = false;
                })
                .catch((error) => {
                    self.data = null;
                    self.msg = self.getMsg(error);
                    self.loading = false;
                });
        },
        fetchPurchaseDetails() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.msg = null;
            self.loading = true;
            let data = {
                barcode: self.barcode,
            };
            this.$store
                .dispatch("goods/purchase/details", data)
                .then((response) => {
                    let data = JSON.parse(JSON.stringify(response.data));
                    self.data = data;
                    self.loading = false;
                })
                .catch((error) => {
                    self.data = null;
                    self.msg = self.getMsg(error);
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
            this.clear();
            this.resetScanner();
            this.dialog = true;
            this.type = type;
            switch (type) {
                case "Shipping":
                    this.title = `${this.$t("shipping")}${this.$t("scanner")}`;
                    if (item && "barcode" in item) {
                        this.barcode = item.barcode;
                        this.fetchItemDetails();
                    }
                    break;
                case "Search":
                    this.title = `${this.$t("search")}${this.$t("scanner")}`;
                    break;
                case "StockTake":
                    this.title = `${this.$t("stocktake")}`;
                    break;
            }
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        closeDialog(result) {
            if (this.resolve) {
                this.resolve(result);
                this.resolve = null;
                this.reject = null;
            }
            this.dialog = false;
        },
        confirm() {
            if (this.data) {
                switch (this.type) {
                    case "Shipping":
                        this.$store.dispatch("goods/shipping/add", {
                            data: { ...this.data, unit: this.unit },
                        });
                        break;
                    case "Search":
                        this.$router.push({
                            name: "GoodsDetails",
                            params: { id: this.data.goods.id },
                        });
                        break;
                    case "StockTake":
                        this.$router.push({
                            name: "StockTake",
                            params: { id: this.data.id },
                        });
                        break;
                }
            }
            this.closeDialog(true);
        },
        cancel() {
            this.closeDialog(false);
        },
        onDecode(a, b, c) {
            // console.log(a, b, c);
            const decoded = (a || "").trim().toUpperCase();

            // Keep the first accepted barcode until user clears it manually.
            if (!decoded || this.loading || this.barcode) {
                return;
            }

            if (!this.isLikelyItemBarcode(decoded)) {
                return;
            }

            this.msg = null;
            this.barcode = decoded;
            switch (this.type) {
                case "Shipping":
                    this.fetchItemDetails();
                    break;
                case "Search":
                    this.fetchItemDetails();
                    break;
                case "StockTake":
                    this.fetchPurchaseDetails();
                    break;
            }
        },
        onLoaded() {
            this.error = false;
        },
        onError() {
            this.error = true;
        },
        clearScanResult() {
            this.unit = 0;
            this.barcode = null;
            this.data = null;
            this.error = false;
            this.msg = null;
            this.loading = false;
        },
        clear() {
            this.clearScanResult();
            this.title = null;
            this.type = null;
        },
        resetScanner() {
            this.scannerKey += 1;
        },
        isLikelyItemBarcode(value) {
            // Accept uppercase alphanumeric CODE39-like values and ignore noisy short/long scans.
            if (!/^[A-Z0-9\-\.\$\/\+% ]{8,24}$/.test(value)) {
                return false;
            }
            // Ignore numeric-only strings that are commonly misread from background content.
            return /[A-Z]/.test(value);
        },
        getMsg(error) {
            const code = error?.response?.data?.code;
            if (code === 1030) {
                return this.$t("error.barcode_not_found");
            }
            return this.$t("error.barcode_load_failed");
        },
    },
};
</script>

<style scoped>
.barcode-preview {
    width: 100%;
    overflow: hidden;
}

.barcode-preview :deep(svg),
.barcode-preview :deep(canvas) {
    display: block;
    max-width: 100%;
    width: 100%;
    height: auto;
    margin: 0 auto;
}
</style>
