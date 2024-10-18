import { _ as _export_sfc, b as StockCalendar } from "../app.mjs";
import { S as ShippingTable } from "./ShippingTable-B6BZ_SDd.mjs";
import { resolveComponent, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
import "vue-i18n";
import "@coreui/icons";
import "@chenfengyuan/vue-barcode";
import "@chenfengyuan/vue-number-input";
import "@coreui/icons-vue";
import "@coreui/vue";
import "@vee-validate/i18n";
import "@vee-validate/rules";
import "moment";
import "vee-validate";
import "vue3-popper";
import "lodash";
import "uuid";
import "vuetify/lib/components/VDataTable/index.mjs";
import "vuetify/lib/components/VProgressLinear/index.mjs";
import "vuetify/lib/components/VSkeletonLoader/index.mjs";
import "vuetify/lib/components/VTooltip/index.mjs";
import "vuex";
import "vuetify/lib/components/VCard/index.mjs";
import "vuetify/lib/components/VDialog/index.mjs";
import "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import "vuetify";
import "vuetify/lib/components/VSelect/index.mjs";
import "vuetify/lib/components/VTextField/index.mjs";
import "vue-barcode-reader";
import "vuetify/lib/components/VAutocomplete/index.mjs";
import "vuetify/lib/components/VBtn/index.mjs";
import "vuetify/lib/components/VSnackbar/index.mjs";
import "vuetify/lib/components/VColorPicker/index.mjs";
import "vuetify/lib/components/VMenu/index.mjs";
import "vuetify/components";
import "vuetify/directives";
import "vuetify/labs/components";
import "vue-router";
import "secure-ls";
import "vuex-persistedstate";
import "axios";
import "query-string";
import "simplebar-vue";
const _sfc_main = {
  name: "Shippings",
  components: {
    ShippingTable,
    StockCalendar
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_StockCalendar = resolveComponent("StockCalendar");
  const _component_ShippingTable = resolveComponent("ShippingTable");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_StockCalendar, { cType: "shipping" }, null, _parent));
  _push(ssrRenderComponent(_component_ShippingTable, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/shippings/Shippings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Shippings = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Shippings as default
};
//# sourceMappingURL=Shippings-D0V3ipC0.mjs.map
