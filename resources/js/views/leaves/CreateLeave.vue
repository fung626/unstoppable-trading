<template>
    <CContainer md>
        <CCard class="p-4">
            <CRow class="g-0 mb-2">
                <TextFieldColorPicker v-model="color" />
            </CRow>
        </CCard>
    </CContainer>
</template>

<script>
import { DutyCalendar, TextFieldColorPicker } from "@/components";

export default {
    name: "CreateLeave",
    components: {
        DutyCalendar,
        TextFieldColorPicker,
    },
    data: {
        color: null,
    },
    methods: {
        submit() {},
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
