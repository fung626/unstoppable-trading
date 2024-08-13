<template>
    <CCard>
        <Dialog ref="dialog" />
        <StockTakeDialog ref="scannerDialog" />
        <v-progress-linear
            :active="fetchLoading"
            indeterminate
            color="cyan"
        ></v-progress-linear>
        <CCardBody>
            <h4>{{ $t("stocktake") }}</h4>
            <hr />
            <CRow class="p-2">
                <CCol md="9" sm="9">
                    <CInput
                        size="sm"
                        v-model="search"
                        v-on:keyup.enter="search"
                    >
                        <template #prepend>
                            <CButton
                                color="primary"
                                size="sm"
                                v-on:click="search"
                                :disabled="fetchLoading"
                            >
                                <CIcon name="cil-magnifying-glass" size="sm" />
                            </CButton>
                        </template>
                    </CInput>
                </CCol>
                <CCol md="3" sm="3" class="text-right">
                    <CButton
                        color="primary"
                        size="sm"
                        v-on:click="scanner"
                        :disabled="fetchLoading"
                    >
                        <CIcon name="cil-barcode" size="sm" />
                    </CButton>
                </CCol>
            </CRow>
            <v-data-table
                class="my-2 elevation-1"
                :headers="headers"
                :items="items"
                :search="search"
                :fetchLoading="fetchLoading"
                :mobile-breakpoint="0"
            >
                <template v-slot:body="{ items, headers }">
                    <tbody>
                        <tr v-for="(item, idx) in items" :key="idx">
                            <td v-for="(header, key) in headers" :key="key">
                                <div
                                    v-bind:class="bgColor(item[header.value])"
                                    v-if="
                                        isRowEditable(header.value) &&
                                        item[header.value]
                                    "
                                >
                                    <v-edit-dialog
                                        :return-value.sync="
                                            item[header.value].unit
                                        "
                                        @save="
                                            save(item['id'] - 1, header.value)
                                        "
                                        :save-text="$t('button.confirm')"
                                        :cancel-text="$t('button.cancel')"
                                        large
                                    >
                                        {{ item[header.value].unit }}
                                        <template v-slot:input>
                                            <vue-number-input
                                                class="m-4"
                                                size="small"
                                                v-model="
                                                    item[header.value].unit
                                                "
                                                :min="0"
                                                inline
                                                center
                                                controls
                                            ></vue-number-input>
                                        </template>
                                    </v-edit-dialog>
                                </div>
                                <div v-else-if="isRowEditable(header.value)">
                                    －
                                </div>
                                <div v-else-if="isCurrencyRow(header.value)">
                                    <div v-if="item[header.value]">
                                        {{
                                            item[header.value].toLocaleString()
                                        }}
                                    </div>
                                </div>
                                <div v-else>{{ item[header.value] }}</div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td colspan="2">{{ $t("totalunit") }}</td>
                            <td colspan="2">
                                <div v-if="totalunit">
                                    {{ totalunit.toLocaleString() }}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td colspan="2">{{ $t("subtotal") }}</td>
                            <td colspan="2">
                                <div v-if="subtotal">
                                    {{ subtotal.toLocaleString() }}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </template>
            </v-data-table>
            <CRow class="m-2">
                <div class="bg-yellow" style="height: 25px; width: 25px">
                    &nbsp;
                </div>
                <span class="mx-2">{{ "*" }} {{ $t("defaultunit") }}</span>
            </CRow>
            <CRow class="m-2">
                <div class="bg-green" style="height: 25px; width: 25px">
                    &nbsp;
                </div>
                <span class="mx-2">{{ "*" }} {{ $t("updatedunit") }}</span>
            </CRow>
            <hr />
            <CButton @click="confirm" color="primary" class="px-4">
                {{ $t("button.submit") }}
                <v-progress-circular
                    v-if="submitLoading"
                    indeterminate
                    color="primary"
                    :size="15"
                ></v-progress-circular>
            </CButton>
        </CCardBody>
    </CCard>
</template>

<script>
//
import { Dialog } from "@/components";
import { goodsSizes } from "@/constants";
import Dashboard from "../dashboard/Dashboard.vue";
import StockTakeDialog from "./components/StockTakeDialog";

