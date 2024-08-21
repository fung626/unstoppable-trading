<template>
    <v-snackbar
        v-model="show"
        :color="color"
        :timeout="timeout"
        :vertical="true"
        multi-line
    >
        {{ text }}
        <template>
            <v-btn dark text @click="close">
                {{ $t("button.close") }}
            </v-btn>
        </template>
    </v-snackbar>
</template>

<script>
export default {
    name: "Snackbar",
    data() {
        return {
            timeout: 10000,
        };
    },
    computed: {
        show: {
            get() {
                return this.$store.getters["snackbar/show"];
            },
            set(value) {
                if (!value) {
                    this.$store.dispatch("snackbar/close");
                }
            },
        },
        color() {
            return this.$store.getters["snackbar/color"];
        },
        text() {
            return this.$store.getters["snackbar/text"];
        },
    },
    mounted() {
        this.close();
    },
    unmounted() {
        this.close();
    },
    methods: {
        close() {
            this.$store.dispatch("snackbar/close");
        },
    },
};
</script>
