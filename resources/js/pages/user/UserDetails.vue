<template>
    <CRow>
        <CCol>
            <CCard class="p-2">
                <CCardBody>
                    <CTabs
                        variant="pills"
                        @update:activeTab="index => activeTabUpdated(index)"
                    >
                        <CTab
                            :title="tab.values[0].toUpperCase()"
                            :active="tab.index === 0 ? true : false"
                        >
                            <hr />
                            <UserForm :id="this.$route.params.id"></UserForm>
                        </CTab>
                        <CTab
                            :title="tab.values[1].toUpperCase()"
                            :active="tab.index === 1 ? true : false"
                        >
                            <hr />
                            <EmployeeForm
                                :id="this.$route.params.id"
                            ></EmployeeForm>
                        </CTab>
                        <CTab
                            v-if="$store.getters.isAdmin"
                            :title="tab.values[2].toUpperCase()"
                            :active="tab.index === 2 ? true : false"
                        >
                            <hr />
                            <PermissionForm
                                :id="this.$route.params.id"
                            ></PermissionForm>
                        </CTab>
                    </CTabs>
                </CCardBody>
            </CCard>
        </CCol>
    </CRow>
</template>
<script>
//
import EmployeeForm from "./components/EmployeeForm";
import PermissionForm from "./components/PermissionForm";
import UserForm from "./components/UserForm";

export default {
    name: "UserDetails",
    components: {
        UserForm,
        EmployeeForm,
        PermissionForm
    },
    data() {
        return {
            tab: {
                values: [
                    this.$t("info"),
                    this.$t("employee"),
                    this.$t("permission")
                ],
                index: 0
            }
        };
    },
    methods: {
        activeTabUpdated(index) {}
    }
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
