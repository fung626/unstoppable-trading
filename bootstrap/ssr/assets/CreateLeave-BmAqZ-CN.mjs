import { _ as _export_sfc, D as DutyCalendar, T as TextFieldColorPicker } from "../app.mjs";
import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
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
import "vuex";
import "uuid";
import "vuetify/lib/components/VProgressLinear/index.mjs";
import "vuetify/lib/components/VCard/index.mjs";
import "vuetify/lib/components/VDialog/index.mjs";
import "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import "vuetify";
import "vuetify/lib/components/VDataTable/index.mjs";
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
  name: "CreateLeave",
  components: {
    DutyCalendar,
    TextFieldColorPicker
  },
  data: {
    color: null
  },
  methods: {
    submit() {
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CContainer = resolveComponent("CContainer");
  const _component_CCard = resolveComponent("CCard");
  const _component_CRow = resolveComponent("CRow");
  const _component_TextFieldColorPicker = resolveComponent("TextFieldColorPicker");
  _push(ssrRenderComponent(_component_CContainer, mergeProps({ md: "" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCard, { class: "p-4" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CRow, { class: "g-0 mb-2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_TextFieldColorPicker, {
                      modelValue: _ctx.color,
                      "onUpdate:modelValue": ($event) => _ctx.color = $event
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_TextFieldColorPicker, {
                        modelValue: _ctx.color,
                        "onUpdate:modelValue": ($event) => _ctx.color = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CRow, { class: "g-0 mb-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_TextFieldColorPicker, {
                      modelValue: _ctx.color,
                      "onUpdate:modelValue": ($event) => _ctx.color = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CCard, { class: "p-4" }, {
            default: withCtx(() => [
              createVNode(_component_CRow, { class: "g-0 mb-2" }, {
                default: withCtx(() => [
                  createVNode(_component_TextFieldColorPicker, {
                    modelValue: _ctx.color,
                    "onUpdate:modelValue": ($event) => _ctx.color = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/leaves/CreateLeave.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CreateLeave = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-5b302dd5"]]);
export {
  CreateLeave as default
};
