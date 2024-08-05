<template>
    <div>
        <Dialog ref="dialog" />
        <!-- <CRow class="p-2">
            <CCol :md="9" :sm="9">
                <CInputGroup class="mb-3">
                    <CButton color="primary" size="sm" v-on:click="search">
                        <CIcon name="cil-magnifying-glass" size="sm" />
                    </CButton>
                    <CFormInput
                        size="sm"
                        v-model="searchText"
                        v-on:keyup.enter="search"
                    />
                </CInputGroup>
            </CCol>
            <CCol :md="3" :sm="3" class="text-right">
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
        </CRow> -->
        <v-data-table class="elevation-1">
            <!-- <template v-slot:[`item.role`]="{ item }">
                {{ $t(item.role) }}
            </template>
            <template v-slot:[`item.created_at`]="{ item }">
                {{ item.created_at | moment("dddd, Do MMMM YYYY") }}
            </template>
            <template v-slot:[`item.updated_at`]="{ item }">
                {{ item.updated_at | moment("dddd, Do MMMM YYYY") }}
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <CButtonGroup>
                    <CButton
                        v-for="action in item.actions"
                        :key="action.key"
                        :color="action.color"
                        :disabled="action.disabled"
                        size="sm"
                        @click="click(item.id, action.type)"
                    >
                        {{ action.title }}
                    </CButton>
                </CButtonGroup>
            </template> -->
        </v-data-table>
    </div>
</template>
<!-- <script>
//
import { Dialog } from "@/components";

export default {
    name: "Users",
    components: {
        Dialog,
    },
    data() {
        // return {
        //     searchText: null,
        //     page: 1,
        //     serverItemsLength: 0,
        //     pageCount: 0,
        //     items: [],
        //     loading: false,
        //     sortBy: "email",
        //     sortDesc: false,
        //     disableItemsPerPage: false,
        //     disablePagination: false,
        //     options: {},
        //     headers: [
        //         { title: "#ID", key: "id" },
        //         { title: this.$t("email"), key: "email" },
        //         { title: this.$t("phone"), key: "phone" },
        //         { title: this.$t("role"), key: "role" },
        //         { title: this.$t("updatedat"), key: "updated_at" },
        //         { title: this.$t("actions"), key: "actions", sortable: false },
        //     ],
        //     snackbar: {
        //         show: false,
        //         text: "",
        //     },
        // };
    },
    mounted() {
        console.log("mounted");
    },
    // watch: {
    //     options: {
    //         handler() {
    //             this.fetch();
    //         },
    //     },
    //     loading() {
    //         this.disableItemsPerPage = this.loading;
    //         this.disablePagination = this.loading;
    //     },
    // },
    // methods: {
    //     fetch({ page, itemsPerPage, sortBy, sortDesc }) {
    //         // let self = this;
    //         // self.loading = true;
    //         // let data = {
    //         //     page: reset ? 1 : page,
    //         //     per_page: itemsPerPage,
    //         //     sort_by: sortBy,
    //         //     sort_desc: sortDesc,
    //         //     search: self.searchText,
    //         // };
    //         // this.$store
    //         //     .dispatch("user/get", data)
    //         //     .then((response) => {
    //         //         let res = JSON.parse(JSON.stringify(response.data));
    //         //         self.items = res.data;
    //         //         self.serverItemsLength = res.total;
    //         //         self.pageCount = res.last_page;
    //         //         self.page = res.current_page;
    //         //         self.loading = false;
    //         //     })
    //         //     .catch((error) => {
    //         //         self.loading = false;
    //         //     });
    //     },
    //     search() {
    //         // this.fetch();
    //     },
    //     add() {
    //         this.$router.push({ name: "CreateUser" });
    //     },
    //     download() {
    //         let self = this;
    //         self.loading = true;
    //         const { itemsPerPage, sortBy, sortDesc } = self.options;
    //         let data = {
    //             per_page: itemsPerPage,
    //             sort_by: sortBy,
    //             sort_desc: sortDesc,
    //             search: self.searchText,
    //             extension: "pdf",
    //         };
    //         this.$store
    //             .dispatch("user/export", data)
    //             .then((response) => {
    //                 self.loading = false;
    //             })
    //             .catch((error) => {
    //                 self.loading = false;
    //             });
    //     },
    //     reload() {
    //         this.fetch();
    //     },
    //     async click(id, type) {
    //         switch (type) {
    //             case "RouterPush":
    //                 this.$router.push({
    //                     name: "UserDetails",
    //                     params: { id: id },
    //                 });
    //                 break;
    //             case "Delete":
    //                 if (
    //                     await this.$refs.dialog.open(
    //                         this.$t("alert.title"),
    //                         this.$t("alert.delete")
    //                     )
    //                 ) {
    //                     let self = this;
    //                     this.$store
    //                         .dispatch("user/delete", { id: id })
    //                         .then((response) => {
    //                             self.loading = false;
    //                             self.fetch();
    //                         })
    //                         .catch((error) => {
    //                             self.loading = false;
    //                         });
    //                 }
    //                 break;
    //         }
    //         // console.log(id, key);
    //     },
    // },
};
</script> -->
