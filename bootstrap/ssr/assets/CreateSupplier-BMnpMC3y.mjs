import { _ as _export_sfc, c as codes, e as currencies } from "../app.mjs";
import { resolveComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { VProgressCircular } from "vuetify/lib/components/VProgressCircular/index.mjs";
import { VSelect } from "vuetify/lib/components/VSelect/index.mjs";
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
import "vuex";
import "uuid";
import "vuetify/lib/components/VProgressLinear/index.mjs";
import "vuetify/lib/components/VCard/index.mjs";
import "vuetify/lib/components/VDialog/index.mjs";
import "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import "vuetify";
import "vuetify/lib/components/VDataTable/index.mjs";
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
  name: "CreateSupplier",
  data() {
    return {
      number: "",
      name: "",
      contact: "",
      email: "",
      phoneCountryCode: null,
      phone: "",
      faxCountryCode: null,
      fax: "",
      address: "",
      costPriceCurrency: null,
      errors: {},
      loading: false,
      countryCodes: codes,
      currencies
    };
  },
  methods: {
    submit() {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      let data = {
        number: self.number,
        name: self.name,
        contact: self.contact,
        phone_country_code: self.phoneCountryCode ? self.phoneCountryCode.value : null,
        phone: self.phone,
        fax_country_code: self.faxCountryCode ? self.faxCountryCode.value : null,
        fax: self.fax,
        email: self.email,
        address: self.address,
        cost_price_currency: self.costPriceCurrency ? self.costPriceCurrency.value : null
      };
      this.$store.dispatch("goods/suppliers/create", data).then((response) => {
        self.loading = false;
        self.errors = {};
        self.$router.back();
      }).catch((error) => {
        var _a;
        self.errors = (_a = error.response.data) == null ? void 0 : _a.data;
        self.loading = false;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButton = resolveComponent("CButton");
  _push(ssrRenderComponent(_component_CCard, mergeProps({ class: "p-4" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCardBody, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<h4 data-v-cff76550${_scopeId2}>${ssrInterpolate(_ctx.$t("create"))}</h4><hr data-v-cff76550${_scopeId2}><form data-v-cff76550${_scopeId2}>`);
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.number,
                "onUpdate:modelValue": ($event) => $data.number = $event,
                label: _ctx.$t("number"),
                error: $data.errors.number ? true : false,
                "error-messages": $data.errors.number,
                required: "",
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.name,
                "onUpdate:modelValue": ($event) => $data.name = $event,
                label: _ctx.$t("name"),
                error: $data.errors.name ? true : false,
                "error-messages": $data.errors.name,
                required: "",
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.contact,
                "onUpdate:modelValue": ($event) => $data.contact = $event,
                label: _ctx.$t("contact"),
                error: $data.errors.contact ? true : false,
                "error-messages": $data.errors.contact,
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CRow, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: 2,
                      sm: 5
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VSelect, {
                            modelValue: $data.phoneCountryCode,
                            "onUpdate:modelValue": ($event) => $data.phoneCountryCode = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            error: $data.errors.phone_country_code ? true : false,
                            "error-messages": $data.errors.phone_country_code,
                            "item-title": "name",
                            "item-value": "value",
                            required: "",
                            outlined: "",
                            dense: "",
                            "return-object": ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VSelect, {
                              modelValue: $data.phoneCountryCode,
                              "onUpdate:modelValue": ($event) => $data.phoneCountryCode = $event,
                              items: $data.countryCodes,
                              label: _ctx.$t("countrycode"),
                              error: $data.errors.phone_country_code ? true : false,
                              "error-messages": $data.errors.phone_country_code,
                              "item-title": "name",
                              "item-value": "value",
                              required: "",
                              outlined: "",
                              dense: "",
                              "return-object": ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: 10,
                      sm: 7
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VTextField, {
                            modelValue: $data.phone,
                            "onUpdate:modelValue": ($event) => $data.phone = $event,
                            label: _ctx.$t("phone"),
                            error: $data.errors.phone ? true : false,
                            "error-messages": $data.errors.phone,
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.phone,
                              "onUpdate:modelValue": ($event) => $data.phone = $event,
                              label: _ctx.$t("phone"),
                              error: $data.errors.phone ? true : false,
                              "error-messages": $data.errors.phone,
                              required: "",
                              outlined: "",
                              dense: "",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, {
                        md: 2,
                        sm: 5
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, {
                            modelValue: $data.phoneCountryCode,
                            "onUpdate:modelValue": ($event) => $data.phoneCountryCode = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            error: $data.errors.phone_country_code ? true : false,
                            "error-messages": $data.errors.phone_country_code,
                            "item-title": "name",
                            "item-value": "value",
                            required: "",
                            outlined: "",
                            dense: "",
                            "return-object": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: 10,
                        sm: 7
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.phone,
                            "onUpdate:modelValue": ($event) => $data.phone = $event,
                            label: _ctx.$t("phone"),
                            error: $data.errors.phone ? true : false,
                            "error-messages": $data.errors.phone,
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CRow, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: 2,
                      sm: 5
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VSelect, {
                            modelValue: $data.faxCountryCode,
                            "onUpdate:modelValue": ($event) => $data.faxCountryCode = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            "item-title": "name",
                            "item-value": "value",
                            required: "",
                            outlined: "",
                            dense: "",
                            "return-object": ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VSelect, {
                              modelValue: $data.faxCountryCode,
                              "onUpdate:modelValue": ($event) => $data.faxCountryCode = $event,
                              items: $data.countryCodes,
                              label: _ctx.$t("countrycode"),
                              "item-title": "name",
                              "item-value": "value",
                              required: "",
                              outlined: "",
                              dense: "",
                              "return-object": ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: 10,
                      sm: 7
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VTextField, {
                            modelValue: $data.fax,
                            "onUpdate:modelValue": ($event) => $data.fax = $event,
                            label: _ctx.$t("fax"),
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.fax,
                              "onUpdate:modelValue": ($event) => $data.fax = $event,
                              label: _ctx.$t("fax"),
                              required: "",
                              outlined: "",
                              dense: "",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, {
                        md: 2,
                        sm: 5
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, {
                            modelValue: $data.faxCountryCode,
                            "onUpdate:modelValue": ($event) => $data.faxCountryCode = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            "item-title": "name",
                            "item-value": "value",
                            required: "",
                            outlined: "",
                            dense: "",
                            "return-object": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: 10,
                        sm: 7
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.fax,
                            "onUpdate:modelValue": ($event) => $data.fax = $event,
                            label: _ctx.$t("fax"),
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.email,
                "onUpdate:modelValue": ($event) => $data.email = $event,
                label: _ctx.$t("email"),
                error: $data.errors.email ? true : false,
                "error-messages": $data.errors.email,
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.address,
                "onUpdate:modelValue": ($event) => $data.address = $event,
                label: _ctx.$t("address"),
                error: $data.errors.address ? true : false,
                "error-messages": $data.errors.address,
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VSelect, {
                modelValue: $data.costPriceCurrency,
                "onUpdate:modelValue": ($event) => $data.costPriceCurrency = $event,
                items: $data.currencies,
                label: _ctx.$t("price.cost") + " " + _ctx.$t("currency"),
                "item-title": "name",
                "item-value": "value",
                required: "",
                outlined: "",
                dense: "",
                "return-object": "",
                error: $data.errors["cost_price_currency"] ? true : false,
                "error-messages": $data.errors["cost_price_currency"]
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.submit,
                color: "primary",
                class: "px-4"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if ($data.loading) {
                      _push4(ssrRenderComponent(VProgressCircular, {
                        indeterminate: "",
                        size: 15
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(` ${ssrInterpolate(_ctx.$t("button.submit"))}`);
                  } else {
                    return [
                      $data.loading ? (openBlock(), createBlock(VProgressCircular, {
                        key: 0,
                        indeterminate: "",
                        size: 15
                      })) : createCommentVNode("", true),
                      createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</form>`);
            } else {
              return [
                createVNode("h4", null, toDisplayString(_ctx.$t("create")), 1),
                createVNode("hr"),
                createVNode("form", null, [
                  createVNode(VTextField, {
                    modelValue: $data.number,
                    "onUpdate:modelValue": ($event) => $data.number = $event,
                    label: _ctx.$t("number"),
                    error: $data.errors.number ? true : false,
                    "error-messages": $data.errors.number,
                    required: "",
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(VTextField, {
                    modelValue: $data.name,
                    "onUpdate:modelValue": ($event) => $data.name = $event,
                    label: _ctx.$t("name"),
                    error: $data.errors.name ? true : false,
                    "error-messages": $data.errors.name,
                    required: "",
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(VTextField, {
                    modelValue: $data.contact,
                    "onUpdate:modelValue": ($event) => $data.contact = $event,
                    label: _ctx.$t("contact"),
                    error: $data.errors.contact ? true : false,
                    "error-messages": $data.errors.contact,
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(_component_CRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        md: 2,
                        sm: 5
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, {
                            modelValue: $data.phoneCountryCode,
                            "onUpdate:modelValue": ($event) => $data.phoneCountryCode = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            error: $data.errors.phone_country_code ? true : false,
                            "error-messages": $data.errors.phone_country_code,
                            "item-title": "name",
                            "item-value": "value",
                            required: "",
                            outlined: "",
                            dense: "",
                            "return-object": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: 10,
                        sm: 7
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.phone,
                            "onUpdate:modelValue": ($event) => $data.phone = $event,
                            label: _ctx.$t("phone"),
                            error: $data.errors.phone ? true : false,
                            "error-messages": $data.errors.phone,
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        md: 2,
                        sm: 5
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, {
                            modelValue: $data.faxCountryCode,
                            "onUpdate:modelValue": ($event) => $data.faxCountryCode = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            "item-title": "name",
                            "item-value": "value",
                            required: "",
                            outlined: "",
                            dense: "",
                            "return-object": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: 10,
                        sm: 7
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.fax,
                            "onUpdate:modelValue": ($event) => $data.fax = $event,
                            label: _ctx.$t("fax"),
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VTextField, {
                    modelValue: $data.email,
                    "onUpdate:modelValue": ($event) => $data.email = $event,
                    label: _ctx.$t("email"),
                    error: $data.errors.email ? true : false,
                    "error-messages": $data.errors.email,
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(VTextField, {
                    modelValue: $data.address,
                    "onUpdate:modelValue": ($event) => $data.address = $event,
                    label: _ctx.$t("address"),
                    error: $data.errors.address ? true : false,
                    "error-messages": $data.errors.address,
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(VSelect, {
                    modelValue: $data.costPriceCurrency,
                    "onUpdate:modelValue": ($event) => $data.costPriceCurrency = $event,
                    items: $data.currencies,
                    label: _ctx.$t("price.cost") + " " + _ctx.$t("currency"),
                    "item-title": "name",
                    "item-value": "value",
                    required: "",
                    outlined: "",
                    dense: "",
                    "return-object": "",
                    error: $data.errors["cost_price_currency"] ? true : false,
                    "error-messages": $data.errors["cost_price_currency"]
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                  createVNode(_component_CButton, {
                    onClick: $options.submit,
                    color: "primary",
                    class: "px-4"
                  }, {
                    default: withCtx(() => [
                      $data.loading ? (openBlock(), createBlock(VProgressCircular, {
                        key: 0,
                        indeterminate: "",
                        size: 15
                      })) : createCommentVNode("", true),
                      createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CCardBody, null, {
            default: withCtx(() => [
              createVNode("h4", null, toDisplayString(_ctx.$t("create")), 1),
              createVNode("hr"),
              createVNode("form", null, [
                createVNode(VTextField, {
                  modelValue: $data.number,
                  "onUpdate:modelValue": ($event) => $data.number = $event,
                  label: _ctx.$t("number"),
                  error: $data.errors.number ? true : false,
                  "error-messages": $data.errors.number,
                  required: "",
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(VTextField, {
                  modelValue: $data.name,
                  "onUpdate:modelValue": ($event) => $data.name = $event,
                  label: _ctx.$t("name"),
                  error: $data.errors.name ? true : false,
                  "error-messages": $data.errors.name,
                  required: "",
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(VTextField, {
                  modelValue: $data.contact,
                  "onUpdate:modelValue": ($event) => $data.contact = $event,
                  label: _ctx.$t("contact"),
                  error: $data.errors.contact ? true : false,
                  "error-messages": $data.errors.contact,
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: 2,
                      sm: 5
                    }, {
                      default: withCtx(() => [
                        createVNode(VSelect, {
                          modelValue: $data.phoneCountryCode,
                          "onUpdate:modelValue": ($event) => $data.phoneCountryCode = $event,
                          items: $data.countryCodes,
                          label: _ctx.$t("countrycode"),
                          error: $data.errors.phone_country_code ? true : false,
                          "error-messages": $data.errors.phone_country_code,
                          "item-title": "name",
                          "item-value": "value",
                          required: "",
                          outlined: "",
                          dense: "",
                          "return-object": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: 10,
                      sm: 7
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.phone,
                          "onUpdate:modelValue": ($event) => $data.phone = $event,
                          label: _ctx.$t("phone"),
                          error: $data.errors.phone ? true : false,
                          "error-messages": $data.errors.phone,
                          required: "",
                          outlined: "",
                          dense: "",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: 2,
                      sm: 5
                    }, {
                      default: withCtx(() => [
                        createVNode(VSelect, {
                          modelValue: $data.faxCountryCode,
                          "onUpdate:modelValue": ($event) => $data.faxCountryCode = $event,
                          items: $data.countryCodes,
                          label: _ctx.$t("countrycode"),
                          "item-title": "name",
                          "item-value": "value",
                          required: "",
                          outlined: "",
                          dense: "",
                          "return-object": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: 10,
                      sm: 7
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.fax,
                          "onUpdate:modelValue": ($event) => $data.fax = $event,
                          label: _ctx.$t("fax"),
                          required: "",
                          outlined: "",
                          dense: "",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VTextField, {
                  modelValue: $data.email,
                  "onUpdate:modelValue": ($event) => $data.email = $event,
                  label: _ctx.$t("email"),
                  error: $data.errors.email ? true : false,
                  "error-messages": $data.errors.email,
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(VTextField, {
                  modelValue: $data.address,
                  "onUpdate:modelValue": ($event) => $data.address = $event,
                  label: _ctx.$t("address"),
                  error: $data.errors.address ? true : false,
                  "error-messages": $data.errors.address,
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(VSelect, {
                  modelValue: $data.costPriceCurrency,
                  "onUpdate:modelValue": ($event) => $data.costPriceCurrency = $event,
                  items: $data.currencies,
                  label: _ctx.$t("price.cost") + " " + _ctx.$t("currency"),
                  "item-title": "name",
                  "item-value": "value",
                  required: "",
                  outlined: "",
                  dense: "",
                  "return-object": "",
                  error: $data.errors["cost_price_currency"] ? true : false,
                  "error-messages": $data.errors["cost_price_currency"]
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                createVNode(_component_CButton, {
                  onClick: $options.submit,
                  color: "primary",
                  class: "px-4"
                }, {
                  default: withCtx(() => [
                    $data.loading ? (openBlock(), createBlock(VProgressCircular, {
                      key: 0,
                      indeterminate: "",
                      size: 15
                    })) : createCommentVNode("", true),
                    createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
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
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/suppliers/CreateSupplier.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CreateSupplier = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-cff76550"]]);
export {
  CreateSupplier as default
};
