<script setup>
import router from "@/router";
import { onMounted, ref } from "vue";
import i18n from "@/plugins/vue-i18n";

const breadcrumbs = ref();

const getBreadcrumbs = () => {
    return router.currentRoute.value.matched.map((route) => {
        return {
            active: route.path === router.currentRoute.value.fullPath,
            name: route.name,
            path: `${router.options.history.base}${route.path}`,
        };
    });
};

router.afterEach(() => {
    breadcrumbs.value = getBreadcrumbs();
});

onMounted(() => {
    breadcrumbs.value = getBreadcrumbs();
});
</script>

<template>
    <CBreadcrumb class="my-0">
        <CBreadcrumbItem
            v-for="item in breadcrumbs"
            :key="item"
            :href="item.active ? '' : item.path"
            :active="item.active"
        >
            {{ $t(item.name) }}
        </CBreadcrumbItem>
    </CBreadcrumb>
</template>
