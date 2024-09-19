<template>
    <CCard>
        <Dialog ref="dialog" />
        <StocktakeDialog ref="scannerDialog" />
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
                    <CInputGroup class="mb-3">
                        <CButton color="primary" size="sm">
                            <CIcon name="cil-magnifying-glass" size="sm" />
                        </CButton>
                        <CFormInput size="sm" v-model="search" />
                    </CInputGroup>
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
                :items-length="serverItemsLength"
                :search="search"
                :loading="fetchLoading"
                :mobile-breakpoint="0"
            >
                <template v-slot:loading>
                    <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
                </template>
                <template v-slot:[`item.32-S`]="{ index, item }">
                    <div v-bind:class="bgColor(index, '32-S')">
                        <input
                            v-if="item['32-S']"
                            v-model="item['32-S'].unit"
                            type="number"
                            variant="plain"
                            hide-details
                            hide-spin-buttons
                            @change="change(index, item)"
                        />
                        <span v-else>－</span>
                    </div>
                </template>
                <template v-slot:[`item.34-M`]="{ index, item }">
                    <div v-bind:class="bgColor(index, '34-M')">
                        <input
                            v-if="item['34-M']"
                            v-model="item['34-M'].unit"
                            type="number"
                            variant="plain"
                            hide-details
                            hide-spin-buttons
                            @change="change(index, item)"
                        />
                        <span v-else>－</span>
                    </div>
                </template>
                <template v-slot:[`item.36-L`]="{ index, item }">
                    <div v-bind:class="bgColor(index, '36-L')">
                        <input
                            v-if="item['36-L']"
                            v-model="item['36-L'].unit"
                            type="number"
                            variant="plain"
                            hide-details
                            hide-spin-buttons
                            @change="change(index, item)"
                        />
                        <span v-else>－</span>
                    </div>
                </template>
                <template v-slot:[`item.38-XL`]="{ index, item }">
                    <div v-bind:class="bgColor(index, '38-XL')">
                        <input
                            v-if="item['38-XL']"
                            v-model="item['38-XL'].unit"
                            type="number"
                            variant="plain"
                            hide-details
                            hide-spin-buttons
                            @change="change(index, item)"
                        />
                        <span v-else>－</span>
                    </div>
                </template>
                <template v-slot:[`item.40-Q`]="{ index, item }">
                    <div v-bind:class="bgColor(index, '40-Q')">
                        <input
                            v-if="item['40-Q']"
                            v-model="item['40-Q'].unit"
                            type="number"
                            variant="plain"
                            hide-details
                            hide-spin-buttons
                            @change="change(index, item)"
                        />
                        <span v-else>－</span>
                    </div>
                </template>
                <template v-slot:[`item.42-EQ`]="{ index, item }">
                    <div v-bind:class="bgColor(index, '42-EQ')">
                        <input
                            v-if="item['42-EQ']"
                            v-model="item['42-EQ'].unit"
                            type="number"
                            variant="plain"
                            hide-details
                            hide-spin-buttons
                            @change="change(index, item)"
                        />
                        <span v-else>－</span>
                    </div>
                </template>
                <template v-slot:[`item.44-Free`]="{ index, item }">
                    <div v-bind:class="bgColor(index, '44-Free')">
                        <input
                            v-if="item['44-Free']"
                            v-model="item['44-Free'].unit"
                            type="number"
                            variant="plain"
                            hide-details
                            hide-spin-buttons
                            @change="change(index, item)"
                        />
                        <span v-else>－</span>
                    </div>
                </template>
                <template v-slot:[`item.unit_price`]="{ item }">
                    <span v-if="item.cost">
                        {{ `$ ${(item.cost * 1).toLocaleString()}` }}
                    </span>
                    <span v-else>－</span>
                </template>
                <template v-slot:[`item.total_unit`]="{ item }">
                    <span v-if="item.total_unit">
                        {{ (item.total_unit * 1).toLocaleString() }}
                    </span>
                    <span v-else>－</span>
                </template>
                <template v-slot:[`item.cost`]="{ item }">
                    <span v-if="item.cost">
                        {{ `$ ${(item.cost * 1).toLocaleString()}` }}
                    </span>
                    <span v-else>－</span>
                </template>
                <template v-slot:[`body.append`]>
                    <tr>
                        <td v-for="i in [...Array(10)]" :key="i"></td>
                        <td class="p-2" colspan="2">
                            {{ `${$t("total-unit")}:` }}
                        </td>
                        <td class="p-2" colspan="4">
                            <span v-if="totalunit">
                                {{ `${(totalunit * 1).toLocaleString()}` }}
                            </span>
                            <span v-else>
                                {{ "0".toLocaleString() }}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td v-for="i in [...Array(10)]" :key="i"></td>
                        <td class="p-2" colspan="2">
                            {{ `${$t("subtotal")}: ` }}
                        </td>
                        <td class="p-2" colspan="4">
                            <span v-if="subtotal">
                                {{ `$ ${(subtotal * 1).toLocaleString()}` }}
                            </span>
                            <span v-else>
                                {{ `$ ${"0".toLocaleString()}` }}
                            </span>
                        </td>
                    </tr>
                </template>
            </v-data-table>
            <div class="d-flex p-2">
                <div class="bg-yellow" style="height: 25px; width: 25px">
                    &nbsp;
                </div>
                <span class="px-2"> {{ `*${$t("default-unit")}` }}</span>
            </div>
            <div class="d-flex p-2">
                <div class="bg-green" style="height: 25px; width: 25px">
                    &nbsp;
                </div>
                <span class="px-2"> {{ `*${$t("updated-unit")}` }}</span>
            </div>
            <hr />
            <CButton @click="confirm" color="primary" class="px-4">
                <v-progress-circular
                    v-if="submitLoading"
                    indeterminate
                    :size="15"
                ></v-progress-circular>
                {{ $t("button.submit") }}
            </CButton>
        </CCardBody>
    </CCard>
