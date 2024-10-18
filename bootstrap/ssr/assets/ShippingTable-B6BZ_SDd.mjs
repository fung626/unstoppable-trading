import { _ as _export_sfc, a as Dialog } from "../app.mjs";
import { resolveComponent, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from "vue/server-renderer";
import { VDataTableServer } from "vuetify/lib/components/VDataTable/index.mjs";
import { VSkeletonLoader } from "vuetify/lib/components/VSkeletonLoader/index.mjs";
const _sfc_main = {
  name: "ShippingTable",
  props: {
    clientId: null
  },
  components: {
    Dialog
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
        {
          title: this.$t("number"),
          value: "generated_id"
        },
        {
          title: `${this.$t("client")}${this.$t("number")}`,
          value: "client_number"
        },
        {
          title: `${this.$t("client")}${this.$t("name")}`,
          value: "client_name"
        },
        {
          title: `${this.$t("client")}${this.$t("contact")}`,
          value: "client_contact"
        },
        {
          title: `${this.$t("client")}${this.$t("phone")}`,
          value: "formated_phone",
          sortable: false
        },
        {
          title: `${this.$t("client")}${this.$t("address")}`,
          value: "client_address"
        },
        {
          title: `${this.$t("total-unit")}`,
          value: "total_unit",
          sortable: false
        },
        {
          title: `${this.$t("subtotal")}`,
          value: "subtotal",
          sortable: false
        },
        {
          title: `${this.$t("shipping.total-gross-profit")}`,
          value: "total_gross_profit",
          sortable: false
        },
        {
          title: `${this.$t("status")}`,
          value: "status",
          sortable: false
        },
        { title: this.$t("updatedat"), value: "updated_at" },
        {
          title: `${this.$t("status")}${this.$t("actions")}`,
          value: "status_actions",
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
        client_id: self.$props.clientId,
        page,
        per_page: itemsPerPage,
        sort_by: sortBy,
        sort_desc: null,
        search
      };
      this.$store.dispatch("goods/shippings/get", data).then((response) => {
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
    add() {
      this.$router.push({ path: "shippings/create" });
    },
    download() {
      let self = this;
      self.loading = true;
      const { itemsPerPage, sortBy, sortDesc } = self.options;
      let data = {
        client_id: self.$props.clientId,
        per_page: itemsPerPage,
        sort_by: sortBy,
        sort_desc: sortDesc,
        search: self.searchText,
        extension: "pdf"
      };
      this.$store.dispatch("goods/shippings/export", data).then((response) => {
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
            this.$store.dispatch("goods/shippings/update", {
              id: item.id,
              status: action.status,
              type: "UPDATE"
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
      }
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Dialog = resolveComponent("Dialog");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CInputGroup = resolveComponent("CInputGroup");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_CFormInput = resolveComponent("CFormInput");
  const _component_CButtonGroup = resolveComponent("CButtonGroup");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-24813016>`);
  _push(ssrRenderComponent(_component_Dialog, { ref: "dialog" }, null, _parent));
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
                      onClick: $options.add
                    }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CIcon, {
                            name: "cil-plus",
                            size: "sm"
                          }, null, _parent5, _scopeId4));
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
                    }, _parent4, _scopeId3));
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
                        onClick: $options.add
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CIcon, {
                            name: "cil-plus",
                            size: "sm"
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
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
                      onClick: $options.add
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_CIcon, {
                          name: "cil-plus",
                          size: "sm"
                        })
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
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
                    onClick: $options.add
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CIcon, {
                        name: "cil-plus",
                        size: "sm"
                      })
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
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
    class: "elevation-1",
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
    [`item.status`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t(`shipping.status.${item.status}`))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t(`shipping.status.${item.status}`)), 1)
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/shippings/components/ShippingTable.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ShippingTable = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-24813016"]]);
export {
  ShippingTable as S
};
//# sourceMappingURL=ShippingTable-B6BZ_SDd.mjs.map
