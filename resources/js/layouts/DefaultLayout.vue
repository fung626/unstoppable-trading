<script setup>
import TheFooter from "@/containers/TheFooter.vue";
import TheHeader from "@/containers/TheHeader.vue";
import TheSidebar from "@/containers/TheSidebar.vue";
import { CContainer } from "@coreui/vue";
</script>

<template>
    <div>
        <TheSidebar />
        <div class="wrapper d-flex flex-column min-vh-100">
            <TheHeader />
            <div class="body flex-grow-1">
                <CContainer class="px-4" lg>
                    <router-view />
                </CContainer>
            </div>
            <TheFooter />
        </div>
    </div>
</template>
