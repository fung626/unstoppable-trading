<template>
    <CDropdown placement="bottom-end" variant="nav-item">
        <CDropdownToggle class="py-0 pe-0" :caret="false">
            <CAvatar :src="avatar" size="md" />
        </CDropdownToggle>
        <CDropdownMenu class="pt-0">
            <CDropdownHeader
                component="h6"
                class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
            >
                {{ $t("account") }}
            </CDropdownHeader>
            <CDropdownItem href="#/profile">
                <CIcon icon="cil-user" /> {{ $t("profile") }}
            </CDropdownItem>
            <CDropdownItem v-if="$store.getters.isEmployee" href="#/leaves">
                <CIcon name="cil-description" /> {{ $t("leave") }}
            </CDropdownItem>
            <CDropdownItem @click="logout">
                <CIcon icon="cil-lock-locked" />
                {{ $t("logout") }}
            </CDropdownItem>
        </CDropdownMenu>
    </CDropdown>
</template>

<script>
export default {
    name: "TheHeaderDropdownAccnt",
    computed: {
        avatar() {
            return `https://www.gravatar.com/avatar/${this.$store.getters.authUser?.email}?s=160&d=retro`;
        },
    },
    methods: {
        logout() {
            // let self = this;
            this.$store.dispatch("auth/logout");
            this.$router.push({ path: "/login" });
        },
    },
};
</script>

<style scoped>
.c-icon {
    margin-right: 0.3rem;
}
</style>
