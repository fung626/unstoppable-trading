import { _ as _export_sfc, a as Dialog, S as Snackbar, r as roles } from "../app.mjs";
import { resolveComponent, withCtx, createVNode, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, useSSRContext } from "vue";
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
  name: "CreateUser",
  components: { Dialog, Snackbar },
  data() {
    return {
      name: "",
      phone: "",
      email: "",
      password: "",
      role: "",
      errors: {},
      loading: false,
      passwordVisible: false,
      roles
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
        name: self.name,
        email: self.email,
        phone: self.phone,
        password: self.password,
        role: self.role
      };
      this.$store.dispatch("users/create", data).then((response) => {
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
  const _component_Snackbar = resolveComponent("Snackbar");
  const _component_Dialog = resolveComponent("Dialog");
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButton = resolveComponent("CButton");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Snackbar, null, null, _parent));
  _push(ssrRenderComponent(_component_Dialog, { ref: "dialog" }, null, _parent));
  _push(ssrRenderComponent(_component_CCard, { class: "p-4" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCardBody, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<h4 data-v-c2e670b1${_scopeId2}>${ssrInterpolate(_ctx.$t("create"))}</h4><hr data-v-c2e670b1${_scopeId2}><form data-v-c2e670b1${_scopeId2}>`);
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
                            modelValue: $data.phone,
                            "onUpdate:modelValue": ($event) => $data.phone = $event,
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
                              modelValue: $data.phone,
                              "onUpdate:modelValue": ($event) => $data.phone = $event,
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
                            modelValue: $data.email,
                            "onUpdate:modelValue": ($event) => $data.email = $event,
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
                              modelValue: $data.email,
                              "onUpdate:modelValue": ($event) => $data.email = $event,
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
                            modelValue: $data.phone,
                            "onUpdate:modelValue": ($event) => $data.phone = $event,
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
                            modelValue: $data.email,
                            "onUpdate:modelValue": ($event) => $data.email = $event,
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
                modelValue: $data.role,
                "onUpdate:modelValue": ($event) => $data.role = $event,
                items: $data.roles,
                label: _ctx.$t("role"),
                error: $data.errors.role ? true : false,
                "error-messages": $data.errors.role,
                "item-title": "name",
                "item-value": "value",
                required: "",
                outlined: "",
                dense: ""
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
                  createVNode(_component_CRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.phone,
                            "onUpdate:modelValue": ($event) => $data.phone = $event,
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
                            modelValue: $data.email,
                            "onUpdate:modelValue": ($event) => $data.email = $event,
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
                    modelValue: $data.role,
                    "onUpdate:modelValue": ($event) => $data.role = $event,
                    items: $data.roles,
                    label: _ctx.$t("role"),
                    error: $data.errors.role ? true : false,
                    "error-messages": $data.errors.role,
                    "item-title": "name",
                    "item-value": "value",
                    required: "",
                    outlined: "",
                    dense: ""
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
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: "6",
                      sm: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.phone,
                          "onUpdate:modelValue": ($event) => $data.phone = $event,
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
                          modelValue: $data.email,
                          "onUpdate:modelValue": ($event) => $data.email = $event,
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
                  modelValue: $data.role,
                  "onUpdate:modelValue": ($event) => $data.role = $event,
                  items: $data.roles,
                  label: _ctx.$t("role"),
                  error: $data.errors.role ? true : false,
                  "error-messages": $data.errors.role,
                  "item-title": "name",
                  "item-value": "value",
                  required: "",
                  outlined: "",
                  dense: ""
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
  _push(`<!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/users/CreateUser.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CreateUser = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-c2e670b1"]]);
export {
  CreateUser as default
};
//# sourceMappingURL=CreateUser-BWlfwZwP.mjs.map
