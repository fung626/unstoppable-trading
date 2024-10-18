import { resolveComponent, withCtx, openBlock, createBlock, createCommentVNode, createTextVNode, toDisplayString, useSSRContext, mergeProps, createVNode } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc, r as roles } from "../app.mjs";
import { VProgressCircular } from "vuetify/lib/components/VProgressCircular/index.mjs";
import { VTextField } from "vuetify/lib/components/VTextField/index.mjs";
import { mapState } from "vuex";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
import { VSelect } from "vuetify/lib/components/VSelect/index.mjs";
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
  name: "PasswordForm",
  data() {
    return {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      errors: {},
      loading: false
    };
  },
  watch: {},
  methods: {
    update() {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      let data = {
        old_password: self.oldPassword,
        new_password: self.newPassword,
        confirm_password: self.confirmPassword
      };
      this.$store.dispatch("profile/password/update", data).then((response) => {
        self.oldPassword = "";
        self.newPassword = "";
        self.confirmPassword = "";
        self.errors = {};
        self.loading = false;
      }).catch((error) => {
        var _a;
        self.errors = (_a = error.response.data) == null ? void 0 : _a.data;
        self.loading = false;
      });
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CButton = resolveComponent("CButton");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-8010ef54><form data-v-8010ef54>`);
  _push(ssrRenderComponent(VTextField, {
    modelValue: $data.oldPassword,
    "onUpdate:modelValue": ($event) => $data.oldPassword = $event,
    label: _ctx.$t("oldpassword"),
    type: "password",
    error: $data.errors.old_password ? true : false,
    "error-messages": $data.errors.old_password,
    required: "",
    outlined: "",
    dense: ""
  }, null, _parent));
  _push(ssrRenderComponent(VTextField, {
    modelValue: $data.newPassword,
    "onUpdate:modelValue": ($event) => $data.newPassword = $event,
    label: _ctx.$t("newpassword"),
    error: $data.errors.new_password ? true : false,
    "error-messages": $data.errors.new_password,
    type: "password",
    required: "",
    outlined: "",
    dense: ""
  }, null, _parent));
  _push(ssrRenderComponent(VTextField, {
    modelValue: $data.confirmPassword,
    "onUpdate:modelValue": ($event) => $data.confirmPassword = $event,
    label: _ctx.$t("confirmpassword"),
    error: $data.errors.confirm_password ? true : false,
    "error-messages": $data.errors.confirm_password,
    type: "password",
    required: "",
    outlined: "",
    dense: ""
  }, null, _parent));
  _push(ssrRenderComponent(_component_CButton, {
    onClick: $options.update,
    color: "primary",
    class: "px-4"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if ($data.loading) {
          _push2(ssrRenderComponent(VProgressCircular, {
            indeterminate: "",
            size: 15
          }, null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        _push2(` ${ssrInterpolate(_ctx.$t("button.update"))}`);
      } else {
        return [
          $data.loading ? (openBlock(), createBlock(VProgressCircular, {
            key: 0,
            indeterminate: "",
            size: 15
          })) : createCommentVNode("", true),
          createTextVNode(" " + toDisplayString(_ctx.$t("button.update")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</form></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/profile/components/PasswordForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const PasswordForm = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-8010ef54"]]);
const _sfc_main$1 = {
  name: "ProfileInfoForm",
  computed: {
    ...mapState(["profile"]),
    formData() {
      return JSON.parse(JSON.stringify(this.profile.data));
    }
  },
  data() {
    return {
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
      this.$store.dispatch("profile/get").then((response) => {
        console.log(response);
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
      this.$store.dispatch("profile/update", this.formData).then((response) => {
        self.updateLoading = false;
        self.errors = {};
      }).catch((error) => {
        var _a;
        self.updateLoading = false;
        self.errors = (_a = error.response.data) == null ? void 0 : _a.data;
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
              _push3(`<form data-v-e856deb9${_scopeId2}>`);
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $options.formData.name,
                "onUpdate:modelValue": ($event) => $options.formData.name = $event,
                error: $data.errors.name ? true : false,
                "error-messages": $data.errors.name,
                label: _ctx.$t("name"),
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
                            modelValue: $options.formData.phone,
                            "onUpdate:modelValue": ($event) => $options.formData.phone = $event,
                            error: $data.errors.phone ? true : false,
                            "error-messages": $data.errors.phone,
                            label: _ctx.$t("phone"),
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $options.formData.phone,
                              "onUpdate:modelValue": ($event) => $options.formData.phone = $event,
                              error: $data.errors.phone ? true : false,
                              "error-messages": $data.errors.phone,
                              label: _ctx.$t("phone"),
                              outlined: "",
                              dense: "",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "error", "error-messages", "label"])
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
                            modelValue: $options.formData.email,
                            "onUpdate:modelValue": ($event) => $options.formData.email = $event,
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
                              modelValue: $options.formData.email,
                              "onUpdate:modelValue": ($event) => $options.formData.email = $event,
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
                            modelValue: $options.formData.phone,
                            "onUpdate:modelValue": ($event) => $options.formData.phone = $event,
                            error: $data.errors.phone ? true : false,
                            "error-messages": $data.errors.phone,
                            label: _ctx.$t("phone"),
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error", "error-messages", "label"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $options.formData.email,
                            "onUpdate:modelValue": ($event) => $options.formData.email = $event,
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
                modelValue: $options.formData.role,
                "onUpdate:modelValue": ($event) => $options.formData.role = $event,
                items: $data.roles,
                label: _ctx.$t("role"),
                error: $data.errors.role ? true : false,
                "error-messages": $data.errors.role,
                "item-title": "name",
                "item-value": "value",
                required: "",
                outlined: "",
                dense: "",
                disabled: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $options.formData.updated_at,
                "onUpdate:modelValue": ($event) => $options.formData.updated_at = $event,
                label: _ctx.$t("updatedat"),
                outlined: "",
                dense: "",
                disabled: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $options.formData.created_at,
                "onUpdate:modelValue": ($event) => $options.formData.created_at = $event,
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
                    modelValue: $options.formData.name,
                    "onUpdate:modelValue": ($event) => $options.formData.name = $event,
                    error: $data.errors.name ? true : false,
                    "error-messages": $data.errors.name,
                    label: _ctx.$t("name"),
                    required: "",
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "error", "error-messages", "label"]),
                  createVNode(_component_CRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $options.formData.phone,
                            "onUpdate:modelValue": ($event) => $options.formData.phone = $event,
                            error: $data.errors.phone ? true : false,
                            "error-messages": $data.errors.phone,
                            label: _ctx.$t("phone"),
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "error", "error-messages", "label"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $options.formData.email,
                            "onUpdate:modelValue": ($event) => $options.formData.email = $event,
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
                    modelValue: $options.formData.role,
                    "onUpdate:modelValue": ($event) => $options.formData.role = $event,
                    items: $data.roles,
                    label: _ctx.$t("role"),
                    error: $data.errors.role ? true : false,
                    "error-messages": $data.errors.role,
                    "item-title": "name",
                    "item-value": "value",
                    required: "",
                    outlined: "",
                    dense: "",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                  createVNode(VTextField, {
                    modelValue: $options.formData.updated_at,
                    "onUpdate:modelValue": ($event) => $options.formData.updated_at = $event,
                    label: _ctx.$t("updatedat"),
                    outlined: "",
                    dense: "",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                  createVNode(VTextField, {
                    modelValue: $options.formData.created_at,
                    "onUpdate:modelValue": ($event) => $options.formData.created_at = $event,
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
                  modelValue: $options.formData.name,
                  "onUpdate:modelValue": ($event) => $options.formData.name = $event,
                  error: $data.errors.name ? true : false,
                  "error-messages": $data.errors.name,
                  label: _ctx.$t("name"),
                  required: "",
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "error", "error-messages", "label"]),
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: "6",
                      sm: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $options.formData.phone,
                          "onUpdate:modelValue": ($event) => $options.formData.phone = $event,
                          error: $data.errors.phone ? true : false,
                          "error-messages": $data.errors.phone,
                          label: _ctx.$t("phone"),
                          outlined: "",
                          dense: "",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "error", "error-messages", "label"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: "6",
                      sm: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $options.formData.email,
                          "onUpdate:modelValue": ($event) => $options.formData.email = $event,
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
                  modelValue: $options.formData.role,
                  "onUpdate:modelValue": ($event) => $options.formData.role = $event,
                  items: $data.roles,
                  label: _ctx.$t("role"),
                  error: $data.errors.role ? true : false,
                  "error-messages": $data.errors.role,
                  "item-title": "name",
                  "item-value": "value",
                  required: "",
                  outlined: "",
                  dense: "",
                  disabled: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                createVNode(VTextField, {
                  modelValue: $options.formData.updated_at,
                  "onUpdate:modelValue": ($event) => $options.formData.updated_at = $event,
                  label: _ctx.$t("updatedat"),
                  outlined: "",
                  dense: "",
                  disabled: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                createVNode(VTextField, {
                  modelValue: $options.formData.created_at,
                  "onUpdate:modelValue": ($event) => $options.formData.created_at = $event,
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
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/profile/components/ProfileInfoForm.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ProfileInfoForm = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-e856deb9"]]);
const _sfc_main = {
  name: "Profile",
  components: {
    ProfileInfoForm,
    PasswordForm
  },
  data() {
    return {
      tab: {
        values: [this.$t("info"), this.$t("password")],
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
  const _component_ProfileInfoForm = resolveComponent("ProfileInfoForm");
  const _component_PasswordForm = resolveComponent("PasswordForm");
  _push(ssrRenderComponent(_component_CRow, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCol, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CCard, { class: "p-4" }, {
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
                                            _push8(ssrRenderComponent(_component_ProfileInfoForm, null, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_ProfileInfoForm)
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
                                            _push8(ssrRenderComponent(_component_PasswordForm, null, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(_component_PasswordForm)
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
                                            createVNode(_component_ProfileInfoForm)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_CTabPanel, {
                                          class: "p-3",
                                          itemKey: 1
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_PasswordForm)
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
                                          createVNode(_component_ProfileInfoForm)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_CTabPanel, {
                                        class: "p-3",
                                        itemKey: 1
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_PasswordForm)
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
                                        createVNode(_component_ProfileInfoForm)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_CTabPanel, {
                                      class: "p-3",
                                      itemKey: 1
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_PasswordForm)
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
                                      createVNode(_component_ProfileInfoForm)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CTabPanel, {
                                    class: "p-3",
                                    itemKey: 1
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_PasswordForm)
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
                createVNode(_component_CCard, { class: "p-4" }, {
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
                                    createVNode(_component_ProfileInfoForm)
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CTabPanel, {
                                  class: "p-3",
                                  itemKey: 1
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_PasswordForm)
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
              createVNode(_component_CCard, { class: "p-4" }, {
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
                                  createVNode(_component_ProfileInfoForm)
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CTabPanel, {
                                class: "p-3",
                                itemKey: 1
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_PasswordForm)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/profile/Profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Profile as default
};
//# sourceMappingURL=Profile-BuYFDHAD.mjs.map
