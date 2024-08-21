import { mapState } from "vuex";
import { CChartLine } from "@coreui/vue-chartjs";
import { resolveComponent, mergeProps, withCtx, createVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs } from "vue/server-renderer";
import { _ as _export_sfc } from "../app.mjs";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
import { VDataTable } from "vuetify/lib/components/VDataTable/index.mjs";
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
const _sfc_main$3 = {
  name: "SalesReportLineChart",
  components: {
    CChartLine
  },
  computed: {
    ...mapState(["sales-reports/chart"]),
    data() {
      return JSON.parse(JSON.stringify(this["sales-reports/chart"].data));
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
          xAxes: [
            {
              gridLines: {
                drawOnChartArea: false
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: (value, index, values) => {
                  return `${Number(
                    value
                  ).abbreviateAmount()}`;
                }
              }
            }
          ]
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
      if (self.loading) {
        return;
      }
      let data = {};
      self.loading = true;
      this.$store.dispatch("sales-reports/chart/get", data).then((response) => {
        console.log(response);
        self.loading = false;
      }).catch((error) => {
        console.log(error);
        self.loading = false;
      });
    }
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_CChartLine = resolveComponent("CChartLine");
  _push(ssrRenderComponent(_component_CCard, mergeProps({ class: "mb-4" }, _attrs), {
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
              _push3(ssrRenderComponent(_component_CRow, null, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<h4 class="card-title mb-0"${_scopeId4}>${ssrInterpolate(_ctx.$t("sales-report"))}</h4><div class="small text-medium-emphasis"${_scopeId4}></div>`);
                        } else {
                          return [
                            createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("sales-report")), 1),
                            createVNode("div", { class: "small text-medium-emphasis" })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, { class: "text-right" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CButton, {
                            color: "primary",
                            size: "sm",
                            onClick: $options.fetch,
                            disabled: $data.loading
                          }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CIcon, {
                                  name: "cil-reload",
                                  size: "sm"
                                }, null, _parent6, _scopeId5));
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
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CButton, {
                              color: "primary",
                              size: "sm",
                              onClick: $options.fetch,
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
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, null, {
                        default: withCtx(() => [
                          createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("sales-report")), 1),
                          createVNode("div", { class: "small text-medium-emphasis" })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, { class: "text-right" }, {
                        default: withCtx(() => [
                          createVNode(_component_CButton, {
                            color: "primary",
                            size: "sm",
                            onClick: $options.fetch,
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
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CChartLine, {
                style: { "height": "320px", "max-height": "320px", "margin-top": "40px" },
                wrapper: false,
                options: $data.options,
                data: $options.data
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, null, {
                      default: withCtx(() => [
                        createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("sales-report")), 1),
                        createVNode("div", { class: "small text-medium-emphasis" })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, { class: "text-right" }, {
                      default: withCtx(() => [
                        createVNode(_component_CButton, {
                          color: "primary",
                          size: "sm",
                          onClick: $options.fetch,
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
                }),
                createVNode(_component_CChartLine, {
                  style: { "height": "320px", "max-height": "320px", "margin-top": "40px" },
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
              createVNode(_component_CRow, null, {
                default: withCtx(() => [
                  createVNode(_component_CCol, null, {
                    default: withCtx(() => [
                      createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("sales-report")), 1),
                      createVNode("div", { class: "small text-medium-emphasis" })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CCol, { class: "text-right" }, {
                    default: withCtx(() => [
                      createVNode(_component_CButton, {
                        color: "primary",
                        size: "sm",
                        onClick: $options.fetch,
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
              }),
              createVNode(_component_CChartLine, {
                style: { "height": "320px", "max-height": "320px", "margin-top": "40px" },
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
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/sales-reports/components/SalesReportLineChart.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const SalesReportLineChart = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$2 = {
  name: "TopSalesTable",
  computed: {
    ...mapState(["sales-reports/top-sales"]),
    items() {
      return this["sales-reports/top-sales"].data;
    }
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
      headers: [
        { title: this.$t("name"), value: "name", sortable: false },
        { title: this.$t("type"), value: "type", sortable: false },
        { title: this.$t("cup"), value: "cup", sortable: false },
        { title: this.$t("color"), value: "color", sortable: false },
        { title: this.$t("size"), value: "size", sortable: false },
        {
          title: this.$t("unit"),
          value: "unit",
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
      this.$store.dispatch("sales-reports/top-sales/get", data).then((response) => {
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
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCol, {
          md: "9",
          sm: "9"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CCol, {
          md: "3",
          sm: "3",
          class: "text-right"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CButton, {
                color: "primary",
                size: "sm",
                onClick: $options.reload,
                disabled: $data.loading
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CIcon, {
                      name: "cil-reload",
                      size: "sm"
                    }, null, _parent4, _scopeId3));
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
              }, _parent3, _scopeId2));
            } else {
              return [
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
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CCol, {
            md: "9",
            sm: "9"
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
  }, _parent));
  _push(ssrRenderComponent(VDataTable, {
    headers: $data.headers,
    items: $data.items,
    "items-length": $data.serverItemsLength,
    search: $data.search,
    loading: $data.loading,
    "onUpdate:options": $options.fetch,
    mobile: $data.mobile,
    "hide-default-footer": true
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/sales-reports/components/TopSalesTable.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const TopSalesTable = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = {
  name: "TopStocksTable",
  computed: {
    ...mapState(["sales-reports/top-stocks"]),
    items() {
      return this["sales-reports/top-stocks"].data;
    }
  },
  data() {
    return {
      loading: false,
      options: {},
      headers: [
        { title: this.$t("name"), value: "name", sortable: false },
        { title: this.$t("type"), value: "type", sortable: false },
        { title: this.$t("cup"), value: "cup", sortable: false },
        { title: this.$t("color"), value: "color", sortable: false },
        { title: this.$t("size"), value: "size", sortable: false },
        {
          title: this.$t("unit"),
          value: "unit",
          sortable: false
        }
      ]
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
      self.options;
      let data = {};
      this.$store.dispatch("sales-reports/top-stocks/get", data).then((response) => {
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
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCol, {
          md: "9",
          sm: "9"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CCol, {
          md: "3",
          sm: "3",
          class: "text-right"
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CButton, {
                color: "primary",
                size: "sm",
                onClick: $options.reload,
                disabled: $data.loading
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CIcon, {
                      name: "cil-reload",
                      size: "sm"
                    }, null, _parent4, _scopeId3));
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
              }, _parent3, _scopeId2));
            } else {
              return [
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
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CCol, {
            md: "9",
            sm: "9"
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
  }, _parent));
  _push(ssrRenderComponent(VDataTable, {
    class: "my-2 elevation-1",
    headers: $data.headers,
    items: $options.items,
    loading: $data.loading,
    "onUpdate:options": $options.fetch,
    mobile: _ctx.mobile,
    "hide-default-footer": true
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/sales-reports/components/TopStocksTable.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TopStocksTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const _sfc_main = {
  name: "SalesReports",
  components: {
    SalesReportLineChart,
    TopSalesTable,
    TopStocksTable
  },
  computed: {
    ...mapState(["sales-reports"]),
    data() {
      return JSON.parse(JSON.stringify(this["sales-reports"].data));
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
      let data = {};
      self.loading = true;
      this.$store.dispatch("sales-reports/get", data).then((response) => {
        self.loading = false;
      }).catch((error) => {
        self.loading = false;
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CContainer = resolveComponent("CContainer");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CWidgetStatsF = resolveComponent("CWidgetStatsF");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_SalesReportLineChart = resolveComponent("SalesReportLineChart");
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_TopSalesTable = resolveComponent("TopSalesTable");
  const _component_TopStocksTable = resolveComponent("TopStocksTable");
  _push(ssrRenderComponent(_component_CContainer, mergeProps({ lg: "" }, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CRow, { class: "py-2" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CCol, {
                class: "py-2",
                col: 12,
                sm: 6,
                lg: 6
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CWidgetStatsF, {
                      color: "primary",
                      title: `${_ctx.$t("last-some-days", { days: "30" })}${_ctx.$t(
                        "stock"
                      )}${_ctx.$t("price.cost")}`,
                      value: $options.data.last_30days_stock_cost
                    }, {
                      icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CIcon, {
                            icon: "cib-server-fault",
                            size: "xl"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CIcon, {
                              icon: "cib-server-fault",
                              size: "xl"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CWidgetStatsF, {
                        color: "primary",
                        title: `${_ctx.$t("last-some-days", { days: "30" })}${_ctx.$t(
                          "stock"
                        )}${_ctx.$t("price.cost")}`,
                        value: $options.data.last_30days_stock_cost
                      }, {
                        icon: withCtx(() => [
                          createVNode(_component_CIcon, {
                            icon: "cib-server-fault",
                            size: "xl"
                          })
                        ]),
                        _: 1
                      }, 8, ["title", "value"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CCol, {
                class: "py-2",
                col: 12,
                sm: 6,
                lg: 6
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CWidgetStatsF, {
                      color: "primary",
                      title: `${_ctx.$t("last-some-days", { days: "30" })}${_ctx.$t(
                        "shippings.title"
                      )}${_ctx.$t("price.cost")}`,
                      value: $options.data.last_30days_shipping_costs
                    }, {
                      icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CIcon, {
                            icon: "cib-server-fault",
                            size: "xl"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CIcon, {
                              icon: "cib-server-fault",
                              size: "xl"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CWidgetStatsF, {
                        color: "primary",
                        title: `${_ctx.$t("last-some-days", { days: "30" })}${_ctx.$t(
                          "shippings.title"
                        )}${_ctx.$t("price.cost")}`,
                        value: $options.data.last_30days_shipping_costs
                      }, {
                        icon: withCtx(() => [
                          createVNode(_component_CIcon, {
                            icon: "cib-server-fault",
                            size: "xl"
                          })
                        ]),
                        _: 1
                      }, 8, ["title", "value"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CCol, {
                  class: "py-2",
                  col: 12,
                  sm: 6,
                  lg: 6
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CWidgetStatsF, {
                      color: "primary",
                      title: `${_ctx.$t("last-some-days", { days: "30" })}${_ctx.$t(
                        "stock"
                      )}${_ctx.$t("price.cost")}`,
                      value: $options.data.last_30days_stock_cost
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_CIcon, {
                          icon: "cib-server-fault",
                          size: "xl"
                        })
                      ]),
                      _: 1
                    }, 8, ["title", "value"])
                  ]),
                  _: 1
                }),
                createVNode(_component_CCol, {
                  class: "py-2",
                  col: 12,
                  sm: 6,
                  lg: 6
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CWidgetStatsF, {
                      color: "primary",
                      title: `${_ctx.$t("last-some-days", { days: "30" })}${_ctx.$t(
                        "shippings.title"
                      )}${_ctx.$t("price.cost")}`,
                      value: $options.data.last_30days_shipping_costs
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_CIcon, {
                          icon: "cib-server-fault",
                          size: "xl"
                        })
                      ]),
                      _: 1
                    }, 8, ["title", "value"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CRow, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CCol, { md: "12" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_SalesReportLineChart, null, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_SalesReportLineChart)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CCol, { md: "12" }, {
                  default: withCtx(() => [
                    createVNode(_component_SalesReportLineChart)
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
              _push3(ssrRenderComponent(_component_CCol, {
                class: "py-2",
                col: 12,
                sm: 6,
                lg: 3
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CWidgetStatsF, {
                      color: "primary",
                      title: `${_ctx.$t("last-three-months")}${_ctx.$t(
                        "average-inventory"
                      )}${_ctx.$t("price.cost")}`,
                      value: $options.data.average_inventory
                    }, {
                      icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CIcon, {
                            icon: "cil-chart-line",
                            size: "xl"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CIcon, {
                              icon: "cil-chart-line",
                              size: "xl"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CWidgetStatsF, {
                        color: "primary",
                        title: `${_ctx.$t("last-three-months")}${_ctx.$t(
                          "average-inventory"
                        )}${_ctx.$t("price.cost")}`,
                        value: $options.data.average_inventory
                      }, {
                        icon: withCtx(() => [
                          createVNode(_component_CIcon, {
                            icon: "cil-chart-line",
                            size: "xl"
                          })
                        ]),
                        _: 1
                      }, 8, ["title", "value"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CCol, {
                class: "py-2",
                col: 12,
                sm: 6,
                lg: 3
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CWidgetStatsF, {
                      color: "primary",
                      title: `${_ctx.$t("last-three-months")}${_ctx.$t(
                        "inventory-turnover"
                      )}${_ctx.$t("price.cost")}`,
                      value: $options.data.inventory_turnover
                    }, {
                      icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CIcon, {
                            icon: "cil-chart-line",
                            size: "xl"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CIcon, {
                              icon: "cil-chart-line",
                              size: "xl"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CWidgetStatsF, {
                        color: "primary",
                        title: `${_ctx.$t("last-three-months")}${_ctx.$t(
                          "inventory-turnover"
                        )}${_ctx.$t("price.cost")}`,
                        value: $options.data.inventory_turnover
                      }, {
                        icon: withCtx(() => [
                          createVNode(_component_CIcon, {
                            icon: "cil-chart-line",
                            size: "xl"
                          })
                        ]),
                        _: 1
                      }, 8, ["title", "value"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CCol, {
                class: "py-2",
                col: 12,
                sm: 6,
                lg: 3
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CWidgetStatsF, {
                      color: "primary",
                      title: `${_ctx.$t("price.cost")}${_ctx.$t("inventory-change")}`,
                      value: $options.data.inventory_change
                    }, {
                      icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CIcon, {
                            icon: "cil-chart-line",
                            size: "xl"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CIcon, {
                              icon: "cil-chart-line",
                              size: "xl"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CWidgetStatsF, {
                        color: "primary",
                        title: `${_ctx.$t("price.cost")}${_ctx.$t("inventory-change")}`,
                        value: $options.data.inventory_change
                      }, {
                        icon: withCtx(() => [
                          createVNode(_component_CIcon, {
                            icon: "cil-chart-line",
                            size: "xl"
                          })
                        ]),
                        _: 1
                      }, 8, ["title", "value"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CCol, {
                class: "py-2",
                col: 12,
                sm: 6,
                lg: 3
              }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CWidgetStatsF, {
                      color: "primary",
                      title: `${_ctx.$t("days-inventory-outstanding")}`,
                      value: $options.data.inventory_dio
                    }, {
                      icon: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CIcon, {
                            icon: "cil-chart-line",
                            size: "xl"
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CIcon, {
                              icon: "cil-chart-line",
                              size: "xl"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CWidgetStatsF, {
                        color: "primary",
                        title: `${_ctx.$t("days-inventory-outstanding")}`,
                        value: $options.data.inventory_dio
                      }, {
                        icon: withCtx(() => [
                          createVNode(_component_CIcon, {
                            icon: "cil-chart-line",
                            size: "xl"
                          })
                        ]),
                        _: 1
                      }, 8, ["title", "value"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CCol, {
                  class: "py-2",
                  col: 12,
                  sm: 6,
                  lg: 3
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CWidgetStatsF, {
                      color: "primary",
                      title: `${_ctx.$t("last-three-months")}${_ctx.$t(
                        "average-inventory"
                      )}${_ctx.$t("price.cost")}`,
                      value: $options.data.average_inventory
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_CIcon, {
                          icon: "cil-chart-line",
                          size: "xl"
                        })
                      ]),
                      _: 1
                    }, 8, ["title", "value"])
                  ]),
                  _: 1
                }),
                createVNode(_component_CCol, {
                  class: "py-2",
                  col: 12,
                  sm: 6,
                  lg: 3
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CWidgetStatsF, {
                      color: "primary",
                      title: `${_ctx.$t("last-three-months")}${_ctx.$t(
                        "inventory-turnover"
                      )}${_ctx.$t("price.cost")}`,
                      value: $options.data.inventory_turnover
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_CIcon, {
                          icon: "cil-chart-line",
                          size: "xl"
                        })
                      ]),
                      _: 1
                    }, 8, ["title", "value"])
                  ]),
                  _: 1
                }),
                createVNode(_component_CCol, {
                  class: "py-2",
                  col: 12,
                  sm: 6,
                  lg: 3
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CWidgetStatsF, {
                      color: "primary",
                      title: `${_ctx.$t("price.cost")}${_ctx.$t("inventory-change")}`,
                      value: $options.data.inventory_change
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_CIcon, {
                          icon: "cil-chart-line",
                          size: "xl"
                        })
                      ]),
                      _: 1
                    }, 8, ["title", "value"])
                  ]),
                  _: 1
                }),
                createVNode(_component_CCol, {
                  class: "py-2",
                  col: 12,
                  sm: 6,
                  lg: 3
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CWidgetStatsF, {
                      color: "primary",
                      title: `${_ctx.$t("days-inventory-outstanding")}`,
                      value: $options.data.inventory_dio
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_CIcon, {
                          icon: "cil-chart-line",
                          size: "xl"
                        })
                      ]),
                      _: 1
                    }, 8, ["title", "value"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CRow, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CCol, { md: "12" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCard, { class: "mb-4" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CCardBody, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CRow, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_CCol, { sm: "12" }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`<h4 class="card-title mb-0"${_scopeId7}>${ssrInterpolate(_ctx.$t("top-sales"))}</h4><div class="small text-medium-emphasis"${_scopeId7}></div>`);
                                          } else {
                                            return [
                                              createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("top-sales")), 1),
                                              createVNode("div", { class: "small text-medium-emphasis" })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_CCol, { sm: "12" }, {
                                          default: withCtx(() => [
                                            createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("top-sales")), 1),
                                            createVNode("div", { class: "small text-medium-emphasis" })
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_TopSalesTable, null, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_CRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_CCol, { sm: "12" }, {
                                        default: withCtx(() => [
                                          createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("top-sales")), 1),
                                          createVNode("div", { class: "small text-medium-emphasis" })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_TopSalesTable)
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
                                    createVNode(_component_CCol, { sm: "12" }, {
                                      default: withCtx(() => [
                                        createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("top-sales")), 1),
                                        createVNode("div", { class: "small text-medium-emphasis" })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_TopSalesTable)
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
                      createVNode(_component_CCard, { class: "mb-4" }, {
                        default: withCtx(() => [
                          createVNode(_component_CCardBody, null, {
                            default: withCtx(() => [
                              createVNode(_component_CRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CCol, { sm: "12" }, {
                                    default: withCtx(() => [
                                      createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("top-sales")), 1),
                                      createVNode("div", { class: "small text-medium-emphasis" })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_TopSalesTable)
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
                createVNode(_component_CCol, { md: "12" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCard, { class: "mb-4" }, {
                      default: withCtx(() => [
                        createVNode(_component_CCardBody, null, {
                          default: withCtx(() => [
                            createVNode(_component_CRow, null, {
                              default: withCtx(() => [
                                createVNode(_component_CCol, { sm: "12" }, {
                                  default: withCtx(() => [
                                    createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("top-sales")), 1),
                                    createVNode("div", { class: "small text-medium-emphasis" })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TopSalesTable)
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
        _push2(ssrRenderComponent(_component_CRow, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CCol, { md: "12" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCard, { class: "mb-4" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CCardBody, null, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CRow, null, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_CCol, { sm: "12" }, {
                                        default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                          if (_push8) {
                                            _push8(`<h4 class="card-title mb-0"${_scopeId7}>${ssrInterpolate(_ctx.$t("top-stocks"))}</h4><div class="small text-medium-emphasis"${_scopeId7}></div>`);
                                          } else {
                                            return [
                                              createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("top-stocks")), 1),
                                              createVNode("div", { class: "small text-medium-emphasis" })
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_CCol, { sm: "12" }, {
                                          default: withCtx(() => [
                                            createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("top-stocks")), 1),
                                            createVNode("div", { class: "small text-medium-emphasis" })
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_TopStocksTable, null, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_CRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_CCol, { sm: "12" }, {
                                        default: withCtx(() => [
                                          createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("top-stocks")), 1),
                                          createVNode("div", { class: "small text-medium-emphasis" })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_TopStocksTable)
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
                                    createVNode(_component_CCol, { sm: "12" }, {
                                      default: withCtx(() => [
                                        createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("top-stocks")), 1),
                                        createVNode("div", { class: "small text-medium-emphasis" })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_TopStocksTable)
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
                      createVNode(_component_CCard, { class: "mb-4" }, {
                        default: withCtx(() => [
                          createVNode(_component_CCardBody, null, {
                            default: withCtx(() => [
                              createVNode(_component_CRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CCol, { sm: "12" }, {
                                    default: withCtx(() => [
                                      createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("top-stocks")), 1),
                                      createVNode("div", { class: "small text-medium-emphasis" })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_TopStocksTable)
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
                createVNode(_component_CCol, { md: "12" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCard, { class: "mb-4" }, {
                      default: withCtx(() => [
                        createVNode(_component_CCardBody, null, {
                          default: withCtx(() => [
                            createVNode(_component_CRow, null, {
                              default: withCtx(() => [
                                createVNode(_component_CCol, { sm: "12" }, {
                                  default: withCtx(() => [
                                    createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("top-stocks")), 1),
                                    createVNode("div", { class: "small text-medium-emphasis" })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_TopStocksTable)
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
        return [
          createVNode(_component_CRow, { class: "py-2" }, {
            default: withCtx(() => [
              createVNode(_component_CCol, {
                class: "py-2",
                col: 12,
                sm: 6,
                lg: 6
              }, {
                default: withCtx(() => [
                  createVNode(_component_CWidgetStatsF, {
                    color: "primary",
                    title: `${_ctx.$t("last-some-days", { days: "30" })}${_ctx.$t(
                      "stock"
                    )}${_ctx.$t("price.cost")}`,
                    value: $options.data.last_30days_stock_cost
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_CIcon, {
                        icon: "cib-server-fault",
                        size: "xl"
                      })
                    ]),
                    _: 1
                  }, 8, ["title", "value"])
                ]),
                _: 1
              }),
              createVNode(_component_CCol, {
                class: "py-2",
                col: 12,
                sm: 6,
                lg: 6
              }, {
                default: withCtx(() => [
                  createVNode(_component_CWidgetStatsF, {
                    color: "primary",
                    title: `${_ctx.$t("last-some-days", { days: "30" })}${_ctx.$t(
                      "shippings.title"
                    )}${_ctx.$t("price.cost")}`,
                    value: $options.data.last_30days_shipping_costs
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_CIcon, {
                        icon: "cib-server-fault",
                        size: "xl"
                      })
                    ]),
                    _: 1
                  }, 8, ["title", "value"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_CRow, null, {
            default: withCtx(() => [
              createVNode(_component_CCol, { md: "12" }, {
                default: withCtx(() => [
                  createVNode(_component_SalesReportLineChart)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_CRow, { class: "py-2" }, {
            default: withCtx(() => [
              createVNode(_component_CCol, {
                class: "py-2",
                col: 12,
                sm: 6,
                lg: 3
              }, {
                default: withCtx(() => [
                  createVNode(_component_CWidgetStatsF, {
                    color: "primary",
                    title: `${_ctx.$t("last-three-months")}${_ctx.$t(
                      "average-inventory"
                    )}${_ctx.$t("price.cost")}`,
                    value: $options.data.average_inventory
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_CIcon, {
                        icon: "cil-chart-line",
                        size: "xl"
                      })
                    ]),
                    _: 1
                  }, 8, ["title", "value"])
                ]),
                _: 1
              }),
              createVNode(_component_CCol, {
                class: "py-2",
                col: 12,
                sm: 6,
                lg: 3
              }, {
                default: withCtx(() => [
                  createVNode(_component_CWidgetStatsF, {
                    color: "primary",
                    title: `${_ctx.$t("last-three-months")}${_ctx.$t(
                      "inventory-turnover"
                    )}${_ctx.$t("price.cost")}`,
                    value: $options.data.inventory_turnover
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_CIcon, {
                        icon: "cil-chart-line",
                        size: "xl"
                      })
                    ]),
                    _: 1
                  }, 8, ["title", "value"])
                ]),
                _: 1
              }),
              createVNode(_component_CCol, {
                class: "py-2",
                col: 12,
                sm: 6,
                lg: 3
              }, {
                default: withCtx(() => [
                  createVNode(_component_CWidgetStatsF, {
                    color: "primary",
                    title: `${_ctx.$t("price.cost")}${_ctx.$t("inventory-change")}`,
                    value: $options.data.inventory_change
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_CIcon, {
                        icon: "cil-chart-line",
                        size: "xl"
                      })
                    ]),
                    _: 1
                  }, 8, ["title", "value"])
                ]),
                _: 1
              }),
              createVNode(_component_CCol, {
                class: "py-2",
                col: 12,
                sm: 6,
                lg: 3
              }, {
                default: withCtx(() => [
                  createVNode(_component_CWidgetStatsF, {
                    color: "primary",
                    title: `${_ctx.$t("days-inventory-outstanding")}`,
                    value: $options.data.inventory_dio
                  }, {
                    icon: withCtx(() => [
                      createVNode(_component_CIcon, {
                        icon: "cil-chart-line",
                        size: "xl"
                      })
                    ]),
                    _: 1
                  }, 8, ["title", "value"])
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(_component_CRow, null, {
            default: withCtx(() => [
              createVNode(_component_CCol, { md: "12" }, {
                default: withCtx(() => [
                  createVNode(_component_CCard, { class: "mb-4" }, {
                    default: withCtx(() => [
                      createVNode(_component_CCardBody, null, {
                        default: withCtx(() => [
                          createVNode(_component_CRow, null, {
                            default: withCtx(() => [
                              createVNode(_component_CCol, { sm: "12" }, {
                                default: withCtx(() => [
                                  createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("top-sales")), 1),
                                  createVNode("div", { class: "small text-medium-emphasis" })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TopSalesTable)
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
          createVNode(_component_CRow, null, {
            default: withCtx(() => [
              createVNode(_component_CCol, { md: "12" }, {
                default: withCtx(() => [
                  createVNode(_component_CCard, { class: "mb-4" }, {
                    default: withCtx(() => [
                      createVNode(_component_CCardBody, null, {
                        default: withCtx(() => [
                          createVNode(_component_CRow, null, {
                            default: withCtx(() => [
                              createVNode(_component_CCol, { sm: "12" }, {
                                default: withCtx(() => [
                                  createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("top-stocks")), 1),
                                  createVNode("div", { class: "small text-medium-emphasis" })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_TopStocksTable)
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
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/sales-reports/SalesReports.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const SalesReports = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  SalesReports as default
};
