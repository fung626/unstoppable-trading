<template>
    <div>
        <Dialog ref="dialog" />
        <DutyCalendar />
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
                    <CButton color="primary" size="sm" v-on:click="add">
                        <CIcon name="cil-plus" size="sm" />
                    </CButton>
                    <CButton color="primary" size="sm" v-on:click="download">
                        <CIcon name="cil-cloud-download" size="sm" />
                    </CButton>
                    <CButton color="primary" size="sm" v-on:click="reload">
                        <CIcon name="cil-reload" size="sm" />
                    </CButton>
                </CButtonGroup>
            </CCol>
        </CRow>
        <v-data-table
            class="elevation-1"
            :headers="headers"
            :items="items"
            :items-length="serverItemsLength"
            :search="search"
            :loading="loading"
            @update:options="fetch"
            :mobile="mobile"
            :footer-props="{
                disableItemsPerPage: disableItemsPerPage,
                disablePagination: disablePagination,
                showFirstLastPage: true,
                showCurrentPage: true,
                itemsPerPageOptions: [10, 20, 50, 100],
            }"
        >
            <template v-slot:[`item.color`]="{ item }">
                <div
                    class="d-flex align-items-center"
                    :class="{
                        'justify-content-start': !mobile,
                        'justify-content-end': mobile,
                    }"
                >
                    {{ item.color }}
                    <div
                        class="mx-2"
                        :style="{
                            height: '30px',
                            width: '30px',
                            borderRadius: '4px',
                            backgroundColor: item.color,
                        }"
                    ></div>
                </div>
            </template>
            <template v-slot:loading>
                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
            </template>
            <template v-slot:[`item.created_at`]="{ item }">
                {{ this.$formatDate(item.created_at) }}
            </template>
            <template v-slot:[`item.updated_at`]="{ item }">
                {{ this.$formatDate(item.updated_at) }}
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
import { Dialog, DutyCalendar } from "@/components";

export default {
    name: "Duty",
    components: {
        Dialog,
        DutyCalendar,
    },
    data() {
        return {
            search: null,
            loading: false,
            mobile: window.innerWidth < 769,
            items: [],
            page: 1,
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
                { title: this.$t("name"), value: "user.name", sortable: true },
                { title: this.$t("start"), value: "start", sortable: true },
                { title: this.$t("end"), value: "end", sortable: true },
                {
                    title: `${this.$t("calendar.title")} ${this.$t("color")}`,
                    value: "color",
                },
                {
                    title: this.$t("updatedat"),
                    value: "updated_at",
                    sortable: true,
                },
                {
                    title: this.$t("actions"),
                    value: "actions",
                    sortable: false,
                },
            ],
            snackbar: {
                show: false,
                text: "",
            },
        };
    },
    mounted() {
        window.addEventListener("resize", this.onResize);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    },
    methods: {
        onResize() {
            this.mobile = window.innerWidth < 769;
        },
        fetch({ page, itemsPerPage, sortBy, search }) {
            let self = this;
            self.loading = true;
            self.options.page = page;
            self.options.itemsPerPage = itemsPerPage;
            self.options.sortBy = sortBy;
            let data = {
                page: page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: null,
                search: search,
            };
            this.$store
                .dispatch("users/duty/get", data)
                .then((response) => {
                    let res = JSON.parse(JSON.stringify(response.data));
                    self.items = res.data;
                    self.serverItemsLength = res.total;
                    self.pageCount = res.last_page;
                    self.page = res.current_page;
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        add() {
            this.$router.push({ path: "/duty/create" });
        },
        download() {
            let self = this;
            self.loading = true;
            const { itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText,
                extension: "pdf",
            };
            this.$store
                .dispatch("users/duty/export", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        reload() {
            this.fetch({ ...this.options });
        },
        async click(item, action) {
            let type = action.type;
            let route = action.route;
            switch (type) {
                case "RouterPush":
                    // this.$router.push({
                    //     path: `duty/details/${item.id}`,
                    // });
                    this.$router.push({
                        path: route,
                    });
                    break;
                case "Create":
                    // this.$router.push({
                    //     path: `duty/create/${item.user.id}`,
                    // });
                    this.$router.push({
                        path: route,
                    });
                    break;
                case "Delete":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("alert.title"),
                            this.$t("alert.delete")
                        )
                    ) {
                        let self = this;
                        self.loading = true;
                        this.$store
                            .dispatch("users/duty/delete", { id: `${item.id}` })
                            .then((response) => {
                                self.loading = false;
                                self.fetch({ ...this.options });
                            })
                            .catch((error) => {
                                self.loading = false;
                            });
                    }
                    break;
            }
            // console.log(id, key);
        },
    },
};
</script>
