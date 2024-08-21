import { _ as _export_sfc, S as Snackbar } from "../app.mjs";
import { resolveComponent, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, createTextVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
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
import "vuex";
import "uuid";
import "vuetify/lib/components/VCard/index.mjs";
import "vuetify/lib/components/VDialog/index.mjs";
import "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import "vuetify";
import "vuetify/lib/components/VDataTable/index.mjs";
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
  name: "ResetPassword",
  components: {
    Snackbar
  },
  data() {
    return {
      errors: {},
      fetching: false,
      submitting: false,
      password: null,
      confirmPassword: null
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      let self = this;
      if (self.fetching) {
        return;
      }
      let data = {
        id: self.$route.params.id,
        token: self.$route.params.token
      };
      self.fetching = true;
      self.$store.dispatch("auth/forgot/password/find", data).then(function(response) {
        self.fetching = false;
      }).catch((error) => {
        var _a;
        self.fetching = false;
        self.errors = (_a = error.response.data) == null ? void 0 : _a.data;
      });
    },
    submit() {
      let self = this;
      if (self.submitting) {
        return;
      }
      let data = {
        id: this.$route.params.id,
        token: this.$route.params.token,
        password: self.password,
        confirm_password: self.confirmPassword
      };
      self.submitting = true;
      self.$store.dispatch("auth/forgot/password/reset", data).then(function(response) {
        self.submitting = false;
        self.errors = {};
        self.$store.dispatch("snackbar/show", {
          text: self.$t("auth.resetpassword.success")
        });
        self.$router.push({ name: "Login" });
      }).catch((error) => {
        var _a;
        self.submitting = false;
        self.errors = (_a = error.response.data) == null ? void 0 : _a.data;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Snackbar = resolveComponent("Snackbar");
  const _component_CContainer = resolveComponent("CContainer");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CForm = resolveComponent("CForm");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-33f0de70>`);
  _push(ssrRenderComponent(_component_Snackbar, null, null, _parent));
  _push(ssrRenderComponent(_component_CContainer, { class: "c-app flex-row align-items-center" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CRow, { class: "justify-content-center" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CCol, { md: "8" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VProgressLinear, {
                      active: $data.fetching,
                      indeterminate: "",
                      color: "cyan"
                    }, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCard, { class: "p-4" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CCardBody, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CForm, {
                                  autocomplete: "off",
                                  onSubmit: $options.submit,
                                  method: "POST"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<h1 data-v-33f0de70${_scopeId6}>${ssrInterpolate(_ctx.$t("resetpassword"))}</h1><p data-v-33f0de70${_scopeId6}></p>`);
                                      _push7(ssrRenderComponent(VTextField, {
                                        modelValue: $data.password,
                                        "onUpdate:modelValue": ($event) => $data.password = $event,
                                        label: _ctx.$t("password"),
                                        type: "password",
                                        error: $data.errors.password ? true : false,
                                        "error-messages": $data.errors.password,
                                        required: "",
                                        outlined: "",
                                        dense: ""
                                      }, null, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(VTextField, {
                                        modelValue: $data.confirmPassword,
                                        "onUpdate:modelValue": ($event) => $data.confirmPassword = $event,
                                        label: _ctx.$t("confirmpassword"),
                                        type: "password",
                                        error: $data.errors.confirm_password ? true : false,
                                        "error-messages": $data.errors.confirm_password,
                                        required: "",
                                        outlined: "",
                                        dense: ""
                                      }, null, _parent7, _scopeId6));
                                      _push7(`<button type="submit" class="btn btn-primary" data-v-33f0de70${_scopeId6}>`);
                                      if ($data.submitting) {
                                        _push7(ssrRenderComponent(VProgressCircular, {
                                          indeterminate: "",
                                          size: 15
                                        }, null, _parent7, _scopeId6));
                                      } else {
                                        _push7(`<!---->`);
                                      }
                                      _push7(` ${ssrInterpolate(_ctx.$t("button.submit"))}</button>`);
                                    } else {
                                      return [
                                        createVNode("h1", null, toDisplayString(_ctx.$t("resetpassword")), 1),
                                        createVNode("p"),
                                        createVNode(VTextField, {
                                          modelValue: $data.password,
                                          "onUpdate:modelValue": ($event) => $data.password = $event,
                                          label: _ctx.$t("password"),
                                          type: "password",
                                          error: $data.errors.password ? true : false,
                                          "error-messages": $data.errors.password,
                                          required: "",
                                          outlined: "",
                                          dense: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                        createVNode(VTextField, {
                                          modelValue: $data.confirmPassword,
                                          "onUpdate:modelValue": ($event) => $data.confirmPassword = $event,
                                          label: _ctx.$t("confirmpassword"),
                                          type: "password",
                                          error: $data.errors.confirm_password ? true : false,
                                          "error-messages": $data.errors.confirm_password,
                                          required: "",
                                          outlined: "",
                                          dense: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                        createVNode("button", {
                                          type: "submit",
                                          class: "btn btn-primary"
                                        }, [
                                          $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                            key: 0,
                                            indeterminate: "",
                                            size: 15
                                          })) : createCommentVNode("", true),
                                          createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_CForm, {
                                    autocomplete: "off",
                                    onSubmit: withModifiers($options.submit, ["prevent"]),
                                    method: "POST"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("h1", null, toDisplayString(_ctx.$t("resetpassword")), 1),
                                      createVNode("p"),
                                      createVNode(VTextField, {
                                        modelValue: $data.password,
                                        "onUpdate:modelValue": ($event) => $data.password = $event,
                                        label: _ctx.$t("password"),
                                        type: "password",
                                        error: $data.errors.password ? true : false,
                                        "error-messages": $data.errors.password,
                                        required: "",
                                        outlined: "",
                                        dense: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                      createVNode(VTextField, {
                                        modelValue: $data.confirmPassword,
                                        "onUpdate:modelValue": ($event) => $data.confirmPassword = $event,
                                        label: _ctx.$t("confirmpassword"),
                                        type: "password",
                                        error: $data.errors.confirm_password ? true : false,
                                        "error-messages": $data.errors.confirm_password,
                                        required: "",
                                        outlined: "",
                                        dense: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                      createVNode("button", {
                                        type: "submit",
                                        class: "btn btn-primary"
                                      }, [
                                        $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                          key: 0,
                                          indeterminate: "",
                                          size: 15
                                        })) : createCommentVNode("", true),
                                        createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
                                      ])
                                    ]),
                                    _: 1
                                  }, 8, ["onSubmit"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CCardBody, null, {
                              default: withCtx(() => [
                                createVNode(_component_CForm, {
                                  autocomplete: "off",
                                  onSubmit: withModifiers($options.submit, ["prevent"]),
                                  method: "POST"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("h1", null, toDisplayString(_ctx.$t("resetpassword")), 1),
                                    createVNode("p"),
                                    createVNode(VTextField, {
                                      modelValue: $data.password,
                                      "onUpdate:modelValue": ($event) => $data.password = $event,
                                      label: _ctx.$t("password"),
                                      type: "password",
                                      error: $data.errors.password ? true : false,
                                      "error-messages": $data.errors.password,
                                      required: "",
                                      outlined: "",
                                      dense: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                    createVNode(VTextField, {
                                      modelValue: $data.confirmPassword,
                                      "onUpdate:modelValue": ($event) => $data.confirmPassword = $event,
                                      label: _ctx.$t("confirmpassword"),
                                      type: "password",
                                      error: $data.errors.confirm_password ? true : false,
                                      "error-messages": $data.errors.confirm_password,
                                      required: "",
                                      outlined: "",
                                      dense: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                    createVNode("button", {
                                      type: "submit",
                                      class: "btn btn-primary"
                                    }, [
                                      $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                        key: 0,
                                        indeterminate: "",
                                        size: 15
                                      })) : createCommentVNode("", true),
                                      createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["onSubmit"])
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
                        active: $data.fetching,
                        indeterminate: "",
                        color: "cyan"
                      }, null, 8, ["active"]),
                      createVNode(_component_CCard, { class: "p-4" }, {
                        default: withCtx(() => [
                          createVNode(_component_CCardBody, null, {
                            default: withCtx(() => [
                              createVNode(_component_CForm, {
                                autocomplete: "off",
                                onSubmit: withModifiers($options.submit, ["prevent"]),
                                method: "POST"
                              }, {
                                default: withCtx(() => [
                                  createVNode("h1", null, toDisplayString(_ctx.$t("resetpassword")), 1),
                                  createVNode("p"),
                                  createVNode(VTextField, {
                                    modelValue: $data.password,
                                    "onUpdate:modelValue": ($event) => $data.password = $event,
                                    label: _ctx.$t("password"),
                                    type: "password",
                                    error: $data.errors.password ? true : false,
                                    "error-messages": $data.errors.password,
                                    required: "",
                                    outlined: "",
                                    dense: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                  createVNode(VTextField, {
                                    modelValue: $data.confirmPassword,
                                    "onUpdate:modelValue": ($event) => $data.confirmPassword = $event,
                                    label: _ctx.$t("confirmpassword"),
                                    type: "password",
                                    error: $data.errors.confirm_password ? true : false,
                                    "error-messages": $data.errors.confirm_password,
                                    required: "",
                                    outlined: "",
                                    dense: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                  createVNode("button", {
                                    type: "submit",
                                    class: "btn btn-primary"
                                  }, [
                                    $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                      key: 0,
                                      indeterminate: "",
                                      size: 15
                                    })) : createCommentVNode("", true),
                                    createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
                                  ])
                                ]),
                                _: 1
                              }, 8, ["onSubmit"])
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
                createVNode(_component_CCol, { md: "8" }, {
                  default: withCtx(() => [
                    createVNode(VProgressLinear, {
                      active: $data.fetching,
                      indeterminate: "",
                      color: "cyan"
                    }, null, 8, ["active"]),
                    createVNode(_component_CCard, { class: "p-4" }, {
                      default: withCtx(() => [
                        createVNode(_component_CCardBody, null, {
                          default: withCtx(() => [
                            createVNode(_component_CForm, {
                              autocomplete: "off",
                              onSubmit: withModifiers($options.submit, ["prevent"]),
                              method: "POST"
                            }, {
                              default: withCtx(() => [
                                createVNode("h1", null, toDisplayString(_ctx.$t("resetpassword")), 1),
                                createVNode("p"),
                                createVNode(VTextField, {
                                  modelValue: $data.password,
                                  "onUpdate:modelValue": ($event) => $data.password = $event,
                                  label: _ctx.$t("password"),
                                  type: "password",
                                  error: $data.errors.password ? true : false,
                                  "error-messages": $data.errors.password,
                                  required: "",
                                  outlined: "",
                                  dense: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                createVNode(VTextField, {
                                  modelValue: $data.confirmPassword,
                                  "onUpdate:modelValue": ($event) => $data.confirmPassword = $event,
                                  label: _ctx.$t("confirmpassword"),
                                  type: "password",
                                  error: $data.errors.confirm_password ? true : false,
                                  "error-messages": $data.errors.confirm_password,
                                  required: "",
                                  outlined: "",
                                  dense: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                createVNode("button", {
                                  type: "submit",
                                  class: "btn btn-primary"
                                }, [
                                  $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                    key: 0,
                                    indeterminate: "",
                                    size: 15
                                  })) : createCommentVNode("", true),
                                  createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
                                ])
                              ]),
                              _: 1
                            }, 8, ["onSubmit"])
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
          createVNode(_component_CRow, { class: "justify-content-center" }, {
            default: withCtx(() => [
              createVNode(_component_CCol, { md: "8" }, {
                default: withCtx(() => [
                  createVNode(VProgressLinear, {
                    active: $data.fetching,
                    indeterminate: "",
                    color: "cyan"
                  }, null, 8, ["active"]),
                  createVNode(_component_CCard, { class: "p-4" }, {
                    default: withCtx(() => [
                      createVNode(_component_CCardBody, null, {
                        default: withCtx(() => [
                          createVNode(_component_CForm, {
                            autocomplete: "off",
                            onSubmit: withModifiers($options.submit, ["prevent"]),
                            method: "POST"
                          }, {
                            default: withCtx(() => [
                              createVNode("h1", null, toDisplayString(_ctx.$t("resetpassword")), 1),
                              createVNode("p"),
                              createVNode(VTextField, {
                                modelValue: $data.password,
                                "onUpdate:modelValue": ($event) => $data.password = $event,
                                label: _ctx.$t("password"),
                                type: "password",
                                error: $data.errors.password ? true : false,
                                "error-messages": $data.errors.password,
                                required: "",
                                outlined: "",
                                dense: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                              createVNode(VTextField, {
                                modelValue: $data.confirmPassword,
                                "onUpdate:modelValue": ($event) => $data.confirmPassword = $event,
                                label: _ctx.$t("confirmpassword"),
                                type: "password",
                                error: $data.errors.confirm_password ? true : false,
                                "error-messages": $data.errors.confirm_password,
                                required: "",
                                outlined: "",
                                dense: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                              createVNode("button", {
                                type: "submit",
                                class: "btn btn-primary"
                              }, [
                                $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                  key: 0,
                                  indeterminate: "",
                                  size: 15
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
                              ])
                            ]),
                            _: 1
                          }, 8, ["onSubmit"])
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
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/auth/ResetPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ResetPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-33f0de70"]]);
export {
  ResetPassword as default
};
