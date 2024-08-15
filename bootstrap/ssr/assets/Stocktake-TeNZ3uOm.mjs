import { _ as _export_sfc, s as sizes, D as Dialog } from "../app.mjs";
import Dashboard from "./Dashboard-CP1vbcTr.mjs";
import { StreamBarcodeReader } from "vue-barcode-reader";
import { resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from "vue/server-renderer";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
import { VDataTable } from "vuetify/lib/components/VDataTable/index.mjs";
import { VProgressCircular } from "vuetify/lib/components/VProgressCircular/index.mjs";
import { VSkeletonLoader } from "vuetify/lib/components/VSkeletonLoader/index.mjs";
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
import "vuetify/lib/components/VSelect/index.mjs";
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
import "@coreui/vue-chartjs";
const _sfc_main$1 = {
  name: "StocktakeDialog",
  components: {
    StreamBarcodeReader
  },
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      title: null,
      items: null,
      barcode: null,
      unit: 0,
      error: false,
      loading: false,
      data: null
    };
  },
  methods: {
    fetch() {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      let data = {
        barcode: self.barcode
      };
      this.$store.dispatch("goods/items/details", data).then((response) => {
        let res = JSON.parse(JSON.stringify(response.data));
        self.data = res.data;
        self.loading = false;
      }).catch((error) => {
        self.loading = false;
      });
    },
    open(items) {
      this.dialog = true;
      this.title = this.$t("stocktake");
      this.items = items;
      this.unit = 0;
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    confirm() {
      this.resolve({
        confirmed: true,
        barcode: this.barcode,
        unit: this.unit
      });
      this.item = null;
      this.unit = 0;
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
      this.clear();
    },
    onDecode(a, b, c) {
      if (a) {
        this.barcode = a;
        this.items.forEach((item) => {
          sizes.forEach((size) => {
            if (item[size.name]) {
              if (item[size.name].barcode === a) {
                this.unit = item[size.name].unit;
                this.fetch();
              }
            }
          });
        });
      }
    },
    onLoaded() {
      this.error = false;
    },
    onError() {
      this.error = true;
    },
    clear() {
      this.unit = 0;
      this.barcode = null;
      this.data = null;
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CModal = resolveComponent("CModal");
  const _component_StreamBarcodeReader = resolveComponent("StreamBarcodeReader");
  const _component_barcode = resolveComponent("barcode");
  const _component_vue_number_input = resolveComponent("vue-number-input");
  const _component_CButton = resolveComponent("CButton");
  _push(ssrRenderComponent(_component_CModal, mergeProps({
    visible: $data.dialog,
    centered: true,
    title: $data.title,
    size: "lg"
  }, _attrs), {
    footer: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CButton, {
          onClick: $options.confirm,
          disabled: $data.data === null,
          color: "danger",
          class: "px-4"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<div${_scopeId2}>${ssrInterpolate(_ctx.$t("button.confirm"))}</div>`);
            } else {
              return [
                createVNode("div", null, toDisplayString(_ctx.$t("button.confirm")), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CButton, {
          onClick: $options.cancel,
          color: "secondary",
          class: "px-4 ml-2"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate(_ctx.$t("button.cancel"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CButton, {
            onClick: $options.confirm,
            disabled: $data.data === null,
            color: "danger",
            class: "px-4"
          }, {
            default: withCtx(() => [
              createVNode("div", null, toDisplayString(_ctx.$t("button.confirm")), 1)
            ]),
            _: 1
          }, 8, ["onClick", "disabled"]),
          createVNode(_component_CButton, {
            onClick: $options.cancel,
            color: "secondary",
            class: "px-4 ml-2"
          }, {
            default: withCtx(() => [
              createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
            ]),
            _: 1
          }, 8, ["onClick"])
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VProgressLinear, {
          active: $data.loading,
          indeterminate: "",
          color: "cyan"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_StreamBarcodeReader, {
          onDecode: (a, b, c) => $options.onDecode(a, b, c),
          onLoaded: () => $options.onLoaded(),
          onError: () => $options.onError()
        }, null, _parent2, _scopeId));
        if ($data.error) {
          _push2(`<div class="d-flex justify-content-center"${_scopeId}><h4${_scopeId}>${ssrInterpolate(_ctx.$t("error.camera"))}</h4></div>`);
        } else {
          _push2(`<!---->`);
        }
        _push2(`<div class="d-flex justify-content-center"${_scopeId}>`);
        if ($data.barcode) {
          _push2(ssrRenderComponent(_component_barcode, {
            class: "m-4",
            value: $data.barcode,
            options: { format: "CODE39", height: 32 }
          }, null, _parent2, _scopeId));
        } else {
          _push2(`<!---->`);
        }
        _push2(`</div><div class="d-flex justify-content-center"${_scopeId}>`);
        _push2(ssrRenderComponent(_component_vue_number_input, {
          class: "my-4",
          size: "small",
          modelValue: $data.unit,
          "onUpdate:modelValue": ($event) => $data.unit = $event,
          width: "100%",
          min: 0,
          inline: "",
          center: "",
          controls: ""
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
      } else {
        return [
          createVNode(VProgressLinear, {
            active: $data.loading,
            indeterminate: "",
            color: "cyan"
          }, null, 8, ["active"]),
          createVNode(_component_StreamBarcodeReader, {
            onDecode: (a, b, c) => $options.onDecode(a, b, c),
            onLoaded: () => $options.onLoaded(),
            onError: () => $options.onError()
          }, null, 8, ["onDecode", "onLoaded", "onError"]),
          $data.error ? (openBlock(), createBlock("div", {
            key: 0,
            class: "d-flex justify-content-center"
          }, [
            createVNode("h4", null, toDisplayString(_ctx.$t("error.camera")), 1)
          ])) : createCommentVNode("", true),
          createVNode("div", { class: "d-flex justify-content-center" }, [
            $data.barcode ? (openBlock(), createBlock(_component_barcode, {
              key: 0,
              class: "m-4",
              value: $data.barcode,
              options: { format: "CODE39", height: 32 }
            }, null, 8, ["value"])) : createCommentVNode("", true)
          ]),
          createVNode("div", { class: "d-flex justify-content-center" }, [
            createVNode(_component_vue_number_input, {
              class: "my-4",
              size: "small",
              modelValue: $data.unit,
              "onUpdate:modelValue": ($event) => $data.unit = $event,
              width: "100%",
              min: 0,
              inline: "",
              center: "",
              controls: ""
            }, null, 8, ["modelValue", "onUpdate:modelValue"])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/purchases/components/StocktakeDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const StocktakeDialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  name: "Stocktake",
  components: {
    Dialog,
    Dashboard,
    StocktakeDialog
  },
  data() {
    return {
      totalunit: 0,
      subtotal: 0,
      search: null,
      loading: false,
      items: [],
      // page: 1,
      pageCount: 0,
      serverItemsLength: 0,
      options: {
        page: 1,
        itemsPerPage: 5,
        sortBy: null,
        sortDesc: false
      },
      disableItemsPerPage: false,
      disablePagination: false,
      headers: [
        { title: "#ID", value: "id" },
        { title: this.$t("name"), value: "name" },
        { title: this.$t("type"), value: "type" },
        { title: this.$t("cup"), value: "cup" },
        { title: this.$t("color"), value: "color" },
        { title: "32-S", value: "32-S" },
        { title: "34-M", value: "34-M" },
        { title: "36-L", value: "36-L" },
        { title: "38-XL", value: "38-XL" },
        { title: "40-Q", value: "40-Q" },
        { title: "42-EQ", value: "42-EQ" },
        { title: "44-Free", value: "44-Free" },
        { title: this.$t("unitprice"), value: "unit_price" },
        { title: this.$t("totalunit"), value: "total_unit" },
        { title: this.$t("cost"), value: "cost" }
      ],
      fetchLoading: false,
      submitLoading: false
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      let self = this;
      self.fetchLoading = true;
      let data = {
        id: self.$route.params.id
      };
      this.$store.dispatch("goods/purchases/invoices/items", data).then((response) => {
        self.fetchLoading = false;
        self.items = JSON.parse(JSON.stringify(response.data));
        self.updateTotal();
      }).catch((error) => {
        self.fetchLoading = false;
      });
    },
    async confirm() {
      let self = this;
      if (self.submitLoading) {
        return;
      }
      var count = 0;
      for (const x of self.items) {
        for (const y of sizes) {
          if (x[y.name]) {
            let item = x[y.name];
            if (!item.updated || !("updated" in item)) {
              count++;
            }
          }
        }
      }
      if (count > 0) {
        if (await self.$refs.dialog.open(
          this.$t("alert.title"),
          this.$t("alert.stocktake")
        )) {
          self.submit();
        }
        return;
      } else {
        self.submit();
      }
    },
    submit() {
      let self = this;
      if (self.submitLoading) {
        return;
      }
      self.submitLoading = true;
      let data = {
        goods_purchase_id: self.$route.params.id,
        items: self.items
      };
      this.$store.dispatch("goods/purchases/stocktakes/create", data).then((response) => {
        self.submitLoading = false;
        self.$router.push({ path: "/purchases" });
      }).catch((error) => {
        self.submitLoading = false;
      });
    },
    change(index, item) {
      const sizes$1 = sizes;
      let total = 0;
      for (let size of sizes$1) {
        const key = size.name;
        if (item[key]) {
          this.items[index][key].updated = true;
          total += item[key].unit * 1;
          break;
        }
      }
      this.items[index].total_unit = total;
      this.items[index].cost = total * this.items[index].unit_price;
      this.updateTotal();
    },
    updateTotal() {
      this.totalunit = 0;
      this.subtotal = 0;
      for (let item of this.items) {
        this.totalunit += item.total_unit;
        this.subtotal += item.cost;
      }
    },
    async scanner() {
      let res = await this.$refs.scannerDialog.open(this.items);
      if (res) {
        this.items.forEach((item) => {
          sizes.forEach((size) => {
            if (item[size.name]) {
              if (item[size.name].barcode === res.barcode) {
                item[size.name].unit = res.unit;
              }
            }
          });
        });
      }
    },
    bgColor(index, key) {
      const item = this.items[index][key];
      if (item) {
        const updated = item.updated;
        if (updated) {
          return "d-flex align-items-center bg-green w-100 h-100 px-2";
        } else {
          return "d-flex align-items-center bg-yellow w-100 h-100 px-2";
        }
      } else {
        return "d-flex align-items-center w-100 h-100 px-2";
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CCard = resolveComponent("CCard");
  const _component_Dialog = resolveComponent("Dialog");
  const _component_StocktakeDialog = resolveComponent("StocktakeDialog");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CInputGroup = resolveComponent("CInputGroup");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_CFormInput = resolveComponent("CFormInput");
  _push(ssrRenderComponent(_component_CCard, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_Dialog, { ref: "dialog" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_StocktakeDialog, { ref: "scannerDialog" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(VProgressLinear, {
          active: $data.fetchLoading,
          indeterminate: "",
          color: "cyan"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CCardBody, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<h4 data-v-9ae403eb${_scopeId2}>${ssrInterpolate(_ctx.$t("stocktake"))}</h4><hr data-v-9ae403eb${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "9",
                      sm: "9"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CInputGroup, { class: "mb-3" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CButton, {
                                  color: "primary",
                                  size: "sm"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_CIcon, {
                                        name: "cil-magnifying-glass",
                                        size: "sm"
                                      }, null, _parent7, _scopeId6));
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
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_CFormInput, {
                                  size: "sm",
                                  modelValue: $data.search,
                                  "onUpdate:modelValue": ($event) => $data.search = $event
                                }, null, _parent6, _scopeId5));
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
                          }, _parent5, _scopeId4));
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
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "3",
                      sm: "3",
                      class: "text-right"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CButton, {
                            color: "primary",
                            size: "sm",
                            onClick: $options.scanner,
                            disabled: $data.fetchLoading
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CIcon, {
                                  name: "cil-barcode",
                                  size: "sm"
                                }, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_CIcon, {
                                    name: "cil-barcode",
                                    size: "sm"
                                  })
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CButton, {
                              color: "primary",
                              size: "sm",
                              onClick: $options.scanner,
                              disabled: $data.fetchLoading
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_CIcon, {
                                  name: "cil-barcode",
                                  size: "sm"
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, {
                        md: "9",
                        sm: "9"
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
                        md: "3",
                        sm: "3",
                        class: "text-right"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CButton, {
                            color: "primary",
                            size: "sm",
                            onClick: $options.scanner,
                            disabled: $data.fetchLoading
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CIcon, {
                                name: "cil-barcode",
                                size: "sm"
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VDataTable, {
                class: "my-2 elevation-1",
                headers: $data.headers,
                items: $data.items,
                "items-length": $data.serverItemsLength,
                search: $data.search,
                loading: $data.fetchLoading,
                "onUpdate:options": $options.fetch,
                "mobile-breakpoint": 0
              }, {
                loading: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VSkeletonLoader, { type: "table-row@10" }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VSkeletonLoader, { type: "table-row@10" })
                    ];
                  }
                }),
                [`item.32-S`]: withCtx(({ index, item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="${ssrRenderClass($options.bgColor(index, "32-S"))}" data-v-9ae403eb${_scopeId3}>`);
                    if (item["32-S"]) {
                      _push4(ssrRenderComponent(VTextField, {
                        modelValue: item["32-S"].unit,
                        "onUpdate:modelValue": ($event) => item["32-S"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        onChange: ($event) => $options.change(index, item)
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<span data-v-9ae403eb${_scopeId3}>－</span>`);
                    }
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: $options.bgColor(index, "32-S")
                      }, [
                        item["32-S"] ? (openBlock(), createBlock(VTextField, {
                          key: 0,
                          modelValue: item["32-S"].unit,
                          "onUpdate:modelValue": ($event) => item["32-S"].unit = $event,
                          type: "number",
                          variant: "plain",
                          "hide-details": "",
                          required: "",
                          dense: "",
                          clearable: "",
                          onChange: ($event) => $options.change(index, item)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                      ], 2)
                    ];
                  }
                }),
                [`item.34-M`]: withCtx(({ index, item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="${ssrRenderClass($options.bgColor(index, "34-M"))}" data-v-9ae403eb${_scopeId3}>`);
                    if (item["34-M"]) {
                      _push4(ssrRenderComponent(VTextField, {
                        modelValue: item["34-M"].unit,
                        "onUpdate:modelValue": ($event) => item["34-M"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        onChange: ($event) => $options.change(index, item)
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<span data-v-9ae403eb${_scopeId3}>－</span>`);
                    }
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: $options.bgColor(index, "34-M")
                      }, [
                        item["34-M"] ? (openBlock(), createBlock(VTextField, {
                          key: 0,
                          modelValue: item["34-M"].unit,
                          "onUpdate:modelValue": ($event) => item["34-M"].unit = $event,
                          type: "number",
                          variant: "plain",
                          "hide-details": "",
                          required: "",
                          dense: "",
                          clearable: "",
                          onChange: ($event) => $options.change(index, item)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                      ], 2)
                    ];
                  }
                }),
                [`item.36-L`]: withCtx(({ index, item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="${ssrRenderClass($options.bgColor(index, "36-L"))}" data-v-9ae403eb${_scopeId3}>`);
                    if (item["36-L"]) {
                      _push4(ssrRenderComponent(VTextField, {
                        modelValue: item["36-L"].unit,
                        "onUpdate:modelValue": ($event) => item["36-L"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        onChange: ($event) => $options.change(index, item)
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<span data-v-9ae403eb${_scopeId3}>－</span>`);
                    }
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: $options.bgColor(index, "36-L")
                      }, [
                        item["36-L"] ? (openBlock(), createBlock(VTextField, {
                          key: 0,
                          modelValue: item["36-L"].unit,
                          "onUpdate:modelValue": ($event) => item["36-L"].unit = $event,
                          type: "number",
                          variant: "plain",
                          "hide-details": "",
                          required: "",
                          dense: "",
                          clearable: "",
                          onChange: ($event) => $options.change(index, item)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                      ], 2)
                    ];
                  }
                }),
                [`item.38-XL`]: withCtx(({ index, item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="${ssrRenderClass($options.bgColor(index, "38-XL"))}" data-v-9ae403eb${_scopeId3}>`);
                    if (item["38-XL"]) {
                      _push4(ssrRenderComponent(VTextField, {
                        modelValue: item["38-XL"].unit,
                        "onUpdate:modelValue": ($event) => item["38-XL"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        onChange: ($event) => $options.change(index, item)
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<span data-v-9ae403eb${_scopeId3}>－</span>`);
                    }
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: $options.bgColor(index, "38-XL")
                      }, [
                        item["38-XL"] ? (openBlock(), createBlock(VTextField, {
                          key: 0,
                          modelValue: item["38-XL"].unit,
                          "onUpdate:modelValue": ($event) => item["38-XL"].unit = $event,
                          type: "number",
                          variant: "plain",
                          "hide-details": "",
                          required: "",
                          dense: "",
                          clearable: "",
                          onChange: ($event) => $options.change(index, item)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                      ], 2)
                    ];
                  }
                }),
                [`item.40-Q`]: withCtx(({ index, item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="${ssrRenderClass($options.bgColor(index, "40-Q"))}" data-v-9ae403eb${_scopeId3}>`);
                    if (item["40-Q"]) {
                      _push4(ssrRenderComponent(VTextField, {
                        modelValue: item["40-Q"].unit,
                        "onUpdate:modelValue": ($event) => item["40-Q"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        onChange: ($event) => $options.change(index, item)
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<span data-v-9ae403eb${_scopeId3}>－</span>`);
                    }
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: $options.bgColor(index, "40-Q")
                      }, [
                        item["40-Q"] ? (openBlock(), createBlock(VTextField, {
                          key: 0,
                          modelValue: item["40-Q"].unit,
                          "onUpdate:modelValue": ($event) => item["40-Q"].unit = $event,
                          type: "number",
                          variant: "plain",
                          "hide-details": "",
                          required: "",
                          dense: "",
                          clearable: "",
                          onChange: ($event) => $options.change(index, item)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                      ], 2)
                    ];
                  }
                }),
                [`item.42-EQ`]: withCtx(({ index, item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="${ssrRenderClass($options.bgColor(index, "42-EQ"))}" data-v-9ae403eb${_scopeId3}>`);
                    if (item["42-EQ"]) {
                      _push4(ssrRenderComponent(VTextField, {
                        modelValue: item["42-EQ"].unit,
                        "onUpdate:modelValue": ($event) => item["42-EQ"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        onChange: ($event) => $options.change(index, item)
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<span data-v-9ae403eb${_scopeId3}>－</span>`);
                    }
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: $options.bgColor(index, "42-EQ")
                      }, [
                        item["42-EQ"] ? (openBlock(), createBlock(VTextField, {
                          key: 0,
                          modelValue: item["42-EQ"].unit,
                          "onUpdate:modelValue": ($event) => item["42-EQ"].unit = $event,
                          type: "number",
                          variant: "plain",
                          "hide-details": "",
                          required: "",
                          dense: "",
                          clearable: "",
                          onChange: ($event) => $options.change(index, item)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                      ], 2)
                    ];
                  }
                }),
                [`item.44-Free`]: withCtx(({ index, item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="${ssrRenderClass($options.bgColor(index, "44-Free"))}" data-v-9ae403eb${_scopeId3}>`);
                    if (item["44-Free"]) {
                      _push4(ssrRenderComponent(VTextField, {
                        modelValue: item["44-Free"].unit,
                        "onUpdate:modelValue": ($event) => item["44-Free"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        onChange: ($event) => $options.change(index, item)
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<span data-v-9ae403eb${_scopeId3}>－</span>`);
                    }
                    _push4(`</div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: $options.bgColor(index, "44-Free")
                      }, [
                        item["44-Free"] ? (openBlock(), createBlock(VTextField, {
                          key: 0,
                          modelValue: item["44-Free"].unit,
                          "onUpdate:modelValue": ($event) => item["44-Free"].unit = $event,
                          type: "number",
                          variant: "plain",
                          "hide-details": "",
                          required: "",
                          dense: "",
                          clearable: "",
                          onChange: ($event) => $options.change(index, item)
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                      ], 2)
                    ];
                  }
                }),
                [`body.append`]: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<tr data-v-9ae403eb${_scopeId3}><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td class="p-2" data-v-9ae403eb${_scopeId3}>${ssrInterpolate(_ctx.$t("totalunit"))}</td><td class="p-2" colspan="4" data-v-9ae403eb${_scopeId3}>`);
                    if ($data.totalunit) {
                      _push4(`<span data-v-9ae403eb${_scopeId3}>${ssrInterpolate($data.totalunit.toLocaleString())}</span>`);
                    } else {
                      _push4(`<span data-v-9ae403eb${_scopeId3}>${ssrInterpolate("0".toLocaleString())}</span>`);
                    }
                    _push4(`</td></tr><tr data-v-9ae403eb${_scopeId3}><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td data-v-9ae403eb${_scopeId3}></td><td class="p-2" data-v-9ae403eb${_scopeId3}>${ssrInterpolate(_ctx.$t("subtotal"))}</td><td class="p-2" colspan="4" data-v-9ae403eb${_scopeId3}>`);
                    if ($data.subtotal) {
                      _push4(`<span data-v-9ae403eb${_scopeId3}>${ssrInterpolate("$ ")} ${ssrInterpolate($data.subtotal.toLocaleString())} ${ssrInterpolate(_ctx.currency)}</span>`);
                    } else {
                      _push4(`<span data-v-9ae403eb${_scopeId3}>${ssrInterpolate("$ ")} ${ssrInterpolate("0".toLocaleString())} ${ssrInterpolate(_ctx.currency)}</span>`);
                    }
                    _push4(`</td></tr>`);
                  } else {
                    return [
                      createVNode("tr", null, [
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td", { class: "p-2" }, toDisplayString(_ctx.$t("totalunit")), 1),
                        createVNode("td", {
                          class: "p-2",
                          colspan: "4"
                        }, [
                          $data.totalunit ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString($data.totalunit.toLocaleString()), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("0".toLocaleString()), 1))
                        ])
                      ]),
                      createVNode("tr", null, [
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td"),
                        createVNode("td", { class: "p-2" }, toDisplayString(_ctx.$t("subtotal")), 1),
                        createVNode("td", {
                          class: "p-2",
                          colspan: "4"
                        }, [
                          $data.subtotal ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString("$ ") + " " + toDisplayString($data.subtotal.toLocaleString()) + " " + toDisplayString(_ctx.currency), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("$ ") + " " + toDisplayString("0".toLocaleString()) + " " + toDisplayString(_ctx.currency), 1))
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent3, _scopeId2));
              _push3(`<div class="d-flex p-2" data-v-9ae403eb${_scopeId2}><div class="bg-yellow" style="${ssrRenderStyle({ "height": "25px", "width": "25px" })}" data-v-9ae403eb${_scopeId2}>   </div><span class="px-2" data-v-9ae403eb${_scopeId2}>${ssrInterpolate("*")} ${ssrInterpolate(_ctx.$t("defaultunit"))}</span></div><div class="d-flex p-2" data-v-9ae403eb${_scopeId2}><div class="bg-green" style="${ssrRenderStyle({ "height": "25px", "width": "25px" })}" data-v-9ae403eb${_scopeId2}>   </div><span class="px-2" data-v-9ae403eb${_scopeId2}>${ssrInterpolate("*")} ${ssrInterpolate(_ctx.$t("updatedunit"))}</span></div><hr data-v-9ae403eb${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.confirm,
                color: "primary",
                class: "px-4"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.$t("button.submit"))} `);
                    if ($data.submitLoading) {
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
                      $data.submitLoading ? (openBlock(), createBlock(VProgressCircular, {
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
            } else {
              return [
                createVNode("h4", null, toDisplayString(_ctx.$t("stocktake")), 1),
                createVNode("hr"),
                createVNode(_component_CRow, { class: "p-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: "9",
                      sm: "9"
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
                      md: "3",
                      sm: "3",
                      class: "text-right"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_CButton, {
                          color: "primary",
                          size: "sm",
                          onClick: $options.scanner,
                          disabled: $data.fetchLoading
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CIcon, {
                              name: "cil-barcode",
                              size: "sm"
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  class: "my-2 elevation-1",
                  headers: $data.headers,
                  items: $data.items,
                  "items-length": $data.serverItemsLength,
                  search: $data.search,
                  loading: $data.fetchLoading,
                  "onUpdate:options": $options.fetch,
                  "mobile-breakpoint": 0
                }, {
                  loading: withCtx(() => [
                    createVNode(VSkeletonLoader, { type: "table-row@10" })
                  ]),
                  [`item.32-S`]: withCtx(({ index, item }) => [
                    createVNode("div", {
                      class: $options.bgColor(index, "32-S")
                    }, [
                      item["32-S"] ? (openBlock(), createBlock(VTextField, {
                        key: 0,
                        modelValue: item["32-S"].unit,
                        "onUpdate:modelValue": ($event) => item["32-S"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ], 2)
                  ]),
                  [`item.34-M`]: withCtx(({ index, item }) => [
                    createVNode("div", {
                      class: $options.bgColor(index, "34-M")
                    }, [
                      item["34-M"] ? (openBlock(), createBlock(VTextField, {
                        key: 0,
                        modelValue: item["34-M"].unit,
                        "onUpdate:modelValue": ($event) => item["34-M"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ], 2)
                  ]),
                  [`item.36-L`]: withCtx(({ index, item }) => [
                    createVNode("div", {
                      class: $options.bgColor(index, "36-L")
                    }, [
                      item["36-L"] ? (openBlock(), createBlock(VTextField, {
                        key: 0,
                        modelValue: item["36-L"].unit,
                        "onUpdate:modelValue": ($event) => item["36-L"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ], 2)
                  ]),
                  [`item.38-XL`]: withCtx(({ index, item }) => [
                    createVNode("div", {
                      class: $options.bgColor(index, "38-XL")
                    }, [
                      item["38-XL"] ? (openBlock(), createBlock(VTextField, {
                        key: 0,
                        modelValue: item["38-XL"].unit,
                        "onUpdate:modelValue": ($event) => item["38-XL"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ], 2)
                  ]),
                  [`item.40-Q`]: withCtx(({ index, item }) => [
                    createVNode("div", {
                      class: $options.bgColor(index, "40-Q")
                    }, [
                      item["40-Q"] ? (openBlock(), createBlock(VTextField, {
                        key: 0,
                        modelValue: item["40-Q"].unit,
                        "onUpdate:modelValue": ($event) => item["40-Q"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ], 2)
                  ]),
                  [`item.42-EQ`]: withCtx(({ index, item }) => [
                    createVNode("div", {
                      class: $options.bgColor(index, "42-EQ")
                    }, [
                      item["42-EQ"] ? (openBlock(), createBlock(VTextField, {
                        key: 0,
                        modelValue: item["42-EQ"].unit,
                        "onUpdate:modelValue": ($event) => item["42-EQ"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ], 2)
                  ]),
                  [`item.44-Free`]: withCtx(({ index, item }) => [
                    createVNode("div", {
                      class: $options.bgColor(index, "44-Free")
                    }, [
                      item["44-Free"] ? (openBlock(), createBlock(VTextField, {
                        key: 0,
                        modelValue: item["44-Free"].unit,
                        "onUpdate:modelValue": ($event) => item["44-Free"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ], 2)
                  ]),
                  [`body.append`]: withCtx(() => [
                    createVNode("tr", null, [
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td", { class: "p-2" }, toDisplayString(_ctx.$t("totalunit")), 1),
                      createVNode("td", {
                        class: "p-2",
                        colspan: "4"
                      }, [
                        $data.totalunit ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString($data.totalunit.toLocaleString()), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("0".toLocaleString()), 1))
                      ])
                    ]),
                    createVNode("tr", null, [
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td"),
                      createVNode("td", { class: "p-2" }, toDisplayString(_ctx.$t("subtotal")), 1),
                      createVNode("td", {
                        class: "p-2",
                        colspan: "4"
                      }, [
                        $data.subtotal ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString("$ ") + " " + toDisplayString($data.subtotal.toLocaleString()) + " " + toDisplayString(_ctx.currency), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("$ ") + " " + toDisplayString("0".toLocaleString()) + " " + toDisplayString(_ctx.currency), 1))
                      ])
                    ])
                  ]),
                  _: 2
                }, 1032, ["headers", "items", "items-length", "search", "loading", "onUpdate:options"]),
                createVNode("div", { class: "d-flex p-2" }, [
                  createVNode("div", {
                    class: "bg-yellow",
                    style: { "height": "25px", "width": "25px" }
                  }, "   "),
                  createVNode("span", { class: "px-2" }, toDisplayString("*") + " " + toDisplayString(_ctx.$t("defaultunit")), 1)
                ]),
                createVNode("div", { class: "d-flex p-2" }, [
                  createVNode("div", {
                    class: "bg-green",
                    style: { "height": "25px", "width": "25px" }
                  }, "   "),
                  createVNode("span", { class: "px-2" }, toDisplayString("*") + " " + toDisplayString(_ctx.$t("updatedunit")), 1)
                ]),
                createVNode("hr"),
                createVNode(_component_CButton, {
                  onClick: $options.confirm,
                  color: "primary",
                  class: "px-4"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("button.submit")) + " ", 1),
                    $data.submitLoading ? (openBlock(), createBlock(VProgressCircular, {
                      key: 0,
                      indeterminate: "",
                      color: "primary",
                      size: 15
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_Dialog, { ref: "dialog" }, null, 512),
          createVNode(_component_StocktakeDialog, { ref: "scannerDialog" }, null, 512),
          createVNode(VProgressLinear, {
            active: $data.fetchLoading,
            indeterminate: "",
            color: "cyan"
          }, null, 8, ["active"]),
          createVNode(_component_CCardBody, null, {
            default: withCtx(() => [
              createVNode("h4", null, toDisplayString(_ctx.$t("stocktake")), 1),
              createVNode("hr"),
              createVNode(_component_CRow, { class: "p-2" }, {
                default: withCtx(() => [
                  createVNode(_component_CCol, {
                    md: "9",
                    sm: "9"
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
                    md: "3",
                    sm: "3",
                    class: "text-right"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CButton, {
                        color: "primary",
                        size: "sm",
                        onClick: $options.scanner,
                        disabled: $data.fetchLoading
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CIcon, {
                            name: "cil-barcode",
                            size: "sm"
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VDataTable, {
                class: "my-2 elevation-1",
                headers: $data.headers,
                items: $data.items,
                "items-length": $data.serverItemsLength,
                search: $data.search,
                loading: $data.fetchLoading,
                "onUpdate:options": $options.fetch,
                "mobile-breakpoint": 0
              }, {
                loading: withCtx(() => [
                  createVNode(VSkeletonLoader, { type: "table-row@10" })
                ]),
                [`item.32-S`]: withCtx(({ index, item }) => [
                  createVNode("div", {
                    class: $options.bgColor(index, "32-S")
                  }, [
                    item["32-S"] ? (openBlock(), createBlock(VTextField, {
                      key: 0,
                      modelValue: item["32-S"].unit,
                      "onUpdate:modelValue": ($event) => item["32-S"].unit = $event,
                      type: "number",
                      variant: "plain",
                      "hide-details": "",
                      required: "",
                      dense: "",
                      clearable: "",
                      onChange: ($event) => $options.change(index, item)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ], 2)
                ]),
                [`item.34-M`]: withCtx(({ index, item }) => [
                  createVNode("div", {
                    class: $options.bgColor(index, "34-M")
                  }, [
                    item["34-M"] ? (openBlock(), createBlock(VTextField, {
                      key: 0,
                      modelValue: item["34-M"].unit,
                      "onUpdate:modelValue": ($event) => item["34-M"].unit = $event,
                      type: "number",
                      variant: "plain",
                      "hide-details": "",
                      required: "",
                      dense: "",
                      clearable: "",
                      onChange: ($event) => $options.change(index, item)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ], 2)
                ]),
                [`item.36-L`]: withCtx(({ index, item }) => [
                  createVNode("div", {
                    class: $options.bgColor(index, "36-L")
                  }, [
                    item["36-L"] ? (openBlock(), createBlock(VTextField, {
                      key: 0,
                      modelValue: item["36-L"].unit,
                      "onUpdate:modelValue": ($event) => item["36-L"].unit = $event,
                      type: "number",
                      variant: "plain",
                      "hide-details": "",
                      required: "",
                      dense: "",
                      clearable: "",
                      onChange: ($event) => $options.change(index, item)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ], 2)
                ]),
                [`item.38-XL`]: withCtx(({ index, item }) => [
                  createVNode("div", {
                    class: $options.bgColor(index, "38-XL")
                  }, [
                    item["38-XL"] ? (openBlock(), createBlock(VTextField, {
                      key: 0,
                      modelValue: item["38-XL"].unit,
                      "onUpdate:modelValue": ($event) => item["38-XL"].unit = $event,
                      type: "number",
                      variant: "plain",
                      "hide-details": "",
                      required: "",
                      dense: "",
                      clearable: "",
                      onChange: ($event) => $options.change(index, item)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ], 2)
                ]),
                [`item.40-Q`]: withCtx(({ index, item }) => [
                  createVNode("div", {
                    class: $options.bgColor(index, "40-Q")
                  }, [
                    item["40-Q"] ? (openBlock(), createBlock(VTextField, {
                      key: 0,
                      modelValue: item["40-Q"].unit,
                      "onUpdate:modelValue": ($event) => item["40-Q"].unit = $event,
                      type: "number",
                      variant: "plain",
                      "hide-details": "",
                      required: "",
                      dense: "",
                      clearable: "",
                      onChange: ($event) => $options.change(index, item)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ], 2)
                ]),
                [`item.42-EQ`]: withCtx(({ index, item }) => [
                  createVNode("div", {
                    class: $options.bgColor(index, "42-EQ")
                  }, [
                    item["42-EQ"] ? (openBlock(), createBlock(VTextField, {
                      key: 0,
                      modelValue: item["42-EQ"].unit,
                      "onUpdate:modelValue": ($event) => item["42-EQ"].unit = $event,
                      type: "number",
                      variant: "plain",
                      "hide-details": "",
                      required: "",
                      dense: "",
                      clearable: "",
                      onChange: ($event) => $options.change(index, item)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ], 2)
                ]),
                [`item.44-Free`]: withCtx(({ index, item }) => [
                  createVNode("div", {
                    class: $options.bgColor(index, "44-Free")
                  }, [
                    item["44-Free"] ? (openBlock(), createBlock(VTextField, {
                      key: 0,
                      modelValue: item["44-Free"].unit,
                      "onUpdate:modelValue": ($event) => item["44-Free"].unit = $event,
                      type: "number",
                      variant: "plain",
                      "hide-details": "",
                      required: "",
                      dense: "",
                      clearable: "",
                      onChange: ($event) => $options.change(index, item)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ], 2)
                ]),
                [`body.append`]: withCtx(() => [
                  createVNode("tr", null, [
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td", { class: "p-2" }, toDisplayString(_ctx.$t("totalunit")), 1),
                    createVNode("td", {
                      class: "p-2",
                      colspan: "4"
                    }, [
                      $data.totalunit ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString($data.totalunit.toLocaleString()), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("0".toLocaleString()), 1))
                    ])
                  ]),
                  createVNode("tr", null, [
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td"),
                    createVNode("td", { class: "p-2" }, toDisplayString(_ctx.$t("subtotal")), 1),
                    createVNode("td", {
                      class: "p-2",
                      colspan: "4"
                    }, [
                      $data.subtotal ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString("$ ") + " " + toDisplayString($data.subtotal.toLocaleString()) + " " + toDisplayString(_ctx.currency), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("$ ") + " " + toDisplayString("0".toLocaleString()) + " " + toDisplayString(_ctx.currency), 1))
                    ])
                  ])
                ]),
                _: 2
              }, 1032, ["headers", "items", "items-length", "search", "loading", "onUpdate:options"]),
              createVNode("div", { class: "d-flex p-2" }, [
                createVNode("div", {
                  class: "bg-yellow",
                  style: { "height": "25px", "width": "25px" }
                }, "   "),
                createVNode("span", { class: "px-2" }, toDisplayString("*") + " " + toDisplayString(_ctx.$t("defaultunit")), 1)
              ]),
              createVNode("div", { class: "d-flex p-2" }, [
                createVNode("div", {
                  class: "bg-green",
                  style: { "height": "25px", "width": "25px" }
                }, "   "),
                createVNode("span", { class: "px-2" }, toDisplayString("*") + " " + toDisplayString(_ctx.$t("updatedunit")), 1)
              ]),
              createVNode("hr"),
              createVNode(_component_CButton, {
                onClick: $options.confirm,
                color: "primary",
                class: "px-4"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("button.submit")) + " ", 1),
                  $data.submitLoading ? (openBlock(), createBlock(VProgressCircular, {
                    key: 0,
                    indeterminate: "",
                    color: "primary",
                    size: 15
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 2
          }, 1024)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/purchases/Stocktake.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Stocktake = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-9ae403eb"]]);
export {
  Stocktake as default
};
