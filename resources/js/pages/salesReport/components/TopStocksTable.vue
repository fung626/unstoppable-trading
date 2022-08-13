<template>
    <div>
        <CRow class="p-2">
            <CCol md="9" sm="9"> </CCol>
            <CCol md="3" sm="3" class="text-right">
                <CButton
                    color="primary"
                    size="sm"
                    v-on:click="reload"
                    :disabled="loading"
                >
                    <CIcon name="cil-reload" size="sm" />
                </CButton>
            </CCol>
        </CRow>
        <v-data-table
            class="my-2 elevation-1"
            :headers="headers"
            :items="items"
            :options.sync="options"
            :loading="loading"
            :hide-default-footer="true"
        >
        </v-data-table>
    </div>
</template>
<script>
//
import { mapState } from "vuex";

export default {
    name: "TopStocksTable",
    props: {},
    components: {},
    computed: {
        ...mapState(["salesreport/topstocks"]),
        items() {
            return this["salesreport/topstocks"].data;
        }
    },
    data() {
        return {
            loading: false,
            options: {},
            headers: [
                { text: this.$t("name"), value: "name", sortable: false },
                { text: this.$t("type"), value: "type", sortable: false },
                { text: this.$t("cup"), value: "cup", sortable: false },
                { text: this.$t("color"), value: "color", sortable: false },
                { text: this.$t("size"), value: "size", sortable: false },
                {
                    text: this.$t("unit"),
                    value: "unit",
                    sortable: false
                }
            ]
        };
    },
    watch: {
        options: {
            handler() {
                this.fetch();
            }
        },
        loading() {}
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            const {} = self.options;
            let data = {};
            this.$store
                .dispatch("salesreport/topstocks/get", data)
                .then(response => {
                    self.loading = false;
                })
                .catch(error => {
                    self.loading = false;
                });
        },
        search() {
            this.fetch(true);
        },
        reload() {
            this.fetch();
        }
    }
};
</script>
