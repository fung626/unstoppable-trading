import { _ as _export_sfc, C as CreateShippingDialog } from "../app.mjs";
import { resolveComponent, withCtx, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, mergeProps, toHandlers, createTextVNode, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { VDataTableServer } from "vuetify/lib/components/VDataTable/index.mjs";
import { VSkeletonLoader } from "vuetify/lib/components/VSkeletonLoader/index.mjs";
import { VTooltip } from "vuetify/lib/components/VTooltip/index.mjs";
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
import "vuetify/lib/components/VProgressLinear/index.mjs";
import "vuex";
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
  name: "GoodsStock",
  components: {
    CreateShippingDialog
  },
  data() {
    return {
      search: null,
      loading: false,
      mobile: window.innerWidth < 769,
      items: [],
      page: 1,
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
        { title: this.$t("name"), value: "goods.name" },
        { title: this.$t("type"), value: "goods.type" },
        { title: this.$t("cup"), value: "cup" },
        { title: this.$t("color"), value: "color" },
        { title: "32-S", value: "32-S", sortable: false },
        { title: "34-M", value: "34-M", sortable: false },
        { title: "36-L", value: "36-L", sortable: false },
        { title: "38-XL", value: "38-XL", sortable: false },
        { title: "40-Q", value: "40-Q", sortable: false },
        { title: "42-EQ", value: "42-EQ", sortable: false },
        { title: "44-Free", value: "44-Free", sortable: false },
        {
          title: this.$t("total-unit"),
          value: "total_unit",
          sortable: false
        },
        {
          title: this.$t("subtotal"),
          value: "subtotal",
          sortable: false
        },
        {
          title: this.$t("actions"),
          value: "actions",
          sortable: false
        }
      ]
    };
  },
  mounted() {
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.mobile = window.innerWidth < 769;
    },
    fetch({ page, itemsPerPage, sortBy, search }) {
      let self = this;
      self.loading = true;
      self.options.page = page;
      self.options.itemsPerPage = itemsPerPage;
      self.options.sortBy = sortBy;
      let data = {
        page,
        per_page: itemsPerPage,
        sort_by: sortBy,
        sort_desc: null,
        search
      };
      this.$store.dispatch("goods/stocks/get", data).then((response) => {
        let res = JSON.parse(JSON.stringify(response.data));
        self.items = res.data;
        self.serverItemsLength = res.total;
        self.pageCount = res.last_page;
        self.page = res.current_page;
        self.loading = false;
      }).catch((error) => {
        self.loading = false;
      });
    },
    reload() {
      this.fetch({ ...this.options });
    },
    download() {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      const { page, itemsPerPage, sortBy, sortDesc } = self.options;
      let data = {
        page,
        per_page: itemsPerPage,
        sort_by: sortBy,
        sort_desc: sortDesc,
        search: self.searchText
      };
      this.$store.dispatch("goods/stocks/export", data).then((response) => {
        self.loading = false;
      }).catch((error) => {
        self.loading = false;
      });
    },
    async click(item, action) {
      let type = action.type;
      switch (type) {
        case "Dialog":
          let _item = JSON.parse(JSON.stringify(item));
          if (await this.$refs.dialog.open(_item)) ;
          break;
        case "RouterPush":
          let route = action.route;
          this.$router.push({
            path: route
          });
          break;
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CreateShippingDialog = resolveComponent("CreateShippingDialog");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CInputGroup = resolveComponent("CInputGroup");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_CFormInput = resolveComponent("CFormInput");
  const _component_CButtonGroup = resolveComponent("CButtonGroup");
  const _component_vue_barcode = resolveComponent("vue-barcode");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_CreateShippingDialog, { ref: "dialog" }, null, _parent));
  _push(ssrRenderComponent(_component_CRow, { class: "p-2 mb-2 mt-4" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCol, {
          md: 10,
          sm: 10
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CInputGroup, { class: "mb-3" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CButton, {
                      color: "primary",
                      size: "sm"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CIcon, {
                            name: "cil-magnifying-glass",
                            size: "sm"
                          }, null, _parent5, _scopeId4));
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
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CFormInput, {
                      size: "sm",
                      modelValue: $data.search,
                      "onUpdate:modelValue": ($event) => $data.search = $event
                    }, null, _parent4, _scopeId3));
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
              }, _parent3, _scopeId2));
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
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CCol, {
          md: 2,
          sm: 2,
          class: "text-right"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CButtonGroup, { role: "group" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CButton, {
                      color: "primary",
                      size: "sm",
                      onClick: $options.download
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CIcon, {
                            name: "cil-cloud-download",
                            size: "sm"
                          }, null, _parent5, _scopeId4));
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
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CButton, {
                      color: "primary",
                      size: "sm",
                      onClick: $options.reload
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CIcon, {
                            name: "cil-reload",
                            size: "sm"
                          }, null, _parent5, _scopeId4));
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
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CButton, {
                        color: "primary",
                        size: "sm",
                        onClick: $options.download
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CIcon, {
                            name: "cil-cloud-download",
                            size: "sm"
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_CButton, {
                        color: "primary",
                        size: "sm",
                        onClick: $options.reload
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CIcon, {
                            name: "cil-reload",
                            size: "sm"
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CButtonGroup, { role: "group" }, {
                  default: withCtx(() => [
                    createVNode(_component_CButton, {
                      color: "primary",
                      size: "sm",
                      onClick: $options.download
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_CIcon, {
                          name: "cil-cloud-download",
                          size: "sm"
                        })
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_CButton, {
                      color: "primary",
                      size: "sm",
                      onClick: $options.reload
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_CIcon, {
                          name: "cil-reload",
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
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CCol, {
            md: 10,
            sm: 10
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
            md: 2,
            sm: 2,
            class: "text-right"
          }, {
            default: withCtx(() => [
              createVNode(_component_CButtonGroup, { role: "group" }, {
                default: withCtx(() => [
                  createVNode(_component_CButton, {
                    color: "primary",
                    size: "sm",
                    onClick: $options.download
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CIcon, {
                        name: "cil-cloud-download",
                        size: "sm"
                      })
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_CButton, {
                    color: "primary",
                    size: "sm",
                    onClick: $options.reload
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CIcon, {
                        name: "cil-reload",
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
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(VDataTableServer, {
    class: "my-2 elevation-1",
    headers: $data.headers,
    items: $data.items,
    "items-length": $data.serverItemsLength,
    search: $data.search,
    loading: $data.loading,
    "onUpdate:options": $options.fetch,
    mobile: $data.mobile,
    "footer-props": {
      disableItemsPerPage: $data.disableItemsPerPage,
      disablePagination: $data.disablePagination,
      showFirstLastPage: true,
      showCurrentPage: true,
      itemsPerPageOptions: [10, 20, 50, 100]
    }
  }, {
    loading: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VSkeletonLoader, { type: "table-row@10" }, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(VSkeletonLoader, { type: "table-row@10" })
        ];
      }
    }),
    [`item.32-S`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (item["32-S"]) {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(VTooltip, { bottom: "" }, {
            activator: withCtx(({ props }, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<span${ssrRenderAttrs(props)}${_scopeId2}>${ssrInterpolate(item["32-S"].stock_unit)}</span>`);
              } else {
                return [
                  createVNode("span", props, toDisplayString(item["32-S"].stock_unit), 17)
                ];
              }
            }),
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<span${_scopeId2}>`);
                if (item["32-S"].barcode) {
                  _push3(ssrRenderComponent(_component_vue_barcode, {
                    value: item["32-S"].barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, _parent3, _scopeId2));
                } else {
                  _push3(`<!---->`);
                }
                _push3(`</span>`);
              } else {
                return [
                  createVNode("span", null, [
                    item["32-S"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                      key: 0,
                      value: item["32-S"].barcode,
                      options: { format: "CODE39", height: 32 }
                    }, null, 8, ["value"])) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<div${_scopeId}>－</div>`);
        }
      } else {
        return [
          item["32-S"] ? (openBlock(), createBlock("div", { key: 0 }, [
            createVNode(VTooltip, { bottom: "" }, {
              activator: withCtx(({ props }) => [
                createVNode("span", props, toDisplayString(item["32-S"].stock_unit), 17)
              ]),
              default: withCtx(() => [
                createVNode("span", null, [
                  item["32-S"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                    key: 0,
                    value: item["32-S"].barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, 8, ["value"])) : createCommentVNode("", true)
                ])
              ]),
              _: 2
            }, 1024)
          ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
        ];
      }
    }),
    [`item.34-M`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (item["34-M"]) {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(VTooltip, { bottom: "" }, {
            activator: withCtx(({ props }, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<span${ssrRenderAttrs(props)}${_scopeId2}>${ssrInterpolate(item["34-M"].stock_unit)}</span>`);
              } else {
                return [
                  createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["34-M"].stock_unit), 17)
                ];
              }
            }),
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<span${_scopeId2}>`);
                if (item["34-M"].barcode) {
                  _push3(ssrRenderComponent(_component_vue_barcode, {
                    value: item["34-M"].barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, _parent3, _scopeId2));
                } else {
                  _push3(`<!---->`);
                }
                _push3(`</span>`);
              } else {
                return [
                  createVNode("span", null, [
                    item["34-M"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                      key: 0,
                      value: item["34-M"].barcode,
                      options: { format: "CODE39", height: 32 }
                    }, null, 8, ["value"])) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<div${_scopeId}>－</div>`);
        }
      } else {
        return [
          item["34-M"] ? (openBlock(), createBlock("div", { key: 0 }, [
            createVNode(VTooltip, { bottom: "" }, {
              activator: withCtx(({ props }) => [
                createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["34-M"].stock_unit), 17)
              ]),
              default: withCtx(() => [
                createVNode("span", null, [
                  item["34-M"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                    key: 0,
                    value: item["34-M"].barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, 8, ["value"])) : createCommentVNode("", true)
                ])
              ]),
              _: 2
            }, 1024)
          ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
        ];
      }
    }),
    [`item.36-L`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (item["36-L"]) {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(VTooltip, { bottom: "" }, {
            activator: withCtx(({ props }, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<span${ssrRenderAttrs(props)}${_scopeId2}>${ssrInterpolate(item["36-L"].stock_unit)}</span>`);
              } else {
                return [
                  createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["36-L"].stock_unit), 17)
                ];
              }
            }),
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<span${_scopeId2}>`);
                if (item["36-L"].barcode) {
                  _push3(ssrRenderComponent(_component_vue_barcode, {
                    value: item["36-L"].barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, _parent3, _scopeId2));
                } else {
                  _push3(`<!---->`);
                }
                _push3(`</span>`);
              } else {
                return [
                  createVNode("span", null, [
                    item["36-L"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                      key: 0,
                      value: item["36-L"].barcode,
                      options: { format: "CODE39", height: 32 }
                    }, null, 8, ["value"])) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<div${_scopeId}>－</div>`);
        }
      } else {
        return [
          item["36-L"] ? (openBlock(), createBlock("div", { key: 0 }, [
            createVNode(VTooltip, { bottom: "" }, {
              activator: withCtx(({ props }) => [
                createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["36-L"].stock_unit), 17)
              ]),
              default: withCtx(() => [
                createVNode("span", null, [
                  item["36-L"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                    key: 0,
                    value: item["36-L"].barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, 8, ["value"])) : createCommentVNode("", true)
                ])
              ]),
              _: 2
            }, 1024)
          ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
        ];
      }
    }),
    [`item.38-XL`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (item["38-XL"]) {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(VTooltip, { bottom: "" }, {
            activator: withCtx(({ props }, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<span${ssrRenderAttrs(props)}${_scopeId2}>${ssrInterpolate(item["38-XL"].stock_unit)}</span>`);
              } else {
                return [
                  createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["38-XL"].stock_unit), 17)
                ];
              }
            }),
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<span${_scopeId2}>`);
                if (item["38-XL"].barcode) {
                  _push3(ssrRenderComponent(_component_vue_barcode, {
                    value: item["38-XL"].barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, _parent3, _scopeId2));
                } else {
                  _push3(`<!---->`);
                }
                _push3(`</span>`);
              } else {
                return [
                  createVNode("span", null, [
                    item["38-XL"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                      key: 0,
                      value: item["38-XL"].barcode,
                      options: { format: "CODE39", height: 32 }
                    }, null, 8, ["value"])) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<div${_scopeId}>－</div>`);
        }
      } else {
        return [
          item["38-XL"] ? (openBlock(), createBlock("div", { key: 0 }, [
            createVNode(VTooltip, { bottom: "" }, {
              activator: withCtx(({ props }) => [
                createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["38-XL"].stock_unit), 17)
              ]),
              default: withCtx(() => [
                createVNode("span", null, [
                  item["38-XL"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                    key: 0,
                    value: item["38-XL"].barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, 8, ["value"])) : createCommentVNode("", true)
                ])
              ]),
              _: 2
            }, 1024)
          ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
        ];
      }
    }),
    [`item.40-Q`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (item["40-Q"]) {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(VTooltip, { bottom: "" }, {
            activator: withCtx(({ props }, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<span${ssrRenderAttrs(props)}${_scopeId2}>${ssrInterpolate(item["40-Q"].stock_unit)}</span>`);
              } else {
                return [
                  createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["40-Q"].stock_unit), 17)
                ];
              }
            }),
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<span${_scopeId2}>`);
                if (item["40-Q"].barcode) {
                  _push3(ssrRenderComponent(_component_vue_barcode, {
                    value: item["40-Q"].barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, _parent3, _scopeId2));
                } else {
                  _push3(`<!---->`);
                }
                _push3(`</span>`);
              } else {
                return [
                  createVNode("span", null, [
                    item["40-Q"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                      key: 0,
                      value: item["40-Q"].barcode,
                      options: { format: "CODE39", height: 32 }
                    }, null, 8, ["value"])) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<div${_scopeId}>－</div>`);
        }
      } else {
        return [
          item["40-Q"] ? (openBlock(), createBlock("div", { key: 0 }, [
            createVNode(VTooltip, { bottom: "" }, {
              activator: withCtx(({ props }) => [
                createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["40-Q"].stock_unit), 17)
              ]),
              default: withCtx(() => [
                createVNode("span", null, [
                  item["40-Q"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                    key: 0,
                    value: item["40-Q"].barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, 8, ["value"])) : createCommentVNode("", true)
                ])
              ]),
              _: 2
            }, 1024)
          ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
        ];
      }
    }),
    [`item.42-EQ`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (item["42-EQ"]) {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(VTooltip, { bottom: "" }, {
            activator: withCtx(({ props }, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<span${ssrRenderAttrs(props)}${_scopeId2}>${ssrInterpolate(item["42-EQ"].stock_unit)}</span>`);
              } else {
                return [
                  createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["42-EQ"].stock_unit), 17)
                ];
              }
            }),
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<span${_scopeId2}>`);
                if (item["42-EQ"].barcode) {
                  _push3(ssrRenderComponent(_component_vue_barcode, {
                    value: item["42-EQ"].barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, _parent3, _scopeId2));
                } else {
                  _push3(`<!---->`);
                }
                _push3(`</span>`);
              } else {
                return [
                  createVNode("span", null, [
                    item["42-EQ"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                      key: 0,
                      value: item["42-EQ"].barcode,
                      options: { format: "CODE39", height: 32 }
                    }, null, 8, ["value"])) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<div${_scopeId}>－</div>`);
        }
      } else {
        return [
          item["42-EQ"] ? (openBlock(), createBlock("div", { key: 0 }, [
            createVNode(VTooltip, { bottom: "" }, {
              activator: withCtx(({ props }) => [
                createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["42-EQ"].stock_unit), 17)
              ]),
              default: withCtx(() => [
                createVNode("span", null, [
                  item["42-EQ"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                    key: 0,
                    value: item["42-EQ"].barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, 8, ["value"])) : createCommentVNode("", true)
                ])
              ]),
              _: 2
            }, 1024)
          ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
        ];
      }
    }),
    [`item.44-Free`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (item["44-Free"]) {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(VTooltip, { bottom: "" }, {
            activator: withCtx(({ props }, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<span${ssrRenderAttrs(props)}${_scopeId2}>${ssrInterpolate(item["44-Free"].stock_unit)}</span>`);
              } else {
                return [
                  createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["44-Free"].stock_unit), 17)
                ];
              }
            }),
            default: withCtx((_, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<span${_scopeId2}>`);
                if (item["44-Free"].barcode) {
                  _push3(ssrRenderComponent(_component_vue_barcode, {
                    value: item["44-Free"].barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, _parent3, _scopeId2));
                } else {
                  _push3(`<!---->`);
                }
                _push3(`</span>`);
              } else {
                return [
                  createVNode("span", null, [
                    item["44-Free"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                      key: 0,
                      value: item["44-Free"].barcode,
                      options: { format: "CODE39", height: 32 }
                    }, null, 8, ["value"])) : createCommentVNode("", true)
                  ])
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<div${_scopeId}>－</div>`);
        }
      } else {
        return [
          item["44-Free"] ? (openBlock(), createBlock("div", { key: 0 }, [
            createVNode(VTooltip, { bottom: "" }, {
              activator: withCtx(({ props }) => [
                createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["44-Free"].stock_unit), 17)
              ]),
              default: withCtx(() => [
                createVNode("span", null, [
                  item["44-Free"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                    key: 0,
                    value: item["44-Free"].barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, 8, ["value"])) : createCommentVNode("", true)
                ])
              ]),
              _: 2
            }, 1024)
          ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
        ];
      }
    }),
    [`item.subtotal`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (item.subtotal) {
          _push2(`<div${_scopeId}>${ssrInterpolate(_ctx.$filters.formatPrice(item.subtotal))}</div>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          item.subtotal ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(_ctx.$filters.formatPrice(item.subtotal)), 1)) : createCommentVNode("", true)
        ];
      }
    }),
    [`item.actions`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CButtonGroup, null, {
          default: withCtx((_, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              ssrRenderList(item.actions, (action) => {
                _push3(ssrRenderComponent(_component_CButton, {
                  key: action.key,
                  color: action.color,
                  disabled: action.disabled,
                  size: "sm",
                  onClick: ($event) => $options.click(item, action)
                }, {
                  default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`${ssrInterpolate(action.title)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(action.title), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(item.actions, (action) => {
                  return openBlock(), createBlock(_component_CButton, {
                    key: action.key,
                    color: action.color,
                    disabled: action.disabled,
                    size: "sm",
                    onClick: ($event) => $options.click(item, action)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(action.title), 1)
                    ]),
                    _: 2
                  }, 1032, ["color", "disabled", "onClick"]);
                }), 128))
              ];
            }
          }),
          _: 2
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CButtonGroup, null, {
            default: withCtx(() => [
              (openBlock(true), createBlock(Fragment, null, renderList(item.actions, (action) => {
                return openBlock(), createBlock(_component_CButton, {
                  key: action.key,
                  color: action.color,
                  disabled: action.disabled,
                  size: "sm",
                  onClick: ($event) => $options.click(item, action)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(action.title), 1)
                  ]),
                  _: 2
                }, 1032, ["color", "disabled", "onClick"]);
              }), 128))
            ]),
            _: 2
          }, 1024)
        ];
      }
    }),
    _: 2
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/goods-stocks/GoodsStock.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GoodsStock = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  GoodsStock as default
};
//# sourceMappingURL=GoodsStock-D8ZQDOH3.mjs.map