</template>

<script>
//
import { Dialog } from "@/components";
import { goodsSizes } from "@/constants";
import Dashboard from "../dashboard/Dashboard.vue";
import StocktakeDialog from "./components/StocktakeDialog.vue";

export default {
    name: "Stocktake",
    components: {
        Dialog,
        Dashboard,
        StocktakeDialog,
    },
    data() {
        return {
            totalunit: 0,
            subtotal: 0,
            search: null,
            loading: false,
            items: [],
            // page: 1,
            pageCount: 0,
            serverItemsLength: 0,
            options: {
                page: 1,
                itemsPerPage: 5,
                sortBy: null,
                sortDesc: false,
            },
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { title: "#ID", value: "id" },
                { title: this.$t("name"), value: "name" },
                { title: this.$t("type"), value: "type" },
                { title: this.$t("cup"), value: "cup" },
                { title: this.$t("color"), value: "color" },
                { title: "32-S", value: "32-S" },
                { title: "34-M", value: "34-M" },
                { title: "36-L", value: "36-L" },
                { title: "38-XL", value: "38-XL" },
                { title: "40-Q", value: "40-Q" },
                { title: "42-EQ", value: "42-EQ" },
                { title: "44-Free", value: "44-Free" },
                { title: this.$t("unit-price"), value: "unit_price" },
                { title: this.$t("total-unit"), value: "total_unit" },
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
                .dispatch("goods/purchases/invoices/items", data)
                .then((response) => {
                    // console.log(response);
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
                .dispatch("goods/purchases/stocktakes/create", data)
                .then((response) => {
                    self.submitLoading = false;
                    self.$router.push({ path: "/purchases" });
                })
                .catch((error) => {
                    self.submitLoading = false;
                });
        },
        change(index, item) {
            const sizes = goodsSizes;
            let total = 0;
            for (let size of sizes) {
                const key = size.name;
                if (item[key]) {
                    this.items[index][key].updated = true;
                    total += item[key].unit * 1;
                    break;
                }
            }
            this.items[index].total_unit = total;
            this.items[index].cost = total * this.items[index].unit_price;
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
        bgColor(index, key) {
            // console.log(value.updated);
            const item = this.items[index][key];
            if (item) {
                const updated = item.updated;
                if (updated) {
                    return "d-flex align-items-center bg-green w-100 h-100 px-2";
                } else {
                    return "d-flex align-items-center bg-yellow w-100 h-100 px-2";
                }
            } else {
                return "d-flex align-items-center w-100 h-100 px-2";
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
.v-data-table__td {
    padding: 0px !important;
}
</style>
