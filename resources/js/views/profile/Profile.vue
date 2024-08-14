<template>
    <CRow>
        <CCol>
            <CCard class="p-4">
                <CCardBody>
                    <CTabs :activeItemKey="0">
                        <CTabList variant="pills">
                            <CTab :itemKey="0">
                                {{ tab.values[0].toUpperCase() }}
                            </CTab>
                            <CTab :itemKey="1">
                                {{ tab.values[1].toUpperCase() }}
                            </CTab>
                        </CTabList>
                        <CTabContent>
                            <CTabPanel class="p-3" :itemKey="0">
                                <ProfileInfoForm></ProfileInfoForm>
                            </CTabPanel>
                            <CTabPanel class="p-3" :itemKey="1">
                                <PasswordForm></PasswordForm>
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
import PasswordForm from "./components/PasswordForm.vue";
import ProfileInfoForm from "./components/ProfileInfoForm.vue";

export default {
    name: "Profile",
    components: {
        ProfileInfoForm,
        PasswordForm,
    },
    data() {
        return {
            tab: {
                values: [this.$t("info"), this.$t("password")],
                index: 0,
            },
        };
    },
};
</script>
