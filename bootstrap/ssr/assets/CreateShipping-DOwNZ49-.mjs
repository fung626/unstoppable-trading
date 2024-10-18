import { A as AddNewShippingItemsTableDialog, _ as _export_sfc, a as Dialog, g as ScannerDialog, c as codes, e as currencies, i as shippingStatus, s as sizes } from "../app.mjs";
import { mapState } from "vuex";
import { debounce } from "lodash";
import { resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext, createSlots, openBlock, createBlock, Fragment, renderList, withDirectives, vModelText, createCommentVNode } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { VAutocomplete } from "vuetify/lib/components/VAutocomplete/index.mjs";
import { VDataTable } from "vuetify/lib/components/VDataTable/index.mjs";
import { VProgressCircular } from "vuetify/lib/components/VProgressCircular/index.mjs";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
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
import "uuid";
import "vuetify/lib/components/VTooltip/index.mjs";
import "vuetify/lib/components/VCard/index.mjs";
import "vuetify/lib/components/VDialog/index.mjs";
import "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import "vuetify";
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
const _sfc_main$1 = {
  name: "QuickAddNewShippingItem",
  components: {
    AddNewShippingItemTableDialog: AddNewShippingItemsTableDialog
  },
  data() {
    return {
      value: null,
      search: null,
      autocomplete: {
        data: {
          items: [],
          loading: false
        }
      }
    };
  },
  watch: {
    search: function(newVal, oldVal) {
      this.fetch(this, newVal, oldVal);
    }
  },
  methods: {
    fetch: debounce((self, newVal, oldVal) => {
      if (newVal == oldVal && newVal != "" || !newVal || newVal == "") {
        return;
      }
      const found = self.autocomplete.data.items.find(
        (x) => x.name === newVal
      );
      if (found) {
        return;
      }
      self.autocomplete.data.loading = true;
      let data = {
        search: newVal
      };
      self.$store.dispatch("goods/quicksearch/get", data).then((response) => {
        self.autocomplete.data.items = response.data;
        self.autocomplete.data.loading = false;
      }).catch((error) => {
        self.autocomplete.data.loading = false;
      });
    }, 300),
    async table() {
      console.log("table");
      await this.$refs.dialog.open();
    },
    add() {
      if (this.value) ;
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_AddNewShippingItemTableDialog = resolveComponent("AddNewShippingItemTableDialog");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButton = resolveComponent("CButton");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_AddNewShippingItemTableDialog, { ref: "dialog" }, null, _parent));
  _push(`<div><h4 class="mb-4">${ssrInterpolate(`${_ctx.$t("shipping.quick-search-goods")}`)}</h4>`);
  _push(ssrRenderComponent(_component_CRow, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCol, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VAutocomplete, {
                modelValue: $data.value,
                "onUpdate:modelValue": ($event) => $data.value = $event,
                search: $data.search,
                "onUpdate:search": ($event) => $data.search = $event,
                items: $data.autocomplete.data.items,
                loading: $data.autocomplete.data.loading,
                required: "",
                outlined: "",
                dense: "",
                "hide-selected": "",
                density: "compact",
                "item-title": "name",
                "item-value": "id",
                "return-object": ""
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VAutocomplete, {
                  modelValue: $data.value,
                  "onUpdate:modelValue": ($event) => $data.value = $event,
                  search: $data.search,
                  "onUpdate:search": ($event) => $data.search = $event,
                  items: $data.autocomplete.data.items,
                  loading: $data.autocomplete.data.loading,
                  required: "",
                  outlined: "",
                  dense: "",
                  "hide-selected": "",
                  density: "compact",
                  "item-title": "name",
                  "item-value": "id",
                  "return-object": ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "search", "onUpdate:search", "items", "loading"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CCol, null, {
            default: withCtx(() => [
              createVNode(VAutocomplete, {
                modelValue: $data.value,
                "onUpdate:modelValue": ($event) => $data.value = $event,
                search: $data.search,
                "onUpdate:search": ($event) => $data.search = $event,
                items: $data.autocomplete.data.items,
                loading: $data.autocomplete.data.loading,
                required: "",
                outlined: "",
                dense: "",
                "hide-selected": "",
                density: "compact",
                "item-title": "name",
                "item-value": "id",
                "return-object": ""
              }, null, 8, ["modelValue", "onUpdate:modelValue", "search", "onUpdate:search", "items", "loading"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(_component_CRow, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCol, { class: "text-right" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.table,
                color: "primary",
                class: "btn-block px-4",
                size: "sm"
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.$t("shipping.browse-stock-table"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("shipping.browse-stock-table")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.add,
                color: "primary",
                class: "btn-block ms-2 px-4",
                size: "sm",
                disabled: $data.autocomplete.data.loading || !$data.value
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.$t("shipping.add-shipment-goods"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("shipping.add-shipment-goods")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CButton, {
                  onClick: $options.table,
                  color: "primary",
                  class: "btn-block px-4",
                  size: "sm"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("shipping.browse-stock-table")), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_CButton, {
                  onClick: $options.add,
                  color: "primary",
                  class: "btn-block ms-2 px-4",
                  size: "sm",
                  disabled: $data.autocomplete.data.loading || !$data.value
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("shipping.add-shipment-goods")), 1)
                  ]),
                  _: 1
                }, 8, ["onClick", "disabled"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CCol, { class: "text-right" }, {
            default: withCtx(() => [
              createVNode(_component_CButton, {
                onClick: $options.table,
                color: "primary",
                class: "btn-block px-4",
                size: "sm"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("shipping.browse-stock-table")), 1)
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_CButton, {
                onClick: $options.add,
                color: "primary",
                class: "btn-block ms-2 px-4",
                size: "sm",
                disabled: $data.autocomplete.data.loading || !$data.value
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("shipping.add-shipment-goods")), 1)
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
  }, _parent));
  _push(`</div><!--]-->`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/shippings/components/QuickAddNewShippingItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const QuickAddNewShippingItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  name: "CreateShipping",
  components: {
    Dialog,
    AddNewShippingItemsTableDialog,
    QuickAddNewShippingItem,
    ScannerDialog
  },
  computed: {
    ...mapState(["goods/create-shipping-config"]),
    ...mapState(["goods/shipping-cart"]),
    ...mapState(["goods/shippings"]),
    config() {
      let data = this["goods/create-shipping-config"].data;
      if (data) {
        return JSON.parse(JSON.stringify(data));
      }
      return {};
    },
    shippingItems() {
      return this["goods/shipping-cart"].items;
    }
  },
  data() {
    return {
      fetchLoading: {
        form: false,
        table: false
      },
      loading: false,
      items: [],
      totalunit: 0,
      subtotal: 0,
      error: false,
      client: "",
      number: "",
      name: "",
      contact: "",
      phoneCountryCode: "",
      phone: "",
      email: "",
      address: "",
      currency: "",
      status: "PENDING",
      autocomplete: {
        client: {
          search: null,
          items: [],
          loading: false
        }
      },
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
            {
              title: `${this.$t("cost")}($)`,
              value: "cost"
            }
          ]
        }
      },
      errors: {},
      countryCodes: codes,
      currencies,
      shippingStatus
    };
  },
  watch: {
    shippingItems: {
      handler(val) {
        this.fetch();
      },
      deep: true
    },
    client() {
      if (this.client) {
        this.number = this.client.number;
        this.name = this.client.name;
        this.contact = this.client.contact;
        this.phoneCountryCode = this.client.phone_country_code;
        this.phone = this.client.phone;
        this.email = this.client.email;
        this.address = this.client.address;
        this.currency = this.client.currency;
      }
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      let self = this;
      if (self.fetchLoading.table) {
        return;
      }
      self.fetchLoading.table = true;
      self.autocomplete.client.loading = true;
      let data = {
        items: this.shippingItems
      };
      this.$store.dispatch("goods/create-shipping-config/get", data).then((response) => {
        self.autocomplete.client.items = response.data.clients;
        self.items = JSON.parse(
          JSON.stringify(response.data.items)
        );
        self.fetchLoading.table = false;
        self.autocomplete.client.loading = false;
        self.updateTable();
      }).catch((error) => {
        self.fetchLoading.table = false;
        self.autocomplete.client.loading = false;
        self.updateTable();
      });
    },
    submit() {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      let data = {
        client: self.client,
        client_number: self.number,
        client_name: self.name,
        client_contact: self.contact,
        client_phone_country_code: self.phoneCountryCode,
        client_phone: self.phone,
        client_email: self.email,
        client_address: self.address,
        status: self.status,
        currency: self.currency,
        items: self.items
      };
      this.$store.dispatch("goods/shippings/create", data).then((response) => {
        self.loading = false;
        self.$store.dispatch("goods/shipping-cart/clear");
        self.$router.push({ path: "/shippings" });
      }).catch((error) => {
        var _a;
        self.loading = false;
        self.errors = (_a = error.response.data) == null ? void 0 : _a.data;
      });
    },
    change(idx, item) {
      let sizes$1 = sizes;
      let totalunit = 0;
      for (let size of sizes$1) {
        if (item[size.name]) {
          if (item[size.name].unit > item[size.name].stock_unit) {
            item[size.name].unit = item[size.name].stock_unit;
            return;
          } else if (item[size.name].unit < 0) {
            item[size.name].unit = 0;
            return;
          }
          totalunit += item[size.name].unit;
        }
      }
      this.items[idx].total_unit = totalunit;
      this.items[idx].cost = totalunit * this.items[idx].unit_price;
      this.updateTable();
    },
    updateTable() {
      this.totalunit = 0;
      this.subtotal = 0;
      for (let item of this.items) {
        this.totalunit += item.total_unit;
        this.subtotal += item.cost;
      }
    },
    async scanner() {
      await this.$refs.scannerDialog.open("Shipping");
    },
    async showNewShippingItemsTable() {
      if (await this.$refs.newShippingItemsTableDialog.open()) {
        this.fetch();
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Dialog = resolveComponent("Dialog");
  const _component_ScannerDialog = resolveComponent("ScannerDialog");
  const _component_AddNewShippingItemsTableDialog = resolveComponent("AddNewShippingItemsTableDialog");
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButtonGroup = resolveComponent("CButtonGroup");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_CInputGroup = resolveComponent("CInputGroup");
  const _component_CFormInput = resolveComponent("CFormInput");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-ebf7c675>`);
  _push(ssrRenderComponent(_component_Dialog, { ref: "dialog" }, null, _parent));
  _push(ssrRenderComponent(_component_ScannerDialog, { ref: "scannerDialog" }, null, _parent));
  _push(ssrRenderComponent(_component_AddNewShippingItemsTableDialog, { ref: "newShippingItemsTableDialog" }, null, _parent));
  _push(ssrRenderComponent(_component_CCard, null, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
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
                          _push5(`<h4 data-v-ebf7c675${_scopeId4}>${ssrInterpolate(_ctx.$t("create"))}${ssrInterpolate(_ctx.$t("shippings.title"))}</h4>`);
                        } else {
                          return [
                            createVNode("h4", null, toDisplayString(_ctx.$t("create")) + toDisplayString(_ctx.$t("shippings.title")), 1)
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
                          _push5(ssrRenderComponent(_component_CButtonGroup, { role: "group" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CButton, {
                                  onClick: $options.showNewShippingItemsTable,
                                  class: "d-flex align-items-center justify-content-center",
                                  color: "primary",
                                  size: "sm",
                                  disabled: $data.fetchLoading.form || $data.fetchLoading.form
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_CIcon, {
                                        class: "mx-1",
                                        name: "cil-playlist-add",
                                        size: "sm"
                                      }, null, _parent7, _scopeId6));
                                      _push7(` ${ssrInterpolate(_ctx.$t("shipping.add-shipment-goods"))}`);
                                    } else {
                                      return [
                                        createVNode(_component_CIcon, {
                                          class: "mx-1",
                                          name: "cil-playlist-add",
                                          size: "sm"
                                        }),
                                        createTextVNode(" " + toDisplayString(_ctx.$t("shipping.add-shipment-goods")), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_CButton, {
                                  onClick: $options.scanner,
                                  class: "d-flex align-items-center justify-content-center",
                                  color: "primary",
                                  size: "sm",
                                  disabled: $data.fetchLoading.form || $data.fetchLoading.form
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_CIcon, {
                                        class: "mx-1",
                                        name: "cil-barcode",
                                        size: "sm"
                                      }, null, _parent7, _scopeId6));
                                      _push7(` ${ssrInterpolate(_ctx.$t("scanner"))}`);
                                    } else {
                                      return [
                                        createVNode(_component_CIcon, {
                                          class: "mx-1",
                                          name: "cil-barcode",
                                          size: "sm"
                                        }),
                                        createTextVNode(" " + toDisplayString(_ctx.$t("scanner")), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_CButton, {
                                    onClick: $options.showNewShippingItemsTable,
                                    class: "d-flex align-items-center justify-content-center",
                                    color: "primary",
                                    size: "sm",
                                    disabled: $data.fetchLoading.form || $data.fetchLoading.form
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_CIcon, {
                                        class: "mx-1",
                                        name: "cil-playlist-add",
                                        size: "sm"
                                      }),
                                      createTextVNode(" " + toDisplayString(_ctx.$t("shipping.add-shipment-goods")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["onClick", "disabled"]),
                                  createVNode(_component_CButton, {
                                    onClick: $options.scanner,
                                    class: "d-flex align-items-center justify-content-center",
                                    color: "primary",
                                    size: "sm",
                                    disabled: $data.fetchLoading.form || $data.fetchLoading.form
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_CIcon, {
                                        class: "mx-1",
                                        name: "cil-barcode",
                                        size: "sm"
                                      }),
                                      createTextVNode(" " + toDisplayString(_ctx.$t("scanner")), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["onClick", "disabled"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CButtonGroup, { role: "group" }, {
                              default: withCtx(() => [
                                createVNode(_component_CButton, {
                                  onClick: $options.showNewShippingItemsTable,
                                  class: "d-flex align-items-center justify-content-center",
                                  color: "primary",
                                  size: "sm",
                                  disabled: $data.fetchLoading.form || $data.fetchLoading.form
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CIcon, {
                                      class: "mx-1",
                                      name: "cil-playlist-add",
                                      size: "sm"
                                    }),
                                    createTextVNode(" " + toDisplayString(_ctx.$t("shipping.add-shipment-goods")), 1)
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "disabled"]),
                                createVNode(_component_CButton, {
                                  onClick: $options.scanner,
                                  class: "d-flex align-items-center justify-content-center",
                                  color: "primary",
                                  size: "sm",
                                  disabled: $data.fetchLoading.form || $data.fetchLoading.form
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CIcon, {
                                      class: "mx-1",
                                      name: "cil-barcode",
                                      size: "sm"
                                    }),
                                    createTextVNode(" " + toDisplayString(_ctx.$t("scanner")), 1)
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
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, {
                        md: "9",
                        sm: "9"
                      }, {
                        default: withCtx(() => [
                          createVNode("h4", null, toDisplayString(_ctx.$t("create")) + toDisplayString(_ctx.$t("shippings.title")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "3",
                        sm: "3",
                        class: "text-right"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CButtonGroup, { role: "group" }, {
                            default: withCtx(() => [
                              createVNode(_component_CButton, {
                                onClick: $options.showNewShippingItemsTable,
                                class: "d-flex align-items-center justify-content-center",
                                color: "primary",
                                size: "sm",
                                disabled: $data.fetchLoading.form || $data.fetchLoading.form
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_CIcon, {
                                    class: "mx-1",
                                    name: "cil-playlist-add",
                                    size: "sm"
                                  }),
                                  createTextVNode(" " + toDisplayString(_ctx.$t("shipping.add-shipment-goods")), 1)
                                ]),
                                _: 1
                              }, 8, ["onClick", "disabled"]),
                              createVNode(_component_CButton, {
                                onClick: $options.scanner,
                                class: "d-flex align-items-center justify-content-center",
                                color: "primary",
                                size: "sm",
                                disabled: $data.fetchLoading.form || $data.fetchLoading.form
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_CIcon, {
                                    class: "mx-1",
                                    name: "cil-barcode",
                                    size: "sm"
                                  }),
                                  createTextVNode(" " + toDisplayString(_ctx.$t("scanner")), 1)
                                ]),
                                _: 1
                              }, 8, ["onClick", "disabled"])
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
              _push3(`<hr data-v-ebf7c675${_scopeId2}><form data-v-ebf7c675${_scopeId2}>`);
              _push3(ssrRenderComponent(VAutocomplete, {
                modelValue: $data.client,
                "onUpdate:modelValue": ($event) => $data.client = $event,
                search: $data.autocomplete.client.search,
                "onUpdate:search": ($event) => $data.autocomplete.client.search = $event,
                label: _ctx.$t("client"),
                items: $data.autocomplete.client.items,
                loading: $data.autocomplete.client.loading,
                required: "",
                outlined: "",
                dense: "",
                "hide-selected": "",
                "item-title": "title",
                "item-value": "id",
                "return-object": "",
                error: $data.errors["client"] ? true : false,
                "error-messages": $data.errors["client"]
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.number,
                "onUpdate:modelValue": ($event) => $data.number = $event,
                label: _ctx.$t("number"),
                required: "",
                outlined: "",
                dense: "",
                clearable: "",
                error: $data.errors["client_number"] ? true : false,
                "error-messages": $data.errors["client_number"]
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.name,
                "onUpdate:modelValue": ($event) => $data.name = $event,
                label: _ctx.$t("name"),
                required: "",
                outlined: "",
                dense: "",
                clearable: "",
                error: $data.errors["client_name"] ? true : false,
                "error-messages": $data.errors["client_name"]
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.contact,
                "onUpdate:modelValue": ($event) => $data.contact = $event,
                label: _ctx.$t("contact"),
                required: "",
                outlined: "",
                dense: "",
                clearable: "",
                error: $data.errors["client_contact"] ? true : false,
                "error-messages": $data.errors["client_contact"]
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CRow, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "2",
                      sm: "5"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VSelect, {
                            modelValue: $data.phoneCountryCode,
                            "onUpdate:modelValue": ($event) => $data.phoneCountryCode = $event,
                            items: $data.countryCodes,
                            label: _ctx.$t("countrycode"),
                            "item-title": "name",
                            "item-value": "value",
                            required: "",
                            outlined: "",
                            dense: "",
                            error: $data.errors["client_phone_country_code"] ? true : false,
                            "error-messages": $data.errors["client_phone_country_code"]
                          }, null, _parent5, _scopeId4));
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
                              dense: "",
                              error: $data.errors["client_phone_country_code"] ? true : false,
                              "error-messages": $data.errors["client_phone_country_code"]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "10",
                      sm: "7"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VTextField, {
                            modelValue: $data.phone,
                            "onUpdate:modelValue": ($event) => $data.phone = $event,
                            label: _ctx.$t("phone"),
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: "",
                            error: $data.errors["client_phone"] ? true : false,
                            "error-messages": $data.errors["client_phone"]
                          }, null, _parent5, _scopeId4));
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
                              error: $data.errors["client_phone"] ? true : false,
                              "error-messages": $data.errors["client_phone"]
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
                        sm: "5"
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
                            dense: "",
                            error: $data.errors["client_phone_country_code"] ? true : false,
                            "error-messages": $data.errors["client_phone_country_code"]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "10",
                        sm: "7"
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
                            error: $data.errors["client_phone"] ? true : false,
                            "error-messages": $data.errors["client_phone"]
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
                modelValue: $data.email,
                "onUpdate:modelValue": ($event) => $data.email = $event,
                label: _ctx.$t("email"),
                required: "",
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.address,
                "onUpdate:modelValue": ($event) => $data.address = $event,
                label: _ctx.$t("address"),
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VSelect, {
                modelValue: $data.status,
                "onUpdate:modelValue": ($event) => $data.status = $event,
                items: $data.shippingStatus,
                label: _ctx.$t("status"),
                "item-title": "name",
                "item-value": "value",
                required: "",
                outlined: "",
                dense: "",
                "return-object": "",
                error: $data.errors["status"] ? true : false,
                "error-messages": $data.errors["status"]
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VSelect, {
                modelValue: $data.currency,
                "onUpdate:modelValue": ($event) => $data.currency = $event,
                items: $data.currencies,
                label: _ctx.$t("currency"),
                "item-title": "name",
                "item-value": "value",
                required: "",
                outlined: "",
                dense: "",
                "return-object": "",
                error: $data.errors["currency"] ? true : false,
                "error-messages": $data.errors["currency"]
              }, null, _parent3, _scopeId2));
              _push3(`<hr data-v-ebf7c675${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, null, {
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
                      createVNode(_component_CCol, null, {
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
                "hide-default-footer": ""
              }, createSlots({
                loading: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VSkeletonLoader, { type: "table-row@10" }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VSkeletonLoader, { type: "table-row@10" })
                    ];
                  }
                }),
                [`item.unit_price`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item.unit_price) {
                      _push4(`<span data-v-ebf7c675${_scopeId3}>${ssrInterpolate(`$ ${(item.unit_price * 1).toLocaleString()}`)}</span>`);
                    } else {
                      _push4(`<span data-v-ebf7c675${_scopeId3}>－</span>`);
                    }
                  } else {
                    return [
                      item.unit_price ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(`$ ${(item.unit_price * 1).toLocaleString()}`), 1)) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`item.total_unit`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item.total_unit) {
                      _push4(`<span data-v-ebf7c675${_scopeId3}>${ssrInterpolate((item.total_unit * 1).toLocaleString())}</span>`);
                    } else {
                      _push4(`<span data-v-ebf7c675${_scopeId3}>－</span>`);
                    }
                  } else {
                    return [
                      item.total_unit ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString((item.total_unit * 1).toLocaleString()), 1)) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`item.cost`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item.cost) {
                      _push4(`<span data-v-ebf7c675${_scopeId3}>${ssrInterpolate(`$ ${(item.cost * 1).toLocaleString()}`)}</span>`);
                    } else {
                      _push4(`<span data-v-ebf7c675${_scopeId3}>－</span>`);
                    }
                  } else {
                    return [
                      item.cost ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(`$ ${(item.cost * 1).toLocaleString()}`), 1)) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`body.append`]: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<tr data-v-ebf7c675${_scopeId3}><!--[-->`);
                    ssrRenderList([...Array(10)], (i) => {
                      _push4(`<td data-v-ebf7c675${_scopeId3}></td>`);
                    });
                    _push4(`<!--]--><td class="p-2" colspan="2" data-v-ebf7c675${_scopeId3}>${ssrInterpolate(`${_ctx.$t("total-unit")}:`)}</td><td class="p-2" colspan="4" data-v-ebf7c675${_scopeId3}>`);
                    if ($data.totalunit) {
                      _push4(`<span data-v-ebf7c675${_scopeId3}>${ssrInterpolate(($data.totalunit * 1).toLocaleString())}</span>`);
                    } else {
                      _push4(`<span data-v-ebf7c675${_scopeId3}>${ssrInterpolate("0".toLocaleString())}</span>`);
                    }
                    _push4(`</td></tr><tr data-v-ebf7c675${_scopeId3}><!--[-->`);
                    ssrRenderList([...Array(10)], (i) => {
                      _push4(`<td data-v-ebf7c675${_scopeId3}></td>`);
                    });
                    _push4(`<!--]--><td class="p-2" colspan="2" data-v-ebf7c675${_scopeId3}>${ssrInterpolate(`${_ctx.$t("subtotal")}:`)}</td><td class="p-2" colspan="4" data-v-ebf7c675${_scopeId3}>`);
                    if ($data.subtotal) {
                      _push4(`<span data-v-ebf7c675${_scopeId3}>${ssrInterpolate(`$ ${($data.subtotal * 1).toLocaleString()} ${$data.currency}`)}</span>`);
                    } else {
                      _push4(`<span data-v-ebf7c675${_scopeId3}>${ssrInterpolate("$ ")} ${ssrInterpolate("0".toLocaleString())} ${ssrInterpolate($data.currency)}</span>`);
                    }
                    _push4(`</td></tr>`);
                  } else {
                    return [
                      createVNode("tr", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList([...Array(10)], (i) => {
                          return openBlock(), createBlock("td", { key: i });
                        }), 128)),
                        createVNode("td", {
                          class: "p-2",
                          colspan: "2"
                        }, toDisplayString(`${_ctx.$t("total-unit")}:`), 1),
                        createVNode("td", {
                          class: "p-2",
                          colspan: "4"
                        }, [
                          $data.totalunit ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(($data.totalunit * 1).toLocaleString()), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("0".toLocaleString()), 1))
                        ])
                      ]),
                      createVNode("tr", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList([...Array(10)], (i) => {
                          return openBlock(), createBlock("td", { key: i });
                        }), 128)),
                        createVNode("td", {
                          class: "p-2",
                          colspan: "2"
                        }, toDisplayString(`${_ctx.$t("subtotal")}:`), 1),
                        createVNode("td", {
                          class: "p-2",
                          colspan: "4"
                        }, [
                          $data.subtotal ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(`$ ${($data.subtotal * 1).toLocaleString()} ${$data.currency}`), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("$ ") + " " + toDisplayString("0".toLocaleString()) + " " + toDisplayString($data.currency), 1))
                        ])
                      ])
                    ];
                  }
                }),
                _: 2
              }, [
                renderList([
                  "32-S",
                  "34-M",
                  "36-L",
                  "38-XL",
                  "40-Q",
                  "42-EQ",
                  "44-Free"
                ], (x) => {
                  return {
                    name: `item.${x}`,
                    fn: withCtx(({ index, item }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="d-flex align-items-center justify-items-center" data-v-ebf7c675${_scopeId3}>`);
                        if (item[x] && item[x].stock_unit > 0) {
                          _push4(`<div style="${ssrRenderStyle({ width: "94px" })}" data-v-ebf7c675${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_CRow, null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_CCol, { sm: 8 }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<input${ssrRenderAttr("value", item[x].unit)} type="number"${ssrRenderAttr("min", 0)}${ssrRenderAttr("max", item[x].stock_unit)} data-v-ebf7c675${_scopeId5}>`);
                                    } else {
                                      return [
                                        withDirectives(createVNode("input", {
                                          "onUpdate:modelValue": ($event) => item[x].unit = $event,
                                          type: "number",
                                          min: 0,
                                          max: item[x].stock_unit,
                                          onChange: ($event) => $options.change(index, item)
                                        }, null, 40, ["onUpdate:modelValue", "max", "onChange"]), [
                                          [vModelText, item[x].unit]
                                        ])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_CCol, { sm: 4 }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<strong class="nowrap" style="${ssrRenderStyle({ width: "40%" })}" data-v-ebf7c675${_scopeId5}>${ssrInterpolate(`／${item[x].stock_unit}`)}</strong>`);
                                    } else {
                                      return [
                                        createVNode("strong", {
                                          class: "nowrap",
                                          style: { width: "40%" }
                                        }, toDisplayString(`／${item[x].stock_unit}`), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_CCol, { sm: 8 }, {
                                    default: withCtx(() => [
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => item[x].unit = $event,
                                        type: "number",
                                        min: 0,
                                        max: item[x].stock_unit,
                                        onChange: ($event) => $options.change(index, item)
                                      }, null, 40, ["onUpdate:modelValue", "max", "onChange"]), [
                                        [vModelText, item[x].unit]
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_CCol, { sm: 4 }, {
                                    default: withCtx(() => [
                                      createVNode("strong", {
                                        class: "nowrap",
                                        style: { width: "40%" }
                                      }, toDisplayString(`／${item[x].stock_unit}`), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<span data-v-ebf7c675${_scopeId3}>－</span>`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "d-flex align-items-center justify-items-center" }, [
                            item[x] && item[x].stock_unit > 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              style: { width: "94px" }
                            }, [
                              createVNode(_component_CRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CCol, { sm: 8 }, {
                                    default: withCtx(() => [
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => item[x].unit = $event,
                                        type: "number",
                                        min: 0,
                                        max: item[x].stock_unit,
                                        onChange: ($event) => $options.change(index, item)
                                      }, null, 40, ["onUpdate:modelValue", "max", "onChange"]), [
                                        [vModelText, item[x].unit]
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_CCol, { sm: 4 }, {
                                    default: withCtx(() => [
                                      createVNode("strong", {
                                        class: "nowrap",
                                        style: { width: "40%" }
                                      }, toDisplayString(`／${item[x].stock_unit}`), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                          ])
                        ];
                      }
                    })
                  };
                })
              ]), _parent3, _scopeId2));
              _push3(`<hr data-v-ebf7c675${_scopeId2}>`);
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
                        createVNode("h4", null, toDisplayString(_ctx.$t("create")) + toDisplayString(_ctx.$t("shippings.title")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: "3",
                      sm: "3",
                      class: "text-right"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_CButtonGroup, { role: "group" }, {
                          default: withCtx(() => [
                            createVNode(_component_CButton, {
                              onClick: $options.showNewShippingItemsTable,
                              class: "d-flex align-items-center justify-content-center",
                              color: "primary",
                              size: "sm",
                              disabled: $data.fetchLoading.form || $data.fetchLoading.form
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_CIcon, {
                                  class: "mx-1",
                                  name: "cil-playlist-add",
                                  size: "sm"
                                }),
                                createTextVNode(" " + toDisplayString(_ctx.$t("shipping.add-shipment-goods")), 1)
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled"]),
                            createVNode(_component_CButton, {
                              onClick: $options.scanner,
                              class: "d-flex align-items-center justify-content-center",
                              color: "primary",
                              size: "sm",
                              disabled: $data.fetchLoading.form || $data.fetchLoading.form
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_CIcon, {
                                  class: "mx-1",
                                  name: "cil-barcode",
                                  size: "sm"
                                }),
                                createTextVNode(" " + toDisplayString(_ctx.$t("scanner")), 1)
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("hr"),
                createVNode("form", null, [
                  createVNode(VAutocomplete, {
                    modelValue: $data.client,
                    "onUpdate:modelValue": ($event) => $data.client = $event,
                    search: $data.autocomplete.client.search,
                    "onUpdate:search": ($event) => $data.autocomplete.client.search = $event,
                    label: _ctx.$t("client"),
                    items: $data.autocomplete.client.items,
                    loading: $data.autocomplete.client.loading,
                    required: "",
                    outlined: "",
                    dense: "",
                    "hide-selected": "",
                    "item-title": "title",
                    "item-value": "id",
                    "return-object": "",
                    error: $data.errors["client"] ? true : false,
                    "error-messages": $data.errors["client"]
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "search", "onUpdate:search", "label", "items", "loading", "error", "error-messages"]),
                  createVNode(VTextField, {
                    modelValue: $data.number,
                    "onUpdate:modelValue": ($event) => $data.number = $event,
                    label: _ctx.$t("number"),
                    required: "",
                    outlined: "",
                    dense: "",
                    clearable: "",
                    error: $data.errors["client_number"] ? true : false,
                    "error-messages": $data.errors["client_number"]
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(VTextField, {
                    modelValue: $data.name,
                    "onUpdate:modelValue": ($event) => $data.name = $event,
                    label: _ctx.$t("name"),
                    required: "",
                    outlined: "",
                    dense: "",
                    clearable: "",
                    error: $data.errors["client_name"] ? true : false,
                    "error-messages": $data.errors["client_name"]
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(VTextField, {
                    modelValue: $data.contact,
                    "onUpdate:modelValue": ($event) => $data.contact = $event,
                    label: _ctx.$t("contact"),
                    required: "",
                    outlined: "",
                    dense: "",
                    clearable: "",
                    error: $data.errors["client_contact"] ? true : false,
                    "error-messages": $data.errors["client_contact"]
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(_component_CRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        md: "2",
                        sm: "5"
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
                            dense: "",
                            error: $data.errors["client_phone_country_code"] ? true : false,
                            "error-messages": $data.errors["client_phone_country_code"]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "10",
                        sm: "7"
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
                            error: $data.errors["client_phone"] ? true : false,
                            "error-messages": $data.errors["client_phone"]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
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
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                  createVNode(VTextField, {
                    modelValue: $data.address,
                    "onUpdate:modelValue": ($event) => $data.address = $event,
                    label: _ctx.$t("address"),
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                  createVNode(VSelect, {
                    modelValue: $data.status,
                    "onUpdate:modelValue": ($event) => $data.status = $event,
                    items: $data.shippingStatus,
                    label: _ctx.$t("status"),
                    "item-title": "name",
                    "item-value": "value",
                    required: "",
                    outlined: "",
                    dense: "",
                    "return-object": "",
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
                    "return-object": "",
                    error: $data.errors["currency"] ? true : false,
                    "error-messages": $data.errors["currency"]
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                  createVNode("hr"),
                  createVNode(_component_CRow, { class: "p-2" }, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, null, {
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
                    "hide-default-footer": ""
                  }, createSlots({
                    loading: withCtx(() => [
                      createVNode(VSkeletonLoader, { type: "table-row@10" })
                    ]),
                    [`item.unit_price`]: withCtx(({ item }) => [
                      item.unit_price ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(`$ ${(item.unit_price * 1).toLocaleString()}`), 1)) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ]),
                    [`item.total_unit`]: withCtx(({ item }) => [
                      item.total_unit ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString((item.total_unit * 1).toLocaleString()), 1)) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ]),
                    [`item.cost`]: withCtx(({ item }) => [
                      item.cost ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(`$ ${(item.cost * 1).toLocaleString()}`), 1)) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                    ]),
                    [`body.append`]: withCtx(() => [
                      createVNode("tr", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList([...Array(10)], (i) => {
                          return openBlock(), createBlock("td", { key: i });
                        }), 128)),
                        createVNode("td", {
                          class: "p-2",
                          colspan: "2"
                        }, toDisplayString(`${_ctx.$t("total-unit")}:`), 1),
                        createVNode("td", {
                          class: "p-2",
                          colspan: "4"
                        }, [
                          $data.totalunit ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(($data.totalunit * 1).toLocaleString()), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("0".toLocaleString()), 1))
                        ])
                      ]),
                      createVNode("tr", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList([...Array(10)], (i) => {
                          return openBlock(), createBlock("td", { key: i });
                        }), 128)),
                        createVNode("td", {
                          class: "p-2",
                          colspan: "2"
                        }, toDisplayString(`${_ctx.$t("subtotal")}:`), 1),
                        createVNode("td", {
                          class: "p-2",
                          colspan: "4"
                        }, [
                          $data.subtotal ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(`$ ${($data.subtotal * 1).toLocaleString()} ${$data.currency}`), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("$ ") + " " + toDisplayString("0".toLocaleString()) + " " + toDisplayString($data.currency), 1))
                        ])
                      ])
                    ]),
                    _: 2
                  }, [
                    renderList([
                      "32-S",
                      "34-M",
                      "36-L",
                      "38-XL",
                      "40-Q",
                      "42-EQ",
                      "44-Free"
                    ], (x) => {
                      return {
                        name: `item.${x}`,
                        fn: withCtx(({ index, item }) => [
                          createVNode("div", { class: "d-flex align-items-center justify-items-center" }, [
                            item[x] && item[x].stock_unit > 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              style: { width: "94px" }
                            }, [
                              createVNode(_component_CRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CCol, { sm: 8 }, {
                                    default: withCtx(() => [
                                      withDirectives(createVNode("input", {
                                        "onUpdate:modelValue": ($event) => item[x].unit = $event,
                                        type: "number",
                                        min: 0,
                                        max: item[x].stock_unit,
                                        onChange: ($event) => $options.change(index, item)
                                      }, null, 40, ["onUpdate:modelValue", "max", "onChange"]), [
                                        [vModelText, item[x].unit]
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_CCol, { sm: 4 }, {
                                    default: withCtx(() => [
                                      createVNode("strong", {
                                        class: "nowrap",
                                        style: { width: "40%" }
                                      }, toDisplayString(`／${item[x].stock_unit}`), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                          ])
                        ])
                      };
                    })
                  ]), 1032, ["headers", "items", "search", "loading"]),
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
                      createVNode("h4", null, toDisplayString(_ctx.$t("create")) + toDisplayString(_ctx.$t("shippings.title")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CCol, {
                    md: "3",
                    sm: "3",
                    class: "text-right"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CButtonGroup, { role: "group" }, {
                        default: withCtx(() => [
                          createVNode(_component_CButton, {
                            onClick: $options.showNewShippingItemsTable,
                            class: "d-flex align-items-center justify-content-center",
                            color: "primary",
                            size: "sm",
                            disabled: $data.fetchLoading.form || $data.fetchLoading.form
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CIcon, {
                                class: "mx-1",
                                name: "cil-playlist-add",
                                size: "sm"
                              }),
                              createTextVNode(" " + toDisplayString(_ctx.$t("shipping.add-shipment-goods")), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"]),
                          createVNode(_component_CButton, {
                            onClick: $options.scanner,
                            class: "d-flex align-items-center justify-content-center",
                            color: "primary",
                            size: "sm",
                            disabled: $data.fetchLoading.form || $data.fetchLoading.form
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CIcon, {
                                class: "mx-1",
                                name: "cil-barcode",
                                size: "sm"
                              }),
                              createTextVNode(" " + toDisplayString(_ctx.$t("scanner")), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode("hr"),
              createVNode("form", null, [
                createVNode(VAutocomplete, {
                  modelValue: $data.client,
                  "onUpdate:modelValue": ($event) => $data.client = $event,
                  search: $data.autocomplete.client.search,
                  "onUpdate:search": ($event) => $data.autocomplete.client.search = $event,
                  label: _ctx.$t("client"),
                  items: $data.autocomplete.client.items,
                  loading: $data.autocomplete.client.loading,
                  required: "",
                  outlined: "",
                  dense: "",
                  "hide-selected": "",
                  "item-title": "title",
                  "item-value": "id",
                  "return-object": "",
                  error: $data.errors["client"] ? true : false,
                  "error-messages": $data.errors["client"]
                }, null, 8, ["modelValue", "onUpdate:modelValue", "search", "onUpdate:search", "label", "items", "loading", "error", "error-messages"]),
                createVNode(VTextField, {
                  modelValue: $data.number,
                  "onUpdate:modelValue": ($event) => $data.number = $event,
                  label: _ctx.$t("number"),
                  required: "",
                  outlined: "",
                  dense: "",
                  clearable: "",
                  error: $data.errors["client_number"] ? true : false,
                  "error-messages": $data.errors["client_number"]
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(VTextField, {
                  modelValue: $data.name,
                  "onUpdate:modelValue": ($event) => $data.name = $event,
                  label: _ctx.$t("name"),
                  required: "",
                  outlined: "",
                  dense: "",
                  clearable: "",
                  error: $data.errors["client_name"] ? true : false,
                  "error-messages": $data.errors["client_name"]
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(VTextField, {
                  modelValue: $data.contact,
                  "onUpdate:modelValue": ($event) => $data.contact = $event,
                  label: _ctx.$t("contact"),
                  required: "",
                  outlined: "",
                  dense: "",
                  clearable: "",
                  error: $data.errors["client_contact"] ? true : false,
                  "error-messages": $data.errors["client_contact"]
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: "2",
                      sm: "5"
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
                          dense: "",
                          error: $data.errors["client_phone_country_code"] ? true : false,
                          "error-messages": $data.errors["client_phone_country_code"]
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: "10",
                      sm: "7"
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
                          error: $data.errors["client_phone"] ? true : false,
                          "error-messages": $data.errors["client_phone"]
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
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
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                createVNode(VTextField, {
                  modelValue: $data.address,
                  "onUpdate:modelValue": ($event) => $data.address = $event,
                  label: _ctx.$t("address"),
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                createVNode(VSelect, {
                  modelValue: $data.status,
                  "onUpdate:modelValue": ($event) => $data.status = $event,
                  items: $data.shippingStatus,
                  label: _ctx.$t("status"),
                  "item-title": "name",
                  "item-value": "value",
                  required: "",
                  outlined: "",
                  dense: "",
                  "return-object": "",
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
                  "return-object": "",
                  error: $data.errors["currency"] ? true : false,
                  "error-messages": $data.errors["currency"]
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"]),
                createVNode("hr"),
                createVNode(_component_CRow, { class: "p-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, null, {
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
                  "hide-default-footer": ""
                }, createSlots({
                  loading: withCtx(() => [
                    createVNode(VSkeletonLoader, { type: "table-row@10" })
                  ]),
                  [`item.unit_price`]: withCtx(({ item }) => [
                    item.unit_price ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(`$ ${(item.unit_price * 1).toLocaleString()}`), 1)) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ]),
                  [`item.total_unit`]: withCtx(({ item }) => [
                    item.total_unit ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString((item.total_unit * 1).toLocaleString()), 1)) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ]),
                  [`item.cost`]: withCtx(({ item }) => [
                    item.cost ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(`$ ${(item.cost * 1).toLocaleString()}`), 1)) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                  ]),
                  [`body.append`]: withCtx(() => [
                    createVNode("tr", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList([...Array(10)], (i) => {
                        return openBlock(), createBlock("td", { key: i });
                      }), 128)),
                      createVNode("td", {
                        class: "p-2",
                        colspan: "2"
                      }, toDisplayString(`${_ctx.$t("total-unit")}:`), 1),
                      createVNode("td", {
                        class: "p-2",
                        colspan: "4"
                      }, [
                        $data.totalunit ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(($data.totalunit * 1).toLocaleString()), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("0".toLocaleString()), 1))
                      ])
                    ]),
                    createVNode("tr", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList([...Array(10)], (i) => {
                        return openBlock(), createBlock("td", { key: i });
                      }), 128)),
                      createVNode("td", {
                        class: "p-2",
                        colspan: "2"
                      }, toDisplayString(`${_ctx.$t("subtotal")}:`), 1),
                      createVNode("td", {
                        class: "p-2",
                        colspan: "4"
                      }, [
                        $data.subtotal ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(`$ ${($data.subtotal * 1).toLocaleString()} ${$data.currency}`), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("$ ") + " " + toDisplayString("0".toLocaleString()) + " " + toDisplayString($data.currency), 1))
                      ])
                    ])
                  ]),
                  _: 2
                }, [
                  renderList([
                    "32-S",
                    "34-M",
                    "36-L",
                    "38-XL",
                    "40-Q",
                    "42-EQ",
                    "44-Free"
                  ], (x) => {
                    return {
                      name: `item.${x}`,
                      fn: withCtx(({ index, item }) => [
                        createVNode("div", { class: "d-flex align-items-center justify-items-center" }, [
                          item[x] && item[x].stock_unit > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            style: { width: "94px" }
                          }, [
                            createVNode(_component_CRow, null, {
                              default: withCtx(() => [
                                createVNode(_component_CCol, { sm: 8 }, {
                                  default: withCtx(() => [
                                    withDirectives(createVNode("input", {
                                      "onUpdate:modelValue": ($event) => item[x].unit = $event,
                                      type: "number",
                                      min: 0,
                                      max: item[x].stock_unit,
                                      onChange: ($event) => $options.change(index, item)
                                    }, null, 40, ["onUpdate:modelValue", "max", "onChange"]), [
                                      [vModelText, item[x].unit]
                                    ])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_CCol, { sm: 4 }, {
                                  default: withCtx(() => [
                                    createVNode("strong", {
                                      class: "nowrap",
                                      style: { width: "40%" }
                                    }, toDisplayString(`／${item[x].stock_unit}`), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ])) : (openBlock(), createBlock("span", { key: 1 }, "－"))
                        ])
                      ])
                    };
                  })
                ]), 1032, ["headers", "items", "search", "loading"]),
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
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/shippings/CreateShipping.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CreateShipping = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-ebf7c675"]]);
export {
  CreateShipping as default
};
//# sourceMappingURL=CreateShipping-DOwNZ49-.mjs.map
