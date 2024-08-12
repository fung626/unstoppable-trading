<template>
    <CRow>
        <CCol>
            <CCard class="p-2">
                <v-progress-linear
                    :active="loading"
                    indeterminate
                    color="cyan"
                ></v-progress-linear>
                <CCardBody>
                    <CTabs :activeItemKey="0">
                        <CTabList variant="pills">
                            <CTab :itemKey="0">
                                {{ tab.values[0].toUpperCase() }}
                            </CTab>
                            <CTab :itemKey="1">
                                {{ tab.values[1].toUpperCase() }}
                            </CTab>
                            <CTab :itemKey="2">
                                {{ tab.values[2].toUpperCase() }}
                            </CTab>
                            <CTab :itemKey="3">
                                {{ tab.values[3].toUpperCase() }}
                            </CTab>
                        </CTabList>
                        <CTabContent>
                            <CTabPanel class="p-3" :itemKey="0">
                                <UserForm
                                    :id="this.$route.params.id"
                                ></UserForm>
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="1">
                                <EmployeeForm
                                    :id="this.$route.params.id"
                                ></EmployeeForm>
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="2">
                                <DutyCalendar
                                    :userId="this.$route.params.id"
                                ></DutyCalendar>
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="3">
                                <PermissionForm
                                    :id="this.$route.params.id"
                                ></PermissionForm>
                            </CTabPanel>
                        </CTabContent>
                    </CTabs>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
//
import DutyCalendar from "@/components/DutyCalendar.vue";
import EmployeeForm from "./components/EmployeeForm.vue";
import PermissionForm from "./components/PermissionForm.vue";
import UserForm from "./components/UserForm.vue";

export default {
    name: "UserDetails",
    components: {
        DutyCalendar,
        EmployeeForm,
        PermissionForm,
        UserForm,
    },
    data() {
        return {
            loading: false,
            data: {},
            tab: {
                values: [
                    this.$t("info"),
                    this.$t("employee"),
                    this.$t("duty"),
                    this.$t("permission"),
                ],
                index: 0,
            },
        };
    },
    mounted() {
        this.fetch();
    },
    methods: {
        activeTabUpdated(index) {},
        fetch() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {
                id: self.$route.params.id,
            };
            this.$store
                .dispatch("users/details", data)
                .then((response) => {
                    self.data = response.data;
                    self.loading = false;
                    // console.log(response);
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
    },
};
</script>

<style scoped>
.v-select {
    font-size: 1em;
    font-weight: 100;
}
.v-text-field--outlined >>> fieldset {
    border-color: #ccc;
}
.v-text-field >>> input {
    font-size: 0.8em;
    font-weight: 100;
}
.v-text-field >>> label {
    font-size: 0.8em;
}
.v-text-field >>> button {
    font-size: 0.8em;
}
</style>
