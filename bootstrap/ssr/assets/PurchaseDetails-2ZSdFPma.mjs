import { mapState } from "vuex";
import { resolveComponent, withCtx, createVNode, openBlock, createBlock, createCommentVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate } from "vue/server-renderer";
import { _ as _export_sfc } from "../app.mjs";
import { VDataTable } from "vuetify/lib/components/VDataTable/index.mjs";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
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
import "vuetify/lib/components/VSkeletonLoader/index.mjs";
import "vuetify/lib/components/VTooltip/index.mjs";
import "vuetify/lib/components/VCard/index.mjs";
import "vuetify/lib/components/VDialog/index.mjs";
import "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import "vuetify";
import "vuetify/lib/components/VSelect/index.mjs";
import "vuetify/lib/components/VTextField/index.mjs";
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
  name: "PurchaseDetails",
  components: {},
  computed: {
    ...mapState(["goods/purchases/invoices"]),
    logo() {
      return new URL("@images/logo-named.png", import.meta.url).href;
    },
    data() {
      return this["goods/purchases/invoices"].detailsData;
    },
    headerItems() {
      return this["goods/purchases/invoices"].detailsData.header_items;
    },
    purchaseItems() {
      return this["goods/purchases/invoices"].detailsData.purchase_items;
    },
    footerItems() {
      return this["goods/purchases/invoices"].detailsData.footer_items;
    }
  },
  data() {
    return {
      search: null,
      loading: false,
      table: {
        header: {
          headers: [
            { title: "X1", value: "X1" },
            { title: "X2", value: "X2" },
            { title: "X3", value: "X3" },
            { title: "X4", value: "X4" },
            { title: "X5", value: "X5" },
            { title: "X6", value: "X6" }
          ]
        },
        footer: {
          headers: [
            {
              title: "",
              value: "X1",
              align: "right",
              width: "80%",
              sortable: false
            },
            {
              title: "",
              value: "X2",
              align: "left",
              width: "20%",
              sortable: false
            }
          ]
        },
        item: {
          headers: [
            { title: "#ID", value: "id" },
            { title: this.$t("type"), value: "type" },
            { title: this.$t("goodsname"), value: "name" },
            { title: this.$t("cup"), value: "cup" },
            { title: this.$t("color"), value: "color" },
            { title: "32-S", value: "32-S.unit" },
            { title: "34-M", value: "34-M.unit" },
            { title: "36-L", value: "36-L.unit" },
            { title: "38-XL", value: "38-XL.unit" },
            { title: "40-Q", value: "40-Q.unit" },
            { title: "42-EQ", value: "42-EQ.unit" },
            { title: "44-Free", value: "44-Free.unit" },
            {
              title: `${this.$t("unit-price")}($)`,
              value: "formatted_unit_price"
            },
            {
              title: `${this.$t("total-unit")}`,
              value: "total_unit"
            },
            {
              title: `${this.$t("cost")}($)`,
              value: "formatted_cost"
            }
          ]
        }
      }
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      let self = this;
      if (self.loading) {
        return true;
      }
      self.loading = true;
      let data = {
        id: self.$route.params.id
      };
      this.$store.dispatch("goods/purchases/invoices/details", data).then((response) => {
        self.loading = false;
      }).catch((error) => {
        self.loading = false;
      });
    },
    download() {
      let self = this;
      if (self.loading) {
        return true;
      }
      self.loading = true;
      let data = {
        id: self.$route.params.id,
        extension: "pdf"
      };
      this.$store.dispatch("goods/purchases/invoices/export", data).then((response) => {
        self.loading = false;
      }).catch((error) => {
        self.loading = false;
      });
    },
    reload() {
      this.fetch();
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButtonGroup = resolveComponent("CButtonGroup");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_barcode = resolveComponent("barcode");
  _push(ssrRenderComponent(_component_CCard, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VProgressLinear, {
          active: $data.loading,
          indeterminate: "",
          color: "cyan"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CCardBody, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, { class: "text-right" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CButtonGroup, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CButton, {
                                  color: "primary",
                                  size: "sm",
                                  onClick: $options.download,
                                  disabled: $data.loading
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_CIcon, {
                                        name: "cil-cloud-download",
                                        size: "sm"
                                      }, null, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_CIcon, {
                                          name: "cil-cloud-download",
                                          size: "sm"
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_CButton, {
                                  color: "primary",
                                  size: "sm",
                                  onClick: $options.reload,
                                  disabled: $data.loading
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_CIcon, {
                                        name: "cil-reload",
                                        size: "sm"
                                      }, null, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_CIcon, {
                                          name: "cil-reload",
                                          size: "sm"
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_CButton, {
                                    color: "primary",
                                    size: "sm",
                                    onClick: $options.download,
                                    disabled: $data.loading
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_CIcon, {
                                        name: "cil-cloud-download",
                                        size: "sm"
                                      })
                                    ]),
                                    _: 1
                                  }, 8, ["onClick", "disabled"]),
                                  createVNode(_component_CButton, {
                                    color: "primary",
                                    size: "sm",
                                    onClick: $options.reload,
                                    disabled: $data.loading
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_CIcon, {
                                        name: "cil-reload",
                                        size: "sm"
                                      })
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
                            createVNode(_component_CButtonGroup, null, {
                              default: withCtx(() => [
                                createVNode(_component_CButton, {
                                  color: "primary",
                                  size: "sm",
                                  onClick: $options.download,
                                  disabled: $data.loading
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CIcon, {
                                      name: "cil-cloud-download",
                                      size: "sm"
                                    })
                                  ]),
                                  _: 1
                                }, 8, ["onClick", "disabled"]),
                                createVNode(_component_CButton, {
                                  color: "primary",
                                  size: "sm",
                                  onClick: $options.reload,
                                  disabled: $data.loading
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CIcon, {
                                      name: "cil-reload",
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
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, { class: "text-right" }, {
                        default: withCtx(() => [
                          createVNode(_component_CButtonGroup, null, {
                            default: withCtx(() => [
                              createVNode(_component_CButton, {
                                color: "primary",
                                size: "sm",
                                onClick: $options.download,
                                disabled: $data.loading
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_CIcon, {
                                    name: "cil-cloud-download",
                                    size: "sm"
                                  })
                                ]),
                                _: 1
                              }, 8, ["onClick", "disabled"]),
                              createVNode(_component_CButton, {
                                color: "primary",
                                size: "sm",
                                onClick: $options.reload,
                                disabled: $data.loading
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_CIcon, {
                                    name: "cil-reload",
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
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CRow, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          if ($options.data.barcode) {
                            _push5(ssrRenderComponent(_component_barcode, {
                              class: "m-4",
                              value: $options.data.barcode,
                              options: { title: " ", format: "CODE39", height: 28 }
                            }, null, _parent5, _scopeId4));
                          } else {
                            _push5(`<!---->`);
                          }
                        } else {
                          return [
                            $options.data.barcode ? (openBlock(), createBlock(_component_barcode, {
                              key: 0,
                              class: "m-4",
                              value: $options.data.barcode,
                              options: { title: " ", format: "CODE39", height: 28 }
                            }, null, 8, ["value"])) : createCommentVNode("", true)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, null, {
                        default: withCtx(() => [
                          $options.data.barcode ? (openBlock(), createBlock(_component_barcode, {
                            key: 0,
                            class: "m-4",
                            value: $options.data.barcode,
                            options: { title: " ", format: "CODE39", height: 28 }
                          }, null, 8, ["value"])) : createCommentVNode("", true)
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
                    _push4(ssrRenderComponent(_component_CCol, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<img${ssrRenderAttr("src", $options.logo)} width="128" data-v-360fc3d9${_scopeId4}>`);
                        } else {
                          return [
                            createVNode("img", {
                              src: $options.logo,
                              width: "128"
                            }, null, 8, ["src"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: "8",
                      sm: "8"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<h4 data-v-360fc3d9${_scopeId4}>Unstoppable Trading Co. Ltd</h4><h4 data-v-360fc3d9${_scopeId4}>永行貿易有限公司</h4>`);
                        } else {
                          return [
                            createVNode("h4", null, "Unstoppable Trading Co. Ltd"),
                            createVNode("h4", null, "永行貿易有限公司")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, { class: "text-right" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<h4 data-v-360fc3d9${_scopeId4}>${ssrInterpolate(_ctx.$t("purchase.invoice"))}</h4>`);
                        } else {
                          return [
                            createVNode("h4", null, toDisplayString(_ctx.$t("purchase.invoice")), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, null, {
                        default: withCtx(() => [
                          createVNode("img", {
                            src: $options.logo,
                            width: "128"
                          }, null, 8, ["src"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: "8",
                        sm: "8"
                      }, {
                        default: withCtx(() => [
                          createVNode("h4", null, "Unstoppable Trading Co. Ltd"),
                          createVNode("h4", null, "永行貿易有限公司")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, { class: "text-right" }, {
                        default: withCtx(() => [
                          createVNode("h4", null, toDisplayString(_ctx.$t("purchase.invoice")), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VDataTable, {
                class: "my-4 elevation-1 my-table",
                headers: $data.table.header.headers,
                items: $options.headerItems,
                "hide-default-footer": "",
                "hide-default-header": "",
                "mobile-breakpoint": 0
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VDataTable, {
                class: "my-2 elevation-1",
                headers: $data.table.item.headers,
                items: $options.purchaseItems,
                search: $data.search,
                "mobile-breakpoint": 0
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VDataTable, {
                class: "my-4 elevation-1",
                headers: $data.table.footer.headers,
                items: $options.footerItems,
                "hide-default-footer": "",
                "mobile-breakpoint": 0
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CRow, { class: "p-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, { class: "text-right" }, {
                      default: withCtx(() => [
                        createVNode(_component_CButtonGroup, null, {
                          default: withCtx(() => [
                            createVNode(_component_CButton, {
                              color: "primary",
                              size: "sm",
                              onClick: $options.download,
                              disabled: $data.loading
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_CIcon, {
                                  name: "cil-cloud-download",
                                  size: "sm"
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled"]),
                            createVNode(_component_CButton, {
                              color: "primary",
                              size: "sm",
                              onClick: $options.reload,
                              disabled: $data.loading
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_CIcon, {
                                  name: "cil-reload",
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
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, null, {
                      default: withCtx(() => [
                        $options.data.barcode ? (openBlock(), createBlock(_component_barcode, {
                          key: 0,
                          class: "m-4",
                          value: $options.data.barcode,
                          options: { title: " ", format: "CODE39", height: 28 }
                        }, null, 8, ["value"])) : createCommentVNode("", true)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CRow, { class: "p-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, null, {
                      default: withCtx(() => [
                        createVNode("img", {
                          src: $options.logo,
                          width: "128"
                        }, null, 8, ["src"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: "8",
                      sm: "8"
                    }, {
                      default: withCtx(() => [
                        createVNode("h4", null, "Unstoppable Trading Co. Ltd"),
                        createVNode("h4", null, "永行貿易有限公司")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, { class: "text-right" }, {
                      default: withCtx(() => [
                        createVNode("h4", null, toDisplayString(_ctx.$t("purchase.invoice")), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VDataTable, {
                  class: "my-4 elevation-1 my-table",
                  headers: $data.table.header.headers,
                  items: $options.headerItems,
                  "hide-default-footer": "",
                  "hide-default-header": "",
                  "mobile-breakpoint": 0
                }, null, 8, ["headers", "items"]),
                createVNode(VDataTable, {
                  class: "my-2 elevation-1",
                  headers: $data.table.item.headers,
                  items: $options.purchaseItems,
                  search: $data.search,
                  "mobile-breakpoint": 0
                }, null, 8, ["headers", "items", "search"]),
                createVNode(VDataTable, {
                  class: "my-4 elevation-1",
                  headers: $data.table.footer.headers,
                  items: $options.footerItems,
                  "hide-default-footer": "",
                  "mobile-breakpoint": 0
                }, null, 8, ["headers", "items"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VProgressLinear, {
            active: $data.loading,
            indeterminate: "",
            color: "cyan"
          }, null, 8, ["active"]),
          createVNode(_component_CCardBody, null, {
            default: withCtx(() => [
              createVNode(_component_CRow, { class: "p-2" }, {
                default: withCtx(() => [
                  createVNode(_component_CCol, { class: "text-right" }, {
                    default: withCtx(() => [
                      createVNode(_component_CButtonGroup, null, {
                        default: withCtx(() => [
                          createVNode(_component_CButton, {
                            color: "primary",
                            size: "sm",
                            onClick: $options.download,
                            disabled: $data.loading
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CIcon, {
                                name: "cil-cloud-download",
                                size: "sm"
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"]),
                          createVNode(_component_CButton, {
                            color: "primary",
                            size: "sm",
                            onClick: $options.reload,
                            disabled: $data.loading
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CIcon, {
                                name: "cil-reload",
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
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CRow, null, {
                default: withCtx(() => [
                  createVNode(_component_CCol, null, {
                    default: withCtx(() => [
                      $options.data.barcode ? (openBlock(), createBlock(_component_barcode, {
                        key: 0,
                        class: "m-4",
                        value: $options.data.barcode,
                        options: { title: " ", format: "CODE39", height: 28 }
                      }, null, 8, ["value"])) : createCommentVNode("", true)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CRow, { class: "p-2" }, {
                default: withCtx(() => [
                  createVNode(_component_CCol, null, {
                    default: withCtx(() => [
                      createVNode("img", {
                        src: $options.logo,
                        width: "128"
                      }, null, 8, ["src"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CCol, {
                    md: "8",
                    sm: "8"
                  }, {
                    default: withCtx(() => [
                      createVNode("h4", null, "Unstoppable Trading Co. Ltd"),
                      createVNode("h4", null, "永行貿易有限公司")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CCol, { class: "text-right" }, {
                    default: withCtx(() => [
                      createVNode("h4", null, toDisplayString(_ctx.$t("purchase.invoice")), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VDataTable, {
                class: "my-4 elevation-1 my-table",
                headers: $data.table.header.headers,
                items: $options.headerItems,
                "hide-default-footer": "",
                "hide-default-header": "",
                "mobile-breakpoint": 0
              }, null, 8, ["headers", "items"]),
              createVNode(VDataTable, {
                class: "my-2 elevation-1",
                headers: $data.table.item.headers,
                items: $options.purchaseItems,
                search: $data.search,
                "mobile-breakpoint": 0
              }, null, 8, ["headers", "items", "search"]),
              createVNode(VDataTable, {
                class: "my-4 elevation-1",
                headers: $data.table.footer.headers,
                items: $options.footerItems,
                "hide-default-footer": "",
                "mobile-breakpoint": 0
              }, null, 8, ["headers", "items"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/purchases/PurchaseDetails.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const PurchaseDetails = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-360fc3d9"]]);
export {
  PurchaseDetails as default
};
//# sourceMappingURL=PurchaseDetails-2ZSdFPma.mjs.map
