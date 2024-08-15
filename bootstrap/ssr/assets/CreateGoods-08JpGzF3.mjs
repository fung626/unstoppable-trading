import { _ as _export_sfc, s as sizes } from "../app.mjs";
import { c as cups, g as goodsTypes, a as colors } from "./types-bOJiVplI.mjs";
import { v4 } from "uuid";
import { resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { VAutocomplete } from "vuetify/lib/components/VAutocomplete/index.mjs";
import { VDataTable } from "vuetify/lib/components/VDataTable/index.mjs";
import { VProgressCircular } from "vuetify/lib/components/VProgressCircular/index.mjs";
import { VSelect } from "vuetify/lib/components/VSelect/index.mjs";
import { VTextField } from "vuetify/lib/components/VTextField/index.mjs";
import { VTextarea } from "vuetify/lib/components/VTextarea/index.mjs";
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
import "vuetify/lib/components/VProgressLinear/index.mjs";
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
  name: "CreateGoods",
  components: {},
  data() {
    return {
      name: "",
      stockAlert: "",
      type: "",
      costprice: "",
      retailprice: "",
      wholesaleprice: "",
      supplier: "",
      warehouses: [],
      categories: [],
      description: "",
      autocomplete: {
        supplier: {
          items: [],
          loading: false
        },
        category: {
          items: [],
          loading: false
        },
        warehouse: {
          items: [],
          loading: false
        }
      },
      table: {
        item: {
          items: [],
          headers: [
            {
              title: this.$t("cup"),
              value: "cup",
              sortable: false,
              width: "20%"
            },
            {
              title: this.$t("color"),
              value: "color",
              sortable: false,
              width: "20%"
            },
            {
              title: this.$t("size"),
              value: "size",
              sortable: false,
              width: "20%"
            },
            {
              title: this.$t("barcode"),
              value: "barcode",
              sortable: false,
              width: "20%"
            },
            {
              title: this.$t("actions"),
              value: "actions",
              sortable: false,
              width: "20%"
            }
          ]
        },
        content: {
          items: [],
          headers: [
            {
              title: this.$t("contentkey"),
              value: "key",
              sortable: false
            },
            {
              title: this.$t("contentvalue"),
              value: "value",
              sortable: false
            },
            {
              title: this.$t("actions"),
              value: "actions",
              sortable: false
            }
          ]
        }
      },
      errors: {},
      loading: false,
      goodsCups: cups,
      goodsTypes,
      goodsColors: colors,
      goodsSizes: sizes
    };
  },
  watch: {
    "autocomplete.supplier.search": function(val) {
      let self = this;
      let sup = self.autocomplete.supplier;
      if (sup.items.length > 0 || sup.loading) {
        return;
      }
      self.autocomplete.supplier.loading = true;
      this.$store.dispatch("goods/supplier/get", {}).then((response) => {
        self.autocomplete.supplier.items = response.data;
        self.autocomplete.supplier.loading = false;
      }).catch((error) => {
        self.autocomplete.supplier.loading = false;
      });
    },
    "autocomplete.category.search": function(val) {
      let self = this;
      let cat = self.autocomplete.category;
      if (cat.items.length > 0 || cat.loading) {
        return;
      }
      self.autocomplete.category.loading = true;
      this.$store.dispatch("goods/category/get", {}).then((response) => {
        self.autocomplete.category.items = response.data;
        self.autocomplete.category.loading = false;
      }).catch((error) => {
        self.autocomplete.category.loading = false;
      });
    },
    "autocomplete.warehouse.search": function(val) {
      let self = this;
      let warehouse = self.autocomplete.warehouse;
      if (warehouse.items.length > 0 || warehouse.loading) {
        return;
      }
      self.autocomplete.warehouse.loading = true;
      this.$store.dispatch("goods/warehouses/get", {}).then((response) => {
        self.autocomplete.warehouse.items = response.data;
        self.autocomplete.warehouse.loading = false;
      }).catch((error) => {
        self.autocomplete.warehouse.loading = false;
      });
    }
  },
  mounted() {
    this.getSuppliers();
    this.getCategories();
    this.getWarehouses();
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
        stock_alert: self.stockAlert,
        type: self.type,
        cost_price: self.costprice,
        wholesale_price: self.wholesaleprice,
        retail_price: self.retailprice,
        supplier: self.supplier,
        categories: self.categories,
        warehouses: self.warehouses,
        description: self.description,
        items: self.table.item.items,
        contents: self.table.content.items
      };
      this.$store.dispatch("goods/create", data).then((response) => {
        self.loading = false;
        self.errors = {};
        self.$router.back();
      }).catch((error) => {
        var _a;
        self.errors = (_a = error.response.data) == null ? void 0 : _a.data;
        self.loading = false;
      });
    },
    add(key) {
      let self = this;
      switch (key) {
        case "item":
          self.table.item.items = [
            ...self.table.item.items,
            {
              id: v4(),
              cup: "",
              color: "",
              size: "",
              barcode: "",
              actions: [
                {
                  key: v4(),
                  title: this.$t("button.delete"),
                  type: "item",
                  color: "danger"
                }
              ]
            }
          ];
          break;
        case "content":
          self.table.content.items = [
            ...self.table.content.items,
            {
              id: v4(),
              key: "",
              value: "",
              actions: [
                {
                  key: v4(),
                  title: this.$t("button.delete"),
                  type: "content",
                  color: "danger"
                }
              ]
            }
          ];
          break;
      }
    },
    remove(item, action) {
      let self = this;
      switch (action.type) {
        case "item":
          {
            const index = self.table.item.items.findIndex((obj) => {
              return obj.id === item.id;
            });
            self.table.item.items.splice(index, 1);
          }
          break;
        case "content":
          {
            const index = self.table.content.items.findIndex(
              (obj) => {
                return obj.id === item.id;
              }
            );
            self.table.content.items.splice(index, 1);
          }
          break;
      }
    },
    save() {
    },
    cancel() {
    },
    getSuppliers() {
      let self = this;
      let cli = self.autocomplete.supplier;
      if (cli.items.length > 0 || cli.loading) {
        return;
      }
      self.autocomplete.supplier.loading = true;
      this.$store.dispatch("goods/suppliers/get", {}).then((response) => {
        self.autocomplete.supplier.items = response.data;
        self.autocomplete.supplier.loading = false;
      }).catch((error) => {
        self.autocomplete.supplier.loading = false;
      });
    },
    getCategories() {
      let self = this;
      let cli = self.autocomplete.category;
      if (cli.items.length > 0 || cli.loading) {
        return;
      }
      self.autocomplete.category.loading = true;
      this.$store.dispatch("categories/get", {}).then((response) => {
        self.autocomplete.category.items = response.data;
        self.autocomplete.category.loading = false;
      }).catch((error) => {
        self.autocomplete.category.loading = false;
      });
    },
    getWarehouses() {
      let self = this;
      let cli = self.autocomplete.warehouse;
      if (cli.items.length > 0 || cli.loading) {
        return;
      }
      self.autocomplete.warehouse.loading = true;
      this.$store.dispatch("goods/warehouses/get", {}).then((response) => {
        self.autocomplete.warehouse.items = response.data;
        self.autocomplete.warehouse.loading = false;
      }).catch((error) => {
        self.autocomplete.warehouse.loading = false;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_CButtonGroup = resolveComponent("CButtonGroup");
  _push(ssrRenderComponent(_component_CCard, mergeProps({ class: "p-4" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCardBody, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<h4 data-v-5dc49d27${_scopeId2}>${ssrInterpolate(_ctx.$t("create"))}</h4><hr data-v-5dc49d27${_scopeId2}><form data-v-5dc49d27${_scopeId2}>`);
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
              _push3(ssrRenderComponent(VTextField, {
                modelValue: $data.stockAlert,
                "onUpdate:modelValue": ($event) => $data.stockAlert = $event,
                label: _ctx.$t("stockalert"),
                error: $data.errors.stock_alert ? true : false,
                "error-messages": $data.errors.stockAlert,
                type: "number",
                required: "",
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CRow, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "3",
                      sm: "3"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VTextField, {
                            modelValue: $data.costprice,
                            "onUpdate:modelValue": ($event) => $data.costprice = $event,
                            label: _ctx.$t("price.cost"),
                            error: $data.errors.cost_price ? true : false,
                            "error-messages": $data.errors.cost_price,
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.costprice,
                              "onUpdate:modelValue": ($event) => $data.costprice = $event,
                              label: _ctx.$t("price.cost"),
                              error: $data.errors.cost_price ? true : false,
                              "error-messages": $data.errors.cost_price,
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
                      md: "3",
                      sm: "3"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VTextField, {
                            modelValue: $data.wholesaleprice,
                            "onUpdate:modelValue": ($event) => $data.wholesaleprice = $event,
                            label: _ctx.$t("price.wholesale"),
                            error: $data.errors.wholesale_price ? true : false,
                            "error-messages": $data.errors.wholesale_price,
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.wholesaleprice,
                              "onUpdate:modelValue": ($event) => $data.wholesaleprice = $event,
                              label: _ctx.$t("price.wholesale"),
                              error: $data.errors.wholesale_price ? true : false,
                              "error-messages": $data.errors.wholesale_price,
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
                      md: "3",
                      sm: "3"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VTextField, {
                            modelValue: $data.retailprice,
                            "onUpdate:modelValue": ($event) => $data.retailprice = $event,
                            label: _ctx.$t("price.retail"),
                            error: $data.errors.retail_price ? true : false,
                            "error-messages": $data.errors.retail_price,
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.retailprice,
                              "onUpdate:modelValue": ($event) => $data.retailprice = $event,
                              label: _ctx.$t("price.retail"),
                              error: $data.errors.retail_price ? true : false,
                              "error-messages": $data.errors.retail_price,
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
                      md: "3",
                      sm: "3"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VSelect, {
                            modelValue: $data.type,
                            "onUpdate:modelValue": ($event) => $data.type = $event,
                            items: $data.goodsTypes,
                            "item-title": "name",
                            "item-value": "name",
                            label: _ctx.$t("type"),
                            error: $data.errors.type ? true : false,
                            "error-messages": $data.errors.type,
                            outlined: "",
                            dense: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VSelect, {
                              modelValue: $data.type,
                              "onUpdate:modelValue": ($event) => $data.type = $event,
                              items: $data.goodsTypes,
                              "item-title": "name",
                              "item-value": "name",
                              label: _ctx.$t("type"),
                              error: $data.errors.type ? true : false,
                              "error-messages": $data.errors.type,
                              outlined: "",
                              dense: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, {
                        md: "3",
                        sm: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.costprice,
                            "onUpdate:modelValue": ($event) => $data.costprice = $event,
                            label: _ctx.$t("price.cost"),
                            error: $data.errors.cost_price ? true : false,
                            "error-messages": $data.errors.cost_price,
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "3",
                        sm: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.wholesaleprice,
                            "onUpdate:modelValue": ($event) => $data.wholesaleprice = $event,
                            label: _ctx.$t("price.wholesale"),
                            error: $data.errors.wholesale_price ? true : false,
                            "error-messages": $data.errors.wholesale_price,
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "3",
                        sm: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.retailprice,
                            "onUpdate:modelValue": ($event) => $data.retailprice = $event,
                            label: _ctx.$t("price.retail"),
                            error: $data.errors.retail_price ? true : false,
                            "error-messages": $data.errors.retail_price,
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "3",
                        sm: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, {
                            modelValue: $data.type,
                            "onUpdate:modelValue": ($event) => $data.type = $event,
                            items: $data.goodsTypes,
                            "item-title": "name",
                            "item-value": "name",
                            label: _ctx.$t("type"),
                            error: $data.errors.type ? true : false,
                            "error-messages": $data.errors.type,
                            outlined: "",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VAutocomplete, {
                modelValue: $data.supplier,
                "onUpdate:modelValue": ($event) => $data.supplier = $event,
                items: $data.autocomplete.supplier.items,
                disabled: $data.autocomplete.supplier.loading,
                loading: $data.autocomplete.supplier.loading,
                "onUpdate:search": $options.getSuppliers,
                required: "",
                outlined: "",
                dense: "",
                "hide-no-data": "",
                "hide-selected": "",
                "item-title": "name",
                "item-value": "id",
                label: _ctx.$t("supplier"),
                error: $data.errors.supplier ? true : false,
                "error-messages": $data.errors.supplier,
                "return-object": ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VAutocomplete, {
                modelValue: $data.categories,
                "onUpdate:modelValue": ($event) => $data.categories = $event,
                items: $data.autocomplete.category.items,
                disabled: $data.autocomplete.category.loading,
                loading: $data.autocomplete.category.loading,
                "onUpdate:search": $options.getCategories,
                "hide-no-data": "",
                "hide-selected": "",
                outlined: "",
                "item-title": "name",
                "item-value": "id",
                label: _ctx.$t("categories"),
                "return-object": "",
                chips: "",
                "small-chips": "",
                "closable-chips": "",
                multiple: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VAutocomplete, {
                modelValue: $data.warehouses,
                "onUpdate:modelValue": ($event) => $data.warehouses = $event,
                items: $data.autocomplete.warehouse.items,
                disabled: $data.autocomplete.warehouse.loading,
                loading: $data.autocomplete.warehouse.loading,
                "onUpdate:search": $options.getWarehouses,
                required: "",
                outlined: "",
                dense: "",
                "hide-no-data": "",
                "hide-selected": "",
                "item-title": "name",
                "item-value": "id",
                label: _ctx.$t("warehouse"),
                "return-object": "",
                chips: "",
                "small-chips": "",
                "closable-chips": "",
                multiple: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VTextarea, {
                modelValue: $data.description,
                "onUpdate:modelValue": ($event) => $data.description = $event,
                label: _ctx.$t("description"),
                outlined: "",
                dense: "",
                clearable: ""
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "9",
                      sm: "9"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<h4 class="my-2" data-v-5dc49d27${_scopeId4}>${ssrInterpolate(_ctx.$t("goodsitem"))}</h4>`);
                        } else {
                          return [
                            createVNode("h4", { class: "my-2" }, toDisplayString(_ctx.$t("goodsitem")), 1)
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
                            onClick: ($event) => $options.add("item")
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CIcon, {
                                  name: "cil-plus",
                                  size: "sm"
                                }, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_CIcon, {
                                    name: "cil-plus",
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
                              onClick: ($event) => $options.add("item")
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_CIcon, {
                                  name: "cil-plus",
                                  size: "sm"
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
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
                          createVNode("h4", { class: "my-2" }, toDisplayString(_ctx.$t("goodsitem")), 1)
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
                            onClick: ($event) => $options.add("item")
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CIcon, {
                                name: "cil-plus",
                                size: "sm"
                              })
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
              }, _parent3, _scopeId2));
              _push3(`<hr data-v-5dc49d27${_scopeId2}>`);
              _push3(ssrRenderComponent(VDataTable, {
                class: "my-2 elevation-1",
                headers: $data.table.item.headers,
                items: $data.table.item.items,
                "hide-default-footer": true
              }, {
                [`item.cup`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VAutocomplete, {
                      modelValue: item.cup,
                      "onUpdate:modelValue": ($event) => item.cup = $event,
                      items: $data.goodsCups,
                      "item-title": "name",
                      "item-value": "name",
                      disabled: $data.type === "BF",
                      variant: "plain",
                      "hide-details": "",
                      "return-object": ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VAutocomplete, {
                        modelValue: item.cup,
                        "onUpdate:modelValue": ($event) => item.cup = $event,
                        items: $data.goodsCups,
                        "item-title": "name",
                        "item-value": "name",
                        disabled: $data.type === "BF",
                        variant: "plain",
                        "hide-details": "",
                        "return-object": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled"])
                    ];
                  }
                }),
                [`item.color`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VAutocomplete, {
                      modelValue: item.color,
                      "onUpdate:modelValue": ($event) => item.color = $event,
                      items: $data.goodsColors,
                      "item-title": "name",
                      "item-value": "name",
                      variant: "plain",
                      "hide-details": "",
                      "return-object": ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VAutocomplete, {
                        modelValue: item.color,
                        "onUpdate:modelValue": ($event) => item.color = $event,
                        items: $data.goodsColors,
                        "item-title": "name",
                        "item-value": "name",
                        variant: "plain",
                        "hide-details": "",
                        "return-object": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ];
                  }
                }),
                [`item.size`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VAutocomplete, {
                      modelValue: item.size,
                      "onUpdate:modelValue": ($event) => item.size = $event,
                      items: $data.goodsSizes,
                      "item-title": "name",
                      "item-value": "name",
                      variant: "plain",
                      "hide-details": "",
                      "return-object": ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VAutocomplete, {
                        modelValue: item.size,
                        "onUpdate:modelValue": ($event) => item.size = $event,
                        items: $data.goodsSizes,
                        "item-title": "name",
                        "item-value": "name",
                        variant: "plain",
                        "hide-details": "",
                        "return-object": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ];
                  }
                }),
                [`item.barcode`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField, {
                      modelValue: item.barcode,
                      "onUpdate:modelValue": ($event) => item.barcode = $event,
                      variant: "plain",
                      "hide-details": ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField, {
                        modelValue: item.barcode,
                        "onUpdate:modelValue": ($event) => item.barcode = $event,
                        variant: "plain",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                [`item.actions`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CButtonGroup, null, {
                      default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<!--[-->`);
                          ssrRenderList(item.actions, (action) => {
                            _push5(ssrRenderComponent(_component_CButton, {
                              key: action.key,
                              color: action.color,
                              size: "sm",
                              onClick: ($event) => $options.remove(item, action)
                            }, {
                              default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(`${ssrInterpolate(action.title)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(action.title), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent5, _scopeId4));
                          });
                          _push5(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(item.actions, (action) => {
                              return openBlock(), createBlock(_component_CButton, {
                                key: action.key,
                                color: action.color,
                                size: "sm",
                                onClick: ($event) => $options.remove(item, action)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(action.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["color", "onClick"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CButtonGroup, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(item.actions, (action) => {
                            return openBlock(), createBlock(_component_CButton, {
                              key: action.key,
                              color: action.color,
                              size: "sm",
                              onClick: ($event) => $options.remove(item, action)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(action.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["color", "onClick"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "9",
                      sm: "9"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<h4 class="my-2" data-v-5dc49d27${_scopeId4}>${ssrInterpolate(_ctx.$t("goodscontent"))}</h4>`);
                        } else {
                          return [
                            createVNode("h4", { class: "my-2" }, toDisplayString(_ctx.$t("goodscontent")), 1)
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
                            onClick: ($event) => $options.add("content")
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CIcon, {
                                  name: "cil-plus",
                                  size: "sm"
                                }, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_CIcon, {
                                    name: "cil-plus",
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
                              onClick: ($event) => $options.add("content")
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_CIcon, {
                                  name: "cil-plus",
                                  size: "sm"
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
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
                          createVNode("h4", { class: "my-2" }, toDisplayString(_ctx.$t("goodscontent")), 1)
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
                            onClick: ($event) => $options.add("content")
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CIcon, {
                                name: "cil-plus",
                                size: "sm"
                              })
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
              }, _parent3, _scopeId2));
              _push3(`<hr data-v-5dc49d27${_scopeId2}>`);
              _push3(ssrRenderComponent(VDataTable, {
                class: "my-2 elevation-1",
                headers: $data.table.content.headers,
                items: $data.table.content.items,
                "hide-default-footer": true
              }, {
                [`item.key`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField, {
                      modelValue: item.key,
                      "onUpdate:modelValue": ($event) => item.key = $event,
                      variant: "plain",
                      "hide-details": ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField, {
                        modelValue: item.key,
                        "onUpdate:modelValue": ($event) => item.key = $event,
                        variant: "plain",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                [`item.value`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VTextField, {
                      modelValue: item.value,
                      "onUpdate:modelValue": ($event) => item.value = $event,
                      variant: "plain",
                      "hide-details": ""
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VTextField, {
                        modelValue: item.value,
                        "onUpdate:modelValue": ($event) => item.value = $event,
                        variant: "plain",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ];
                  }
                }),
                [`item.actions`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CButtonGroup, null, {
                      default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<!--[-->`);
                          ssrRenderList(item.actions, (action) => {
                            _push5(ssrRenderComponent(_component_CButton, {
                              key: action.key,
                              color: action.color,
                              size: "sm",
                              onClick: ($event) => $options.remove(item, action)
                            }, {
                              default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(`${ssrInterpolate(action.title)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(action.title), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent5, _scopeId4));
                          });
                          _push5(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(item.actions, (action) => {
                              return openBlock(), createBlock(_component_CButton, {
                                key: action.key,
                                color: action.color,
                                size: "sm",
                                onClick: ($event) => $options.remove(item, action)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(action.title), 1)
                                ]),
                                _: 2
                              }, 1032, ["color", "onClick"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CButtonGroup, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(item.actions, (action) => {
                            return openBlock(), createBlock(_component_CButton, {
                              key: action.key,
                              color: action.color,
                              size: "sm",
                              onClick: ($event) => $options.remove(item, action)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(action.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["color", "onClick"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ];
                  }
                }),
                _: 2
              }, _parent3, _scopeId2));
              _push3(`<hr data-v-5dc49d27${_scopeId2}>`);
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
                  createVNode(VTextField, {
                    modelValue: $data.stockAlert,
                    "onUpdate:modelValue": ($event) => $data.stockAlert = $event,
                    label: _ctx.$t("stockalert"),
                    error: $data.errors.stock_alert ? true : false,
                    "error-messages": $data.errors.stockAlert,
                    type: "number",
                    required: "",
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                  createVNode(_component_CRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        md: "3",
                        sm: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.costprice,
                            "onUpdate:modelValue": ($event) => $data.costprice = $event,
                            label: _ctx.$t("price.cost"),
                            error: $data.errors.cost_price ? true : false,
                            "error-messages": $data.errors.cost_price,
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "3",
                        sm: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.wholesaleprice,
                            "onUpdate:modelValue": ($event) => $data.wholesaleprice = $event,
                            label: _ctx.$t("price.wholesale"),
                            error: $data.errors.wholesale_price ? true : false,
                            "error-messages": $data.errors.wholesale_price,
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "3",
                        sm: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.retailprice,
                            "onUpdate:modelValue": ($event) => $data.retailprice = $event,
                            label: _ctx.$t("price.retail"),
                            error: $data.errors.retail_price ? true : false,
                            "error-messages": $data.errors.retail_price,
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "3",
                        sm: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, {
                            modelValue: $data.type,
                            "onUpdate:modelValue": ($event) => $data.type = $event,
                            items: $data.goodsTypes,
                            "item-title": "name",
                            "item-value": "name",
                            label: _ctx.$t("type"),
                            error: $data.errors.type ? true : false,
                            "error-messages": $data.errors.type,
                            outlined: "",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VAutocomplete, {
                    modelValue: $data.supplier,
                    "onUpdate:modelValue": ($event) => $data.supplier = $event,
                    items: $data.autocomplete.supplier.items,
                    disabled: $data.autocomplete.supplier.loading,
                    loading: $data.autocomplete.supplier.loading,
                    "onUpdate:search": $options.getSuppliers,
                    required: "",
                    outlined: "",
                    dense: "",
                    "hide-no-data": "",
                    "hide-selected": "",
                    "item-title": "name",
                    "item-value": "id",
                    label: _ctx.$t("supplier"),
                    error: $data.errors.supplier ? true : false,
                    "error-messages": $data.errors.supplier,
                    "return-object": ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled", "loading", "onUpdate:search", "label", "error", "error-messages"]),
                  createVNode(VAutocomplete, {
                    modelValue: $data.categories,
                    "onUpdate:modelValue": ($event) => $data.categories = $event,
                    items: $data.autocomplete.category.items,
                    disabled: $data.autocomplete.category.loading,
                    loading: $data.autocomplete.category.loading,
                    "onUpdate:search": $options.getCategories,
                    "hide-no-data": "",
                    "hide-selected": "",
                    outlined: "",
                    "item-title": "name",
                    "item-value": "id",
                    label: _ctx.$t("categories"),
                    "return-object": "",
                    chips: "",
                    "small-chips": "",
                    "closable-chips": "",
                    multiple: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled", "loading", "onUpdate:search", "label"]),
                  createVNode(VAutocomplete, {
                    modelValue: $data.warehouses,
                    "onUpdate:modelValue": ($event) => $data.warehouses = $event,
                    items: $data.autocomplete.warehouse.items,
                    disabled: $data.autocomplete.warehouse.loading,
                    loading: $data.autocomplete.warehouse.loading,
                    "onUpdate:search": $options.getWarehouses,
                    required: "",
                    outlined: "",
                    dense: "",
                    "hide-no-data": "",
                    "hide-selected": "",
                    "item-title": "name",
                    "item-value": "id",
                    label: _ctx.$t("warehouse"),
                    "return-object": "",
                    chips: "",
                    "small-chips": "",
                    "closable-chips": "",
                    multiple: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled", "loading", "onUpdate:search", "label"]),
                  createVNode(VTextarea, {
                    modelValue: $data.description,
                    "onUpdate:modelValue": ($event) => $data.description = $event,
                    label: _ctx.$t("description"),
                    outlined: "",
                    dense: "",
                    clearable: ""
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                  createVNode(_component_CRow, { class: "p-2" }, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        md: "9",
                        sm: "9"
                      }, {
                        default: withCtx(() => [
                          createVNode("h4", { class: "my-2" }, toDisplayString(_ctx.$t("goodsitem")), 1)
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
                            onClick: ($event) => $options.add("item")
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CIcon, {
                                name: "cil-plus",
                                size: "sm"
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("hr"),
                  createVNode(VDataTable, {
                    class: "my-2 elevation-1",
                    headers: $data.table.item.headers,
                    items: $data.table.item.items,
                    "hide-default-footer": true
                  }, {
                    [`item.cup`]: withCtx(({ item }) => [
                      createVNode(VAutocomplete, {
                        modelValue: item.cup,
                        "onUpdate:modelValue": ($event) => item.cup = $event,
                        items: $data.goodsCups,
                        "item-title": "name",
                        "item-value": "name",
                        disabled: $data.type === "BF",
                        variant: "plain",
                        "hide-details": "",
                        "return-object": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled"])
                    ]),
                    [`item.color`]: withCtx(({ item }) => [
                      createVNode(VAutocomplete, {
                        modelValue: item.color,
                        "onUpdate:modelValue": ($event) => item.color = $event,
                        items: $data.goodsColors,
                        "item-title": "name",
                        "item-value": "name",
                        variant: "plain",
                        "hide-details": "",
                        "return-object": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    [`item.size`]: withCtx(({ item }) => [
                      createVNode(VAutocomplete, {
                        modelValue: item.size,
                        "onUpdate:modelValue": ($event) => item.size = $event,
                        items: $data.goodsSizes,
                        "item-title": "name",
                        "item-value": "name",
                        variant: "plain",
                        "hide-details": "",
                        "return-object": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    [`item.barcode`]: withCtx(({ item }) => [
                      createVNode(VTextField, {
                        modelValue: item.barcode,
                        "onUpdate:modelValue": ($event) => item.barcode = $event,
                        variant: "plain",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    [`item.actions`]: withCtx(({ item }) => [
                      createVNode(_component_CButtonGroup, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(item.actions, (action) => {
                            return openBlock(), createBlock(_component_CButton, {
                              key: action.key,
                              color: action.color,
                              size: "sm",
                              onClick: ($event) => $options.remove(item, action)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(action.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["color", "onClick"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["headers", "items"]),
                  createVNode(_component_CRow, { class: "p-2" }, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        md: "9",
                        sm: "9"
                      }, {
                        default: withCtx(() => [
                          createVNode("h4", { class: "my-2" }, toDisplayString(_ctx.$t("goodscontent")), 1)
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
                            onClick: ($event) => $options.add("content")
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CIcon, {
                                name: "cil-plus",
                                size: "sm"
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("hr"),
                  createVNode(VDataTable, {
                    class: "my-2 elevation-1",
                    headers: $data.table.content.headers,
                    items: $data.table.content.items,
                    "hide-default-footer": true
                  }, {
                    [`item.key`]: withCtx(({ item }) => [
                      createVNode(VTextField, {
                        modelValue: item.key,
                        "onUpdate:modelValue": ($event) => item.key = $event,
                        variant: "plain",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    [`item.value`]: withCtx(({ item }) => [
                      createVNode(VTextField, {
                        modelValue: item.value,
                        "onUpdate:modelValue": ($event) => item.value = $event,
                        variant: "plain",
                        "hide-details": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    [`item.actions`]: withCtx(({ item }) => [
                      createVNode(_component_CButtonGroup, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList(item.actions, (action) => {
                            return openBlock(), createBlock(_component_CButton, {
                              key: action.key,
                              color: action.color,
                              size: "sm",
                              onClick: ($event) => $options.remove(item, action)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(action.title), 1)
                              ]),
                              _: 2
                            }, 1032, ["color", "onClick"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1032, ["headers", "items"]),
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
                createVNode(VTextField, {
                  modelValue: $data.stockAlert,
                  "onUpdate:modelValue": ($event) => $data.stockAlert = $event,
                  label: _ctx.$t("stockalert"),
                  error: $data.errors.stock_alert ? true : false,
                  "error-messages": $data.errors.stockAlert,
                  type: "number",
                  required: "",
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"]),
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: "3",
                      sm: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.costprice,
                          "onUpdate:modelValue": ($event) => $data.costprice = $event,
                          label: _ctx.$t("price.cost"),
                          error: $data.errors.cost_price ? true : false,
                          "error-messages": $data.errors.cost_price,
                          outlined: "",
                          dense: "",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: "3",
                      sm: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.wholesaleprice,
                          "onUpdate:modelValue": ($event) => $data.wholesaleprice = $event,
                          label: _ctx.$t("price.wholesale"),
                          error: $data.errors.wholesale_price ? true : false,
                          "error-messages": $data.errors.wholesale_price,
                          outlined: "",
                          dense: "",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: "3",
                      sm: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.retailprice,
                          "onUpdate:modelValue": ($event) => $data.retailprice = $event,
                          label: _ctx.$t("price.retail"),
                          error: $data.errors.retail_price ? true : false,
                          "error-messages": $data.errors.retail_price,
                          outlined: "",
                          dense: "",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "label", "error", "error-messages"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: "3",
                      sm: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VSelect, {
                          modelValue: $data.type,
                          "onUpdate:modelValue": ($event) => $data.type = $event,
                          items: $data.goodsTypes,
                          "item-title": "name",
                          "item-value": "name",
                          label: _ctx.$t("type"),
                          error: $data.errors.type ? true : false,
                          "error-messages": $data.errors.type,
                          outlined: "",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "label", "error", "error-messages"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VAutocomplete, {
                  modelValue: $data.supplier,
                  "onUpdate:modelValue": ($event) => $data.supplier = $event,
                  items: $data.autocomplete.supplier.items,
                  disabled: $data.autocomplete.supplier.loading,
                  loading: $data.autocomplete.supplier.loading,
                  "onUpdate:search": $options.getSuppliers,
                  required: "",
                  outlined: "",
                  dense: "",
                  "hide-no-data": "",
                  "hide-selected": "",
                  "item-title": "name",
                  "item-value": "id",
                  label: _ctx.$t("supplier"),
                  error: $data.errors.supplier ? true : false,
                  "error-messages": $data.errors.supplier,
                  "return-object": ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled", "loading", "onUpdate:search", "label", "error", "error-messages"]),
                createVNode(VAutocomplete, {
                  modelValue: $data.categories,
                  "onUpdate:modelValue": ($event) => $data.categories = $event,
                  items: $data.autocomplete.category.items,
                  disabled: $data.autocomplete.category.loading,
                  loading: $data.autocomplete.category.loading,
                  "onUpdate:search": $options.getCategories,
                  "hide-no-data": "",
                  "hide-selected": "",
                  outlined: "",
                  "item-title": "name",
                  "item-value": "id",
                  label: _ctx.$t("categories"),
                  "return-object": "",
                  chips: "",
                  "small-chips": "",
                  "closable-chips": "",
                  multiple: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled", "loading", "onUpdate:search", "label"]),
                createVNode(VAutocomplete, {
                  modelValue: $data.warehouses,
                  "onUpdate:modelValue": ($event) => $data.warehouses = $event,
                  items: $data.autocomplete.warehouse.items,
                  disabled: $data.autocomplete.warehouse.loading,
                  loading: $data.autocomplete.warehouse.loading,
                  "onUpdate:search": $options.getWarehouses,
                  required: "",
                  outlined: "",
                  dense: "",
                  "hide-no-data": "",
                  "hide-selected": "",
                  "item-title": "name",
                  "item-value": "id",
                  label: _ctx.$t("warehouse"),
                  "return-object": "",
                  chips: "",
                  "small-chips": "",
                  "closable-chips": "",
                  multiple: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled", "loading", "onUpdate:search", "label"]),
                createVNode(VTextarea, {
                  modelValue: $data.description,
                  "onUpdate:modelValue": ($event) => $data.description = $event,
                  label: _ctx.$t("description"),
                  outlined: "",
                  dense: "",
                  clearable: ""
                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                createVNode(_component_CRow, { class: "p-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: "9",
                      sm: "9"
                    }, {
                      default: withCtx(() => [
                        createVNode("h4", { class: "my-2" }, toDisplayString(_ctx.$t("goodsitem")), 1)
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
                          onClick: ($event) => $options.add("item")
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CIcon, {
                              name: "cil-plus",
                              size: "sm"
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("hr"),
                createVNode(VDataTable, {
                  class: "my-2 elevation-1",
                  headers: $data.table.item.headers,
                  items: $data.table.item.items,
                  "hide-default-footer": true
                }, {
                  [`item.cup`]: withCtx(({ item }) => [
                    createVNode(VAutocomplete, {
                      modelValue: item.cup,
                      "onUpdate:modelValue": ($event) => item.cup = $event,
                      items: $data.goodsCups,
                      "item-title": "name",
                      "item-value": "name",
                      disabled: $data.type === "BF",
                      variant: "plain",
                      "hide-details": "",
                      "return-object": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "disabled"])
                  ]),
                  [`item.color`]: withCtx(({ item }) => [
                    createVNode(VAutocomplete, {
                      modelValue: item.color,
                      "onUpdate:modelValue": ($event) => item.color = $event,
                      items: $data.goodsColors,
                      "item-title": "name",
                      "item-value": "name",
                      variant: "plain",
                      "hide-details": "",
                      "return-object": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                  ]),
                  [`item.size`]: withCtx(({ item }) => [
                    createVNode(VAutocomplete, {
                      modelValue: item.size,
                      "onUpdate:modelValue": ($event) => item.size = $event,
                      items: $data.goodsSizes,
                      "item-title": "name",
                      "item-value": "name",
                      variant: "plain",
                      "hide-details": "",
                      "return-object": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                  ]),
                  [`item.barcode`]: withCtx(({ item }) => [
                    createVNode(VTextField, {
                      modelValue: item.barcode,
                      "onUpdate:modelValue": ($event) => item.barcode = $event,
                      variant: "plain",
                      "hide-details": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  [`item.actions`]: withCtx(({ item }) => [
                    createVNode(_component_CButtonGroup, null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(item.actions, (action) => {
                          return openBlock(), createBlock(_component_CButton, {
                            key: action.key,
                            color: action.color,
                            size: "sm",
                            onClick: ($event) => $options.remove(item, action)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(action.title), 1)
                            ]),
                            _: 2
                          }, 1032, ["color", "onClick"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["headers", "items"]),
                createVNode(_component_CRow, { class: "p-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: "9",
                      sm: "9"
                    }, {
                      default: withCtx(() => [
                        createVNode("h4", { class: "my-2" }, toDisplayString(_ctx.$t("goodscontent")), 1)
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
                          onClick: ($event) => $options.add("content")
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CIcon, {
                              name: "cil-plus",
                              size: "sm"
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode("hr"),
                createVNode(VDataTable, {
                  class: "my-2 elevation-1",
                  headers: $data.table.content.headers,
                  items: $data.table.content.items,
                  "hide-default-footer": true
                }, {
                  [`item.key`]: withCtx(({ item }) => [
                    createVNode(VTextField, {
                      modelValue: item.key,
                      "onUpdate:modelValue": ($event) => item.key = $event,
                      variant: "plain",
                      "hide-details": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  [`item.value`]: withCtx(({ item }) => [
                    createVNode(VTextField, {
                      modelValue: item.value,
                      "onUpdate:modelValue": ($event) => item.value = $event,
                      variant: "plain",
                      "hide-details": ""
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ]),
                  [`item.actions`]: withCtx(({ item }) => [
                    createVNode(_component_CButtonGroup, null, {
                      default: withCtx(() => [
                        (openBlock(true), createBlock(Fragment, null, renderList(item.actions, (action) => {
                          return openBlock(), createBlock(_component_CButton, {
                            key: action.key,
                            color: action.color,
                            size: "sm",
                            onClick: ($event) => $options.remove(item, action)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(action.title), 1)
                            ]),
                            _: 2
                          }, 1032, ["color", "onClick"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1024)
                  ]),
                  _: 2
                }, 1032, ["headers", "items"]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/goods/CreateGoods.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const CreateGoods = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-5dc49d27"]]);
export {
  CreateGoods as default
};
