<template></template>

<script>
import { DutyCalendar, TextFieldColorPicker } from "@/components";

export default {
    name: "CreateLeave",
    components: {
        DutyCalendar,
        TextFieldColorPicker,
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
