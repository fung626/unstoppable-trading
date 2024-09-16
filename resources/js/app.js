/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

import i18n from "@/plugins/vue-i18n";
import { iconsSet as icons } from "@assets/icons";
import VueBarcode from "@chenfengyuan/vue-barcode";
import VueNumberInput from "@chenfengyuan/vue-number-input";
import CIcon from "@coreui/icons-vue";
import CoreuiVue from "@coreui/vue";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";
import * as rules from "@vee-validate/rules";
import Antd from "ant-design-vue";
// import "ant-design-vue/dist/antd.css";
import moment from "moment";
import { configure, defineRule, ErrorMessage } from "vee-validate";
import { createApp } from "vue";
import Popper from "vue3-popper";
import "./bootstrap";
import "./components";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import "./utils";
import App from "./views/App.vue";

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

Object.keys(rules).forEach((rule) => {
    if (typeof rules[rule] === "function") {
        defineRule(rule, rules[rule]);
    }
});

configure({
    generateMessage: localize({ zh_TW: zhTW }),
    validateOnInput: true,
});

setLocale("zh_TW");

const app = createApp(App);

app.config.globalProperties.$appName = import.meta.env.APP_NAME;
app.config.globalProperties.$env = import.meta.env.APP_ENV;
app.config.globalProperties.$url = import.meta.env.APP_URL;
app.config.globalProperties.$momentDateFormat = "dddd, Do MMMM YYYY";

app.config.globalProperties.$log = console.log;

app.config.globalProperties.$moment = moment;
app.config.globalProperties.$formatDate = (value) => {
    if (!value) return "";
    return moment(value).format("YYYY-DD-MM");
};

app.use(CoreuiVue);
app.use(router);
app.use(i18n);
app.use(store);
app.use(vuetify);
app.use(Antd);

app.provide("icons", icons);

app.component("Popper", Popper);
app.component(VueBarcode.name, VueBarcode);
app.component(VueNumberInput.name, VueNumberInput);
app.component("CIcon", CIcon);
// app.component("ValidationProvider", ValidationProvider);
// app.component("VField", Field);
// app.component("VForm", Form);
app.component("ErrorMessage", ErrorMessage);

app.mount("#app");
