import { G as GoodsTable } from "./GoodsTable-D2KyInIT.mjs";
import { _ as _export_sfc, c as codes, b as currencies } from "../app.mjs";
import { resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { VProgressCircular } from "vuetify/lib/components/VProgressCircular/index.mjs";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
import { VSelect } from "vuetify/lib/components/VSelect/index.mjs";
import { VTextField } from "vuetify/lib/components/VTextField/index.mjs";
import "vuetify/lib/components/VChip/index.mjs";
import "vuetify/lib/components/VDataTable/index.mjs";
import "vuetify/lib/components/VSkeletonLoader/index.mjs";
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
import "vuetify/lib/components/VCard/index.mjs";
import "vuetify/lib/components/VDialog/index.mjs";
import "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import "vuetify";
import "vue-barcode-reader";
import "vuetify/lib/components/VAutocomplete/index.mjs";
import "vuetify/lib/components/VBtn/index.mjs";
import "vuetify/lib/components/VSnackbar/index.mjs";
import "vuetify/lib/components/VIcon/index.mjs";
import "vuetify/lib/components/VColorPicker/index.mjs";
import "vuetify/lib/components/VMenu/index.mjs";
import "vuetify/components";
import "vuetify/directives";
import "vuetify/labs/components";
import "vue-router";
import "simplebar-vue";
import "secure-ls";
import "vuex-persistedstate";
import "axios";
import "query-string";
const _sfc_main$1 = {
  name: "SupplierForm",
  props: {
    id: null
  },
  data() {
    return {
      formData: {},
      errors: {},
      countryCodes: codes,
      currencies,
      fetchLoading: false,
      updateLoading: false
    };
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
        id: self.$props.id
      };
      self.fetchLoading = true;
      this.$store.dispatch("goods/suppliers/details", data).then((response) => {
        self.formData = JSON.parse(JSON.stringify(response.data));
        self.fetchLoading = false;
      }).catch((error) => {
        self.fetchLoading = false;
      });
    },
    update() {
      let self = this;
      if (self.updateLoading) {
        return;
      }
      self.updateLoading = true;
      this.$store.dispatch("goods/suppliers/update", self.formData).then((response) => {
        self.errors = {};
        self.formData = JSON.parse(JSON.stringify(response.data));
        self.updateLoading = false;
      }).catch((error) => {
        var _a;
        self.errors = (_a = error.response.data) == null ? void 0 : _a.data;
        self.updateLoading = false;
      });
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButton = resolveComponent("CButton");
  _push(ssrRenderComponent(_component_CCard, mergeProps({ class: "border-0" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VProgressLinear, {
          active: $data.fetchLoading,
          indeterminate: "",
          color: "cyan"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CCardBody, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<form data-v-e9f09a7f${_scopeId2}>`);
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.formData.number,
                "onUpdate:modelValue": ($event) => $data.formData.number = $event,
                label: _ctx.$t("number"),
                error: $data.errors.number ? true : false,
                "error-messages": $data.errors.number,
                required: "",
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.formData.name,
                "onUpdate:modelValue": ($event) => $data.formData.name = $event,
                label: _ctx.$t("name"),
                error: $data.errors.name ? true : false,
                "error-messages": $data.errors.name,
                required: "",
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.formData.contact,
                "onUpdate:modelValue": ($event) => $data.formData.contact = $event,
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
                      md: "2",
                      sm: "2"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VSelect, {
                            modelValue: $data.formData.phone_country_code,
                            "onUpdate:modelValue": ($event) => $data.formData.phone_country_code = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            error: $data.errors.phone_country_code ? true : false,
                            "error-messages": $data.errors.phone_country_code,
                            "item-title": "name",
                            "item-value": "value",
                            required: "",
                            outlined: "",
                            dense: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VSelect, {
                              modelValue: $data.formData.phone_country_code,
                              "onUpdate:modelValue": ($event) => $data.formData.phone_country_code = $event,
                              items: $data.countryCodes,
                              label: _ctx.$t("countrycode"),
                              error: $data.errors.phone_country_code ? true : false,
                              "error-messages": $data.errors.phone_country_code,
                              "item-title": "name",
                              "item-value": "value",
                              required: "",
                              outlined: "",
                              dense: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "10",
                      sm: "10"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VTextField, {
                            modelValue: $data.formData.phone,
                            "onUpdate:modelValue": ($event) => $data.formData.phone = $event,
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
                              modelValue: $data.formData.phone,
                              "onUpdate:modelValue": ($event) => $data.formData.phone = $event,
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
                        md: "2",
                        sm: "2"
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, {
                            modelValue: $data.formData.phone_country_code,
                            "onUpdate:modelValue": ($event) => $data.formData.phone_country_code = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            error: $data.errors.phone_country_code ? true : false,
                            "error-messages": $data.errors.phone_country_code,
                            "item-title": "name",
                            "item-value": "value",
                            required: "",
                            outlined: "",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "10",
                        sm: "10"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.formData.phone,
                            "onUpdate:modelValue": ($event) => $data.formData.phone = $event,
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
                      md: "2",
                      sm: "2"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VSelect, {
                            modelValue: $data.formData.fax_country_code,
                            "onUpdate:modelValue": ($event) => $data.formData.fax_country_code = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            "item-title": "name",
                            "item-value": "value",
                            required: "",
                            outlined: "",
                            dense: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VSelect, {
                              modelValue: $data.formData.fax_country_code,
                              "onUpdate:modelValue": ($event) => $data.formData.fax_country_code = $event,
                              items: $data.countryCodes,
                              label: _ctx.$t("countrycode"),
                              "item-title": "name",
                              "item-value": "value",
                              required: "",
                              outlined: "",
                              dense: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "10",
                      sm: "10"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VTextField, {
                            modelValue: $data.formData.fax,
                            "onUpdate:modelValue": ($event) => $data.formData.fax = $event,
                            label: _ctx.$t("fax"),
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.formData.fax,
                              "onUpdate:modelValue": ($event) => $data.formData.fax = $event,
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
                        md: "2",
                        sm: "2"
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, {
                            modelValue: $data.formData.fax_country_code,
                            "onUpdate:modelValue": ($event) => $data.formData.fax_country_code = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            "item-title": "name",
                            "item-value": "value",
                            required: "",
                            outlined: "",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "10",
                        sm: "10"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.formData.fax,
                            "onUpdate:modelValue": ($event) => $data.formData.fax = $event,
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
                modelValue: $data.formData.email,
                "onUpdate:modelValue": ($event) => $data.formData.email = $event,
                error: $data.errors.email ? true : false,
                "error-messages": $data.errors.email,
                label: _ctx.$t("email"),
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.formData.address,
                "onUpdate:modelValue": ($event) => $data.formData.address = $event,
                label: _ctx.$t("address"),
                error: $data.errors.address ? true : false,
                "error-messages": $data.errors.address,
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VSelect, {
                modelValue: $data.formData.cost_price_currency,
                "onUpdate:modelValue": ($event) => $data.formData.cost_price_currency = $event,
                items: $data.currencies,
                label: _ctx.$t("price.cost") + " " + _ctx.$t("currency"),
                "item-title": "name",
                "item-value": "value",
                required: "",
                outlined: "",
                dense: "",
                error: $data.errors.cost_price_currency ? true : false,
                "error-messages": $data.errors.cost_price_currency
              }, null, _parent3, _scopeId2));
              _push3(`<hr data-v-e9f09a7f${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.update,
                color: "primary",
                class: "px-4"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.$t("button.submit"))} `);
                    if ($data.updateLoading) {
                      _push4(ssrRenderComponent(VProgressCircular, {
                        indeterminate: "",
                        color: "primary",
                        size: 15
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<!---->`);
                    }
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("button.submit")) + " ", 1),
                      $data.updateLoading ? (openBlock(), createBlock(VProgressCircular, {
                        key: 0,
                        indeterminate: "",
                        color: "primary",
                        size: 15
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`</form>`);
            } else {
              return [
                createVNode("form", {
                  onSubmit: withModifiers(() => {
                  }, ["prevent"])
                }, [
                  createVNode(VTextField, {
                    modelValue: $data.formData.number,
                    "onUpdate:modelValue": ($event) => $data.formData.number = $event,
                    label: _ctx.$t("number"),
                    error: $data.errors.number ? true : false,
                    "error-messages": $data.errors.number,
                    required: "",
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(VTextField, {
                    modelValue: $data.formData.name,
                    "onUpdate:modelValue": ($event) => $data.formData.name = $event,
                    label: _ctx.$t("name"),
                    error: $data.errors.name ? true : false,
                    "error-messages": $data.errors.name,
                    required: "",
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(VTextField, {
                    modelValue: $data.formData.contact,
                    "onUpdate:modelValue": ($event) => $data.formData.contact = $event,
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
                        md: "2",
                        sm: "2"
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, {
                            modelValue: $data.formData.phone_country_code,
                            "onUpdate:modelValue": ($event) => $data.formData.phone_country_code = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            error: $data.errors.phone_country_code ? true : false,
                            "error-messages": $data.errors.phone_country_code,
                            "item-title": "name",
                            "item-value": "value",
                            required: "",
                            outlined: "",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "10",
                        sm: "10"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.formData.phone,
                            "onUpdate:modelValue": ($event) => $data.formData.phone = $event,
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
                        md: "2",
                        sm: "2"
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, {
                            modelValue: $data.formData.fax_country_code,
                            "onUpdate:modelValue": ($event) => $data.formData.fax_country_code = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            "item-title": "name",
                            "item-value": "value",
                            required: "",
                            outlined: "",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "10",
                        sm: "10"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.formData.fax,
                            "onUpdate:modelValue": ($event) => $data.formData.fax = $event,
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
                    modelValue: $data.formData.email,
                    "onUpdate:modelValue": ($event) => $data.formData.email = $event,
                    error: $data.errors.email ? true : false,
                    "error-messages": $data.errors.email,
                    label: _ctx.$t("email"),
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error", "error-messages", "label"]),
                  createVNode(VTextField, {
                    modelValue: $data.formData.address,
                    "onUpdate:modelValue": ($event) => $data.formData.address = $event,
                    label: _ctx.$t("address"),
                    error: $data.errors.address ? true : false,
                    "error-messages": $data.errors.address,
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(VSelect, {
                    modelValue: $data.formData.cost_price_currency,
                    "onUpdate:modelValue": ($event) => $data.formData.cost_price_currency = $event,
                    items: $data.currencies,
                    label: _ctx.$t("price.cost") + " " + _ctx.$t("currency"),
                    "item-title": "name",
                    "item-value": "value",
                    required: "",
                    outlined: "",
                    dense: "",
                    error: $data.errors.cost_price_currency ? true : false,
                    "error-messages": $data.errors.cost_price_currency
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                  createVNode("hr"),
                  createVNode(_component_CButton, {
                    onClick: $options.update,
                    color: "primary",
                    class: "px-4"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("button.submit")) + " ", 1),
                      $data.updateLoading ? (openBlock(), createBlock(VProgressCircular, {
                        key: 0,
                        indeterminate: "",
                        color: "primary",
                        size: 15
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ], 40, ["onSubmit"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VProgressLinear, {
            active: $data.fetchLoading,
            indeterminate: "",
            color: "cyan"
          }, null, 8, ["active"]),
          createVNode(_component_CCardBody, null, {
            default: withCtx(() => [
              createVNode("form", {
                onSubmit: withModifiers(() => {
                }, ["prevent"])
              }, [
                createVNode(VTextField, {
                  modelValue: $data.formData.number,
                  "onUpdate:modelValue": ($event) => $data.formData.number = $event,
                  label: _ctx.$t("number"),
                  error: $data.errors.number ? true : false,
                  "error-messages": $data.errors.number,
                  required: "",
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(VTextField, {
                  modelValue: $data.formData.name,
                  "onUpdate:modelValue": ($event) => $data.formData.name = $event,
                  label: _ctx.$t("name"),
                  error: $data.errors.name ? true : false,
                  "error-messages": $data.errors.name,
                  required: "",
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(VTextField, {
                  modelValue: $data.formData.contact,
                  "onUpdate:modelValue": ($event) => $data.formData.contact = $event,
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
                      md: "2",
                      sm: "2"
                    }, {
                      default: withCtx(() => [
                        createVNode(VSelect, {
                          modelValue: $data.formData.phone_country_code,
                          "onUpdate:modelValue": ($event) => $data.formData.phone_country_code = $event,
                          items: $data.countryCodes,
                          label: _ctx.$t("countrycode"),
                          error: $data.errors.phone_country_code ? true : false,
                          "error-messages": $data.errors.phone_country_code,
                          "item-title": "name",
                          "item-value": "value",
                          required: "",
                          outlined: "",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: "10",
                      sm: "10"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.formData.phone,
                          "onUpdate:modelValue": ($event) => $data.formData.phone = $event,
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
                      md: "2",
                      sm: "2"
                    }, {
                      default: withCtx(() => [
                        createVNode(VSelect, {
                          modelValue: $data.formData.fax_country_code,
                          "onUpdate:modelValue": ($event) => $data.formData.fax_country_code = $event,
                          items: $data.countryCodes,
                          label: _ctx.$t("countrycode"),
                          "item-title": "name",
                          "item-value": "value",
                          required: "",
                          outlined: "",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: "10",
                      sm: "10"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.formData.fax,
                          "onUpdate:modelValue": ($event) => $data.formData.fax = $event,
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
                  modelValue: $data.formData.email,
                  "onUpdate:modelValue": ($event) => $data.formData.email = $event,
                  error: $data.errors.email ? true : false,
                  "error-messages": $data.errors.email,
                  label: _ctx.$t("email"),
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error", "error-messages", "label"]),
                createVNode(VTextField, {
                  modelValue: $data.formData.address,
                  "onUpdate:modelValue": ($event) => $data.formData.address = $event,
                  label: _ctx.$t("address"),
                  error: $data.errors.address ? true : false,
                  "error-messages": $data.errors.address,
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(VSelect, {
                  modelValue: $data.formData.cost_price_currency,
                  "onUpdate:modelValue": ($event) => $data.formData.cost_price_currency = $event,
                  items: $data.currencies,
                  label: _ctx.$t("price.cost") + " " + _ctx.$t("currency"),
                  "item-title": "name",
                  "item-value": "value",
                  required: "",
                  outlined: "",
                  dense: "",
                  error: $data.errors.cost_price_currency ? true : false,
                  "error-messages": $data.errors.cost_price_currency
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                createVNode("hr"),
                createVNode(_component_CButton, {
                  onClick: $options.update,
                  color: "primary",
                  class: "px-4"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("button.submit")) + " ", 1),
                    $data.updateLoading ? (openBlock(), createBlock(VProgressCircular, {
                      key: 0,
                      indeterminate: "",
                      color: "primary",
                      size: 15
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ], 40, ["onSubmit"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/suppliers/components/SupplierForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SupplierForm = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-e9f09a7f"]]);
const _sfc_main = {
  name: "SupplierDetails",
  components: {
    SupplierForm,
    GoodsTable
  },
  data() {
    return {
      tab: {
        values: [this.$t("info"), this.$t("goods")],
        index: 0
      }
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CTabs = resolveComponent("CTabs");
  const _component_CTabList = resolveComponent("CTabList");
  const _component_CTab = resolveComponent("CTab");
  const _component_CTabContent = resolveComponent("CTabContent");
  const _component_CTabPanel = resolveComponent("CTabPanel");
  const _component_SupplierForm = resolveComponent("SupplierForm");
  const _component_GoodsTable = resolveComponent("GoodsTable");
  _push(ssrRenderComponent(_component_CRow, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCol, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CCard, { class: "p-2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCardBody, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CTabs, { activeItemKey: 0 }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CTabList, { variant: "pills" }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_CTab, { itemKey: 0 }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`${ssrInterpolate($data.tab.values[0].toUpperCase())}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString($data.tab.values[0].toUpperCase()), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_CTab, { itemKey: 1 }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`${ssrInterpolate($data.tab.values[1].toUpperCase())}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString($data.tab.values[1].toUpperCase()), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_CTab, { itemKey: 0 }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString($data.tab.values[0].toUpperCase()), 1)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_CTab, { itemKey: 1 }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString($data.tab.values[1].toUpperCase()), 1)
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_CTabContent, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_CTabPanel, {
                                        class: "p-3",
                                        itemKey: 0
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_SupplierForm, {
                                              id: this.$route.params.id
                                            }, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_SupplierForm, {
                                                id: this.$route.params.id
                                              }, null, 8, ["id"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_CTabPanel, {
                                        class: "p-3",
                                        itemKey: 1
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_GoodsTable, {
                                              supplierId: this.$route.params.id
                                            }, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_GoodsTable, {
                                                supplierId: this.$route.params.id
                                              }, null, 8, ["supplierId"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_CTabPanel, {
                                          class: "p-3",
                                          itemKey: 0
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_SupplierForm, {
                                              id: this.$route.params.id
                                            }, null, 8, ["id"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_CTabPanel, {
                                          class: "p-3",
                                          itemKey: 1
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_GoodsTable, {
                                              supplierId: this.$route.params.id
                                            }, null, 8, ["supplierId"])
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_CTabList, { variant: "pills" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_CTab, { itemKey: 0 }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString($data.tab.values[0].toUpperCase()), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CTab, { itemKey: 1 }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString($data.tab.values[1].toUpperCase()), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CTabContent, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_CTabPanel, {
                                        class: "p-3",
                                        itemKey: 0
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_SupplierForm, {
                                            id: this.$route.params.id
                                          }, null, 8, ["id"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CTabPanel, {
                                        class: "p-3",
                                        itemKey: 1
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_GoodsTable, {
                                            supplierId: this.$route.params.id
                                          }, null, 8, ["supplierId"])
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
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CTabs, { activeItemKey: 0 }, {
                              default: withCtx(() => [
                                createVNode(_component_CTabList, { variant: "pills" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CTab, { itemKey: 0 }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString($data.tab.values[0].toUpperCase()), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CTab, { itemKey: 1 }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString($data.tab.values[1].toUpperCase()), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CTabContent, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_CTabPanel, {
                                      class: "p-3",
                                      itemKey: 0
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_SupplierForm, {
                                          id: this.$route.params.id
                                        }, null, 8, ["id"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CTabPanel, {
                                      class: "p-3",
                                      itemKey: 1
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_GoodsTable, {
                                          supplierId: this.$route.params.id
                                        }, null, 8, ["supplierId"])
                                      ]),
                                      _: 1
                                    })
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
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCardBody, null, {
                        default: withCtx(() => [
                          createVNode(_component_CTabs, { activeItemKey: 0 }, {
                            default: withCtx(() => [
                              createVNode(_component_CTabList, { variant: "pills" }, {
                                default: withCtx(() => [
                                  createVNode(_component_CTab, { itemKey: 0 }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString($data.tab.values[0].toUpperCase()), 1)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CTab, { itemKey: 1 }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString($data.tab.values[1].toUpperCase()), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CTabContent, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CTabPanel, {
                                    class: "p-3",
                                    itemKey: 0
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_SupplierForm, {
                                        id: this.$route.params.id
                                      }, null, 8, ["id"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CTabPanel, {
                                    class: "p-3",
                                    itemKey: 1
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_GoodsTable, {
                                        supplierId: this.$route.params.id
                                      }, null, 8, ["supplierId"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
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
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CCard, { class: "p-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCardBody, null, {
                      default: withCtx(() => [
                        createVNode(_component_CTabs, { activeItemKey: 0 }, {
                          default: withCtx(() => [
                            createVNode(_component_CTabList, { variant: "pills" }, {
                              default: withCtx(() => [
                                createVNode(_component_CTab, { itemKey: 0 }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString($data.tab.values[0].toUpperCase()), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CTab, { itemKey: 1 }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString($data.tab.values[1].toUpperCase()), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_CTabContent, null, {
                              default: withCtx(() => [
                                createVNode(_component_CTabPanel, {
                                  class: "p-3",
                                  itemKey: 0
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_SupplierForm, {
                                      id: this.$route.params.id
                                    }, null, 8, ["id"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CTabPanel, {
                                  class: "p-3",
                                  itemKey: 1
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_GoodsTable, {
                                      supplierId: this.$route.params.id
                                    }, null, 8, ["supplierId"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
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
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CCol, null, {
            default: withCtx(() => [
              createVNode(_component_CCard, { class: "p-2" }, {
                default: withCtx(() => [
                  createVNode(_component_CCardBody, null, {
                    default: withCtx(() => [
                      createVNode(_component_CTabs, { activeItemKey: 0 }, {
                        default: withCtx(() => [
                          createVNode(_component_CTabList, { variant: "pills" }, {
                            default: withCtx(() => [
                              createVNode(_component_CTab, { itemKey: 0 }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString($data.tab.values[0].toUpperCase()), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CTab, { itemKey: 1 }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString($data.tab.values[1].toUpperCase()), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_CTabContent, null, {
                            default: withCtx(() => [
                              createVNode(_component_CTabPanel, {
                                class: "p-3",
                                itemKey: 0
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_SupplierForm, {
                                    id: this.$route.params.id
                                  }, null, 8, ["id"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CTabPanel, {
                                class: "p-3",
                                itemKey: 1
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_GoodsTable, {
                                    supplierId: this.$route.params.id
                                  }, null, 8, ["supplierId"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/suppliers/SupplierDetails.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SupplierDetails = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  SupplierDetails as default
};
