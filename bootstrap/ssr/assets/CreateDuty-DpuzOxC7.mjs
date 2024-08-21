import { _ as _export_sfc, D as DutyCalendar, T as TextFieldColorPicker } from "../app.mjs";
import { resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { VAutocomplete } from "vuetify/lib/components/VAutocomplete/index.mjs";
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
  name: "CreateDuty",
  components: {
    DutyCalendar,
    TextFieldColorPicker
  },
  computed: {
    datesText() {
      if (this.dates.length === 1) {
        return this.dates;
      }
      if (this.dates.length > 1) {
        let f = new Date(this.dates[0]);
        let t = new Date(this.dates[1]);
        if (f.toDateString() === t.toDateString()) {
          return this.dates[0];
        }
        let sorted = this.dates.sort(
          (a, b) => new Date(a) - new Date(b)
        );
        this.dates = sorted;
        return sorted.join(" － ");
      }
    }
  },
  data() {
    return {
      loading: false,
      user: "",
      dates: [/* @__PURE__ */ new Date(), /* @__PURE__ */ new Date()],
      start: "",
      end: "",
      color: "#0D47A1FF",
      errors: {},
      dateMenu: false,
      autocomplete: {
        user: {
          items: [],
          loading: false,
          search: ""
        }
      }
    };
  },
  watch: {
    "autocomplete.user.search": function(val) {
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    submit() {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      let data = {
        user: self.user,
        dates: self.dates.map((x) => x.toMyDateString()),
        start: self.start,
        end: self.end,
        color: self.color
      };
      this.$store.dispatch("users/duty/create", data).then((response) => {
        self.loading = false;
        self.errors = {};
        self.$router.back();
      }).catch((error) => {
        var _a;
        self.errors = (_a = error.response.data) == null ? void 0 : _a.data;
        self.loading = false;
      });
    },
    fetch() {
      let self = this;
      let cli = self.autocomplete.user;
      if (cli.items.length > 0 || cli.loading) {
        return;
      }
      self.autocomplete.user.loading = true;
      let data = {
        user_id: self.userId,
        role: "EMPLOYEE"
      };
      this.$store.dispatch("users/get", data).then((response) => {
        let data2 = response.data;
        self.autocomplete.user.items = response.data;
        self.autocomplete.user.loading = false;
        if (self.$route.params.userId) {
          let id = self.$route.params.userId;
          for (const item of data2) {
            if (`${item.id}` === `${id}`) {
              self.user = item;
              break;
            }
          }
        }
      }).catch((error) => {
        self.autocomplete.user.loading = false;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DutyCalendar = resolveComponent("DutyCalendar");
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_v_date_input = resolveComponent("v-date-input");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_TextFieldColorPicker = resolveComponent("TextFieldColorPicker");
  const _component_CButton = resolveComponent("CButton");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-36be9bb4>`);
  if ($data.user) {
    _push(ssrRenderComponent(_component_DutyCalendar, {
      userId: $data.user.id
    }, null, _parent));
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent(_component_CCard, { class: "p-4 my-4" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCardBody, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<h4 data-v-36be9bb4${_scopeId2}>${ssrInterpolate(_ctx.$t("create"))}</h4><hr data-v-36be9bb4${_scopeId2}><form data-v-36be9bb4${_scopeId2}>`);
              _push3(ssrRenderComponent(VAutocomplete, {
                modelValue: $data.user,
                "onUpdate:modelValue": ($event) => $data.user = $event,
                items: $data.autocomplete.user.items,
                loading: $data.autocomplete.user.loading,
                required: "",
                outlined: "",
                dense: "",
                "hide-no-data": "",
                "hide-selected": "",
                "item-title": "name",
                "item-value": "id",
                label: _ctx.$t("user"),
                "return-object": "",
                error: $data.errors.user ? true : false,
                "error-messages": $data.errors.user
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_v_date_input, {
                label: _ctx.$t("date"),
                modelValue: $data.dates,
                "onUpdate:modelValue": ($event) => $data.dates = $event,
                "prepend-icon": "",
                clearable: "",
                outlined: "",
                multiple: "range"
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
                            modelValue: $data.start,
                            "onUpdate:modelValue": ($event) => $data.start = $event,
                            label: _ctx.$t("start"),
                            error: $data.errors.start ? true : false,
                            "error-messages": $data.errors.start,
                            type: "time",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.start,
                              "onUpdate:modelValue": ($event) => $data.start = $event,
                              label: _ctx.$t("start"),
                              error: $data.errors.start ? true : false,
                              "error-messages": $data.errors.start,
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
                            modelValue: $data.end,
                            "onUpdate:modelValue": ($event) => $data.end = $event,
                            label: _ctx.$t("end"),
                            error: $data.errors.end ? true : false,
                            "error-messages": $data.errors.end,
                            type: "time",
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.end,
                              "onUpdate:modelValue": ($event) => $data.end = $event,
                              label: _ctx.$t("end"),
                              error: $data.errors.end ? true : false,
                              "error-messages": $data.errors.end,
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
                            modelValue: $data.start,
                            "onUpdate:modelValue": ($event) => $data.start = $event,
                            label: _ctx.$t("start"),
                            error: $data.errors.start ? true : false,
                            "error-messages": $data.errors.start,
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
                            modelValue: $data.end,
                            "onUpdate:modelValue": ($event) => $data.end = $event,
                            label: _ctx.$t("end"),
                            error: $data.errors.end ? true : false,
                            "error-messages": $data.errors.end,
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
              _push3(ssrRenderComponent(_component_CRow, { class: "g-0 mb-2" }, {
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
                            modelValue: $data.color,
                            "onUpdate:modelValue": ($event) => $data.color = $event
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_TextFieldColorPicker, {
                              modelValue: $data.color,
                              "onUpdate:modelValue": ($event) => $data.color = $event
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
                            modelValue: $data.color,
                            "onUpdate:modelValue": ($event) => $data.color = $event
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
                onClick: $options.submit,
                color: "primary",
                class: "px-4"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.$t("button.submit"))} `);
                    if ($data.loading) {
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
                      $data.loading ? (openBlock(), createBlock(VProgressCircular, {
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
                createVNode("h4", null, toDisplayString(_ctx.$t("create")), 1),
                createVNode("hr"),
                createVNode("form", null, [
                  createVNode(VAutocomplete, {
                    modelValue: $data.user,
                    "onUpdate:modelValue": ($event) => $data.user = $event,
                    items: $data.autocomplete.user.items,
                    loading: $data.autocomplete.user.loading,
                    required: "",
                    outlined: "",
                    dense: "",
                    "hide-no-data": "",
                    "hide-selected": "",
                    "item-title": "name",
                    "item-value": "id",
                    label: _ctx.$t("user"),
                    "return-object": "",
                    error: $data.errors.user ? true : false,
                    "error-messages": $data.errors.user
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "label", "error", "error-messages"]),
                  createVNode(_component_v_date_input, {
                    label: _ctx.$t("date"),
                    modelValue: $data.dates,
                    "onUpdate:modelValue": ($event) => $data.dates = $event,
                    "prepend-icon": "",
                    clearable: "",
                    outlined: "",
                    multiple: "range"
                  }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                  createVNode(_component_CRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        md: "6",
                        sm: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.start,
                            "onUpdate:modelValue": ($event) => $data.start = $event,
                            label: _ctx.$t("start"),
                            error: $data.errors.start ? true : false,
                            "error-messages": $data.errors.start,
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
                            modelValue: $data.end,
                            "onUpdate:modelValue": ($event) => $data.end = $event,
                            label: _ctx.$t("end"),
                            error: $data.errors.end ? true : false,
                            "error-messages": $data.errors.end,
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
                  createVNode(_component_CRow, { class: "g-0 mb-2" }, {
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
                            modelValue: $data.color,
                            "onUpdate:modelValue": ($event) => $data.color = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CButton, {
                    onClick: $options.submit,
                    color: "primary",
                    class: "px-4"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("button.submit")) + " ", 1),
                      $data.loading ? (openBlock(), createBlock(VProgressCircular, {
                        key: 0,
                        indeterminate: "",
                        color: "primary",
                        size: 15
                      })) : createCommentVNode("", true)
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
                createVNode(VAutocomplete, {
                  modelValue: $data.user,
                  "onUpdate:modelValue": ($event) => $data.user = $event,
                  items: $data.autocomplete.user.items,
                  loading: $data.autocomplete.user.loading,
                  required: "",
                  outlined: "",
                  dense: "",
                  "hide-no-data": "",
                  "hide-selected": "",
                  "item-title": "name",
                  "item-value": "id",
                  label: _ctx.$t("user"),
                  "return-object": "",
                  error: $data.errors.user ? true : false,
                  "error-messages": $data.errors.user
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "label", "error", "error-messages"]),
                createVNode(_component_v_date_input, {
                  label: _ctx.$t("date"),
                  modelValue: $data.dates,
                  "onUpdate:modelValue": ($event) => $data.dates = $event,
                  "prepend-icon": "",
                  clearable: "",
                  outlined: "",
                  multiple: "range"
                }, null, 8, ["label", "modelValue", "onUpdate:modelValue"]),
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: "6",
                      sm: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.start,
                          "onUpdate:modelValue": ($event) => $data.start = $event,
                          label: _ctx.$t("start"),
                          error: $data.errors.start ? true : false,
                          "error-messages": $data.errors.start,
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
                          modelValue: $data.end,
                          "onUpdate:modelValue": ($event) => $data.end = $event,
                          label: _ctx.$t("end"),
                          error: $data.errors.end ? true : false,
                          "error-messages": $data.errors.end,
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
                createVNode(_component_CRow, { class: "g-0 mb-2" }, {
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
                          modelValue: $data.color,
                          "onUpdate:modelValue": ($event) => $data.color = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CButton, {
                  onClick: $options.submit,
                  color: "primary",
                  class: "px-4"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("button.submit")) + " ", 1),
                    $data.loading ? (openBlock(), createBlock(VProgressCircular, {
                      key: 0,
                      indeterminate: "",
                      color: "primary",
                      size: 15
                    })) : createCommentVNode("", true)
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
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/duty/CreateDuty.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CreateDuty = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-36be9bb4"]]);
export {
  CreateDuty as default
};
