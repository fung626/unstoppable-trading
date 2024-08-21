import { _ as _export_sfc, s as sizes, c as codes, p as purchaseStatus, e as currencies } from "../app.mjs";
import { isMobile } from "react-device-detect";
import { StreamBarcodeReader } from "vue-barcode-reader";
import { resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
import { VDataTable } from "vuetify/lib/components/VDataTable/index.mjs";
import { VExpansionPanels, VExpansionPanel, VExpansionPanelTitle, VExpansionPanelText } from "vuetify/lib/components/VExpansionPanel/index.mjs";
import { VProgressCircular } from "vuetify/lib/components/VProgressCircular/index.mjs";
import { VSelect } from "vuetify/lib/components/VSelect/index.mjs";
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
const _sfc_main$1 = {
  name: "CreatePurchaseDialog",
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
      readerError: false,
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
      this.title = this.$t("purchase.title");
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
      this.readerError = false;
    },
    error() {
      this.readerError = true;
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
  const _component_CModalHeader = resolveComponent("CModalHeader");
  const _component_CModalTitle = resolveComponent("CModalTitle");
  const _component_CModalBody = resolveComponent("CModalBody");
  const _component_StreamBarcodeReader = resolveComponent("StreamBarcodeReader");
  const _component_barcode = resolveComponent("barcode");
  const _component_v_number_input = resolveComponent("v-number-input");
  const _component_CModalFooter = resolveComponent("CModalFooter");
  const _component_CButton = resolveComponent("CButton");
  _push(ssrRenderComponent(_component_CModal, mergeProps({
    visible: $data.dialog,
    centered: true,
    size: "lg",
    onClose: () => $data.dialog = false
  }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CModalHeader, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CModalTitle, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate($data.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString($data.title), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CModalTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString($data.title), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VProgressLinear, {
          active: $data.loading,
          indeterminate: "",
          color: "cyan"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CModalBody, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_StreamBarcodeReader, {
                onDecode: (a, b, c) => $options.onDecode(a, b, c),
                onLoaded: () => $options.onLoaded(),
                onError: () => $options.error()
              }, null, _parent3, _scopeId2));
              if ($data.readerError) {
                _push3(`<div class="d-flex justify-content-center"${_scopeId2}><h4${_scopeId2}>${ssrInterpolate(_ctx.$t("error.camera"))}</h4></div>`);
              } else {
                _push3(`<!---->`);
              }
              _push3(`<div class="d-flex justify-content-center"${_scopeId2}>`);
              if ($data.barcode) {
                _push3(ssrRenderComponent(_component_barcode, {
                  class: "m-4",
                  value: $data.barcode,
                  options: { format: "CODE39", height: 32 }
                }, null, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
              _push3(`</div><div class="d-flex justify-content-center"${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_v_number_input, {
                class: "my-4",
                size: "small",
                modelValue: $data.unit,
                "onUpdate:modelValue": ($event) => $data.unit = $event,
                width: "100%",
                min: 0,
                inline: "",
                center: "",
                controls: "",
                "control-variant": "split"
              }, null, _parent3, _scopeId2));
              _push3(`</div>`);
            } else {
              return [
                createVNode(_component_StreamBarcodeReader, {
                  onDecode: (a, b, c) => $options.onDecode(a, b, c),
                  onLoaded: () => $options.onLoaded(),
                  onError: () => $options.error()
                }, null, 8, ["onDecode", "onLoaded", "onError"]),
                $data.readerError ? (openBlock(), createBlock("div", {
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
                  createVNode(_component_v_number_input, {
                    class: "my-4",
                    size: "small",
                    modelValue: $data.unit,
                    "onUpdate:modelValue": ($event) => $data.unit = $event,
                    width: "100%",
                    min: 0,
                    inline: "",
                    center: "",
                    controls: "",
                    "control-variant": "split"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CModalFooter, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.confirm,
                disabled: $data.data === null,
                color: "danger",
                class: "px-4"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div${_scopeId3}>${ssrInterpolate(_ctx.$t("button.confirm"))}</div>`);
                  } else {
                    return [
                      createVNode("div", null, toDisplayString(_ctx.$t("button.confirm")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.cancel,
                color: "secondary",
                class: "px-4 ml-2"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.$t("button.cancel"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
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
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CModalHeader, null, {
            default: withCtx(() => [
              createVNode(_component_CModalTitle, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString($data.title), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VProgressLinear, {
            active: $data.loading,
            indeterminate: "",
            color: "cyan"
          }, null, 8, ["active"]),
          createVNode(_component_CModalBody, null, {
            default: withCtx(() => [
              createVNode(_component_StreamBarcodeReader, {
                onDecode: (a, b, c) => $options.onDecode(a, b, c),
                onLoaded: () => $options.onLoaded(),
                onError: () => $options.error()
              }, null, 8, ["onDecode", "onLoaded", "onError"]),
              $data.readerError ? (openBlock(), createBlock("div", {
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
                createVNode(_component_v_number_input, {
                  class: "my-4",
                  size: "small",
                  modelValue: $data.unit,
                  "onUpdate:modelValue": ($event) => $data.unit = $event,
                  width: "100%",
                  min: 0,
                  inline: "",
                  center: "",
                  controls: "",
                  "control-variant": "split"
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ])
            ]),
            _: 1
          }),
          createVNode(_component_CModalFooter, null, {
            default: withCtx(() => [
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/purchases/components/CreatePurchaseDialog.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CreatePurchaseDialog = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  name: "CreatePurchase",
  components: {
    CreatePurchaseDialog
  },
  data() {
    return {
      items: [],
      supplier: "",
      supplierName: "",
      supplierNumber: "",
      contact: "",
      address: "",
      phoneCountryCode: "",
      phone: "",
      faxCountryCode: "",
      fax: "",
      email: "",
      date: /* @__PURE__ */ new Date(),
      status: "PENDING",
      currency: "",
      totalunit: 0,
      subtotal: 0,
      table: {
        item: {
          search: "",
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
            {
              title: `${this.$t("unit-price")}($)`,
              value: "unit_price"
            },
            { title: this.$t("total-unit"), value: "total_unit" },
            { title: `${this.$t("cost")}($)`, value: "cost" }
          ]
        }
      },
      dateMenu: false,
      fetchLoading: {
        form: false,
        table: false
      },
      loading: false,
      errors: {},
      countryCodes: codes,
      purchaseStatus,
      currencies
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      let self = this;
      self.fetchLoading.table = true;
      self.fetchLoading.form = true;
      this.$store.dispatch("goods/purchases/items", {
        id: self.$route.params.id
      }).then((response) => {
        let data = JSON.parse(JSON.stringify(response.data));
        self.items = data;
        self.fetchLoading.table = false;
      }).catch((error) => {
        self.fetchLoading.table = false;
      });
      this.$store.dispatch("goods/suppliers/details", {
        id: self.$route.params.id
      }).then((response) => {
        let res = response.data;
        self.supplier = res;
        self.supplierName = res.name;
        self.supplierNumber = res.number;
        self.phoneCountryCode = res.phone_country_code;
        self.phone = res.phone;
        self.faxCountryCode = res.fax_country_code;
        self.fax = res.fax;
        self.email = res.email;
        self.contact = res.contact;
        self.address = res.address;
        self.currency = res.cost_price_currency;
        self.fetchLoading.form = false;
      }).catch((error) => {
        self.fetchLoading.form = false;
      });
    },
    submit() {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      let data = {
        supplier: self.supplier,
        to_company: self.supplierName,
        to_company_number: self.supplierNumber,
        to_contact: self.contact,
        to_address: self.address,
        to_phone_country_code: self.phoneCountryCode,
        to_phone: self.phone,
        to_fax_country_code: self.faxCountryCode,
        to_fax: self.fax,
        to_email: self.email,
        date: self.date,
        status: self.status,
        currency: self.currency,
        purchase_items: self.items
      };
      this.$store.dispatch("goods/purchases/create", data).then((response) => {
        self.loading = false;
        self.errors = {};
        self.$router.push({ path: "/purchases" });
      }).catch((error) => {
        var _a;
        self.loading = false;
        self.errors = (_a = error.response.data) == null ? void 0 : _a.data;
      });
    },
    change(index, item) {
      const sizes$1 = sizes;
      let total = 0;
      for (let size of sizes$1) {
        const key = size.name;
        if (item[key]) {
          total += item[key].unit * 1;
        }
      }
      this.items[index].total_unit = total;
      this.items[index].cost = total * this.items[index].unit_price;
      this.totalunit = 0;
      this.subtotal = 0;
      for (let item2 of this.items) {
        this.totalunit += item2.total_unit;
        this.subtotal += item2.cost;
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
    isMobile() {
      return isMobile;
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CCard = resolveComponent("CCard");
  const _component_CreatePurchaseDialog = resolveComponent("CreatePurchaseDialog");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_v_date_input = resolveComponent("v-date-input");
  const _component_CInputGroup = resolveComponent("CInputGroup");
  const _component_CFormInput = resolveComponent("CFormInput");
  const _component_v_number_input = resolveComponent("v-number-input");
  _push(ssrRenderComponent(_component_CCard, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CreatePurchaseDialog, { ref: "scannerDialog" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(VProgressLinear, {
          active: $data.fetchLoading.form,
          indeterminate: "",
          color: "cyan"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CCardBody, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CRow, { class: "px-2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "9",
                      sm: "9"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<h4 data-v-dfaa7a0c${_scopeId4}>${ssrInterpolate(_ctx.$t("create"))}${ssrInterpolate(_ctx.$t("purchase.title"))}</h4>`);
                        } else {
                          return [
                            createVNode("h4", null, toDisplayString(_ctx.$t("create")) + toDisplayString(_ctx.$t("purchase.title")), 1)
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
                            disabled: $data.fetchLoading.form
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
                              disabled: $data.fetchLoading.form
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
                          createVNode("h4", null, toDisplayString(_ctx.$t("create")) + toDisplayString(_ctx.$t("purchase.title")), 1)
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
                            disabled: $data.fetchLoading.form
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
              _push3(`<hr data-v-dfaa7a0c${_scopeId2}><form data-v-dfaa7a0c${_scopeId2}>`);
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.supplierNumber,
                "onUpdate:modelValue": ($event) => $data.supplierNumber = $event,
                label: _ctx.$t("number"),
                required: "",
                outlined: "",
                dense: "",
                clearable: "",
                error: $data.errors["to_company_number"] ? true : false,
                "error-messages": $data.errors["to_company_number"]
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.supplierName,
                "onUpdate:modelValue": ($event) => $data.supplierName = $event,
                label: _ctx.$t("supplier"),
                required: "",
                outlined: "",
                dense: "",
                clearable: "",
                error: $data.errors["to_company"] ? true : false,
                "error-messages": $data.errors["to_company"]
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VExpansionPanels, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VExpansionPanel, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VExpansionPanelTitle, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`${ssrInterpolate(_ctx.$t("more"))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(_ctx.$t("more")), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                          _push5(ssrRenderComponent(VExpansionPanelText, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(VTextField, {
                                  modelValue: $data.contact,
                                  "onUpdate:modelValue": ($event) => $data.contact = $event,
                                  label: _ctx.$t("contact"),
                                  required: "",
                                  outlined: "",
                                  dense: "",
                                  clearable: "",
                                  error: $data.errors["to_contact"] ? true : false,
                                  "error-messages": $data.errors["to_contact"]
                                }, null, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_CRow, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_CCol, {
                                        md: 2,
                                        sm: 5
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(VSelect, {
                                              modelValue: $data.phoneCountryCode,
                                              "onUpdate:modelValue": ($event) => $data.phoneCountryCode = $event,
                                              items: $data.countryCodes,
                                              label: _ctx.$t("countrycode"),
                                              "item-title": "name",
                                              "item-value": "value",
                                              required: "",
                                              outlined: "",
                                              dense: ""
                                            }, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(VSelect, {
                                                modelValue: $data.phoneCountryCode,
                                                "onUpdate:modelValue": ($event) => $data.phoneCountryCode = $event,
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
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_CCol, {
                                        md: 10,
                                        sm: 7
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(VTextField, {
                                              modelValue: $data.phone,
                                              "onUpdate:modelValue": ($event) => $data.phone = $event,
                                              label: _ctx.$t("phone"),
                                              required: "",
                                              outlined: "",
                                              dense: "",
                                              clearable: "",
                                              error: $data.errors["to_phone"] ? true : false,
                                              "error-messages": $data.errors["to_phone"]
                                            }, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: $data.phone,
                                                "onUpdate:modelValue": ($event) => $data.phone = $event,
                                                label: _ctx.$t("phone"),
                                                required: "",
                                                outlined: "",
                                                dense: "",
                                                clearable: "",
                                                error: $data.errors["to_phone"] ? true : false,
                                                "error-messages": $data.errors["to_phone"]
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_CCol, {
                                          md: 2,
                                          sm: 5
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VSelect, {
                                              modelValue: $data.phoneCountryCode,
                                              "onUpdate:modelValue": ($event) => $data.phoneCountryCode = $event,
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
                                          md: 10,
                                          sm: 7
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: $data.phone,
                                              "onUpdate:modelValue": ($event) => $data.phone = $event,
                                              label: _ctx.$t("phone"),
                                              required: "",
                                              outlined: "",
                                              dense: "",
                                              clearable: "",
                                              error: $data.errors["to_phone"] ? true : false,
                                              "error-messages": $data.errors["to_phone"]
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_CRow, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_CCol, {
                                        md: 2,
                                        sm: 5
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(VSelect, {
                                              modelValue: $data.faxCountryCode,
                                              "onUpdate:modelValue": ($event) => $data.faxCountryCode = $event,
                                              items: $data.countryCodes,
                                              label: _ctx.$t("countrycode"),
                                              "item-title": "name",
                                              "item-value": "value",
                                              required: "",
                                              outlined: "",
                                              dense: ""
                                            }, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(VSelect, {
                                                modelValue: $data.faxCountryCode,
                                                "onUpdate:modelValue": ($event) => $data.faxCountryCode = $event,
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
                                      }, _parent7, _scopeId6));
                                      _push7(ssrRenderComponent(_component_CCol, {
                                        md: 10,
                                        sm: 7
                                      }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(ssrRenderComponent(VTextField, {
                                              modelValue: $data.fax,
                                              "onUpdate:modelValue": ($event) => $data.fax = $event,
                                              label: _ctx.$t("fax"),
                                              required: "",
                                              outlined: "",
                                              dense: "",
                                              clearable: ""
                                            }, null, _parent8, _scopeId7));
                                          } else {
                                            return [
                                              createVNode(VTextField, {
                                                modelValue: $data.fax,
                                                "onUpdate:modelValue": ($event) => $data.fax = $event,
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
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_CCol, {
                                          md: 2,
                                          sm: 5
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VSelect, {
                                              modelValue: $data.faxCountryCode,
                                              "onUpdate:modelValue": ($event) => $data.faxCountryCode = $event,
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
                                          md: 10,
                                          sm: 7
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              modelValue: $data.fax,
                                              "onUpdate:modelValue": ($event) => $data.fax = $event,
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
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VTextField, {
                                  modelValue: $data.email,
                                  "onUpdate:modelValue": ($event) => $data.email = $event,
                                  label: _ctx.$t("email"),
                                  required: "",
                                  outlined: "",
                                  dense: "",
                                  clearable: "",
                                  error: $data.errors["to_email"] ? true : false,
                                  "error-messages": $data.errors["to_email"]
                                }, null, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VTextField, {
                                  modelValue: $data.address,
                                  "onUpdate:modelValue": ($event) => $data.address = $event,
                                  label: _ctx.$t("address"),
                                  required: "",
                                  outlined: "",
                                  dense: "",
                                  clearable: "",
                                  error: $data.errors["address"] ? true : false,
                                  "error-messages": $data.errors["address"]
                                }, null, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VSelect, {
                                  modelValue: $data.status,
                                  "onUpdate:modelValue": ($event) => $data.status = $event,
                                  items: $data.purchaseStatus,
                                  label: _ctx.$t("status"),
                                  "item-title": "name",
                                  "item-value": "value",
                                  required: "",
                                  outlined: "",
                                  dense: "",
                                  error: $data.errors["status"] ? true : false,
                                  "error-messages": $data.errors["status"]
                                }, null, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VSelect, {
                                  modelValue: $data.currency,
                                  "onUpdate:modelValue": ($event) => $data.currency = $event,
                                  items: $data.currencies,
                                  label: _ctx.$t("currency"),
                                  "item-title": "name",
                                  "item-value": "value",
                                  required: "",
                                  outlined: "",
                                  dense: "",
                                  error: $data.errors["currency"] ? true : false,
                                  "error-messages": $data.errors["currency"]
                                }, null, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_v_date_input, {
                                  label: _ctx.$t("date"),
                                  modelValue: $data.date,
                                  "onUpdate:modelValue": ($event) => $data.date = $event,
                                  "prepend-icon": "",
                                  clearable: "",
                                  outlined: ""
                                }, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(VTextField, {
                                    modelValue: $data.contact,
                                    "onUpdate:modelValue": ($event) => $data.contact = $event,
                                    label: _ctx.$t("contact"),
                                    required: "",
                                    outlined: "",
                                    dense: "",
                                    clearable: "",
                                    error: $data.errors["to_contact"] ? true : false,
                                    "error-messages": $data.errors["to_contact"]
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                  createVNode(_component_CRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_CCol, {
                                        md: 2,
                                        sm: 5
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            modelValue: $data.phoneCountryCode,
                                            "onUpdate:modelValue": ($event) => $data.phoneCountryCode = $event,
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
                                        md: 10,
                                        sm: 7
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: $data.phone,
                                            "onUpdate:modelValue": ($event) => $data.phone = $event,
                                            label: _ctx.$t("phone"),
                                            required: "",
                                            outlined: "",
                                            dense: "",
                                            clearable: "",
                                            error: $data.errors["to_phone"] ? true : false,
                                            "error-messages": $data.errors["to_phone"]
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
                                        md: 2,
                                        sm: 5
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            modelValue: $data.faxCountryCode,
                                            "onUpdate:modelValue": ($event) => $data.faxCountryCode = $event,
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
                                        md: 10,
                                        sm: 7
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: $data.fax,
                                            "onUpdate:modelValue": ($event) => $data.fax = $event,
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
                                    modelValue: $data.email,
                                    "onUpdate:modelValue": ($event) => $data.email = $event,
                                    label: _ctx.$t("email"),
                                    required: "",
                                    outlined: "",
                                    dense: "",
                                    clearable: "",
                                    error: $data.errors["to_email"] ? true : false,
                                    "error-messages": $data.errors["to_email"]
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                  createVNode(VTextField, {
                                    modelValue: $data.address,
                                    "onUpdate:modelValue": ($event) => $data.address = $event,
                                    label: _ctx.$t("address"),
                                    required: "",
                                    outlined: "",
                                    dense: "",
                                    clearable: "",
                                    error: $data.errors["address"] ? true : false,
                                    "error-messages": $data.errors["address"]
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                  createVNode(VSelect, {
                                    modelValue: $data.status,
                                    "onUpdate:modelValue": ($event) => $data.status = $event,
                                    items: $data.purchaseStatus,
                                    label: _ctx.$t("status"),
                                    "item-title": "name",
                                    "item-value": "value",
                                    required: "",
                                    outlined: "",
                                    dense: "",
                                    error: $data.errors["status"] ? true : false,
                                    "error-messages": $data.errors["status"]
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                                  createVNode(VSelect, {
                                    modelValue: $data.currency,
                                    "onUpdate:modelValue": ($event) => $data.currency = $event,
                                    items: $data.currencies,
                                    label: _ctx.$t("currency"),
                                    "item-title": "name",
                                    "item-value": "value",
                                    required: "",
                                    outlined: "",
                                    dense: "",
                                    error: $data.errors["currency"] ? true : false,
                                    "error-messages": $data.errors["currency"]
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                                  createVNode(_component_v_date_input, {
                                    label: _ctx.$t("date"),
                                    modelValue: $data.date,
                                    "onUpdate:modelValue": ($event) => $data.date = $event,
                                    "prepend-icon": "",
                                    clearable: "",
                                    outlined: ""
                                  }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VExpansionPanelTitle, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("more")), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(VExpansionPanelText, null, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: $data.contact,
                                  "onUpdate:modelValue": ($event) => $data.contact = $event,
                                  label: _ctx.$t("contact"),
                                  required: "",
                                  outlined: "",
                                  dense: "",
                                  clearable: "",
                                  error: $data.errors["to_contact"] ? true : false,
                                  "error-messages": $data.errors["to_contact"]
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                createVNode(_component_CRow, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_CCol, {
                                      md: 2,
                                      sm: 5
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          modelValue: $data.phoneCountryCode,
                                          "onUpdate:modelValue": ($event) => $data.phoneCountryCode = $event,
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
                                      md: 10,
                                      sm: 7
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: $data.phone,
                                          "onUpdate:modelValue": ($event) => $data.phone = $event,
                                          label: _ctx.$t("phone"),
                                          required: "",
                                          outlined: "",
                                          dense: "",
                                          clearable: "",
                                          error: $data.errors["to_phone"] ? true : false,
                                          "error-messages": $data.errors["to_phone"]
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
                                      md: 2,
                                      sm: 5
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          modelValue: $data.faxCountryCode,
                                          "onUpdate:modelValue": ($event) => $data.faxCountryCode = $event,
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
                                      md: 10,
                                      sm: 7
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: $data.fax,
                                          "onUpdate:modelValue": ($event) => $data.fax = $event,
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
                                  modelValue: $data.email,
                                  "onUpdate:modelValue": ($event) => $data.email = $event,
                                  label: _ctx.$t("email"),
                                  required: "",
                                  outlined: "",
                                  dense: "",
                                  clearable: "",
                                  error: $data.errors["to_email"] ? true : false,
                                  "error-messages": $data.errors["to_email"]
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                createVNode(VTextField, {
                                  modelValue: $data.address,
                                  "onUpdate:modelValue": ($event) => $data.address = $event,
                                  label: _ctx.$t("address"),
                                  required: "",
                                  outlined: "",
                                  dense: "",
                                  clearable: "",
                                  error: $data.errors["address"] ? true : false,
                                  "error-messages": $data.errors["address"]
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                                createVNode(VSelect, {
                                  modelValue: $data.status,
                                  "onUpdate:modelValue": ($event) => $data.status = $event,
                                  items: $data.purchaseStatus,
                                  label: _ctx.$t("status"),
                                  "item-title": "name",
                                  "item-value": "value",
                                  required: "",
                                  outlined: "",
                                  dense: "",
                                  error: $data.errors["status"] ? true : false,
                                  "error-messages": $data.errors["status"]
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                                createVNode(VSelect, {
                                  modelValue: $data.currency,
                                  "onUpdate:modelValue": ($event) => $data.currency = $event,
                                  items: $data.currencies,
                                  label: _ctx.$t("currency"),
                                  "item-title": "name",
                                  "item-value": "value",
                                  required: "",
                                  outlined: "",
                                  dense: "",
                                  error: $data.errors["currency"] ? true : false,
                                  "error-messages": $data.errors["currency"]
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                                createVNode(_component_v_date_input, {
                                  label: _ctx.$t("date"),
                                  modelValue: $data.date,
                                  "onUpdate:modelValue": ($event) => $data.date = $event,
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
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VExpansionPanel, null, {
                        default: withCtx(() => [
                          createVNode(VExpansionPanelTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("more")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VExpansionPanelText, null, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: $data.contact,
                                "onUpdate:modelValue": ($event) => $data.contact = $event,
                                label: _ctx.$t("contact"),
                                required: "",
                                outlined: "",
                                dense: "",
                                clearable: "",
                                error: $data.errors["to_contact"] ? true : false,
                                "error-messages": $data.errors["to_contact"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                              createVNode(_component_CRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CCol, {
                                    md: 2,
                                    sm: 5
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        modelValue: $data.phoneCountryCode,
                                        "onUpdate:modelValue": ($event) => $data.phoneCountryCode = $event,
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
                                    md: 10,
                                    sm: 7
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: $data.phone,
                                        "onUpdate:modelValue": ($event) => $data.phone = $event,
                                        label: _ctx.$t("phone"),
                                        required: "",
                                        outlined: "",
                                        dense: "",
                                        clearable: "",
                                        error: $data.errors["to_phone"] ? true : false,
                                        "error-messages": $data.errors["to_phone"]
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
                                    md: 2,
                                    sm: 5
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        modelValue: $data.faxCountryCode,
                                        "onUpdate:modelValue": ($event) => $data.faxCountryCode = $event,
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
                                    md: 10,
                                    sm: 7
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: $data.fax,
                                        "onUpdate:modelValue": ($event) => $data.fax = $event,
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
                                modelValue: $data.email,
                                "onUpdate:modelValue": ($event) => $data.email = $event,
                                label: _ctx.$t("email"),
                                required: "",
                                outlined: "",
                                dense: "",
                                clearable: "",
                                error: $data.errors["to_email"] ? true : false,
                                "error-messages": $data.errors["to_email"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                              createVNode(VTextField, {
                                modelValue: $data.address,
                                "onUpdate:modelValue": ($event) => $data.address = $event,
                                label: _ctx.$t("address"),
                                required: "",
                                outlined: "",
                                dense: "",
                                clearable: "",
                                error: $data.errors["address"] ? true : false,
                                "error-messages": $data.errors["address"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                              createVNode(VSelect, {
                                modelValue: $data.status,
                                "onUpdate:modelValue": ($event) => $data.status = $event,
                                items: $data.purchaseStatus,
                                label: _ctx.$t("status"),
                                "item-title": "name",
                                "item-value": "value",
                                required: "",
                                outlined: "",
                                dense: "",
                                error: $data.errors["status"] ? true : false,
                                "error-messages": $data.errors["status"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                              createVNode(VSelect, {
                                modelValue: $data.currency,
                                "onUpdate:modelValue": ($event) => $data.currency = $event,
                                items: $data.currencies,
                                label: _ctx.$t("currency"),
                                "item-title": "name",
                                "item-value": "value",
                                required: "",
                                outlined: "",
                                dense: "",
                                error: $data.errors["currency"] ? true : false,
                                "error-messages": $data.errors["currency"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                              createVNode(_component_v_date_input, {
                                label: _ctx.$t("date"),
                                modelValue: $data.date,
                                "onUpdate:modelValue": ($event) => $data.date = $event,
                                "prepend-icon": "",
                                clearable: "",
                                outlined: ""
                              }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
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
              _push3(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "12",
                      sm: "12"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<h4 class="my-2" data-v-dfaa7a0c${_scopeId4}>${ssrInterpolate(_ctx.$t("purchase.title"))}</h4>`);
                        } else {
                          return [
                            createVNode("h4", { class: "my-2" }, toDisplayString(_ctx.$t("purchase.title")), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, {
                        md: "12",
                        sm: "12"
                      }, {
                        default: withCtx(() => [
                          createVNode("h4", { class: "my-2" }, toDisplayString(_ctx.$t("purchase.title")), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`<hr data-v-dfaa7a0c${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "12",
                      sm: "12"
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
                                  modelValue: $data.table.item.search,
                                  "onUpdate:modelValue": ($event) => $data.table.item.search = $event
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
                                    modelValue: $data.table.item.search,
                                    "onUpdate:modelValue": ($event) => $data.table.item.search = $event
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
                                  modelValue: $data.table.item.search,
                                  "onUpdate:modelValue": ($event) => $data.table.item.search = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                      createVNode(_component_CCol, {
                        md: "12",
                        sm: "12"
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
                                modelValue: $data.table.item.search,
                                "onUpdate:modelValue": ($event) => $data.table.item.search = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
              _push3(ssrRenderComponent(VDataTable, {
                class: "my-2 elevation-1",
                headers: $data.table.item.headers,
                items: $data.items,
                search: $data.table.item.search,
                loading: $data.fetchLoading.table,
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
                    if (item["32-S"]) {
                      _push4(ssrRenderComponent(_component_v_number_input, {
                        modelValue: item["32-S"].unit,
                        "onUpdate:modelValue": ($event) => item["32-S"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<span data-v-dfaa7a0c${_scopeId3}>－</span>`);
                    }
                  } else {
                    return [
                      item["32-S"] ? (openBlock(), createBlock(_component_v_number_input, {
                        key: 0,
                        modelValue: item["32-S"].unit,
                        "onUpdate:modelValue": ($event) => item["32-S"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`item.34-M`]: withCtx(({ index, item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item["34-M"]) {
                      _push4(ssrRenderComponent(_component_v_number_input, {
                        modelValue: item["34-M"].unit,
                        "onUpdate:modelValue": ($event) => item["34-M"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<span data-v-dfaa7a0c${_scopeId3}>－</span>`);
                    }
                  } else {
                    return [
                      item["34-M"] ? (openBlock(), createBlock(_component_v_number_input, {
                        key: 0,
                        modelValue: item["34-M"].unit,
                        "onUpdate:modelValue": ($event) => item["34-M"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`item.36-L`]: withCtx(({ index, item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item["36-L"]) {
                      _push4(ssrRenderComponent(_component_v_number_input, {
                        modelValue: item["36-L"].unit,
                        "onUpdate:modelValue": ($event) => item["36-L"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<span data-v-dfaa7a0c${_scopeId3}>－</span>`);
                    }
                  } else {
                    return [
                      item["36-L"] ? (openBlock(), createBlock(_component_v_number_input, {
                        key: 0,
                        modelValue: item["36-L"].unit,
                        "onUpdate:modelValue": ($event) => item["36-L"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`item.38-XL`]: withCtx(({ index, item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item["38-XL"]) {
                      _push4(ssrRenderComponent(_component_v_number_input, {
                        modelValue: item["38-XL"].unit,
                        "onUpdate:modelValue": ($event) => item["38-XL"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<span data-v-dfaa7a0c${_scopeId3}>－</span>`);
                    }
                  } else {
                    return [
                      item["38-XL"] ? (openBlock(), createBlock(_component_v_number_input, {
                        key: 0,
                        modelValue: item["38-XL"].unit,
                        "onUpdate:modelValue": ($event) => item["38-XL"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`item.40-Q`]: withCtx(({ index, item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item["40-Q"]) {
                      _push4(ssrRenderComponent(_component_v_number_input, {
                        modelValue: item["40-Q"].unit,
                        "onUpdate:modelValue": ($event) => item["40-Q"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<span data-v-dfaa7a0c${_scopeId3}>－</span>`);
                    }
                  } else {
                    return [
                      item["40-Q"] ? (openBlock(), createBlock(_component_v_number_input, {
                        key: 0,
                        modelValue: item["40-Q"].unit,
                        "onUpdate:modelValue": ($event) => item["40-Q"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`item.42-EQ`]: withCtx(({ index, item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item["42-EQ"]) {
                      _push4(ssrRenderComponent(_component_v_number_input, {
                        modelValue: item["42-EQ"].unit,
                        "onUpdate:modelValue": ($event) => item["42-EQ"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<span data-v-dfaa7a0c${_scopeId3}>－</span>`);
                    }
                  } else {
                    return [
                      item["42-EQ"] ? (openBlock(), createBlock(_component_v_number_input, {
                        key: 0,
                        modelValue: item["42-EQ"].unit,
                        "onUpdate:modelValue": ($event) => item["42-EQ"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`item.44-Free`]: withCtx(({ index, item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item["44-Free"]) {
                      _push4(ssrRenderComponent(_component_v_number_input, {
                        modelValue: item["44-Free"].unit,
                        "onUpdate:modelValue": ($event) => item["44-Free"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<span data-v-dfaa7a0c${_scopeId3}>－</span>`);
                    }
                  } else {
                    return [
                      item["44-Free"] ? (openBlock(), createBlock(_component_v_number_input, {
                        key: 0,
                        modelValue: item["44-Free"].unit,
                        "onUpdate:modelValue": ($event) => item["44-Free"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`body.append`]: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<tr data-v-dfaa7a0c${_scopeId3}><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td class="p-2" data-v-dfaa7a0c${_scopeId3}>${ssrInterpolate(_ctx.$t("total-unit"))}</td><td class="p-2" colspan="4" data-v-dfaa7a0c${_scopeId3}>`);
                    if ($data.totalunit) {
                      _push4(`<span data-v-dfaa7a0c${_scopeId3}>${ssrInterpolate($data.totalunit.toLocaleString())}</span>`);
                    } else {
                      _push4(`<span data-v-dfaa7a0c${_scopeId3}>${ssrInterpolate("0".toLocaleString())}</span>`);
                    }
                    _push4(`</td></tr><tr data-v-dfaa7a0c${_scopeId3}><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td data-v-dfaa7a0c${_scopeId3}></td><td class="p-2" data-v-dfaa7a0c${_scopeId3}>${ssrInterpolate(_ctx.$t("subtotal"))} ${ssrInterpolate(": ")}</td><td class="p-2" colspan="4" data-v-dfaa7a0c${_scopeId3}>`);
                    if ($data.subtotal) {
                      _push4(`<span data-v-dfaa7a0c${_scopeId3}>${ssrInterpolate("$ ")} ${ssrInterpolate($data.subtotal.toLocaleString())} ${ssrInterpolate($data.currency)}</span>`);
                    } else {
                      _push4(`<span data-v-dfaa7a0c${_scopeId3}>${ssrInterpolate("$ ")} ${ssrInterpolate("0".toLocaleString())} ${ssrInterpolate($data.currency)}</span>`);
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
                        createVNode("td", { class: "p-2" }, toDisplayString(_ctx.$t("total-unit")), 1),
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
                        createVNode("td", { class: "p-2" }, toDisplayString(_ctx.$t("subtotal")) + " " + toDisplayString(": "), 1),
                        createVNode("td", {
                          class: "p-2",
                          colspan: "4"
                        }, [
                          $data.subtotal ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString("$ ") + " " + toDisplayString($data.subtotal.toLocaleString()) + " " + toDisplayString($data.currency), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("$ ") + " " + toDisplayString("0".toLocaleString()) + " " + toDisplayString($data.currency), 1))
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, _parent3, _scopeId2));
              _push3(`<hr data-v-dfaa7a0c${_scopeId2}>`);
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
                createVNode(_component_CRow, { class: "px-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: "9",
                      sm: "9"
                    }, {
                      default: withCtx(() => [
                        createVNode("h4", null, toDisplayString(_ctx.$t("create")) + toDisplayString(_ctx.$t("purchase.title")), 1)
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
                          disabled: $data.fetchLoading.form
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
                createVNode("hr"),
                createVNode("form", null, [
                  createVNode(VTextField, {
                    modelValue: $data.supplierNumber,
                    "onUpdate:modelValue": ($event) => $data.supplierNumber = $event,
                    label: _ctx.$t("number"),
                    required: "",
                    outlined: "",
                    dense: "",
                    clearable: "",
                    error: $data.errors["to_company_number"] ? true : false,
                    "error-messages": $data.errors["to_company_number"]
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(VTextField, {
                    modelValue: $data.supplierName,
                    "onUpdate:modelValue": ($event) => $data.supplierName = $event,
                    label: _ctx.$t("supplier"),
                    required: "",
                    outlined: "",
                    dense: "",
                    clearable: "",
                    error: $data.errors["to_company"] ? true : false,
                    "error-messages": $data.errors["to_company"]
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(VExpansionPanels, null, {
                    default: withCtx(() => [
                      createVNode(VExpansionPanel, null, {
                        default: withCtx(() => [
                          createVNode(VExpansionPanelTitle, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("more")), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VExpansionPanelText, null, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: $data.contact,
                                "onUpdate:modelValue": ($event) => $data.contact = $event,
                                label: _ctx.$t("contact"),
                                required: "",
                                outlined: "",
                                dense: "",
                                clearable: "",
                                error: $data.errors["to_contact"] ? true : false,
                                "error-messages": $data.errors["to_contact"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                              createVNode(_component_CRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CCol, {
                                    md: 2,
                                    sm: 5
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        modelValue: $data.phoneCountryCode,
                                        "onUpdate:modelValue": ($event) => $data.phoneCountryCode = $event,
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
                                    md: 10,
                                    sm: 7
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: $data.phone,
                                        "onUpdate:modelValue": ($event) => $data.phone = $event,
                                        label: _ctx.$t("phone"),
                                        required: "",
                                        outlined: "",
                                        dense: "",
                                        clearable: "",
                                        error: $data.errors["to_phone"] ? true : false,
                                        "error-messages": $data.errors["to_phone"]
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
                                    md: 2,
                                    sm: 5
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        modelValue: $data.faxCountryCode,
                                        "onUpdate:modelValue": ($event) => $data.faxCountryCode = $event,
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
                                    md: 10,
                                    sm: 7
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: $data.fax,
                                        "onUpdate:modelValue": ($event) => $data.fax = $event,
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
                                modelValue: $data.email,
                                "onUpdate:modelValue": ($event) => $data.email = $event,
                                label: _ctx.$t("email"),
                                required: "",
                                outlined: "",
                                dense: "",
                                clearable: "",
                                error: $data.errors["to_email"] ? true : false,
                                "error-messages": $data.errors["to_email"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                              createVNode(VTextField, {
                                modelValue: $data.address,
                                "onUpdate:modelValue": ($event) => $data.address = $event,
                                label: _ctx.$t("address"),
                                required: "",
                                outlined: "",
                                dense: "",
                                clearable: "",
                                error: $data.errors["address"] ? true : false,
                                "error-messages": $data.errors["address"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                              createVNode(VSelect, {
                                modelValue: $data.status,
                                "onUpdate:modelValue": ($event) => $data.status = $event,
                                items: $data.purchaseStatus,
                                label: _ctx.$t("status"),
                                "item-title": "name",
                                "item-value": "value",
                                required: "",
                                outlined: "",
                                dense: "",
                                error: $data.errors["status"] ? true : false,
                                "error-messages": $data.errors["status"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                              createVNode(VSelect, {
                                modelValue: $data.currency,
                                "onUpdate:modelValue": ($event) => $data.currency = $event,
                                items: $data.currencies,
                                label: _ctx.$t("currency"),
                                "item-title": "name",
                                "item-value": "value",
                                required: "",
                                outlined: "",
                                dense: "",
                                error: $data.errors["currency"] ? true : false,
                                "error-messages": $data.errors["currency"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                              createVNode(_component_v_date_input, {
                                label: _ctx.$t("date"),
                                modelValue: $data.date,
                                "onUpdate:modelValue": ($event) => $data.date = $event,
                                "prepend-icon": "",
                                clearable: "",
                                outlined: ""
                              }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CRow, { class: "p-2" }, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        md: "12",
                        sm: "12"
                      }, {
                        default: withCtx(() => [
                          createVNode("h4", { class: "my-2" }, toDisplayString(_ctx.$t("purchase.title")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("hr"),
                  createVNode(_component_CRow, { class: "p-2" }, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        md: "12",
                        sm: "12"
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
                                modelValue: $data.table.item.search,
                                "onUpdate:modelValue": ($event) => $data.table.item.search = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VDataTable, {
                    class: "my-2 elevation-1",
                    headers: $data.table.item.headers,
                    items: $data.items,
                    search: $data.table.item.search,
                    loading: $data.fetchLoading.table,
                    "mobile-breakpoint": 0
                  }, {
                    loading: withCtx(() => [
                      createVNode(VSkeletonLoader, { type: "table-row@10" })
                    ]),
                    [`item.32-S`]: withCtx(({ index, item }) => [
                      item["32-S"] ? (openBlock(), createBlock(_component_v_number_input, {
                        key: 0,
                        modelValue: item["32-S"].unit,
                        "onUpdate:modelValue": ($event) => item["32-S"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ]),
                    [`item.34-M`]: withCtx(({ index, item }) => [
                      item["34-M"] ? (openBlock(), createBlock(_component_v_number_input, {
                        key: 0,
                        modelValue: item["34-M"].unit,
                        "onUpdate:modelValue": ($event) => item["34-M"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ]),
                    [`item.36-L`]: withCtx(({ index, item }) => [
                      item["36-L"] ? (openBlock(), createBlock(_component_v_number_input, {
                        key: 0,
                        modelValue: item["36-L"].unit,
                        "onUpdate:modelValue": ($event) => item["36-L"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ]),
                    [`item.38-XL`]: withCtx(({ index, item }) => [
                      item["38-XL"] ? (openBlock(), createBlock(_component_v_number_input, {
                        key: 0,
                        modelValue: item["38-XL"].unit,
                        "onUpdate:modelValue": ($event) => item["38-XL"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ]),
                    [`item.40-Q`]: withCtx(({ index, item }) => [
                      item["40-Q"] ? (openBlock(), createBlock(_component_v_number_input, {
                        key: 0,
                        modelValue: item["40-Q"].unit,
                        "onUpdate:modelValue": ($event) => item["40-Q"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ]),
                    [`item.42-EQ`]: withCtx(({ index, item }) => [
                      item["42-EQ"] ? (openBlock(), createBlock(_component_v_number_input, {
                        key: 0,
                        modelValue: item["42-EQ"].unit,
                        "onUpdate:modelValue": ($event) => item["42-EQ"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ]),
                    [`item.44-Free`]: withCtx(({ index, item }) => [
                      item["44-Free"] ? (openBlock(), createBlock(_component_v_number_input, {
                        key: 0,
                        modelValue: item["44-Free"].unit,
                        "onUpdate:modelValue": ($event) => item["44-Free"].unit = $event,
                        type: "number",
                        variant: "plain",
                        "hide-details": "",
                        required: "",
                        dense: "",
                        clearable: "",
                        min: 0,
                        onChange: ($event) => $options.change(index, item)
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
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
                        createVNode("td", { class: "p-2" }, toDisplayString(_ctx.$t("total-unit")), 1),
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
                        createVNode("td", { class: "p-2" }, toDisplayString(_ctx.$t("subtotal")) + " " + toDisplayString(": "), 1),
                        createVNode("td", {
                          class: "p-2",
                          colspan: "4"
                        }, [
                          $data.subtotal ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString("$ ") + " " + toDisplayString($data.subtotal.toLocaleString()) + " " + toDisplayString($data.currency), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("$ ") + " " + toDisplayString("0".toLocaleString()) + " " + toDisplayString($data.currency), 1))
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1032, ["headers", "items", "search", "loading"]),
                  createVNode("hr"),
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
          createVNode(_component_CreatePurchaseDialog, { ref: "scannerDialog" }, null, 512),
          createVNode(VProgressLinear, {
            active: $data.fetchLoading.form,
            indeterminate: "",
            color: "cyan"
          }, null, 8, ["active"]),
          createVNode(_component_CCardBody, null, {
            default: withCtx(() => [
              createVNode(_component_CRow, { class: "px-2" }, {
                default: withCtx(() => [
                  createVNode(_component_CCol, {
                    md: "9",
                    sm: "9"
                  }, {
                    default: withCtx(() => [
                      createVNode("h4", null, toDisplayString(_ctx.$t("create")) + toDisplayString(_ctx.$t("purchase.title")), 1)
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
                        disabled: $data.fetchLoading.form
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
              createVNode("hr"),
              createVNode("form", null, [
                createVNode(VTextField, {
                  modelValue: $data.supplierNumber,
                  "onUpdate:modelValue": ($event) => $data.supplierNumber = $event,
                  label: _ctx.$t("number"),
                  required: "",
                  outlined: "",
                  dense: "",
                  clearable: "",
                  error: $data.errors["to_company_number"] ? true : false,
                  "error-messages": $data.errors["to_company_number"]
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(VTextField, {
                  modelValue: $data.supplierName,
                  "onUpdate:modelValue": ($event) => $data.supplierName = $event,
                  label: _ctx.$t("supplier"),
                  required: "",
                  outlined: "",
                  dense: "",
                  clearable: "",
                  error: $data.errors["to_company"] ? true : false,
                  "error-messages": $data.errors["to_company"]
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(VExpansionPanels, null, {
                  default: withCtx(() => [
                    createVNode(VExpansionPanel, null, {
                      default: withCtx(() => [
                        createVNode(VExpansionPanelTitle, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("more")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VExpansionPanelText, null, {
                          default: withCtx(() => [
                            createVNode(VTextField, {
                              modelValue: $data.contact,
                              "onUpdate:modelValue": ($event) => $data.contact = $event,
                              label: _ctx.$t("contact"),
                              required: "",
                              outlined: "",
                              dense: "",
                              clearable: "",
                              error: $data.errors["to_contact"] ? true : false,
                              "error-messages": $data.errors["to_contact"]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                            createVNode(_component_CRow, null, {
                              default: withCtx(() => [
                                createVNode(_component_CCol, {
                                  md: 2,
                                  sm: 5
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      modelValue: $data.phoneCountryCode,
                                      "onUpdate:modelValue": ($event) => $data.phoneCountryCode = $event,
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
                                  md: 10,
                                  sm: 7
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: $data.phone,
                                      "onUpdate:modelValue": ($event) => $data.phone = $event,
                                      label: _ctx.$t("phone"),
                                      required: "",
                                      outlined: "",
                                      dense: "",
                                      clearable: "",
                                      error: $data.errors["to_phone"] ? true : false,
                                      "error-messages": $data.errors["to_phone"]
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
                                  md: 2,
                                  sm: 5
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      modelValue: $data.faxCountryCode,
                                      "onUpdate:modelValue": ($event) => $data.faxCountryCode = $event,
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
                                  md: 10,
                                  sm: 7
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: $data.fax,
                                      "onUpdate:modelValue": ($event) => $data.fax = $event,
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
                              modelValue: $data.email,
                              "onUpdate:modelValue": ($event) => $data.email = $event,
                              label: _ctx.$t("email"),
                              required: "",
                              outlined: "",
                              dense: "",
                              clearable: "",
                              error: $data.errors["to_email"] ? true : false,
                              "error-messages": $data.errors["to_email"]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                            createVNode(VTextField, {
                              modelValue: $data.address,
                              "onUpdate:modelValue": ($event) => $data.address = $event,
                              label: _ctx.$t("address"),
                              required: "",
                              outlined: "",
                              dense: "",
                              clearable: "",
                              error: $data.errors["address"] ? true : false,
                              "error-messages": $data.errors["address"]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                            createVNode(VSelect, {
                              modelValue: $data.status,
                              "onUpdate:modelValue": ($event) => $data.status = $event,
                              items: $data.purchaseStatus,
                              label: _ctx.$t("status"),
                              "item-title": "name",
                              "item-value": "value",
                              required: "",
                              outlined: "",
                              dense: "",
                              error: $data.errors["status"] ? true : false,
                              "error-messages": $data.errors["status"]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                            createVNode(VSelect, {
                              modelValue: $data.currency,
                              "onUpdate:modelValue": ($event) => $data.currency = $event,
                              items: $data.currencies,
                              label: _ctx.$t("currency"),
                              "item-title": "name",
                              "item-value": "value",
                              required: "",
                              outlined: "",
                              dense: "",
                              error: $data.errors["currency"] ? true : false,
                              "error-messages": $data.errors["currency"]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                            createVNode(_component_v_date_input, {
                              label: _ctx.$t("date"),
                              modelValue: $data.date,
                              "onUpdate:modelValue": ($event) => $data.date = $event,
                              "prepend-icon": "",
                              clearable: "",
                              outlined: ""
                            }, null, 8, ["label", "modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CRow, { class: "p-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: "12",
                      sm: "12"
                    }, {
                      default: withCtx(() => [
                        createVNode("h4", { class: "my-2" }, toDisplayString(_ctx.$t("purchase.title")), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("hr"),
                createVNode(_component_CRow, { class: "p-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: "12",
                      sm: "12"
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
                              modelValue: $data.table.item.search,
                              "onUpdate:modelValue": ($event) => $data.table.item.search = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  class: "my-2 elevation-1",
                  headers: $data.table.item.headers,
                  items: $data.items,
                  search: $data.table.item.search,
                  loading: $data.fetchLoading.table,
                  "mobile-breakpoint": 0
                }, {
                  loading: withCtx(() => [
                    createVNode(VSkeletonLoader, { type: "table-row@10" })
                  ]),
                  [`item.32-S`]: withCtx(({ index, item }) => [
                    item["32-S"] ? (openBlock(), createBlock(_component_v_number_input, {
                      key: 0,
                      modelValue: item["32-S"].unit,
                      "onUpdate:modelValue": ($event) => item["32-S"].unit = $event,
                      type: "number",
                      variant: "plain",
                      "hide-details": "",
                      required: "",
                      dense: "",
                      clearable: "",
                      min: 0,
                      onChange: ($event) => $options.change(index, item)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ]),
                  [`item.34-M`]: withCtx(({ index, item }) => [
                    item["34-M"] ? (openBlock(), createBlock(_component_v_number_input, {
                      key: 0,
                      modelValue: item["34-M"].unit,
                      "onUpdate:modelValue": ($event) => item["34-M"].unit = $event,
                      type: "number",
                      variant: "plain",
                      "hide-details": "",
                      required: "",
                      dense: "",
                      clearable: "",
                      min: 0,
                      onChange: ($event) => $options.change(index, item)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ]),
                  [`item.36-L`]: withCtx(({ index, item }) => [
                    item["36-L"] ? (openBlock(), createBlock(_component_v_number_input, {
                      key: 0,
                      modelValue: item["36-L"].unit,
                      "onUpdate:modelValue": ($event) => item["36-L"].unit = $event,
                      type: "number",
                      variant: "plain",
                      "hide-details": "",
                      required: "",
                      dense: "",
                      clearable: "",
                      min: 0,
                      onChange: ($event) => $options.change(index, item)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ]),
                  [`item.38-XL`]: withCtx(({ index, item }) => [
                    item["38-XL"] ? (openBlock(), createBlock(_component_v_number_input, {
                      key: 0,
                      modelValue: item["38-XL"].unit,
                      "onUpdate:modelValue": ($event) => item["38-XL"].unit = $event,
                      type: "number",
                      variant: "plain",
                      "hide-details": "",
                      required: "",
                      dense: "",
                      clearable: "",
                      min: 0,
                      onChange: ($event) => $options.change(index, item)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ]),
                  [`item.40-Q`]: withCtx(({ index, item }) => [
                    item["40-Q"] ? (openBlock(), createBlock(_component_v_number_input, {
                      key: 0,
                      modelValue: item["40-Q"].unit,
                      "onUpdate:modelValue": ($event) => item["40-Q"].unit = $event,
                      type: "number",
                      variant: "plain",
                      "hide-details": "",
                      required: "",
                      dense: "",
                      clearable: "",
                      min: 0,
                      onChange: ($event) => $options.change(index, item)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ]),
                  [`item.42-EQ`]: withCtx(({ index, item }) => [
                    item["42-EQ"] ? (openBlock(), createBlock(_component_v_number_input, {
                      key: 0,
                      modelValue: item["42-EQ"].unit,
                      "onUpdate:modelValue": ($event) => item["42-EQ"].unit = $event,
                      type: "number",
                      variant: "plain",
                      "hide-details": "",
                      required: "",
                      dense: "",
                      clearable: "",
                      min: 0,
                      onChange: ($event) => $options.change(index, item)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ]),
                  [`item.44-Free`]: withCtx(({ index, item }) => [
                    item["44-Free"] ? (openBlock(), createBlock(_component_v_number_input, {
                      key: 0,
                      modelValue: item["44-Free"].unit,
                      "onUpdate:modelValue": ($event) => item["44-Free"].unit = $event,
                      type: "number",
                      variant: "plain",
                      "hide-details": "",
                      required: "",
                      dense: "",
                      clearable: "",
                      min: 0,
                      onChange: ($event) => $options.change(index, item)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "onChange"])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
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
                      createVNode("td", { class: "p-2" }, toDisplayString(_ctx.$t("total-unit")), 1),
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
                      createVNode("td", { class: "p-2" }, toDisplayString(_ctx.$t("subtotal")) + " " + toDisplayString(": "), 1),
                      createVNode("td", {
                        class: "p-2",
                        colspan: "4"
                      }, [
                        $data.subtotal ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString("$ ") + " " + toDisplayString($data.subtotal.toLocaleString()) + " " + toDisplayString($data.currency), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("$ ") + " " + toDisplayString("0".toLocaleString()) + " " + toDisplayString($data.currency), 1))
                      ])
                    ])
                  ]),
                  _: 2
                }, 1032, ["headers", "items", "search", "loading"]),
                createVNode("hr"),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/purchases/CreatePurchase.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CreatePurchase = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-dfaa7a0c"]]);
export {
  CreatePurchase as default
};
