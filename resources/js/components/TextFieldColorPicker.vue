<template>
    <v-menu offset-y>
        <template v-slot:activator="{ on }">
            <v-btn :color="color" dark v-on="on"> Event Color </v-btn>
        </template>
        <v-color-picker
            value="#7417BE"
            v-model="color"
            hide-canvas
            hide-inputs
            show-swatches
            class="mx-auto"
        ></v-color-picker>
    </v-menu>
    <!-- <v-text-field
        class=""
        :value="value"
        @input="$emit('input', $event)"
        return-masked-value
        hide-details
        solo
    >
        <template v-slot:append>
            <v-menu
                v-model="menu"
                top
                nudge-bottom="105"
                nudge-left="16"
                :close-on-content-click="false"
            >
                <template v-slot:activator="{ on }">
                    <div :style="swatchStyle" v-on="on" />
                </template>
                <v-card>
                    <v-card-text class="pa-0">
                        <v-color-picker
                            :value="value"
                            @input="$emit('input', $event)"
                            show-swatches
                            flat
                        />
                    </v-card-text>
                </v-card>
            </v-menu>
        </template>
    </v-text-field> -->
</template>

<script>
export default {
    name: "TextFieldColorPicker",
    props: {
        // value: String,
    },
    data() {
        return {
            mask: "!#XXXXXXXX",
            menu: false,
            value: "",
        };
    },
    // watch: {
    //     value: function(val) {
    //         console.log(val);
    //     }
    // },
    // mounted() {
    //     console.log(this.value);
    // },
    computed: {
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
