import { resolveComponent, mergeProps, withCtx, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, createVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../app.mjs";
import { VProgressCircular } from "vuetify/lib/components/VProgressCircular/index.mjs";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
import { VTextField } from "vuetify/lib/components/VTextField/index.mjs";
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
import "vuetify/lib/components/VSkeletonLoader/index.mjs";
import "vuetify/lib/components/VTooltip/index.mjs";
import "vuex";
import "vuetify/lib/components/VCard/index.mjs";
import "vuetify/lib/components/VDialog/index.mjs";
import "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import "vuetify";
import "vuetify/lib/components/VSelect/index.mjs";
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
  name: "ExchangeRateDetails",
  data() {
    return {
      formData: {},
      errors: {},
      fetchLoading: false,
      updateLoading: false
    };
  },
  computed: {
    hint() {
      const { base, symbol } = this.$route.params;
      if (this.formData.rate) {
        const { rate } = this.formData;
        return `1 ${base} = ${1 * rate} ${symbol}`;
      }
      return "";
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      let self = this;
      if (self.fetchLoading) {
        return;
      }
      let data = {
        base: self.$route.params.base,
        symbol: self.$route.params.symbol
      };
      self.fetchLoading = true;
      this.$store.dispatch("exchange-rates/details", data).then((response) => {
        self.formData = JSON.parse(
          JSON.stringify(response.data.data)
        );
        self.errors = {};
        self.fetchLoading = false;
      }).catch((error) => {
        var _a;
        self.errors = (_a = error.response.data) == null ? void 0 : _a.data;
        self.fetchLoading = false;
      });
    },
    update() {
      let self = this;
      if (self.updateLoading) {
        return;
      }
      self.updateLoading = true;
      this.$store.dispatch("exchange-rate/update", self.formData).then((response) => {
        self.formData = JSON.parse(JSON.stringify(response.data));
        self.errors = {};
        self.updateLoading = false;
      }).catch((error) => {
        var _a;
        self.errors = (_a = error.response.data) == null ? void 0 : _a.data;
        self.updateLoading = false;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CContainer = resolveComponent("CContainer");
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CButton = resolveComponent("CButton");
  _push(ssrRenderComponent(_component_CContainer, mergeProps({ md: "" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCard, { class: "p-4" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VProgressLinear, {
                active: $data.fetchLoading,
                indeterminate: "",
                color: "cyan"
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CCardBody, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<h4 data-v-3da8e8f9${_scopeId3}>${ssrInterpolate(_ctx.$t("details"))}</h4><hr data-v-3da8e8f9${_scopeId3}><form data-v-3da8e8f9${_scopeId3}>`);
                    _push4(ssrRenderComponent(VTextField, {
                      modelValue: $data.formData.base,
                      "onUpdate:modelValue": ($event) => $data.formData.base = $event,
                      label: _ctx.$t("Base"),
                      error: $data.errors.base ? true : false,
                      "error-messages": $data.errors.base,
                      required: "",
                      outlined: "",
                      dense: "",
                      disabled: ""
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VTextField, {
                      modelValue: $data.formData.symbol,
                      "onUpdate:modelValue": ($event) => $data.formData.symbol = $event,
                      label: _ctx.$t("Symbol"),
                      error: $data.errors.symbol ? true : false,
                      "error-messages": $data.errors.symbol,
                      required: "",
                      outlined: "",
                      dense: "",
                      disabled: ""
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(VTextField, {
                      modelValue: $data.formData.rate,
                      "onUpdate:modelValue": ($event) => $data.formData.rate = $event,
                      label: _ctx.$t("rate"),
                      error: $data.errors.rate ? true : false,
                      "error-messages": $data.errors.rate,
                      hint: $options.hint,
                      type: "number",
                      required: "",
                      outlined: "",
                      dense: "",
                      "persistent-hint": ""
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CButton, {
                      onClick: $options.update,
                      color: "primary",
                      class: "px-4"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          if ($data.updateLoading) {
                            _push5(ssrRenderComponent(VProgressCircular, {
                              indeterminate: "",
                              size: 15
                            }, null, _parent5, _scopeId4));
                          } else {
                            _push5(`<!---->`);
                          }
                          _push5(` ${ssrInterpolate(_ctx.$t("button.update"))}`);
                        } else {
                          return [
                            $data.updateLoading ? (openBlock(), createBlock(VProgressCircular, {
                              key: 0,
                              indeterminate: "",
                              size: 15
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(_ctx.$t("button.update")), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(`</form>`);
                  } else {
                    return [
                      createVNode("h4", null, toDisplayString(_ctx.$t("details")), 1),
                      createVNode("hr"),
                      createVNode("form", null, [
                        createVNode(VTextField, {
                          modelValue: $data.formData.base,
                          "onUpdate:modelValue": ($event) => $data.formData.base = $event,
                          label: _ctx.$t("Base"),
                          error: $data.errors.base ? true : false,
                          "error-messages": $data.errors.base,
                          required: "",
                          outlined: "",
                          dense: "",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                        createVNode(VTextField, {
                          modelValue: $data.formData.symbol,
                          "onUpdate:modelValue": ($event) => $data.formData.symbol = $event,
                          label: _ctx.$t("Symbol"),
                          error: $data.errors.symbol ? true : false,
                          "error-messages": $data.errors.symbol,
                          required: "",
                          outlined: "",
                          dense: "",
                          disabled: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                        createVNode(VTextField, {
                          modelValue: $data.formData.rate,
                          "onUpdate:modelValue": ($event) => $data.formData.rate = $event,
                          label: _ctx.$t("rate"),
                          error: $data.errors.rate ? true : false,
                          "error-messages": $data.errors.rate,
                          hint: $options.hint,
                          type: "number",
                          required: "",
                          outlined: "",
                          dense: "",
                          "persistent-hint": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages", "hint"]),
                        createVNode(_component_CButton, {
                          onClick: $options.update,
                          color: "primary",
                          class: "px-4"
                        }, {
                          default: withCtx(() => [
                            $data.updateLoading ? (openBlock(), createBlock(VProgressCircular, {
                              key: 0,
                              indeterminate: "",
                              size: 15
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(_ctx.$t("button.update")), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VProgressLinear, {
                  active: $data.fetchLoading,
                  indeterminate: "",
                  color: "cyan"
                }, null, 8, ["active"]),
                createVNode(_component_CCardBody, null, {
                  default: withCtx(() => [
                    createVNode("h4", null, toDisplayString(_ctx.$t("details")), 1),
                    createVNode("hr"),
                    createVNode("form", null, [
                      createVNode(VTextField, {
                        modelValue: $data.formData.base,
                        "onUpdate:modelValue": ($event) => $data.formData.base = $event,
                        label: _ctx.$t("Base"),
                        error: $data.errors.base ? true : false,
                        "error-messages": $data.errors.base,
                        required: "",
                        outlined: "",
                        dense: "",
                        disabled: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                      createVNode(VTextField, {
                        modelValue: $data.formData.symbol,
                        "onUpdate:modelValue": ($event) => $data.formData.symbol = $event,
                        label: _ctx.$t("Symbol"),
                        error: $data.errors.symbol ? true : false,
                        "error-messages": $data.errors.symbol,
                        required: "",
                        outlined: "",
                        dense: "",
                        disabled: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                      createVNode(VTextField, {
                        modelValue: $data.formData.rate,
                        "onUpdate:modelValue": ($event) => $data.formData.rate = $event,
                        label: _ctx.$t("rate"),
                        error: $data.errors.rate ? true : false,
                        "error-messages": $data.errors.rate,
                        hint: $options.hint,
                        type: "number",
                        required: "",
                        outlined: "",
                        dense: "",
                        "persistent-hint": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages", "hint"]),
                      createVNode(_component_CButton, {
                        onClick: $options.update,
                        color: "primary",
                        class: "px-4"
                      }, {
                        default: withCtx(() => [
                          $data.updateLoading ? (openBlock(), createBlock(VProgressCircular, {
                            key: 0,
                            indeterminate: "",
                            size: 15
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(_ctx.$t("button.update")), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])
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
          createVNode(_component_CCard, { class: "p-4" }, {
            default: withCtx(() => [
              createVNode(VProgressLinear, {
                active: $data.fetchLoading,
                indeterminate: "",
                color: "cyan"
              }, null, 8, ["active"]),
              createVNode(_component_CCardBody, null, {
                default: withCtx(() => [
                  createVNode("h4", null, toDisplayString(_ctx.$t("details")), 1),
                  createVNode("hr"),
                  createVNode("form", null, [
                    createVNode(VTextField, {
                      modelValue: $data.formData.base,
                      "onUpdate:modelValue": ($event) => $data.formData.base = $event,
                      label: _ctx.$t("Base"),
                      error: $data.errors.base ? true : false,
                      "error-messages": $data.errors.base,
                      required: "",
                      outlined: "",
                      dense: "",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                    createVNode(VTextField, {
                      modelValue: $data.formData.symbol,
                      "onUpdate:modelValue": ($event) => $data.formData.symbol = $event,
                      label: _ctx.$t("Symbol"),
                      error: $data.errors.symbol ? true : false,
                      "error-messages": $data.errors.symbol,
                      required: "",
                      outlined: "",
                      dense: "",
                      disabled: ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                    createVNode(VTextField, {
                      modelValue: $data.formData.rate,
                      "onUpdate:modelValue": ($event) => $data.formData.rate = $event,
                      label: _ctx.$t("rate"),
                      error: $data.errors.rate ? true : false,
                      "error-messages": $data.errors.rate,
                      hint: $options.hint,
                      type: "number",
                      required: "",
                      outlined: "",
                      dense: "",
                      "persistent-hint": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages", "hint"]),
                    createVNode(_component_CButton, {
                      onClick: $options.update,
                      color: "primary",
                      class: "px-4"
                    }, {
                      default: withCtx(() => [
                        $data.updateLoading ? (openBlock(), createBlock(VProgressCircular, {
                          key: 0,
                          indeterminate: "",
                          size: 15
                        })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(_ctx.$t("button.update")), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/exchange-rates/ExchangeRateDetails.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ExchangeRateDetails = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-3da8e8f9"]]);
export {
  ExchangeRateDetails as default
};
//# sourceMappingURL=ExchangeRateDetails-UFRyn0w3.mjs.map
