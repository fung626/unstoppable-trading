<template>
    <CModal :visible="dialog" :centered="true" :title="title" size="lg">
        <v-progress-linear
            :active="loading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
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
                                v-model="item[size.name].return_unit"
                                :min="0"
                                :max="
                                    item[size.name] ? item[size.name].unit : 0
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
            <CButton @click="submit()" color="danger" class="px-4">
                {{ $t("button.submit") }}
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
    name: "ShippingReturnDialog",
    data() {
        return {
            data: {},
            item: {},
            empty: 0,
            dialog: false,
            resolve: null,
            reject: null,
            title: null,
            loading: false,
            goodsSizes: goodsSizes,
        };
    },
    methods: {
        open(data, item) {
            this.title = `
            ${this.$t("return")}－${item.name}－${item.color}`;
            this.dialog = true;
            this.data = data;
            this.item = item;
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        submit() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {
                id: self.data.id,
                item: self.item,
                type: "RETURN",
            };
            this.$store
                .dispatch("goods/shippings/update", data)
                .then((response) => {
                    self.loading = false;
                    self.resolve(true);
                    self.dialog = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        cancel() {
            this.resolve(false);
            this.dialog = false;
            this.clear();
        },
        clear() {
            this.data = {};
            this.item = {};
        },
    },
};
</script>
