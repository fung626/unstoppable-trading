import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify, {
    VApp,
    VAppBar,
    VContainer,
    VContent,
    VIcon,
    VNavigationDrawer,
    VParallax,
    VSnackbar,
    VToolbar,
} from "vuetify/lib";

Vue.use(Vuetify, {
    component: {
        VApp,
        VAppBar,
        VContainer,
        VContent,
        VIcon,
        VNavigationDrawer,
        VParallax,
        VSnackbar,
        VToolbar,
    },
});

const opts = {
    icons: {
        iconfont: "mdi",
    },
    theme: {
        dark: false,
    },
};

export default new Vuetify(opts);
