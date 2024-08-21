import { _ as _export_sfc, S as Snackbar } from "../app.mjs";
import { resolveComponent, withCtx, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, createVNode, withModifiers, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { VProgressCircular } from "vuetify/lib/components/VProgressCircular/index.mjs";
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
  name: "ForgotPassword",
  components: {
    Snackbar
  },
  data() {
    return {
      email: "",
      errors: {},
      submitting: false
    };
  },
  methods: {
    submit() {
      let self = this;
      if (self.submitting) {
        return;
      }
      self.submitting = true;
      self.$store.dispatch("auth/forgot/password/email", {
        email: self.email
      }).then(function(response) {
        self.submitting = false;
        self.errors = {};
        self.email = "";
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
  const _component_CButton = resolveComponent("CButton");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-2ff7c6f2>`);
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
                    _push4(ssrRenderComponent(_component_CCard, { class: "p-4" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CCardBody, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CForm, {
                                  onSubmit: $options.submit,
                                  method: "POST"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<h1 data-v-2ff7c6f2${_scopeId6}>${ssrInterpolate(_ctx.$t("auth.forgotpassword.title"))}</h1><p class="text-muted" data-v-2ff7c6f2${_scopeId6}>${ssrInterpolate(_ctx.$t("auth.forgotpassword.msg"))}</p>`);
                                      _push7(ssrRenderComponent(VTextField, {
                                        modelValue: $data.email,
                                        "onUpdate:modelValue": ($event) => $data.email = $event,
                                        label: _ctx.$t("email"),
                                        type: "email",
                                        error: $data.errors.email ? true : false,
                                        "error-messages": $data.errors.email,
                                        required: "",
                                        dense: "",
                                        variant: "solo"
                                      }, null, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_CRow, null, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(_component_CCol, {
                                              col: "6",
                                              class: "text-left"
                                            }, {
                                              default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                if (_push9) {
                                                  _push9(ssrRenderComponent(_component_CButton, {
                                                    type: "submit",
                                                    color: "primary",
                                                    class: "px-4"
                                                  }, {
                                                    default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                      if (_push10) {
                                                        if ($data.submitting) {
                                                          _push10(ssrRenderComponent(VProgressCircular, {
                                                            indeterminate: "",
                                                            size: 15
                                                          }, null, _parent10, _scopeId9));
                                                        } else {
                                                          _push10(`<!---->`);
                                                        }
                                                        _push10(` ${ssrInterpolate(_ctx.$t("button.submit"))}`);
                                                      } else {
                                                        return [
                                                          $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                                            key: 0,
                                                            indeterminate: "",
                                                            size: 15
                                                          })) : createCommentVNode("", true),
                                                          createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
                                                        ];
                                                      }
                                                    }),
                                                    _: 1
                                                  }, _parent9, _scopeId8));
                                                } else {
                                                  return [
                                                    createVNode(_component_CButton, {
                                                      type: "submit",
                                                      color: "primary",
                                                      class: "px-4"
                                                    }, {
                                                      default: withCtx(() => [
                                                        $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                                          key: 0,
                                                          indeterminate: "",
                                                          size: 15
                                                        })) : createCommentVNode("", true),
                                                        createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
                                                      ]),
                                                      _: 1
                                                    })
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_CCol, {
                                                col: "6",
                                                class: "text-left"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_CButton, {
                                                    type: "submit",
                                                    color: "primary",
                                                    class: "px-4"
                                                  }, {
                                                    default: withCtx(() => [
                                                      $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                                        key: 0,
                                                        indeterminate: "",
                                                        size: 15
                                                      })) : createCommentVNode("", true),
                                                      createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
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
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode("h1", null, toDisplayString(_ctx.$t("auth.forgotpassword.title")), 1),
                                        createVNode("p", { class: "text-muted" }, toDisplayString(_ctx.$t("auth.forgotpassword.msg")), 1),
                                        createVNode(VTextField, {
                                          modelValue: $data.email,
                                          "onUpdate:modelValue": ($event) => $data.email = $event,
                                          label: _ctx.$t("email"),
                                          type: "email",
                                          error: $data.errors.email ? true : false,
                                          "error-messages": $data.errors.email,
                                          required: "",
                                          dense: "",
                                          variant: "solo"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                        createVNode(_component_CRow, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_CCol, {
                                              col: "6",
                                              class: "text-left"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_CButton, {
                                                  type: "submit",
                                                  color: "primary",
                                                  class: "px-4"
                                                }, {
                                                  default: withCtx(() => [
                                                    $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                                      key: 0,
                                                      indeterminate: "",
                                                      size: 15
                                                    })) : createCommentVNode("", true),
                                                    createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
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
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_CForm, {
                                    onSubmit: withModifiers($options.submit, ["prevent"]),
                                    method: "POST"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("h1", null, toDisplayString(_ctx.$t("auth.forgotpassword.title")), 1),
                                      createVNode("p", { class: "text-muted" }, toDisplayString(_ctx.$t("auth.forgotpassword.msg")), 1),
                                      createVNode(VTextField, {
                                        modelValue: $data.email,
                                        "onUpdate:modelValue": ($event) => $data.email = $event,
                                        label: _ctx.$t("email"),
                                        type: "email",
                                        error: $data.errors.email ? true : false,
                                        "error-messages": $data.errors.email,
                                        required: "",
                                        dense: "",
                                        variant: "solo"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                      createVNode(_component_CRow, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_CCol, {
                                            col: "6",
                                            class: "text-left"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_CButton, {
                                                type: "submit",
                                                color: "primary",
                                                class: "px-4"
                                              }, {
                                                default: withCtx(() => [
                                                  $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                                    key: 0,
                                                    indeterminate: "",
                                                    size: 15
                                                  })) : createCommentVNode("", true),
                                                  createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
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
                                  onSubmit: withModifiers($options.submit, ["prevent"]),
                                  method: "POST"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("h1", null, toDisplayString(_ctx.$t("auth.forgotpassword.title")), 1),
                                    createVNode("p", { class: "text-muted" }, toDisplayString(_ctx.$t("auth.forgotpassword.msg")), 1),
                                    createVNode(VTextField, {
                                      modelValue: $data.email,
                                      "onUpdate:modelValue": ($event) => $data.email = $event,
                                      label: _ctx.$t("email"),
                                      type: "email",
                                      error: $data.errors.email ? true : false,
                                      "error-messages": $data.errors.email,
                                      required: "",
                                      dense: "",
                                      variant: "solo"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                    createVNode(_component_CRow, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_CCol, {
                                          col: "6",
                                          class: "text-left"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_CButton, {
                                              type: "submit",
                                              color: "primary",
                                              class: "px-4"
                                            }, {
                                              default: withCtx(() => [
                                                $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                                  key: 0,
                                                  indeterminate: "",
                                                  size: 15
                                                })) : createCommentVNode("", true),
                                                createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
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
                      createVNode(_component_CCard, { class: "p-4" }, {
                        default: withCtx(() => [
                          createVNode(_component_CCardBody, null, {
                            default: withCtx(() => [
                              createVNode(_component_CForm, {
                                onSubmit: withModifiers($options.submit, ["prevent"]),
                                method: "POST"
                              }, {
                                default: withCtx(() => [
                                  createVNode("h1", null, toDisplayString(_ctx.$t("auth.forgotpassword.title")), 1),
                                  createVNode("p", { class: "text-muted" }, toDisplayString(_ctx.$t("auth.forgotpassword.msg")), 1),
                                  createVNode(VTextField, {
                                    modelValue: $data.email,
                                    "onUpdate:modelValue": ($event) => $data.email = $event,
                                    label: _ctx.$t("email"),
                                    type: "email",
                                    error: $data.errors.email ? true : false,
                                    "error-messages": $data.errors.email,
                                    required: "",
                                    dense: "",
                                    variant: "solo"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                  createVNode(_component_CRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_CCol, {
                                        col: "6",
                                        class: "text-left"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_CButton, {
                                            type: "submit",
                                            color: "primary",
                                            class: "px-4"
                                          }, {
                                            default: withCtx(() => [
                                              $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                                key: 0,
                                                indeterminate: "",
                                                size: 15
                                              })) : createCommentVNode("", true),
                                              createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
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
                    createVNode(_component_CCard, { class: "p-4" }, {
                      default: withCtx(() => [
                        createVNode(_component_CCardBody, null, {
                          default: withCtx(() => [
                            createVNode(_component_CForm, {
                              onSubmit: withModifiers($options.submit, ["prevent"]),
                              method: "POST"
                            }, {
                              default: withCtx(() => [
                                createVNode("h1", null, toDisplayString(_ctx.$t("auth.forgotpassword.title")), 1),
                                createVNode("p", { class: "text-muted" }, toDisplayString(_ctx.$t("auth.forgotpassword.msg")), 1),
                                createVNode(VTextField, {
                                  modelValue: $data.email,
                                  "onUpdate:modelValue": ($event) => $data.email = $event,
                                  label: _ctx.$t("email"),
                                  type: "email",
                                  error: $data.errors.email ? true : false,
                                  "error-messages": $data.errors.email,
                                  required: "",
                                  dense: "",
                                  variant: "solo"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                createVNode(_component_CRow, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_CCol, {
                                      col: "6",
                                      class: "text-left"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_CButton, {
                                          type: "submit",
                                          color: "primary",
                                          class: "px-4"
                                        }, {
                                          default: withCtx(() => [
                                            $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                              key: 0,
                                              indeterminate: "",
                                              size: 15
                                            })) : createCommentVNode("", true),
                                            createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
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
                  createVNode(_component_CCard, { class: "p-4" }, {
                    default: withCtx(() => [
                      createVNode(_component_CCardBody, null, {
                        default: withCtx(() => [
                          createVNode(_component_CForm, {
                            onSubmit: withModifiers($options.submit, ["prevent"]),
                            method: "POST"
                          }, {
                            default: withCtx(() => [
                              createVNode("h1", null, toDisplayString(_ctx.$t("auth.forgotpassword.title")), 1),
                              createVNode("p", { class: "text-muted" }, toDisplayString(_ctx.$t("auth.forgotpassword.msg")), 1),
                              createVNode(VTextField, {
                                modelValue: $data.email,
                                "onUpdate:modelValue": ($event) => $data.email = $event,
                                label: _ctx.$t("email"),
                                type: "email",
                                error: $data.errors.email ? true : false,
                                "error-messages": $data.errors.email,
                                required: "",
                                dense: "",
                                variant: "solo"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                              createVNode(_component_CRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CCol, {
                                    col: "6",
                                    class: "text-left"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_CButton, {
                                        type: "submit",
                                        color: "primary",
                                        class: "px-4"
                                      }, {
                                        default: withCtx(() => [
                                          $data.submitting ? (openBlock(), createBlock(VProgressCircular, {
                                            key: 0,
                                            indeterminate: "",
                                            size: 15
                                          })) : createCommentVNode("", true),
                                          createTextVNode(" " + toDisplayString(_ctx.$t("button.submit")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/auth/ForgotPassword.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ForgotPassword = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-2ff7c6f2"]]);
export {
  ForgotPassword as default
};
