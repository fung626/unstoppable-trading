import { _ as _export_sfc, a as Dialog, D as DutyCalendar, f as ExchangeRate, g as ScannerDialog, h as ShippingPurchaseQuickSearch } from "../app.mjs";
import { mapState } from "vuex";
import { CChartLine } from "@coreui/vue-chartjs";
import { resolveComponent, withCtx, createVNode, toDisplayString, useSSRContext, openBlock, createBlock, createCommentVNode, createTextVNode, Fragment, renderList, mergeProps } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
import { VDataTableServer } from "vuetify/lib/components/VDataTable/index.mjs";
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
const _sfc_main$2 = {
  name: "DashboardSummaryLineChart",
  components: { CChartLine },
  computed: {
    ...mapState(["chart/purchase-line"]),
    data() {
      return JSON.parse(JSON.stringify(this["chart/purchase-line"].data));
    }
  },
  data() {
    return {
      loading: false,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        tooltips: {
          mode: "index"
        },
        legend: {
          display: false
        },
        scales: {
          x: {
            gridLines: {
              drawOnChartArea: false
            }
          },
          y: {
            ticks: {
              beginAtZero: true,
              callback: (value, index, values) => {
                return `${Number(value).abbreviateAmount()}`;
              }
            }
          }
        },
        pan: {
          enabled: true,
          mode: "x"
        },
        zoom: {
          enabled: true,
          mode: "x"
        },
        elements: {
          point: {
            radius: 0,
            hitRadius: 10,
            hoverRadius: 4,
            hoverBorderWidth: 3
          }
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
      self.loading = true;
      this.$store.dispatch("chart/purchase-line/get").then((response) => {
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
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButtonGroup = resolveComponent("CButtonGroup");
  const _component_CChartLine = resolveComponent("CChartLine");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_CCard, null, {
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
                    _push4(ssrRenderComponent(_component_CCol, { sm: "5" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<h4 id="traffic" class="card-title mb-0"${_scopeId4}>${ssrInterpolate(_ctx.$t("traffic"))}</h4>`);
                        } else {
                          return [
                            createVNode("h4", {
                              id: "traffic",
                              class: "card-title mb-0"
                            }, toDisplayString(_ctx.$t("traffic")), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, {
                      sm: "7",
                      class: "d-none d-md-block"
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CButtonGroup, { class: "float-right mr-3" }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CButtonGroup, { class: "float-right mr-3" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, { sm: "5" }, {
                        default: withCtx(() => [
                          createVNode("h4", {
                            id: "traffic",
                            class: "card-title mb-0"
                          }, toDisplayString(_ctx.$t("traffic")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        sm: "7",
                        class: "d-none d-md-block"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CButtonGroup, { class: "float-right mr-3" })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CChartLine, {
                style: { "height": "300px", "max-height": "300px", "margin-top": "40px" },
                wrapper: false,
                options: $data.options,
                data: $options.data
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CRow, { class: "p-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, { sm: "5" }, {
                      default: withCtx(() => [
                        createVNode("h4", {
                          id: "traffic",
                          class: "card-title mb-0"
                        }, toDisplayString(_ctx.$t("traffic")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      sm: "7",
                      class: "d-none d-md-block"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_CButtonGroup, { class: "float-right mr-3" })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CChartLine, {
                  style: { "height": "300px", "max-height": "300px", "margin-top": "40px" },
                  wrapper: false,
                  options: $data.options,
                  data: $options.data
                }, null, 8, ["options", "data"])
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
                  createVNode(_component_CCol, { sm: "5" }, {
                    default: withCtx(() => [
                      createVNode("h4", {
                        id: "traffic",
                        class: "card-title mb-0"
                      }, toDisplayString(_ctx.$t("traffic")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CCol, {
                    sm: "7",
                    class: "d-none d-md-block"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CButtonGroup, { class: "float-right mr-3" })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CChartLine, {
                style: { "height": "300px", "max-height": "300px", "margin-top": "40px" },
                wrapper: false,
                options: $data.options,
                data: $options.data
              }, null, 8, ["options", "data"])
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/dashboard/components/DashboardSummaryLineChart.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const DashboardSummaryLineChart = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = {
  name: "PurchaseTable",
  components: {
    Dialog
  },
  computed: {
    ...mapState(["goods/purchases"]),
    serverItemsLength() {
      var _a;
      return (_a = this["goods/purchases"].data) == null ? void 0 : _a.total;
    },
    pageCount() {
      var _a;
      return (_a = this["goods/purchases"].data) == null ? void 0 : _a.last_page;
    },
    page() {
      var _a;
      return (_a = this["goods/purchases"].data) == null ? void 0 : _a.current_page;
    },
    items() {
      var _a;
      return (_a = this["goods/purchases"].data) == null ? void 0 : _a.data;
    }
  },
  data() {
    return {
      search: null,
      loading: false,
      options: {},
      sortBy: "updated_at",
      sortDesc: true,
      disableItemsPerPage: false,
      disablePagination: false,
      headers: [
        { title: this.$t("number"), value: "generated_id" },
        { title: this.$t("supplier"), value: "supplier.name" },
        { title: this.$t("user"), value: "users.name" },
        { title: this.$t("subtotal"), value: "subtotal" },
        { title: this.$t("status"), value: "status" },
        { title: this.$t("date"), value: "date" },
        { title: this.$t("updatedat"), value: "updated_at" },
        {
          text: `${this.$t("status")}${this.$t("actions")}`,
          value: "status_actions"
        },
        {
          title: this.$t("actions"),
          value: "actions",
          sortable: false
        }
      ]
    };
  },
  methods: {
    fetch({ page, itemsPerPage, sortBy, search }) {
      let self = this;
      if (self.loading) {
        return;
      }
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
      this.$store.dispatch("goods/purchases/get", data).then((response) => {
        self.loading = false;
      }).catch((error) => {
        self.loading = false;
      });
    },
    download() {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      const { itemsPerPage, sortBy, sortDesc } = self.options;
      let data = {
        per_page: itemsPerPage,
        sort_by: sortBy,
        sort_desc: sortDesc,
        search: self.searchText,
        extension: "pdf"
      };
      this.$store.dispatch("goods/purchases/export", data).then((response) => {
        self.loading = false;
      }).catch((error) => {
        self.loading = false;
      });
    },
    reload() {
      this.fetch({ ...this.options });
    },
    async click(item, action) {
      let type = action.type;
      switch (type) {
        case "UpdateStatus":
          if (await this.$refs.dialog.open(
            this.$t("alert.title"),
            this.$t("alert.update")
          )) {
            let self = this;
            if (self.loading) {
              return;
            }
            self.loading = true;
            this.$store.dispatch("goods/purchases/update", {
              id: item.id,
              status: action.status
            }).then((response) => {
              self.loading = false;
              self.fetch();
            }).catch((error) => {
              self.loading = false;
            });
          }
          break;
        case "RouterPush":
          let route = action.route;
          this.$router.push({
            path: route
          });
          break;
        case "Delete":
          if (await this.$refs.dialog.open(
            this.$t("alert.title"),
            this.$t("alert.delete")
          )) {
            let self = this;
            if (self.loading) {
              return;
            }
            this.$store.dispatch("goods/purchases/delete", {
              id: item.id
            }).then((response) => {
              self.loading = false;
              self.fetch();
            }).catch((error) => {
              self.loading = false;
            });
          }
          break;
      }
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Dialog = resolveComponent("Dialog");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CInputGroup = resolveComponent("CInputGroup");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_CFormInput = resolveComponent("CFormInput");
  const _component_CButtonGroup = resolveComponent("CButtonGroup");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_Dialog, { ref: "dialog" }, null, _parent));
  _push(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
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
              _push3(ssrRenderComponent(_component_CButtonGroup, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CButton, {
                      color: "primary",
                      size: "sm",
                      onClick: $options.download,
                      disabled: $data.loading
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
                      onClick: $options.reload,
                      disabled: $data.loading
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
              }, _parent3, _scopeId2));
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
  }, _parent));
  _push(ssrRenderComponent(VDataTableServer, {
    class: "elevation-1",
    headers: $data.headers,
    items: $options.items,
    "items-length": $options.serverItemsLength,
    search: $data.search,
    loading: $data.loading,
    "onUpdate:options": $options.fetch,
    mobile: _ctx.mobile,
    "hide-default-footer": ""
  }, {
    [`item.status`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (item.status) {
          _push2(`<div${_scopeId}>${ssrInterpolate(_ctx.$t(`purchase.status.${item.status}`))}</div>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          item.status ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(_ctx.$t(`purchase.status.${item.status}`)), 1)) : createCommentVNode("", true)
        ];
      }
    }),
    [`item.date`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (item.date) {
          _push2(`<div${_scopeId}>${ssrInterpolate(this.$formatDate(item.date))}</div>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          item.date ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(this.$formatDate(item.date)), 1)) : createCommentVNode("", true)
        ];
      }
    }),
    [`item.created_at`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(this.$formatDate(item.created_at))}`);
      } else {
        return [
          createTextVNode(toDisplayString(this.$formatDate(item.created_at)), 1)
        ];
      }
    }),
    [`item.updated_at`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(this.$formatDate(item.updated_at))}`);
      } else {
        return [
          createTextVNode(toDisplayString(this.$formatDate(item.updated_at)), 1)
        ];
      }
    }),
    [`item.status_actions`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CButtonGroup, null, {
          default: withCtx((_, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              ssrRenderList(item.status_actions, (action) => {
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
                (openBlock(true), createBlock(Fragment, null, renderList(item.status_actions, (action) => {
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
              (openBlock(true), createBlock(Fragment, null, renderList(item.status_actions, (action) => {
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/dashboard/components/PurchaseTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const PurchaseTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  name: "Dashboard",
  components: {
    DutyCalendar,
    ExchangeRate,
    ScannerDialog,
    ShippingPurchaseQuickSearch,
    DashboardSummaryLineChart,
    PurchaseTable
  },
  computed: {
    ...mapState(["dashboard"]),
    totalStock() {
      var _a;
      return (_a = this.dashboard.data) == null ? void 0 : _a.stock_count;
    },
    totalGoodsItem() {
      var _a;
      return (_a = this.dashboard.data) == null ? void 0 : _a.item_count;
    }
  },
  data() {
    return {
      loading: false
    };
  },
  mounted() {
    this.fetch();
  },
  methods: {
    fetch() {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      let data = {};
      this.$store.dispatch("dashboard/get", data).then((response) => {
        self.loading = false;
      }).catch((error) => {
        self.loading = false;
      });
    },
    isPermissionGranted(key) {
      return this.$store.getters.isPermissionGranted(key);
    },
    async search() {
      await this.$refs.scannerDialog.open("Search");
    },
    async shipping() {
      await this.$refs.scannerDialog.open("Shipping");
    },
    async stocktake() {
      await this.$refs.scannerDialog.open("Stocktake");
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CContainer = resolveComponent("CContainer");
  const _component_ScannerDialog = resolveComponent("ScannerDialog");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CWidgetStatsF = resolveComponent("CWidgetStatsF");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_ShippingPurchaseQuickSearch = resolveComponent("ShippingPurchaseQuickSearch");
  const _component_DashboardSummaryLineChart = resolveComponent("DashboardSummaryLineChart");
  const _component_DutyCalendar = resolveComponent("DutyCalendar");
  const _component_ExchangeRate = resolveComponent("ExchangeRate");
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CCallout = resolveComponent("CCallout");
  const _component_PurchaseTable = resolveComponent("PurchaseTable");
  _push(ssrRenderComponent(_component_CContainer, mergeProps({ lg: "" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_ScannerDialog, { ref: "scannerDialog" }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CRow, { class: "pb-2" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              if ($options.isPermissionGranted("goods")) {
                _push3(ssrRenderComponent(_component_CCol, {
                  sm: 12,
                  lg: 4,
                  class: "py-2"
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_CWidgetStatsF, {
                        color: "primary",
                        title: `${_ctx.$t("barcode")}${_ctx.$t("scanner")}`,
                        value: `${_ctx.$t("goods")}${_ctx.$t("search")}`
                      }, {
                        icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(_component_CButton, {
                              class: "text-white",
                              size: "lg",
                              onClick: $options.search
                            }, {
                              default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(ssrRenderComponent(_component_CIcon, {
                                    name: "cil-barcode",
                                    size: "lg"
                                  }, null, _parent6, _scopeId5));
                                } else {
                                  return [
                                    createVNode(_component_CIcon, {
                                      name: "cil-barcode",
                                      size: "lg"
                                    })
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(_component_CButton, {
                                class: "text-white",
                                size: "lg",
                                onClick: $options.search
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_CIcon, {
                                    name: "cil-barcode",
                                    size: "lg"
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
                        createVNode(_component_CWidgetStatsF, {
                          color: "primary",
                          title: `${_ctx.$t("barcode")}${_ctx.$t("scanner")}`,
                          value: `${_ctx.$t("goods")}${_ctx.$t("search")}`
                        }, {
                          icon: withCtx(() => [
                            createVNode(_component_CButton, {
                              class: "text-white",
                              size: "lg",
                              onClick: $options.search
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_CIcon, {
                                  name: "cil-barcode",
                                  size: "lg"
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["title", "value"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
              if ($options.isPermissionGranted("shippings")) {
                _push3(ssrRenderComponent(_component_CCol, {
                  sm: 12,
                  lg: 4,
                  class: "py-2"
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_CWidgetStatsF, {
                        color: "primary",
                        title: `${_ctx.$t("barcode")}${_ctx.$t("scanner")}`,
                        value: `${_ctx.$t("goods")}${_ctx.$t("shippings.title")}`
                      }, {
                        icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(_component_CButton, {
                              class: "text-white",
                              size: "lg",
                              onClick: $options.shipping
                            }, {
                              default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(ssrRenderComponent(_component_CIcon, {
                                    name: "cil-barcode",
                                    size: "lg"
                                  }, null, _parent6, _scopeId5));
                                } else {
                                  return [
                                    createVNode(_component_CIcon, {
                                      name: "cil-barcode",
                                      size: "lg"
                                    })
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(_component_CButton, {
                                class: "text-white",
                                size: "lg",
                                onClick: $options.shipping
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_CIcon, {
                                    name: "cil-barcode",
                                    size: "lg"
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
                        createVNode(_component_CWidgetStatsF, {
                          color: "primary",
                          title: `${_ctx.$t("barcode")}${_ctx.$t("scanner")}`,
                          value: `${_ctx.$t("goods")}${_ctx.$t("shippings.title")}`
                        }, {
                          icon: withCtx(() => [
                            createVNode(_component_CButton, {
                              class: "text-white",
                              size: "lg",
                              onClick: $options.shipping
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_CIcon, {
                                  name: "cil-barcode",
                                  size: "lg"
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["title", "value"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
              if ($options.isPermissionGranted("stocktakes")) {
                _push3(ssrRenderComponent(_component_CCol, {
                  sm: 12,
                  lg: 4,
                  class: "py-2"
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_CWidgetStatsF, {
                        color: "info",
                        title: `${_ctx.$t("barcode")}${_ctx.$t("scanner")}`,
                        value: `${_ctx.$t("stocktake")}`
                      }, {
                        icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(_component_CButton, {
                              class: "text-white",
                              size: "lg",
                              onClick: $options.stocktake
                            }, {
                              default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(ssrRenderComponent(_component_CIcon, {
                                    name: "cil-barcode",
                                    size: "lg"
                                  }, null, _parent6, _scopeId5));
                                } else {
                                  return [
                                    createVNode(_component_CIcon, {
                                      name: "cil-barcode",
                                      size: "lg"
                                    })
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(_component_CButton, {
                                class: "text-white",
                                size: "lg",
                                onClick: $options.stocktake
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_CIcon, {
                                    name: "cil-barcode",
                                    size: "lg"
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
                        createVNode(_component_CWidgetStatsF, {
                          color: "info",
                          title: `${_ctx.$t("barcode")}${_ctx.$t("scanner")}`,
                          value: `${_ctx.$t("stocktake")}`
                        }, {
                          icon: withCtx(() => [
                            createVNode(_component_CButton, {
                              class: "text-white",
                              size: "lg",
                              onClick: $options.stocktake
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_CIcon, {
                                  name: "cil-barcode",
                                  size: "lg"
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        }, 8, ["title", "value"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
            } else {
              return [
                $options.isPermissionGranted("goods") ? (openBlock(), createBlock(_component_CCol, {
                  key: 0,
                  sm: 12,
                  lg: 4,
                  class: "py-2"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CWidgetStatsF, {
                      color: "primary",
                      title: `${_ctx.$t("barcode")}${_ctx.$t("scanner")}`,
                      value: `${_ctx.$t("goods")}${_ctx.$t("search")}`
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_CButton, {
                          class: "text-white",
                          size: "lg",
                          onClick: $options.search
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CIcon, {
                              name: "cil-barcode",
                              size: "lg"
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["title", "value"])
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                $options.isPermissionGranted("shippings") ? (openBlock(), createBlock(_component_CCol, {
                  key: 1,
                  sm: 12,
                  lg: 4,
                  class: "py-2"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CWidgetStatsF, {
                      color: "primary",
                      title: `${_ctx.$t("barcode")}${_ctx.$t("scanner")}`,
                      value: `${_ctx.$t("goods")}${_ctx.$t("shippings.title")}`
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_CButton, {
                          class: "text-white",
                          size: "lg",
                          onClick: $options.shipping
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CIcon, {
                              name: "cil-barcode",
                              size: "lg"
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["title", "value"])
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                $options.isPermissionGranted("stocktakes") ? (openBlock(), createBlock(_component_CCol, {
                  key: 2,
                  sm: 12,
                  lg: 4,
                  class: "py-2"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CWidgetStatsF, {
                      color: "info",
                      title: `${_ctx.$t("barcode")}${_ctx.$t("scanner")}`,
                      value: `${_ctx.$t("stocktake")}`
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_CButton, {
                          class: "text-white",
                          size: "lg",
                          onClick: $options.stocktake
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CIcon, {
                              name: "cil-barcode",
                              size: "lg"
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    }, 8, ["title", "value"])
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CRow, { class: "py-2" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CCol, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if ($options.isPermissionGranted("goods") && $options.isPermissionGranted("shipping")) {
                      _push4(ssrRenderComponent(_component_ShippingPurchaseQuickSearch, null, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<!---->`);
                    }
                  } else {
                    return [
                      $options.isPermissionGranted("goods") && $options.isPermissionGranted("shipping") ? (openBlock(), createBlock(_component_ShippingPurchaseQuickSearch, { key: 0 })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CCol, null, {
                  default: withCtx(() => [
                    $options.isPermissionGranted("goods") && $options.isPermissionGranted("shipping") ? (openBlock(), createBlock(_component_ShippingPurchaseQuickSearch, { key: 0 })) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CRow, { class: "py-2" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CCol, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (_ctx.$store.getters.isAdmin) {
                      _push4(ssrRenderComponent(_component_DashboardSummaryLineChart, null, null, _parent4, _scopeId3));
                    } else {
                      _push4(`<!---->`);
                    }
                  } else {
                    return [
                      _ctx.$store.getters.isAdmin ? (openBlock(), createBlock(_component_DashboardSummaryLineChart, { key: 0 })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CCol, null, {
                  default: withCtx(() => [
                    _ctx.$store.getters.isAdmin ? (openBlock(), createBlock(_component_DashboardSummaryLineChart, { key: 0 })) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        if (_ctx.$store.getters.isAdmin) {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(_component_DutyCalendar, null, null, _parent2, _scopeId));
          _push2(`</div>`);
        } else {
          _push2(`<div${_scopeId}>`);
          _push2(ssrRenderComponent(_component_DutyCalendar, {
            userId: _ctx.$store.getters.authUser.id
          }, null, _parent2, _scopeId));
          _push2(`</div>`);
        }
        _push2(ssrRenderComponent(_component_ExchangeRate, null, null, _parent2, _scopeId));
        if (_ctx.$store.getters.isAdmin) {
          _push2(ssrRenderComponent(_component_CRow, { class: "py-2" }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_CCol, null, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_CCard, null, {
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(_component_CCardBody, null, {
                              default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(ssrRenderComponent(_component_CRow, null, {
                                    default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                      if (_push7) {
                                        _push7(ssrRenderComponent(_component_CCol, {
                                          sm: 12,
                                          lg: 6
                                        }, {
                                          default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                            if (_push8) {
                                              _push8(ssrRenderComponent(_component_CRow, null, {
                                                default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                  if (_push9) {
                                                    _push9(ssrRenderComponent(_component_CCol, { sm: 12 }, {
                                                      default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                        if (_push10) {
                                                          _push10(ssrRenderComponent(_component_CCallout, { color: "warning" }, {
                                                            default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                              if (_push11) {
                                                                _push11(`<small class="text-muted"${_scopeId10}>${ssrInterpolate(_ctx.$t("stock"))}</small><br${_scopeId10}><strong class="h4"${_scopeId10}>${ssrInterpolate($options.totalStock)}</strong>`);
                                                              } else {
                                                                return [
                                                                  createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("stock")), 1),
                                                                  createVNode("br"),
                                                                  createVNode("strong", { class: "h4" }, toDisplayString($options.totalStock), 1)
                                                                ];
                                                              }
                                                            }),
                                                            _: 1
                                                          }, _parent10, _scopeId9));
                                                        } else {
                                                          return [
                                                            createVNode(_component_CCallout, { color: "warning" }, {
                                                              default: withCtx(() => [
                                                                createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("stock")), 1),
                                                                createVNode("br"),
                                                                createVNode("strong", { class: "h4" }, toDisplayString($options.totalStock), 1)
                                                              ]),
                                                              _: 1
                                                            })
                                                          ];
                                                        }
                                                      }),
                                                      _: 1
                                                    }, _parent9, _scopeId8));
                                                  } else {
                                                    return [
                                                      createVNode(_component_CCol, { sm: 12 }, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_CCallout, { color: "warning" }, {
                                                            default: withCtx(() => [
                                                              createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("stock")), 1),
                                                              createVNode("br"),
                                                              createVNode("strong", { class: "h4" }, toDisplayString($options.totalStock), 1)
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
                                              }, _parent8, _scopeId7));
                                            } else {
                                              return [
                                                createVNode(_component_CRow, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_CCol, { sm: 12 }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_CCallout, { color: "warning" }, {
                                                          default: withCtx(() => [
                                                            createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("stock")), 1),
                                                            createVNode("br"),
                                                            createVNode("strong", { class: "h4" }, toDisplayString($options.totalStock), 1)
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
                                        }, _parent7, _scopeId6));
                                        _push7(ssrRenderComponent(_component_CCol, {
                                          sm: 12,
                                          lg: 6
                                        }, {
                                          default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                            if (_push8) {
                                              _push8(ssrRenderComponent(_component_CRow, null, {
                                                default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                  if (_push9) {
                                                    _push9(ssrRenderComponent(_component_CCol, { sm: 12 }, {
                                                      default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                        if (_push10) {
                                                          _push10(ssrRenderComponent(_component_CCallout, { color: "danger" }, {
                                                            default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                              if (_push11) {
                                                                _push11(`<small class="text-muted"${_scopeId10}>${ssrInterpolate(_ctx.$t("goods"))}</small><br${_scopeId10}><strong class="h4"${_scopeId10}>${ssrInterpolate($options.totalGoodsItem)}</strong>`);
                                                              } else {
                                                                return [
                                                                  createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("goods")), 1),
                                                                  createVNode("br"),
                                                                  createVNode("strong", { class: "h4" }, toDisplayString($options.totalGoodsItem), 1)
                                                                ];
                                                              }
                                                            }),
                                                            _: 1
                                                          }, _parent10, _scopeId9));
                                                        } else {
                                                          return [
                                                            createVNode(_component_CCallout, { color: "danger" }, {
                                                              default: withCtx(() => [
                                                                createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("goods")), 1),
                                                                createVNode("br"),
                                                                createVNode("strong", { class: "h4" }, toDisplayString($options.totalGoodsItem), 1)
                                                              ]),
                                                              _: 1
                                                            })
                                                          ];
                                                        }
                                                      }),
                                                      _: 1
                                                    }, _parent9, _scopeId8));
                                                  } else {
                                                    return [
                                                      createVNode(_component_CCol, { sm: 12 }, {
                                                        default: withCtx(() => [
                                                          createVNode(_component_CCallout, { color: "danger" }, {
                                                            default: withCtx(() => [
                                                              createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("goods")), 1),
                                                              createVNode("br"),
                                                              createVNode("strong", { class: "h4" }, toDisplayString($options.totalGoodsItem), 1)
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
                                              }, _parent8, _scopeId7));
                                            } else {
                                              return [
                                                createVNode(_component_CRow, null, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_CCol, { sm: 12 }, {
                                                      default: withCtx(() => [
                                                        createVNode(_component_CCallout, { color: "danger" }, {
                                                          default: withCtx(() => [
                                                            createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("goods")), 1),
                                                            createVNode("br"),
                                                            createVNode("strong", { class: "h4" }, toDisplayString($options.totalGoodsItem), 1)
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
                                        }, _parent7, _scopeId6));
                                      } else {
                                        return [
                                          createVNode(_component_CCol, {
                                            sm: 12,
                                            lg: 6
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_CRow, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_CCol, { sm: 12 }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_CCallout, { color: "warning" }, {
                                                        default: withCtx(() => [
                                                          createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("stock")), 1),
                                                          createVNode("br"),
                                                          createVNode("strong", { class: "h4" }, toDisplayString($options.totalStock), 1)
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
                                          }),
                                          createVNode(_component_CCol, {
                                            sm: 12,
                                            lg: 6
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_CRow, null, {
                                                default: withCtx(() => [
                                                  createVNode(_component_CCol, { sm: 12 }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_CCallout, { color: "danger" }, {
                                                        default: withCtx(() => [
                                                          createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("goods")), 1),
                                                          createVNode("br"),
                                                          createVNode("strong", { class: "h4" }, toDisplayString($options.totalGoodsItem), 1)
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
                                  }, _parent6, _scopeId5));
                                  _push6(`<br${_scopeId5}>`);
                                  _push6(ssrRenderComponent(_component_PurchaseTable, null, null, _parent6, _scopeId5));
                                } else {
                                  return [
                                    createVNode(_component_CRow, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_CCol, {
                                          sm: 12,
                                          lg: 6
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_CRow, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_CCol, { sm: 12 }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_CCallout, { color: "warning" }, {
                                                      default: withCtx(() => [
                                                        createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("stock")), 1),
                                                        createVNode("br"),
                                                        createVNode("strong", { class: "h4" }, toDisplayString($options.totalStock), 1)
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
                                        }),
                                        createVNode(_component_CCol, {
                                          sm: 12,
                                          lg: 6
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_CRow, null, {
                                              default: withCtx(() => [
                                                createVNode(_component_CCol, { sm: 12 }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_CCallout, { color: "danger" }, {
                                                      default: withCtx(() => [
                                                        createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("goods")), 1),
                                                        createVNode("br"),
                                                        createVNode("strong", { class: "h4" }, toDisplayString($options.totalGoodsItem), 1)
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
                                    }),
                                    createVNode("br"),
                                    createVNode(_component_PurchaseTable)
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(_component_CCardBody, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_CCol, {
                                        sm: 12,
                                        lg: 6
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_CRow, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_CCol, { sm: 12 }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_CCallout, { color: "warning" }, {
                                                    default: withCtx(() => [
                                                      createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("stock")), 1),
                                                      createVNode("br"),
                                                      createVNode("strong", { class: "h4" }, toDisplayString($options.totalStock), 1)
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
                                      }),
                                      createVNode(_component_CCol, {
                                        sm: 12,
                                        lg: 6
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_CRow, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_CCol, { sm: 12 }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_CCallout, { color: "danger" }, {
                                                    default: withCtx(() => [
                                                      createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("goods")), 1),
                                                      createVNode("br"),
                                                      createVNode("strong", { class: "h4" }, toDisplayString($options.totalGoodsItem), 1)
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
                                  }),
                                  createVNode("br"),
                                  createVNode(_component_PurchaseTable)
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
                        createVNode(_component_CCard, null, {
                          default: withCtx(() => [
                            createVNode(_component_CCardBody, null, {
                              default: withCtx(() => [
                                createVNode(_component_CRow, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_CCol, {
                                      sm: 12,
                                      lg: 6
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_CRow, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_CCol, { sm: 12 }, {
                                              default: withCtx(() => [
                                                createVNode(_component_CCallout, { color: "warning" }, {
                                                  default: withCtx(() => [
                                                    createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("stock")), 1),
                                                    createVNode("br"),
                                                    createVNode("strong", { class: "h4" }, toDisplayString($options.totalStock), 1)
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
                                    }),
                                    createVNode(_component_CCol, {
                                      sm: 12,
                                      lg: 6
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_CRow, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_CCol, { sm: 12 }, {
                                              default: withCtx(() => [
                                                createVNode(_component_CCallout, { color: "danger" }, {
                                                  default: withCtx(() => [
                                                    createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("goods")), 1),
                                                    createVNode("br"),
                                                    createVNode("strong", { class: "h4" }, toDisplayString($options.totalGoodsItem), 1)
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
                                }),
                                createVNode("br"),
                                createVNode(_component_PurchaseTable)
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
                  createVNode(_component_CCol, null, {
                    default: withCtx(() => [
                      createVNode(_component_CCard, null, {
                        default: withCtx(() => [
                          createVNode(_component_CCardBody, null, {
                            default: withCtx(() => [
                              createVNode(_component_CRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CCol, {
                                    sm: 12,
                                    lg: 6
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_CRow, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_CCol, { sm: 12 }, {
                                            default: withCtx(() => [
                                              createVNode(_component_CCallout, { color: "warning" }, {
                                                default: withCtx(() => [
                                                  createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("stock")), 1),
                                                  createVNode("br"),
                                                  createVNode("strong", { class: "h4" }, toDisplayString($options.totalStock), 1)
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
                                  }),
                                  createVNode(_component_CCol, {
                                    sm: 12,
                                    lg: 6
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_CRow, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_CCol, { sm: 12 }, {
                                            default: withCtx(() => [
                                              createVNode(_component_CCallout, { color: "danger" }, {
                                                default: withCtx(() => [
                                                  createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("goods")), 1),
                                                  createVNode("br"),
                                                  createVNode("strong", { class: "h4" }, toDisplayString($options.totalGoodsItem), 1)
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
                              }),
                              createVNode("br"),
                              createVNode(_component_PurchaseTable)
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
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode(_component_ScannerDialog, { ref: "scannerDialog" }, null, 512),
          createVNode(_component_CRow, { class: "pb-2" }, {
            default: withCtx(() => [
              $options.isPermissionGranted("goods") ? (openBlock(), createBlock(_component_CCol, {
                key: 0,
                sm: 12,
                lg: 4,
                class: "py-2"
              }, {
                default: withCtx(() => [
                  createVNode(_component_CWidgetStatsF, {
                    color: "primary",
                    title: `${_ctx.$t("barcode")}${_ctx.$t("scanner")}`,
                    value: `${_ctx.$t("goods")}${_ctx.$t("search")}`
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_CButton, {
                        class: "text-white",
                        size: "lg",
                        onClick: $options.search
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CIcon, {
                            name: "cil-barcode",
                            size: "lg"
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["title", "value"])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              $options.isPermissionGranted("shippings") ? (openBlock(), createBlock(_component_CCol, {
                key: 1,
                sm: 12,
                lg: 4,
                class: "py-2"
              }, {
                default: withCtx(() => [
                  createVNode(_component_CWidgetStatsF, {
                    color: "primary",
                    title: `${_ctx.$t("barcode")}${_ctx.$t("scanner")}`,
                    value: `${_ctx.$t("goods")}${_ctx.$t("shippings.title")}`
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_CButton, {
                        class: "text-white",
                        size: "lg",
                        onClick: $options.shipping
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CIcon, {
                            name: "cil-barcode",
                            size: "lg"
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["title", "value"])
                ]),
                _: 1
              })) : createCommentVNode("", true),
              $options.isPermissionGranted("stocktakes") ? (openBlock(), createBlock(_component_CCol, {
                key: 2,
                sm: 12,
                lg: 4,
                class: "py-2"
              }, {
                default: withCtx(() => [
                  createVNode(_component_CWidgetStatsF, {
                    color: "info",
                    title: `${_ctx.$t("barcode")}${_ctx.$t("scanner")}`,
                    value: `${_ctx.$t("stocktake")}`
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_CButton, {
                        class: "text-white",
                        size: "lg",
                        onClick: $options.stocktake
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CIcon, {
                            name: "cil-barcode",
                            size: "lg"
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["title", "value"])
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createVNode(_component_CRow, { class: "py-2" }, {
            default: withCtx(() => [
              createVNode(_component_CCol, null, {
                default: withCtx(() => [
                  $options.isPermissionGranted("goods") && $options.isPermissionGranted("shipping") ? (openBlock(), createBlock(_component_ShippingPurchaseQuickSearch, { key: 0 })) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_CRow, { class: "py-2" }, {
            default: withCtx(() => [
              createVNode(_component_CCol, null, {
                default: withCtx(() => [
                  _ctx.$store.getters.isAdmin ? (openBlock(), createBlock(_component_DashboardSummaryLineChart, { key: 0 })) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          _ctx.$store.getters.isAdmin ? (openBlock(), createBlock("div", { key: 0 }, [
            createVNode(_component_DutyCalendar)
          ])) : (openBlock(), createBlock("div", { key: 1 }, [
            createVNode(_component_DutyCalendar, {
              userId: _ctx.$store.getters.authUser.id
            }, null, 8, ["userId"])
          ])),
          createVNode(_component_ExchangeRate),
          _ctx.$store.getters.isAdmin ? (openBlock(), createBlock(_component_CRow, {
            key: 2,
            class: "py-2"
          }, {
            default: withCtx(() => [
              createVNode(_component_CCol, null, {
                default: withCtx(() => [
                  createVNode(_component_CCard, null, {
                    default: withCtx(() => [
                      createVNode(_component_CCardBody, null, {
                        default: withCtx(() => [
                          createVNode(_component_CRow, null, {
                            default: withCtx(() => [
                              createVNode(_component_CCol, {
                                sm: 12,
                                lg: 6
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_CRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_CCol, { sm: 12 }, {
                                        default: withCtx(() => [
                                          createVNode(_component_CCallout, { color: "warning" }, {
                                            default: withCtx(() => [
                                              createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("stock")), 1),
                                              createVNode("br"),
                                              createVNode("strong", { class: "h4" }, toDisplayString($options.totalStock), 1)
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
                              }),
                              createVNode(_component_CCol, {
                                sm: 12,
                                lg: 6
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_CRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_CCol, { sm: 12 }, {
                                        default: withCtx(() => [
                                          createVNode(_component_CCallout, { color: "danger" }, {
                                            default: withCtx(() => [
                                              createVNode("small", { class: "text-muted" }, toDisplayString(_ctx.$t("goods")), 1),
                                              createVNode("br"),
                                              createVNode("strong", { class: "h4" }, toDisplayString($options.totalGoodsItem), 1)
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
                          }),
                          createVNode("br"),
                          createVNode(_component_PurchaseTable)
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
          })) : createCommentVNode("", true)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/dashboard/Dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  Dashboard as default
};
//# sourceMappingURL=Dashboard-Df9Kl7_x.mjs.map