export default {
    name: "StockTake",
    components: {
        Dialog,
        Dashboard,
        StockTakeDialog,
    },
    data() {
        return {
            search: null,
            items: [],
            totalunit: 0,
            subtotal: 0,
            headers: [
                { text: "#ID", value: "id" },
                { title: this.$t("name"), value: "name" },
                { title: this.$t("type"), value: "type" },
                { title: this.$t("cup"), value: "cup" },
                { title: this.$t("color"), value: "color" },
                { text: "32-S", value: "32-S" },
                { text: "34-M", value: "34-M" },
                { text: "36-L", value: "36-L" },
                { text: "38-XL", value: "38-XL" },
                { text: "40-Q", value: "40-Q" },
                { text: "42-EQ", value: "42-EQ" },
                { text: "44-Free", value: "44-Free" },
                { title: this.$t("unitprice"), value: "unit_price" },
                { title: this.$t("totalunit"), value: "total_unit" },
                { title: this.$t("cost"), value: "cost" },
            ],
            fetchLoading: false,
            submitLoading: false,
        };
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            let self = this;
            self.fetchLoading = true;
            let data = {
                id: self.$route.params.id,
            };
            this.$store
                .dispatch("goods/purchases/invoice/items", data)
                .then((response) => {
                    self.fetchLoading = false;
                    self.items = JSON.parse(JSON.stringify(response.data));
                    self.updateTotal();
                })
                .catch((error) => {
                    self.fetchLoading = false;
                });
        },
        async confirm() {
            let self = this;
            if (self.submitLoading) {
                return;
            }
            var count = 0;
            for (const x of self.items) {
                for (const y of goodsSizes) {
                    if (x[y.name]) {
                        let item = x[y.name];
                        if (!item.updated || !("updated" in item)) {
                            count++;
                        }
                    }
                }
            }
            if (count > 0) {
                if (
                    await self.$refs.dialog.open(
                        this.$t("alert.title"),
                        this.$t("alert.stocktake")
                    )
                ) {
                    self.submit();
                }
                return;
            } else {
                self.submit();
            }
        },
        submit() {
            let self = this;
            if (self.submitLoading) {
                return;
            }
            self.submitLoading = true;
            let data = {
                goods_purchase_id: self.$route.params.id,
                items: self.items,
            };
            this.$store
                .dispatch("goods/purchases/stocktake/create", data)
                .then((response) => {
                    self.submitLoading = false;
                    self.$router.back();
                })
                .catch((error) => {
                    self.submitLoading = false;
                });
        },
        isRowEditable(value) {
            return goodsSizes.find((obj) => obj.name === value);
        },
        isCurrencyRow(value) {
            const rows = ["unit_price", "cost"];
            const idx = rows.indexOf(value);
            return idx > -1 ? true : false;
        },
        bgColor(value) {
            if (value.updated) {
                return "bg-green";
            } else {
                return "bg-yellow";
            }
        },
        save(idx, key) {
            this.items[idx][key].updated = true;
            let item = this.items[idx];
            let sizes = goodsSizes;
            let totalunit = 0;
            for (let size of sizes) {
                if (item[size.name]) {
                    totalunit += item[size.name].unit;
                }
            }
            this.items[idx].total_unit = totalunit;
            this.items[idx].cost = totalunit * this.items[idx].unit_price;
            this.updateTotal();
        },
        updateTotal() {
            this.totalunit = 0;
            this.subtotal = 0;
            for (let item of this.items) {
                this.totalunit += item.total_unit;
                this.subtotal += item.cost;
            }
        },
        async scanner() {
            let res = await this.$refs.scannerDialog.open(this.items);
            if (res) {
                this.items.forEach((item) => {
                    goodsSizes.forEach((size) => {
                        if (item[size.name]) {
                            if (item[size.name].barcode === res.barcode) {
                                item[size.name].unit = res.unit;
                            }
                        }
                    });
                });
            }
        },
    },
};
</script>

<style scoped>
.bg-green {
    background-color: #4fa64f;
}
.bg-yellow {
    background-color: #f6be00;
}
.my-table .v-table tbody tr:not(:last-child) {
    border-bottom: none;
}
</style>
