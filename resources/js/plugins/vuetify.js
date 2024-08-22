import { useColorModes } from "@coreui/vue";
import "@mdi/font/css/materialdesignicons.css";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labsComponents from "vuetify/labs/components";
import "vuetify/styles";

const { colorMode } = useColorModes("unstoppable-trading-theme");

// console.log(colorMode);

export default createVuetify({
    theme: {
        defaultTheme: colorMode.value,
    },
    components: {
        ...components,
        ...labsComponents,
    },
    directives,
});
