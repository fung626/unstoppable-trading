import { _ as _export_sfc, D as Dialog, e as ScannerDialog, c as codes, b as currencies, g as shippingStatus, s as sizes } from "../app.mjs";
import { resolveComponent, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { VAutocomplete } from "vuetify/lib/components/VAutocomplete/index.mjs";
import { VDataTable } from "vuetify/lib/components/VDataTable/index.mjs";
import { VProgressCircular } from "vuetify/lib/components/VProgressCircular/index.mjs";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
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
import "vuex";
import "uuid";
import "vuetify/lib/components/VCard/index.mjs";
import "vuetify/lib/components/VDialog/index.mjs";
import "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import "vuetify";
import "vue-barcode-reader";
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
const _sfc_main = {
  name: "CreateShipping",
  components: {
    Dialog,
    ScannerDialog
  },
  data() {
    return {
      fetchLoading: {
        form: false,
        table: false
      },
      loading: false,
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
          items: [],
          loading: false
        }
      },
      table: {
        item: {
          search: "",
          headers: [
            { text: "#ID", value: "id" },
            { title: this.$t("name"), value: "name" },
            { title: this.$t("type"), value: "type" },
            { title: this.$t("cup"), value: "cup" },
            { title: this.$t("color"), value: "color" },
            { text: "32-S", value: "32-S" },
            { text: "34-M", value: "34-M" },
            { text: "36-L", value: "36-L" },
            { text: "38-XL", value: "38-XL" },
            { text: "40-Q", value: "40-Q" },
            { text: "42-EQ", value: "42-EQ" },
            { text: "44-Free", value: "44-Free" },
            {
              text: `${this.$t("unitprice")}($)`,
              value: "unit_price"
            },
            { title: this.$t("totalunit"), value: "total_unit" },
            {
              text: `${this.$t("cost")}($)`,
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
    shippingData() {
      this.fetch();
    },
    client() {
      this.number = this.client.number;
      this.name = this.client.name;
      this.contact = this.client.contact;
      this.phoneCountryCode = this.client.phone_country_code;
      this.phone = this.client.phone;
      this.email = this.client.email;
      this.address = this.client.address;
      this.currency = this.client.currency;
    }
  },
  mounted() {
    this.fetch();
    this.getClients();
  },
  methods: {
    fetch() {
      let self = this;
      if (self.fetchLoading.table || this.shippingData.length === 0) {
        return;
      }
      self.fetchLoading.table = true;
      let data = {
        items: this.shippingData
      };
      this.$store.dispatch("goods/shippings/format", data).then((response) => {
        self.updateTable();
        self.fetchLoading.table = false;
      }).catch((error) => {
        self.updateTable();
        self.fetchLoading.table = false;
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
        self.$store.dispatch("goods/shippings/clear");
        self.$router.back();
      }).catch((error) => {
        var _a;
        self.loading = false;
        self.errors = (_a = error.response.data) == null ? void 0 : _a.data;
      });
    },
    isRowEditable(value) {
      return sizes.find((obj) => obj.name === value);
    },
    isCurrencyRow(value) {
      const rows = ["unit_price", "cost"];
      const idx = rows.indexOf(value);
      return idx > -1 ? true : false;
    },
    save(idx) {
      let item = this.items[idx];
      let sizes$1 = sizes;
      let totalunit = 0;
      for (let size of sizes$1) {
        if (item[size.name]) {
          if (item[size.name].unit > item[size.name].stock_unit) {
            item[size.name].unit = item[size.name].stock_unit;
            return false;
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
    getClients() {
      let self = this;
      let cli = self.autocomplete.client;
      if (cli.items.length > 0 || cli.loading) {
        return;
      }
      self.autocomplete.client.loading = true;
      this.$store.dispatch("clients/get", {}).then((response) => {
        self.autocomplete.client.items = response.data;
        self.autocomplete.client.loading = false;
      }).catch((error) => {
        self.autocomplete.client.loading = false;
      });
    },
    async scanner() {
      await this.$refs.scannerDialog.open("Shipping");
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Dialog = resolveComponent("Dialog");
  const _component_ScannerDialog = resolveComponent("ScannerDialog");
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_CInputGroup = resolveComponent("CInputGroup");
  const _component_CFormInput = resolveComponent("CFormInput");
  const _component_v_edit_dialog = resolveComponent("v-edit-dialog");
  const _component_vue_number_input = resolveComponent("vue-number-input");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-f9e01f4c>`);
  _push(ssrRenderComponent(_component_Dialog, { ref: "dialog" }, null, _parent));
  _push(ssrRenderComponent(_component_ScannerDialog, { ref: "scannerDialog" }, null, _parent));
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
                          _push5(`<h4 data-v-f9e01f4c${_scopeId4}>${ssrInterpolate(_ctx.$t("create"))}${ssrInterpolate(_ctx.$t("shippings.title"))}</h4>`);
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
                          _push5(ssrRenderComponent(_component_CButton, {
                            color: "primary",
                            size: "sm",
                            onClick: $options.scanner,
                            disabled: $data.fetchLoading.form || $data.fetchLoading.form
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
                              disabled: $data.fetchLoading.form || $data.fetchLoading.form
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
                          createVNode(_component_CButton, {
                            color: "primary",
                            size: "sm",
                            onClick: $options.scanner,
                            disabled: $data.fetchLoading.form || $data.fetchLoading.form
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
              _push3(`<hr data-v-f9e01f4c${_scopeId2}><form data-v-f9e01f4c${_scopeId2}>`);
              _push3(ssrRenderComponent(VAutocomplete, {
                modelValue: $data.client,
                "onUpdate:modelValue": ($event) => $data.client = $event,
                items: $data.autocomplete.client.items,
                loading: $data.autocomplete.client.loading,
                "onUpdate:search": $options.getClients,
                required: "",
                outlined: "",
                dense: "",
                "hide-no-data": "",
                "hide-selected": "",
                "item-title": "name",
                "item-value": "id",
                label: _ctx.$t("client"),
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
              _push3(`<hr data-v-f9e01f4c${_scopeId2}>`);
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
                                  modelValue: _ctx.search,
                                  "onUpdate:modelValue": ($event) => _ctx.search = $event
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
                                    modelValue: _ctx.search,
                                    "onUpdate:modelValue": ($event) => _ctx.search = $event
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
                                  modelValue: _ctx.search,
                                  "onUpdate:modelValue": ($event) => _ctx.search = $event
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
                                modelValue: _ctx.search,
                                "onUpdate:modelValue": ($event) => _ctx.search = $event
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
                items: _ctx.items,
                search: $data.table.item.search,
                loading: $data.fetchLoading.table
              }, {
                body: withCtx(({ items, headers }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<tbody data-v-f9e01f4c${_scopeId3}><!--[-->`);
                    ssrRenderList(items, (item, idx) => {
                      _push4(`<tr data-v-f9e01f4c${_scopeId3}><!--[-->`);
                      ssrRenderList(headers, (header, key) => {
                        _push4(`<td data-v-f9e01f4c${_scopeId3}>`);
                        if ($options.isRowEditable(header.value) && item[header.value]) {
                          _push4(`<div data-v-f9e01f4c${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_v_edit_dialog, {
                            "v-model:propName": item[header.value].unit,
                            onSave: ($event) => $options.save(idx),
                            "save-text": _ctx.$t("button.confirm"),
                            "cancel-text": _ctx.$t("button.cancel"),
                            large: ""
                          }, {
                            input: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_vue_number_input, {
                                  class: "m-4",
                                  size: "small",
                                  modelValue: item[header.value].unit,
                                  "onUpdate:modelValue": ($event) => item[header.value].unit = $event,
                                  min: 0,
                                  max: item[header.value] ? item[header.value].stock_unit : 0,
                                  inline: "",
                                  center: "",
                                  controls: ""
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_vue_number_input, {
                                    class: "m-4",
                                    size: "small",
                                    modelValue: item[header.value].unit,
                                    "onUpdate:modelValue": ($event) => item[header.value].unit = $event,
                                    min: 0,
                                    max: item[header.value] ? item[header.value].stock_unit : 0,
                                    inline: "",
                                    center: "",
                                    controls: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                                ];
                              }
                            }),
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(item[header.value].unit)} `);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(item[header.value].unit) + " ", 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else if ($options.isRowEditable(header.value)) {
                          _push4(`<div data-v-f9e01f4c${_scopeId3}> － </div>`);
                        } else if ($options.isCurrencyRow(header.value)) {
                          _push4(`<div data-v-f9e01f4c${_scopeId3}>`);
                          if (item[header.value]) {
                            _push4(`<div data-v-f9e01f4c${_scopeId3}>${ssrInterpolate(`${item[header.value].toLocaleString()}`)}</div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(`</div>`);
                        } else {
                          _push4(`<div data-v-f9e01f4c${_scopeId3}>${ssrInterpolate(item[header.value])}</div>`);
                        }
                        _push4(`</td>`);
                      });
                      _push4(`<!--]--></tr>`);
                    });
                    _push4(`<!--]--><tr data-v-f9e01f4c${_scopeId3}><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td class="p-2" colspan="4" data-v-f9e01f4c${_scopeId3}>${ssrInterpolate(_ctx.$t("totalunit"))} ${ssrInterpolate(": ")} `);
                    if ($data.totalunit) {
                      _push4(`<span data-v-f9e01f4c${_scopeId3}>${ssrInterpolate($data.totalunit.toLocaleString())}</span>`);
                    } else {
                      _push4(`<span data-v-f9e01f4c${_scopeId3}>${ssrInterpolate("0".toLocaleString())}</span>`);
                    }
                    _push4(`</td></tr><tr data-v-f9e01f4c${_scopeId3}><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td data-v-f9e01f4c${_scopeId3}></td><td class="p-2" colspan="4" data-v-f9e01f4c${_scopeId3}>${ssrInterpolate(_ctx.$t("subtotal"))} ${ssrInterpolate(": ")} `);
                    if ($data.subtotal) {
                      _push4(`<span data-v-f9e01f4c${_scopeId3}>${ssrInterpolate("$")} ${ssrInterpolate($data.subtotal.toLocaleString())} ${ssrInterpolate($data.currency)}</span>`);
                    } else {
                      _push4(`<span data-v-f9e01f4c${_scopeId3}>${ssrInterpolate("0".toLocaleString())} ${ssrInterpolate($data.currency)}</span>`);
                    }
                    _push4(`</td></tr></tbody>`);
                  } else {
                    return [
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(items, (item, idx) => {
                          return openBlock(), createBlock("tr", { key: idx }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(headers, (header, key) => {
                              return openBlock(), createBlock("td", { key }, [
                                $options.isRowEditable(header.value) && item[header.value] ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode(_component_v_edit_dialog, {
                                    "v-model:propName": item[header.value].unit,
                                    onSave: ($event) => $options.save(idx),
                                    "save-text": _ctx.$t("button.confirm"),
                                    "cancel-text": _ctx.$t("button.cancel"),
                                    large: ""
                                  }, {
                                    input: withCtx(() => [
                                      createVNode(_component_vue_number_input, {
                                        class: "m-4",
                                        size: "small",
                                        modelValue: item[header.value].unit,
                                        "onUpdate:modelValue": ($event) => item[header.value].unit = $event,
                                        min: 0,
                                        max: item[header.value] ? item[header.value].stock_unit : 0,
                                        inline: "",
                                        center: "",
                                        controls: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                                    ]),
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item[header.value].unit) + " ", 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["v-model:propName", "onSave", "save-text", "cancel-text"])
                                ])) : $options.isRowEditable(header.value) ? (openBlock(), createBlock("div", { key: 1 }, " － ")) : $options.isCurrencyRow(header.value) ? (openBlock(), createBlock("div", { key: 2 }, [
                                  item[header.value] ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(`${item[header.value].toLocaleString()}`), 1)) : createCommentVNode("", true)
                                ])) : (openBlock(), createBlock("div", { key: 3 }, toDisplayString(item[header.value]), 1))
                              ]);
                            }), 128))
                          ]);
                        }), 128)),
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
                          createVNode("td"),
                          createVNode("td", {
                            class: "p-2",
                            colspan: "4"
                          }, [
                            createTextVNode(toDisplayString(_ctx.$t("totalunit")) + " " + toDisplayString(": ") + " ", 1),
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
                          createVNode("td"),
                          createVNode("td", {
                            class: "p-2",
                            colspan: "4"
                          }, [
                            createTextVNode(toDisplayString(_ctx.$t("subtotal")) + " " + toDisplayString(": ") + " ", 1),
                            $data.subtotal ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString("$") + " " + toDisplayString($data.subtotal.toLocaleString()) + " " + toDisplayString($data.currency), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("0".toLocaleString()) + " " + toDisplayString($data.currency), 1))
                          ])
                        ])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(`<hr data-v-f9e01f4c${_scopeId2}>`);
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
                        createVNode(_component_CButton, {
                          color: "primary",
                          size: "sm",
                          onClick: $options.scanner,
                          disabled: $data.fetchLoading.form || $data.fetchLoading.form
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
                  createVNode(VAutocomplete, {
                    modelValue: $data.client,
                    "onUpdate:modelValue": ($event) => $data.client = $event,
                    items: $data.autocomplete.client.items,
                    loading: $data.autocomplete.client.loading,
                    "onUpdate:search": $options.getClients,
                    required: "",
                    outlined: "",
                    dense: "",
                    "hide-no-data": "",
                    "hide-selected": "",
                    "item-title": "name",
                    "item-value": "id",
                    label: _ctx.$t("client"),
                    "return-object": "",
                    error: $data.errors["client"] ? true : false,
                    "error-messages": $data.errors["client"]
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "onUpdate:search", "label", "error", "error-messages"]),
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
                                modelValue: _ctx.search,
                                "onUpdate:modelValue": ($event) => _ctx.search = $event
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
                    items: _ctx.items,
                    search: $data.table.item.search,
                    loading: $data.fetchLoading.table
                  }, {
                    body: withCtx(({ items, headers }) => [
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(items, (item, idx) => {
                          return openBlock(), createBlock("tr", { key: idx }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(headers, (header, key) => {
                              return openBlock(), createBlock("td", { key }, [
                                $options.isRowEditable(header.value) && item[header.value] ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode(_component_v_edit_dialog, {
                                    "v-model:propName": item[header.value].unit,
                                    onSave: ($event) => $options.save(idx),
                                    "save-text": _ctx.$t("button.confirm"),
                                    "cancel-text": _ctx.$t("button.cancel"),
                                    large: ""
                                  }, {
                                    input: withCtx(() => [
                                      createVNode(_component_vue_number_input, {
                                        class: "m-4",
                                        size: "small",
                                        modelValue: item[header.value].unit,
                                        "onUpdate:modelValue": ($event) => item[header.value].unit = $event,
                                        min: 0,
                                        max: item[header.value] ? item[header.value].stock_unit : 0,
                                        inline: "",
                                        center: "",
                                        controls: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                                    ]),
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item[header.value].unit) + " ", 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["v-model:propName", "onSave", "save-text", "cancel-text"])
                                ])) : $options.isRowEditable(header.value) ? (openBlock(), createBlock("div", { key: 1 }, " － ")) : $options.isCurrencyRow(header.value) ? (openBlock(), createBlock("div", { key: 2 }, [
                                  item[header.value] ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(`${item[header.value].toLocaleString()}`), 1)) : createCommentVNode("", true)
                                ])) : (openBlock(), createBlock("div", { key: 3 }, toDisplayString(item[header.value]), 1))
                              ]);
                            }), 128))
                          ]);
                        }), 128)),
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
                          createVNode("td"),
                          createVNode("td", {
                            class: "p-2",
                            colspan: "4"
                          }, [
                            createTextVNode(toDisplayString(_ctx.$t("totalunit")) + " " + toDisplayString(": ") + " ", 1),
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
                          createVNode("td"),
                          createVNode("td", {
                            class: "p-2",
                            colspan: "4"
                          }, [
                            createTextVNode(toDisplayString(_ctx.$t("subtotal")) + " " + toDisplayString(": ") + " ", 1),
                            $data.subtotal ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString("$") + " " + toDisplayString($data.subtotal.toLocaleString()) + " " + toDisplayString($data.currency), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("0".toLocaleString()) + " " + toDisplayString($data.currency), 1))
                          ])
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
                      createVNode(_component_CButton, {
                        color: "primary",
                        size: "sm",
                        onClick: $options.scanner,
                        disabled: $data.fetchLoading.form || $data.fetchLoading.form
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
                createVNode(VAutocomplete, {
                  modelValue: $data.client,
                  "onUpdate:modelValue": ($event) => $data.client = $event,
                  items: $data.autocomplete.client.items,
                  loading: $data.autocomplete.client.loading,
                  "onUpdate:search": $options.getClients,
                  required: "",
                  outlined: "",
                  dense: "",
                  "hide-no-data": "",
                  "hide-selected": "",
                  "item-title": "name",
                  "item-value": "id",
                  label: _ctx.$t("client"),
                  "return-object": "",
                  error: $data.errors["client"] ? true : false,
                  "error-messages": $data.errors["client"]
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "onUpdate:search", "label", "error", "error-messages"]),
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
                              modelValue: _ctx.search,
                              "onUpdate:modelValue": ($event) => _ctx.search = $event
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
                  items: _ctx.items,
                  search: $data.table.item.search,
                  loading: $data.fetchLoading.table
                }, {
                  body: withCtx(({ items, headers }) => [
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(items, (item, idx) => {
                        return openBlock(), createBlock("tr", { key: idx }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(headers, (header, key) => {
                            return openBlock(), createBlock("td", { key }, [
                              $options.isRowEditable(header.value) && item[header.value] ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode(_component_v_edit_dialog, {
                                  "v-model:propName": item[header.value].unit,
                                  onSave: ($event) => $options.save(idx),
                                  "save-text": _ctx.$t("button.confirm"),
                                  "cancel-text": _ctx.$t("button.cancel"),
                                  large: ""
                                }, {
                                  input: withCtx(() => [
                                    createVNode(_component_vue_number_input, {
                                      class: "m-4",
                                      size: "small",
                                      modelValue: item[header.value].unit,
                                      "onUpdate:modelValue": ($event) => item[header.value].unit = $event,
                                      min: 0,
                                      max: item[header.value] ? item[header.value].stock_unit : 0,
                                      inline: "",
                                      center: "",
                                      controls: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                                  ]),
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item[header.value].unit) + " ", 1)
                                  ]),
                                  _: 2
                                }, 1032, ["v-model:propName", "onSave", "save-text", "cancel-text"])
                              ])) : $options.isRowEditable(header.value) ? (openBlock(), createBlock("div", { key: 1 }, " － ")) : $options.isCurrencyRow(header.value) ? (openBlock(), createBlock("div", { key: 2 }, [
                                item[header.value] ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(`${item[header.value].toLocaleString()}`), 1)) : createCommentVNode("", true)
                              ])) : (openBlock(), createBlock("div", { key: 3 }, toDisplayString(item[header.value]), 1))
                            ]);
                          }), 128))
                        ]);
                      }), 128)),
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
                        createVNode("td"),
                        createVNode("td", {
                          class: "p-2",
                          colspan: "4"
                        }, [
                          createTextVNode(toDisplayString(_ctx.$t("totalunit")) + " " + toDisplayString(": ") + " ", 1),
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
                        createVNode("td"),
                        createVNode("td", {
                          class: "p-2",
                          colspan: "4"
                        }, [
                          createTextVNode(toDisplayString(_ctx.$t("subtotal")) + " " + toDisplayString(": ") + " ", 1),
                          $data.subtotal ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString("$") + " " + toDisplayString($data.subtotal.toLocaleString()) + " " + toDisplayString($data.currency), 1)) : (openBlock(), createBlock("span", { key: 1 }, toDisplayString("0".toLocaleString()) + " " + toDisplayString($data.currency), 1))
                        ])
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
const CreateShipping = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f9e01f4c"]]);
export {
  CreateShipping as default
};
