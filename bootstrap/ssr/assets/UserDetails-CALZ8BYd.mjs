import { _ as _export_sfc, T as TextFieldColorPicker, t as types, r as roles, S as Snackbar, a as Dialog, D as DutyCalendar } from "../app.mjs";
import { resolveComponent, mergeProps, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext, Fragment, renderList } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { VProgressCircular } from "vuetify/lib/components/VProgressCircular/index.mjs";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
import { VSelect } from "vuetify/lib/components/VSelect/index.mjs";
import { VTextField } from "vuetify/lib/components/VTextField/index.mjs";
import { VSwitch } from "vuetify/lib/components/VSwitch/index.mjs";
import moment from "moment";
import "vue-i18n";
import "@coreui/icons";
import "@chenfengyuan/vue-barcode";
import "@chenfengyuan/vue-number-input";
import "@coreui/icons-vue";
import "@coreui/vue";
import "@vee-validate/i18n";
import "@vee-validate/rules";
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
const _sfc_main$3 = {
  name: "EmployeeForm",
  props: {
    id: null
  },
  components: {
    TextFieldColorPicker
  },
  data() {
    return {
      formData: {},
      errors: {},
      datepicker: {
        joinedat: {
          menu: false
        },
        leftat: {
          menu: false
        }
      },
      employeeTypes: types,
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
      self.fetchLoading = true;
      let data = {
        id: self.$props.id
      };
      this.$store.dispatch("users/employee/get", data).then((response) => {
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
      let data = {
        ...self.formData,
        id: self.$props.id,
        joined_at: self.formData.joined_at ? new Date(self.formData.joined_at).toMyDateString() : null,
        left_at: self.formData.left_at ? new Date(self.formData.left_at).toMyDateString() : null
      };
      this.$store.dispatch("users/employee/update", data).then((response) => {
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
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_v_date_input = resolveComponent("v-date-input");
  const _component_TextFieldColorPicker = resolveComponent("TextFieldColorPicker");
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
              _push3(`<form data-v-65d3f088${_scopeId2}>`);
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.formData.salary,
                "onUpdate:modelValue": ($event) => $data.formData.salary = $event,
                label: _ctx.$t("salary"),
                error: $data.errors.salary ? true : false,
                "error-messages": $data.errors.salary,
                type: "number",
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
                            modelValue: $data.formData.employer_contribution,
                            "onUpdate:modelValue": ($event) => $data.formData.employer_contribution = $event,
                            label: `${_ctx.$t("employer")}${_ctx.$t(
                              "mpf.contribution"
                            )} （％）`,
                            error: $data.errors.employer_contribution ? true : false,
                            "error-messages": $data.errors.employer_contribution,
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.formData.employer_contribution,
                              "onUpdate:modelValue": ($event) => $data.formData.employer_contribution = $event,
                              label: `${_ctx.$t("employer")}${_ctx.$t(
                                "mpf.contribution"
                              )} （％）`,
                              error: $data.errors.employer_contribution ? true : false,
                              "error-messages": $data.errors.employer_contribution,
                              outlined: "",
                              dense: "",
                              clearable: ""
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
                            modelValue: $data.formData.employee_contribution,
                            "onUpdate:modelValue": ($event) => $data.formData.employee_contribution = $event,
                            label: `${_ctx.$t("employee")}${_ctx.$t(
                              "mpf.contribution"
                            )} （％）`,
                            error: $data.errors.employee_contribution ? true : false,
                            "error-messages": $data.errors.employee_contribution,
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.formData.employee_contribution,
                              "onUpdate:modelValue": ($event) => $data.formData.employee_contribution = $event,
                              label: `${_ctx.$t("employee")}${_ctx.$t(
                                "mpf.contribution"
                              )} （％）`,
                              error: $data.errors.employee_contribution ? true : false,
                              "error-messages": $data.errors.employee_contribution,
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
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.formData.employer_contribution,
                            "onUpdate:modelValue": ($event) => $data.formData.employer_contribution = $event,
                            label: `${_ctx.$t("employer")}${_ctx.$t(
                              "mpf.contribution"
                            )} （％）`,
                            error: $data.errors.employer_contribution ? true : false,
                            "error-messages": $data.errors.employer_contribution,
                            outlined: "",
                            dense: "",
                            clearable: ""
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
                            modelValue: $data.formData.employee_contribution,
                            "onUpdate:modelValue": ($event) => $data.formData.employee_contribution = $event,
                            label: `${_ctx.$t("employee")}${_ctx.$t(
                              "mpf.contribution"
                            )} （％）`,
                            error: $data.errors.employee_contribution ? true : false,
                            "error-messages": $data.errors.employee_contribution,
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
                      md: "6",
                      sm: "6"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_v_date_input, {
                            label: _ctx.$t("joined-at"),
                            modelValue: $data.formData.joined_at,
                            "onUpdate:modelValue": ($event) => $data.formData.joined_at = $event,
                            "prepend-icon": "",
                            clearable: "",
                            outlined: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_v_date_input, {
                              label: _ctx.$t("joined-at"),
                              modelValue: $data.formData.joined_at,
                              "onUpdate:modelValue": ($event) => $data.formData.joined_at = $event,
                              "prepend-icon": "",
                              clearable: "",
                              outlined: ""
                            }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
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
                          _push5(ssrRenderComponent(_component_v_date_input, {
                            label: _ctx.$t("left-at"),
                            modelValue: $data.formData.left_at,
                            "onUpdate:modelValue": ($event) => $data.formData.left_at = $event,
                            "prepend-icon": "",
                            clearable: "",
                            outlined: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_v_date_input, {
                              label: _ctx.$t("left-at"),
                              modelValue: $data.formData.left_at,
                              "onUpdate:modelValue": ($event) => $data.formData.left_at = $event,
                              "prepend-icon": "",
                              clearable: "",
                              outlined: ""
                            }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
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
                          createVNode(_component_v_date_input, {
                            label: _ctx.$t("joined-at"),
                            modelValue: $data.formData.joined_at,
                            "onUpdate:modelValue": ($event) => $data.formData.joined_at = $event,
                            "prepend-icon": "",
                            clearable: "",
                            outlined: ""
                          }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_date_input, {
                            label: _ctx.$t("left-at"),
                            modelValue: $data.formData.left_at,
                            "onUpdate:modelValue": ($event) => $data.formData.left_at = $event,
                            "prepend-icon": "",
                            clearable: "",
                            outlined: ""
                          }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                label: _ctx.$t("annual-leave-days"),
                modelValue: $data.formData.annual_leave_days,
                "onUpdate:modelValue": ($event) => $data.formData.annual_leave_days = $event,
                type: "number",
                required: "",
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VSelect, {
                modelValue: $data.formData.type,
                "onUpdate:modelValue": ($event) => $data.formData.type = $event,
                items: $data.employeeTypes,
                label: _ctx.$t("type"),
                "item-title": "value",
                "item-value": "value",
                required: "",
                outlined: "",
                dense: ""
              }, null, _parent3, _scopeId2));
              if ($data.formData.duty_default_color) {
                _push3(ssrRenderComponent(_component_CRow, { class: "g-0 mb-2" }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_CCol, { md: "12" }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`${ssrInterpolate(`${this.$t("default")} ${this.$t(
                              "dutylist"
                            )} ${this.$t("color")}`)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(`${this.$t("default")} ${this.$t(
                                "dutylist"
                              )} ${this.$t("color")}`), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                      _push4(ssrRenderComponent(_component_CCol, { md: "12" }, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(_component_TextFieldColorPicker, {
                              modelValue: $data.formData.duty_default_color,
                              "onUpdate:modelValue": ($event) => $data.formData.duty_default_color = $event
                            }, null, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(_component_TextFieldColorPicker, {
                                modelValue: $data.formData.duty_default_color,
                                "onUpdate:modelValue": ($event) => $data.formData.duty_default_color = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_CCol, { md: "12" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(`${this.$t("default")} ${this.$t(
                              "dutylist"
                            )} ${this.$t("color")}`), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_CCol, { md: "12" }, {
                          default: withCtx(() => [
                            createVNode(_component_TextFieldColorPicker, {
                              modelValue: $data.formData.duty_default_color,
                              "onUpdate:modelValue": ($event) => $data.formData.duty_default_color = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
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
                createVNode("form", null, [
                  createVNode(VTextField, {
                    modelValue: $data.formData.salary,
                    "onUpdate:modelValue": ($event) => $data.formData.salary = $event,
                    label: _ctx.$t("salary"),
                    error: $data.errors.salary ? true : false,
                    "error-messages": $data.errors.salary,
                    type: "number",
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
                            modelValue: $data.formData.employer_contribution,
                            "onUpdate:modelValue": ($event) => $data.formData.employer_contribution = $event,
                            label: `${_ctx.$t("employer")}${_ctx.$t(
                              "mpf.contribution"
                            )} （％）`,
                            error: $data.errors.employer_contribution ? true : false,
                            "error-messages": $data.errors.employer_contribution,
                            outlined: "",
                            dense: "",
                            clearable: ""
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
                            modelValue: $data.formData.employee_contribution,
                            "onUpdate:modelValue": ($event) => $data.formData.employee_contribution = $event,
                            label: `${_ctx.$t("employee")}${_ctx.$t(
                              "mpf.contribution"
                            )} （％）`,
                            error: $data.errors.employee_contribution ? true : false,
                            "error-messages": $data.errors.employee_contribution,
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
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_date_input, {
                            label: _ctx.$t("joined-at"),
                            modelValue: $data.formData.joined_at,
                            "onUpdate:modelValue": ($event) => $data.formData.joined_at = $event,
                            "prepend-icon": "",
                            clearable: "",
                            outlined: ""
                          }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_v_date_input, {
                            label: _ctx.$t("left-at"),
                            modelValue: $data.formData.left_at,
                            "onUpdate:modelValue": ($event) => $data.formData.left_at = $event,
                            "prepend-icon": "",
                            clearable: "",
                            outlined: ""
                          }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VTextField, {
                    label: _ctx.$t("annual-leave-days"),
                    modelValue: $data.formData.annual_leave_days,
                    "onUpdate:modelValue": ($event) => $data.formData.annual_leave_days = $event,
                    type: "number",
                    required: "",
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                  createVNode(VSelect, {
                    modelValue: $data.formData.type,
                    "onUpdate:modelValue": ($event) => $data.formData.type = $event,
                    items: $data.employeeTypes,
                    label: _ctx.$t("type"),
                    "item-title": "value",
                    "item-value": "value",
                    required: "",
                    outlined: "",
                    dense: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label"]),
                  $data.formData.duty_default_color ? (openBlock(), createBlock(_component_CRow, {
                    key: 0,
                    class: "g-0 mb-2"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, { md: "12" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(`${this.$t("default")} ${this.$t(
                            "dutylist"
                          )} ${this.$t("color")}`), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, { md: "12" }, {
                        default: withCtx(() => [
                          createVNode(_component_TextFieldColorPicker, {
                            modelValue: $data.formData.duty_default_color,
                            "onUpdate:modelValue": ($event) => $data.formData.duty_default_color = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true),
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
              createVNode("form", null, [
                createVNode(VTextField, {
                  modelValue: $data.formData.salary,
                  "onUpdate:modelValue": ($event) => $data.formData.salary = $event,
                  label: _ctx.$t("salary"),
                  error: $data.errors.salary ? true : false,
                  "error-messages": $data.errors.salary,
                  type: "number",
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
                          modelValue: $data.formData.employer_contribution,
                          "onUpdate:modelValue": ($event) => $data.formData.employer_contribution = $event,
                          label: `${_ctx.$t("employer")}${_ctx.$t(
                            "mpf.contribution"
                          )} （％）`,
                          error: $data.errors.employer_contribution ? true : false,
                          "error-messages": $data.errors.employer_contribution,
                          outlined: "",
                          dense: "",
                          clearable: ""
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
                          modelValue: $data.formData.employee_contribution,
                          "onUpdate:modelValue": ($event) => $data.formData.employee_contribution = $event,
                          label: `${_ctx.$t("employee")}${_ctx.$t(
                            "mpf.contribution"
                          )} （％）`,
                          error: $data.errors.employee_contribution ? true : false,
                          "error-messages": $data.errors.employee_contribution,
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
                      md: "6",
                      sm: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_date_input, {
                          label: _ctx.$t("joined-at"),
                          modelValue: $data.formData.joined_at,
                          "onUpdate:modelValue": ($event) => $data.formData.joined_at = $event,
                          "prepend-icon": "",
                          clearable: "",
                          outlined: ""
                        }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: "6",
                      sm: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_v_date_input, {
                          label: _ctx.$t("left-at"),
                          modelValue: $data.formData.left_at,
                          "onUpdate:modelValue": ($event) => $data.formData.left_at = $event,
                          "prepend-icon": "",
                          clearable: "",
                          outlined: ""
                        }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VTextField, {
                  label: _ctx.$t("annual-leave-days"),
                  modelValue: $data.formData.annual_leave_days,
                  "onUpdate:modelValue": ($event) => $data.formData.annual_leave_days = $event,
                  type: "number",
                  required: "",
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                createVNode(VSelect, {
                  modelValue: $data.formData.type,
                  "onUpdate:modelValue": ($event) => $data.formData.type = $event,
                  items: $data.employeeTypes,
                  label: _ctx.$t("type"),
                  "item-title": "value",
                  "item-value": "value",
                  required: "",
                  outlined: "",
                  dense: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label"]),
                $data.formData.duty_default_color ? (openBlock(), createBlock(_component_CRow, {
                  key: 0,
                  class: "g-0 mb-2"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, { md: "12" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(`${this.$t("default")} ${this.$t(
                          "dutylist"
                        )} ${this.$t("color")}`), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, { md: "12" }, {
                      default: withCtx(() => [
                        createVNode(_component_TextFieldColorPicker, {
                          modelValue: $data.formData.duty_default_color,
                          "onUpdate:modelValue": ($event) => $data.formData.duty_default_color = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
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
  }, _parent));
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/users/components/EmployeeForm.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const EmployeeForm = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-65d3f088"]]);
const _sfc_main$2 = {
  name: "PermissionForm",
  props: {
    id: null
  },
  data() {
    return {
      formData: {},
      errors: {},
      fetchLoading: false,
      updateLoading: false,
      roles
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
      self.fetchLoading = true;
      let data = {
        id: self.$props.id
      };
      this.$store.dispatch("users/permission/get", data).then((response) => {
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
      let data = {
        ...self.formData,
        id: self.$props.id
      };
      this.$store.dispatch("users/permission/update", data).then((response) => {
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
              _push3(`<!--[-->`);
              ssrRenderList($data.formData.items, (_3, key) => {
                _push3(ssrRenderComponent(_component_CRow, {
                  class: "d-flex align-items-center align-items-start border-bottom",
                  key: `${key}`
                }, {
                  default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_CCol, {
                        class: "h-100",
                        md: 9,
                        sm: 6
                      }, {
                        default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<div class="d-flex flex-column" data-v-f15a316c${_scopeId4}><span class="h-100" data-v-f15a316c${_scopeId4}>${ssrInterpolate(_ctx.$t(`permission.${key}.title`))}</span><span class="h-100" data-v-f15a316c${_scopeId4}>${ssrInterpolate(_ctx.$t(`permission.${key}.description`))}</span></div>`);
                          } else {
                            return [
                              createVNode("div", { class: "d-flex flex-column" }, [
                                createVNode("span", { class: "h-100" }, toDisplayString(_ctx.$t(`permission.${key}.title`)), 1),
                                createVNode("span", { class: "h-100" }, toDisplayString(_ctx.$t(`permission.${key}.description`)), 1)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                      _push4(ssrRenderComponent(_component_CCol, {
                        md: 3,
                        sm: 6
                      }, {
                        default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            if ($data.formData.user.role === "ADMIN") {
                              _push5(`<div class="p-2" data-v-f15a316c${_scopeId4}>`);
                              _push5(ssrRenderComponent(VSwitch, {
                                modelValue: $data.formData.items[key],
                                "onUpdate:modelValue": ($event) => $data.formData.items[key] = $event,
                                color: "indigo",
                                inset: "",
                                disabled: "",
                                "hide-details": ""
                              }, null, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              _push5(`<div class="p-2" data-v-f15a316c${_scopeId4}>`);
                              _push5(ssrRenderComponent(VSwitch, {
                                modelValue: $data.formData.items[key],
                                "onUpdate:modelValue": ($event) => $data.formData.items[key] = $event,
                                color: "indigo",
                                inset: "",
                                "hide-details": ""
                              }, null, _parent5, _scopeId4));
                              _push5(`</div>`);
                            }
                          } else {
                            return [
                              $data.formData.user.role === "ADMIN" ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "p-2"
                              }, [
                                createVNode(VSwitch, {
                                  modelValue: $data.formData.items[key],
                                  "onUpdate:modelValue": ($event) => $data.formData.items[key] = $event,
                                  color: "indigo",
                                  inset: "",
                                  disabled: "",
                                  "hide-details": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ])) : (openBlock(), createBlock("div", {
                                key: 1,
                                class: "p-2"
                              }, [
                                createVNode(VSwitch, {
                                  modelValue: $data.formData.items[key],
                                  "onUpdate:modelValue": ($event) => $data.formData.items[key] = $event,
                                  color: "indigo",
                                  inset: "",
                                  "hide-details": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]))
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_CCol, {
                          class: "h-100",
                          md: 9,
                          sm: 6
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex flex-column" }, [
                              createVNode("span", { class: "h-100" }, toDisplayString(_ctx.$t(`permission.${key}.title`)), 1),
                              createVNode("span", { class: "h-100" }, toDisplayString(_ctx.$t(`permission.${key}.description`)), 1)
                            ])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(_component_CCol, {
                          md: 3,
                          sm: 6
                        }, {
                          default: withCtx(() => [
                            $data.formData.user.role === "ADMIN" ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "p-2"
                            }, [
                              createVNode(VSwitch, {
                                modelValue: $data.formData.items[key],
                                "onUpdate:modelValue": ($event) => $data.formData.items[key] = $event,
                                color: "indigo",
                                inset: "",
                                disabled: "",
                                "hide-details": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ])) : (openBlock(), createBlock("div", {
                              key: 1,
                              class: "p-2"
                            }, [
                              createVNode(VSwitch, {
                                modelValue: $data.formData.items[key],
                                "onUpdate:modelValue": ($event) => $data.formData.items[key] = $event,
                                color: "indigo",
                                inset: "",
                                "hide-details": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]))
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]--><form class="py-2" data-v-f15a316c${_scopeId2}>`);
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
                (openBlock(true), createBlock(Fragment, null, renderList($data.formData.items, (_3, key) => {
                  return openBlock(), createBlock(_component_CRow, {
                    class: "d-flex align-items-center align-items-start border-bottom",
                    key: `${key}`
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        class: "h-100",
                        md: 9,
                        sm: 6
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "d-flex flex-column" }, [
                            createVNode("span", { class: "h-100" }, toDisplayString(_ctx.$t(`permission.${key}.title`)), 1),
                            createVNode("span", { class: "h-100" }, toDisplayString(_ctx.$t(`permission.${key}.description`)), 1)
                          ])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(_component_CCol, {
                        md: 3,
                        sm: 6
                      }, {
                        default: withCtx(() => [
                          $data.formData.user.role === "ADMIN" ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "p-2"
                          }, [
                            createVNode(VSwitch, {
                              modelValue: $data.formData.items[key],
                              "onUpdate:modelValue": ($event) => $data.formData.items[key] = $event,
                              color: "indigo",
                              inset: "",
                              disabled: "",
                              "hide-details": ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "p-2"
                          }, [
                            createVNode(VSwitch, {
                              modelValue: $data.formData.items[key],
                              "onUpdate:modelValue": ($event) => $data.formData.items[key] = $event,
                              color: "indigo",
                              inset: "",
                              "hide-details": ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]))
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024);
                }), 128)),
                createVNode("form", { class: "py-2" }, [
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
              (openBlock(true), createBlock(Fragment, null, renderList($data.formData.items, (_2, key) => {
                return openBlock(), createBlock(_component_CRow, {
                  class: "d-flex align-items-center align-items-start border-bottom",
                  key: `${key}`
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      class: "h-100",
                      md: 9,
                      sm: 6
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "d-flex flex-column" }, [
                          createVNode("span", { class: "h-100" }, toDisplayString(_ctx.$t(`permission.${key}.title`)), 1),
                          createVNode("span", { class: "h-100" }, toDisplayString(_ctx.$t(`permission.${key}.description`)), 1)
                        ])
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_CCol, {
                      md: 3,
                      sm: 6
                    }, {
                      default: withCtx(() => [
                        $data.formData.user.role === "ADMIN" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "p-2"
                        }, [
                          createVNode(VSwitch, {
                            modelValue: $data.formData.items[key],
                            "onUpdate:modelValue": ($event) => $data.formData.items[key] = $event,
                            color: "indigo",
                            inset: "",
                            disabled: "",
                            "hide-details": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "p-2"
                        }, [
                          createVNode(VSwitch, {
                            modelValue: $data.formData.items[key],
                            "onUpdate:modelValue": ($event) => $data.formData.items[key] = $event,
                            color: "indigo",
                            inset: "",
                            "hide-details": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]))
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1024);
              }), 128)),
              createVNode("form", { class: "py-2" }, [
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
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/users/components/PermissionForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const PermissionForm = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-f15a316c"]]);
const _sfc_main$1 = {
  name: "UserForm",
  props: {
    id: null
  },
  components: {
    Snackbar
  },
  data() {
    return {
      formData: {},
      errors: {},
      fetchLoading: false,
      updateLoading: false,
      roles
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
      self.fetchLoading = true;
      let data = {
        id: self.$props.id
      };
      this.$store.dispatch("users/details", data).then((response) => {
        console.log(response);
        self.formData = {
          ...response.data,
          updated_at: moment(response.data.updated_at).format(
            "YYYY-MM-DD"
          ),
          created_at: moment(response.data.created_at).format(
            "YYYY-MM-DD"
          )
        };
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
      let data = {
        ...self.formData,
        id: self.$props.id
      };
      this.$store.dispatch("users/update", data).then((response) => {
        self.formData = response.data.data;
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
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Snackbar = resolveComponent("Snackbar");
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButton = resolveComponent("CButton");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Snackbar, null, null, _parent));
  _push(ssrRenderComponent(_component_CCard, { class: "border-0" }, {
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
              _push3(`<form data-v-8da01b70${_scopeId2}>`);
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
                            modelValue: $data.formData.phone,
                            "onUpdate:modelValue": ($event) => $data.formData.phone = $event,
                            label: _ctx.$t("phone"),
                            error: $data.errors.phone ? true : false,
                            "error-messages": $data.errors.phone,
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
                              outlined: "",
                              dense: "",
                              clearable: ""
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
                            modelValue: $data.formData.email,
                            "onUpdate:modelValue": ($event) => $data.formData.email = $event,
                            label: _ctx.$t("email"),
                            error: $data.errors.email ? true : false,
                            "error-messages": $data.errors.email,
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
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
                            modelValue: $data.formData.phone,
                            "onUpdate:modelValue": ($event) => $data.formData.phone = $event,
                            label: _ctx.$t("phone"),
                            error: $data.errors.phone ? true : false,
                            "error-messages": $data.errors.phone,
                            outlined: "",
                            dense: "",
                            clearable: ""
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
                            modelValue: $data.formData.email,
                            "onUpdate:modelValue": ($event) => $data.formData.email = $event,
                            label: _ctx.$t("email"),
                            error: $data.errors.email ? true : false,
                            "error-messages": $data.errors.email,
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
              _push3(ssrRenderComponent(VSelect, {
                modelValue: $data.formData.role,
                "onUpdate:modelValue": ($event) => $data.formData.role = $event,
                items: $data.roles,
                label: _ctx.$t("role"),
                error: $data.errors.role ? true : false,
                "error-messages": $data.errors.role,
                "item-title": "name",
                "item-value": "value",
                required: "",
                outlined: "",
                dense: "",
                "return-object": "",
                disabled: !_ctx.$store.getters.isAdmin
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.formData.updated_at,
                "onUpdate:modelValue": ($event) => $data.formData.updated_at = $event,
                label: _ctx.$t("updatedat"),
                outlined: "",
                dense: "",
                disabled: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.formData.created_at,
                "onUpdate:modelValue": ($event) => $data.formData.created_at = $event,
                label: _ctx.$t("createdat"),
                outlined: "",
                dense: "",
                disabled: ""
              }, null, _parent3, _scopeId2));
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
                createVNode("form", null, [
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
                  createVNode(_component_CRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.formData.phone,
                            "onUpdate:modelValue": ($event) => $data.formData.phone = $event,
                            label: _ctx.$t("phone"),
                            error: $data.errors.phone ? true : false,
                            "error-messages": $data.errors.phone,
                            outlined: "",
                            dense: "",
                            clearable: ""
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
                            modelValue: $data.formData.email,
                            "onUpdate:modelValue": ($event) => $data.formData.email = $event,
                            label: _ctx.$t("email"),
                            error: $data.errors.email ? true : false,
                            "error-messages": $data.errors.email,
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
                  createVNode(VSelect, {
                    modelValue: $data.formData.role,
                    "onUpdate:modelValue": ($event) => $data.formData.role = $event,
                    items: $data.roles,
                    label: _ctx.$t("role"),
                    error: $data.errors.role ? true : false,
                    "error-messages": $data.errors.role,
                    "item-title": "name",
                    "item-value": "value",
                    required: "",
                    outlined: "",
                    dense: "",
                    "return-object": "",
                    disabled: !_ctx.$store.getters.isAdmin
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages", "disabled"]),
                  createVNode(VTextField, {
                    modelValue: $data.formData.updated_at,
                    "onUpdate:modelValue": ($event) => $data.formData.updated_at = $event,
                    label: _ctx.$t("updatedat"),
                    outlined: "",
                    dense: "",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                  createVNode(VTextField, {
                    modelValue: $data.formData.created_at,
                    "onUpdate:modelValue": ($event) => $data.formData.created_at = $event,
                    label: _ctx.$t("createdat"),
                    outlined: "",
                    dense: "",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
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
              createVNode("form", null, [
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
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: "6",
                      sm: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.formData.phone,
                          "onUpdate:modelValue": ($event) => $data.formData.phone = $event,
                          label: _ctx.$t("phone"),
                          error: $data.errors.phone ? true : false,
                          "error-messages": $data.errors.phone,
                          outlined: "",
                          dense: "",
                          clearable: ""
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
                          modelValue: $data.formData.email,
                          "onUpdate:modelValue": ($event) => $data.formData.email = $event,
                          label: _ctx.$t("email"),
                          error: $data.errors.email ? true : false,
                          "error-messages": $data.errors.email,
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
                createVNode(VSelect, {
                  modelValue: $data.formData.role,
                  "onUpdate:modelValue": ($event) => $data.formData.role = $event,
                  items: $data.roles,
                  label: _ctx.$t("role"),
                  error: $data.errors.role ? true : false,
                  "error-messages": $data.errors.role,
                  "item-title": "name",
                  "item-value": "value",
                  required: "",
                  outlined: "",
                  dense: "",
                  "return-object": "",
                  disabled: !_ctx.$store.getters.isAdmin
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages", "disabled"]),
                createVNode(VTextField, {
                  modelValue: $data.formData.updated_at,
                  "onUpdate:modelValue": ($event) => $data.formData.updated_at = $event,
                  label: _ctx.$t("updatedat"),
                  outlined: "",
                  dense: "",
                  disabled: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                createVNode(VTextField, {
                  modelValue: $data.formData.created_at,
                  "onUpdate:modelValue": ($event) => $data.formData.created_at = $event,
                  label: _ctx.$t("createdat"),
                  outlined: "",
                  dense: "",
                  disabled: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
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
  }, _parent));
  _push(`<!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/users/components/UserForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const UserForm = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-8da01b70"]]);
const _sfc_main = {
  name: "UserDetails",
  components: {
    Dialog,
    Snackbar,
    DutyCalendar,
    EmployeeForm,
    PermissionForm,
    UserForm
  },
  data() {
    return {
      loading: false,
      data: {},
      tab: {
        values: [
          this.$t("info"),
          this.$t("employee"),
          this.$t("duty"),
          this.$t("permissions")
        ]
      }
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      let data = {
        id: self.$route.params.id
      };
      this.$store.dispatch("users/details", data).then((response) => {
        self.data = response.data;
        self.loading = false;
      }).catch((error) => {
        self.loading = false;
      });
    },
    isEmployee() {
      if (this.data) {
        return this.data.role === "EMPLOYEE";
      }
      return false;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Snackbar = resolveComponent("Snackbar");
  const _component_Dialog = resolveComponent("Dialog");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CTabs = resolveComponent("CTabs");
  const _component_CTabList = resolveComponent("CTabList");
  const _component_CTab = resolveComponent("CTab");
  const _component_CTabContent = resolveComponent("CTabContent");
  const _component_CTabPanel = resolveComponent("CTabPanel");
  const _component_UserForm = resolveComponent("UserForm");
  const _component_EmployeeForm = resolveComponent("EmployeeForm");
  const _component_DutyCalendar = resolveComponent("DutyCalendar");
  const _component_PermissionForm = resolveComponent("PermissionForm");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Snackbar, null, null, _parent));
  _push(ssrRenderComponent(_component_Dialog, { ref: "dialog" }, null, _parent));
  _push(ssrRenderComponent(_component_CRow, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCol, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CCard, { class: "p-2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VProgressLinear, {
                      active: $data.loading,
                      indeterminate: "",
                      color: "cyan"
                    }, null, _parent4, _scopeId3));
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
                                      if ($options.isEmployee()) {
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
                                        _push7(`<!---->`);
                                      }
                                      if ($options.isEmployee()) {
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
                                        _push7(`<!---->`);
                                      }
                                      _push7(ssrRenderComponent(_component_CTab, { itemKey: 3 }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`${ssrInterpolate($data.tab.values[3].toUpperCase())}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString($data.tab.values[3].toUpperCase()), 1)
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
                                        $options.isEmployee() ? (openBlock(), createBlock(_component_CTab, {
                                          key: 0,
                                          itemKey: 1
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString($data.tab.values[1].toUpperCase()), 1)
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true),
                                        $options.isEmployee() ? (openBlock(), createBlock(_component_CTab, {
                                          key: 1,
                                          itemKey: 2
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString($data.tab.values[2].toUpperCase()), 1)
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true),
                                        createVNode(_component_CTab, { itemKey: 3 }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString($data.tab.values[3].toUpperCase()), 1)
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
                                            _push8(ssrRenderComponent(_component_UserForm, {
                                              id: this.$route.params.id
                                            }, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_UserForm, {
                                                id: this.$route.params.id
                                              }, null, 8, ["id"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                      if ($options.isEmployee()) {
                                        _push7(ssrRenderComponent(_component_CTabPanel, {
                                          class: "p-3",
                                          itemKey: 1
                                        }, {
                                          default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                            if (_push8) {
                                              _push8(ssrRenderComponent(_component_EmployeeForm, {
                                                id: this.$route.params.id
                                              }, null, _parent8, _scopeId7));
                                            } else {
                                              return [
                                                createVNode(_component_EmployeeForm, {
                                                  id: this.$route.params.id
                                                }, null, 8, ["id"])
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent7, _scopeId6));
                                      } else {
                                        _push7(`<!---->`);
                                      }
                                      if ($options.isEmployee()) {
                                        _push7(ssrRenderComponent(_component_CTabPanel, {
                                          class: "p-3",
                                          itemKey: 2
                                        }, {
                                          default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                            if (_push8) {
                                              _push8(ssrRenderComponent(_component_DutyCalendar, {
                                                userId: this.$route.params.id
                                              }, null, _parent8, _scopeId7));
                                            } else {
                                              return [
                                                createVNode(_component_DutyCalendar, {
                                                  userId: this.$route.params.id
                                                }, null, 8, ["userId"])
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent7, _scopeId6));
                                      } else {
                                        _push7(`<!---->`);
                                      }
                                      _push7(ssrRenderComponent(_component_CTabPanel, {
                                        class: "p-3",
                                        itemKey: 3
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_PermissionForm, {
                                              id: this.$route.params.id
                                            }, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_PermissionForm, {
                                                id: this.$route.params.id
                                              }, null, 8, ["id"])
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
                                            createVNode(_component_UserForm, {
                                              id: this.$route.params.id
                                            }, null, 8, ["id"])
                                          ]),
                                          _: 1
                                        }),
                                        $options.isEmployee() ? (openBlock(), createBlock(_component_CTabPanel, {
                                          key: 0,
                                          class: "p-3",
                                          itemKey: 1
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_EmployeeForm, {
                                              id: this.$route.params.id
                                            }, null, 8, ["id"])
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true),
                                        $options.isEmployee() ? (openBlock(), createBlock(_component_CTabPanel, {
                                          key: 1,
                                          class: "p-3",
                                          itemKey: 2
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_DutyCalendar, {
                                              userId: this.$route.params.id
                                            }, null, 8, ["userId"])
                                          ]),
                                          _: 1
                                        })) : createCommentVNode("", true),
                                        createVNode(_component_CTabPanel, {
                                          class: "p-3",
                                          itemKey: 3
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_PermissionForm, {
                                              id: this.$route.params.id
                                            }, null, 8, ["id"])
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
                                      $options.isEmployee() ? (openBlock(), createBlock(_component_CTab, {
                                        key: 0,
                                        itemKey: 1
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString($data.tab.values[1].toUpperCase()), 1)
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      $options.isEmployee() ? (openBlock(), createBlock(_component_CTab, {
                                        key: 1,
                                        itemKey: 2
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString($data.tab.values[2].toUpperCase()), 1)
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      createVNode(_component_CTab, { itemKey: 3 }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString($data.tab.values[3].toUpperCase()), 1)
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
                                          createVNode(_component_UserForm, {
                                            id: this.$route.params.id
                                          }, null, 8, ["id"])
                                        ]),
                                        _: 1
                                      }),
                                      $options.isEmployee() ? (openBlock(), createBlock(_component_CTabPanel, {
                                        key: 0,
                                        class: "p-3",
                                        itemKey: 1
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_EmployeeForm, {
                                            id: this.$route.params.id
                                          }, null, 8, ["id"])
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      $options.isEmployee() ? (openBlock(), createBlock(_component_CTabPanel, {
                                        key: 1,
                                        class: "p-3",
                                        itemKey: 2
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_DutyCalendar, {
                                            userId: this.$route.params.id
                                          }, null, 8, ["userId"])
                                        ]),
                                        _: 1
                                      })) : createCommentVNode("", true),
                                      createVNode(_component_CTabPanel, {
                                        class: "p-3",
                                        itemKey: 3
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_PermissionForm, {
                                            id: this.$route.params.id
                                          }, null, 8, ["id"])
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
                                    $options.isEmployee() ? (openBlock(), createBlock(_component_CTab, {
                                      key: 0,
                                      itemKey: 1
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString($data.tab.values[1].toUpperCase()), 1)
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    $options.isEmployee() ? (openBlock(), createBlock(_component_CTab, {
                                      key: 1,
                                      itemKey: 2
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString($data.tab.values[2].toUpperCase()), 1)
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    createVNode(_component_CTab, { itemKey: 3 }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString($data.tab.values[3].toUpperCase()), 1)
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
                                        createVNode(_component_UserForm, {
                                          id: this.$route.params.id
                                        }, null, 8, ["id"])
                                      ]),
                                      _: 1
                                    }),
                                    $options.isEmployee() ? (openBlock(), createBlock(_component_CTabPanel, {
                                      key: 0,
                                      class: "p-3",
                                      itemKey: 1
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_EmployeeForm, {
                                          id: this.$route.params.id
                                        }, null, 8, ["id"])
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    $options.isEmployee() ? (openBlock(), createBlock(_component_CTabPanel, {
                                      key: 1,
                                      class: "p-3",
                                      itemKey: 2
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_DutyCalendar, {
                                          userId: this.$route.params.id
                                        }, null, 8, ["userId"])
                                      ]),
                                      _: 1
                                    })) : createCommentVNode("", true),
                                    createVNode(_component_CTabPanel, {
                                      class: "p-3",
                                      itemKey: 3
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_PermissionForm, {
                                          id: this.$route.params.id
                                        }, null, 8, ["id"])
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
                      createVNode(VProgressLinear, {
                        active: $data.loading,
                        indeterminate: "",
                        color: "cyan"
                      }, null, 8, ["active"]),
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
                                  $options.isEmployee() ? (openBlock(), createBlock(_component_CTab, {
                                    key: 0,
                                    itemKey: 1
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString($data.tab.values[1].toUpperCase()), 1)
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  $options.isEmployee() ? (openBlock(), createBlock(_component_CTab, {
                                    key: 1,
                                    itemKey: 2
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString($data.tab.values[2].toUpperCase()), 1)
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  createVNode(_component_CTab, { itemKey: 3 }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString($data.tab.values[3].toUpperCase()), 1)
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
                                      createVNode(_component_UserForm, {
                                        id: this.$route.params.id
                                      }, null, 8, ["id"])
                                    ]),
                                    _: 1
                                  }),
                                  $options.isEmployee() ? (openBlock(), createBlock(_component_CTabPanel, {
                                    key: 0,
                                    class: "p-3",
                                    itemKey: 1
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_EmployeeForm, {
                                        id: this.$route.params.id
                                      }, null, 8, ["id"])
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  $options.isEmployee() ? (openBlock(), createBlock(_component_CTabPanel, {
                                    key: 1,
                                    class: "p-3",
                                    itemKey: 2
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_DutyCalendar, {
                                        userId: this.$route.params.id
                                      }, null, 8, ["userId"])
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true),
                                  createVNode(_component_CTabPanel, {
                                    class: "p-3",
                                    itemKey: 3
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_PermissionForm, {
                                        id: this.$route.params.id
                                      }, null, 8, ["id"])
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
                    createVNode(VProgressLinear, {
                      active: $data.loading,
                      indeterminate: "",
                      color: "cyan"
                    }, null, 8, ["active"]),
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
                                $options.isEmployee() ? (openBlock(), createBlock(_component_CTab, {
                                  key: 0,
                                  itemKey: 1
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString($data.tab.values[1].toUpperCase()), 1)
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                $options.isEmployee() ? (openBlock(), createBlock(_component_CTab, {
                                  key: 1,
                                  itemKey: 2
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString($data.tab.values[2].toUpperCase()), 1)
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                createVNode(_component_CTab, { itemKey: 3 }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString($data.tab.values[3].toUpperCase()), 1)
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
                                    createVNode(_component_UserForm, {
                                      id: this.$route.params.id
                                    }, null, 8, ["id"])
                                  ]),
                                  _: 1
                                }),
                                $options.isEmployee() ? (openBlock(), createBlock(_component_CTabPanel, {
                                  key: 0,
                                  class: "p-3",
                                  itemKey: 1
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_EmployeeForm, {
                                      id: this.$route.params.id
                                    }, null, 8, ["id"])
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                $options.isEmployee() ? (openBlock(), createBlock(_component_CTabPanel, {
                                  key: 1,
                                  class: "p-3",
                                  itemKey: 2
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_DutyCalendar, {
                                      userId: this.$route.params.id
                                    }, null, 8, ["userId"])
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                createVNode(_component_CTabPanel, {
                                  class: "p-3",
                                  itemKey: 3
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_PermissionForm, {
                                      id: this.$route.params.id
                                    }, null, 8, ["id"])
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
                  createVNode(VProgressLinear, {
                    active: $data.loading,
                    indeterminate: "",
                    color: "cyan"
                  }, null, 8, ["active"]),
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
                              $options.isEmployee() ? (openBlock(), createBlock(_component_CTab, {
                                key: 0,
                                itemKey: 1
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString($data.tab.values[1].toUpperCase()), 1)
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              $options.isEmployee() ? (openBlock(), createBlock(_component_CTab, {
                                key: 1,
                                itemKey: 2
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString($data.tab.values[2].toUpperCase()), 1)
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              createVNode(_component_CTab, { itemKey: 3 }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString($data.tab.values[3].toUpperCase()), 1)
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
                                  createVNode(_component_UserForm, {
                                    id: this.$route.params.id
                                  }, null, 8, ["id"])
                                ]),
                                _: 1
                              }),
                              $options.isEmployee() ? (openBlock(), createBlock(_component_CTabPanel, {
                                key: 0,
                                class: "p-3",
                                itemKey: 1
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_EmployeeForm, {
                                    id: this.$route.params.id
                                  }, null, 8, ["id"])
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              $options.isEmployee() ? (openBlock(), createBlock(_component_CTabPanel, {
                                key: 1,
                                class: "p-3",
                                itemKey: 2
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_DutyCalendar, {
                                    userId: this.$route.params.id
                                  }, null, 8, ["userId"])
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              createVNode(_component_CTabPanel, {
                                class: "p-3",
                                itemKey: 3
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_PermissionForm, {
                                    id: this.$route.params.id
                                  }, null, 8, ["id"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/users/UserDetails.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UserDetails = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-c4a3666c"]]);
export {
  UserDetails as default
};
//# sourceMappingURL=UserDetails-CALZ8BYd.mjs.map
