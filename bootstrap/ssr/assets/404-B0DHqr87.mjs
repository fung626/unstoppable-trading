import { resolveComponent, mergeProps, withCtx, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../app.mjs";
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
  name: "404"
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CContainer = resolveComponent("CContainer");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  _push(ssrRenderComponent(_component_CContainer, mergeProps({ class: "d-flex align-items-center min-vh-100" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CRow, { class: "w-100 justify-content-center" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CCol, { md: "6" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="w-100"${_scopeId3}><div class="clearfix"${_scopeId3}><h1 class="float-left display-3 mr-4"${_scopeId3}>404</h1><h4 class="pt-3"${_scopeId3}>Oops! You&#39;re lost.</h4><p class="text-muted"${_scopeId3}> The page you are looking for was not found. </p></div></div>`);
                  } else {
                    return [
                      createVNode("div", { class: "w-100" }, [
                        createVNode("div", { class: "clearfix" }, [
                          createVNode("h1", { class: "float-left display-3 mr-4" }, "404"),
                          createVNode("h4", { class: "pt-3" }, "Oops! You're lost."),
                          createVNode("p", { class: "text-muted" }, " The page you are looking for was not found. ")
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CCol, { md: "6" }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "w-100" }, [
                      createVNode("div", { class: "clearfix" }, [
                        createVNode("h1", { class: "float-left display-3 mr-4" }, "404"),
                        createVNode("h4", { class: "pt-3" }, "Oops! You're lost."),
                        createVNode("p", { class: "text-muted" }, " The page you are looking for was not found. ")
                      ])
                    ])
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
          createVNode(_component_CRow, { class: "w-100 justify-content-center" }, {
            default: withCtx(() => [
              createVNode(_component_CCol, { md: "6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "w-100" }, [
                    createVNode("div", { class: "clearfix" }, [
                      createVNode("h1", { class: "float-left display-3 mr-4" }, "404"),
                      createVNode("h4", { class: "pt-3" }, "Oops! You're lost."),
                      createVNode("p", { class: "text-muted" }, " The page you are looking for was not found. ")
                    ])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/error/404.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _404 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  _404 as default
};
//# sourceMappingURL=404-B0DHqr87.mjs.map
