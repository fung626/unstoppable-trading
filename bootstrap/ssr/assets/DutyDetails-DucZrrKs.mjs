import { _ as _export_sfc, a as DutyCalendar, T as TextFieldColorPicker } from "../app.mjs";
import { resolveComponent, withCtx, mergeProps, toHandlers, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { VDatePicker } from "vuetify/lib/components/VDatePicker/index.mjs";
import { VMenu } from "vuetify/lib/components/VMenu/index.mjs";
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
import "vuetify/lib/components/VIcon/index.mjs";
import "vuetify/lib/components/VColorPicker/index.mjs";
import "vuetify/components";
import "vuetify/directives";
import "vuetify/labs/components";
import "vue-router";
import "simplebar-vue";
import "secure-ls";
import "vuex-persistedstate";
import "axios";
import "query-string";
const _sfc_main = {
  name: "DutyDetails",
  components: {
    DutyCalendar,
    TextFieldColorPicker
  },
  data() {
    return {
      formData: {
        user: {}
      },
      errors: {},
      dateMenu: false,
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
        id: self.$route.params.id
      };
      this.$store.dispatch("users/duty/details", data).then((response) => {
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
      console.log(self.formData);
      this.$store.dispatch("users/duty/update", self.formData).then((response) => {
        self.formData = JSON.parse(JSON.stringify(response.data));
        self.updateLoading = false;
      }).catch((error) => {
        self.updateLoading = false;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DutyCalendar = resolveComponent("DutyCalendar");
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_TextFieldColorPicker = resolveComponent("TextFieldColorPicker");
  const _component_CButton = resolveComponent("CButton");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-fb0abc3f>`);
  if ($data.formData.user.id) {
    _push(ssrRenderComponent(_component_DutyCalendar, {
      userId: $data.formData.user.id
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent(_component_CCard, { class: "p-4 my-4" }, {
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
              _push3(`<h4 data-v-fb0abc3f${_scopeId2}>${ssrInterpolate(_ctx.$t("details"))}</h4><hr data-v-fb0abc3f${_scopeId2}><form data-v-fb0abc3f${_scopeId2}>`);
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.formData.user.name,
                "onUpdate:modelValue": ($event) => $data.formData.user.name = $event,
                label: _ctx.$t("user"),
                outlined: "",
                dense: "",
                disabled: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VMenu, {
                modelValue: $data.dateMenu,
                "onUpdate:modelValue": ($event) => $data.dateMenu = $event,
                "close-on-content-click": false,
                "nudge-right": 40,
                transition: "scale-transition",
                "offset-y": "",
                "min-width": "auto"
              }, {
                activator: withCtx(({ on, attrs }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField, mergeProps({
                      modelValue: $data.formData.date,
                      "onUpdate:modelValue": ($event) => $data.formData.date = $event,
                      label: _ctx.$t("date"),
                      outlined: "",
                      dense: "",
                      clearable: "",
                      readonly: ""
                    }, attrs, toHandlers(on), {
                      error: $data.errors.date ? true : false,
                      "error-messages": $data.errors.date
                    }), null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField, mergeProps({
                        modelValue: $data.formData.date,
                        "onUpdate:modelValue": ($event) => $data.formData.date = $event,
                        label: _ctx.$t("date"),
                        outlined: "",
                        dense: "",
                        clearable: "",
                        readonly: ""
                      }, attrs, toHandlers(on), {
                        error: $data.errors.date ? true : false,
                        "error-messages": $data.errors.date
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                    ];
                  }
                }),
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VDatePicker, {
                      modelValue: $data.formData.date,
                      "onUpdate:modelValue": ($event) => $data.formData.date = $event,
                      onInput: ($event) => $data.dateMenu = false
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VDatePicker, {
                        modelValue: $data.formData.date,
                        "onUpdate:modelValue": ($event) => $data.formData.date = $event,
                        onInput: ($event) => $data.dateMenu = false
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
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
                          _push5(ssrRenderComponent(VTextField, {
                            modelValue: $data.formData.formatted_start,
                            "onUpdate:modelValue": ($event) => $data.formData.formatted_start = $event,
                            label: _ctx.$t("start"),
                            error: $data.errors.formatted_start ? true : false,
                            "error-messages": $data.errors.formatted_start,
                            type: "time",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.formData.formatted_start,
                              "onUpdate:modelValue": ($event) => $data.formData.formatted_start = $event,
                              label: _ctx.$t("start"),
                              error: $data.errors.formatted_start ? true : false,
                              "error-messages": $data.errors.formatted_start,
                              type: "time",
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
                            modelValue: $data.formData.formatted_end,
                            "onUpdate:modelValue": ($event) => $data.formData.formatted_end = $event,
                            label: _ctx.$t("end"),
                            error: $data.errors.formatted_end ? true : false,
                            "error-messages": $data.errors.formatted_end,
                            type: "time",
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.formData.formatted_end,
                              "onUpdate:modelValue": ($event) => $data.formData.formatted_end = $event,
                              label: _ctx.$t("end"),
                              error: $data.errors.formatted_end ? true : false,
                              "error-messages": $data.errors.formatted_end,
                              type: "time",
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
                            modelValue: $data.formData.formatted_start,
                            "onUpdate:modelValue": ($event) => $data.formData.formatted_start = $event,
                            label: _ctx.$t("start"),
                            error: $data.errors.formatted_start ? true : false,
                            "error-messages": $data.errors.formatted_start,
                            type: "time",
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
                            modelValue: $data.formData.formatted_end,
                            "onUpdate:modelValue": ($event) => $data.formData.formatted_end = $event,
                            label: _ctx.$t("end"),
                            error: $data.errors.formatted_end ? true : false,
                            "error-messages": $data.errors.formatted_end,
                            type: "time",
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
              _push3(ssrRenderComponent(_component_CRow, { class: "my-4" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, { md: "12" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`${ssrInterpolate(`${this.$t("calendar.title")} ${this.$t(
                            "color"
                          )}`)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(`${this.$t("calendar.title")} ${this.$t(
                              "color"
                            )}`), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, { md: "12" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_TextFieldColorPicker, {
                            modelValue: $data.formData.color,
                            "onUpdate:modelValue": ($event) => $data.formData.color = $event
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_TextFieldColorPicker, {
                              modelValue: $data.formData.color,
                              "onUpdate:modelValue": ($event) => $data.formData.color = $event
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
                          createTextVNode(toDisplayString(`${this.$t("calendar.title")} ${this.$t(
                            "color"
                          )}`), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, { md: "12" }, {
                        default: withCtx(() => [
                          createVNode(_component_TextFieldColorPicker, {
                            modelValue: $data.formData.color,
                            "onUpdate:modelValue": ($event) => $data.formData.color = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.update,
                color: "primary",
                class: "px-4",
                disabled: !$data.formData.editable
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.$t("button.update"))} `);
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
                      createTextVNode(toDisplayString(_ctx.$t("button.update")) + " ", 1),
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
                createVNode("h4", null, toDisplayString(_ctx.$t("details")), 1),
                createVNode("hr"),
                createVNode("form", null, [
                  createVNode(VTextField, {
                    modelValue: $data.formData.user.name,
                    "onUpdate:modelValue": ($event) => $data.formData.user.name = $event,
                    label: _ctx.$t("user"),
                    outlined: "",
                    dense: "",
                    disabled: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                  createVNode(VMenu, {
                    modelValue: $data.dateMenu,
                    "onUpdate:modelValue": ($event) => $data.dateMenu = $event,
                    "close-on-content-click": false,
                    "nudge-right": 40,
                    transition: "scale-transition",
                    "offset-y": "",
                    "min-width": "auto"
                  }, {
                    activator: withCtx(({ on, attrs }) => [
                      createVNode(VTextField, mergeProps({
                        modelValue: $data.formData.date,
                        "onUpdate:modelValue": ($event) => $data.formData.date = $event,
                        label: _ctx.$t("date"),
                        outlined: "",
                        dense: "",
                        clearable: "",
                        readonly: ""
                      }, attrs, toHandlers(on), {
                        error: $data.errors.date ? true : false,
                        "error-messages": $data.errors.date
                      }), null, 16, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                    ]),
                    default: withCtx(() => [
                      createVNode(VDatePicker, {
                        modelValue: $data.formData.date,
                        "onUpdate:modelValue": ($event) => $data.formData.date = $event,
                        onInput: ($event) => $data.dateMenu = false
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_CRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.formData.formatted_start,
                            "onUpdate:modelValue": ($event) => $data.formData.formatted_start = $event,
                            label: _ctx.$t("start"),
                            error: $data.errors.formatted_start ? true : false,
                            "error-messages": $data.errors.formatted_start,
                            type: "time",
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
                            modelValue: $data.formData.formatted_end,
                            "onUpdate:modelValue": ($event) => $data.formData.formatted_end = $event,
                            label: _ctx.$t("end"),
                            error: $data.errors.formatted_end ? true : false,
                            "error-messages": $data.errors.formatted_end,
                            type: "time",
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
                  createVNode(_component_CRow, { class: "my-4" }, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, { md: "12" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(`${this.$t("calendar.title")} ${this.$t(
                            "color"
                          )}`), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, { md: "12" }, {
                        default: withCtx(() => [
                          createVNode(_component_TextFieldColorPicker, {
                            modelValue: $data.formData.color,
                            "onUpdate:modelValue": ($event) => $data.formData.color = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CButton, {
                    onClick: $options.update,
                    color: "primary",
                    class: "px-4",
                    disabled: !$data.formData.editable
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("button.update")) + " ", 1),
                      $data.updateLoading ? (openBlock(), createBlock(VProgressCircular, {
                        key: 0,
                        indeterminate: "",
                        color: "primary",
                        size: 15
                      })) : createCommentVNode("", true)
                    ]),
                    _: 1
                  }, 8, ["onClick", "disabled"])
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
              createVNode("h4", null, toDisplayString(_ctx.$t("details")), 1),
              createVNode("hr"),
              createVNode("form", null, [
                createVNode(VTextField, {
                  modelValue: $data.formData.user.name,
                  "onUpdate:modelValue": ($event) => $data.formData.user.name = $event,
                  label: _ctx.$t("user"),
                  outlined: "",
                  dense: "",
                  disabled: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                createVNode(VMenu, {
                  modelValue: $data.dateMenu,
                  "onUpdate:modelValue": ($event) => $data.dateMenu = $event,
                  "close-on-content-click": false,
                  "nudge-right": 40,
                  transition: "scale-transition",
                  "offset-y": "",
                  "min-width": "auto"
                }, {
                  activator: withCtx(({ on, attrs }) => [
                    createVNode(VTextField, mergeProps({
                      modelValue: $data.formData.date,
                      "onUpdate:modelValue": ($event) => $data.formData.date = $event,
                      label: _ctx.$t("date"),
                      outlined: "",
                      dense: "",
                      clearable: "",
                      readonly: ""
                    }, attrs, toHandlers(on), {
                      error: $data.errors.date ? true : false,
                      "error-messages": $data.errors.date
                    }), null, 16, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                  ]),
                  default: withCtx(() => [
                    createVNode(VDatePicker, {
                      modelValue: $data.formData.date,
                      "onUpdate:modelValue": ($event) => $data.formData.date = $event,
                      onInput: ($event) => $data.dateMenu = false
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onInput"])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue"]),
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: "6",
                      sm: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.formData.formatted_start,
                          "onUpdate:modelValue": ($event) => $data.formData.formatted_start = $event,
                          label: _ctx.$t("start"),
                          error: $data.errors.formatted_start ? true : false,
                          "error-messages": $data.errors.formatted_start,
                          type: "time",
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
                          modelValue: $data.formData.formatted_end,
                          "onUpdate:modelValue": ($event) => $data.formData.formatted_end = $event,
                          label: _ctx.$t("end"),
                          error: $data.errors.formatted_end ? true : false,
                          "error-messages": $data.errors.formatted_end,
                          type: "time",
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
                createVNode(_component_CRow, { class: "my-4" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, { md: "12" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(`${this.$t("calendar.title")} ${this.$t(
                          "color"
                        )}`), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, { md: "12" }, {
                      default: withCtx(() => [
                        createVNode(_component_TextFieldColorPicker, {
                          modelValue: $data.formData.color,
                          "onUpdate:modelValue": ($event) => $data.formData.color = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CButton, {
                  onClick: $options.update,
                  color: "primary",
                  class: "px-4",
                  disabled: !$data.formData.editable
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("button.update")) + " ", 1),
                    $data.updateLoading ? (openBlock(), createBlock(VProgressCircular, {
                      key: 0,
                      indeterminate: "",
                      color: "primary",
                      size: 15
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["onClick", "disabled"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/duty/DutyDetails.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const DutyDetails = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-fb0abc3f"]]);
export {
  DutyDetails as default
};
