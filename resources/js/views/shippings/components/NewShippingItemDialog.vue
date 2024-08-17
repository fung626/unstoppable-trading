<template>
    <CModal :visible="dialog" :centered="true" :title="title">
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
import { goodsSizes } from "@/constants";

export default {
    name: "CreateShippingDialog",
    data() {
        return {
            id: null,
            item: {},
            empty: 0,
            dialog: false,
            resolve: null,
            reject: null,
            title: null,
            errors: {},
            loading: false,
            goodsSizes: goodsSizes,
        };
    },
    methods: {
        open(id, item) {
            this.title = `${this.$t("shippings.title")}－${item.goods.name}－${
                item.color
            }`;
            this.dialog = true;
            this.id = id;
            this.item = item;
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        confirm() {
            let self = this;
            if (self.loading) {
                return;
            }
            let data = {
                id: self.id,
                item: self.item,
                type: "NEW",
            };
            self.loading = true;
            this.$store
                .dispatch("goods/shippings/update", data)
                .then((response) => {
                    self.loading = false;
                    self.resolve(true);
                    self.dialog = false;
                })
                .catch((error) => {
                    self.loading = false;
                    self.resolve(true);
                    self.dialog = false;
                });

            self.clear();
        },
        cancel() {
            this.resolve(false);
            this.dialog = false;
            this.clear();
        },
        clear() {
            this.item = {};
        },
    },
};
</script>
