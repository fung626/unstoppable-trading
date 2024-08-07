<template>
    <div>
        <v-menu class="w" v-model="menu">
            <template v-slot:activator="{ props }">
                <v-btn
                    class="w-100"
                    :style="{ backgroundColor: value, color: 'white' }"
                    v-bind="props"
                >
                    {{ value }}
                </v-btn>
            </template>
            <v-card color="transparent" elevation="0" outlined>
                <v-color-picker
                    class="mx-auto"
                    v-model="value"
                    hide-canvas
                    hide-inputs
                    show-swatches
                    :border="false"
                ></v-color-picker>
            </v-card>
        </v-menu>
    </div>
</template>

<script>
export default {
    name: "TextFieldColorPicker",
    props: {
        modelValue: [String, Array],
    },
    data() {
        return {
            mask: "!#XXXXXXXX",
            menu: false,
            // value: "#7417BE",
        };
    },
    // watch: {
    //     value: function (val) {
    //         console.log(val);
    //     },
    // },
    // mounted() {
    //     console.log(this.value);
    // },
    computed: {
        value: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit("update:modelValue", value);
            },
        },
        swatchStyle() {
            const { value, menu } = this;
            return {
                backgroundColor: value,
                cursor: "pointer",
                height: "30px",
                width: "30px",
                borderRadius: menu ? "50%" : "4px",
                transition: "border-radius 200ms ease-in-out",
            };
        },
    },
};
</script>
