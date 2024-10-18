import { _ as _export_sfc, c as codes, e as currencies, a as Dialog, S as Snackbar } from "../app.mjs";
import { S as ShippingTable } from "./ShippingTable-B6BZ_SDd.mjs";
import { resolveComponent, mergeProps, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, withModifiers, useSSRContext, Fragment, renderList, createSlots } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderList, ssrRenderAttr } from "vue/server-renderer";
import { VProgressCircular } from "vuetify/lib/components/VProgressCircular/index.mjs";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
import { VSelect } from "vuetify/lib/components/VSelect/index.mjs";
import { VTextField } from "vuetify/lib/components/VTextField/index.mjs";
import { VDataTable } from "vuetify/lib/components/VDataTable/index.mjs";
import { VSkeletonLoader } from "vuetify/lib/components/VSkeletonLoader/index.mjs";
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
import "vuetify/lib/components/VTooltip/index.mjs";
import "vuex";
import "vuetify/lib/components/VCard/index.mjs";
import "vuetify/lib/components/VDialog/index.mjs";
import "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import "vuetify";
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
const _sfc_main$2 = {
  name: "ClientForm",
  components: {},
  props: {
    id: null
  },
  data() {
    return {
      formData: {},
      errors: {},
      fetchLoading: false,
      updateLoading: false,
      countryCodes: codes,
      currencies
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
      this.$store.dispatch("clients/details", data).then((response) => {
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
      this.$store.dispatch("clients/update", self.formData).then((response) => {
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
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
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
              _push3(`<form data-v-38124139${_scopeId2}>`);
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
              _push3(ssrRenderComponent(_component_CRow, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "6",
                      sm: "6"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VTextField, {
                            modelValue: $data.formData.name,
                            "onUpdate:modelValue": ($event) => $data.formData.name = $event,
                            label: _ctx.$t("name"),
                            error: $data.errors.name ? true : false,
                            "error-messages": $data.errors.name,
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: "",
                            maxlength: "45"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.formData.name,
                              "onUpdate:modelValue": ($event) => $data.formData.name = $event,
                              label: _ctx.$t("name"),
                              error: $data.errors.name ? true : false,
                              "error-messages": $data.errors.name,
                              required: "",
                              outlined: "",
                              dense: "",
                              clearable: "",
                              maxlength: "45"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "6",
                      sm: "6"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VTextField, {
                            modelValue: $data.formData.contact,
                            "onUpdate:modelValue": ($event) => $data.formData.contact = $event,
                            label: _ctx.$t("contact"),
                            error: $data.errors.contact ? true : false,
                            "error-messages": $data.errors.contact,
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: "",
                            maxlength: "45"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.formData.contact,
                              "onUpdate:modelValue": ($event) => $data.formData.contact = $event,
                              label: _ctx.$t("contact"),
                              error: $data.errors.contact ? true : false,
                              "error-messages": $data.errors.contact,
                              required: "",
                              outlined: "",
                              dense: "",
                              clearable: "",
                              maxlength: "45"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, {
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.formData.name,
                            "onUpdate:modelValue": ($event) => $data.formData.name = $event,
                            label: _ctx.$t("name"),
                            error: $data.errors.name ? true : false,
                            "error-messages": $data.errors.name,
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: "",
                            maxlength: "45"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.formData.contact,
                            "onUpdate:modelValue": ($event) => $data.formData.contact = $event,
                            label: _ctx.$t("contact"),
                            error: $data.errors.contact ? true : false,
                            "error-messages": $data.errors.contact,
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: "",
                            maxlength: "45"
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
                            modelValue: $data.formData.phone_country_code,
                            "onUpdate:modelValue": ($event) => $data.formData.phone_country_code = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            error: $data.errors.phone_country_code ? true : false,
                            "error-messages": $data.errors.phone_country_code,
                            "item-title": "value",
                            "item-value": "value",
                            required: "",
                            outlined: "",
                            dense: "",
                            "return-object": ""
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
                              "item-title": "value",
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
                            "item-title": "value",
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
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.formData.email,
                "onUpdate:modelValue": ($event) => $data.formData.email = $event,
                label: _ctx.$t("email"),
                error: $data.errors.email ? true : false,
                "error-messages": $data.errors.email,
                required: "",
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
                required: "",
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VSelect, {
                modelValue: $data.formData.currency,
                "onUpdate:modelValue": ($event) => $data.formData.currency = $event,
                items: $data.currencies,
                label: _ctx.$t("currency"),
                "item-title": "name",
                "item-value": "value",
                required: "",
                outlined: "",
                dense: "",
                "return-object": "",
                error: $data.errors.currency ? true : false,
                "error-messages": $data.errors.currency
              }, null, _parent3, _scopeId2));
              _push3(`<hr data-v-38124139${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.update,
                color: "primary",
                class: "px-4"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if ($data.updateLoading) {
                      _push4(ssrRenderComponent(VProgressCircular, {
                        indeterminate: "",
                        size: 15
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<!---->`);
                    }
                    _push4(` ${ssrInterpolate(_ctx.$t("button.update"))}`);
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
                  createVNode(_component_CRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.formData.name,
                            "onUpdate:modelValue": ($event) => $data.formData.name = $event,
                            label: _ctx.$t("name"),
                            error: $data.errors.name ? true : false,
                            "error-messages": $data.errors.name,
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: "",
                            maxlength: "45"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.formData.contact,
                            "onUpdate:modelValue": ($event) => $data.formData.contact = $event,
                            label: _ctx.$t("contact"),
                            error: $data.errors.contact ? true : false,
                            "error-messages": $data.errors.contact,
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: "",
                            maxlength: "45"
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
                            modelValue: $data.formData.phone_country_code,
                            "onUpdate:modelValue": ($event) => $data.formData.phone_country_code = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            error: $data.errors.phone_country_code ? true : false,
                            "error-messages": $data.errors.phone_country_code,
                            "item-title": "value",
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
                  createVNode(VTextField, {
                    modelValue: $data.formData.email,
                    "onUpdate:modelValue": ($event) => $data.formData.email = $event,
                    label: _ctx.$t("email"),
                    error: $data.errors.email ? true : false,
                    "error-messages": $data.errors.email,
                    required: "",
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(VTextField, {
                    modelValue: $data.formData.address,
                    "onUpdate:modelValue": ($event) => $data.formData.address = $event,
                    label: _ctx.$t("address"),
                    error: $data.errors.address ? true : false,
                    "error-messages": $data.errors.address,
                    required: "",
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(VSelect, {
                    modelValue: $data.formData.currency,
                    "onUpdate:modelValue": ($event) => $data.formData.currency = $event,
                    items: $data.currencies,
                    label: _ctx.$t("currency"),
                    "item-title": "name",
                    "item-value": "value",
                    required: "",
                    outlined: "",
                    dense: "",
                    "return-object": "",
                    error: $data.errors.currency ? true : false,
                    "error-messages": $data.errors.currency
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                  createVNode("hr"),
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
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: "6",
                      sm: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.formData.name,
                          "onUpdate:modelValue": ($event) => $data.formData.name = $event,
                          label: _ctx.$t("name"),
                          error: $data.errors.name ? true : false,
                          "error-messages": $data.errors.name,
                          required: "",
                          outlined: "",
                          dense: "",
                          clearable: "",
                          maxlength: "45"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: "6",
                      sm: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.formData.contact,
                          "onUpdate:modelValue": ($event) => $data.formData.contact = $event,
                          label: _ctx.$t("contact"),
                          error: $data.errors.contact ? true : false,
                          "error-messages": $data.errors.contact,
                          required: "",
                          outlined: "",
                          dense: "",
                          clearable: "",
                          maxlength: "45"
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
                          modelValue: $data.formData.phone_country_code,
                          "onUpdate:modelValue": ($event) => $data.formData.phone_country_code = $event,
                          items: $data.countryCodes,
                          label: _ctx.$t("countrycode"),
                          error: $data.errors.phone_country_code ? true : false,
                          "error-messages": $data.errors.phone_country_code,
                          "item-title": "value",
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
                createVNode(VTextField, {
                  modelValue: $data.formData.email,
                  "onUpdate:modelValue": ($event) => $data.formData.email = $event,
                  label: _ctx.$t("email"),
                  error: $data.errors.email ? true : false,
                  "error-messages": $data.errors.email,
                  required: "",
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(VTextField, {
                  modelValue: $data.formData.address,
                  "onUpdate:modelValue": ($event) => $data.formData.address = $event,
                  label: _ctx.$t("address"),
                  error: $data.errors.address ? true : false,
                  "error-messages": $data.errors.address,
                  required: "",
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(VSelect, {
                  modelValue: $data.formData.currency,
                  "onUpdate:modelValue": ($event) => $data.formData.currency = $event,
                  items: $data.currencies,
                  label: _ctx.$t("currency"),
                  "item-title": "name",
                  "item-value": "value",
                  required: "",
                  outlined: "",
                  dense: "",
                  "return-object": "",
                  error: $data.errors.currency ? true : false,
                  "error-messages": $data.errors.currency
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                createVNode("hr"),
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/clients/components/ClientForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ClientForm = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-38124139"]]);
const _sfc_main$1 = {
  name: "MonthlyStatementTable",
  props: {
    clientId: null
  },
  components: {
    Dialog
  },
  data() {
    return {
      search: null,
      period: 6,
      sortBy: [
        { key: "year", order: "desc" },
        { key: "month", order: "desc" }
      ],
      loading: false,
      mobile: window.innerWidth < 769,
      expanded: [],
      items: [],
      periods: [
        {
          key: 0,
          title: `6 ${this.$t("shipping.period.months")}`,
          value: 6
        },
        {
          key: 1,
          title: `9 ${this.$t("shipping.period.months")}`,
          value: 9
        },
        {
          key: 2,
          title: `1 ${this.$t("shipping.period.years")}`,
          value: 12
        },
        {
          key: 3,
          title: `2 ${this.$t("shipping.period.years")}`,
          value: 24
        }
      ],
      data: {},
      headers: [
        {
          title: this.$t("month"),
          value: "month",
          sortable: true
        },
        {
          title: this.$t("year"),
          value: "year",
          sortable: true
        },
        {
          title: `${this.$t("shipping.number-of-shipments")}`,
          value: "number_of_shipments",
          sortable: true
        },
        {
          title: `${this.$t("amount")}`,
          value: "amount",
          sortable: true
        },
        {
          title: this.$t("actions"),
          value: "actions",
          sortable: false
        }
      ]
    };
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
    this.fetch(this.period);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.mobile = window.innerWidth < 769;
    },
    fetch(period) {
      let self = this;
      self.loading = true;
      self.period = period;
      let data = {
        period,
        client_id: self.$props.clientId
      };
      this.$store.dispatch("clients/monthly-statements/get", data).then((response) => {
        let res = JSON.parse(JSON.stringify(response));
        self.items = res.data.monthly_statements;
        self.data = res.data;
        self.loading = false;
      }).catch((error) => {
        self.loading = false;
      });
    },
    reload() {
      this.fetch(this.period);
    },
    async click(item, action) {
      let type = action.type;
      switch (type) {
        case "Export":
          {
            let self = this;
            self.loading = true;
            let data = {
              client_id: self.$props.clientId,
              extension: "pdf",
              ...item
            };
            this.$store.dispatch("clients/monthly-statements/export", data).then((response) => {
              self.loading = false;
            }).catch((error) => {
              self.loading = false;
            });
          }
          break;
        case "Settle":
          {
            let self = this;
            self.loading = true;
            let data = {
              client_id: self.$props.clientId,
              month: item.month,
              year: item.year,
              goods_shipping_ids: item.shippings.map((x) => x.id)
            };
            this.$store.dispatch("clients/monthly-statements/create", data).then((response) => {
              this.reload();
              self.loading = false;
            }).catch((error) => {
              self.loading = false;
            });
          }
          break;
      }
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Dialog = resolveComponent("Dialog");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CInputGroup = resolveComponent("CInputGroup");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_CFormInput = resolveComponent("CFormInput");
  const _component_CButtonGroup = resolveComponent("CButtonGroup");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-fd020679>`);
  _push(ssrRenderComponent(_component_Dialog, { ref: "dialog" }, null, _parent));
  _push(ssrRenderComponent(_component_CRow, { class: "p-2 mb-2 mt-4" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCol, {
          md: 10,
          sm: 10
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CInputGroup, { class: "mb-3" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CButton, {
                      color: "primary",
                      size: "sm"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CIcon, {
                            name: "cil-magnifying-glass",
                            size: "sm"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CIcon, {
                              name: "cil-magnifying-glass",
                              size: "sm"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CFormInput, {
                      size: "sm",
                      modelValue: $data.search,
                      "onUpdate:modelValue": ($event) => $data.search = $event
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CButton, {
                        color: "primary",
                        size: "sm"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CIcon, {
                            name: "cil-magnifying-glass",
                            size: "sm"
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CFormInput, {
                        size: "sm",
                        modelValue: $data.search,
                        "onUpdate:modelValue": ($event) => $data.search = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CInputGroup, { class: "mb-3" }, {
                  default: withCtx(() => [
                    createVNode(_component_CButton, {
                      color: "primary",
                      size: "sm"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_CIcon, {
                          name: "cil-magnifying-glass",
                          size: "sm"
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CFormInput, {
                      size: "sm",
                      modelValue: $data.search,
                      "onUpdate:modelValue": ($event) => $data.search = $event
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CCol, {
          md: 2,
          sm: 2,
          class: "text-right"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CButtonGroup, { role: "group" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CButton, {
                      color: "primary",
                      size: "sm",
                      onClick: $options.reload
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CIcon, {
                            name: "cil-reload",
                            size: "sm"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CIcon, {
                              name: "cil-reload",
                              size: "sm"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CButton, {
                        color: "primary",
                        size: "sm",
                        onClick: $options.reload
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CIcon, {
                            name: "cil-reload",
                            size: "sm"
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CButtonGroup, { role: "group" }, {
                  default: withCtx(() => [
                    createVNode(_component_CButton, {
                      color: "primary",
                      size: "sm",
                      onClick: $options.reload
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_CIcon, {
                          name: "cil-reload",
                          size: "sm"
                        })
                      ]),
                      _: 1
                    }, 8, ["onClick"])
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
          createVNode(_component_CCol, {
            md: 10,
            sm: 10
          }, {
            default: withCtx(() => [
              createVNode(_component_CInputGroup, { class: "mb-3" }, {
                default: withCtx(() => [
                  createVNode(_component_CButton, {
                    color: "primary",
                    size: "sm"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CIcon, {
                        name: "cil-magnifying-glass",
                        size: "sm"
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CFormInput, {
                    size: "sm",
                    modelValue: $data.search,
                    "onUpdate:modelValue": ($event) => $data.search = $event
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_CCol, {
            md: 2,
            sm: 2,
            class: "text-right"
          }, {
            default: withCtx(() => [
              createVNode(_component_CButtonGroup, { role: "group" }, {
                default: withCtx(() => [
                  createVNode(_component_CButton, {
                    color: "primary",
                    size: "sm",
                    onClick: $options.reload
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CIcon, {
                        name: "cil-reload",
                        size: "sm"
                      })
                    ]),
                    _: 1
                  }, 8, ["onClick"])
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
  _push(ssrRenderComponent(_component_CRow, { class: "p-2 mb-2" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCol, { class: "text-right" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CButtonGroup, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<!--[-->`);
                    ssrRenderList($data.periods, (p) => {
                      _push4(ssrRenderComponent(_component_CButton, {
                        key: p.key,
                        color: p.value === $data.period ? "primary" : "secondary",
                        size: "sm",
                        disabled: $data.loading,
                        onClick: ($event) => $options.fetch(p.value)
                      }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`${ssrInterpolate(p.title)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(p.title), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    });
                    _push4(`<!--]-->`);
                  } else {
                    return [
                      (openBlock(true), createBlock(Fragment, null, renderList($data.periods, (p) => {
                        return openBlock(), createBlock(_component_CButton, {
                          key: p.key,
                          color: p.value === $data.period ? "primary" : "secondary",
                          size: "sm",
                          disabled: $data.loading,
                          onClick: ($event) => $options.fetch(p.value)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(p.title), 1)
                          ]),
                          _: 2
                        }, 1032, ["color", "disabled", "onClick"]);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CButtonGroup, null, {
                  default: withCtx(() => [
                    (openBlock(true), createBlock(Fragment, null, renderList($data.periods, (p) => {
                      return openBlock(), createBlock(_component_CButton, {
                        key: p.key,
                        color: p.value === $data.period ? "primary" : "secondary",
                        size: "sm",
                        disabled: $data.loading,
                        onClick: ($event) => $options.fetch(p.value)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(p.title), 1)
                        ]),
                        _: 2
                      }, 1032, ["color", "disabled", "onClick"]);
                    }), 128))
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
          createVNode(_component_CCol, { class: "text-right" }, {
            default: withCtx(() => [
              createVNode(_component_CButtonGroup, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList($data.periods, (p) => {
                    return openBlock(), createBlock(_component_CButton, {
                      key: p.key,
                      color: p.value === $data.period ? "primary" : "secondary",
                      size: "sm",
                      disabled: $data.loading,
                      onClick: ($event) => $options.fetch(p.value)
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(p.title), 1)
                      ]),
                      _: 2
                    }, 1032, ["color", "disabled", "onClick"]);
                  }), 128))
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
  _push(ssrRenderComponent(VDataTable, {
    class: "elevation-1",
    expanded: $data.expanded,
    "onUpdate:expanded": ($event) => $data.expanded = $event,
    headers: $data.headers,
    items: $data.items,
    search: $data.search,
    loading: $data.loading,
    "hide-default-footer": true,
    "multi-sort": true,
    "items-per-page": 100,
    "sort-by": $data.sortBy,
    density: "compact",
    "disable-pagination": "",
    "show-expand": ""
  }, createSlots({
    loading: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VSkeletonLoader, { type: "table-row@10" }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(VSkeletonLoader, { type: "table-row@10" })
        ];
      }
    }),
    "expanded-row": withCtx(({ columns, item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<tr data-v-fd020679${_scopeId}><td${ssrRenderAttr("colspan", columns.length)} class="p-0" data-v-fd020679${_scopeId}>`);
        if (item.shippings && item.shippings.length > 0) {
          _push2(`<div class="px-2" data-v-fd020679${_scopeId}>`);
          _push2(ssrRenderComponent(_component_CRow, null, {
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_CCol, {
                  class: "border py-2",
                  sm: "4"
                }, {
                  default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`${ssrInterpolate(_ctx.$t("number"))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(_ctx.$t("number")), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
                _push3(ssrRenderComponent(_component_CCol, {
                  class: "border py-2",
                  sm: "4"
                }, {
                  default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`${ssrInterpolate(_ctx.$t("delivery-date"))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(_ctx.$t("delivery-date")), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
                _push3(ssrRenderComponent(_component_CCol, {
                  class: "border py-2",
                  sm: "4"
                }, {
                  default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`${ssrInterpolate(_ctx.$t("amount"))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(_ctx.$t("amount")), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(_component_CCol, {
                    class: "border py-2",
                    sm: "4"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("number")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CCol, {
                    class: "border py-2",
                    sm: "4"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("delivery-date")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CCol, {
                    class: "border py-2",
                    sm: "4"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("amount")), 1)
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`<!--[-->`);
          ssrRenderList(item.shippings, (s) => {
            _push2(ssrRenderComponent(_component_CRow, {
              key: s.id
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CCol, {
                    class: "border py-2",
                    sm: "4"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(s.generated_id)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(s.generated_id), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CCol, {
                    class: "border py-2",
                    sm: "4"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(s.delivered_at)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(s.delivered_at), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CCol, {
                    class: "border py-2",
                    sm: "4"
                  }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(s.sub_total)}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(s.sub_total), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CCol, {
                      class: "border py-2",
                      sm: "4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(s.generated_id), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_CCol, {
                      class: "border py-2",
                      sm: "4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(s.delivered_at), 1)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_CCol, {
                      class: "border py-2",
                      sm: "4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(s.sub_total), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          });
          _push2(`<!--]-->`);
          _push2(ssrRenderComponent(_component_CRow, null, {
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_CCol, {
                  class: "border py-2",
                  sm: "4"
                }, null, _parent3, _scopeId2));
                _push3(ssrRenderComponent(_component_CCol, {
                  class: "border py-2",
                  sm: "4"
                }, {
                  default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`${ssrInterpolate(_ctx.$t("subtotal"))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(_ctx.$t("subtotal")), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
                _push3(ssrRenderComponent(_component_CCol, {
                  class: "border py-2",
                  sm: "4"
                }, {
                  default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`${ssrInterpolate(item.amount)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(item.amount), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(_component_CCol, {
                    class: "border py-2",
                    sm: "4"
                  }),
                  createVNode(_component_CCol, {
                    class: "border py-2",
                    sm: "4"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("subtotal")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CCol, {
                    class: "border py-2",
                    sm: "4"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(item.amount), 1)
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<div class="w-100 h-100 d-flex items-center justify-center py-6" data-v-fd020679${_scopeId}><span data-v-fd020679${_scopeId}>${ssrInterpolate(_ctx.$t("no-data"))}</span></div>`);
        }
        _push2(`</td></tr>`);
      } else {
        return [
          createVNode("tr", null, [
            createVNode("td", {
              colspan: columns.length,
              class: "p-0"
            }, [
              item.shippings && item.shippings.length > 0 ? (openBlock(), createBlock("div", {
                key: 0,
                class: "px-2"
              }, [
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      class: "border py-2",
                      sm: "4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("number")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      class: "border py-2",
                      sm: "4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("delivery-date")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      class: "border py-2",
                      sm: "4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("amount")), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                (openBlock(true), createBlock(Fragment, null, renderList(item.shippings, (s) => {
                  return openBlock(), createBlock(_component_CRow, {
                    key: s.id
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        class: "border py-2",
                        sm: "4"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(s.generated_id), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_CCol, {
                        class: "border py-2",
                        sm: "4"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(s.delivered_at), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_CCol, {
                        class: "border py-2",
                        sm: "4"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(s.sub_total), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024);
                }), 128)),
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      class: "border py-2",
                      sm: "4"
                    }),
                    createVNode(_component_CCol, {
                      class: "border py-2",
                      sm: "4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("subtotal")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      class: "border py-2",
                      sm: "4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(item.amount), 1)
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024)
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: "w-100 h-100 d-flex items-center justify-center py-6"
              }, [
                createVNode("span", null, toDisplayString(_ctx.$t("no-data")), 1)
              ]))
            ], 8, ["colspan"])
          ])
        ];
      }
    }),
    [`item.actions`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CButtonGroup, null, {
          default: withCtx((_, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              ssrRenderList(item.actions, (action) => {
                _push3(ssrRenderComponent(_component_CButton, {
                  key: action.key,
                  color: action.color,
                  disabled: action.disabled,
                  size: "sm",
                  onClick: ($event) => $options.click(item, action)
                }, {
                  default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`${ssrInterpolate(action.title)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(action.title), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(item.actions, (action) => {
                  return openBlock(), createBlock(_component_CButton, {
                    key: action.key,
                    color: action.color,
                    disabled: action.disabled,
                    size: "sm",
                    onClick: ($event) => $options.click(item, action)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(action.title), 1)
                    ]),
                    _: 2
                  }, 1032, ["color", "disabled", "onClick"]);
                }), 128))
              ];
            }
          }),
          _: 2
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CButtonGroup, null, {
            default: withCtx(() => [
              (openBlock(true), createBlock(Fragment, null, renderList(item.actions, (action) => {
                return openBlock(), createBlock(_component_CButton, {
                  key: action.key,
                  color: action.color,
                  disabled: action.disabled,
                  size: "sm",
                  onClick: ($event) => $options.click(item, action)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(action.title), 1)
                  ]),
                  _: 2
                }, 1032, ["color", "disabled", "onClick"]);
              }), 128))
            ]),
            _: 2
          }, 1024)
        ];
      }
    }),
    _: 2
  }, [
    !$data.loading ? {
      name: `body.append`,
      fn: withCtx((_, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(`<tr data-v-fd020679${_scopeId}><!--[-->`);
          ssrRenderList([...Array(3)], (i) => {
            _push2(`<td data-v-fd020679${_scopeId}></td>`);
          });
          _push2(`<!--]--><td class="p-2" data-v-fd020679${_scopeId}>${ssrInterpolate(_ctx.$t("shipping.total-number-of-shipments"))}</td><td class="p-2" colspan="2" data-v-fd020679${_scopeId}>${ssrInterpolate($data.data.total_number_of_shipments)}</td></tr><tr data-v-fd020679${_scopeId}><!--[-->`);
          ssrRenderList([...Array(3)], (i) => {
            _push2(`<td data-v-fd020679${_scopeId}></td>`);
          });
          _push2(`<!--]--><td class="p-2" data-v-fd020679${_scopeId}>${ssrInterpolate(_ctx.$t("subtotal"))}</td><td class="p-2" colspan="2" data-v-fd020679${_scopeId}>${ssrInterpolate($data.data.subtotal)}</td></tr>`);
        } else {
          return [
            createVNode("tr", null, [
              (openBlock(true), createBlock(Fragment, null, renderList([...Array(3)], (i) => {
                return openBlock(), createBlock("td", { key: i });
              }), 128)),
              createVNode("td", { class: "p-2" }, toDisplayString(_ctx.$t("shipping.total-number-of-shipments")), 1),
              createVNode("td", {
                class: "p-2",
                colspan: "2"
              }, toDisplayString($data.data.total_number_of_shipments), 1)
            ]),
            createVNode("tr", null, [
              (openBlock(true), createBlock(Fragment, null, renderList([...Array(3)], (i) => {
                return openBlock(), createBlock("td", { key: i });
              }), 128)),
              createVNode("td", { class: "p-2" }, toDisplayString(_ctx.$t("subtotal")), 1),
              createVNode("td", {
                class: "p-2",
                colspan: "2"
              }, toDisplayString($data.data.subtotal), 1)
            ])
          ];
        }
      }),
      key: "0"
    } : void 0
  ]), _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/clients/components/MonthlyStatementTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MonthlyStatementTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-fd020679"]]);
const _sfc_main = {
  name: "ClientDetails",
  components: {
    Snackbar,
    ClientForm,
    ShippingTable,
    MonthlyStatementTable
  },
  data() {
    return {
      tab: {
        values: [
          this.$t("info"),
          this.$t("shippings.title"),
          this.$t("shipping.monthly-statement")
        ],
        index: 0
      }
    };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Snackbar = resolveComponent("Snackbar");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CTabs = resolveComponent("CTabs");
  const _component_CTabList = resolveComponent("CTabList");
  const _component_CTab = resolveComponent("CTab");
  const _component_CTabContent = resolveComponent("CTabContent");
  const _component_CTabPanel = resolveComponent("CTabPanel");
  const _component_ClientForm = resolveComponent("ClientForm");
  const _component_ShippingTable = resolveComponent("ShippingTable");
  const _component_MonthlyStatementTable = resolveComponent("MonthlyStatementTable");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Snackbar, null, null, _parent));
  _push(ssrRenderComponent(_component_CRow, null, {
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
                                      _push7(ssrRenderComponent(_component_CTab, { itemKey: 2 }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`${ssrInterpolate($data.tab.values[2].toUpperCase())}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString($data.tab.values[2].toUpperCase()), 1)
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
                                        }),
                                        createVNode(_component_CTab, { itemKey: 2 }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString($data.tab.values[2].toUpperCase()), 1)
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
                                            _push8(ssrRenderComponent(_component_ClientForm, {
                                              id: this.$route.params.id
                                            }, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_ClientForm, {
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
                                            _push8(ssrRenderComponent(_component_ShippingTable, {
                                              clientId: this.$route.params.id
                                            }, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_ShippingTable, {
                                                clientId: this.$route.params.id
                                              }, null, 8, ["clientId"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_CTabPanel, {
                                        class: "p-3",
                                        itemKey: 2
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_MonthlyStatementTable, {
                                              clientId: this.$route.params.id
                                            }, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_MonthlyStatementTable, {
                                                clientId: this.$route.params.id
                                              }, null, 8, ["clientId"])
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
                                            createVNode(_component_ClientForm, {
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
                                            createVNode(_component_ShippingTable, {
                                              clientId: this.$route.params.id
                                            }, null, 8, ["clientId"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_CTabPanel, {
                                          class: "p-3",
                                          itemKey: 2
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_MonthlyStatementTable, {
                                              clientId: this.$route.params.id
                                            }, null, 8, ["clientId"])
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
                                      }),
                                      createVNode(_component_CTab, { itemKey: 2 }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString($data.tab.values[2].toUpperCase()), 1)
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
                                          createVNode(_component_ClientForm, {
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
                                          createVNode(_component_ShippingTable, {
                                            clientId: this.$route.params.id
                                          }, null, 8, ["clientId"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CTabPanel, {
                                        class: "p-3",
                                        itemKey: 2
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_MonthlyStatementTable, {
                                            clientId: this.$route.params.id
                                          }, null, 8, ["clientId"])
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
                                    }),
                                    createVNode(_component_CTab, { itemKey: 2 }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString($data.tab.values[2].toUpperCase()), 1)
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
                                        createVNode(_component_ClientForm, {
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
                                        createVNode(_component_ShippingTable, {
                                          clientId: this.$route.params.id
                                        }, null, 8, ["clientId"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CTabPanel, {
                                      class: "p-3",
                                      itemKey: 2
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_MonthlyStatementTable, {
                                          clientId: this.$route.params.id
                                        }, null, 8, ["clientId"])
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
                                  }),
                                  createVNode(_component_CTab, { itemKey: 2 }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString($data.tab.values[2].toUpperCase()), 1)
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
                                      createVNode(_component_ClientForm, {
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
                                      createVNode(_component_ShippingTable, {
                                        clientId: this.$route.params.id
                                      }, null, 8, ["clientId"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CTabPanel, {
                                    class: "p-3",
                                    itemKey: 2
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_MonthlyStatementTable, {
                                        clientId: this.$route.params.id
                                      }, null, 8, ["clientId"])
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
                                }),
                                createVNode(_component_CTab, { itemKey: 2 }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString($data.tab.values[2].toUpperCase()), 1)
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
                                    createVNode(_component_ClientForm, {
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
                                    createVNode(_component_ShippingTable, {
                                      clientId: this.$route.params.id
                                    }, null, 8, ["clientId"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CTabPanel, {
                                  class: "p-3",
                                  itemKey: 2
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_MonthlyStatementTable, {
                                      clientId: this.$route.params.id
                                    }, null, 8, ["clientId"])
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
                              }),
                              createVNode(_component_CTab, { itemKey: 2 }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString($data.tab.values[2].toUpperCase()), 1)
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
                                  createVNode(_component_ClientForm, {
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
                                  createVNode(_component_ShippingTable, {
                                    clientId: this.$route.params.id
                                  }, null, 8, ["clientId"])
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CTabPanel, {
                                class: "p-3",
                                itemKey: 2
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_MonthlyStatementTable, {
                                    clientId: this.$route.params.id
                                  }, null, 8, ["clientId"])
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
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/clients/ClientDetails.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ClientDetails = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  ClientDetails as default
};
//# sourceMappingURL=ClientDetails-DqzyUBE-.mjs.map
