<script setup>
import { RouterLink } from "vue-router";
import { TheSidebarNav } from "./TheSidebarNav.js";
</script>

<template>
    <CSidebar
        class="border-end"
        colorScheme="dark"
        position="fixed"
        :unfoldable="unfoldable"
        :visible="visible"
        @visible-change="(value) => toggleVisible(value)"
    >
        <CSidebarHeader class="border-bottom">
            <RouterLink custom to="/" v-slot="{ href, navigate }">
                <CSidebarBrand
                    v-bind="$attrs"
                    as="a"
                    :href="href"
                    @click="navigate"
                >
                    <img src="/images/header-logo.png" height="32" />
                    <!-- <CIcon
                        custom-class-name="sidebar-brand-full"
                        :icon="logo"
                        :height="32"
                    />
                    <CIcon
                        custom-class-name="sidebar-brand-narrow"
                        :icon="sygnet"
                        :height="32"
                    /> -->
                </CSidebarBrand>
            </RouterLink>
            <CCloseButton class="d-lg-none" dark @click="toggleVisible()" />
        </CSidebarHeader>
        <TheSidebarNav />
        <CSidebarFooter class="border-top d-none d-lg-flex">
            <CSidebarToggler @click="toggleUnfoldable()" />
        </CSidebarFooter>
    </CSidebar>
</template>

<script>
import { mapState } from "vuex";

export default {
    computed: {
        ...mapState(["ui/sidebar"]),
        unfoldable() {
            return this["ui/sidebar"].unfoldable;
        },
        visible() {
            return this["ui/sidebar"].visible;
        },
    },
    methods: {
        toggleVisible(value) {
            this.$store.dispatch("ui/sidebar/toggleVisible", value);
        },
        toggleUnfoldable() {
            this.$store.dispatch("ui/sidebar/toggleUnfoldable");
        },
    },
};
</script>
