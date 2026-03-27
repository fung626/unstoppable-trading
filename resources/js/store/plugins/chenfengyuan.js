import VueBarcode from "@chenfengyuan/vue-barcode";
import VueNumberInput from "@chenfengyuan/vue-number-input";
import Vue from "vue";

// console.log(VueNumberInput.name);
// console.log(VueBarcode.name);
// console.log(VueBarcode);

Vue.component(VueBarcode.name, VueBarcode);
Vue.component("vue-number-input", VueNumberInput);
