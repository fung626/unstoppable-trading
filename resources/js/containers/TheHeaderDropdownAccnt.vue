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
            <CDropdownItem
                v-if="$store.getters.isEmployee"
                :to="`leave/create/${$store.getters.authUser.id}`"
            >
                <CIcon name="cil-spreadsheet" /> {{ $t("leave") }}
            </CDropdownItem>
            <CDropdownItem @click="logout">
                <CIcon icon="cil-lock-locked" />
                {{ $t("logout") }}
            </CDropdownItem>
        </CDropdownMenu>
    </CDropdown>
    <!-- <CDropdown
        inNav
        class="c-header-nav-items"
        placement="bottom-end"
        add-menu-classes="pt-0"
    >
        <template #toggler>
            <CHeaderNavLink>
                <div class="c-avatar">
                    <img :src="avatar" class="c-avatar-img" />
                </div>
            </CHeaderNavLink>
        </template>
        <CDropdownHeader tag="div" class="text-center" color="light">
            <strong>{{ $t("settings") }}</strong>
        </CDropdownHeader>
        <CDropdownItem to="/profile">
            <CIcon name="cil-user" /> {{ $t("profile") }}
        </CDropdownItem>
        <CDropdownItem
            v-if="$store.getters.isEmployee"
            :to="`leave/create/${$store.getters.authUser.id}`"
        >
            <CIcon name="cil-spreadsheet" /> {{ $t("leave") }}
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem @click="logout()">
            <CIcon name="cil-lock-locked" /> {{ $t("logout") }}
        </CDropdownItem>
    </CDropdown> -->
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
