<script setup>
import { useColorModes } from "@coreui/vue";
import { onMounted, ref } from "vue";
import { useTheme } from "vuetify";
import TheBreadcrumb from "./TheBreadcrumb.vue";

const headerClassNames = ref("mb-4 p-0");

const theme = useTheme();

const { colorMode, setColorMode } = useColorModes(
    "coreui-free-vue-admin-template-theme"
);

onMounted(() => {
    document.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 0) {
            headerClassNames.value = "mb-4 p-0 shadow-sm";
        } else {
            headerClassNames.value = "mb-4 p-0";
        }
    });
});
</script>

<template>
    <CHeader position="sticky" :class="headerClassNames">
        <CContainer class="border-bottom px-4" fluid>
            <CHeaderToggler
                @click="toggleVisible()"
                style="margin-inline-start: -14px"
            >
                <CIcon icon="cil-menu" size="lg" />
            </CHeaderToggler>
            <!-- <CHeaderNav class="d-none d-md-flex">
                <CNavItem>
                    <CNavLink href="/dashboard"> Dashboard </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink href="#">Users</CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink href="#">Settings</CNavLink>
                </CNavItem>
            </CHeaderNav> -->
            <CHeaderNav class="ms-auto">
                <!-- <CNavItem>
                    <CNavLink href="#">
                        <CIcon icon="cil-bell" size="lg" />
                    </CNavLink>
                </CNavItem>
                <CNavItem>
                    <CNavLink href="#">
                        <CIcon icon="cil-list" size="lg" />
                    </CNavLink>
                </CNavItem> -->
                <!-- <CNavItem class="position-relative">
                    <CNavLink href="#">
                        <CIcon icon="cil-send" size="lg" />
                    </CNavLink>

                    <CBadge
                        color="danger"
                        position="top-end"
                        shape="rounded-pill"
                    >
                        99+
                    </CBadge>
                </CNavItem> -->
            </CHeaderNav>
            <TheHeaderDropdownShipping />
            <CHeaderNav>
                <li class="nav-item py-1">
                    <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
                </li>
                <CDropdown variant="nav-item" placement="bottom-end">
                    <CDropdownToggle :caret="false">
                        <CIcon
                            v-if="colorMode === 'dark'"
                            icon="cil-moon"
                            size="lg"
                        />
                        <CIcon
                            v-else-if="colorMode === 'light'"
                            icon="cil-sun"
                            size="lg"
                        />
                        <CIcon v-else icon="cil-contrast" size="lg" />
                    </CDropdownToggle>
                    <CDropdownMenu>
                        <CDropdownItem
                            :active="colorMode === 'light'"
                            class="d-flex align-items-center"
                            component="button"
                            type="button"
                            @click="
                                () => {
                                    theme.global.name.value = 'light';
                                    setColorMode('light');
                                }
                            "
                        >
                            <CIcon class="me-2" icon="cil-sun" size="lg" />
                            Light
                        </CDropdownItem>
                        <CDropdownItem
                            :active="colorMode === 'dark'"
                            class="d-flex align-items-center"
                            component="button"
                            type="button"
                            @click="
                                () => {
                                    theme.global.name.value = 'dark';
                                    setColorMode('dark');
                                }
                            "
                        >
                            <CIcon class="me-2" icon="cil-moon" size="lg" />
                            Dark
                        </CDropdownItem>
                        <CDropdownItem
                            :active="colorMode === 'auto'"
                            class="d-flex align-items-center"
                            component="button"
                            type="button"
                            @click="setColorMode('auto')"
                        >
                            <CIcon class="me-2" icon="cil-contrast" size="lg" />
                            Auto
                        </CDropdownItem>
                    </CDropdownMenu>
                </CDropdown>
                <li class="nav-item py-1">
                    <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
                </li>
                <TheHeaderDropdownAccnt />
            </CHeaderNav>
        </CContainer>
        <CContainer class="px-4" fluid>
            <TheBreadcrumb />
        </CContainer>
    </CHeader>
</template>

<script>
import { mapState } from "vuex";
import TheHeaderDropdownAccnt from "./TheHeaderDropdownAccnt.vue";
import TheHeaderDropdownShipping from "./TheHeaderDropdownShipping.vue";

export default {
    components: {
        TheHeaderDropdownAccnt,
        TheHeaderDropdownShipping,
    },
    computed: {
        ...mapState(["ui/sidebar"]),
    },
    methods: {
        toggleVisible() {
            this.$store.dispatch("ui/sidebar/toggleVisible");
        },
    },
};
</script>
