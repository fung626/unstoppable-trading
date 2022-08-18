<template>
    <CModal :show.sync="dialog" :centered="true" :title="title">
        <div class="mb-4">
            <v-progress-linear
                :active="loading"
                indeterminate
                color="cyan"
            ></v-progress-linear>
        </div>
        <div v-for="size in goodsSizes" :key="size.name">
            <CRow>
                <CCol>
                    <div class="d-flex justify-content-center">
                        {{ size.name }}
                    </div>
                </CCol>
            </CRow>
            <CRow>
                <CCol>
                    <div class="d-flex justify-content-center">
                        <div v-if="item && item[size.name]">
                            <vue-number-input
                                size="small"
                                v-model="item[size.name].unit"
                                :min="0"
                                :max="
                                    item[size.name]
                                        ? item[size.name].stock_unit
                                        : 0
                                "
                                inline
                                center
                                controls
                            ></vue-number-input>
                        </div>
                        <div v-else>
                            <vue-number-input
                                size="small"
                                v-model="empty"
                                :min="0"
                                :max="0"
                                inline
                                center
                                controls
                            ></vue-number-input>
                        </div>
                    </div>
                </CCol>
            </CRow>
        </div>
        <template #footer>
            <CButton @click="confirm" color="danger" class="px-4">
                {{ $t("button.confirm") }}
            </CButton>
            <CButton @click="cancel" color="secondary" class="px-4 ml-2">
                {{ $t("button.cancel") }}
            </CButton>
        </template>
    </CModal>
</template>

<script>
import { mapState } from "vuex";
import { goodsSizes } from "../constants";

export default {
    name: "CreateShippingDialog",
    computed: {
        ...mapState(["goods/shipping"]),
        shippingData() {
            return this["goods/shipping"].shippingData;
        }
    },
    data() {
        return {
            item: {},
            items: [],
            empty: 0,
            dialog: false,
            resolve: null,
            reject: null,
            title: null,
            errors: {},
            loading: false,
            goodsSizes: goodsSizes
        };
    },
    methods: {
        fetch() {
            let self = this;
            if (self.loading) {
                return;
            }
            var ids = [];
            goodsSizes.forEach(size => {
                if (self.item[size.name]) {
                    ids = [...ids, self.item[size.name].goods_item_id];
                }
            });
            if (ids.length === 0) {
                return;
            }
            let data = {
                item_ids: ids
            };
            self.loading = true;
            this.$store
                .dispatch("goods/item/get", data)
                .then(response => {
                    let res = JSON.parse(JSON.stringify(response.data));
                    self.items = res;
                    self.loading = false;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        open(item) {
            this.title = `
            ${this.$t("shipping")}－${item.goods.name}－${item.color}`;
            this.dialog = true;
            let data = this.shippingData;
            let subData = goodsSizes;
            for (const x of data) {
                for (const y of subData) {
                    if (item[y.name] && x.id === item[y.name].goods_item_id) {
                        item[y.name].unit = x.unit;
                    }
                }
            }
            this.item = item;
            this.fetch();
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        confirm() {
            let xData = goodsSizes;
            let yData = this.items;
            let iData = this.item;
            for (const x of xData) {
                if (iData[x.name] && iData[x.name].unit > 0) {
                    let i = iData[x.name];
                    for (const y of yData) {
                        if (y.id && y.id === i.goods_item_id) {
                            this.$store.dispatch("goods/shipping/add", {
                                data: { ...y, unit: i.unit }
                            });
                        }
                    }
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
        clear() {
            this.item = {};
            this.items = [];
        }
    }
};
</script>
