<template>
    <div class="wrapper min-vh-100 d-flex flex-row align-items-center">
        <Snackbar />
        <CContainer class="c-app flex-row align-items-center">
            <CRow class="justify-content-center">
                <CCol :md="6" :sm="9">
                    <CCardGroup>
                        <CCard class="p-4">
                            <CCardBody>
                                <CForm @submit.prevent="login" method="POST">
                                    <h1>{{ $t("login") }}</h1>
                                    <p class="text-muted">
                                        {{ $t("auth.signin.msg") }}
                                    </p>
                                    <v-text-field
                                        v-model="email"
                                        :label="$t('email')"
                                        type="email"
                                        required
                                        outlined
                                        dense
                                        variant="solo"
                                    ></v-text-field>
                                    <v-text-field
                                        v-model="password"
                                        :label="$t('password')"
                                        type="password"
                                        required
                                        outlined
                                        dense
                                        variant="solo"
                                    ></v-text-field>
                                    <CRow>
                                        <CCol col="6" class="text-left">
                                            <CButton
                                                type="submit"
                                                color="primary"
                                                class="px-4"
                                            >
                                                <v-progress-circular
                                                    v-if="fetching"
                                                    indeterminate
                                                    :size="15"
                                                ></v-progress-circular>
                                                {{ $t("login") }}
                                            </CButton>
                                        </CCol>
                                        <CCol col="6" class="text-right">
                                            <CButton
                                                @click="forgotpassword"
                                                color="link"
                                                class="px-0"
                                            >
                                                {{ $t("forgotpassword") }}?
                                            </CButton>
                                        </CCol>
                                    </CRow>
                                </CForm>
                            </CCardBody>
                        </CCard>
                    </CCardGroup>
                </CCol>
            </CRow>
        </CContainer>
    </div>
</template>

<script setup>
import { useColorModes } from "@coreui/vue";
import { onMounted } from "vue";

const { colorMode, setColorMode, isColorModeSet } = useColorModes(
    "unstoppable-trading-theme"
);

onMounted(() => {
    console.log(colorMode.value);
    if (isColorModeSet) {
        setColorMode(colorMode.value);
    }
});
</script>

<script>
//
import { Snackbar } from "@/components";
import { mapActions } from "vuex";

export default {
    name: "Login",
    components: { Snackbar },
    data() {
        return {
            email: "",
            password: "",
            fetching: false,
        };
    },
    methods: {
        ...mapActions(["login"]),
        login(event) {
            let self = this;
            self.fetching = true;
            self.$store
                .dispatch("login", {
                    email: self.email,
                    password: self.password,
                })
                .then(function (response) {
                    self.fetching = false;
                    window.location.reload();
                })
                .catch((error) => {
                    self.fetching = false;
                });
        },
        forgotpassword() {
            this.$router.push({ path: "forgotpassword" });
        },
    },
};
</script>

<style scoped>
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
