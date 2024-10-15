<template>
    <div>
        <Dialog ref="dialog" />
        <CRow class="p-2 mb-2 mt-4">
            <CCol :md="10" :sm="10">
                <CInputGroup class="mb-3">
                    <CButton color="primary" size="sm">
                        <CIcon name="cil-magnifying-glass" size="sm" />
                    </CButton>
                    <CFormInput size="sm" v-model="search" />
                </CInputGroup>
            </CCol>
            <CCol :md="2" :sm="2" class="text-right">
                <CButtonGroup role="group">
                    <CButton color="primary" size="sm" v-on:click="reload">
                        <CIcon name="cil-reload" size="sm" />
                    </CButton>
                </CButtonGroup>
            </CCol>
        </CRow>
        <v-data-table
            class="elevation-1"
            v-model:expanded="expanded"
            :headers="headers"
            :items="items"
            :search="search"
            :loading="loading"
            :hide-default-footer="true"
            :items-per-page="100"
            density="compact"
            disable-pagination
            show-expand
        >
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:expanded-row="{ columns, item }">
                <tr>
                    <td :colspan="columns.length">
                        <div
                            v-if="item.shippings && item.shippings.length > 0"
                            class="p-2"
                        >
                            <CRow>
                                <CCol class="border py-2" sm="4">
                                    {{ $t("transaction-no") }}
                                </CCol>
                                <CCol class="border py-2" sm="4">
                                    {{ $t("delivery-date") }}
                                </CCol>
                                <CCol class="border py-2" sm="4">
                                    {{ $t("amount") }}
                                </CCol>
                            </CRow>
                            <CRow v-for="s in item.shippings">
                                <CCol class="border py-2" sm="4">
                                    {{ s.generated_id }}
                                </CCol>
                                <CCol class="border py-2" sm="4">
                                    {{ s.delivered_at }}
                                </CCol>
                                <CCol class="border py-2" sm="4">
                                    {{ s.sub_total }}
                                </CCol>
                            </CRow>
                        </div>
                        <div
                            v-else
                            class="w-100 h-100 d-flex items-center justify-center py-6"
                        >
                            <span>{{ $t("no-data") }}</span>
                        </div>
                    </td>
                </tr>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <CButtonGroup>
                    <CButton
                        v-for="action in item.actions"
                        :key="action.key"
                        :color="action.color"
                        :disabled="action.disabled"
                        size="sm"
                        @click="click(item, action)"
                    >
                        {{ action.title }}
                    </CButton>
                </CButtonGroup>
            </template>
        </v-data-table>
    </div>
</template>
<script>
//
import { Dialog } from "@/components";

export default {
    name: "MonthlyStatementTable",
    props: {
        clientId: null,
    },
    components: {
        Dialog,
    },
    data() {
        return {
            search: null,
            loading: false,
            mobile: window.innerWidth < 769,
            expanded: [],
            items: [],
            headers: [
                {
                    title: this.$t("month"),
                    value: "month",
                },
                {
                    title: `${this.$t("year")}`,
                    value: "year",
                },
                {
                    title: `${this.$t("amount")}`,
                    value: "amount",
                },
                {
                    title: this.$t("actions"),
                    value: "actions",
                    sortable: false,
                },
            ],
        };
    },
    mounted() {
        window.addEventListener("resize", this.onResize);
        this.fetch();
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    },
    methods: {
        onResize() {
            this.mobile = window.innerWidth < 769;
        },
        fetch() {
            let self = this;
            self.loading = true;
            let data = {
                client_id: self.$props.clientId,
            };
            this.$store
                .dispatch("clients/monthly-statements/get", data)
                .then((response) => {
                    let res = JSON.parse(JSON.stringify(response));
                    self.items = res.data;
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        reload() {
            this.fetch();
        },
        async click(item, action) {
            let type = action.type;
            switch (type) {
            }
            // console.log(id, key);
        },
    },
};
</script>

<style scoped>
.v-select {
    font-size: 1em;
    font-weight: 100;
}
</style>
