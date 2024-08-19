import "@chenfengyuan/vue-barcode";
import "@chenfengyuan/vue-number-input";
import "@coreui/icons";
import "@coreui/icons-vue";
import "@coreui/vue";
import "@vee-validate/i18n";
import "@vee-validate/rules";
import "axios";
import "lodash";
import "moment";
import "query-string";
import "secure-ls";
import "simplebar-vue";
import "uuid";
import "vee-validate";
import {
    createBlock,
    createCommentVNode,
    createTextVNode,
    createVNode,
    Fragment,
    mergeProps,
    openBlock,
    renderList,
    resolveComponent,
    toDisplayString,
    toHandlers,
    useSSRContext,
    withCtx,
    withKeys,
} from "vue";
import "vue-barcode-reader";
import "vue-i18n";
import "vue-router";
import {
    ssrInterpolate,
    ssrRenderAttrs,
    ssrRenderComponent,
    ssrRenderList,
} from "vue/server-renderer";
import "vue3-popper";
import "vuetify";
import "vuetify/components";
import "vuetify/directives";
import "vuetify/labs/components";
import "vuetify/lib/components/VAutocomplete/index.mjs";
import "vuetify/lib/components/VBtn/index.mjs";
import "vuetify/lib/components/VCard/index.mjs";
import "vuetify/lib/components/VColorPicker/index.mjs";
import { VDataTable } from "vuetify/lib/components/VDataTable/index.mjs";
import "vuetify/lib/components/VDialog/index.mjs";
import "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VIcon/index.mjs";
import "vuetify/lib/components/VMenu/index.mjs";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
import "vuetify/lib/components/VSelect/index.mjs";
import "vuetify/lib/components/VSnackbar/index.mjs";
import "vuetify/lib/components/VTextField/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import { VTooltip } from "vuetify/lib/components/VTooltip/index.mjs";
import { mapState } from "vuex";
import "vuex-persistedstate";
import { _ as _export_sfc, D as Dialog, s as sizes } from "../app.mjs";
const _sfc_main$5 = {
    name: "CreateShippingDialog",
    data() {
        return {
            id: null,
            item: {},
            empty: 0,
            dialog: false,
            resolve: null,
            reject: null,
            title: null,
            errors: {},
            loading: false,
            goodsSizes: sizes,
        };
    },
    methods: {
        open(id, item) {
            this.title = `
            ${this.$t("shippings.title")}－${item.goods.name}－${item.color}`;
            this.dialog = true;
            this.id = id;
            this.item = item;
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        confirm() {
            let self = this;
            if (self.loading) {
                return;
            }
            let data = {
                id: self.id,
                item: self.item,
                type: "NEW",
            };
            self.loading = true;
            this.$store
                .dispatch("goods/shippings/update", data)
                .then((response) => {
                    self.loading = false;
                    self.resolve(true);
                    self.dialog = false;
                })
                .catch((error) => {
                    self.loading = false;
                    self.resolve(true);
                    self.dialog = false;
                });
            self.clear();
        },
        cancel() {
            this.resolve(false);
            this.dialog = false;
            this.clear();
        },
        clear() {
            this.item = {};
        },
    },
};
function _sfc_ssrRender$5(
    _ctx,
    _push,
    _parent,
    _attrs,
    $props,
    $setup,
    $data,
    $options
) {
    const _component_CModal = resolveComponent("CModal");
    const _component_CRow = resolveComponent("CRow");
    const _component_CCol = resolveComponent("CCol");
    const _component_vue_number_input = resolveComponent("vue-number-input");
    const _component_CButton = resolveComponent("CButton");
    _push(
        ssrRenderComponent(
            _component_CModal,
            mergeProps(
                {
                    visible: $data.dialog,
                    centered: true,
                    title: $data.title,
                },
                _attrs
            ),
            {
                footer: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                        _push2(
                            ssrRenderComponent(
                                _component_CButton,
                                {
                                    onClick: $options.confirm,
                                    color: "danger",
                                    class: "px-4",
                                },
                                {
                                    default: withCtx(
                                        (_2, _push3, _parent3, _scopeId2) => {
                                            if (_push3) {
                                                _push3(
                                                    `${ssrInterpolate(
                                                        _ctx.$t(
                                                            "button.confirm"
                                                        )
                                                    )}`
                                                );
                                            } else {
                                                return [
                                                    createTextVNode(
                                                        toDisplayString(
                                                            _ctx.$t(
                                                                "button.confirm"
                                                            )
                                                        ),
                                                        1
                                                    ),
                                                ];
                                            }
                                        }
                                    ),
                                    _: 1,
                                },
                                _parent2,
                                _scopeId
                            )
                        );
                        _push2(
                            ssrRenderComponent(
                                _component_CButton,
                                {
                                    onClick: $options.cancel,
                                    color: "secondary",
                                    class: "px-4 ml-2",
                                },
                                {
                                    default: withCtx(
                                        (_2, _push3, _parent3, _scopeId2) => {
                                            if (_push3) {
                                                _push3(
                                                    `${ssrInterpolate(
                                                        _ctx.$t("button.cancel")
                                                    )}`
                                                );
                                            } else {
                                                return [
                                                    createTextVNode(
                                                        toDisplayString(
                                                            _ctx.$t(
                                                                "button.cancel"
                                                            )
                                                        ),
                                                        1
                                                    ),
                                                ];
                                            }
                                        }
                                    ),
                                    _: 1,
                                },
                                _parent2,
                                _scopeId
                            )
                        );
                    } else {
                        return [
                            createVNode(
                                _component_CButton,
                                {
                                    onClick: $options.confirm,
                                    color: "danger",
                                    class: "px-4",
                                },
                                {
                                    default: withCtx(() => [
                                        createTextVNode(
                                            toDisplayString(
                                                _ctx.$t("button.confirm")
                                            ),
                                            1
                                        ),
                                    ]),
                                    _: 1,
                                },
                                8,
                                ["onClick"]
                            ),
                            createVNode(
                                _component_CButton,
                                {
                                    onClick: $options.cancel,
                                    color: "secondary",
                                    class: "px-4 ml-2",
                                },
                                {
                                    default: withCtx(() => [
                                        createTextVNode(
                                            toDisplayString(
                                                _ctx.$t("button.cancel")
                                            ),
                                            1
                                        ),
                                    ]),
                                    _: 1,
                                },
                                8,
                                ["onClick"]
                            ),
                        ];
                    }
                }),
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                        _push2(`<div class="mb-4"${_scopeId}>`);
                        _push2(
                            ssrRenderComponent(
                                VProgressLinear,
                                {
                                    active: $data.loading,
                                    indeterminate: "",
                                    color: "cyan",
                                },
                                null,
                                _parent2,
                                _scopeId
                            )
                        );
                        _push2(`</div><!--[-->`);
                        ssrRenderList($data.goodsSizes, (size) => {
                            _push2(`<div${_scopeId}>`);
                            _push2(
                                ssrRenderComponent(
                                    _component_CRow,
                                    null,
                                    {
                                        default: withCtx(
                                            (
                                                _2,
                                                _push3,
                                                _parent3,
                                                _scopeId2
                                            ) => {
                                                if (_push3) {
                                                    _push3(
                                                        ssrRenderComponent(
                                                            _component_CCol,
                                                            null,
                                                            {
                                                                default:
                                                                    withCtx(
                                                                        (
                                                                            _3,
                                                                            _push4,
                                                                            _parent4,
                                                                            _scopeId3
                                                                        ) => {
                                                                            if (
                                                                                _push4
                                                                            ) {
                                                                                _push4(
                                                                                    `<div class="d-flex justify-content-center"${_scopeId3}>${ssrInterpolate(
                                                                                        size.name
                                                                                    )}</div>`
                                                                                );
                                                                            } else {
                                                                                return [
                                                                                    createVNode(
                                                                                        "div",
                                                                                        {
                                                                                            class: "d-flex justify-content-center",
                                                                                        },
                                                                                        toDisplayString(
                                                                                            size.name
                                                                                        ),
                                                                                        1
                                                                                    ),
                                                                                ];
                                                                            }
                                                                        }
                                                                    ),
                                                                _: 2,
                                                            },
                                                            _parent3,
                                                            _scopeId2
                                                        )
                                                    );
                                                } else {
                                                    return [
                                                        createVNode(
                                                            _component_CCol,
                                                            null,
                                                            {
                                                                default:
                                                                    withCtx(
                                                                        () => [
                                                                            createVNode(
                                                                                "div",
                                                                                {
                                                                                    class: "d-flex justify-content-center",
                                                                                },
                                                                                toDisplayString(
                                                                                    size.name
                                                                                ),
                                                                                1
                                                                            ),
                                                                        ]
                                                                    ),
                                                                _: 2,
                                                            },
                                                            1024
                                                        ),
                                                    ];
                                                }
                                            }
                                        ),
                                        _: 2,
                                    },
                                    _parent2,
                                    _scopeId
                                )
                            );
                            _push2(
                                ssrRenderComponent(
                                    _component_CRow,
                                    null,
                                    {
                                        default: withCtx(
                                            (
                                                _2,
                                                _push3,
                                                _parent3,
                                                _scopeId2
                                            ) => {
                                                if (_push3) {
                                                    _push3(
                                                        ssrRenderComponent(
                                                            _component_CCol,
                                                            null,
                                                            {
                                                                default:
                                                                    withCtx(
                                                                        (
                                                                            _3,
                                                                            _push4,
                                                                            _parent4,
                                                                            _scopeId3
                                                                        ) => {
                                                                            if (
                                                                                _push4
                                                                            ) {
                                                                                _push4(
                                                                                    `<div class="d-flex justify-content-center"${_scopeId3}>`
                                                                                );
                                                                                if (
                                                                                    $data.item &&
                                                                                    $data
                                                                                        .item[
                                                                                        size
                                                                                            .name
                                                                                    ]
                                                                                ) {
                                                                                    _push4(
                                                                                        `<div${_scopeId3}>`
                                                                                    );
                                                                                    _push4(
                                                                                        ssrRenderComponent(
                                                                                            _component_vue_number_input,
                                                                                            {
                                                                                                size: "small",
                                                                                                modelValue:
                                                                                                    $data
                                                                                                        .item[
                                                                                                        size
                                                                                                            .name
                                                                                                    ]
                                                                                                        .unit,
                                                                                                "onUpdate:modelValue":
                                                                                                    (
                                                                                                        $event
                                                                                                    ) =>
                                                                                                        ($data.item[
                                                                                                            size.name
                                                                                                        ].unit =
                                                                                                            $event),
                                                                                                min: 0,
                                                                                                max: $data
                                                                                                    .item[
                                                                                                    size
                                                                                                        .name
                                                                                                ]
                                                                                                    ? $data
                                                                                                          .item[
                                                                                                          size
                                                                                                              .name
                                                                                                      ]
                                                                                                          .stock_unit
                                                                                                    : 0,
                                                                                                inline: "",
                                                                                                center: "",
                                                                                                controls:
                                                                                                    "",
                                                                                            },
                                                                                            null,
                                                                                            _parent4,
                                                                                            _scopeId3
                                                                                        )
                                                                                    );
                                                                                    _push4(
                                                                                        `</div>`
                                                                                    );
                                                                                } else {
                                                                                    _push4(
                                                                                        `<div${_scopeId3}>`
                                                                                    );
                                                                                    _push4(
                                                                                        ssrRenderComponent(
                                                                                            _component_vue_number_input,
                                                                                            {
                                                                                                size: "small",
                                                                                                modelValue:
                                                                                                    $data.empty,
                                                                                                "onUpdate:modelValue":
                                                                                                    (
                                                                                                        $event
                                                                                                    ) =>
                                                                                                        ($data.empty =
                                                                                                            $event),
                                                                                                min: 0,
                                                                                                max: 0,
                                                                                                inline: "",
                                                                                                center: "",
                                                                                                controls:
                                                                                                    "",
                                                                                            },
                                                                                            null,
                                                                                            _parent4,
                                                                                            _scopeId3
                                                                                        )
                                                                                    );
                                                                                    _push4(
                                                                                        `</div>`
                                                                                    );
                                                                                }
                                                                                _push4(
                                                                                    `</div>`
                                                                                );
                                                                            } else {
                                                                                return [
                                                                                    createVNode(
                                                                                        "div",
                                                                                        {
                                                                                            class: "d-flex justify-content-center",
                                                                                        },
                                                                                        [
                                                                                            $data.item &&
                                                                                            $data
                                                                                                .item[
                                                                                                size
                                                                                                    .name
                                                                                            ]
                                                                                                ? (openBlock(),
                                                                                                  createBlock(
                                                                                                      "div",
                                                                                                      {
                                                                                                          key: 0,
                                                                                                      },
                                                                                                      [
                                                                                                          createVNode(
                                                                                                              _component_vue_number_input,
                                                                                                              {
                                                                                                                  size: "small",
                                                                                                                  modelValue:
                                                                                                                      $data
                                                                                                                          .item[
                                                                                                                          size
                                                                                                                              .name
                                                                                                                      ]
                                                                                                                          .unit,
                                                                                                                  "onUpdate:modelValue":
                                                                                                                      (
                                                                                                                          $event
                                                                                                                      ) =>
                                                                                                                          ($data.item[
                                                                                                                              size.name
                                                                                                                          ].unit =
                                                                                                                              $event),
                                                                                                                  min: 0,
                                                                                                                  max: $data
                                                                                                                      .item[
                                                                                                                      size
                                                                                                                          .name
                                                                                                                  ]
                                                                                                                      ? $data
                                                                                                                            .item[
                                                                                                                            size
                                                                                                                                .name
                                                                                                                        ]
                                                                                                                            .stock_unit
                                                                                                                      : 0,
                                                                                                                  inline: "",
                                                                                                                  center: "",
                                                                                                                  controls:
                                                                                                                      "",
                                                                                                              },
                                                                                                              null,
                                                                                                              8,
                                                                                                              [
                                                                                                                  "modelValue",
                                                                                                                  "onUpdate:modelValue",
                                                                                                                  "max",
                                                                                                              ]
                                                                                                          ),
                                                                                                      ]
                                                                                                  ))
                                                                                                : (openBlock(),
                                                                                                  createBlock(
                                                                                                      "div",
                                                                                                      {
                                                                                                          key: 1,
                                                                                                      },
                                                                                                      [
                                                                                                          createVNode(
                                                                                                              _component_vue_number_input,
                                                                                                              {
                                                                                                                  size: "small",
                                                                                                                  modelValue:
                                                                                                                      $data.empty,
                                                                                                                  "onUpdate:modelValue":
                                                                                                                      (
                                                                                                                          $event
                                                                                                                      ) =>
                                                                                                                          ($data.empty =
                                                                                                                              $event),
                                                                                                                  min: 0,
                                                                                                                  max: 0,
                                                                                                                  inline: "",
                                                                                                                  center: "",
                                                                                                                  controls:
                                                                                                                      "",
                                                                                                              },
                                                                                                              null,
                                                                                                              8,
                                                                                                              [
                                                                                                                  "modelValue",
                                                                                                                  "onUpdate:modelValue",
                                                                                                              ]
                                                                                                          ),
                                                                                                      ]
                                                                                                  )),
                                                                                        ]
                                                                                    ),
                                                                                ];
                                                                            }
                                                                        }
                                                                    ),
                                                                _: 2,
                                                            },
                                                            _parent3,
                                                            _scopeId2
                                                        )
                                                    );
                                                } else {
                                                    return [
                                                        createVNode(
                                                            _component_CCol,
                                                            null,
                                                            {
                                                                default:
                                                                    withCtx(
                                                                        () => [
                                                                            createVNode(
                                                                                "div",
                                                                                {
                                                                                    class: "d-flex justify-content-center",
                                                                                },
                                                                                [
                                                                                    $data.item &&
                                                                                    $data
                                                                                        .item[
                                                                                        size
                                                                                            .name
                                                                                    ]
                                                                                        ? (openBlock(),
                                                                                          createBlock(
                                                                                              "div",
                                                                                              {
                                                                                                  key: 0,
                                                                                              },
                                                                                              [
                                                                                                  createVNode(
                                                                                                      _component_vue_number_input,
                                                                                                      {
                                                                                                          size: "small",
                                                                                                          modelValue:
                                                                                                              $data
                                                                                                                  .item[
                                                                                                                  size
                                                                                                                      .name
                                                                                                              ]
                                                                                                                  .unit,
                                                                                                          "onUpdate:modelValue":
                                                                                                              (
                                                                                                                  $event
                                                                                                              ) =>
                                                                                                                  ($data.item[
                                                                                                                      size.name
                                                                                                                  ].unit =
                                                                                                                      $event),
                                                                                                          min: 0,
                                                                                                          max: $data
                                                                                                              .item[
                                                                                                              size
                                                                                                                  .name
                                                                                                          ]
                                                                                                              ? $data
                                                                                                                    .item[
                                                                                                                    size
                                                                                                                        .name
                                                                                                                ]
                                                                                                                    .stock_unit
                                                                                                              : 0,
                                                                                                          inline: "",
                                                                                                          center: "",
                                                                                                          controls:
                                                                                                              "",
                                                                                                      },
                                                                                                      null,
                                                                                                      8,
                                                                                                      [
                                                                                                          "modelValue",
                                                                                                          "onUpdate:modelValue",
                                                                                                          "max",
                                                                                                      ]
                                                                                                  ),
                                                                                              ]
                                                                                          ))
                                                                                        : (openBlock(),
                                                                                          createBlock(
                                                                                              "div",
                                                                                              {
                                                                                                  key: 1,
                                                                                              },
                                                                                              [
                                                                                                  createVNode(
                                                                                                      _component_vue_number_input,
                                                                                                      {
                                                                                                          size: "small",
                                                                                                          modelValue:
                                                                                                              $data.empty,
                                                                                                          "onUpdate:modelValue":
                                                                                                              (
                                                                                                                  $event
                                                                                                              ) =>
                                                                                                                  ($data.empty =
                                                                                                                      $event),
                                                                                                          min: 0,
                                                                                                          max: 0,
                                                                                                          inline: "",
                                                                                                          center: "",
                                                                                                          controls:
                                                                                                              "",
                                                                                                      },
                                                                                                      null,
                                                                                                      8,
                                                                                                      [
                                                                                                          "modelValue",
                                                                                                          "onUpdate:modelValue",
                                                                                                      ]
                                                                                                  ),
                                                                                              ]
                                                                                          )),
                                                                                ]
                                                                            ),
                                                                        ]
                                                                    ),
                                                                _: 2,
                                                            },
                                                            1024
                                                        ),
                                                    ];
                                                }
                                            }
                                        ),
                                        _: 2,
                                    },
                                    _parent2,
                                    _scopeId
                                )
                            );
                            _push2(`</div>`);
                        });
                        _push2(`<!--]-->`);
                    } else {
                        return [
                            createVNode("div", { class: "mb-4" }, [
                                createVNode(
                                    VProgressLinear,
                                    {
                                        active: $data.loading,
                                        indeterminate: "",
                                        color: "cyan",
                                    },
                                    null,
                                    8,
                                    ["active"]
                                ),
                            ]),
                            (openBlock(true),
                            createBlock(
                                Fragment,
                                null,
                                renderList($data.goodsSizes, (size) => {
                                    return (
                                        openBlock(),
                                        createBlock(
                                            "div",
                                            {
                                                key: size.name,
                                            },
                                            [
                                                createVNode(
                                                    _component_CRow,
                                                    null,
                                                    {
                                                        default: withCtx(() => [
                                                            createVNode(
                                                                _component_CCol,
                                                                null,
                                                                {
                                                                    default:
                                                                        withCtx(
                                                                            () => [
                                                                                createVNode(
                                                                                    "div",
                                                                                    {
                                                                                        class: "d-flex justify-content-center",
                                                                                    },
                                                                                    toDisplayString(
                                                                                        size.name
                                                                                    ),
                                                                                    1
                                                                                ),
                                                                            ]
                                                                        ),
                                                                    _: 2,
                                                                },
                                                                1024
                                                            ),
                                                        ]),
                                                        _: 2,
                                                    },
                                                    1024
                                                ),
                                                createVNode(
                                                    _component_CRow,
                                                    null,
                                                    {
                                                        default: withCtx(() => [
                                                            createVNode(
                                                                _component_CCol,
                                                                null,
                                                                {
                                                                    default:
                                                                        withCtx(
                                                                            () => [
                                                                                createVNode(
                                                                                    "div",
                                                                                    {
                                                                                        class: "d-flex justify-content-center",
                                                                                    },
                                                                                    [
                                                                                        $data.item &&
                                                                                        $data
                                                                                            .item[
                                                                                            size
                                                                                                .name
                                                                                        ]
                                                                                            ? (openBlock(),
                                                                                              createBlock(
                                                                                                  "div",
                                                                                                  {
                                                                                                      key: 0,
                                                                                                  },
                                                                                                  [
                                                                                                      createVNode(
                                                                                                          _component_vue_number_input,
                                                                                                          {
                                                                                                              size: "small",
                                                                                                              modelValue:
                                                                                                                  $data
                                                                                                                      .item[
                                                                                                                      size
                                                                                                                          .name
                                                                                                                  ]
                                                                                                                      .unit,
                                                                                                              "onUpdate:modelValue":
                                                                                                                  (
                                                                                                                      $event
                                                                                                                  ) =>
                                                                                                                      ($data.item[
                                                                                                                          size.name
                                                                                                                      ].unit =
                                                                                                                          $event),
                                                                                                              min: 0,
                                                                                                              max: $data
                                                                                                                  .item[
                                                                                                                  size
                                                                                                                      .name
                                                                                                              ]
                                                                                                                  ? $data
                                                                                                                        .item[
                                                                                                                        size
                                                                                                                            .name
                                                                                                                    ]
                                                                                                                        .stock_unit
                                                                                                                  : 0,
                                                                                                              inline: "",
                                                                                                              center: "",
                                                                                                              controls:
                                                                                                                  "",
                                                                                                          },
                                                                                                          null,
                                                                                                          8,
                                                                                                          [
                                                                                                              "modelValue",
                                                                                                              "onUpdate:modelValue",
                                                                                                              "max",
                                                                                                          ]
                                                                                                      ),
                                                                                                  ]
                                                                                              ))
                                                                                            : (openBlock(),
                                                                                              createBlock(
                                                                                                  "div",
                                                                                                  {
                                                                                                      key: 1,
                                                                                                  },
                                                                                                  [
                                                                                                      createVNode(
                                                                                                          _component_vue_number_input,
                                                                                                          {
                                                                                                              size: "small",
                                                                                                              modelValue:
                                                                                                                  $data.empty,
                                                                                                              "onUpdate:modelValue":
                                                                                                                  (
                                                                                                                      $event
                                                                                                                  ) =>
                                                                                                                      ($data.empty =
                                                                                                                          $event),
                                                                                                              min: 0,
                                                                                                              max: 0,
                                                                                                              inline: "",
                                                                                                              center: "",
                                                                                                              controls:
                                                                                                                  "",
                                                                                                          },
                                                                                                          null,
                                                                                                          8,
                                                                                                          [
                                                                                                              "modelValue",
                                                                                                              "onUpdate:modelValue",
                                                                                                          ]
                                                                                                      ),
                                                                                                  ]
                                                                                              )),
                                                                                    ]
                                                                                ),
                                                                            ]
                                                                        ),
                                                                    _: 2,
                                                                },
                                                                1024
                                                            ),
                                                        ]),
                                                        _: 2,
                                                    },
                                                    1024
                                                ),
                                            ]
                                        )
                                    );
                                }),
                                128
                            )),
                        ];
                    }
                }),
                _: 1,
            },
            _parent
        )
    );
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (
        ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())
    ).add("resources/js/views/shippings/components/NewShippingItemDialog.vue");
    return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const NewShippingItemDialog = /* @__PURE__ */ _export_sfc(_sfc_main$5, [
    ["ssrRender", _sfc_ssrRender$5],
]);
const _sfc_main$4 = {
    name: "NewShippingItemTable",
    props: {
        goodsShipId: null,
    },
    components: {
        NewShippingItemDialog,
    },
    computed: {
        ...mapState(["goods/shippings/available-shippings-items"]),
        serverItemsLength() {
            var _a;
            return (_a =
                this["goods/shippings/available-shippings-items"].data) == null
                ? void 0
                : _a.total;
        },
        pageCount() {
            var _a;
            return (_a =
                this["goods/shippings/available-shippings-items"].data) == null
                ? void 0
                : _a.last_page;
        },
        page() {
            var _a;
            return (_a =
                this["goods/shippings/available-shippings-items"].data) == null
                ? void 0
                : _a.current_page;
        },
        items() {
            var _a;
            return (_a =
                this["goods/shippings/available-shippings-items"].data) == null
                ? void 0
                : _a.data;
        },
    },
    data() {
        return {
            searchText: null,
            loading: false,
            options: {},
            sortBy: "goods.name",
            sortDesc: false,
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { title: this.$t("name"), value: "goods.name" },
                { title: this.$t("type"), value: "goods.type" },
                { title: this.$t("cup"), value: "cup" },
                { title: this.$t("color"), value: "color" },
                { text: "32-S", value: "32-S", sortable: false },
                { text: "34-M", value: "34-M", sortable: false },
                { text: "36-L", value: "36-L", sortable: false },
                { text: "38-XL", value: "38-XL", sortable: false },
                { text: "40-Q", value: "40-Q", sortable: false },
                { text: "42-EQ", value: "42-EQ", sortable: false },
                { text: "44-Free", value: "44-Free", sortable: false },
                {
                    title: this.$t("total-unit"),
                    value: "total_unit",
                    sortable: false,
                },
                {
                    title: this.$t("actions"),
                    value: "actions",
                    sortable: false,
                },
            ],
        };
    },
    watch: {
        options: {
            handler() {
                this.fetch();
            },
        },
        loading() {
            this.disableItemsPerPage = this.loading;
            this.disablePagination = this.loading;
        },
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch(reset = false) {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            const { page, itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                goods_shipping_id: self.$props.goodsShipId,
                page: reset ? 1 : page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText,
            };
            this.$store
                .dispatch("goods/shippings/available-shippings-items/get", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        search() {
            this.fetch({ ...this.options });
        },
        reload() {
            this.fetch();
        },
        async click(item, action) {
            let self = this;
            let type = action.type;
            switch (type) {
                case "Dialog":
                    let _item = JSON.parse(JSON.stringify(item));
                    if (
                        await self.$refs.dialog.open(
                            self.$props.goodsShipId,
                            _item
                        )
                    ) {
                        this.fetch();
                    }
                    break;
            }
        },
    },
};
function _sfc_ssrRender$4(
    _ctx,
    _push,
    _parent,
    _attrs,
    $props,
    $setup,
    $data,
    $options
) {
    const _component_NewShippingItemDialog = resolveComponent(
        "NewShippingItemDialog"
    );
    const _component_CRow = resolveComponent("CRow");
    const _component_CCol = resolveComponent("CCol");
    const _component_CInput = resolveComponent("CInput");
    const _component_CButton = resolveComponent("CButton");
    const _component_CIcon = resolveComponent("CIcon");
    const _component_barcode = resolveComponent("barcode");
    const _component_CButtonGroup = resolveComponent("CButtonGroup");
    _push(`<div${ssrRenderAttrs(_attrs)}>`);
    _push(
        ssrRenderComponent(
            _component_NewShippingItemDialog,
            { ref: "dialog" },
            null,
            _parent
        )
    );
    _push(
        ssrRenderComponent(
            _component_CRow,
            { class: "p-2" },
            {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                        _push2(
                            ssrRenderComponent(
                                _component_CCol,
                                {
                                    md: "9",
                                    sm: "9",
                                },
                                {
                                    default: withCtx(
                                        (_2, _push3, _parent3, _scopeId2) => {
                                            if (_push3) {
                                                _push3(
                                                    ssrRenderComponent(
                                                        _component_CInput,
                                                        {
                                                            size: "sm",
                                                            modelValue:
                                                                $data.searchText,
                                                            "onUpdate:modelValue":
                                                                ($event) =>
                                                                    ($data.searchText =
                                                                        $event),
                                                            onKeyup:
                                                                $options.search,
                                                        },
                                                        {
                                                            prepend: withCtx(
                                                                (
                                                                    _3,
                                                                    _push4,
                                                                    _parent4,
                                                                    _scopeId3
                                                                ) => {
                                                                    if (
                                                                        _push4
                                                                    ) {
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CButton,
                                                                                {
                                                                                    color: "primary",
                                                                                    size: "sm",
                                                                                    onClick:
                                                                                        $options.search,
                                                                                    disabled:
                                                                                        $data.loading,
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            (
                                                                                                _4,
                                                                                                _push5,
                                                                                                _parent5,
                                                                                                _scopeId4
                                                                                            ) => {
                                                                                                if (
                                                                                                    _push5
                                                                                                ) {
                                                                                                    _push5(
                                                                                                        ssrRenderComponent(
                                                                                                            _component_CIcon,
                                                                                                            {
                                                                                                                name: "cil-magnifying-glass",
                                                                                                                size: "sm",
                                                                                                            },
                                                                                                            null,
                                                                                                            _parent5,
                                                                                                            _scopeId4
                                                                                                        )
                                                                                                    );
                                                                                                } else {
                                                                                                    return [
                                                                                                        createVNode(
                                                                                                            _component_CIcon,
                                                                                                            {
                                                                                                                name: "cil-magnifying-glass",
                                                                                                                size: "sm",
                                                                                                            }
                                                                                                        ),
                                                                                                    ];
                                                                                                }
                                                                                            }
                                                                                        ),
                                                                                    _: 1,
                                                                                },
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                    } else {
                                                                        return [
                                                                            createVNode(
                                                                                _component_CButton,
                                                                                {
                                                                                    color: "primary",
                                                                                    size: "sm",
                                                                                    onClick:
                                                                                        $options.search,
                                                                                    disabled:
                                                                                        $data.loading,
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            () => [
                                                                                                createVNode(
                                                                                                    _component_CIcon,
                                                                                                    {
                                                                                                        name: "cil-magnifying-glass",
                                                                                                        size: "sm",
                                                                                                    }
                                                                                                ),
                                                                                            ]
                                                                                        ),
                                                                                    _: 1,
                                                                                },
                                                                                8,
                                                                                [
                                                                                    "onClick",
                                                                                    "disabled",
                                                                                ]
                                                                            ),
                                                                        ];
                                                                    }
                                                                }
                                                            ),
                                                            _: 1,
                                                        },
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                            } else {
                                                return [
                                                    createVNode(
                                                        _component_CInput,
                                                        {
                                                            size: "sm",
                                                            modelValue:
                                                                $data.searchText,
                                                            "onUpdate:modelValue":
                                                                ($event) =>
                                                                    ($data.searchText =
                                                                        $event),
                                                            onKeyup: withKeys(
                                                                $options.search,
                                                                ["enter"]
                                                            ),
                                                        },
                                                        {
                                                            prepend: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CButton,
                                                                        {
                                                                            color: "primary",
                                                                            size: "sm",
                                                                            onClick:
                                                                                $options.search,
                                                                            disabled:
                                                                                $data.loading,
                                                                        },
                                                                        {
                                                                            default:
                                                                                withCtx(
                                                                                    () => [
                                                                                        createVNode(
                                                                                            _component_CIcon,
                                                                                            {
                                                                                                name: "cil-magnifying-glass",
                                                                                                size: "sm",
                                                                                            }
                                                                                        ),
                                                                                    ]
                                                                                ),
                                                                            _: 1,
                                                                        },
                                                                        8,
                                                                        [
                                                                            "onClick",
                                                                            "disabled",
                                                                        ]
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        },
                                                        8,
                                                        [
                                                            "modelValue",
                                                            "onUpdate:modelValue",
                                                            "onKeyup",
                                                        ]
                                                    ),
                                                ];
                                            }
                                        }
                                    ),
                                    _: 1,
                                },
                                _parent2,
                                _scopeId
                            )
                        );
                        _push2(
                            ssrRenderComponent(
                                _component_CCol,
                                {
                                    md: "3",
                                    sm: "3",
                                    class: "text-right",
                                },
                                {
                                    default: withCtx(
                                        (_2, _push3, _parent3, _scopeId2) => {
                                            if (_push3) {
                                                _push3(
                                                    ssrRenderComponent(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
                                                            onClick:
                                                                $options.reload,
                                                            disabled:
                                                                $data.loading,
                                                        },
                                                        {
                                                            default: withCtx(
                                                                (
                                                                    _3,
                                                                    _push4,
                                                                    _parent4,
                                                                    _scopeId3
                                                                ) => {
                                                                    if (
                                                                        _push4
                                                                    ) {
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CIcon,
                                                                                {
                                                                                    name: "cil-reload",
                                                                                    size: "sm",
                                                                                },
                                                                                null,
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                    } else {
                                                                        return [
                                                                            createVNode(
                                                                                _component_CIcon,
                                                                                {
                                                                                    name: "cil-reload",
                                                                                    size: "sm",
                                                                                }
                                                                            ),
                                                                        ];
                                                                    }
                                                                }
                                                            ),
                                                            _: 1,
                                                        },
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                            } else {
                                                return [
                                                    createVNode(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
                                                            onClick:
                                                                $options.reload,
                                                            disabled:
                                                                $data.loading,
                                                        },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CIcon,
                                                                        {
                                                                            name: "cil-reload",
                                                                            size: "sm",
                                                                        }
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        },
                                                        8,
                                                        ["onClick", "disabled"]
                                                    ),
                                                ];
                                            }
                                        }
                                    ),
                                    _: 1,
                                },
                                _parent2,
                                _scopeId
                            )
                        );
                    } else {
                        return [
                            createVNode(
                                _component_CCol,
                                {
                                    md: "9",
                                    sm: "9",
                                },
                                {
                                    default: withCtx(() => [
                                        createVNode(
                                            _component_CInput,
                                            {
                                                size: "sm",
                                                modelValue: $data.searchText,
                                                "onUpdate:modelValue": (
                                                    $event
                                                ) =>
                                                    ($data.searchText = $event),
                                                onKeyup: withKeys(
                                                    $options.search,
                                                    ["enter"]
                                                ),
                                            },
                                            {
                                                prepend: withCtx(() => [
                                                    createVNode(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
                                                            onClick:
                                                                $options.search,
                                                            disabled:
                                                                $data.loading,
                                                        },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CIcon,
                                                                        {
                                                                            name: "cil-magnifying-glass",
                                                                            size: "sm",
                                                                        }
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        },
                                                        8,
                                                        ["onClick", "disabled"]
                                                    ),
                                                ]),
                                                _: 1,
                                            },
                                            8,
                                            [
                                                "modelValue",
                                                "onUpdate:modelValue",
                                                "onKeyup",
                                            ]
                                        ),
                                    ]),
                                    _: 1,
                                }
                            ),
                            createVNode(
                                _component_CCol,
                                {
                                    md: "3",
                                    sm: "3",
                                    class: "text-right",
                                },
                                {
                                    default: withCtx(() => [
                                        createVNode(
                                            _component_CButton,
                                            {
                                                color: "primary",
                                                size: "sm",
                                                onClick: $options.reload,
                                                disabled: $data.loading,
                                            },
                                            {
                                                default: withCtx(() => [
                                                    createVNode(
                                                        _component_CIcon,
                                                        {
                                                            name: "cil-reload",
                                                            size: "sm",
                                                        }
                                                    ),
                                                ]),
                                                _: 1,
                                            },
                                            8,
                                            ["onClick", "disabled"]
                                        ),
                                    ]),
                                    _: 1,
                                }
                            ),
                        ];
                    }
                }),
                _: 1,
            },
            _parent
        )
    );
    _push(
        ssrRenderComponent(
            VDataTable,
            {
                class: "my-2 elevation-1",
                page: $options.page,
                pageCount: $options.pageCount,
                headers: $data.headers,
                items: $options.items,
                options: $data.options,
                "server-items-length": $options.serverItemsLength,
                loading: $data.loading,
                "sort-by": $data.sortBy,
                "sort-desc": $data.sortDesc,
                "footer-props": {
                    disableItemsPerPage: $data.disableItemsPerPage,
                    disablePagination: $data.disablePagination,
                    showFirstLastPage: true,
                    showCurrentPage: true,
                    itemsPerPageOptions: [10, 20, 50, 100],
                },
            },
            {
                [`item.32-S`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            if (item["32-S"]) {
                                _push2(`<div${_scopeId}>`);
                                _push2(
                                    ssrRenderComponent(
                                        VTooltip,
                                        { bottom: "" },
                                        {
                                            activator: withCtx(
                                                (
                                                    { on, attrs },
                                                    _push3,
                                                    _parent3,
                                                    _scopeId2
                                                ) => {
                                                    if (_push3) {
                                                        _push3(
                                                            `<span${ssrRenderAttrs(
                                                                attrs
                                                            )}${_scopeId2}>${ssrInterpolate(
                                                                item["32-S"]
                                                                    .stock_unit
                                                            )}</span>`
                                                        );
                                                    } else {
                                                        return [
                                                            createVNode(
                                                                "span",
                                                                mergeProps(
                                                                    attrs,
                                                                    toHandlers(
                                                                        on,
                                                                        true
                                                                    )
                                                                ),
                                                                toDisplayString(
                                                                    item["32-S"]
                                                                        .stock_unit
                                                                ),
                                                                17
                                                            ),
                                                        ];
                                                    }
                                                }
                                            ),
                                            default: withCtx(
                                                (
                                                    _,
                                                    _push3,
                                                    _parent3,
                                                    _scopeId2
                                                ) => {
                                                    if (_push3) {
                                                        _push3(
                                                            `<span${_scopeId2}>`
                                                        );
                                                        if (
                                                            item["32-S"].barcode
                                                        ) {
                                                            _push3(
                                                                ssrRenderComponent(
                                                                    _component_barcode,
                                                                    {
                                                                        value: item[
                                                                            "32-S"
                                                                        ]
                                                                            .barcode,
                                                                        options:
                                                                            {
                                                                                format: "CODE39",
                                                                                height: 32,
                                                                            },
                                                                    },
                                                                    null,
                                                                    _parent3,
                                                                    _scopeId2
                                                                )
                                                            );
                                                        } else {
                                                            _push3(`<!---->`);
                                                        }
                                                        _push3(`</span>`);
                                                    } else {
                                                        return [
                                                            createVNode(
                                                                "span",
                                                                null,
                                                                [
                                                                    item["32-S"]
                                                                        .barcode
                                                                        ? (openBlock(),
                                                                          createBlock(
                                                                              _component_barcode,
                                                                              {
                                                                                  key: 0,
                                                                                  value: item[
                                                                                      "32-S"
                                                                                  ]
                                                                                      .barcode,
                                                                                  options:
                                                                                      {
                                                                                          format: "CODE39",
                                                                                          height: 32,
                                                                                      },
                                                                              },
                                                                              null,
                                                                              8,
                                                                              [
                                                                                  "value",
                                                                              ]
                                                                          ))
                                                                        : createCommentVNode(
                                                                              "",
                                                                              true
                                                                          ),
                                                                ]
                                                            ),
                                                        ];
                                                    }
                                                }
                                            ),
                                            _: 2,
                                        },
                                        _parent2,
                                        _scopeId
                                    )
                                );
                                _push2(`</div>`);
                            } else {
                                _push2(`<div${_scopeId}>－</div>`);
                            }
                        } else {
                            return [
                                item["32-S"]
                                    ? (openBlock(),
                                      createBlock("div", { key: 0 }, [
                                          createVNode(
                                              VTooltip,
                                              { bottom: "" },
                                              {
                                                  activator: withCtx(
                                                      ({ on, attrs }) => [
                                                          createVNode(
                                                              "span",
                                                              mergeProps(
                                                                  attrs,
                                                                  toHandlers(
                                                                      on,
                                                                      true
                                                                  )
                                                              ),
                                                              toDisplayString(
                                                                  item["32-S"]
                                                                      .stock_unit
                                                              ),
                                                              17
                                                          ),
                                                      ]
                                                  ),
                                                  default: withCtx(() => [
                                                      createVNode(
                                                          "span",
                                                          null,
                                                          [
                                                              item["32-S"]
                                                                  .barcode
                                                                  ? (openBlock(),
                                                                    createBlock(
                                                                        _component_barcode,
                                                                        {
                                                                            key: 0,
                                                                            value: item[
                                                                                "32-S"
                                                                            ]
                                                                                .barcode,
                                                                            options:
                                                                                {
                                                                                    format: "CODE39",
                                                                                    height: 32,
                                                                                },
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            "value",
                                                                        ]
                                                                    ))
                                                                  : createCommentVNode(
                                                                        "",
                                                                        true
                                                                    ),
                                                          ]
                                                      ),
                                                  ]),
                                                  _: 2,
                                              },
                                              1024
                                          ),
                                      ]))
                                    : (openBlock(),
                                      createBlock("div", { key: 1 }, "－")),
                            ];
                        }
                    }
                ),
                [`item.34-M`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            if (item["34-M"]) {
                                _push2(`<div${_scopeId}>`);
                                _push2(
                                    ssrRenderComponent(
                                        VTooltip,
                                        { bottom: "" },
                                        {
                                            activator: withCtx(
                                                (
                                                    { on, attrs },
                                                    _push3,
                                                    _parent3,
                                                    _scopeId2
                                                ) => {
                                                    if (_push3) {
                                                        _push3(
                                                            `<span${ssrRenderAttrs(
                                                                attrs
                                                            )}${_scopeId2}>${ssrInterpolate(
                                                                item["34-M"]
                                                                    .stock_unit
                                                            )}</span>`
                                                        );
                                                    } else {
                                                        return [
                                                            createVNode(
                                                                "span",
                                                                mergeProps(
                                                                    attrs,
                                                                    toHandlers(
                                                                        on,
                                                                        true
                                                                    )
                                                                ),
                                                                toDisplayString(
                                                                    item["34-M"]
                                                                        .stock_unit
                                                                ),
                                                                17
                                                            ),
                                                        ];
                                                    }
                                                }
                                            ),
                                            default: withCtx(
                                                (
                                                    _,
                                                    _push3,
                                                    _parent3,
                                                    _scopeId2
                                                ) => {
                                                    if (_push3) {
                                                        _push3(
                                                            `<span${_scopeId2}>`
                                                        );
                                                        if (
                                                            item["34-M"].barcode
                                                        ) {
                                                            _push3(
                                                                ssrRenderComponent(
                                                                    _component_barcode,
                                                                    {
                                                                        value: item[
                                                                            "34-M"
                                                                        ]
                                                                            .barcode,
                                                                        options:
                                                                            {
                                                                                format: "CODE39",
                                                                                height: 32,
                                                                            },
                                                                    },
                                                                    null,
                                                                    _parent3,
                                                                    _scopeId2
                                                                )
                                                            );
                                                        } else {
                                                            _push3(`<!---->`);
                                                        }
                                                        _push3(`</span>`);
                                                    } else {
                                                        return [
                                                            createVNode(
                                                                "span",
                                                                null,
                                                                [
                                                                    item["34-M"]
                                                                        .barcode
                                                                        ? (openBlock(),
                                                                          createBlock(
                                                                              _component_barcode,
                                                                              {
                                                                                  key: 0,
                                                                                  value: item[
                                                                                      "34-M"
                                                                                  ]
                                                                                      .barcode,
                                                                                  options:
                                                                                      {
                                                                                          format: "CODE39",
                                                                                          height: 32,
                                                                                      },
                                                                              },
                                                                              null,
                                                                              8,
                                                                              [
                                                                                  "value",
                                                                              ]
                                                                          ))
                                                                        : createCommentVNode(
                                                                              "",
                                                                              true
                                                                          ),
                                                                ]
                                                            ),
                                                        ];
                                                    }
                                                }
                                            ),
                                            _: 2,
                                        },
                                        _parent2,
                                        _scopeId
                                    )
                                );
                                _push2(`</div>`);
                            } else {
                                _push2(`<div${_scopeId}>－</div>`);
                            }
                        } else {
                            return [
                                item["34-M"]
                                    ? (openBlock(),
                                      createBlock("div", { key: 0 }, [
                                          createVNode(
                                              VTooltip,
                                              { bottom: "" },
                                              {
                                                  activator: withCtx(
                                                      ({ on, attrs }) => [
                                                          createVNode(
                                                              "span",
                                                              mergeProps(
                                                                  attrs,
                                                                  toHandlers(
                                                                      on,
                                                                      true
                                                                  )
                                                              ),
                                                              toDisplayString(
                                                                  item["34-M"]
                                                                      .stock_unit
                                                              ),
                                                              17
                                                          ),
                                                      ]
                                                  ),
                                                  default: withCtx(() => [
                                                      createVNode(
                                                          "span",
                                                          null,
                                                          [
                                                              item["34-M"]
                                                                  .barcode
                                                                  ? (openBlock(),
                                                                    createBlock(
                                                                        _component_barcode,
                                                                        {
                                                                            key: 0,
                                                                            value: item[
                                                                                "34-M"
                                                                            ]
                                                                                .barcode,
                                                                            options:
                                                                                {
                                                                                    format: "CODE39",
                                                                                    height: 32,
                                                                                },
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            "value",
                                                                        ]
                                                                    ))
                                                                  : createCommentVNode(
                                                                        "",
                                                                        true
                                                                    ),
                                                          ]
                                                      ),
                                                  ]),
                                                  _: 2,
                                              },
                                              1024
                                          ),
                                      ]))
                                    : (openBlock(),
                                      createBlock("div", { key: 1 }, "－")),
                            ];
                        }
                    }
                ),
                [`item.36-L`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            if (item["36-L"]) {
                                _push2(`<div${_scopeId}>`);
                                _push2(
                                    ssrRenderComponent(
                                        VTooltip,
                                        { bottom: "" },
                                        {
                                            activator: withCtx(
                                                (
                                                    { on, attrs },
                                                    _push3,
                                                    _parent3,
                                                    _scopeId2
                                                ) => {
                                                    if (_push3) {
                                                        _push3(
                                                            `<span${ssrRenderAttrs(
                                                                attrs
                                                            )}${_scopeId2}>${ssrInterpolate(
                                                                item["36-L"]
                                                                    .stock_unit
                                                            )}</span>`
                                                        );
                                                    } else {
                                                        return [
                                                            createVNode(
                                                                "span",
                                                                mergeProps(
                                                                    attrs,
                                                                    toHandlers(
                                                                        on,
                                                                        true
                                                                    )
                                                                ),
                                                                toDisplayString(
                                                                    item["36-L"]
                                                                        .stock_unit
                                                                ),
                                                                17
                                                            ),
                                                        ];
                                                    }
                                                }
                                            ),
                                            default: withCtx(
                                                (
                                                    _,
                                                    _push3,
                                                    _parent3,
                                                    _scopeId2
                                                ) => {
                                                    if (_push3) {
                                                        _push3(
                                                            `<span${_scopeId2}>`
                                                        );
                                                        if (
                                                            item["36-L"].barcode
                                                        ) {
                                                            _push3(
                                                                ssrRenderComponent(
                                                                    _component_barcode,
                                                                    {
                                                                        value: item[
                                                                            "36-L"
                                                                        ]
                                                                            .barcode,
                                                                        options:
                                                                            {
                                                                                format: "CODE39",
                                                                                height: 32,
                                                                            },
                                                                    },
                                                                    null,
                                                                    _parent3,
                                                                    _scopeId2
                                                                )
                                                            );
                                                        } else {
                                                            _push3(`<!---->`);
                                                        }
                                                        _push3(`</span>`);
                                                    } else {
                                                        return [
                                                            createVNode(
                                                                "span",
                                                                null,
                                                                [
                                                                    item["36-L"]
                                                                        .barcode
                                                                        ? (openBlock(),
                                                                          createBlock(
                                                                              _component_barcode,
                                                                              {
                                                                                  key: 0,
                                                                                  value: item[
                                                                                      "36-L"
                                                                                  ]
                                                                                      .barcode,
                                                                                  options:
                                                                                      {
                                                                                          format: "CODE39",
                                                                                          height: 32,
                                                                                      },
                                                                              },
                                                                              null,
                                                                              8,
                                                                              [
                                                                                  "value",
                                                                              ]
                                                                          ))
                                                                        : createCommentVNode(
                                                                              "",
                                                                              true
                                                                          ),
                                                                ]
                                                            ),
                                                        ];
                                                    }
                                                }
                                            ),
                                            _: 2,
                                        },
                                        _parent2,
                                        _scopeId
                                    )
                                );
                                _push2(`</div>`);
                            } else {
                                _push2(`<div${_scopeId}>－</div>`);
                            }
                        } else {
                            return [
                                item["36-L"]
                                    ? (openBlock(),
                                      createBlock("div", { key: 0 }, [
                                          createVNode(
                                              VTooltip,
                                              { bottom: "" },
                                              {
                                                  activator: withCtx(
                                                      ({ on, attrs }) => [
                                                          createVNode(
                                                              "span",
                                                              mergeProps(
                                                                  attrs,
                                                                  toHandlers(
                                                                      on,
                                                                      true
                                                                  )
                                                              ),
                                                              toDisplayString(
                                                                  item["36-L"]
                                                                      .stock_unit
                                                              ),
                                                              17
                                                          ),
                                                      ]
                                                  ),
                                                  default: withCtx(() => [
                                                      createVNode(
                                                          "span",
                                                          null,
                                                          [
                                                              item["36-L"]
                                                                  .barcode
                                                                  ? (openBlock(),
                                                                    createBlock(
                                                                        _component_barcode,
                                                                        {
                                                                            key: 0,
                                                                            value: item[
                                                                                "36-L"
                                                                            ]
                                                                                .barcode,
                                                                            options:
                                                                                {
                                                                                    format: "CODE39",
                                                                                    height: 32,
                                                                                },
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            "value",
                                                                        ]
                                                                    ))
                                                                  : createCommentVNode(
                                                                        "",
                                                                        true
                                                                    ),
                                                          ]
                                                      ),
                                                  ]),
                                                  _: 2,
                                              },
                                              1024
                                          ),
                                      ]))
                                    : (openBlock(),
                                      createBlock("div", { key: 1 }, "－")),
                            ];
                        }
                    }
                ),
                [`item.38-XL`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            if (item["38-XL"]) {
                                _push2(`<div${_scopeId}>`);
                                _push2(
                                    ssrRenderComponent(
                                        VTooltip,
                                        { bottom: "" },
                                        {
                                            activator: withCtx(
                                                (
                                                    { on, attrs },
                                                    _push3,
                                                    _parent3,
                                                    _scopeId2
                                                ) => {
                                                    if (_push3) {
                                                        _push3(
                                                            `<span${ssrRenderAttrs(
                                                                attrs
                                                            )}${_scopeId2}>${ssrInterpolate(
                                                                item["38-XL"]
                                                                    .stock_unit
                                                            )}</span>`
                                                        );
                                                    } else {
                                                        return [
                                                            createVNode(
                                                                "span",
                                                                mergeProps(
                                                                    attrs,
                                                                    toHandlers(
                                                                        on,
                                                                        true
                                                                    )
                                                                ),
                                                                toDisplayString(
                                                                    item[
                                                                        "38-XL"
                                                                    ].stock_unit
                                                                ),
                                                                17
                                                            ),
                                                        ];
                                                    }
                                                }
                                            ),
                                            default: withCtx(
                                                (
                                                    _,
                                                    _push3,
                                                    _parent3,
                                                    _scopeId2
                                                ) => {
                                                    if (_push3) {
                                                        _push3(
                                                            `<span${_scopeId2}>`
                                                        );
                                                        if (
                                                            item["38-XL"]
                                                                .barcode
                                                        ) {
                                                            _push3(
                                                                ssrRenderComponent(
                                                                    _component_barcode,
                                                                    {
                                                                        value: item[
                                                                            "38-XL"
                                                                        ]
                                                                            .barcode,
                                                                        options:
                                                                            {
                                                                                format: "CODE39",
                                                                                height: 32,
                                                                            },
                                                                    },
                                                                    null,
                                                                    _parent3,
                                                                    _scopeId2
                                                                )
                                                            );
                                                        } else {
                                                            _push3(`<!---->`);
                                                        }
                                                        _push3(`</span>`);
                                                    } else {
                                                        return [
                                                            createVNode(
                                                                "span",
                                                                null,
                                                                [
                                                                    item[
                                                                        "38-XL"
                                                                    ].barcode
                                                                        ? (openBlock(),
                                                                          createBlock(
                                                                              _component_barcode,
                                                                              {
                                                                                  key: 0,
                                                                                  value: item[
                                                                                      "38-XL"
                                                                                  ]
                                                                                      .barcode,
                                                                                  options:
                                                                                      {
                                                                                          format: "CODE39",
                                                                                          height: 32,
                                                                                      },
                                                                              },
                                                                              null,
                                                                              8,
                                                                              [
                                                                                  "value",
                                                                              ]
                                                                          ))
                                                                        : createCommentVNode(
                                                                              "",
                                                                              true
                                                                          ),
                                                                ]
                                                            ),
                                                        ];
                                                    }
                                                }
                                            ),
                                            _: 2,
                                        },
                                        _parent2,
                                        _scopeId
                                    )
                                );
                                _push2(`</div>`);
                            } else {
                                _push2(`<div${_scopeId}>－</div>`);
                            }
                        } else {
                            return [
                                item["38-XL"]
                                    ? (openBlock(),
                                      createBlock("div", { key: 0 }, [
                                          createVNode(
                                              VTooltip,
                                              { bottom: "" },
                                              {
                                                  activator: withCtx(
                                                      ({ on, attrs }) => [
                                                          createVNode(
                                                              "span",
                                                              mergeProps(
                                                                  attrs,
                                                                  toHandlers(
                                                                      on,
                                                                      true
                                                                  )
                                                              ),
                                                              toDisplayString(
                                                                  item["38-XL"]
                                                                      .stock_unit
                                                              ),
                                                              17
                                                          ),
                                                      ]
                                                  ),
                                                  default: withCtx(() => [
                                                      createVNode(
                                                          "span",
                                                          null,
                                                          [
                                                              item["38-XL"]
                                                                  .barcode
                                                                  ? (openBlock(),
                                                                    createBlock(
                                                                        _component_barcode,
                                                                        {
                                                                            key: 0,
                                                                            value: item[
                                                                                "38-XL"
                                                                            ]
                                                                                .barcode,
                                                                            options:
                                                                                {
                                                                                    format: "CODE39",
                                                                                    height: 32,
                                                                                },
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            "value",
                                                                        ]
                                                                    ))
                                                                  : createCommentVNode(
                                                                        "",
                                                                        true
                                                                    ),
                                                          ]
                                                      ),
                                                  ]),
                                                  _: 2,
                                              },
                                              1024
                                          ),
                                      ]))
                                    : (openBlock(),
                                      createBlock("div", { key: 1 }, "－")),
                            ];
                        }
                    }
                ),
                [`item.40-Q`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            if (item["40-Q"]) {
                                _push2(`<div${_scopeId}>`);
                                _push2(
                                    ssrRenderComponent(
                                        VTooltip,
                                        { bottom: "" },
                                        {
                                            activator: withCtx(
                                                (
                                                    { on, attrs },
                                                    _push3,
                                                    _parent3,
                                                    _scopeId2
                                                ) => {
                                                    if (_push3) {
                                                        _push3(
                                                            `<span${ssrRenderAttrs(
                                                                attrs
                                                            )}${_scopeId2}>${ssrInterpolate(
                                                                item["40-Q"]
                                                                    .stock_unit
                                                            )}</span>`
                                                        );
                                                    } else {
                                                        return [
                                                            createVNode(
                                                                "span",
                                                                mergeProps(
                                                                    attrs,
                                                                    toHandlers(
                                                                        on,
                                                                        true
                                                                    )
                                                                ),
                                                                toDisplayString(
                                                                    item["40-Q"]
                                                                        .stock_unit
                                                                ),
                                                                17
                                                            ),
                                                        ];
                                                    }
                                                }
                                            ),
                                            default: withCtx(
                                                (
                                                    _,
                                                    _push3,
                                                    _parent3,
                                                    _scopeId2
                                                ) => {
                                                    if (_push3) {
                                                        _push3(
                                                            `<span${_scopeId2}>`
                                                        );
                                                        if (
                                                            item["40-Q"].barcode
                                                        ) {
                                                            _push3(
                                                                ssrRenderComponent(
                                                                    _component_barcode,
                                                                    {
                                                                        value: item[
                                                                            "40-Q"
                                                                        ]
                                                                            .barcode,
                                                                        options:
                                                                            {
                                                                                format: "CODE39",
                                                                                height: 32,
                                                                            },
                                                                    },
                                                                    null,
                                                                    _parent3,
                                                                    _scopeId2
                                                                )
                                                            );
                                                        } else {
                                                            _push3(`<!---->`);
                                                        }
                                                        _push3(`</span>`);
                                                    } else {
                                                        return [
                                                            createVNode(
                                                                "span",
                                                                null,
                                                                [
                                                                    item["40-Q"]
                                                                        .barcode
                                                                        ? (openBlock(),
                                                                          createBlock(
                                                                              _component_barcode,
                                                                              {
                                                                                  key: 0,
                                                                                  value: item[
                                                                                      "40-Q"
                                                                                  ]
                                                                                      .barcode,
                                                                                  options:
                                                                                      {
                                                                                          format: "CODE39",
                                                                                          height: 32,
                                                                                      },
                                                                              },
                                                                              null,
                                                                              8,
                                                                              [
                                                                                  "value",
                                                                              ]
                                                                          ))
                                                                        : createCommentVNode(
                                                                              "",
                                                                              true
                                                                          ),
                                                                ]
                                                            ),
                                                        ];
                                                    }
                                                }
                                            ),
                                            _: 2,
                                        },
                                        _parent2,
                                        _scopeId
                                    )
                                );
                                _push2(`</div>`);
                            } else {
                                _push2(`<div${_scopeId}>－</div>`);
                            }
                        } else {
                            return [
                                item["40-Q"]
                                    ? (openBlock(),
                                      createBlock("div", { key: 0 }, [
                                          createVNode(
                                              VTooltip,
                                              { bottom: "" },
                                              {
                                                  activator: withCtx(
                                                      ({ on, attrs }) => [
                                                          createVNode(
                                                              "span",
                                                              mergeProps(
                                                                  attrs,
                                                                  toHandlers(
                                                                      on,
                                                                      true
                                                                  )
                                                              ),
                                                              toDisplayString(
                                                                  item["40-Q"]
                                                                      .stock_unit
                                                              ),
                                                              17
                                                          ),
                                                      ]
                                                  ),
                                                  default: withCtx(() => [
                                                      createVNode(
                                                          "span",
                                                          null,
                                                          [
                                                              item["40-Q"]
                                                                  .barcode
                                                                  ? (openBlock(),
                                                                    createBlock(
                                                                        _component_barcode,
                                                                        {
                                                                            key: 0,
                                                                            value: item[
                                                                                "40-Q"
                                                                            ]
                                                                                .barcode,
                                                                            options:
                                                                                {
                                                                                    format: "CODE39",
                                                                                    height: 32,
                                                                                },
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            "value",
                                                                        ]
                                                                    ))
                                                                  : createCommentVNode(
                                                                        "",
                                                                        true
                                                                    ),
                                                          ]
                                                      ),
                                                  ]),
                                                  _: 2,
                                              },
                                              1024
                                          ),
                                      ]))
                                    : (openBlock(),
                                      createBlock("div", { key: 1 }, "－")),
                            ];
                        }
                    }
                ),
                [`item.42-EQ`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            if (item["42-EQ"]) {
                                _push2(`<div${_scopeId}>`);
                                _push2(
                                    ssrRenderComponent(
                                        VTooltip,
                                        { bottom: "" },
                                        {
                                            activator: withCtx(
                                                (
                                                    { on, attrs },
                                                    _push3,
                                                    _parent3,
                                                    _scopeId2
                                                ) => {
                                                    if (_push3) {
                                                        _push3(
                                                            `<span${ssrRenderAttrs(
                                                                attrs
                                                            )}${_scopeId2}>${ssrInterpolate(
                                                                item["42-EQ"]
                                                                    .stock_unit
                                                            )}</span>`
                                                        );
                                                    } else {
                                                        return [
                                                            createVNode(
                                                                "span",
                                                                mergeProps(
                                                                    attrs,
                                                                    toHandlers(
                                                                        on,
                                                                        true
                                                                    )
                                                                ),
                                                                toDisplayString(
                                                                    item[
                                                                        "42-EQ"
                                                                    ].stock_unit
                                                                ),
                                                                17
                                                            ),
                                                        ];
                                                    }
                                                }
                                            ),
                                            default: withCtx(
                                                (
                                                    _,
                                                    _push3,
                                                    _parent3,
                                                    _scopeId2
                                                ) => {
                                                    if (_push3) {
                                                        _push3(
                                                            `<span${_scopeId2}>`
                                                        );
                                                        if (
                                                            item["42-EQ"]
                                                                .barcode
                                                        ) {
                                                            _push3(
                                                                ssrRenderComponent(
                                                                    _component_barcode,
                                                                    {
                                                                        value: item[
                                                                            "42-EQ"
                                                                        ]
                                                                            .barcode,
                                                                        options:
                                                                            {
                                                                                format: "CODE39",
                                                                                height: 32,
                                                                            },
                                                                    },
                                                                    null,
                                                                    _parent3,
                                                                    _scopeId2
                                                                )
                                                            );
                                                        } else {
                                                            _push3(`<!---->`);
                                                        }
                                                        _push3(`</span>`);
                                                    } else {
                                                        return [
                                                            createVNode(
                                                                "span",
                                                                null,
                                                                [
                                                                    item[
                                                                        "42-EQ"
                                                                    ].barcode
                                                                        ? (openBlock(),
                                                                          createBlock(
                                                                              _component_barcode,
                                                                              {
                                                                                  key: 0,
                                                                                  value: item[
                                                                                      "42-EQ"
                                                                                  ]
                                                                                      .barcode,
                                                                                  options:
                                                                                      {
                                                                                          format: "CODE39",
                                                                                          height: 32,
                                                                                      },
                                                                              },
                                                                              null,
                                                                              8,
                                                                              [
                                                                                  "value",
                                                                              ]
                                                                          ))
                                                                        : createCommentVNode(
                                                                              "",
                                                                              true
                                                                          ),
                                                                ]
                                                            ),
                                                        ];
                                                    }
                                                }
                                            ),
                                            _: 2,
                                        },
                                        _parent2,
                                        _scopeId
                                    )
                                );
                                _push2(`</div>`);
                            } else {
                                _push2(`<div${_scopeId}>－</div>`);
                            }
                        } else {
                            return [
                                item["42-EQ"]
                                    ? (openBlock(),
                                      createBlock("div", { key: 0 }, [
                                          createVNode(
                                              VTooltip,
                                              { bottom: "" },
                                              {
                                                  activator: withCtx(
                                                      ({ on, attrs }) => [
                                                          createVNode(
                                                              "span",
                                                              mergeProps(
                                                                  attrs,
                                                                  toHandlers(
                                                                      on,
                                                                      true
                                                                  )
                                                              ),
                                                              toDisplayString(
                                                                  item["42-EQ"]
                                                                      .stock_unit
                                                              ),
                                                              17
                                                          ),
                                                      ]
                                                  ),
                                                  default: withCtx(() => [
                                                      createVNode(
                                                          "span",
                                                          null,
                                                          [
                                                              item["42-EQ"]
                                                                  .barcode
                                                                  ? (openBlock(),
                                                                    createBlock(
                                                                        _component_barcode,
                                                                        {
                                                                            key: 0,
                                                                            value: item[
                                                                                "42-EQ"
                                                                            ]
                                                                                .barcode,
                                                                            options:
                                                                                {
                                                                                    format: "CODE39",
                                                                                    height: 32,
                                                                                },
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            "value",
                                                                        ]
                                                                    ))
                                                                  : createCommentVNode(
                                                                        "",
                                                                        true
                                                                    ),
                                                          ]
                                                      ),
                                                  ]),
                                                  _: 2,
                                              },
                                              1024
                                          ),
                                      ]))
                                    : (openBlock(),
                                      createBlock("div", { key: 1 }, "－")),
                            ];
                        }
                    }
                ),
                [`item.44-Free`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            if (item["44-Free"]) {
                                _push2(`<div${_scopeId}>`);
                                _push2(
                                    ssrRenderComponent(
                                        VTooltip,
                                        { bottom: "" },
                                        {
                                            activator: withCtx(
                                                (
                                                    { on, attrs },
                                                    _push3,
                                                    _parent3,
                                                    _scopeId2
                                                ) => {
                                                    if (_push3) {
                                                        _push3(
                                                            `<span${ssrRenderAttrs(
                                                                attrs
                                                            )}${_scopeId2}>${ssrInterpolate(
                                                                item["44-Free"]
                                                                    .stock_unit
                                                            )}</span>`
                                                        );
                                                    } else {
                                                        return [
                                                            createVNode(
                                                                "span",
                                                                mergeProps(
                                                                    attrs,
                                                                    toHandlers(
                                                                        on,
                                                                        true
                                                                    )
                                                                ),
                                                                toDisplayString(
                                                                    item[
                                                                        "44-Free"
                                                                    ].stock_unit
                                                                ),
                                                                17
                                                            ),
                                                        ];
                                                    }
                                                }
                                            ),
                                            default: withCtx(
                                                (
                                                    _,
                                                    _push3,
                                                    _parent3,
                                                    _scopeId2
                                                ) => {
                                                    if (_push3) {
                                                        _push3(
                                                            `<span${_scopeId2}>`
                                                        );
                                                        if (
                                                            item["44-Free"]
                                                                .barcode
                                                        ) {
                                                            _push3(
                                                                ssrRenderComponent(
                                                                    _component_barcode,
                                                                    {
                                                                        value: item[
                                                                            "44-Free"
                                                                        ]
                                                                            .barcode,
                                                                        options:
                                                                            {
                                                                                format: "CODE39",
                                                                                height: 32,
                                                                            },
                                                                    },
                                                                    null,
                                                                    _parent3,
                                                                    _scopeId2
                                                                )
                                                            );
                                                        } else {
                                                            _push3(`<!---->`);
                                                        }
                                                        _push3(`</span>`);
                                                    } else {
                                                        return [
                                                            createVNode(
                                                                "span",
                                                                null,
                                                                [
                                                                    item[
                                                                        "44-Free"
                                                                    ].barcode
                                                                        ? (openBlock(),
                                                                          createBlock(
                                                                              _component_barcode,
                                                                              {
                                                                                  key: 0,
                                                                                  value: item[
                                                                                      "44-Free"
                                                                                  ]
                                                                                      .barcode,
                                                                                  options:
                                                                                      {
                                                                                          format: "CODE39",
                                                                                          height: 32,
                                                                                      },
                                                                              },
                                                                              null,
                                                                              8,
                                                                              [
                                                                                  "value",
                                                                              ]
                                                                          ))
                                                                        : createCommentVNode(
                                                                              "",
                                                                              true
                                                                          ),
                                                                ]
                                                            ),
                                                        ];
                                                    }
                                                }
                                            ),
                                            _: 2,
                                        },
                                        _parent2,
                                        _scopeId
                                    )
                                );
                                _push2(`</div>`);
                            } else {
                                _push2(`<div${_scopeId}>－</div>`);
                            }
                        } else {
                            return [
                                item["44-Free"]
                                    ? (openBlock(),
                                      createBlock("div", { key: 0 }, [
                                          createVNode(
                                              VTooltip,
                                              { bottom: "" },
                                              {
                                                  activator: withCtx(
                                                      ({ on, attrs }) => [
                                                          createVNode(
                                                              "span",
                                                              mergeProps(
                                                                  attrs,
                                                                  toHandlers(
                                                                      on,
                                                                      true
                                                                  )
                                                              ),
                                                              toDisplayString(
                                                                  item[
                                                                      "44-Free"
                                                                  ].stock_unit
                                                              ),
                                                              17
                                                          ),
                                                      ]
                                                  ),
                                                  default: withCtx(() => [
                                                      createVNode(
                                                          "span",
                                                          null,
                                                          [
                                                              item["44-Free"]
                                                                  .barcode
                                                                  ? (openBlock(),
                                                                    createBlock(
                                                                        _component_barcode,
                                                                        {
                                                                            key: 0,
                                                                            value: item[
                                                                                "44-Free"
                                                                            ]
                                                                                .barcode,
                                                                            options:
                                                                                {
                                                                                    format: "CODE39",
                                                                                    height: 32,
                                                                                },
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            "value",
                                                                        ]
                                                                    ))
                                                                  : createCommentVNode(
                                                                        "",
                                                                        true
                                                                    ),
                                                          ]
                                                      ),
                                                  ]),
                                                  _: 2,
                                              },
                                              1024
                                          ),
                                      ]))
                                    : (openBlock(),
                                      createBlock("div", { key: 1 }, "－")),
                            ];
                        }
                    }
                ),
                [`item.actions`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            _push2(
                                ssrRenderComponent(
                                    _component_CButtonGroup,
                                    null,
                                    {
                                        default: withCtx(
                                            (
                                                _,
                                                _push3,
                                                _parent3,
                                                _scopeId2
                                            ) => {
                                                if (_push3) {
                                                    _push3(`<!--[-->`);
                                                    ssrRenderList(
                                                        item.actions,
                                                        (action) => {
                                                            _push3(
                                                                ssrRenderComponent(
                                                                    _component_CButton,
                                                                    {
                                                                        key: action.key,
                                                                        color: action.color,
                                                                        disabled:
                                                                            action.disabled,
                                                                        size: "sm",
                                                                        onClick:
                                                                            (
                                                                                $event
                                                                            ) =>
                                                                                $options.click(
                                                                                    item,
                                                                                    action
                                                                                ),
                                                                    },
                                                                    {
                                                                        default:
                                                                            withCtx(
                                                                                (
                                                                                    _2,
                                                                                    _push4,
                                                                                    _parent4,
                                                                                    _scopeId3
                                                                                ) => {
                                                                                    if (
                                                                                        _push4
                                                                                    ) {
                                                                                        _push4(
                                                                                            `${ssrInterpolate(
                                                                                                action.title
                                                                                            )}`
                                                                                        );
                                                                                    } else {
                                                                                        return [
                                                                                            createTextVNode(
                                                                                                toDisplayString(
                                                                                                    action.title
                                                                                                ),
                                                                                                1
                                                                                            ),
                                                                                        ];
                                                                                    }
                                                                                }
                                                                            ),
                                                                        _: 2,
                                                                    },
                                                                    _parent3,
                                                                    _scopeId2
                                                                )
                                                            );
                                                        }
                                                    );
                                                    _push3(`<!--]-->`);
                                                } else {
                                                    return [
                                                        (openBlock(true),
                                                        createBlock(
                                                            Fragment,
                                                            null,
                                                            renderList(
                                                                item.actions,
                                                                (action) => {
                                                                    return (
                                                                        openBlock(),
                                                                        createBlock(
                                                                            _component_CButton,
                                                                            {
                                                                                key: action.key,
                                                                                color: action.color,
                                                                                disabled:
                                                                                    action.disabled,
                                                                                size: "sm",
                                                                                onClick:
                                                                                    (
                                                                                        $event
                                                                                    ) =>
                                                                                        $options.click(
                                                                                            item,
                                                                                            action
                                                                                        ),
                                                                            },
                                                                            {
                                                                                default:
                                                                                    withCtx(
                                                                                        () => [
                                                                                            createTextVNode(
                                                                                                toDisplayString(
                                                                                                    action.title
                                                                                                ),
                                                                                                1
                                                                                            ),
                                                                                        ]
                                                                                    ),
                                                                                _: 2,
                                                                            },
                                                                            1032,
                                                                            [
                                                                                "color",
                                                                                "disabled",
                                                                                "onClick",
                                                                            ]
                                                                        )
                                                                    );
                                                                }
                                                            ),
                                                            128
                                                        )),
                                                    ];
                                                }
                                            }
                                        ),
                                        _: 2,
                                    },
                                    _parent2,
                                    _scopeId
                                )
                            );
                        } else {
                            return [
                                createVNode(
                                    _component_CButtonGroup,
                                    null,
                                    {
                                        default: withCtx(() => [
                                            (openBlock(true),
                                            createBlock(
                                                Fragment,
                                                null,
                                                renderList(
                                                    item.actions,
                                                    (action) => {
                                                        return (
                                                            openBlock(),
                                                            createBlock(
                                                                _component_CButton,
                                                                {
                                                                    key: action.key,
                                                                    color: action.color,
                                                                    disabled:
                                                                        action.disabled,
                                                                    size: "sm",
                                                                    onClick: (
                                                                        $event
                                                                    ) =>
                                                                        $options.click(
                                                                            item,
                                                                            action
                                                                        ),
                                                                },
                                                                {
                                                                    default:
                                                                        withCtx(
                                                                            () => [
                                                                                createTextVNode(
                                                                                    toDisplayString(
                                                                                        action.title
                                                                                    ),
                                                                                    1
                                                                                ),
                                                                            ]
                                                                        ),
                                                                    _: 2,
                                                                },
                                                                1032,
                                                                [
                                                                    "color",
                                                                    "disabled",
                                                                    "onClick",
                                                                ]
                                                            )
                                                        );
                                                    }
                                                ),
                                                128
                                            )),
                                        ]),
                                        _: 2,
                                    },
                                    1024
                                ),
                            ];
                        }
                    }
                ),
                _: 2,
            },
            _parent
        )
    );
    _push(`</div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (
        ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())
    ).add("resources/js/views/shippings/components/NewShippingItemTable.vue");
    return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const NewShippingItemTable = /* @__PURE__ */ _export_sfc(_sfc_main$4, [
    ["ssrRender", _sfc_ssrRender$4],
]);
const _sfc_main$3 = {
    name: "ShippingAlterationTable",
    props: {
        goodsShipId: null,
    },
    data() {
        return {
            searchText: null,
            page: 1,
            serverItemsLength: 0,
            pageCount: 0,
            items: [],
            loading: false,
            options: {},
            sortBy: "updated_at",
            sortDesc: false,
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                {
                    text: `${this.$t("name")}`,
                    value: "item.goods.name",
                },
                {
                    text: `${this.$t("type")}`,
                    value: "item.goods.type",
                },
                {
                    text: `${this.$t("size")}`,
                    value: "item.size",
                },
                {
                    text: `${this.$t("color")}`,
                    value: "item.color",
                },
                {
                    text: `${this.$t("barcode")}`,
                    value: "item.barcode",
                },
                {
                    text: `${this.$t("unit")}`,
                    value: "unit",
                },
                {
                    text: `${this.$t("altered")}${this.$t("unit")}`,
                    value: "altered_unit",
                },
                {
                    text: `${this.$t("alteration")}${this.$t("type")}`,
                    value: "type",
                },
                { title: this.$t("updatedat"), value: "updated_at" },
            ],
        };
    },
    watch: {
        options: {
            handler() {
                this.fetch();
            },
        },
        loading() {
            this.disableItemsPerPage = this.loading;
            this.disablePagination = this.loading;
        },
    },
    methods: {
        fetch(reset = false) {
            let self = this;
            self.loading = true;
            const { page, itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                goods_shipping_id: self.$props.goodsShipId,
                page: reset ? 1 : page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                keyword: self.searchText,
            };
            this.$store
                .dispatch("goods/shippings/alteration/get", data)
                .then((response) => {
                    let res = JSON.parse(JSON.stringify(response.data));
                    self.items = res.data;
                    self.serverItemsLength = res.total;
                    self.pageCount = res.last_page;
                    self.page = res.current_page;
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        search() {
            this.fetch({ ...this.options });
        },
        download() {
            let self = this;
            self.loading = true;
            const { itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                goods_shipping_id: self.$props.goodsShipId,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/shippings/alteration/export", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        reload() {
            this.fetch();
        },
    },
};
function _sfc_ssrRender$3(
    _ctx,
    _push,
    _parent,
    _attrs,
    $props,
    $setup,
    $data,
    $options
) {
    const _component_Dialog = resolveComponent("Dialog");
    const _component_CRow = resolveComponent("CRow");
    const _component_CCol = resolveComponent("CCol");
    const _component_CInput = resolveComponent("CInput");
    const _component_CButton = resolveComponent("CButton");
    const _component_CIcon = resolveComponent("CIcon");
    const _component_barcode = resolveComponent("barcode");
    _push(`<div${ssrRenderAttrs(_attrs)} data-v-623d7071>`);
    _push(
        ssrRenderComponent(_component_Dialog, { ref: "dialog" }, null, _parent)
    );
    _push(
        ssrRenderComponent(
            _component_CRow,
            { class: "p-2" },
            {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                        _push2(
                            ssrRenderComponent(
                                _component_CCol,
                                {
                                    md: "9",
                                    sm: "9",
                                },
                                {
                                    default: withCtx(
                                        (_2, _push3, _parent3, _scopeId2) => {
                                            if (_push3) {
                                                _push3(
                                                    ssrRenderComponent(
                                                        _component_CInput,
                                                        {
                                                            size: "sm",
                                                            modelValue:
                                                                $data.searchText,
                                                            "onUpdate:modelValue":
                                                                ($event) =>
                                                                    ($data.searchText =
                                                                        $event),
                                                            onKeyup:
                                                                $options.search,
                                                        },
                                                        {
                                                            prepend: withCtx(
                                                                (
                                                                    _3,
                                                                    _push4,
                                                                    _parent4,
                                                                    _scopeId3
                                                                ) => {
                                                                    if (
                                                                        _push4
                                                                    ) {
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CButton,
                                                                                {
                                                                                    color: "primary",
                                                                                    size: "sm",
                                                                                    onClick:
                                                                                        $options.search,
                                                                                    disabled:
                                                                                        $data.loading,
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            (
                                                                                                _4,
                                                                                                _push5,
                                                                                                _parent5,
                                                                                                _scopeId4
                                                                                            ) => {
                                                                                                if (
                                                                                                    _push5
                                                                                                ) {
                                                                                                    _push5(
                                                                                                        ssrRenderComponent(
                                                                                                            _component_CIcon,
                                                                                                            {
                                                                                                                name: "cil-magnifying-glass",
                                                                                                                size: "sm",
                                                                                                            },
                                                                                                            null,
                                                                                                            _parent5,
                                                                                                            _scopeId4
                                                                                                        )
                                                                                                    );
                                                                                                } else {
                                                                                                    return [
                                                                                                        createVNode(
                                                                                                            _component_CIcon,
                                                                                                            {
                                                                                                                name: "cil-magnifying-glass",
                                                                                                                size: "sm",
                                                                                                            }
                                                                                                        ),
                                                                                                    ];
                                                                                                }
                                                                                            }
                                                                                        ),
                                                                                    _: 1,
                                                                                },
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                    } else {
                                                                        return [
                                                                            createVNode(
                                                                                _component_CButton,
                                                                                {
                                                                                    color: "primary",
                                                                                    size: "sm",
                                                                                    onClick:
                                                                                        $options.search,
                                                                                    disabled:
                                                                                        $data.loading,
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            () => [
                                                                                                createVNode(
                                                                                                    _component_CIcon,
                                                                                                    {
                                                                                                        name: "cil-magnifying-glass",
                                                                                                        size: "sm",
                                                                                                    }
                                                                                                ),
                                                                                            ]
                                                                                        ),
                                                                                    _: 1,
                                                                                },
                                                                                8,
                                                                                [
                                                                                    "onClick",
                                                                                    "disabled",
                                                                                ]
                                                                            ),
                                                                        ];
                                                                    }
                                                                }
                                                            ),
                                                            _: 1,
                                                        },
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                            } else {
                                                return [
                                                    createVNode(
                                                        _component_CInput,
                                                        {
                                                            size: "sm",
                                                            modelValue:
                                                                $data.searchText,
                                                            "onUpdate:modelValue":
                                                                ($event) =>
                                                                    ($data.searchText =
                                                                        $event),
                                                            onKeyup: withKeys(
                                                                $options.search,
                                                                ["enter"]
                                                            ),
                                                        },
                                                        {
                                                            prepend: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CButton,
                                                                        {
                                                                            color: "primary",
                                                                            size: "sm",
                                                                            onClick:
                                                                                $options.search,
                                                                            disabled:
                                                                                $data.loading,
                                                                        },
                                                                        {
                                                                            default:
                                                                                withCtx(
                                                                                    () => [
                                                                                        createVNode(
                                                                                            _component_CIcon,
                                                                                            {
                                                                                                name: "cil-magnifying-glass",
                                                                                                size: "sm",
                                                                                            }
                                                                                        ),
                                                                                    ]
                                                                                ),
                                                                            _: 1,
                                                                        },
                                                                        8,
                                                                        [
                                                                            "onClick",
                                                                            "disabled",
                                                                        ]
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        },
                                                        8,
                                                        [
                                                            "modelValue",
                                                            "onUpdate:modelValue",
                                                            "onKeyup",
                                                        ]
                                                    ),
                                                ];
                                            }
                                        }
                                    ),
                                    _: 1,
                                },
                                _parent2,
                                _scopeId
                            )
                        );
                        _push2(
                            ssrRenderComponent(
                                _component_CCol,
                                {
                                    md: "3",
                                    sm: "3",
                                    class: "text-right",
                                },
                                {
                                    default: withCtx(
                                        (_2, _push3, _parent3, _scopeId2) => {
                                            if (_push3) {
                                                _push3(
                                                    ssrRenderComponent(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
                                                            onClick:
                                                                $options.download,
                                                            disabled:
                                                                $data.loading,
                                                        },
                                                        {
                                                            default: withCtx(
                                                                (
                                                                    _3,
                                                                    _push4,
                                                                    _parent4,
                                                                    _scopeId3
                                                                ) => {
                                                                    if (
                                                                        _push4
                                                                    ) {
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CIcon,
                                                                                {
                                                                                    name: "cil-cloud-download",
                                                                                    size: "sm",
                                                                                },
                                                                                null,
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                    } else {
                                                                        return [
                                                                            createVNode(
                                                                                _component_CIcon,
                                                                                {
                                                                                    name: "cil-cloud-download",
                                                                                    size: "sm",
                                                                                }
                                                                            ),
                                                                        ];
                                                                    }
                                                                }
                                                            ),
                                                            _: 1,
                                                        },
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                                _push3(
                                                    ssrRenderComponent(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
                                                            onClick:
                                                                $options.reload,
                                                            disabled:
                                                                $data.loading,
                                                        },
                                                        {
                                                            default: withCtx(
                                                                (
                                                                    _3,
                                                                    _push4,
                                                                    _parent4,
                                                                    _scopeId3
                                                                ) => {
                                                                    if (
                                                                        _push4
                                                                    ) {
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CIcon,
                                                                                {
                                                                                    name: "cil-reload",
                                                                                    size: "sm",
                                                                                },
                                                                                null,
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                    } else {
                                                                        return [
                                                                            createVNode(
                                                                                _component_CIcon,
                                                                                {
                                                                                    name: "cil-reload",
                                                                                    size: "sm",
                                                                                }
                                                                            ),
                                                                        ];
                                                                    }
                                                                }
                                                            ),
                                                            _: 1,
                                                        },
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                            } else {
                                                return [
                                                    createVNode(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
                                                            onClick:
                                                                $options.download,
                                                            disabled:
                                                                $data.loading,
                                                        },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CIcon,
                                                                        {
                                                                            name: "cil-cloud-download",
                                                                            size: "sm",
                                                                        }
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        },
                                                        8,
                                                        ["onClick", "disabled"]
                                                    ),
                                                    createVNode(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
                                                            onClick:
                                                                $options.reload,
                                                            disabled:
                                                                $data.loading,
                                                        },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CIcon,
                                                                        {
                                                                            name: "cil-reload",
                                                                            size: "sm",
                                                                        }
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        },
                                                        8,
                                                        ["onClick", "disabled"]
                                                    ),
                                                ];
                                            }
                                        }
                                    ),
                                    _: 1,
                                },
                                _parent2,
                                _scopeId
                            )
                        );
                    } else {
                        return [
                            createVNode(
                                _component_CCol,
                                {
                                    md: "9",
                                    sm: "9",
                                },
                                {
                                    default: withCtx(() => [
                                        createVNode(
                                            _component_CInput,
                                            {
                                                size: "sm",
                                                modelValue: $data.searchText,
                                                "onUpdate:modelValue": (
                                                    $event
                                                ) =>
                                                    ($data.searchText = $event),
                                                onKeyup: withKeys(
                                                    $options.search,
                                                    ["enter"]
                                                ),
                                            },
                                            {
                                                prepend: withCtx(() => [
                                                    createVNode(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
                                                            onClick:
                                                                $options.search,
                                                            disabled:
                                                                $data.loading,
                                                        },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CIcon,
                                                                        {
                                                                            name: "cil-magnifying-glass",
                                                                            size: "sm",
                                                                        }
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        },
                                                        8,
                                                        ["onClick", "disabled"]
                                                    ),
                                                ]),
                                                _: 1,
                                            },
                                            8,
                                            [
                                                "modelValue",
                                                "onUpdate:modelValue",
                                                "onKeyup",
                                            ]
                                        ),
                                    ]),
                                    _: 1,
                                }
                            ),
                            createVNode(
                                _component_CCol,
                                {
                                    md: "3",
                                    sm: "3",
                                    class: "text-right",
                                },
                                {
                                    default: withCtx(() => [
                                        createVNode(
                                            _component_CButton,
                                            {
                                                color: "primary",
                                                size: "sm",
                                                onClick: $options.download,
                                                disabled: $data.loading,
                                            },
                                            {
                                                default: withCtx(() => [
                                                    createVNode(
                                                        _component_CIcon,
                                                        {
                                                            name: "cil-cloud-download",
                                                            size: "sm",
                                                        }
                                                    ),
                                                ]),
                                                _: 1,
                                            },
                                            8,
                                            ["onClick", "disabled"]
                                        ),
                                        createVNode(
                                            _component_CButton,
                                            {
                                                color: "primary",
                                                size: "sm",
                                                onClick: $options.reload,
                                                disabled: $data.loading,
                                            },
                                            {
                                                default: withCtx(() => [
                                                    createVNode(
                                                        _component_CIcon,
                                                        {
                                                            name: "cil-reload",
                                                            size: "sm",
                                                        }
                                                    ),
                                                ]),
                                                _: 1,
                                            },
                                            8,
                                            ["onClick", "disabled"]
                                        ),
                                    ]),
                                    _: 1,
                                }
                            ),
                        ];
                    }
                }),
                _: 1,
            },
            _parent
        )
    );
    _push(
        ssrRenderComponent(
            VDataTable,
            {
                class: "elevation-1",
                page: $data.page,
                pageCount: $data.pageCount,
                headers: $data.headers,
                items: $data.items,
                options: $data.options,
                "server-items-length": $data.serverItemsLength,
                loading: $data.loading,
                "sort-by": $data.sortBy,
                "sort-desc": $data.sortDesc,
                "footer-props": {
                    disableItemsPerPage: $data.disableItemsPerPage,
                    disablePagination: $data.disablePagination,
                    showFirstLastPage: true,
                    showCurrentPage: true,
                    itemsPerPageOptions: [10, 20, 50, 100],
                },
            },
            {
                [`item.type`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            _push2(
                                `${ssrInterpolate(
                                    _ctx.$t(item.type.toLowerCase())
                                )}`
                            );
                        } else {
                            return [
                                createTextVNode(
                                    toDisplayString(
                                        _ctx.$t(item.type.toLowerCase())
                                    ),
                                    1
                                ),
                            ];
                        }
                    }
                ),
                [`item.barcode`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            if (item.barcode) {
                                _push2(
                                    ssrRenderComponent(
                                        _component_barcode,
                                        {
                                            value: item.barcode,
                                            options: {
                                                format: "CODE39",
                                                height: 32,
                                            },
                                        },
                                        null,
                                        _parent2,
                                        _scopeId
                                    )
                                );
                            } else {
                                _push2(`<!---->`);
                            }
                        } else {
                            return [
                                item.barcode
                                    ? (openBlock(),
                                      createBlock(
                                          _component_barcode,
                                          {
                                              key: 0,
                                              value: item.barcode,
                                              options: {
                                                  format: "CODE39",
                                                  height: 32,
                                              },
                                          },
                                          null,
                                          8,
                                          ["value"]
                                      ))
                                    : createCommentVNode("", true),
                            ];
                        }
                    }
                ),
                [`item.updated_at`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            if (item.updated_at) {
                                _push2(
                                    `<div data-v-623d7071${_scopeId}>${ssrInterpolate(
                                        this.$formatDate(item.updated_at)
                                    )}</div>`
                                );
                            } else {
                                _push2(`<!---->`);
                            }
                        } else {
                            return [
                                item.updated_at
                                    ? (openBlock(),
                                      createBlock(
                                          "div",
                                          { key: 0 },
                                          toDisplayString(
                                              this.$formatDate(item.updated_at)
                                          ),
                                          1
                                      ))
                                    : createCommentVNode("", true),
                            ];
                        }
                    }
                ),
                _: 2,
            },
            _parent
        )
    );
    _push(`</div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (
        ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())
    ).add(
        "resources/js/views/shippings/components/ShippingAlterationTable.vue"
    );
    return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const ShippingAlterationTable = /* @__PURE__ */ _export_sfc(_sfc_main$3, [
    ["ssrRender", _sfc_ssrRender$3],
    ["__scopeId", "data-v-623d7071"],
]);
const _sfc_main$2 = {
    name: "ShippingReturnDialog",
    data() {
        return {
            data: {},
            item: {},
            empty: 0,
            dialog: false,
            resolve: null,
            reject: null,
            title: null,
            loading: false,
            goodsSizes: sizes,
        };
    },
    methods: {
        open(data, item) {
            this.title = `
            ${this.$t("return")}－${item.name}－${item.color}`;
            this.dialog = true;
            this.data = data;
            this.item = item;
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        submit() {
            let self = this;
            if (self.loading) {
                return;
            }
            self.loading = true;
            let data = {
                id: self.data.id,
                item: self.item,
                type: "RETURN",
            };
            this.$store
                .dispatch("goods/shippings/update", data)
                .then((response) => {
                    self.loading = false;
                    self.resolve(true);
                    self.dialog = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        cancel() {
            this.resolve(false);
            this.dialog = false;
            this.clear();
        },
        clear() {
            this.data = {};
            this.item = {};
        },
    },
};
function _sfc_ssrRender$2(
    _ctx,
    _push,
    _parent,
    _attrs,
    $props,
    $setup,
    $data,
    $options
) {
    const _component_CModal = resolveComponent("CModal");
    const _component_CRow = resolveComponent("CRow");
    const _component_CCol = resolveComponent("CCol");
    const _component_vue_number_input = resolveComponent("vue-number-input");
    const _component_CButton = resolveComponent("CButton");
    _push(
        ssrRenderComponent(
            _component_CModal,
            mergeProps(
                {
                    visible: $data.dialog,
                    centered: true,
                    title: $data.title,
                    size: "lg",
                },
                _attrs
            ),
            {
                footer: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                        _push2(
                            ssrRenderComponent(
                                _component_CButton,
                                {
                                    onClick: ($event) => $options.submit(),
                                    color: "danger",
                                    class: "px-4",
                                },
                                {
                                    default: withCtx(
                                        (_2, _push3, _parent3, _scopeId2) => {
                                            if (_push3) {
                                                _push3(
                                                    `${ssrInterpolate(
                                                        _ctx.$t("button.submit")
                                                    )}`
                                                );
                                            } else {
                                                return [
                                                    createTextVNode(
                                                        toDisplayString(
                                                            _ctx.$t(
                                                                "button.submit"
                                                            )
                                                        ),
                                                        1
                                                    ),
                                                ];
                                            }
                                        }
                                    ),
                                    _: 1,
                                },
                                _parent2,
                                _scopeId
                            )
                        );
                        _push2(
                            ssrRenderComponent(
                                _component_CButton,
                                {
                                    onClick: $options.cancel,
                                    color: "secondary",
                                    class: "px-4 ml-2",
                                },
                                {
                                    default: withCtx(
                                        (_2, _push3, _parent3, _scopeId2) => {
                                            if (_push3) {
                                                _push3(
                                                    `${ssrInterpolate(
                                                        _ctx.$t("button.cancel")
                                                    )}`
                                                );
                                            } else {
                                                return [
                                                    createTextVNode(
                                                        toDisplayString(
                                                            _ctx.$t(
                                                                "button.cancel"
                                                            )
                                                        ),
                                                        1
                                                    ),
                                                ];
                                            }
                                        }
                                    ),
                                    _: 1,
                                },
                                _parent2,
                                _scopeId
                            )
                        );
                    } else {
                        return [
                            createVNode(
                                _component_CButton,
                                {
                                    onClick: ($event) => $options.submit(),
                                    color: "danger",
                                    class: "px-4",
                                },
                                {
                                    default: withCtx(() => [
                                        createTextVNode(
                                            toDisplayString(
                                                _ctx.$t("button.submit")
                                            ),
                                            1
                                        ),
                                    ]),
                                    _: 1,
                                },
                                8,
                                ["onClick"]
                            ),
                            createVNode(
                                _component_CButton,
                                {
                                    onClick: $options.cancel,
                                    color: "secondary",
                                    class: "px-4 ml-2",
                                },
                                {
                                    default: withCtx(() => [
                                        createTextVNode(
                                            toDisplayString(
                                                _ctx.$t("button.cancel")
                                            ),
                                            1
                                        ),
                                    ]),
                                    _: 1,
                                },
                                8,
                                ["onClick"]
                            ),
                        ];
                    }
                }),
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                        _push2(
                            ssrRenderComponent(
                                VProgressLinear,
                                {
                                    active: $data.loading,
                                    indeterminate: "",
                                    color: "cyan",
                                },
                                null,
                                _parent2,
                                _scopeId
                            )
                        );
                        _push2(`<!--[-->`);
                        ssrRenderList($data.goodsSizes, (size) => {
                            _push2(`<div${_scopeId}>`);
                            _push2(
                                ssrRenderComponent(
                                    _component_CRow,
                                    null,
                                    {
                                        default: withCtx(
                                            (
                                                _2,
                                                _push3,
                                                _parent3,
                                                _scopeId2
                                            ) => {
                                                if (_push3) {
                                                    _push3(
                                                        ssrRenderComponent(
                                                            _component_CCol,
                                                            null,
                                                            {
                                                                default:
                                                                    withCtx(
                                                                        (
                                                                            _3,
                                                                            _push4,
                                                                            _parent4,
                                                                            _scopeId3
                                                                        ) => {
                                                                            if (
                                                                                _push4
                                                                            ) {
                                                                                _push4(
                                                                                    `<div class="d-flex justify-content-center"${_scopeId3}>${ssrInterpolate(
                                                                                        size.name
                                                                                    )}</div>`
                                                                                );
                                                                            } else {
                                                                                return [
                                                                                    createVNode(
                                                                                        "div",
                                                                                        {
                                                                                            class: "d-flex justify-content-center",
                                                                                        },
                                                                                        toDisplayString(
                                                                                            size.name
                                                                                        ),
                                                                                        1
                                                                                    ),
                                                                                ];
                                                                            }
                                                                        }
                                                                    ),
                                                                _: 2,
                                                            },
                                                            _parent3,
                                                            _scopeId2
                                                        )
                                                    );
                                                } else {
                                                    return [
                                                        createVNode(
                                                            _component_CCol,
                                                            null,
                                                            {
                                                                default:
                                                                    withCtx(
                                                                        () => [
                                                                            createVNode(
                                                                                "div",
                                                                                {
                                                                                    class: "d-flex justify-content-center",
                                                                                },
                                                                                toDisplayString(
                                                                                    size.name
                                                                                ),
                                                                                1
                                                                            ),
                                                                        ]
                                                                    ),
                                                                _: 2,
                                                            },
                                                            1024
                                                        ),
                                                    ];
                                                }
                                            }
                                        ),
                                        _: 2,
                                    },
                                    _parent2,
                                    _scopeId
                                )
                            );
                            _push2(
                                ssrRenderComponent(
                                    _component_CRow,
                                    null,
                                    {
                                        default: withCtx(
                                            (
                                                _2,
                                                _push3,
                                                _parent3,
                                                _scopeId2
                                            ) => {
                                                if (_push3) {
                                                    _push3(
                                                        ssrRenderComponent(
                                                            _component_CCol,
                                                            null,
                                                            {
                                                                default:
                                                                    withCtx(
                                                                        (
                                                                            _3,
                                                                            _push4,
                                                                            _parent4,
                                                                            _scopeId3
                                                                        ) => {
                                                                            if (
                                                                                _push4
                                                                            ) {
                                                                                _push4(
                                                                                    `<div class="d-flex justify-content-center"${_scopeId3}>`
                                                                                );
                                                                                if (
                                                                                    $data.item &&
                                                                                    $data
                                                                                        .item[
                                                                                        size
                                                                                            .name
                                                                                    ]
                                                                                ) {
                                                                                    _push4(
                                                                                        `<div${_scopeId3}>`
                                                                                    );
                                                                                    _push4(
                                                                                        ssrRenderComponent(
                                                                                            _component_vue_number_input,
                                                                                            {
                                                                                                size: "small",
                                                                                                modelValue:
                                                                                                    $data
                                                                                                        .item[
                                                                                                        size
                                                                                                            .name
                                                                                                    ]
                                                                                                        .return_unit,
                                                                                                "onUpdate:modelValue":
                                                                                                    (
                                                                                                        $event
                                                                                                    ) =>
                                                                                                        ($data.item[
                                                                                                            size.name
                                                                                                        ].return_unit =
                                                                                                            $event),
                                                                                                min: 0,
                                                                                                max: $data
                                                                                                    .item[
                                                                                                    size
                                                                                                        .name
                                                                                                ]
                                                                                                    ? $data
                                                                                                          .item[
                                                                                                          size
                                                                                                              .name
                                                                                                      ]
                                                                                                          .unit
                                                                                                    : 0,
                                                                                                inline: "",
                                                                                                center: "",
                                                                                                controls:
                                                                                                    "",
                                                                                            },
                                                                                            null,
                                                                                            _parent4,
                                                                                            _scopeId3
                                                                                        )
                                                                                    );
                                                                                    _push4(
                                                                                        `</div>`
                                                                                    );
                                                                                } else {
                                                                                    _push4(
                                                                                        `<div${_scopeId3}>`
                                                                                    );
                                                                                    _push4(
                                                                                        ssrRenderComponent(
                                                                                            _component_vue_number_input,
                                                                                            {
                                                                                                size: "small",
                                                                                                modelValue:
                                                                                                    $data.empty,
                                                                                                "onUpdate:modelValue":
                                                                                                    (
                                                                                                        $event
                                                                                                    ) =>
                                                                                                        ($data.empty =
                                                                                                            $event),
                                                                                                min: 0,
                                                                                                max: 0,
                                                                                                inline: "",
                                                                                                center: "",
                                                                                                controls:
                                                                                                    "",
                                                                                            },
                                                                                            null,
                                                                                            _parent4,
                                                                                            _scopeId3
                                                                                        )
                                                                                    );
                                                                                    _push4(
                                                                                        `</div>`
                                                                                    );
                                                                                }
                                                                                _push4(
                                                                                    `</div>`
                                                                                );
                                                                            } else {
                                                                                return [
                                                                                    createVNode(
                                                                                        "div",
                                                                                        {
                                                                                            class: "d-flex justify-content-center",
                                                                                        },
                                                                                        [
                                                                                            $data.item &&
                                                                                            $data
                                                                                                .item[
                                                                                                size
                                                                                                    .name
                                                                                            ]
                                                                                                ? (openBlock(),
                                                                                                  createBlock(
                                                                                                      "div",
                                                                                                      {
                                                                                                          key: 0,
                                                                                                      },
                                                                                                      [
                                                                                                          createVNode(
                                                                                                              _component_vue_number_input,
                                                                                                              {
                                                                                                                  size: "small",
                                                                                                                  modelValue:
                                                                                                                      $data
                                                                                                                          .item[
                                                                                                                          size
                                                                                                                              .name
                                                                                                                      ]
                                                                                                                          .return_unit,
                                                                                                                  "onUpdate:modelValue":
                                                                                                                      (
                                                                                                                          $event
                                                                                                                      ) =>
                                                                                                                          ($data.item[
                                                                                                                              size.name
                                                                                                                          ].return_unit =
                                                                                                                              $event),
                                                                                                                  min: 0,
                                                                                                                  max: $data
                                                                                                                      .item[
                                                                                                                      size
                                                                                                                          .name
                                                                                                                  ]
                                                                                                                      ? $data
                                                                                                                            .item[
                                                                                                                            size
                                                                                                                                .name
                                                                                                                        ]
                                                                                                                            .unit
                                                                                                                      : 0,
                                                                                                                  inline: "",
                                                                                                                  center: "",
                                                                                                                  controls:
                                                                                                                      "",
                                                                                                              },
                                                                                                              null,
                                                                                                              8,
                                                                                                              [
                                                                                                                  "modelValue",
                                                                                                                  "onUpdate:modelValue",
                                                                                                                  "max",
                                                                                                              ]
                                                                                                          ),
                                                                                                      ]
                                                                                                  ))
                                                                                                : (openBlock(),
                                                                                                  createBlock(
                                                                                                      "div",
                                                                                                      {
                                                                                                          key: 1,
                                                                                                      },
                                                                                                      [
                                                                                                          createVNode(
                                                                                                              _component_vue_number_input,
                                                                                                              {
                                                                                                                  size: "small",
                                                                                                                  modelValue:
                                                                                                                      $data.empty,
                                                                                                                  "onUpdate:modelValue":
                                                                                                                      (
                                                                                                                          $event
                                                                                                                      ) =>
                                                                                                                          ($data.empty =
                                                                                                                              $event),
                                                                                                                  min: 0,
                                                                                                                  max: 0,
                                                                                                                  inline: "",
                                                                                                                  center: "",
                                                                                                                  controls:
                                                                                                                      "",
                                                                                                              },
                                                                                                              null,
                                                                                                              8,
                                                                                                              [
                                                                                                                  "modelValue",
                                                                                                                  "onUpdate:modelValue",
                                                                                                              ]
                                                                                                          ),
                                                                                                      ]
                                                                                                  )),
                                                                                        ]
                                                                                    ),
                                                                                ];
                                                                            }
                                                                        }
                                                                    ),
                                                                _: 2,
                                                            },
                                                            _parent3,
                                                            _scopeId2
                                                        )
                                                    );
                                                } else {
                                                    return [
                                                        createVNode(
                                                            _component_CCol,
                                                            null,
                                                            {
                                                                default:
                                                                    withCtx(
                                                                        () => [
                                                                            createVNode(
                                                                                "div",
                                                                                {
                                                                                    class: "d-flex justify-content-center",
                                                                                },
                                                                                [
                                                                                    $data.item &&
                                                                                    $data
                                                                                        .item[
                                                                                        size
                                                                                            .name
                                                                                    ]
                                                                                        ? (openBlock(),
                                                                                          createBlock(
                                                                                              "div",
                                                                                              {
                                                                                                  key: 0,
                                                                                              },
                                                                                              [
                                                                                                  createVNode(
                                                                                                      _component_vue_number_input,
                                                                                                      {
                                                                                                          size: "small",
                                                                                                          modelValue:
                                                                                                              $data
                                                                                                                  .item[
                                                                                                                  size
                                                                                                                      .name
                                                                                                              ]
                                                                                                                  .return_unit,
                                                                                                          "onUpdate:modelValue":
                                                                                                              (
                                                                                                                  $event
                                                                                                              ) =>
                                                                                                                  ($data.item[
                                                                                                                      size.name
                                                                                                                  ].return_unit =
                                                                                                                      $event),
                                                                                                          min: 0,
                                                                                                          max: $data
                                                                                                              .item[
                                                                                                              size
                                                                                                                  .name
                                                                                                          ]
                                                                                                              ? $data
                                                                                                                    .item[
                                                                                                                    size
                                                                                                                        .name
                                                                                                                ]
                                                                                                                    .unit
                                                                                                              : 0,
                                                                                                          inline: "",
                                                                                                          center: "",
                                                                                                          controls:
                                                                                                              "",
                                                                                                      },
                                                                                                      null,
                                                                                                      8,
                                                                                                      [
                                                                                                          "modelValue",
                                                                                                          "onUpdate:modelValue",
                                                                                                          "max",
                                                                                                      ]
                                                                                                  ),
                                                                                              ]
                                                                                          ))
                                                                                        : (openBlock(),
                                                                                          createBlock(
                                                                                              "div",
                                                                                              {
                                                                                                  key: 1,
                                                                                              },
                                                                                              [
                                                                                                  createVNode(
                                                                                                      _component_vue_number_input,
                                                                                                      {
                                                                                                          size: "small",
                                                                                                          modelValue:
                                                                                                              $data.empty,
                                                                                                          "onUpdate:modelValue":
                                                                                                              (
                                                                                                                  $event
                                                                                                              ) =>
                                                                                                                  ($data.empty =
                                                                                                                      $event),
                                                                                                          min: 0,
                                                                                                          max: 0,
                                                                                                          inline: "",
                                                                                                          center: "",
                                                                                                          controls:
                                                                                                              "",
                                                                                                      },
                                                                                                      null,
                                                                                                      8,
                                                                                                      [
                                                                                                          "modelValue",
                                                                                                          "onUpdate:modelValue",
                                                                                                      ]
                                                                                                  ),
                                                                                              ]
                                                                                          )),
                                                                                ]
                                                                            ),
                                                                        ]
                                                                    ),
                                                                _: 2,
                                                            },
                                                            1024
                                                        ),
                                                    ];
                                                }
                                            }
                                        ),
                                        _: 2,
                                    },
                                    _parent2,
                                    _scopeId
                                )
                            );
                            _push2(`</div>`);
                        });
                        _push2(`<!--]-->`);
                    } else {
                        return [
                            createVNode(
                                VProgressLinear,
                                {
                                    active: $data.loading,
                                    indeterminate: "",
                                    color: "cyan",
                                },
                                null,
                                8,
                                ["active"]
                            ),
                            (openBlock(true),
                            createBlock(
                                Fragment,
                                null,
                                renderList($data.goodsSizes, (size) => {
                                    return (
                                        openBlock(),
                                        createBlock(
                                            "div",
                                            {
                                                key: size.name,
                                            },
                                            [
                                                createVNode(
                                                    _component_CRow,
                                                    null,
                                                    {
                                                        default: withCtx(() => [
                                                            createVNode(
                                                                _component_CCol,
                                                                null,
                                                                {
                                                                    default:
                                                                        withCtx(
                                                                            () => [
                                                                                createVNode(
                                                                                    "div",
                                                                                    {
                                                                                        class: "d-flex justify-content-center",
                                                                                    },
                                                                                    toDisplayString(
                                                                                        size.name
                                                                                    ),
                                                                                    1
                                                                                ),
                                                                            ]
                                                                        ),
                                                                    _: 2,
                                                                },
                                                                1024
                                                            ),
                                                        ]),
                                                        _: 2,
                                                    },
                                                    1024
                                                ),
                                                createVNode(
                                                    _component_CRow,
                                                    null,
                                                    {
                                                        default: withCtx(() => [
                                                            createVNode(
                                                                _component_CCol,
                                                                null,
                                                                {
                                                                    default:
                                                                        withCtx(
                                                                            () => [
                                                                                createVNode(
                                                                                    "div",
                                                                                    {
                                                                                        class: "d-flex justify-content-center",
                                                                                    },
                                                                                    [
                                                                                        $data.item &&
                                                                                        $data
                                                                                            .item[
                                                                                            size
                                                                                                .name
                                                                                        ]
                                                                                            ? (openBlock(),
                                                                                              createBlock(
                                                                                                  "div",
                                                                                                  {
                                                                                                      key: 0,
                                                                                                  },
                                                                                                  [
                                                                                                      createVNode(
                                                                                                          _component_vue_number_input,
                                                                                                          {
                                                                                                              size: "small",
                                                                                                              modelValue:
                                                                                                                  $data
                                                                                                                      .item[
                                                                                                                      size
                                                                                                                          .name
                                                                                                                  ]
                                                                                                                      .return_unit,
                                                                                                              "onUpdate:modelValue":
                                                                                                                  (
                                                                                                                      $event
                                                                                                                  ) =>
                                                                                                                      ($data.item[
                                                                                                                          size.name
                                                                                                                      ].return_unit =
                                                                                                                          $event),
                                                                                                              min: 0,
                                                                                                              max: $data
                                                                                                                  .item[
                                                                                                                  size
                                                                                                                      .name
                                                                                                              ]
                                                                                                                  ? $data
                                                                                                                        .item[
                                                                                                                        size
                                                                                                                            .name
                                                                                                                    ]
                                                                                                                        .unit
                                                                                                                  : 0,
                                                                                                              inline: "",
                                                                                                              center: "",
                                                                                                              controls:
                                                                                                                  "",
                                                                                                          },
                                                                                                          null,
                                                                                                          8,
                                                                                                          [
                                                                                                              "modelValue",
                                                                                                              "onUpdate:modelValue",
                                                                                                              "max",
                                                                                                          ]
                                                                                                      ),
                                                                                                  ]
                                                                                              ))
                                                                                            : (openBlock(),
                                                                                              createBlock(
                                                                                                  "div",
                                                                                                  {
                                                                                                      key: 1,
                                                                                                  },
                                                                                                  [
                                                                                                      createVNode(
                                                                                                          _component_vue_number_input,
                                                                                                          {
                                                                                                              size: "small",
                                                                                                              modelValue:
                                                                                                                  $data.empty,
                                                                                                              "onUpdate:modelValue":
                                                                                                                  (
                                                                                                                      $event
                                                                                                                  ) =>
                                                                                                                      ($data.empty =
                                                                                                                          $event),
                                                                                                              min: 0,
                                                                                                              max: 0,
                                                                                                              inline: "",
                                                                                                              center: "",
                                                                                                              controls:
                                                                                                                  "",
                                                                                                          },
                                                                                                          null,
                                                                                                          8,
                                                                                                          [
                                                                                                              "modelValue",
                                                                                                              "onUpdate:modelValue",
                                                                                                          ]
                                                                                                      ),
                                                                                                  ]
                                                                                              )),
                                                                                    ]
                                                                                ),
                                                                            ]
                                                                        ),
                                                                    _: 2,
                                                                },
                                                                1024
                                                            ),
                                                        ]),
                                                        _: 2,
                                                    },
                                                    1024
                                                ),
                                            ]
                                        )
                                    );
                                }),
                                128
                            )),
                        ];
                    }
                }),
                _: 1,
            },
            _parent
        )
    );
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (
        ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())
    ).add("resources/js/views/shippings/components/ShippingReturnDialog.vue");
    return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ShippingReturnDialog = /* @__PURE__ */ _export_sfc(_sfc_main$2, [
    ["ssrRender", _sfc_ssrRender$2],
]);
const _sfc_main$1 = {
    name: "ShippingInvoice",
    props: {
        id: null,
    },
    computed: {
        ...mapState(["goods/shippings"]),
        data() {
            return this["goods/shippings"].detailsData;
        },
        headerItems() {
            return this["goods/shippings"].detailsData.header_items;
        },
        shippingItems() {
            return JSON.parse(
                JSON.stringify(
                    this["goods/shippings"].detailsData.shipping_items
                )
            );
        },
        footerItems() {
            return this["goods/shippings"].detailsData.footer_items;
        },
    },
    components: {
        Dialog,
        ShippingReturnDialog,
    },
    data() {
        return {
            search: null,
            loading: false,
            table: {
                header: {
                    headers: [
                        { text: "X1", value: "X1" },
                        { text: "X2", value: "X2" },
                        { text: "X3", value: "X3" },
                        { text: "X4", value: "X4" },
                        { text: "X5", value: "X5" },
                        { text: "X6", value: "X6" },
                    ],
                },
                footer: {
                    headers: [
                        {
                            text: "",
                            value: "X1",
                            align: "right",
                            width: "80%",
                            sortable: false,
                        },
                        {
                            text: "",
                            value: "X2",
                            align: "left",
                            width: "20%",
                            sortable: false,
                        },
                    ],
                },
                item: {
                    headers: [
                        { text: "#ID", value: "id" },
                        { title: this.$t("type"), value: "type" },
                        { title: this.$t("goodsname"), value: "name" },
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
                            text: `${this.$t("unit-price")}($)`,
                            value: "formatted_unit_price",
                        },
                        { title: this.$t("total-unit"), value: "total_unit" },
                        {
                            text: `${this.$t("cost")}($)`,
                            value: "formatted_cost",
                        },
                        { title: this.$t("actions"), value: "actions" },
                    ],
                },
            },
        };
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            let self = this;
            self.loading = true;
            let data = {
                id: self.$props.id,
            };
            this.$store
                .dispatch("goods/shippings/details", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        update() {},
        reload() {
            this.fetch();
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
            let item = this.shippingItems[idx];
            if (item) {
                let sizes$1 = sizes;
                let totalunit = 0;
                for (let size of sizes$1) {
                    if (item[size.name]) {
                        totalunit += item[size.name].unit;
                    }
                }
                this.shippingItems[idx].total_unit = totalunit;
                this.shippingItems[idx].cost =
                    totalunit * this.shippingItems[idx].unit_price;
            }
        },
        reload() {
            this.fetch();
        },
        download() {
            let self = this;
            self.loading = true;
            let data = {
                id: self.$props.id,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/shippings/invoice/export", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        exportPackingInfo() {
            let self = this;
            self.loading = true;
            let data = {
                shipping_id: self.$props.id,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/shippings/packing/export", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        exportMailerInfo() {
            let self = this;
            self.loading = true;
            let data = {
                id: self.$props.id,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/shippings/mailer/export", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        async click(item, action) {
            let type = action.type;
            switch (type) {
                case "Update":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("alert.title"),
                            this.$t("alert.update")
                        )
                    ) {
                        let self2 = this;
                        let data = {
                            id: self2.data.id,
                            item,
                            type: "UPDATE",
                        };
                        this.$store
                            .dispatch("goods/shippings/update", data)
                            .then((response) => {
                                self2.loading = false;
                                self2.fetch();
                            })
                            .catch((error) => {
                                self2.loading = false;
                            });
                    }
                    break;
                case "Return":
                    let self = this;
                    await this.$refs.ShippingReturnDialog.open(self.data, item);
                    break;
                case "Delete":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("alert.title"),
                            this.$t("alert.delete")
                        )
                    ) {
                        let self2 = this;
                        let data = {
                            id: self2.data.id,
                            item,
                            type: "DELETE",
                        };
                        this.$store
                            .dispatch("goods/shippings/update", data)
                            .then((response) => {
                                self2.loading = false;
                                self2.fetch();
                            })
                            .catch((error) => {
                                self2.loading = false;
                            });
                    }
                    break;
            }
        },
    },
};
function _sfc_ssrRender$1(
    _ctx,
    _push,
    _parent,
    _attrs,
    $props,
    $setup,
    $data,
    $options
) {
    const _component_Dialog = resolveComponent("Dialog");
    const _component_ShippingReturnDialog = resolveComponent(
        "ShippingReturnDialog"
    );
    const _component_CCard = resolveComponent("CCard");
    const _component_CCardBody = resolveComponent("CCardBody");
    const _component_CRow = resolveComponent("CRow");
    const _component_CCol = resolveComponent("CCol");
    const _component_CButton = resolveComponent("CButton");
    const _component_CIcon = resolveComponent("CIcon");
    const _component_CInput = resolveComponent("CInput");
    const _component_v_edit_dialog = resolveComponent("v-edit-dialog");
    const _component_vue_number_input = resolveComponent("vue-number-input");
    const _component_CButtonGroup = resolveComponent("CButtonGroup");
    _push(`<div${ssrRenderAttrs(_attrs)}>`);
    _push(
        ssrRenderComponent(_component_Dialog, { ref: "dialog" }, null, _parent)
    );
    _push(
        ssrRenderComponent(
            _component_ShippingReturnDialog,
            { ref: "ShippingReturnDialog" },
            null,
            _parent
        )
    );
    _push(
        ssrRenderComponent(
            _component_CCard,
            null,
            {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                        _push2(
                            ssrRenderComponent(
                                VProgressLinear,
                                {
                                    active: $data.loading,
                                    indeterminate: "",
                                    color: "cyan",
                                },
                                null,
                                _parent2,
                                _scopeId
                            )
                        );
                        _push2(
                            ssrRenderComponent(
                                _component_CCardBody,
                                null,
                                {
                                    default: withCtx(
                                        (_2, _push3, _parent3, _scopeId2) => {
                                            if (_push3) {
                                                _push3(
                                                    ssrRenderComponent(
                                                        _component_CRow,
                                                        { class: "p-2" },
                                                        {
                                                            default: withCtx(
                                                                (
                                                                    _3,
                                                                    _push4,
                                                                    _parent4,
                                                                    _scopeId3
                                                                ) => {
                                                                    if (
                                                                        _push4
                                                                    ) {
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CCol,
                                                                                {
                                                                                    class: "text-right",
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            (
                                                                                                _4,
                                                                                                _push5,
                                                                                                _parent5,
                                                                                                _scopeId4
                                                                                            ) => {
                                                                                                if (
                                                                                                    _push5
                                                                                                ) {
                                                                                                    _push5(
                                                                                                        ssrRenderComponent(
                                                                                                            _component_CButton,
                                                                                                            {
                                                                                                                color: "primary",
                                                                                                                size: "sm",
                                                                                                                onClick:
                                                                                                                    $options.exportPackingInfo,
                                                                                                                disabled:
                                                                                                                    $data.loading,
                                                                                                            },
                                                                                                            {
                                                                                                                default:
                                                                                                                    withCtx(
                                                                                                                        (
                                                                                                                            _5,
                                                                                                                            _push6,
                                                                                                                            _parent6,
                                                                                                                            _scopeId5
                                                                                                                        ) => {
                                                                                                                            if (
                                                                                                                                _push6
                                                                                                                            ) {
                                                                                                                                _push6(
                                                                                                                                    `${ssrInterpolate(
                                                                                                                                        _ctx.$t(
                                                                                                                                            "button.export"
                                                                                                                                        )
                                                                                                                                    )}${ssrInterpolate(
                                                                                                                                        _ctx.$t(
                                                                                                                                            "packing"
                                                                                                                                        )
                                                                                                                                    )}`
                                                                                                                                );
                                                                                                                            } else {
                                                                                                                                return [
                                                                                                                                    createTextVNode(
                                                                                                                                        toDisplayString(
                                                                                                                                            _ctx.$t(
                                                                                                                                                "button.export"
                                                                                                                                            )
                                                                                                                                        ) +
                                                                                                                                            toDisplayString(
                                                                                                                                                _ctx.$t(
                                                                                                                                                    "packing"
                                                                                                                                                )
                                                                                                                                            ),
                                                                                                                                        1
                                                                                                                                    ),
                                                                                                                                ];
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ),
                                                                                                                _: 1,
                                                                                                            },
                                                                                                            _parent5,
                                                                                                            _scopeId4
                                                                                                        )
                                                                                                    );
                                                                                                    _push5(
                                                                                                        ssrRenderComponent(
                                                                                                            _component_CButton,
                                                                                                            {
                                                                                                                color: "primary",
                                                                                                                size: "sm",
                                                                                                                onClick:
                                                                                                                    $options.exportMailerInfo,
                                                                                                                disabled:
                                                                                                                    $data.loading,
                                                                                                            },
                                                                                                            {
                                                                                                                default:
                                                                                                                    withCtx(
                                                                                                                        (
                                                                                                                            _5,
                                                                                                                            _push6,
                                                                                                                            _parent6,
                                                                                                                            _scopeId5
                                                                                                                        ) => {
                                                                                                                            if (
                                                                                                                                _push6
                                                                                                                            ) {
                                                                                                                                _push6(
                                                                                                                                    `${ssrInterpolate(
                                                                                                                                        _ctx.$t(
                                                                                                                                            "button.export"
                                                                                                                                        )
                                                                                                                                    )}${ssrInterpolate(
                                                                                                                                        _ctx.$t(
                                                                                                                                            "mailerinfo"
                                                                                                                                        )
                                                                                                                                    )}`
                                                                                                                                );
                                                                                                                            } else {
                                                                                                                                return [
                                                                                                                                    createTextVNode(
                                                                                                                                        toDisplayString(
                                                                                                                                            _ctx.$t(
                                                                                                                                                "button.export"
                                                                                                                                            )
                                                                                                                                        ) +
                                                                                                                                            toDisplayString(
                                                                                                                                                _ctx.$t(
                                                                                                                                                    "mailerinfo"
                                                                                                                                                )
                                                                                                                                            ),
                                                                                                                                        1
                                                                                                                                    ),
                                                                                                                                ];
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ),
                                                                                                                _: 1,
                                                                                                            },
                                                                                                            _parent5,
                                                                                                            _scopeId4
                                                                                                        )
                                                                                                    );
                                                                                                    _push5(
                                                                                                        ssrRenderComponent(
                                                                                                            _component_CButton,
                                                                                                            {
                                                                                                                color: "primary",
                                                                                                                size: "sm",
                                                                                                                onClick:
                                                                                                                    $options.download,
                                                                                                                disabled:
                                                                                                                    $data.loading,
                                                                                                            },
                                                                                                            {
                                                                                                                default:
                                                                                                                    withCtx(
                                                                                                                        (
                                                                                                                            _5,
                                                                                                                            _push6,
                                                                                                                            _parent6,
                                                                                                                            _scopeId5
                                                                                                                        ) => {
                                                                                                                            if (
                                                                                                                                _push6
                                                                                                                            ) {
                                                                                                                                _push6(
                                                                                                                                    ssrRenderComponent(
                                                                                                                                        _component_CIcon,
                                                                                                                                        {
                                                                                                                                            name: "cil-cloud-download",
                                                                                                                                            size: "sm",
                                                                                                                                        },
                                                                                                                                        null,
                                                                                                                                        _parent6,
                                                                                                                                        _scopeId5
                                                                                                                                    )
                                                                                                                                );
                                                                                                                            } else {
                                                                                                                                return [
                                                                                                                                    createVNode(
                                                                                                                                        _component_CIcon,
                                                                                                                                        {
                                                                                                                                            name: "cil-cloud-download",
                                                                                                                                            size: "sm",
                                                                                                                                        }
                                                                                                                                    ),
                                                                                                                                ];
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ),
                                                                                                                _: 1,
                                                                                                            },
                                                                                                            _parent5,
                                                                                                            _scopeId4
                                                                                                        )
                                                                                                    );
                                                                                                    _push5(
                                                                                                        ssrRenderComponent(
                                                                                                            _component_CButton,
                                                                                                            {
                                                                                                                color: "primary",
                                                                                                                size: "sm",
                                                                                                                onClick:
                                                                                                                    $options.reload,
                                                                                                                disabled:
                                                                                                                    $data.loading,
                                                                                                            },
                                                                                                            {
                                                                                                                default:
                                                                                                                    withCtx(
                                                                                                                        (
                                                                                                                            _5,
                                                                                                                            _push6,
                                                                                                                            _parent6,
                                                                                                                            _scopeId5
                                                                                                                        ) => {
                                                                                                                            if (
                                                                                                                                _push6
                                                                                                                            ) {
                                                                                                                                _push6(
                                                                                                                                    ssrRenderComponent(
                                                                                                                                        _component_CIcon,
                                                                                                                                        {
                                                                                                                                            name: "cil-reload",
                                                                                                                                            size: "sm",
                                                                                                                                        },
                                                                                                                                        null,
                                                                                                                                        _parent6,
                                                                                                                                        _scopeId5
                                                                                                                                    )
                                                                                                                                );
                                                                                                                            } else {
                                                                                                                                return [
                                                                                                                                    createVNode(
                                                                                                                                        _component_CIcon,
                                                                                                                                        {
                                                                                                                                            name: "cil-reload",
                                                                                                                                            size: "sm",
                                                                                                                                        }
                                                                                                                                    ),
                                                                                                                                ];
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ),
                                                                                                                _: 1,
                                                                                                            },
                                                                                                            _parent5,
                                                                                                            _scopeId4
                                                                                                        )
                                                                                                    );
                                                                                                } else {
                                                                                                    return [
                                                                                                        createVNode(
                                                                                                            _component_CButton,
                                                                                                            {
                                                                                                                color: "primary",
                                                                                                                size: "sm",
                                                                                                                onClick:
                                                                                                                    $options.exportPackingInfo,
                                                                                                                disabled:
                                                                                                                    $data.loading,
                                                                                                            },
                                                                                                            {
                                                                                                                default:
                                                                                                                    withCtx(
                                                                                                                        () => [
                                                                                                                            createTextVNode(
                                                                                                                                toDisplayString(
                                                                                                                                    _ctx.$t(
                                                                                                                                        "button.export"
                                                                                                                                    )
                                                                                                                                ) +
                                                                                                                                    toDisplayString(
                                                                                                                                        _ctx.$t(
                                                                                                                                            "packing"
                                                                                                                                        )
                                                                                                                                    ),
                                                                                                                                1
                                                                                                                            ),
                                                                                                                        ]
                                                                                                                    ),
                                                                                                                _: 1,
                                                                                                            },
                                                                                                            8,
                                                                                                            [
                                                                                                                "onClick",
                                                                                                                "disabled",
                                                                                                            ]
                                                                                                        ),
                                                                                                        createVNode(
                                                                                                            _component_CButton,
                                                                                                            {
                                                                                                                color: "primary",
                                                                                                                size: "sm",
                                                                                                                onClick:
                                                                                                                    $options.exportMailerInfo,
                                                                                                                disabled:
                                                                                                                    $data.loading,
                                                                                                            },
                                                                                                            {
                                                                                                                default:
                                                                                                                    withCtx(
                                                                                                                        () => [
                                                                                                                            createTextVNode(
                                                                                                                                toDisplayString(
                                                                                                                                    _ctx.$t(
                                                                                                                                        "button.export"
                                                                                                                                    )
                                                                                                                                ) +
                                                                                                                                    toDisplayString(
                                                                                                                                        _ctx.$t(
                                                                                                                                            "mailerinfo"
                                                                                                                                        )
                                                                                                                                    ),
                                                                                                                                1
                                                                                                                            ),
                                                                                                                        ]
                                                                                                                    ),
                                                                                                                _: 1,
                                                                                                            },
                                                                                                            8,
                                                                                                            [
                                                                                                                "onClick",
                                                                                                                "disabled",
                                                                                                            ]
                                                                                                        ),
                                                                                                        createVNode(
                                                                                                            _component_CButton,
                                                                                                            {
                                                                                                                color: "primary",
                                                                                                                size: "sm",
                                                                                                                onClick:
                                                                                                                    $options.download,
                                                                                                                disabled:
                                                                                                                    $data.loading,
                                                                                                            },
                                                                                                            {
                                                                                                                default:
                                                                                                                    withCtx(
                                                                                                                        () => [
                                                                                                                            createVNode(
                                                                                                                                _component_CIcon,
                                                                                                                                {
                                                                                                                                    name: "cil-cloud-download",
                                                                                                                                    size: "sm",
                                                                                                                                }
                                                                                                                            ),
                                                                                                                        ]
                                                                                                                    ),
                                                                                                                _: 1,
                                                                                                            },
                                                                                                            8,
                                                                                                            [
                                                                                                                "onClick",
                                                                                                                "disabled",
                                                                                                            ]
                                                                                                        ),
                                                                                                        createVNode(
                                                                                                            _component_CButton,
                                                                                                            {
                                                                                                                color: "primary",
                                                                                                                size: "sm",
                                                                                                                onClick:
                                                                                                                    $options.reload,
                                                                                                                disabled:
                                                                                                                    $data.loading,
                                                                                                            },
                                                                                                            {
                                                                                                                default:
                                                                                                                    withCtx(
                                                                                                                        () => [
                                                                                                                            createVNode(
                                                                                                                                _component_CIcon,
                                                                                                                                {
                                                                                                                                    name: "cil-reload",
                                                                                                                                    size: "sm",
                                                                                                                                }
                                                                                                                            ),
                                                                                                                        ]
                                                                                                                    ),
                                                                                                                _: 1,
                                                                                                            },
                                                                                                            8,
                                                                                                            [
                                                                                                                "onClick",
                                                                                                                "disabled",
                                                                                                            ]
                                                                                                        ),
                                                                                                    ];
                                                                                                }
                                                                                            }
                                                                                        ),
                                                                                    _: 1,
                                                                                },
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                    } else {
                                                                        return [
                                                                            createVNode(
                                                                                _component_CCol,
                                                                                {
                                                                                    class: "text-right",
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            () => [
                                                                                                createVNode(
                                                                                                    _component_CButton,
                                                                                                    {
                                                                                                        color: "primary",
                                                                                                        size: "sm",
                                                                                                        onClick:
                                                                                                            $options.exportPackingInfo,
                                                                                                        disabled:
                                                                                                            $data.loading,
                                                                                                    },
                                                                                                    {
                                                                                                        default:
                                                                                                            withCtx(
                                                                                                                () => [
                                                                                                                    createTextVNode(
                                                                                                                        toDisplayString(
                                                                                                                            _ctx.$t(
                                                                                                                                "button.export"
                                                                                                                            )
                                                                                                                        ) +
                                                                                                                            toDisplayString(
                                                                                                                                _ctx.$t(
                                                                                                                                    "packing"
                                                                                                                                )
                                                                                                                            ),
                                                                                                                        1
                                                                                                                    ),
                                                                                                                ]
                                                                                                            ),
                                                                                                        _: 1,
                                                                                                    },
                                                                                                    8,
                                                                                                    [
                                                                                                        "onClick",
                                                                                                        "disabled",
                                                                                                    ]
                                                                                                ),
                                                                                                createVNode(
                                                                                                    _component_CButton,
                                                                                                    {
                                                                                                        color: "primary",
                                                                                                        size: "sm",
                                                                                                        onClick:
                                                                                                            $options.exportMailerInfo,
                                                                                                        disabled:
                                                                                                            $data.loading,
                                                                                                    },
                                                                                                    {
                                                                                                        default:
                                                                                                            withCtx(
                                                                                                                () => [
                                                                                                                    createTextVNode(
                                                                                                                        toDisplayString(
                                                                                                                            _ctx.$t(
                                                                                                                                "button.export"
                                                                                                                            )
                                                                                                                        ) +
                                                                                                                            toDisplayString(
                                                                                                                                _ctx.$t(
                                                                                                                                    "mailerinfo"
                                                                                                                                )
                                                                                                                            ),
                                                                                                                        1
                                                                                                                    ),
                                                                                                                ]
                                                                                                            ),
                                                                                                        _: 1,
                                                                                                    },
                                                                                                    8,
                                                                                                    [
                                                                                                        "onClick",
                                                                                                        "disabled",
                                                                                                    ]
                                                                                                ),
                                                                                                createVNode(
                                                                                                    _component_CButton,
                                                                                                    {
                                                                                                        color: "primary",
                                                                                                        size: "sm",
                                                                                                        onClick:
                                                                                                            $options.download,
                                                                                                        disabled:
                                                                                                            $data.loading,
                                                                                                    },
                                                                                                    {
                                                                                                        default:
                                                                                                            withCtx(
                                                                                                                () => [
                                                                                                                    createVNode(
                                                                                                                        _component_CIcon,
                                                                                                                        {
                                                                                                                            name: "cil-cloud-download",
                                                                                                                            size: "sm",
                                                                                                                        }
                                                                                                                    ),
                                                                                                                ]
                                                                                                            ),
                                                                                                        _: 1,
                                                                                                    },
                                                                                                    8,
                                                                                                    [
                                                                                                        "onClick",
                                                                                                        "disabled",
                                                                                                    ]
                                                                                                ),
                                                                                                createVNode(
                                                                                                    _component_CButton,
                                                                                                    {
                                                                                                        color: "primary",
                                                                                                        size: "sm",
                                                                                                        onClick:
                                                                                                            $options.reload,
                                                                                                        disabled:
                                                                                                            $data.loading,
                                                                                                    },
                                                                                                    {
                                                                                                        default:
                                                                                                            withCtx(
                                                                                                                () => [
                                                                                                                    createVNode(
                                                                                                                        _component_CIcon,
                                                                                                                        {
                                                                                                                            name: "cil-reload",
                                                                                                                            size: "sm",
                                                                                                                        }
                                                                                                                    ),
                                                                                                                ]
                                                                                                            ),
                                                                                                        _: 1,
                                                                                                    },
                                                                                                    8,
                                                                                                    [
                                                                                                        "onClick",
                                                                                                        "disabled",
                                                                                                    ]
                                                                                                ),
                                                                                            ]
                                                                                        ),
                                                                                    _: 1,
                                                                                }
                                                                            ),
                                                                        ];
                                                                    }
                                                                }
                                                            ),
                                                            _: 1,
                                                        },
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                                _push3(
                                                    ssrRenderComponent(
                                                        _component_CRow,
                                                        { class: "p-2" },
                                                        {
                                                            default: withCtx(
                                                                (
                                                                    _3,
                                                                    _push4,
                                                                    _parent4,
                                                                    _scopeId3
                                                                ) => {
                                                                    if (
                                                                        _push4
                                                                    ) {
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CCol,
                                                                                null,
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            (
                                                                                                _4,
                                                                                                _push5,
                                                                                                _parent5,
                                                                                                _scopeId4
                                                                                            ) => {
                                                                                                if (
                                                                                                    _push5
                                                                                                ) {
                                                                                                    _push5(
                                                                                                        `<img src="/images/logo-named.png" width="128"${_scopeId4}>`
                                                                                                    );
                                                                                                } else {
                                                                                                    return [
                                                                                                        createVNode(
                                                                                                            "img",
                                                                                                            {
                                                                                                                src: "/images/logo-named.png",
                                                                                                                width: "128",
                                                                                                            }
                                                                                                        ),
                                                                                                    ];
                                                                                                }
                                                                                            }
                                                                                        ),
                                                                                    _: 1,
                                                                                },
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CCol,
                                                                                {
                                                                                    md: "7",
                                                                                    sm: "7",
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            (
                                                                                                _4,
                                                                                                _push5,
                                                                                                _parent5,
                                                                                                _scopeId4
                                                                                            ) => {
                                                                                                if (
                                                                                                    _push5
                                                                                                ) {
                                                                                                    _push5(
                                                                                                        `<h4${_scopeId4}>Unstoppable Trading Co. Ltd</h4><h4${_scopeId4}>永行貿易有限公司</h4>`
                                                                                                    );
                                                                                                } else {
                                                                                                    return [
                                                                                                        createVNode(
                                                                                                            "h4",
                                                                                                            null,
                                                                                                            "Unstoppable Trading Co. Ltd"
                                                                                                        ),
                                                                                                        createVNode(
                                                                                                            "h4",
                                                                                                            null,
                                                                                                            "永行貿易有限公司"
                                                                                                        ),
                                                                                                    ];
                                                                                                }
                                                                                            }
                                                                                        ),
                                                                                    _: 1,
                                                                                },
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CCol,
                                                                                {
                                                                                    class: "text-right",
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            (
                                                                                                _4,
                                                                                                _push5,
                                                                                                _parent5,
                                                                                                _scopeId4
                                                                                            ) => {
                                                                                                if (
                                                                                                    _push5
                                                                                                ) {
                                                                                                    _push5(
                                                                                                        `<h4${_scopeId4}>${ssrInterpolate(
                                                                                                            _ctx.$t(
                                                                                                                "shipping.invoice"
                                                                                                            )
                                                                                                        )}</h4>`
                                                                                                    );
                                                                                                } else {
                                                                                                    return [
                                                                                                        createVNode(
                                                                                                            "h4",
                                                                                                            null,
                                                                                                            toDisplayString(
                                                                                                                _ctx.$t(
                                                                                                                    "shipping.invoice"
                                                                                                                )
                                                                                                            ),
                                                                                                            1
                                                                                                        ),
                                                                                                    ];
                                                                                                }
                                                                                            }
                                                                                        ),
                                                                                    _: 1,
                                                                                },
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                    } else {
                                                                        return [
                                                                            createVNode(
                                                                                _component_CCol,
                                                                                null,
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            () => [
                                                                                                createVNode(
                                                                                                    "img",
                                                                                                    {
                                                                                                        src: "/images/logo-named.png",
                                                                                                        width: "128",
                                                                                                    }
                                                                                                ),
                                                                                            ]
                                                                                        ),
                                                                                    _: 1,
                                                                                }
                                                                            ),
                                                                            createVNode(
                                                                                _component_CCol,
                                                                                {
                                                                                    md: "7",
                                                                                    sm: "7",
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            () => [
                                                                                                createVNode(
                                                                                                    "h4",
                                                                                                    null,
                                                                                                    "Unstoppable Trading Co. Ltd"
                                                                                                ),
                                                                                                createVNode(
                                                                                                    "h4",
                                                                                                    null,
                                                                                                    "永行貿易有限公司"
                                                                                                ),
                                                                                            ]
                                                                                        ),
                                                                                    _: 1,
                                                                                }
                                                                            ),
                                                                            createVNode(
                                                                                _component_CCol,
                                                                                {
                                                                                    class: "text-right",
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            () => [
                                                                                                createVNode(
                                                                                                    "h4",
                                                                                                    null,
                                                                                                    toDisplayString(
                                                                                                        _ctx.$t(
                                                                                                            "shipping.invoice"
                                                                                                        )
                                                                                                    ),
                                                                                                    1
                                                                                                ),
                                                                                            ]
                                                                                        ),
                                                                                    _: 1,
                                                                                }
                                                                            ),
                                                                        ];
                                                                    }
                                                                }
                                                            ),
                                                            _: 1,
                                                        },
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                                _push3(
                                                    ssrRenderComponent(
                                                        VDataTable,
                                                        {
                                                            class: "my-4 elevation-1 my-table",
                                                            headers:
                                                                $data.table
                                                                    .header
                                                                    .headers,
                                                            items: $options.headerItems,
                                                            "hide-default-footer":
                                                                "",
                                                            "hide-default-header":
                                                                "",
                                                            "mobile-breakpoint": 0,
                                                        },
                                                        null,
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                                _push3(
                                                    ssrRenderComponent(
                                                        _component_CRow,
                                                        { class: "p-2" },
                                                        {
                                                            default: withCtx(
                                                                (
                                                                    _3,
                                                                    _push4,
                                                                    _parent4,
                                                                    _scopeId3
                                                                ) => {
                                                                    if (
                                                                        _push4
                                                                    ) {
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CCol,
                                                                                null,
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            (
                                                                                                _4,
                                                                                                _push5,
                                                                                                _parent5,
                                                                                                _scopeId4
                                                                                            ) => {
                                                                                                if (
                                                                                                    _push5
                                                                                                ) {
                                                                                                    _push5(
                                                                                                        ssrRenderComponent(
                                                                                                            _component_CInput,
                                                                                                            {
                                                                                                                size: "sm",
                                                                                                                modelValue:
                                                                                                                    $data.search,
                                                                                                                "onUpdate:modelValue":
                                                                                                                    (
                                                                                                                        $event
                                                                                                                    ) =>
                                                                                                                        ($data.search =
                                                                                                                            $event),
                                                                                                                onKeyup:
                                                                                                                    $data.search,
                                                                                                            },
                                                                                                            {
                                                                                                                prepend:
                                                                                                                    withCtx(
                                                                                                                        (
                                                                                                                            _5,
                                                                                                                            _push6,
                                                                                                                            _parent6,
                                                                                                                            _scopeId5
                                                                                                                        ) => {
                                                                                                                            if (
                                                                                                                                _push6
                                                                                                                            ) {
                                                                                                                                _push6(
                                                                                                                                    ssrRenderComponent(
                                                                                                                                        _component_CButton,
                                                                                                                                        {
                                                                                                                                            color: "primary",
                                                                                                                                            size: "sm",
                                                                                                                                            onClick:
                                                                                                                                                $data.search,
                                                                                                                                            disabled:
                                                                                                                                                $data.loading,
                                                                                                                                        },
                                                                                                                                        {
                                                                                                                                            default:
                                                                                                                                                withCtx(
                                                                                                                                                    (
                                                                                                                                                        _6,
                                                                                                                                                        _push7,
                                                                                                                                                        _parent7,
                                                                                                                                                        _scopeId6
                                                                                                                                                    ) => {
                                                                                                                                                        if (
                                                                                                                                                            _push7
                                                                                                                                                        ) {
                                                                                                                                                            _push7(
                                                                                                                                                                ssrRenderComponent(
                                                                                                                                                                    _component_CIcon,
                                                                                                                                                                    {
                                                                                                                                                                        name: "cil-magnifying-glass",
                                                                                                                                                                        size: "sm",
                                                                                                                                                                    },
                                                                                                                                                                    null,
                                                                                                                                                                    _parent7,
                                                                                                                                                                    _scopeId6
                                                                                                                                                                )
                                                                                                                                                            );
                                                                                                                                                        } else {
                                                                                                                                                            return [
                                                                                                                                                                createVNode(
                                                                                                                                                                    _component_CIcon,
                                                                                                                                                                    {
                                                                                                                                                                        name: "cil-magnifying-glass",
                                                                                                                                                                        size: "sm",
                                                                                                                                                                    }
                                                                                                                                                                ),
                                                                                                                                                            ];
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                ),
                                                                                                                                            _: 1,
                                                                                                                                        },
                                                                                                                                        _parent6,
                                                                                                                                        _scopeId5
                                                                                                                                    )
                                                                                                                                );
                                                                                                                            } else {
                                                                                                                                return [
                                                                                                                                    createVNode(
                                                                                                                                        _component_CButton,
                                                                                                                                        {
                                                                                                                                            color: "primary",
                                                                                                                                            size: "sm",
                                                                                                                                            onClick:
                                                                                                                                                $data.search,
                                                                                                                                            disabled:
                                                                                                                                                $data.loading,
                                                                                                                                        },
                                                                                                                                        {
                                                                                                                                            default:
                                                                                                                                                withCtx(
                                                                                                                                                    () => [
                                                                                                                                                        createVNode(
                                                                                                                                                            _component_CIcon,
                                                                                                                                                            {
                                                                                                                                                                name: "cil-magnifying-glass",
                                                                                                                                                                size: "sm",
                                                                                                                                                            }
                                                                                                                                                        ),
                                                                                                                                                    ]
                                                                                                                                                ),
                                                                                                                                            _: 1,
                                                                                                                                        },
                                                                                                                                        8,
                                                                                                                                        [
                                                                                                                                            "onClick",
                                                                                                                                            "disabled",
                                                                                                                                        ]
                                                                                                                                    ),
                                                                                                                                ];
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ),
                                                                                                                _: 1,
                                                                                                            },
                                                                                                            _parent5,
                                                                                                            _scopeId4
                                                                                                        )
                                                                                                    );
                                                                                                } else {
                                                                                                    return [
                                                                                                        createVNode(
                                                                                                            _component_CInput,
                                                                                                            {
                                                                                                                size: "sm",
                                                                                                                modelValue:
                                                                                                                    $data.search,
                                                                                                                "onUpdate:modelValue":
                                                                                                                    (
                                                                                                                        $event
                                                                                                                    ) =>
                                                                                                                        ($data.search =
                                                                                                                            $event),
                                                                                                                onKeyup:
                                                                                                                    withKeys(
                                                                                                                        $data.search,
                                                                                                                        [
                                                                                                                            "enter",
                                                                                                                        ]
                                                                                                                    ),
                                                                                                            },
                                                                                                            {
                                                                                                                prepend:
                                                                                                                    withCtx(
                                                                                                                        () => [
                                                                                                                            createVNode(
                                                                                                                                _component_CButton,
                                                                                                                                {
                                                                                                                                    color: "primary",
                                                                                                                                    size: "sm",
                                                                                                                                    onClick:
                                                                                                                                        $data.search,
                                                                                                                                    disabled:
                                                                                                                                        $data.loading,
                                                                                                                                },
                                                                                                                                {
                                                                                                                                    default:
                                                                                                                                        withCtx(
                                                                                                                                            () => [
                                                                                                                                                createVNode(
                                                                                                                                                    _component_CIcon,
                                                                                                                                                    {
                                                                                                                                                        name: "cil-magnifying-glass",
                                                                                                                                                        size: "sm",
                                                                                                                                                    }
                                                                                                                                                ),
                                                                                                                                            ]
                                                                                                                                        ),
                                                                                                                                    _: 1,
                                                                                                                                },
                                                                                                                                8,
                                                                                                                                [
                                                                                                                                    "onClick",
                                                                                                                                    "disabled",
                                                                                                                                ]
                                                                                                                            ),
                                                                                                                        ]
                                                                                                                    ),
                                                                                                                _: 1,
                                                                                                            },
                                                                                                            8,
                                                                                                            [
                                                                                                                "modelValue",
                                                                                                                "onUpdate:modelValue",
                                                                                                                "onKeyup",
                                                                                                            ]
                                                                                                        ),
                                                                                                    ];
                                                                                                }
                                                                                            }
                                                                                        ),
                                                                                    _: 1,
                                                                                },
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                    } else {
                                                                        return [
                                                                            createVNode(
                                                                                _component_CCol,
                                                                                null,
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            () => [
                                                                                                createVNode(
                                                                                                    _component_CInput,
                                                                                                    {
                                                                                                        size: "sm",
                                                                                                        modelValue:
                                                                                                            $data.search,
                                                                                                        "onUpdate:modelValue":
                                                                                                            (
                                                                                                                $event
                                                                                                            ) =>
                                                                                                                ($data.search =
                                                                                                                    $event),
                                                                                                        onKeyup:
                                                                                                            withKeys(
                                                                                                                $data.search,
                                                                                                                [
                                                                                                                    "enter",
                                                                                                                ]
                                                                                                            ),
                                                                                                    },
                                                                                                    {
                                                                                                        prepend:
                                                                                                            withCtx(
                                                                                                                () => [
                                                                                                                    createVNode(
                                                                                                                        _component_CButton,
                                                                                                                        {
                                                                                                                            color: "primary",
                                                                                                                            size: "sm",
                                                                                                                            onClick:
                                                                                                                                $data.search,
                                                                                                                            disabled:
                                                                                                                                $data.loading,
                                                                                                                        },
                                                                                                                        {
                                                                                                                            default:
                                                                                                                                withCtx(
                                                                                                                                    () => [
                                                                                                                                        createVNode(
                                                                                                                                            _component_CIcon,
                                                                                                                                            {
                                                                                                                                                name: "cil-magnifying-glass",
                                                                                                                                                size: "sm",
                                                                                                                                            }
                                                                                                                                        ),
                                                                                                                                    ]
                                                                                                                                ),
                                                                                                                            _: 1,
                                                                                                                        },
                                                                                                                        8,
                                                                                                                        [
                                                                                                                            "onClick",
                                                                                                                            "disabled",
                                                                                                                        ]
                                                                                                                    ),
                                                                                                                ]
                                                                                                            ),
                                                                                                        _: 1,
                                                                                                    },
                                                                                                    8,
                                                                                                    [
                                                                                                        "modelValue",
                                                                                                        "onUpdate:modelValue",
                                                                                                        "onKeyup",
                                                                                                    ]
                                                                                                ),
                                                                                            ]
                                                                                        ),
                                                                                    _: 1,
                                                                                }
                                                                            ),
                                                                        ];
                                                                    }
                                                                }
                                                            ),
                                                            _: 1,
                                                        },
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                                _push3(
                                                    ssrRenderComponent(
                                                        VDataTable,
                                                        {
                                                            class: "my-2 elevation-1",
                                                            headers:
                                                                $data.table.item
                                                                    .headers,
                                                            items: _ctx.shipItems,
                                                            search: $data.search,
                                                            "mobile-breakpoint": 0,
                                                        },
                                                        {
                                                            body: withCtx(
                                                                (
                                                                    {
                                                                        items,
                                                                        headers,
                                                                    },
                                                                    _push4,
                                                                    _parent4,
                                                                    _scopeId3
                                                                ) => {
                                                                    if (
                                                                        _push4
                                                                    ) {
                                                                        _push4(
                                                                            `<tbody${_scopeId3}><!--[-->`
                                                                        );
                                                                        ssrRenderList(
                                                                            items,
                                                                            (
                                                                                item,
                                                                                idx
                                                                            ) => {
                                                                                _push4(
                                                                                    `<tr${_scopeId3}><!--[-->`
                                                                                );
                                                                                ssrRenderList(
                                                                                    headers,
                                                                                    (
                                                                                        header,
                                                                                        key
                                                                                    ) => {
                                                                                        _push4(
                                                                                            `<td${_scopeId3}>`
                                                                                        );
                                                                                        if (
                                                                                            $options.isRowEditable(
                                                                                                header.value
                                                                                            ) &&
                                                                                            item[
                                                                                                header
                                                                                                    .value
                                                                                            ]
                                                                                        ) {
                                                                                            _push4(
                                                                                                `<div${_scopeId3}>`
                                                                                            );
                                                                                            if (
                                                                                                $options
                                                                                                    .data
                                                                                                    .status ===
                                                                                                "DELIVERED"
                                                                                            ) {
                                                                                                _push4(
                                                                                                    `<div${_scopeId3}>${ssrInterpolate(
                                                                                                        item[
                                                                                                            header
                                                                                                                .value
                                                                                                        ]
                                                                                                            .unit
                                                                                                    )}</div>`
                                                                                                );
                                                                                            } else {
                                                                                                _push4(
                                                                                                    `<div${_scopeId3}>`
                                                                                                );
                                                                                                _push4(
                                                                                                    ssrRenderComponent(
                                                                                                        _component_v_edit_dialog,
                                                                                                        {
                                                                                                            "return-value":
                                                                                                                item[
                                                                                                                    header
                                                                                                                        .value
                                                                                                                ]
                                                                                                                    .unit,
                                                                                                            onSave: (
                                                                                                                $event
                                                                                                            ) =>
                                                                                                                $options.save(
                                                                                                                    item[
                                                                                                                        "id"
                                                                                                                    ] -
                                                                                                                        1
                                                                                                                ),
                                                                                                            "save-text":
                                                                                                                _ctx.$t(
                                                                                                                    "button.confirm"
                                                                                                                ),
                                                                                                            "cancel-text":
                                                                                                                _ctx.$t(
                                                                                                                    "button.cancel"
                                                                                                                ),
                                                                                                            large: "",
                                                                                                        },
                                                                                                        {
                                                                                                            input: withCtx(
                                                                                                                (
                                                                                                                    _3,
                                                                                                                    _push5,
                                                                                                                    _parent5,
                                                                                                                    _scopeId4
                                                                                                                ) => {
                                                                                                                    if (
                                                                                                                        _push5
                                                                                                                    ) {
                                                                                                                        _push5(
                                                                                                                            ssrRenderComponent(
                                                                                                                                _component_vue_number_input,
                                                                                                                                {
                                                                                                                                    class: "m-4",
                                                                                                                                    size: "small",
                                                                                                                                    modelValue:
                                                                                                                                        item[
                                                                                                                                            header
                                                                                                                                                .value
                                                                                                                                        ]
                                                                                                                                            .unit,
                                                                                                                                    "onUpdate:modelValue":
                                                                                                                                        (
                                                                                                                                            $event
                                                                                                                                        ) =>
                                                                                                                                            (item[
                                                                                                                                                header.value
                                                                                                                                            ].unit =
                                                                                                                                                $event),
                                                                                                                                    min: 0,
                                                                                                                                    max: item[
                                                                                                                                        header
                                                                                                                                            .value
                                                                                                                                    ]
                                                                                                                                        .stock_unit,
                                                                                                                                    inline: "",
                                                                                                                                    center: "",
                                                                                                                                    controls:
                                                                                                                                        "",
                                                                                                                                },
                                                                                                                                null,
                                                                                                                                _parent5,
                                                                                                                                _scopeId4
                                                                                                                            )
                                                                                                                        );
                                                                                                                    } else {
                                                                                                                        return [
                                                                                                                            createVNode(
                                                                                                                                _component_vue_number_input,
                                                                                                                                {
                                                                                                                                    class: "m-4",
                                                                                                                                    size: "small",
                                                                                                                                    modelValue:
                                                                                                                                        item[
                                                                                                                                            header
                                                                                                                                                .value
                                                                                                                                        ]
                                                                                                                                            .unit,
                                                                                                                                    "onUpdate:modelValue":
                                                                                                                                        (
                                                                                                                                            $event
                                                                                                                                        ) =>
                                                                                                                                            (item[
                                                                                                                                                header.value
                                                                                                                                            ].unit =
                                                                                                                                                $event),
                                                                                                                                    min: 0,
                                                                                                                                    max: item[
                                                                                                                                        header
                                                                                                                                            .value
                                                                                                                                    ]
                                                                                                                                        .stock_unit,
                                                                                                                                    inline: "",
                                                                                                                                    center: "",
                                                                                                                                    controls:
                                                                                                                                        "",
                                                                                                                                },
                                                                                                                                null,
                                                                                                                                8,
                                                                                                                                [
                                                                                                                                    "modelValue",
                                                                                                                                    "onUpdate:modelValue",
                                                                                                                                    "max",
                                                                                                                                ]
                                                                                                                            ),
                                                                                                                        ];
                                                                                                                    }
                                                                                                                }
                                                                                                            ),
                                                                                                            default:
                                                                                                                withCtx(
                                                                                                                    (
                                                                                                                        _3,
                                                                                                                        _push5,
                                                                                                                        _parent5,
                                                                                                                        _scopeId4
                                                                                                                    ) => {
                                                                                                                        if (
                                                                                                                            _push5
                                                                                                                        ) {
                                                                                                                            _push5(
                                                                                                                                `${ssrInterpolate(
                                                                                                                                    item[
                                                                                                                                        header
                                                                                                                                            .value
                                                                                                                                    ]
                                                                                                                                        .unit
                                                                                                                                )} `
                                                                                                                            );
                                                                                                                        } else {
                                                                                                                            return [
                                                                                                                                createTextVNode(
                                                                                                                                    toDisplayString(
                                                                                                                                        item[
                                                                                                                                            header
                                                                                                                                                .value
                                                                                                                                        ]
                                                                                                                                            .unit
                                                                                                                                    ) +
                                                                                                                                        " ",
                                                                                                                                    1
                                                                                                                                ),
                                                                                                                            ];
                                                                                                                        }
                                                                                                                    }
                                                                                                                ),
                                                                                                            _: 2,
                                                                                                        },
                                                                                                        _parent4,
                                                                                                        _scopeId3
                                                                                                    )
                                                                                                );
                                                                                                _push4(
                                                                                                    `</div>`
                                                                                                );
                                                                                            }
                                                                                            _push4(
                                                                                                `</div>`
                                                                                            );
                                                                                        } else if (
                                                                                            $options.isRowEditable(
                                                                                                header.value
                                                                                            )
                                                                                        ) {
                                                                                            _push4(
                                                                                                `<div${_scopeId3}> － </div>`
                                                                                            );
                                                                                        } else if (
                                                                                            header.value ===
                                                                                            "actions"
                                                                                        ) {
                                                                                            _push4(
                                                                                                `<div${_scopeId3}>`
                                                                                            );
                                                                                            _push4(
                                                                                                ssrRenderComponent(
                                                                                                    _component_CButtonGroup,
                                                                                                    null,
                                                                                                    {
                                                                                                        default:
                                                                                                            withCtx(
                                                                                                                (
                                                                                                                    _3,
                                                                                                                    _push5,
                                                                                                                    _parent5,
                                                                                                                    _scopeId4
                                                                                                                ) => {
                                                                                                                    if (
                                                                                                                        _push5
                                                                                                                    ) {
                                                                                                                        _push5(
                                                                                                                            `<!--[-->`
                                                                                                                        );
                                                                                                                        ssrRenderList(
                                                                                                                            item[
                                                                                                                                header
                                                                                                                                    .value
                                                                                                                            ],
                                                                                                                            (
                                                                                                                                action
                                                                                                                            ) => {
                                                                                                                                _push5(
                                                                                                                                    ssrRenderComponent(
                                                                                                                                        _component_CButton,
                                                                                                                                        {
                                                                                                                                            key: action.key,
                                                                                                                                            color: action.color,
                                                                                                                                            disabled:
                                                                                                                                                action.disabled,
                                                                                                                                            size: "sm",
                                                                                                                                            onClick:
                                                                                                                                                (
                                                                                                                                                    $event
                                                                                                                                                ) =>
                                                                                                                                                    $options.click(
                                                                                                                                                        item,
                                                                                                                                                        action
                                                                                                                                                    ),
                                                                                                                                        },
                                                                                                                                        {
                                                                                                                                            default:
                                                                                                                                                withCtx(
                                                                                                                                                    (
                                                                                                                                                        _4,
                                                                                                                                                        _push6,
                                                                                                                                                        _parent6,
                                                                                                                                                        _scopeId5
                                                                                                                                                    ) => {
                                                                                                                                                        if (
                                                                                                                                                            _push6
                                                                                                                                                        ) {
                                                                                                                                                            _push6(
                                                                                                                                                                `${ssrInterpolate(
                                                                                                                                                                    action.title
                                                                                                                                                                )}`
                                                                                                                                                            );
                                                                                                                                                        } else {
                                                                                                                                                            return [
                                                                                                                                                                createTextVNode(
                                                                                                                                                                    toDisplayString(
                                                                                                                                                                        action.title
                                                                                                                                                                    ),
                                                                                                                                                                    1
                                                                                                                                                                ),
                                                                                                                                                            ];
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                ),
                                                                                                                                            _: 2,
                                                                                                                                        },
                                                                                                                                        _parent5,
                                                                                                                                        _scopeId4
                                                                                                                                    )
                                                                                                                                );
                                                                                                                            }
                                                                                                                        );
                                                                                                                        _push5(
                                                                                                                            `<!--]-->`
                                                                                                                        );
                                                                                                                    } else {
                                                                                                                        return [
                                                                                                                            (openBlock(
                                                                                                                                true
                                                                                                                            ),
                                                                                                                            createBlock(
                                                                                                                                Fragment,
                                                                                                                                null,
                                                                                                                                renderList(
                                                                                                                                    item[
                                                                                                                                        header
                                                                                                                                            .value
                                                                                                                                    ],
                                                                                                                                    (
                                                                                                                                        action
                                                                                                                                    ) => {
                                                                                                                                        return (
                                                                                                                                            openBlock(),
                                                                                                                                            createBlock(
                                                                                                                                                _component_CButton,
                                                                                                                                                {
                                                                                                                                                    key: action.key,
                                                                                                                                                    color: action.color,
                                                                                                                                                    disabled:
                                                                                                                                                        action.disabled,
                                                                                                                                                    size: "sm",
                                                                                                                                                    onClick:
                                                                                                                                                        (
                                                                                                                                                            $event
                                                                                                                                                        ) =>
                                                                                                                                                            $options.click(
                                                                                                                                                                item,
                                                                                                                                                                action
                                                                                                                                                            ),
                                                                                                                                                },
                                                                                                                                                {
                                                                                                                                                    default:
                                                                                                                                                        withCtx(
                                                                                                                                                            () => [
                                                                                                                                                                createTextVNode(
                                                                                                                                                                    toDisplayString(
                                                                                                                                                                        action.title
                                                                                                                                                                    ),
                                                                                                                                                                    1
                                                                                                                                                                ),
                                                                                                                                                            ]
                                                                                                                                                        ),
                                                                                                                                                    _: 2,
                                                                                                                                                },
                                                                                                                                                1032,
                                                                                                                                                [
                                                                                                                                                    "color",
                                                                                                                                                    "disabled",
                                                                                                                                                    "onClick",
                                                                                                                                                ]
                                                                                                                                            )
                                                                                                                                        );
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                                128
                                                                                                                            )),
                                                                                                                        ];
                                                                                                                    }
                                                                                                                }
                                                                                                            ),
                                                                                                        _: 2,
                                                                                                    },
                                                                                                    _parent4,
                                                                                                    _scopeId3
                                                                                                )
                                                                                            );
                                                                                            _push4(
                                                                                                `</div>`
                                                                                            );
                                                                                        } else {
                                                                                            _push4(
                                                                                                `<div${_scopeId3}>${ssrInterpolate(
                                                                                                    item[
                                                                                                        header
                                                                                                            .value
                                                                                                    ]
                                                                                                )}</div>`
                                                                                            );
                                                                                        }
                                                                                        _push4(
                                                                                            `</td>`
                                                                                        );
                                                                                    }
                                                                                );
                                                                                _push4(
                                                                                    `<!--]--></tr>`
                                                                                );
                                                                            }
                                                                        );
                                                                        _push4(
                                                                            `<!--]--></tbody>`
                                                                        );
                                                                    } else {
                                                                        return [
                                                                            createVNode(
                                                                                "tbody",
                                                                                null,
                                                                                [
                                                                                    (openBlock(
                                                                                        true
                                                                                    ),
                                                                                    createBlock(
                                                                                        Fragment,
                                                                                        null,
                                                                                        renderList(
                                                                                            items,
                                                                                            (
                                                                                                item,
                                                                                                idx
                                                                                            ) => {
                                                                                                return (
                                                                                                    openBlock(),
                                                                                                    createBlock(
                                                                                                        "tr",
                                                                                                        {
                                                                                                            key: idx,
                                                                                                        },
                                                                                                        [
                                                                                                            (openBlock(
                                                                                                                true
                                                                                                            ),
                                                                                                            createBlock(
                                                                                                                Fragment,
                                                                                                                null,
                                                                                                                renderList(
                                                                                                                    headers,
                                                                                                                    (
                                                                                                                        header,
                                                                                                                        key
                                                                                                                    ) => {
                                                                                                                        return (
                                                                                                                            openBlock(),
                                                                                                                            createBlock(
                                                                                                                                "td",
                                                                                                                                {
                                                                                                                                    key,
                                                                                                                                },
                                                                                                                                [
                                                                                                                                    $options.isRowEditable(
                                                                                                                                        header.value
                                                                                                                                    ) &&
                                                                                                                                    item[
                                                                                                                                        header
                                                                                                                                            .value
                                                                                                                                    ]
                                                                                                                                        ? (openBlock(),
                                                                                                                                          createBlock(
                                                                                                                                              "div",
                                                                                                                                              {
                                                                                                                                                  key: 0,
                                                                                                                                              },
                                                                                                                                              [
                                                                                                                                                  $options
                                                                                                                                                      .data
                                                                                                                                                      .status ===
                                                                                                                                                  "DELIVERED"
                                                                                                                                                      ? (openBlock(),
                                                                                                                                                        createBlock(
                                                                                                                                                            "div",
                                                                                                                                                            {
                                                                                                                                                                key: 0,
                                                                                                                                                            },
                                                                                                                                                            toDisplayString(
                                                                                                                                                                item[
                                                                                                                                                                    header
                                                                                                                                                                        .value
                                                                                                                                                                ]
                                                                                                                                                                    .unit
                                                                                                                                                            ),
                                                                                                                                                            1
                                                                                                                                                        ))
                                                                                                                                                      : (openBlock(),
                                                                                                                                                        createBlock(
                                                                                                                                                            "div",
                                                                                                                                                            {
                                                                                                                                                                key: 1,
                                                                                                                                                            },
                                                                                                                                                            [
                                                                                                                                                                createVNode(
                                                                                                                                                                    _component_v_edit_dialog,
                                                                                                                                                                    {
                                                                                                                                                                        "return-value":
                                                                                                                                                                            item[
                                                                                                                                                                                header
                                                                                                                                                                                    .value
                                                                                                                                                                            ]
                                                                                                                                                                                .unit,
                                                                                                                                                                        onSave: (
                                                                                                                                                                            $event
                                                                                                                                                                        ) =>
                                                                                                                                                                            $options.save(
                                                                                                                                                                                item[
                                                                                                                                                                                    "id"
                                                                                                                                                                                ] -
                                                                                                                                                                                    1
                                                                                                                                                                            ),
                                                                                                                                                                        "save-text":
                                                                                                                                                                            _ctx.$t(
                                                                                                                                                                                "button.confirm"
                                                                                                                                                                            ),
                                                                                                                                                                        "cancel-text":
                                                                                                                                                                            _ctx.$t(
                                                                                                                                                                                "button.cancel"
                                                                                                                                                                            ),
                                                                                                                                                                        large: "",
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        input: withCtx(
                                                                                                                                                                            () => [
                                                                                                                                                                                createVNode(
                                                                                                                                                                                    _component_vue_number_input,
                                                                                                                                                                                    {
                                                                                                                                                                                        class: "m-4",
                                                                                                                                                                                        size: "small",
                                                                                                                                                                                        modelValue:
                                                                                                                                                                                            item[
                                                                                                                                                                                                header
                                                                                                                                                                                                    .value
                                                                                                                                                                                            ]
                                                                                                                                                                                                .unit,
                                                                                                                                                                                        "onUpdate:modelValue":
                                                                                                                                                                                            (
                                                                                                                                                                                                $event
                                                                                                                                                                                            ) =>
                                                                                                                                                                                                (item[
                                                                                                                                                                                                    header.value
                                                                                                                                                                                                ].unit =
                                                                                                                                                                                                    $event),
                                                                                                                                                                                        min: 0,
                                                                                                                                                                                        max: item[
                                                                                                                                                                                            header
                                                                                                                                                                                                .value
                                                                                                                                                                                        ]
                                                                                                                                                                                            .stock_unit,
                                                                                                                                                                                        inline: "",
                                                                                                                                                                                        center: "",
                                                                                                                                                                                        controls:
                                                                                                                                                                                            "",
                                                                                                                                                                                    },
                                                                                                                                                                                    null,
                                                                                                                                                                                    8,
                                                                                                                                                                                    [
                                                                                                                                                                                        "modelValue",
                                                                                                                                                                                        "onUpdate:modelValue",
                                                                                                                                                                                        "max",
                                                                                                                                                                                    ]
                                                                                                                                                                                ),
                                                                                                                                                                            ]
                                                                                                                                                                        ),
                                                                                                                                                                        default:
                                                                                                                                                                            withCtx(
                                                                                                                                                                                () => [
                                                                                                                                                                                    createTextVNode(
                                                                                                                                                                                        toDisplayString(
                                                                                                                                                                                            item[
                                                                                                                                                                                                header
                                                                                                                                                                                                    .value
                                                                                                                                                                                            ]
                                                                                                                                                                                                .unit
                                                                                                                                                                                        ) +
                                                                                                                                                                                            " ",
                                                                                                                                                                                        1
                                                                                                                                                                                    ),
                                                                                                                                                                                ]
                                                                                                                                                                            ),
                                                                                                                                                                        _: 2,
                                                                                                                                                                    },
                                                                                                                                                                    1032,
                                                                                                                                                                    [
                                                                                                                                                                        "return-value",
                                                                                                                                                                        "onSave",
                                                                                                                                                                        "save-text",
                                                                                                                                                                        "cancel-text",
                                                                                                                                                                    ]
                                                                                                                                                                ),
                                                                                                                                                            ]
                                                                                                                                                        )),
                                                                                                                                              ]
                                                                                                                                          ))
                                                                                                                                        : $options.isRowEditable(
                                                                                                                                              header.value
                                                                                                                                          )
                                                                                                                                        ? (openBlock(),
                                                                                                                                          createBlock(
                                                                                                                                              "div",
                                                                                                                                              {
                                                                                                                                                  key: 1,
                                                                                                                                              },
                                                                                                                                              " － "
                                                                                                                                          ))
                                                                                                                                        : header.value ===
                                                                                                                                          "actions"
                                                                                                                                        ? (openBlock(),
                                                                                                                                          createBlock(
                                                                                                                                              "div",
                                                                                                                                              {
                                                                                                                                                  key: 2,
                                                                                                                                              },
                                                                                                                                              [
                                                                                                                                                  createVNode(
                                                                                                                                                      _component_CButtonGroup,
                                                                                                                                                      null,
                                                                                                                                                      {
                                                                                                                                                          default:
                                                                                                                                                              withCtx(
                                                                                                                                                                  () => [
                                                                                                                                                                      (openBlock(
                                                                                                                                                                          true
                                                                                                                                                                      ),
                                                                                                                                                                      createBlock(
                                                                                                                                                                          Fragment,
                                                                                                                                                                          null,
                                                                                                                                                                          renderList(
                                                                                                                                                                              item[
                                                                                                                                                                                  header
                                                                                                                                                                                      .value
                                                                                                                                                                              ],
                                                                                                                                                                              (
                                                                                                                                                                                  action
                                                                                                                                                                              ) => {
                                                                                                                                                                                  return (
                                                                                                                                                                                      openBlock(),
                                                                                                                                                                                      createBlock(
                                                                                                                                                                                          _component_CButton,
                                                                                                                                                                                          {
                                                                                                                                                                                              key: action.key,
                                                                                                                                                                                              color: action.color,
                                                                                                                                                                                              disabled:
                                                                                                                                                                                                  action.disabled,
                                                                                                                                                                                              size: "sm",
                                                                                                                                                                                              onClick:
                                                                                                                                                                                                  (
                                                                                                                                                                                                      $event
                                                                                                                                                                                                  ) =>
                                                                                                                                                                                                      $options.click(
                                                                                                                                                                                                          item,
                                                                                                                                                                                                          action
                                                                                                                                                                                                      ),
                                                                                                                                                                                          },
                                                                                                                                                                                          {
                                                                                                                                                                                              default:
                                                                                                                                                                                                  withCtx(
                                                                                                                                                                                                      () => [
                                                                                                                                                                                                          createTextVNode(
                                                                                                                                                                                                              toDisplayString(
                                                                                                                                                                                                                  action.title
                                                                                                                                                                                                              ),
                                                                                                                                                                                                              1
                                                                                                                                                                                                          ),
                                                                                                                                                                                                      ]
                                                                                                                                                                                                  ),
                                                                                                                                                                                              _: 2,
                                                                                                                                                                                          },
                                                                                                                                                                                          1032,
                                                                                                                                                                                          [
                                                                                                                                                                                              "color",
                                                                                                                                                                                              "disabled",
                                                                                                                                                                                              "onClick",
                                                                                                                                                                                          ]
                                                                                                                                                                                      )
                                                                                                                                                                                  );
                                                                                                                                                                              }
                                                                                                                                                                          ),
                                                                                                                                                                          128
                                                                                                                                                                      )),
                                                                                                                                                                  ]
                                                                                                                                                              ),
                                                                                                                                                          _: 2,
                                                                                                                                                      },
                                                                                                                                                      1024
                                                                                                                                                  ),
                                                                                                                                              ]
                                                                                                                                          ))
                                                                                                                                        : (openBlock(),
                                                                                                                                          createBlock(
                                                                                                                                              "div",
                                                                                                                                              {
                                                                                                                                                  key: 3,
                                                                                                                                              },
                                                                                                                                              toDisplayString(
                                                                                                                                                  item[
                                                                                                                                                      header
                                                                                                                                                          .value
                                                                                                                                                  ]
                                                                                                                                              ),
                                                                                                                                              1
                                                                                                                                          )),
                                                                                                                                ]
                                                                                                                            )
                                                                                                                        );
                                                                                                                    }
                                                                                                                ),
                                                                                                                128
                                                                                                            )),
                                                                                                        ]
                                                                                                    )
                                                                                                );
                                                                                            }
                                                                                        ),
                                                                                        128
                                                                                    )),
                                                                                ]
                                                                            ),
                                                                        ];
                                                                    }
                                                                }
                                                            ),
                                                            _: 1,
                                                        },
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                                _push3(
                                                    ssrRenderComponent(
                                                        VDataTable,
                                                        {
                                                            class: "my-4 elevation-1",
                                                            headers:
                                                                $data.table
                                                                    .footer
                                                                    .headers,
                                                            items: $options.footerItems,
                                                            "hide-default-footer":
                                                                "",
                                                            "mobile-breakpoint": 0,
                                                        },
                                                        null,
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                            } else {
                                                return [
                                                    createVNode(
                                                        _component_CRow,
                                                        { class: "p-2" },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CCol,
                                                                        {
                                                                            class: "text-right",
                                                                        },
                                                                        {
                                                                            default:
                                                                                withCtx(
                                                                                    () => [
                                                                                        createVNode(
                                                                                            _component_CButton,
                                                                                            {
                                                                                                color: "primary",
                                                                                                size: "sm",
                                                                                                onClick:
                                                                                                    $options.exportPackingInfo,
                                                                                                disabled:
                                                                                                    $data.loading,
                                                                                            },
                                                                                            {
                                                                                                default:
                                                                                                    withCtx(
                                                                                                        () => [
                                                                                                            createTextVNode(
                                                                                                                toDisplayString(
                                                                                                                    _ctx.$t(
                                                                                                                        "button.export"
                                                                                                                    )
                                                                                                                ) +
                                                                                                                    toDisplayString(
                                                                                                                        _ctx.$t(
                                                                                                                            "packing"
                                                                                                                        )
                                                                                                                    ),
                                                                                                                1
                                                                                                            ),
                                                                                                        ]
                                                                                                    ),
                                                                                                _: 1,
                                                                                            },
                                                                                            8,
                                                                                            [
                                                                                                "onClick",
                                                                                                "disabled",
                                                                                            ]
                                                                                        ),
                                                                                        createVNode(
                                                                                            _component_CButton,
                                                                                            {
                                                                                                color: "primary",
                                                                                                size: "sm",
                                                                                                onClick:
                                                                                                    $options.exportMailerInfo,
                                                                                                disabled:
                                                                                                    $data.loading,
                                                                                            },
                                                                                            {
                                                                                                default:
                                                                                                    withCtx(
                                                                                                        () => [
                                                                                                            createTextVNode(
                                                                                                                toDisplayString(
                                                                                                                    _ctx.$t(
                                                                                                                        "button.export"
                                                                                                                    )
                                                                                                                ) +
                                                                                                                    toDisplayString(
                                                                                                                        _ctx.$t(
                                                                                                                            "mailerinfo"
                                                                                                                        )
                                                                                                                    ),
                                                                                                                1
                                                                                                            ),
                                                                                                        ]
                                                                                                    ),
                                                                                                _: 1,
                                                                                            },
                                                                                            8,
                                                                                            [
                                                                                                "onClick",
                                                                                                "disabled",
                                                                                            ]
                                                                                        ),
                                                                                        createVNode(
                                                                                            _component_CButton,
                                                                                            {
                                                                                                color: "primary",
                                                                                                size: "sm",
                                                                                                onClick:
                                                                                                    $options.download,
                                                                                                disabled:
                                                                                                    $data.loading,
                                                                                            },
                                                                                            {
                                                                                                default:
                                                                                                    withCtx(
                                                                                                        () => [
                                                                                                            createVNode(
                                                                                                                _component_CIcon,
                                                                                                                {
                                                                                                                    name: "cil-cloud-download",
                                                                                                                    size: "sm",
                                                                                                                }
                                                                                                            ),
                                                                                                        ]
                                                                                                    ),
                                                                                                _: 1,
                                                                                            },
                                                                                            8,
                                                                                            [
                                                                                                "onClick",
                                                                                                "disabled",
                                                                                            ]
                                                                                        ),
                                                                                        createVNode(
                                                                                            _component_CButton,
                                                                                            {
                                                                                                color: "primary",
                                                                                                size: "sm",
                                                                                                onClick:
                                                                                                    $options.reload,
                                                                                                disabled:
                                                                                                    $data.loading,
                                                                                            },
                                                                                            {
                                                                                                default:
                                                                                                    withCtx(
                                                                                                        () => [
                                                                                                            createVNode(
                                                                                                                _component_CIcon,
                                                                                                                {
                                                                                                                    name: "cil-reload",
                                                                                                                    size: "sm",
                                                                                                                }
                                                                                                            ),
                                                                                                        ]
                                                                                                    ),
                                                                                                _: 1,
                                                                                            },
                                                                                            8,
                                                                                            [
                                                                                                "onClick",
                                                                                                "disabled",
                                                                                            ]
                                                                                        ),
                                                                                    ]
                                                                                ),
                                                                            _: 1,
                                                                        }
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        }
                                                    ),
                                                    createVNode(
                                                        _component_CRow,
                                                        { class: "p-2" },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CCol,
                                                                        null,
                                                                        {
                                                                            default:
                                                                                withCtx(
                                                                                    () => [
                                                                                        createVNode(
                                                                                            "img",
                                                                                            {
                                                                                                src: "/images/logo-named.png",
                                                                                                width: "128",
                                                                                            }
                                                                                        ),
                                                                                    ]
                                                                                ),
                                                                            _: 1,
                                                                        }
                                                                    ),
                                                                    createVNode(
                                                                        _component_CCol,
                                                                        {
                                                                            md: "7",
                                                                            sm: "7",
                                                                        },
                                                                        {
                                                                            default:
                                                                                withCtx(
                                                                                    () => [
                                                                                        createVNode(
                                                                                            "h4",
                                                                                            null,
                                                                                            "Unstoppable Trading Co. Ltd"
                                                                                        ),
                                                                                        createVNode(
                                                                                            "h4",
                                                                                            null,
                                                                                            "永行貿易有限公司"
                                                                                        ),
                                                                                    ]
                                                                                ),
                                                                            _: 1,
                                                                        }
                                                                    ),
                                                                    createVNode(
                                                                        _component_CCol,
                                                                        {
                                                                            class: "text-right",
                                                                        },
                                                                        {
                                                                            default:
                                                                                withCtx(
                                                                                    () => [
                                                                                        createVNode(
                                                                                            "h4",
                                                                                            null,
                                                                                            toDisplayString(
                                                                                                _ctx.$t(
                                                                                                    "shipping.invoice"
                                                                                                )
                                                                                            ),
                                                                                            1
                                                                                        ),
                                                                                    ]
                                                                                ),
                                                                            _: 1,
                                                                        }
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        }
                                                    ),
                                                    createVNode(
                                                        VDataTable,
                                                        {
                                                            class: "my-4 elevation-1 my-table",
                                                            headers:
                                                                $data.table
                                                                    .header
                                                                    .headers,
                                                            items: $options.headerItems,
                                                            "hide-default-footer":
                                                                "",
                                                            "hide-default-header":
                                                                "",
                                                            "mobile-breakpoint": 0,
                                                        },
                                                        null,
                                                        8,
                                                        ["headers", "items"]
                                                    ),
                                                    createVNode(
                                                        _component_CRow,
                                                        { class: "p-2" },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CCol,
                                                                        null,
                                                                        {
                                                                            default:
                                                                                withCtx(
                                                                                    () => [
                                                                                        createVNode(
                                                                                            _component_CInput,
                                                                                            {
                                                                                                size: "sm",
                                                                                                modelValue:
                                                                                                    $data.search,
                                                                                                "onUpdate:modelValue":
                                                                                                    (
                                                                                                        $event
                                                                                                    ) =>
                                                                                                        ($data.search =
                                                                                                            $event),
                                                                                                onKeyup:
                                                                                                    withKeys(
                                                                                                        $data.search,
                                                                                                        [
                                                                                                            "enter",
                                                                                                        ]
                                                                                                    ),
                                                                                            },
                                                                                            {
                                                                                                prepend:
                                                                                                    withCtx(
                                                                                                        () => [
                                                                                                            createVNode(
                                                                                                                _component_CButton,
                                                                                                                {
                                                                                                                    color: "primary",
                                                                                                                    size: "sm",
                                                                                                                    onClick:
                                                                                                                        $data.search,
                                                                                                                    disabled:
                                                                                                                        $data.loading,
                                                                                                                },
                                                                                                                {
                                                                                                                    default:
                                                                                                                        withCtx(
                                                                                                                            () => [
                                                                                                                                createVNode(
                                                                                                                                    _component_CIcon,
                                                                                                                                    {
                                                                                                                                        name: "cil-magnifying-glass",
                                                                                                                                        size: "sm",
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                            ]
                                                                                                                        ),
                                                                                                                    _: 1,
                                                                                                                },
                                                                                                                8,
                                                                                                                [
                                                                                                                    "onClick",
                                                                                                                    "disabled",
                                                                                                                ]
                                                                                                            ),
                                                                                                        ]
                                                                                                    ),
                                                                                                _: 1,
                                                                                            },
                                                                                            8,
                                                                                            [
                                                                                                "modelValue",
                                                                                                "onUpdate:modelValue",
                                                                                                "onKeyup",
                                                                                            ]
                                                                                        ),
                                                                                    ]
                                                                                ),
                                                                            _: 1,
                                                                        }
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        }
                                                    ),
                                                    createVNode(
                                                        VDataTable,
                                                        {
                                                            class: "my-2 elevation-1",
                                                            headers:
                                                                $data.table.item
                                                                    .headers,
                                                            items: _ctx.shipItems,
                                                            search: $data.search,
                                                            "mobile-breakpoint": 0,
                                                        },
                                                        {
                                                            body: withCtx(
                                                                ({
                                                                    items,
                                                                    headers,
                                                                }) => [
                                                                    createVNode(
                                                                        "tbody",
                                                                        null,
                                                                        [
                                                                            (openBlock(
                                                                                true
                                                                            ),
                                                                            createBlock(
                                                                                Fragment,
                                                                                null,
                                                                                renderList(
                                                                                    items,
                                                                                    (
                                                                                        item,
                                                                                        idx
                                                                                    ) => {
                                                                                        return (
                                                                                            openBlock(),
                                                                                            createBlock(
                                                                                                "tr",
                                                                                                {
                                                                                                    key: idx,
                                                                                                },
                                                                                                [
                                                                                                    (openBlock(
                                                                                                        true
                                                                                                    ),
                                                                                                    createBlock(
                                                                                                        Fragment,
                                                                                                        null,
                                                                                                        renderList(
                                                                                                            headers,
                                                                                                            (
                                                                                                                header,
                                                                                                                key
                                                                                                            ) => {
                                                                                                                return (
                                                                                                                    openBlock(),
                                                                                                                    createBlock(
                                                                                                                        "td",
                                                                                                                        {
                                                                                                                            key,
                                                                                                                        },
                                                                                                                        [
                                                                                                                            $options.isRowEditable(
                                                                                                                                header.value
                                                                                                                            ) &&
                                                                                                                            item[
                                                                                                                                header
                                                                                                                                    .value
                                                                                                                            ]
                                                                                                                                ? (openBlock(),
                                                                                                                                  createBlock(
                                                                                                                                      "div",
                                                                                                                                      {
                                                                                                                                          key: 0,
                                                                                                                                      },
                                                                                                                                      [
                                                                                                                                          $options
                                                                                                                                              .data
                                                                                                                                              .status ===
                                                                                                                                          "DELIVERED"
                                                                                                                                              ? (openBlock(),
                                                                                                                                                createBlock(
                                                                                                                                                    "div",
                                                                                                                                                    {
                                                                                                                                                        key: 0,
                                                                                                                                                    },
                                                                                                                                                    toDisplayString(
                                                                                                                                                        item[
                                                                                                                                                            header
                                                                                                                                                                .value
                                                                                                                                                        ]
                                                                                                                                                            .unit
                                                                                                                                                    ),
                                                                                                                                                    1
                                                                                                                                                ))
                                                                                                                                              : (openBlock(),
                                                                                                                                                createBlock(
                                                                                                                                                    "div",
                                                                                                                                                    {
                                                                                                                                                        key: 1,
                                                                                                                                                    },
                                                                                                                                                    [
                                                                                                                                                        createVNode(
                                                                                                                                                            _component_v_edit_dialog,
                                                                                                                                                            {
                                                                                                                                                                "return-value":
                                                                                                                                                                    item[
                                                                                                                                                                        header
                                                                                                                                                                            .value
                                                                                                                                                                    ]
                                                                                                                                                                        .unit,
                                                                                                                                                                onSave: (
                                                                                                                                                                    $event
                                                                                                                                                                ) =>
                                                                                                                                                                    $options.save(
                                                                                                                                                                        item[
                                                                                                                                                                            "id"
                                                                                                                                                                        ] -
                                                                                                                                                                            1
                                                                                                                                                                    ),
                                                                                                                                                                "save-text":
                                                                                                                                                                    _ctx.$t(
                                                                                                                                                                        "button.confirm"
                                                                                                                                                                    ),
                                                                                                                                                                "cancel-text":
                                                                                                                                                                    _ctx.$t(
                                                                                                                                                                        "button.cancel"
                                                                                                                                                                    ),
                                                                                                                                                                large: "",
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                input: withCtx(
                                                                                                                                                                    () => [
                                                                                                                                                                        createVNode(
                                                                                                                                                                            _component_vue_number_input,
                                                                                                                                                                            {
                                                                                                                                                                                class: "m-4",
                                                                                                                                                                                size: "small",
                                                                                                                                                                                modelValue:
                                                                                                                                                                                    item[
                                                                                                                                                                                        header
                                                                                                                                                                                            .value
                                                                                                                                                                                    ]
                                                                                                                                                                                        .unit,
                                                                                                                                                                                "onUpdate:modelValue":
                                                                                                                                                                                    (
                                                                                                                                                                                        $event
                                                                                                                                                                                    ) =>
                                                                                                                                                                                        (item[
                                                                                                                                                                                            header.value
                                                                                                                                                                                        ].unit =
                                                                                                                                                                                            $event),
                                                                                                                                                                                min: 0,
                                                                                                                                                                                max: item[
                                                                                                                                                                                    header
                                                                                                                                                                                        .value
                                                                                                                                                                                ]
                                                                                                                                                                                    .stock_unit,
                                                                                                                                                                                inline: "",
                                                                                                                                                                                center: "",
                                                                                                                                                                                controls:
                                                                                                                                                                                    "",
                                                                                                                                                                            },
                                                                                                                                                                            null,
                                                                                                                                                                            8,
                                                                                                                                                                            [
                                                                                                                                                                                "modelValue",
                                                                                                                                                                                "onUpdate:modelValue",
                                                                                                                                                                                "max",
                                                                                                                                                                            ]
                                                                                                                                                                        ),
                                                                                                                                                                    ]
                                                                                                                                                                ),
                                                                                                                                                                default:
                                                                                                                                                                    withCtx(
                                                                                                                                                                        () => [
                                                                                                                                                                            createTextVNode(
                                                                                                                                                                                toDisplayString(
                                                                                                                                                                                    item[
                                                                                                                                                                                        header
                                                                                                                                                                                            .value
                                                                                                                                                                                    ]
                                                                                                                                                                                        .unit
                                                                                                                                                                                ) +
                                                                                                                                                                                    " ",
                                                                                                                                                                                1
                                                                                                                                                                            ),
                                                                                                                                                                        ]
                                                                                                                                                                    ),
                                                                                                                                                                _: 2,
                                                                                                                                                            },
                                                                                                                                                            1032,
                                                                                                                                                            [
                                                                                                                                                                "return-value",
                                                                                                                                                                "onSave",
                                                                                                                                                                "save-text",
                                                                                                                                                                "cancel-text",
                                                                                                                                                            ]
                                                                                                                                                        ),
                                                                                                                                                    ]
                                                                                                                                                )),
                                                                                                                                      ]
                                                                                                                                  ))
                                                                                                                                : $options.isRowEditable(
                                                                                                                                      header.value
                                                                                                                                  )
                                                                                                                                ? (openBlock(),
                                                                                                                                  createBlock(
                                                                                                                                      "div",
                                                                                                                                      {
                                                                                                                                          key: 1,
                                                                                                                                      },
                                                                                                                                      " － "
                                                                                                                                  ))
                                                                                                                                : header.value ===
                                                                                                                                  "actions"
                                                                                                                                ? (openBlock(),
                                                                                                                                  createBlock(
                                                                                                                                      "div",
                                                                                                                                      {
                                                                                                                                          key: 2,
                                                                                                                                      },
                                                                                                                                      [
                                                                                                                                          createVNode(
                                                                                                                                              _component_CButtonGroup,
                                                                                                                                              null,
                                                                                                                                              {
                                                                                                                                                  default:
                                                                                                                                                      withCtx(
                                                                                                                                                          () => [
                                                                                                                                                              (openBlock(
                                                                                                                                                                  true
                                                                                                                                                              ),
                                                                                                                                                              createBlock(
                                                                                                                                                                  Fragment,
                                                                                                                                                                  null,
                                                                                                                                                                  renderList(
                                                                                                                                                                      item[
                                                                                                                                                                          header
                                                                                                                                                                              .value
                                                                                                                                                                      ],
                                                                                                                                                                      (
                                                                                                                                                                          action
                                                                                                                                                                      ) => {
                                                                                                                                                                          return (
                                                                                                                                                                              openBlock(),
                                                                                                                                                                              createBlock(
                                                                                                                                                                                  _component_CButton,
                                                                                                                                                                                  {
                                                                                                                                                                                      key: action.key,
                                                                                                                                                                                      color: action.color,
                                                                                                                                                                                      disabled:
                                                                                                                                                                                          action.disabled,
                                                                                                                                                                                      size: "sm",
                                                                                                                                                                                      onClick:
                                                                                                                                                                                          (
                                                                                                                                                                                              $event
                                                                                                                                                                                          ) =>
                                                                                                                                                                                              $options.click(
                                                                                                                                                                                                  item,
                                                                                                                                                                                                  action
                                                                                                                                                                                              ),
                                                                                                                                                                                  },
                                                                                                                                                                                  {
                                                                                                                                                                                      default:
                                                                                                                                                                                          withCtx(
                                                                                                                                                                                              () => [
                                                                                                                                                                                                  createTextVNode(
                                                                                                                                                                                                      toDisplayString(
                                                                                                                                                                                                          action.title
                                                                                                                                                                                                      ),
                                                                                                                                                                                                      1
                                                                                                                                                                                                  ),
                                                                                                                                                                                              ]
                                                                                                                                                                                          ),
                                                                                                                                                                                      _: 2,
                                                                                                                                                                                  },
                                                                                                                                                                                  1032,
                                                                                                                                                                                  [
                                                                                                                                                                                      "color",
                                                                                                                                                                                      "disabled",
                                                                                                                                                                                      "onClick",
                                                                                                                                                                                  ]
                                                                                                                                                                              )
                                                                                                                                                                          );
                                                                                                                                                                      }
                                                                                                                                                                  ),
                                                                                                                                                                  128
                                                                                                                                                              )),
                                                                                                                                                          ]
                                                                                                                                                      ),
                                                                                                                                                  _: 2,
                                                                                                                                              },
                                                                                                                                              1024
                                                                                                                                          ),
                                                                                                                                      ]
                                                                                                                                  ))
                                                                                                                                : (openBlock(),
                                                                                                                                  createBlock(
                                                                                                                                      "div",
                                                                                                                                      {
                                                                                                                                          key: 3,
                                                                                                                                      },
                                                                                                                                      toDisplayString(
                                                                                                                                          item[
                                                                                                                                              header
                                                                                                                                                  .value
                                                                                                                                          ]
                                                                                                                                      ),
                                                                                                                                      1
                                                                                                                                  )),
                                                                                                                        ]
                                                                                                                    )
                                                                                                                );
                                                                                                            }
                                                                                                        ),
                                                                                                        128
                                                                                                    )),
                                                                                                ]
                                                                                            )
                                                                                        );
                                                                                    }
                                                                                ),
                                                                                128
                                                                            )),
                                                                        ]
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        },
                                                        8,
                                                        [
                                                            "headers",
                                                            "items",
                                                            "search",
                                                        ]
                                                    ),
                                                    createVNode(
                                                        VDataTable,
                                                        {
                                                            class: "my-4 elevation-1",
                                                            headers:
                                                                $data.table
                                                                    .footer
                                                                    .headers,
                                                            items: $options.footerItems,
                                                            "hide-default-footer":
                                                                "",
                                                            "mobile-breakpoint": 0,
                                                        },
                                                        null,
                                                        8,
                                                        ["headers", "items"]
                                                    ),
                                                ];
                                            }
                                        }
                                    ),
                                    _: 1,
                                },
                                _parent2,
                                _scopeId
                            )
                        );
                    } else {
                        return [
                            createVNode(
                                VProgressLinear,
                                {
                                    active: $data.loading,
                                    indeterminate: "",
                                    color: "cyan",
                                },
                                null,
                                8,
                                ["active"]
                            ),
                            createVNode(_component_CCardBody, null, {
                                default: withCtx(() => [
                                    createVNode(
                                        _component_CRow,
                                        { class: "p-2" },
                                        {
                                            default: withCtx(() => [
                                                createVNode(
                                                    _component_CCol,
                                                    { class: "text-right" },
                                                    {
                                                        default: withCtx(() => [
                                                            createVNode(
                                                                _component_CButton,
                                                                {
                                                                    color: "primary",
                                                                    size: "sm",
                                                                    onClick:
                                                                        $options.exportPackingInfo,
                                                                    disabled:
                                                                        $data.loading,
                                                                },
                                                                {
                                                                    default:
                                                                        withCtx(
                                                                            () => [
                                                                                createTextVNode(
                                                                                    toDisplayString(
                                                                                        _ctx.$t(
                                                                                            "button.export"
                                                                                        )
                                                                                    ) +
                                                                                        toDisplayString(
                                                                                            _ctx.$t(
                                                                                                "packing"
                                                                                            )
                                                                                        ),
                                                                                    1
                                                                                ),
                                                                            ]
                                                                        ),
                                                                    _: 1,
                                                                },
                                                                8,
                                                                [
                                                                    "onClick",
                                                                    "disabled",
                                                                ]
                                                            ),
                                                            createVNode(
                                                                _component_CButton,
                                                                {
                                                                    color: "primary",
                                                                    size: "sm",
                                                                    onClick:
                                                                        $options.exportMailerInfo,
                                                                    disabled:
                                                                        $data.loading,
                                                                },
                                                                {
                                                                    default:
                                                                        withCtx(
                                                                            () => [
                                                                                createTextVNode(
                                                                                    toDisplayString(
                                                                                        _ctx.$t(
                                                                                            "button.export"
                                                                                        )
                                                                                    ) +
                                                                                        toDisplayString(
                                                                                            _ctx.$t(
                                                                                                "mailerinfo"
                                                                                            )
                                                                                        ),
                                                                                    1
                                                                                ),
                                                                            ]
                                                                        ),
                                                                    _: 1,
                                                                },
                                                                8,
                                                                [
                                                                    "onClick",
                                                                    "disabled",
                                                                ]
                                                            ),
                                                            createVNode(
                                                                _component_CButton,
                                                                {
                                                                    color: "primary",
                                                                    size: "sm",
                                                                    onClick:
                                                                        $options.download,
                                                                    disabled:
                                                                        $data.loading,
                                                                },
                                                                {
                                                                    default:
                                                                        withCtx(
                                                                            () => [
                                                                                createVNode(
                                                                                    _component_CIcon,
                                                                                    {
                                                                                        name: "cil-cloud-download",
                                                                                        size: "sm",
                                                                                    }
                                                                                ),
                                                                            ]
                                                                        ),
                                                                    _: 1,
                                                                },
                                                                8,
                                                                [
                                                                    "onClick",
                                                                    "disabled",
                                                                ]
                                                            ),
                                                            createVNode(
                                                                _component_CButton,
                                                                {
                                                                    color: "primary",
                                                                    size: "sm",
                                                                    onClick:
                                                                        $options.reload,
                                                                    disabled:
                                                                        $data.loading,
                                                                },
                                                                {
                                                                    default:
                                                                        withCtx(
                                                                            () => [
                                                                                createVNode(
                                                                                    _component_CIcon,
                                                                                    {
                                                                                        name: "cil-reload",
                                                                                        size: "sm",
                                                                                    }
                                                                                ),
                                                                            ]
                                                                        ),
                                                                    _: 1,
                                                                },
                                                                8,
                                                                [
                                                                    "onClick",
                                                                    "disabled",
                                                                ]
                                                            ),
                                                        ]),
                                                        _: 1,
                                                    }
                                                ),
                                            ]),
                                            _: 1,
                                        }
                                    ),
                                    createVNode(
                                        _component_CRow,
                                        { class: "p-2" },
                                        {
                                            default: withCtx(() => [
                                                createVNode(
                                                    _component_CCol,
                                                    null,
                                                    {
                                                        default: withCtx(() => [
                                                            createVNode("img", {
                                                                src: "/images/logo-named.png",
                                                                width: "128",
                                                            }),
                                                        ]),
                                                        _: 1,
                                                    }
                                                ),
                                                createVNode(
                                                    _component_CCol,
                                                    {
                                                        md: "7",
                                                        sm: "7",
                                                    },
                                                    {
                                                        default: withCtx(() => [
                                                            createVNode(
                                                                "h4",
                                                                null,
                                                                "Unstoppable Trading Co. Ltd"
                                                            ),
                                                            createVNode(
                                                                "h4",
                                                                null,
                                                                "永行貿易有限公司"
                                                            ),
                                                        ]),
                                                        _: 1,
                                                    }
                                                ),
                                                createVNode(
                                                    _component_CCol,
                                                    { class: "text-right" },
                                                    {
                                                        default: withCtx(() => [
                                                            createVNode(
                                                                "h4",
                                                                null,
                                                                toDisplayString(
                                                                    _ctx.$t(
                                                                        "shipping.invoice"
                                                                    )
                                                                ),
                                                                1
                                                            ),
                                                        ]),
                                                        _: 1,
                                                    }
                                                ),
                                            ]),
                                            _: 1,
                                        }
                                    ),
                                    createVNode(
                                        VDataTable,
                                        {
                                            class: "my-4 elevation-1 my-table",
                                            headers: $data.table.header.headers,
                                            items: $options.headerItems,
                                            "hide-default-footer": "",
                                            "hide-default-header": "",
                                            "mobile-breakpoint": 0,
                                        },
                                        null,
                                        8,
                                        ["headers", "items"]
                                    ),
                                    createVNode(
                                        _component_CRow,
                                        { class: "p-2" },
                                        {
                                            default: withCtx(() => [
                                                createVNode(
                                                    _component_CCol,
                                                    null,
                                                    {
                                                        default: withCtx(() => [
                                                            createVNode(
                                                                _component_CInput,
                                                                {
                                                                    size: "sm",
                                                                    modelValue:
                                                                        $data.search,
                                                                    "onUpdate:modelValue":
                                                                        (
                                                                            $event
                                                                        ) =>
                                                                            ($data.search =
                                                                                $event),
                                                                    onKeyup:
                                                                        withKeys(
                                                                            $data.search,
                                                                            [
                                                                                "enter",
                                                                            ]
                                                                        ),
                                                                },
                                                                {
                                                                    prepend:
                                                                        withCtx(
                                                                            () => [
                                                                                createVNode(
                                                                                    _component_CButton,
                                                                                    {
                                                                                        color: "primary",
                                                                                        size: "sm",
                                                                                        onClick:
                                                                                            $data.search,
                                                                                        disabled:
                                                                                            $data.loading,
                                                                                    },
                                                                                    {
                                                                                        default:
                                                                                            withCtx(
                                                                                                () => [
                                                                                                    createVNode(
                                                                                                        _component_CIcon,
                                                                                                        {
                                                                                                            name: "cil-magnifying-glass",
                                                                                                            size: "sm",
                                                                                                        }
                                                                                                    ),
                                                                                                ]
                                                                                            ),
                                                                                        _: 1,
                                                                                    },
                                                                                    8,
                                                                                    [
                                                                                        "onClick",
                                                                                        "disabled",
                                                                                    ]
                                                                                ),
                                                                            ]
                                                                        ),
                                                                    _: 1,
                                                                },
                                                                8,
                                                                [
                                                                    "modelValue",
                                                                    "onUpdate:modelValue",
                                                                    "onKeyup",
                                                                ]
                                                            ),
                                                        ]),
                                                        _: 1,
                                                    }
                                                ),
                                            ]),
                                            _: 1,
                                        }
                                    ),
                                    createVNode(
                                        VDataTable,
                                        {
                                            class: "my-2 elevation-1",
                                            headers: $data.table.item.headers,
                                            items: _ctx.shipItems,
                                            search: $data.search,
                                            "mobile-breakpoint": 0,
                                        },
                                        {
                                            body: withCtx(
                                                ({ items, headers }) => [
                                                    createVNode("tbody", null, [
                                                        (openBlock(true),
                                                        createBlock(
                                                            Fragment,
                                                            null,
                                                            renderList(
                                                                items,
                                                                (item, idx) => {
                                                                    return (
                                                                        openBlock(),
                                                                        createBlock(
                                                                            "tr",
                                                                            {
                                                                                key: idx,
                                                                            },
                                                                            [
                                                                                (openBlock(
                                                                                    true
                                                                                ),
                                                                                createBlock(
                                                                                    Fragment,
                                                                                    null,
                                                                                    renderList(
                                                                                        headers,
                                                                                        (
                                                                                            header,
                                                                                            key
                                                                                        ) => {
                                                                                            return (
                                                                                                openBlock(),
                                                                                                createBlock(
                                                                                                    "td",
                                                                                                    {
                                                                                                        key,
                                                                                                    },
                                                                                                    [
                                                                                                        $options.isRowEditable(
                                                                                                            header.value
                                                                                                        ) &&
                                                                                                        item[
                                                                                                            header
                                                                                                                .value
                                                                                                        ]
                                                                                                            ? (openBlock(),
                                                                                                              createBlock(
                                                                                                                  "div",
                                                                                                                  {
                                                                                                                      key: 0,
                                                                                                                  },
                                                                                                                  [
                                                                                                                      $options
                                                                                                                          .data
                                                                                                                          .status ===
                                                                                                                      "DELIVERED"
                                                                                                                          ? (openBlock(),
                                                                                                                            createBlock(
                                                                                                                                "div",
                                                                                                                                {
                                                                                                                                    key: 0,
                                                                                                                                },
                                                                                                                                toDisplayString(
                                                                                                                                    item[
                                                                                                                                        header
                                                                                                                                            .value
                                                                                                                                    ]
                                                                                                                                        .unit
                                                                                                                                ),
                                                                                                                                1
                                                                                                                            ))
                                                                                                                          : (openBlock(),
                                                                                                                            createBlock(
                                                                                                                                "div",
                                                                                                                                {
                                                                                                                                    key: 1,
                                                                                                                                },
                                                                                                                                [
                                                                                                                                    createVNode(
                                                                                                                                        _component_v_edit_dialog,
                                                                                                                                        {
                                                                                                                                            "return-value":
                                                                                                                                                item[
                                                                                                                                                    header
                                                                                                                                                        .value
                                                                                                                                                ]
                                                                                                                                                    .unit,
                                                                                                                                            onSave: (
                                                                                                                                                $event
                                                                                                                                            ) =>
                                                                                                                                                $options.save(
                                                                                                                                                    item[
                                                                                                                                                        "id"
                                                                                                                                                    ] -
                                                                                                                                                        1
                                                                                                                                                ),
                                                                                                                                            "save-text":
                                                                                                                                                _ctx.$t(
                                                                                                                                                    "button.confirm"
                                                                                                                                                ),
                                                                                                                                            "cancel-text":
                                                                                                                                                _ctx.$t(
                                                                                                                                                    "button.cancel"
                                                                                                                                                ),
                                                                                                                                            large: "",
                                                                                                                                        },
                                                                                                                                        {
                                                                                                                                            input: withCtx(
                                                                                                                                                () => [
                                                                                                                                                    createVNode(
                                                                                                                                                        _component_vue_number_input,
                                                                                                                                                        {
                                                                                                                                                            class: "m-4",
                                                                                                                                                            size: "small",
                                                                                                                                                            modelValue:
                                                                                                                                                                item[
                                                                                                                                                                    header
                                                                                                                                                                        .value
                                                                                                                                                                ]
                                                                                                                                                                    .unit,
                                                                                                                                                            "onUpdate:modelValue":
                                                                                                                                                                (
                                                                                                                                                                    $event
                                                                                                                                                                ) =>
                                                                                                                                                                    (item[
                                                                                                                                                                        header.value
                                                                                                                                                                    ].unit =
                                                                                                                                                                        $event),
                                                                                                                                                            min: 0,
                                                                                                                                                            max: item[
                                                                                                                                                                header
                                                                                                                                                                    .value
                                                                                                                                                            ]
                                                                                                                                                                .stock_unit,
                                                                                                                                                            inline: "",
                                                                                                                                                            center: "",
                                                                                                                                                            controls:
                                                                                                                                                                "",
                                                                                                                                                        },
                                                                                                                                                        null,
                                                                                                                                                        8,
                                                                                                                                                        [
                                                                                                                                                            "modelValue",
                                                                                                                                                            "onUpdate:modelValue",
                                                                                                                                                            "max",
                                                                                                                                                        ]
                                                                                                                                                    ),
                                                                                                                                                ]
                                                                                                                                            ),
                                                                                                                                            default:
                                                                                                                                                withCtx(
                                                                                                                                                    () => [
                                                                                                                                                        createTextVNode(
                                                                                                                                                            toDisplayString(
                                                                                                                                                                item[
                                                                                                                                                                    header
                                                                                                                                                                        .value
                                                                                                                                                                ]
                                                                                                                                                                    .unit
                                                                                                                                                            ) +
                                                                                                                                                                " ",
                                                                                                                                                            1
                                                                                                                                                        ),
                                                                                                                                                    ]
                                                                                                                                                ),
                                                                                                                                            _: 2,
                                                                                                                                        },
                                                                                                                                        1032,
                                                                                                                                        [
                                                                                                                                            "return-value",
                                                                                                                                            "onSave",
                                                                                                                                            "save-text",
                                                                                                                                            "cancel-text",
                                                                                                                                        ]
                                                                                                                                    ),
                                                                                                                                ]
                                                                                                                            )),
                                                                                                                  ]
                                                                                                              ))
                                                                                                            : $options.isRowEditable(
                                                                                                                  header.value
                                                                                                              )
                                                                                                            ? (openBlock(),
                                                                                                              createBlock(
                                                                                                                  "div",
                                                                                                                  {
                                                                                                                      key: 1,
                                                                                                                  },
                                                                                                                  " － "
                                                                                                              ))
                                                                                                            : header.value ===
                                                                                                              "actions"
                                                                                                            ? (openBlock(),
                                                                                                              createBlock(
                                                                                                                  "div",
                                                                                                                  {
                                                                                                                      key: 2,
                                                                                                                  },
                                                                                                                  [
                                                                                                                      createVNode(
                                                                                                                          _component_CButtonGroup,
                                                                                                                          null,
                                                                                                                          {
                                                                                                                              default:
                                                                                                                                  withCtx(
                                                                                                                                      () => [
                                                                                                                                          (openBlock(
                                                                                                                                              true
                                                                                                                                          ),
                                                                                                                                          createBlock(
                                                                                                                                              Fragment,
                                                                                                                                              null,
                                                                                                                                              renderList(
                                                                                                                                                  item[
                                                                                                                                                      header
                                                                                                                                                          .value
                                                                                                                                                  ],
                                                                                                                                                  (
                                                                                                                                                      action
                                                                                                                                                  ) => {
                                                                                                                                                      return (
                                                                                                                                                          openBlock(),
                                                                                                                                                          createBlock(
                                                                                                                                                              _component_CButton,
                                                                                                                                                              {
                                                                                                                                                                  key: action.key,
                                                                                                                                                                  color: action.color,
                                                                                                                                                                  disabled:
                                                                                                                                                                      action.disabled,
                                                                                                                                                                  size: "sm",
                                                                                                                                                                  onClick:
                                                                                                                                                                      (
                                                                                                                                                                          $event
                                                                                                                                                                      ) =>
                                                                                                                                                                          $options.click(
                                                                                                                                                                              item,
                                                                                                                                                                              action
                                                                                                                                                                          ),
                                                                                                                                                              },
                                                                                                                                                              {
                                                                                                                                                                  default:
                                                                                                                                                                      withCtx(
                                                                                                                                                                          () => [
                                                                                                                                                                              createTextVNode(
                                                                                                                                                                                  toDisplayString(
                                                                                                                                                                                      action.title
                                                                                                                                                                                  ),
                                                                                                                                                                                  1
                                                                                                                                                                              ),
                                                                                                                                                                          ]
                                                                                                                                                                      ),
                                                                                                                                                                  _: 2,
                                                                                                                                                              },
                                                                                                                                                              1032,
                                                                                                                                                              [
                                                                                                                                                                  "color",
                                                                                                                                                                  "disabled",
                                                                                                                                                                  "onClick",
                                                                                                                                                              ]
                                                                                                                                                          )
                                                                                                                                                      );
                                                                                                                                                  }
                                                                                                                                              ),
                                                                                                                                              128
                                                                                                                                          )),
                                                                                                                                      ]
                                                                                                                                  ),
                                                                                                                              _: 2,
                                                                                                                          },
                                                                                                                          1024
                                                                                                                      ),
                                                                                                                  ]
                                                                                                              ))
                                                                                                            : (openBlock(),
                                                                                                              createBlock(
                                                                                                                  "div",
                                                                                                                  {
                                                                                                                      key: 3,
                                                                                                                  },
                                                                                                                  toDisplayString(
                                                                                                                      item[
                                                                                                                          header
                                                                                                                              .value
                                                                                                                      ]
                                                                                                                  ),
                                                                                                                  1
                                                                                                              )),
                                                                                                    ]
                                                                                                )
                                                                                            );
                                                                                        }
                                                                                    ),
                                                                                    128
                                                                                )),
                                                                            ]
                                                                        )
                                                                    );
                                                                }
                                                            ),
                                                            128
                                                        )),
                                                    ]),
                                                ]
                                            ),
                                            _: 1,
                                        },
                                        8,
                                        ["headers", "items", "search"]
                                    ),
                                    createVNode(
                                        VDataTable,
                                        {
                                            class: "my-4 elevation-1",
                                            headers: $data.table.footer.headers,
                                            items: $options.footerItems,
                                            "hide-default-footer": "",
                                            "mobile-breakpoint": 0,
                                        },
                                        null,
                                        8,
                                        ["headers", "items"]
                                    ),
                                ]),
                                _: 1,
                            }),
                        ];
                    }
                }),
                _: 1,
            },
            _parent
        )
    );
    _push(`</div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (
        ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())
    ).add("resources/js/views/shippings/components/ShippingInvoice.vue");
    return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ShippingInvoice = /* @__PURE__ */ _export_sfc(_sfc_main$1, [
    ["ssrRender", _sfc_ssrRender$1],
]);
const _sfc_main = {
    name: "ShippingDetails",
    components: {
        ShippingInvoice,
        NewShippingItemTable,
        ShippingAlterationTable,
    },
    data() {
        return {
            tab: {
                values: [
                    `${this.$t("shipping.invoice")}`,
                    `${this.$t("create")}${this.$t("shippings.title")}`,
                    this.$t("alteration"),
                ],
                index: 0,
            },
        };
    },
};
function _sfc_ssrRender(
    _ctx,
    _push,
    _parent,
    _attrs,
    $props,
    $setup,
    $data,
    $options
) {
    const _component_CRow = resolveComponent("CRow");
    const _component_CCol = resolveComponent("CCol");
    const _component_CCard = resolveComponent("CCard");
    const _component_CCardBody = resolveComponent("CCardBody");
    const _component_CTabs = resolveComponent("CTabs");
    const _component_CTabList = resolveComponent("CTabList");
    const _component_CTab = resolveComponent("CTab");
    const _component_CTabContent = resolveComponent("CTabContent");
    const _component_CTabPanel = resolveComponent("CTabPanel");
    const _component_ShippingInvoice = resolveComponent("ShippingInvoice");
    const _component_NewShippingItemTable = resolveComponent(
        "NewShippingItemTable"
    );
    const _component_ShippingAlterationTable = resolveComponent(
        "ShippingAlterationTable"
    );
    _push(
        ssrRenderComponent(
            _component_CRow,
            _attrs,
            {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                        _push2(
                            ssrRenderComponent(
                                _component_CCol,
                                null,
                                {
                                    default: withCtx(
                                        (_2, _push3, _parent3, _scopeId2) => {
                                            if (_push3) {
                                                _push3(
                                                    ssrRenderComponent(
                                                        _component_CCard,
                                                        { class: "p-2" },
                                                        {
                                                            default: withCtx(
                                                                (
                                                                    _3,
                                                                    _push4,
                                                                    _parent4,
                                                                    _scopeId3
                                                                ) => {
                                                                    if (
                                                                        _push4
                                                                    ) {
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CCardBody,
                                                                                null,
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            (
                                                                                                _4,
                                                                                                _push5,
                                                                                                _parent5,
                                                                                                _scopeId4
                                                                                            ) => {
                                                                                                if (
                                                                                                    _push5
                                                                                                ) {
                                                                                                    _push5(
                                                                                                        ssrRenderComponent(
                                                                                                            _component_CTabs,
                                                                                                            {
                                                                                                                activeItemKey: 0,
                                                                                                            },
                                                                                                            {
                                                                                                                default:
                                                                                                                    withCtx(
                                                                                                                        (
                                                                                                                            _5,
                                                                                                                            _push6,
                                                                                                                            _parent6,
                                                                                                                            _scopeId5
                                                                                                                        ) => {
                                                                                                                            if (
                                                                                                                                _push6
                                                                                                                            ) {
                                                                                                                                _push6(
                                                                                                                                    ssrRenderComponent(
                                                                                                                                        _component_CTabList,
                                                                                                                                        {
                                                                                                                                            variant:
                                                                                                                                                "pills",
                                                                                                                                        },
                                                                                                                                        {
                                                                                                                                            default:
                                                                                                                                                withCtx(
                                                                                                                                                    (
                                                                                                                                                        _6,
                                                                                                                                                        _push7,
                                                                                                                                                        _parent7,
                                                                                                                                                        _scopeId6
                                                                                                                                                    ) => {
                                                                                                                                                        if (
                                                                                                                                                            _push7
                                                                                                                                                        ) {
                                                                                                                                                            _push7(
                                                                                                                                                                ssrRenderComponent(
                                                                                                                                                                    _component_CTab,
                                                                                                                                                                    {
                                                                                                                                                                        itemKey: 0,
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        default:
                                                                                                                                                                            withCtx(
                                                                                                                                                                                (
                                                                                                                                                                                    _7,
                                                                                                                                                                                    _push8,
                                                                                                                                                                                    _parent8,
                                                                                                                                                                                    _scopeId7
                                                                                                                                                                                ) => {
                                                                                                                                                                                    if (
                                                                                                                                                                                        _push8
                                                                                                                                                                                    ) {
                                                                                                                                                                                        _push8(
                                                                                                                                                                                            `${ssrInterpolate(
                                                                                                                                                                                                $data.tab.values[0].toUpperCase()
                                                                                                                                                                                            )}`
                                                                                                                                                                                        );
                                                                                                                                                                                    } else {
                                                                                                                                                                                        return [
                                                                                                                                                                                            createTextVNode(
                                                                                                                                                                                                toDisplayString(
                                                                                                                                                                                                    $data.tab.values[0].toUpperCase()
                                                                                                                                                                                                ),
                                                                                                                                                                                                1
                                                                                                                                                                                            ),
                                                                                                                                                                                        ];
                                                                                                                                                                                    }
                                                                                                                                                                                }
                                                                                                                                                                            ),
                                                                                                                                                                        _: 1,
                                                                                                                                                                    },
                                                                                                                                                                    _parent7,
                                                                                                                                                                    _scopeId6
                                                                                                                                                                )
                                                                                                                                                            );
                                                                                                                                                            _push7(
                                                                                                                                                                ssrRenderComponent(
                                                                                                                                                                    _component_CTab,
                                                                                                                                                                    {
                                                                                                                                                                        itemKey: 1,
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        default:
                                                                                                                                                                            withCtx(
                                                                                                                                                                                (
                                                                                                                                                                                    _7,
                                                                                                                                                                                    _push8,
                                                                                                                                                                                    _parent8,
                                                                                                                                                                                    _scopeId7
                                                                                                                                                                                ) => {
                                                                                                                                                                                    if (
                                                                                                                                                                                        _push8
                                                                                                                                                                                    ) {
                                                                                                                                                                                        _push8(
                                                                                                                                                                                            `${ssrInterpolate(
                                                                                                                                                                                                $data.tab.values[1].toUpperCase()
                                                                                                                                                                                            )}`
                                                                                                                                                                                        );
                                                                                                                                                                                    } else {
                                                                                                                                                                                        return [
                                                                                                                                                                                            createTextVNode(
                                                                                                                                                                                                toDisplayString(
                                                                                                                                                                                                    $data.tab.values[1].toUpperCase()
                                                                                                                                                                                                ),
                                                                                                                                                                                                1
                                                                                                                                                                                            ),
                                                                                                                                                                                        ];
                                                                                                                                                                                    }
                                                                                                                                                                                }
                                                                                                                                                                            ),
                                                                                                                                                                        _: 1,
                                                                                                                                                                    },
                                                                                                                                                                    _parent7,
                                                                                                                                                                    _scopeId6
                                                                                                                                                                )
                                                                                                                                                            );
                                                                                                                                                            _push7(
                                                                                                                                                                ssrRenderComponent(
                                                                                                                                                                    _component_CTab,
                                                                                                                                                                    {
                                                                                                                                                                        itemKey: 2,
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        default:
                                                                                                                                                                            withCtx(
                                                                                                                                                                                (
                                                                                                                                                                                    _7,
                                                                                                                                                                                    _push8,
                                                                                                                                                                                    _parent8,
                                                                                                                                                                                    _scopeId7
                                                                                                                                                                                ) => {
                                                                                                                                                                                    if (
                                                                                                                                                                                        _push8
                                                                                                                                                                                    ) {
                                                                                                                                                                                        _push8(
                                                                                                                                                                                            `${ssrInterpolate(
                                                                                                                                                                                                $data.tab.values[2].toUpperCase()
                                                                                                                                                                                            )}`
                                                                                                                                                                                        );
                                                                                                                                                                                    } else {
                                                                                                                                                                                        return [
                                                                                                                                                                                            createTextVNode(
                                                                                                                                                                                                toDisplayString(
                                                                                                                                                                                                    $data.tab.values[2].toUpperCase()
                                                                                                                                                                                                ),
                                                                                                                                                                                                1
                                                                                                                                                                                            ),
                                                                                                                                                                                        ];
                                                                                                                                                                                    }
                                                                                                                                                                                }
                                                                                                                                                                            ),
                                                                                                                                                                        _: 1,
                                                                                                                                                                    },
                                                                                                                                                                    _parent7,
                                                                                                                                                                    _scopeId6
                                                                                                                                                                )
                                                                                                                                                            );
                                                                                                                                                        } else {
                                                                                                                                                            return [
                                                                                                                                                                createVNode(
                                                                                                                                                                    _component_CTab,
                                                                                                                                                                    {
                                                                                                                                                                        itemKey: 0,
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        default:
                                                                                                                                                                            withCtx(
                                                                                                                                                                                () => [
                                                                                                                                                                                    createTextVNode(
                                                                                                                                                                                        toDisplayString(
                                                                                                                                                                                            $data.tab.values[0].toUpperCase()
                                                                                                                                                                                        ),
                                                                                                                                                                                        1
                                                                                                                                                                                    ),
                                                                                                                                                                                ]
                                                                                                                                                                            ),
                                                                                                                                                                        _: 1,
                                                                                                                                                                    }
                                                                                                                                                                ),
                                                                                                                                                                createVNode(
                                                                                                                                                                    _component_CTab,
                                                                                                                                                                    {
                                                                                                                                                                        itemKey: 1,
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        default:
                                                                                                                                                                            withCtx(
                                                                                                                                                                                () => [
                                                                                                                                                                                    createTextVNode(
                                                                                                                                                                                        toDisplayString(
                                                                                                                                                                                            $data.tab.values[1].toUpperCase()
                                                                                                                                                                                        ),
                                                                                                                                                                                        1
                                                                                                                                                                                    ),
                                                                                                                                                                                ]
                                                                                                                                                                            ),
                                                                                                                                                                        _: 1,
                                                                                                                                                                    }
                                                                                                                                                                ),
                                                                                                                                                                createVNode(
                                                                                                                                                                    _component_CTab,
                                                                                                                                                                    {
                                                                                                                                                                        itemKey: 2,
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        default:
                                                                                                                                                                            withCtx(
                                                                                                                                                                                () => [
                                                                                                                                                                                    createTextVNode(
                                                                                                                                                                                        toDisplayString(
                                                                                                                                                                                            $data.tab.values[2].toUpperCase()
                                                                                                                                                                                        ),
                                                                                                                                                                                        1
                                                                                                                                                                                    ),
                                                                                                                                                                                ]
                                                                                                                                                                            ),
                                                                                                                                                                        _: 1,
                                                                                                                                                                    }
                                                                                                                                                                ),
                                                                                                                                                            ];
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                ),
                                                                                                                                            _: 1,
                                                                                                                                        },
                                                                                                                                        _parent6,
                                                                                                                                        _scopeId5
                                                                                                                                    )
                                                                                                                                );
                                                                                                                                _push6(
                                                                                                                                    ssrRenderComponent(
                                                                                                                                        _component_CTabContent,
                                                                                                                                        null,
                                                                                                                                        {
                                                                                                                                            default:
                                                                                                                                                withCtx(
                                                                                                                                                    (
                                                                                                                                                        _6,
                                                                                                                                                        _push7,
                                                                                                                                                        _parent7,
                                                                                                                                                        _scopeId6
                                                                                                                                                    ) => {
                                                                                                                                                        if (
                                                                                                                                                            _push7
                                                                                                                                                        ) {
                                                                                                                                                            _push7(
                                                                                                                                                                ssrRenderComponent(
                                                                                                                                                                    _component_CTabPanel,
                                                                                                                                                                    {
                                                                                                                                                                        class: "p-3",
                                                                                                                                                                        itemKey: 0,
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        default:
                                                                                                                                                                            withCtx(
                                                                                                                                                                                (
                                                                                                                                                                                    _7,
                                                                                                                                                                                    _push8,
                                                                                                                                                                                    _parent8,
                                                                                                                                                                                    _scopeId7
                                                                                                                                                                                ) => {
                                                                                                                                                                                    if (
                                                                                                                                                                                        _push8
                                                                                                                                                                                    ) {
                                                                                                                                                                                        _push8(
                                                                                                                                                                                            ssrRenderComponent(
                                                                                                                                                                                                _component_ShippingInvoice,
                                                                                                                                                                                                {
                                                                                                                                                                                                    id: this
                                                                                                                                                                                                        .$route
                                                                                                                                                                                                        .params
                                                                                                                                                                                                        .id,
                                                                                                                                                                                                },
                                                                                                                                                                                                null,
                                                                                                                                                                                                _parent8,
                                                                                                                                                                                                _scopeId7
                                                                                                                                                                                            )
                                                                                                                                                                                        );
                                                                                                                                                                                    } else {
                                                                                                                                                                                        return [
                                                                                                                                                                                            createVNode(
                                                                                                                                                                                                _component_ShippingInvoice,
                                                                                                                                                                                                {
                                                                                                                                                                                                    id: this
                                                                                                                                                                                                        .$route
                                                                                                                                                                                                        .params
                                                                                                                                                                                                        .id,
                                                                                                                                                                                                },
                                                                                                                                                                                                null,
                                                                                                                                                                                                8,
                                                                                                                                                                                                [
                                                                                                                                                                                                    "id",
                                                                                                                                                                                                ]
                                                                                                                                                                                            ),
                                                                                                                                                                                        ];
                                                                                                                                                                                    }
                                                                                                                                                                                }
                                                                                                                                                                            ),
                                                                                                                                                                        _: 1,
                                                                                                                                                                    },
                                                                                                                                                                    _parent7,
                                                                                                                                                                    _scopeId6
                                                                                                                                                                )
                                                                                                                                                            );
                                                                                                                                                            _push7(
                                                                                                                                                                ssrRenderComponent(
                                                                                                                                                                    _component_CTabPanel,
                                                                                                                                                                    {
                                                                                                                                                                        class: "p-3",
                                                                                                                                                                        itemKey: 1,
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        default:
                                                                                                                                                                            withCtx(
                                                                                                                                                                                (
                                                                                                                                                                                    _7,
                                                                                                                                                                                    _push8,
                                                                                                                                                                                    _parent8,
                                                                                                                                                                                    _scopeId7
                                                                                                                                                                                ) => {
                                                                                                                                                                                    if (
                                                                                                                                                                                        _push8
                                                                                                                                                                                    ) {
                                                                                                                                                                                        _push8(
                                                                                                                                                                                            ssrRenderComponent(
                                                                                                                                                                                                _component_NewShippingItemTable,
                                                                                                                                                                                                {
                                                                                                                                                                                                    goodsShipId:
                                                                                                                                                                                                        this
                                                                                                                                                                                                            .$route
                                                                                                                                                                                                            .params
                                                                                                                                                                                                            .id,
                                                                                                                                                                                                },
                                                                                                                                                                                                null,
                                                                                                                                                                                                _parent8,
                                                                                                                                                                                                _scopeId7
                                                                                                                                                                                            )
                                                                                                                                                                                        );
                                                                                                                                                                                    } else {
                                                                                                                                                                                        return [
                                                                                                                                                                                            createVNode(
                                                                                                                                                                                                _component_NewShippingItemTable,
                                                                                                                                                                                                {
                                                                                                                                                                                                    goodsShipId:
                                                                                                                                                                                                        this
                                                                                                                                                                                                            .$route
                                                                                                                                                                                                            .params
                                                                                                                                                                                                            .id,
                                                                                                                                                                                                },
                                                                                                                                                                                                null,
                                                                                                                                                                                                8,
                                                                                                                                                                                                [
                                                                                                                                                                                                    "goodsShipId",
                                                                                                                                                                                                ]
                                                                                                                                                                                            ),
                                                                                                                                                                                        ];
                                                                                                                                                                                    }
                                                                                                                                                                                }
                                                                                                                                                                            ),
                                                                                                                                                                        _: 1,
                                                                                                                                                                    },
                                                                                                                                                                    _parent7,
                                                                                                                                                                    _scopeId6
                                                                                                                                                                )
                                                                                                                                                            );
                                                                                                                                                            _push7(
                                                                                                                                                                ssrRenderComponent(
                                                                                                                                                                    _component_CTabPanel,
                                                                                                                                                                    {
                                                                                                                                                                        class: "p-3",
                                                                                                                                                                        itemKey: 2,
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        default:
                                                                                                                                                                            withCtx(
                                                                                                                                                                                (
                                                                                                                                                                                    _7,
                                                                                                                                                                                    _push8,
                                                                                                                                                                                    _parent8,
                                                                                                                                                                                    _scopeId7
                                                                                                                                                                                ) => {
                                                                                                                                                                                    if (
                                                                                                                                                                                        _push8
                                                                                                                                                                                    ) {
                                                                                                                                                                                        _push8(
                                                                                                                                                                                            ssrRenderComponent(
                                                                                                                                                                                                _component_ShippingAlterationTable,
                                                                                                                                                                                                {
                                                                                                                                                                                                    goodsShipId:
                                                                                                                                                                                                        this
                                                                                                                                                                                                            .$route
                                                                                                                                                                                                            .params
                                                                                                                                                                                                            .id,
                                                                                                                                                                                                },
                                                                                                                                                                                                null,
                                                                                                                                                                                                _parent8,
                                                                                                                                                                                                _scopeId7
                                                                                                                                                                                            )
                                                                                                                                                                                        );
                                                                                                                                                                                    } else {
                                                                                                                                                                                        return [
                                                                                                                                                                                            createVNode(
                                                                                                                                                                                                _component_ShippingAlterationTable,
                                                                                                                                                                                                {
                                                                                                                                                                                                    goodsShipId:
                                                                                                                                                                                                        this
                                                                                                                                                                                                            .$route
                                                                                                                                                                                                            .params
                                                                                                                                                                                                            .id,
                                                                                                                                                                                                },
                                                                                                                                                                                                null,
                                                                                                                                                                                                8,
                                                                                                                                                                                                [
                                                                                                                                                                                                    "goodsShipId",
                                                                                                                                                                                                ]
                                                                                                                                                                                            ),
                                                                                                                                                                                        ];
                                                                                                                                                                                    }
                                                                                                                                                                                }
                                                                                                                                                                            ),
                                                                                                                                                                        _: 1,
                                                                                                                                                                    },
                                                                                                                                                                    _parent7,
                                                                                                                                                                    _scopeId6
                                                                                                                                                                )
                                                                                                                                                            );
                                                                                                                                                        } else {
                                                                                                                                                            return [
                                                                                                                                                                createVNode(
                                                                                                                                                                    _component_CTabPanel,
                                                                                                                                                                    {
                                                                                                                                                                        class: "p-3",
                                                                                                                                                                        itemKey: 0,
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        default:
                                                                                                                                                                            withCtx(
                                                                                                                                                                                () => [
                                                                                                                                                                                    createVNode(
                                                                                                                                                                                        _component_ShippingInvoice,
                                                                                                                                                                                        {
                                                                                                                                                                                            id: this
                                                                                                                                                                                                .$route
                                                                                                                                                                                                .params
                                                                                                                                                                                                .id,
                                                                                                                                                                                        },
                                                                                                                                                                                        null,
                                                                                                                                                                                        8,
                                                                                                                                                                                        [
                                                                                                                                                                                            "id",
                                                                                                                                                                                        ]
                                                                                                                                                                                    ),
                                                                                                                                                                                ]
                                                                                                                                                                            ),
                                                                                                                                                                        _: 1,
                                                                                                                                                                    }
                                                                                                                                                                ),
                                                                                                                                                                createVNode(
                                                                                                                                                                    _component_CTabPanel,
                                                                                                                                                                    {
                                                                                                                                                                        class: "p-3",
                                                                                                                                                                        itemKey: 1,
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        default:
                                                                                                                                                                            withCtx(
                                                                                                                                                                                () => [
                                                                                                                                                                                    createVNode(
                                                                                                                                                                                        _component_NewShippingItemTable,
                                                                                                                                                                                        {
                                                                                                                                                                                            goodsShipId:
                                                                                                                                                                                                this
                                                                                                                                                                                                    .$route
                                                                                                                                                                                                    .params
                                                                                                                                                                                                    .id,
                                                                                                                                                                                        },
                                                                                                                                                                                        null,
                                                                                                                                                                                        8,
                                                                                                                                                                                        [
                                                                                                                                                                                            "goodsShipId",
                                                                                                                                                                                        ]
                                                                                                                                                                                    ),
                                                                                                                                                                                ]
                                                                                                                                                                            ),
                                                                                                                                                                        _: 1,
                                                                                                                                                                    }
                                                                                                                                                                ),
                                                                                                                                                                createVNode(
                                                                                                                                                                    _component_CTabPanel,
                                                                                                                                                                    {
                                                                                                                                                                        class: "p-3",
                                                                                                                                                                        itemKey: 2,
                                                                                                                                                                    },
                                                                                                                                                                    {
                                                                                                                                                                        default:
                                                                                                                                                                            withCtx(
                                                                                                                                                                                () => [
                                                                                                                                                                                    createVNode(
                                                                                                                                                                                        _component_ShippingAlterationTable,
                                                                                                                                                                                        {
                                                                                                                                                                                            goodsShipId:
                                                                                                                                                                                                this
                                                                                                                                                                                                    .$route
                                                                                                                                                                                                    .params
                                                                                                                                                                                                    .id,
                                                                                                                                                                                        },
                                                                                                                                                                                        null,
                                                                                                                                                                                        8,
                                                                                                                                                                                        [
                                                                                                                                                                                            "goodsShipId",
                                                                                                                                                                                        ]
                                                                                                                                                                                    ),
                                                                                                                                                                                ]
                                                                                                                                                                            ),
                                                                                                                                                                        _: 1,
                                                                                                                                                                    }
                                                                                                                                                                ),
                                                                                                                                                            ];
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                ),
                                                                                                                                            _: 1,
                                                                                                                                        },
                                                                                                                                        _parent6,
                                                                                                                                        _scopeId5
                                                                                                                                    )
                                                                                                                                );
                                                                                                                            } else {
                                                                                                                                return [
                                                                                                                                    createVNode(
                                                                                                                                        _component_CTabList,
                                                                                                                                        {
                                                                                                                                            variant:
                                                                                                                                                "pills",
                                                                                                                                        },
                                                                                                                                        {
                                                                                                                                            default:
                                                                                                                                                withCtx(
                                                                                                                                                    () => [
                                                                                                                                                        createVNode(
                                                                                                                                                            _component_CTab,
                                                                                                                                                            {
                                                                                                                                                                itemKey: 0,
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                default:
                                                                                                                                                                    withCtx(
                                                                                                                                                                        () => [
                                                                                                                                                                            createTextVNode(
                                                                                                                                                                                toDisplayString(
                                                                                                                                                                                    $data.tab.values[0].toUpperCase()
                                                                                                                                                                                ),
                                                                                                                                                                                1
                                                                                                                                                                            ),
                                                                                                                                                                        ]
                                                                                                                                                                    ),
                                                                                                                                                                _: 1,
                                                                                                                                                            }
                                                                                                                                                        ),
                                                                                                                                                        createVNode(
                                                                                                                                                            _component_CTab,
                                                                                                                                                            {
                                                                                                                                                                itemKey: 1,
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                default:
                                                                                                                                                                    withCtx(
                                                                                                                                                                        () => [
                                                                                                                                                                            createTextVNode(
                                                                                                                                                                                toDisplayString(
                                                                                                                                                                                    $data.tab.values[1].toUpperCase()
                                                                                                                                                                                ),
                                                                                                                                                                                1
                                                                                                                                                                            ),
                                                                                                                                                                        ]
                                                                                                                                                                    ),
                                                                                                                                                                _: 1,
                                                                                                                                                            }
                                                                                                                                                        ),
                                                                                                                                                        createVNode(
                                                                                                                                                            _component_CTab,
                                                                                                                                                            {
                                                                                                                                                                itemKey: 2,
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                default:
                                                                                                                                                                    withCtx(
                                                                                                                                                                        () => [
                                                                                                                                                                            createTextVNode(
                                                                                                                                                                                toDisplayString(
                                                                                                                                                                                    $data.tab.values[2].toUpperCase()
                                                                                                                                                                                ),
                                                                                                                                                                                1
                                                                                                                                                                            ),
                                                                                                                                                                        ]
                                                                                                                                                                    ),
                                                                                                                                                                _: 1,
                                                                                                                                                            }
                                                                                                                                                        ),
                                                                                                                                                    ]
                                                                                                                                                ),
                                                                                                                                            _: 1,
                                                                                                                                        }
                                                                                                                                    ),
                                                                                                                                    createVNode(
                                                                                                                                        _component_CTabContent,
                                                                                                                                        null,
                                                                                                                                        {
                                                                                                                                            default:
                                                                                                                                                withCtx(
                                                                                                                                                    () => [
                                                                                                                                                        createVNode(
                                                                                                                                                            _component_CTabPanel,
                                                                                                                                                            {
                                                                                                                                                                class: "p-3",
                                                                                                                                                                itemKey: 0,
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                default:
                                                                                                                                                                    withCtx(
                                                                                                                                                                        () => [
                                                                                                                                                                            createVNode(
                                                                                                                                                                                _component_ShippingInvoice,
                                                                                                                                                                                {
                                                                                                                                                                                    id: this
                                                                                                                                                                                        .$route
                                                                                                                                                                                        .params
                                                                                                                                                                                        .id,
                                                                                                                                                                                },
                                                                                                                                                                                null,
                                                                                                                                                                                8,
                                                                                                                                                                                [
                                                                                                                                                                                    "id",
                                                                                                                                                                                ]
                                                                                                                                                                            ),
                                                                                                                                                                        ]
                                                                                                                                                                    ),
                                                                                                                                                                _: 1,
                                                                                                                                                            }
                                                                                                                                                        ),
                                                                                                                                                        createVNode(
                                                                                                                                                            _component_CTabPanel,
                                                                                                                                                            {
                                                                                                                                                                class: "p-3",
                                                                                                                                                                itemKey: 1,
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                default:
                                                                                                                                                                    withCtx(
                                                                                                                                                                        () => [
                                                                                                                                                                            createVNode(
                                                                                                                                                                                _component_NewShippingItemTable,
                                                                                                                                                                                {
                                                                                                                                                                                    goodsShipId:
                                                                                                                                                                                        this
                                                                                                                                                                                            .$route
                                                                                                                                                                                            .params
                                                                                                                                                                                            .id,
                                                                                                                                                                                },
                                                                                                                                                                                null,
                                                                                                                                                                                8,
                                                                                                                                                                                [
                                                                                                                                                                                    "goodsShipId",
                                                                                                                                                                                ]
                                                                                                                                                                            ),
                                                                                                                                                                        ]
                                                                                                                                                                    ),
                                                                                                                                                                _: 1,
                                                                                                                                                            }
                                                                                                                                                        ),
                                                                                                                                                        createVNode(
                                                                                                                                                            _component_CTabPanel,
                                                                                                                                                            {
                                                                                                                                                                class: "p-3",
                                                                                                                                                                itemKey: 2,
                                                                                                                                                            },
                                                                                                                                                            {
                                                                                                                                                                default:
                                                                                                                                                                    withCtx(
                                                                                                                                                                        () => [
                                                                                                                                                                            createVNode(
                                                                                                                                                                                _component_ShippingAlterationTable,
                                                                                                                                                                                {
                                                                                                                                                                                    goodsShipId:
                                                                                                                                                                                        this
                                                                                                                                                                                            .$route
                                                                                                                                                                                            .params
                                                                                                                                                                                            .id,
                                                                                                                                                                                },
                                                                                                                                                                                null,
                                                                                                                                                                                8,
                                                                                                                                                                                [
                                                                                                                                                                                    "goodsShipId",
                                                                                                                                                                                ]
                                                                                                                                                                            ),
                                                                                                                                                                        ]
                                                                                                                                                                    ),
                                                                                                                                                                _: 1,
                                                                                                                                                            }
                                                                                                                                                        ),
                                                                                                                                                    ]
                                                                                                                                                ),
                                                                                                                                            _: 1,
                                                                                                                                        }
                                                                                                                                    ),
                                                                                                                                ];
                                                                                                                            }
                                                                                                                        }
                                                                                                                    ),
                                                                                                                _: 1,
                                                                                                            },
                                                                                                            _parent5,
                                                                                                            _scopeId4
                                                                                                        )
                                                                                                    );
                                                                                                } else {
                                                                                                    return [
                                                                                                        createVNode(
                                                                                                            _component_CTabs,
                                                                                                            {
                                                                                                                activeItemKey: 0,
                                                                                                            },
                                                                                                            {
                                                                                                                default:
                                                                                                                    withCtx(
                                                                                                                        () => [
                                                                                                                            createVNode(
                                                                                                                                _component_CTabList,
                                                                                                                                {
                                                                                                                                    variant:
                                                                                                                                        "pills",
                                                                                                                                },
                                                                                                                                {
                                                                                                                                    default:
                                                                                                                                        withCtx(
                                                                                                                                            () => [
                                                                                                                                                createVNode(
                                                                                                                                                    _component_CTab,
                                                                                                                                                    {
                                                                                                                                                        itemKey: 0,
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        default:
                                                                                                                                                            withCtx(
                                                                                                                                                                () => [
                                                                                                                                                                    createTextVNode(
                                                                                                                                                                        toDisplayString(
                                                                                                                                                                            $data.tab.values[0].toUpperCase()
                                                                                                                                                                        ),
                                                                                                                                                                        1
                                                                                                                                                                    ),
                                                                                                                                                                ]
                                                                                                                                                            ),
                                                                                                                                                        _: 1,
                                                                                                                                                    }
                                                                                                                                                ),
                                                                                                                                                createVNode(
                                                                                                                                                    _component_CTab,
                                                                                                                                                    {
                                                                                                                                                        itemKey: 1,
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        default:
                                                                                                                                                            withCtx(
                                                                                                                                                                () => [
                                                                                                                                                                    createTextVNode(
                                                                                                                                                                        toDisplayString(
                                                                                                                                                                            $data.tab.values[1].toUpperCase()
                                                                                                                                                                        ),
                                                                                                                                                                        1
                                                                                                                                                                    ),
                                                                                                                                                                ]
                                                                                                                                                            ),
                                                                                                                                                        _: 1,
                                                                                                                                                    }
                                                                                                                                                ),
                                                                                                                                                createVNode(
                                                                                                                                                    _component_CTab,
                                                                                                                                                    {
                                                                                                                                                        itemKey: 2,
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        default:
                                                                                                                                                            withCtx(
                                                                                                                                                                () => [
                                                                                                                                                                    createTextVNode(
                                                                                                                                                                        toDisplayString(
                                                                                                                                                                            $data.tab.values[2].toUpperCase()
                                                                                                                                                                        ),
                                                                                                                                                                        1
                                                                                                                                                                    ),
                                                                                                                                                                ]
                                                                                                                                                            ),
                                                                                                                                                        _: 1,
                                                                                                                                                    }
                                                                                                                                                ),
                                                                                                                                            ]
                                                                                                                                        ),
                                                                                                                                    _: 1,
                                                                                                                                }
                                                                                                                            ),
                                                                                                                            createVNode(
                                                                                                                                _component_CTabContent,
                                                                                                                                null,
                                                                                                                                {
                                                                                                                                    default:
                                                                                                                                        withCtx(
                                                                                                                                            () => [
                                                                                                                                                createVNode(
                                                                                                                                                    _component_CTabPanel,
                                                                                                                                                    {
                                                                                                                                                        class: "p-3",
                                                                                                                                                        itemKey: 0,
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        default:
                                                                                                                                                            withCtx(
                                                                                                                                                                () => [
                                                                                                                                                                    createVNode(
                                                                                                                                                                        _component_ShippingInvoice,
                                                                                                                                                                        {
                                                                                                                                                                            id: this
                                                                                                                                                                                .$route
                                                                                                                                                                                .params
                                                                                                                                                                                .id,
                                                                                                                                                                        },
                                                                                                                                                                        null,
                                                                                                                                                                        8,
                                                                                                                                                                        [
                                                                                                                                                                            "id",
                                                                                                                                                                        ]
                                                                                                                                                                    ),
                                                                                                                                                                ]
                                                                                                                                                            ),
                                                                                                                                                        _: 1,
                                                                                                                                                    }
                                                                                                                                                ),
                                                                                                                                                createVNode(
                                                                                                                                                    _component_CTabPanel,
                                                                                                                                                    {
                                                                                                                                                        class: "p-3",
                                                                                                                                                        itemKey: 1,
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        default:
                                                                                                                                                            withCtx(
                                                                                                                                                                () => [
                                                                                                                                                                    createVNode(
                                                                                                                                                                        _component_NewShippingItemTable,
                                                                                                                                                                        {
                                                                                                                                                                            goodsShipId:
                                                                                                                                                                                this
                                                                                                                                                                                    .$route
                                                                                                                                                                                    .params
                                                                                                                                                                                    .id,
                                                                                                                                                                        },
                                                                                                                                                                        null,
                                                                                                                                                                        8,
                                                                                                                                                                        [
                                                                                                                                                                            "goodsShipId",
                                                                                                                                                                        ]
                                                                                                                                                                    ),
                                                                                                                                                                ]
                                                                                                                                                            ),
                                                                                                                                                        _: 1,
                                                                                                                                                    }
                                                                                                                                                ),
                                                                                                                                                createVNode(
                                                                                                                                                    _component_CTabPanel,
                                                                                                                                                    {
                                                                                                                                                        class: "p-3",
                                                                                                                                                        itemKey: 2,
                                                                                                                                                    },
                                                                                                                                                    {
                                                                                                                                                        default:
                                                                                                                                                            withCtx(
                                                                                                                                                                () => [
                                                                                                                                                                    createVNode(
                                                                                                                                                                        _component_ShippingAlterationTable,
                                                                                                                                                                        {
                                                                                                                                                                            goodsShipId:
                                                                                                                                                                                this
                                                                                                                                                                                    .$route
                                                                                                                                                                                    .params
                                                                                                                                                                                    .id,
                                                                                                                                                                        },
                                                                                                                                                                        null,
                                                                                                                                                                        8,
                                                                                                                                                                        [
                                                                                                                                                                            "goodsShipId",
                                                                                                                                                                        ]
                                                                                                                                                                    ),
                                                                                                                                                                ]
                                                                                                                                                            ),
                                                                                                                                                        _: 1,
                                                                                                                                                    }
                                                                                                                                                ),
                                                                                                                                            ]
                                                                                                                                        ),
                                                                                                                                    _: 1,
                                                                                                                                }
                                                                                                                            ),
                                                                                                                        ]
                                                                                                                    ),
                                                                                                                _: 1,
                                                                                                            }
                                                                                                        ),
                                                                                                    ];
                                                                                                }
                                                                                            }
                                                                                        ),
                                                                                    _: 1,
                                                                                },
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                    } else {
                                                                        return [
                                                                            createVNode(
                                                                                _component_CCardBody,
                                                                                null,
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            () => [
                                                                                                createVNode(
                                                                                                    _component_CTabs,
                                                                                                    {
                                                                                                        activeItemKey: 0,
                                                                                                    },
                                                                                                    {
                                                                                                        default:
                                                                                                            withCtx(
                                                                                                                () => [
                                                                                                                    createVNode(
                                                                                                                        _component_CTabList,
                                                                                                                        {
                                                                                                                            variant:
                                                                                                                                "pills",
                                                                                                                        },
                                                                                                                        {
                                                                                                                            default:
                                                                                                                                withCtx(
                                                                                                                                    () => [
                                                                                                                                        createVNode(
                                                                                                                                            _component_CTab,
                                                                                                                                            {
                                                                                                                                                itemKey: 0,
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                default:
                                                                                                                                                    withCtx(
                                                                                                                                                        () => [
                                                                                                                                                            createTextVNode(
                                                                                                                                                                toDisplayString(
                                                                                                                                                                    $data.tab.values[0].toUpperCase()
                                                                                                                                                                ),
                                                                                                                                                                1
                                                                                                                                                            ),
                                                                                                                                                        ]
                                                                                                                                                    ),
                                                                                                                                                _: 1,
                                                                                                                                            }
                                                                                                                                        ),
                                                                                                                                        createVNode(
                                                                                                                                            _component_CTab,
                                                                                                                                            {
                                                                                                                                                itemKey: 1,
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                default:
                                                                                                                                                    withCtx(
                                                                                                                                                        () => [
                                                                                                                                                            createTextVNode(
                                                                                                                                                                toDisplayString(
                                                                                                                                                                    $data.tab.values[1].toUpperCase()
                                                                                                                                                                ),
                                                                                                                                                                1
                                                                                                                                                            ),
                                                                                                                                                        ]
                                                                                                                                                    ),
                                                                                                                                                _: 1,
                                                                                                                                            }
                                                                                                                                        ),
                                                                                                                                        createVNode(
                                                                                                                                            _component_CTab,
                                                                                                                                            {
                                                                                                                                                itemKey: 2,
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                default:
                                                                                                                                                    withCtx(
                                                                                                                                                        () => [
                                                                                                                                                            createTextVNode(
                                                                                                                                                                toDisplayString(
                                                                                                                                                                    $data.tab.values[2].toUpperCase()
                                                                                                                                                                ),
                                                                                                                                                                1
                                                                                                                                                            ),
                                                                                                                                                        ]
                                                                                                                                                    ),
                                                                                                                                                _: 1,
                                                                                                                                            }
                                                                                                                                        ),
                                                                                                                                    ]
                                                                                                                                ),
                                                                                                                            _: 1,
                                                                                                                        }
                                                                                                                    ),
                                                                                                                    createVNode(
                                                                                                                        _component_CTabContent,
                                                                                                                        null,
                                                                                                                        {
                                                                                                                            default:
                                                                                                                                withCtx(
                                                                                                                                    () => [
                                                                                                                                        createVNode(
                                                                                                                                            _component_CTabPanel,
                                                                                                                                            {
                                                                                                                                                class: "p-3",
                                                                                                                                                itemKey: 0,
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                default:
                                                                                                                                                    withCtx(
                                                                                                                                                        () => [
                                                                                                                                                            createVNode(
                                                                                                                                                                _component_ShippingInvoice,
                                                                                                                                                                {
                                                                                                                                                                    id: this
                                                                                                                                                                        .$route
                                                                                                                                                                        .params
                                                                                                                                                                        .id,
                                                                                                                                                                },
                                                                                                                                                                null,
                                                                                                                                                                8,
                                                                                                                                                                [
                                                                                                                                                                    "id",
                                                                                                                                                                ]
                                                                                                                                                            ),
                                                                                                                                                        ]
                                                                                                                                                    ),
                                                                                                                                                _: 1,
                                                                                                                                            }
                                                                                                                                        ),
                                                                                                                                        createVNode(
                                                                                                                                            _component_CTabPanel,
                                                                                                                                            {
                                                                                                                                                class: "p-3",
                                                                                                                                                itemKey: 1,
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                default:
                                                                                                                                                    withCtx(
                                                                                                                                                        () => [
                                                                                                                                                            createVNode(
                                                                                                                                                                _component_NewShippingItemTable,
                                                                                                                                                                {
                                                                                                                                                                    goodsShipId:
                                                                                                                                                                        this
                                                                                                                                                                            .$route
                                                                                                                                                                            .params
                                                                                                                                                                            .id,
                                                                                                                                                                },
                                                                                                                                                                null,
                                                                                                                                                                8,
                                                                                                                                                                [
                                                                                                                                                                    "goodsShipId",
                                                                                                                                                                ]
                                                                                                                                                            ),
                                                                                                                                                        ]
                                                                                                                                                    ),
                                                                                                                                                _: 1,
                                                                                                                                            }
                                                                                                                                        ),
                                                                                                                                        createVNode(
                                                                                                                                            _component_CTabPanel,
                                                                                                                                            {
                                                                                                                                                class: "p-3",
                                                                                                                                                itemKey: 2,
                                                                                                                                            },
                                                                                                                                            {
                                                                                                                                                default:
                                                                                                                                                    withCtx(
                                                                                                                                                        () => [
                                                                                                                                                            createVNode(
                                                                                                                                                                _component_ShippingAlterationTable,
                                                                                                                                                                {
                                                                                                                                                                    goodsShipId:
                                                                                                                                                                        this
                                                                                                                                                                            .$route
                                                                                                                                                                            .params
                                                                                                                                                                            .id,
                                                                                                                                                                },
                                                                                                                                                                null,
                                                                                                                                                                8,
                                                                                                                                                                [
                                                                                                                                                                    "goodsShipId",
                                                                                                                                                                ]
                                                                                                                                                            ),
                                                                                                                                                        ]
                                                                                                                                                    ),
                                                                                                                                                _: 1,
                                                                                                                                            }
                                                                                                                                        ),
                                                                                                                                    ]
                                                                                                                                ),
                                                                                                                            _: 1,
                                                                                                                        }
                                                                                                                    ),
                                                                                                                ]
                                                                                                            ),
                                                                                                        _: 1,
                                                                                                    }
                                                                                                ),
                                                                                            ]
                                                                                        ),
                                                                                    _: 1,
                                                                                }
                                                                            ),
                                                                        ];
                                                                    }
                                                                }
                                                            ),
                                                            _: 1,
                                                        },
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                            } else {
                                                return [
                                                    createVNode(
                                                        _component_CCard,
                                                        { class: "p-2" },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CCardBody,
                                                                        null,
                                                                        {
                                                                            default:
                                                                                withCtx(
                                                                                    () => [
                                                                                        createVNode(
                                                                                            _component_CTabs,
                                                                                            {
                                                                                                activeItemKey: 0,
                                                                                            },
                                                                                            {
                                                                                                default:
                                                                                                    withCtx(
                                                                                                        () => [
                                                                                                            createVNode(
                                                                                                                _component_CTabList,
                                                                                                                {
                                                                                                                    variant:
                                                                                                                        "pills",
                                                                                                                },
                                                                                                                {
                                                                                                                    default:
                                                                                                                        withCtx(
                                                                                                                            () => [
                                                                                                                                createVNode(
                                                                                                                                    _component_CTab,
                                                                                                                                    {
                                                                                                                                        itemKey: 0,
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        default:
                                                                                                                                            withCtx(
                                                                                                                                                () => [
                                                                                                                                                    createTextVNode(
                                                                                                                                                        toDisplayString(
                                                                                                                                                            $data.tab.values[0].toUpperCase()
                                                                                                                                                        ),
                                                                                                                                                        1
                                                                                                                                                    ),
                                                                                                                                                ]
                                                                                                                                            ),
                                                                                                                                        _: 1,
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                                createVNode(
                                                                                                                                    _component_CTab,
                                                                                                                                    {
                                                                                                                                        itemKey: 1,
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        default:
                                                                                                                                            withCtx(
                                                                                                                                                () => [
                                                                                                                                                    createTextVNode(
                                                                                                                                                        toDisplayString(
                                                                                                                                                            $data.tab.values[1].toUpperCase()
                                                                                                                                                        ),
                                                                                                                                                        1
                                                                                                                                                    ),
                                                                                                                                                ]
                                                                                                                                            ),
                                                                                                                                        _: 1,
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                                createVNode(
                                                                                                                                    _component_CTab,
                                                                                                                                    {
                                                                                                                                        itemKey: 2,
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        default:
                                                                                                                                            withCtx(
                                                                                                                                                () => [
                                                                                                                                                    createTextVNode(
                                                                                                                                                        toDisplayString(
                                                                                                                                                            $data.tab.values[2].toUpperCase()
                                                                                                                                                        ),
                                                                                                                                                        1
                                                                                                                                                    ),
                                                                                                                                                ]
                                                                                                                                            ),
                                                                                                                                        _: 1,
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                            ]
                                                                                                                        ),
                                                                                                                    _: 1,
                                                                                                                }
                                                                                                            ),
                                                                                                            createVNode(
                                                                                                                _component_CTabContent,
                                                                                                                null,
                                                                                                                {
                                                                                                                    default:
                                                                                                                        withCtx(
                                                                                                                            () => [
                                                                                                                                createVNode(
                                                                                                                                    _component_CTabPanel,
                                                                                                                                    {
                                                                                                                                        class: "p-3",
                                                                                                                                        itemKey: 0,
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        default:
                                                                                                                                            withCtx(
                                                                                                                                                () => [
                                                                                                                                                    createVNode(
                                                                                                                                                        _component_ShippingInvoice,
                                                                                                                                                        {
                                                                                                                                                            id: this
                                                                                                                                                                .$route
                                                                                                                                                                .params
                                                                                                                                                                .id,
                                                                                                                                                        },
                                                                                                                                                        null,
                                                                                                                                                        8,
                                                                                                                                                        [
                                                                                                                                                            "id",
                                                                                                                                                        ]
                                                                                                                                                    ),
                                                                                                                                                ]
                                                                                                                                            ),
                                                                                                                                        _: 1,
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                                createVNode(
                                                                                                                                    _component_CTabPanel,
                                                                                                                                    {
                                                                                                                                        class: "p-3",
                                                                                                                                        itemKey: 1,
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        default:
                                                                                                                                            withCtx(
                                                                                                                                                () => [
                                                                                                                                                    createVNode(
                                                                                                                                                        _component_NewShippingItemTable,
                                                                                                                                                        {
                                                                                                                                                            goodsShipId:
                                                                                                                                                                this
                                                                                                                                                                    .$route
                                                                                                                                                                    .params
                                                                                                                                                                    .id,
                                                                                                                                                        },
                                                                                                                                                        null,
                                                                                                                                                        8,
                                                                                                                                                        [
                                                                                                                                                            "goodsShipId",
                                                                                                                                                        ]
                                                                                                                                                    ),
                                                                                                                                                ]
                                                                                                                                            ),
                                                                                                                                        _: 1,
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                                createVNode(
                                                                                                                                    _component_CTabPanel,
                                                                                                                                    {
                                                                                                                                        class: "p-3",
                                                                                                                                        itemKey: 2,
                                                                                                                                    },
                                                                                                                                    {
                                                                                                                                        default:
                                                                                                                                            withCtx(
                                                                                                                                                () => [
                                                                                                                                                    createVNode(
                                                                                                                                                        _component_ShippingAlterationTable,
                                                                                                                                                        {
                                                                                                                                                            goodsShipId:
                                                                                                                                                                this
                                                                                                                                                                    .$route
                                                                                                                                                                    .params
                                                                                                                                                                    .id,
                                                                                                                                                        },
                                                                                                                                                        null,
                                                                                                                                                        8,
                                                                                                                                                        [
                                                                                                                                                            "goodsShipId",
                                                                                                                                                        ]
                                                                                                                                                    ),
                                                                                                                                                ]
                                                                                                                                            ),
                                                                                                                                        _: 1,
                                                                                                                                    }
                                                                                                                                ),
                                                                                                                            ]
                                                                                                                        ),
                                                                                                                    _: 1,
                                                                                                                }
                                                                                                            ),
                                                                                                        ]
                                                                                                    ),
                                                                                                _: 1,
                                                                                            }
                                                                                        ),
                                                                                    ]
                                                                                ),
                                                                            _: 1,
                                                                        }
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        }
                                                    ),
                                                ];
                                            }
                                        }
                                    ),
                                    _: 1,
                                },
                                _parent2,
                                _scopeId
                            )
                        );
                    } else {
                        return [
                            createVNode(_component_CCol, null, {
                                default: withCtx(() => [
                                    createVNode(
                                        _component_CCard,
                                        { class: "p-2" },
                                        {
                                            default: withCtx(() => [
                                                createVNode(
                                                    _component_CCardBody,
                                                    null,
                                                    {
                                                        default: withCtx(() => [
                                                            createVNode(
                                                                _component_CTabs,
                                                                {
                                                                    activeItemKey: 0,
                                                                },
                                                                {
                                                                    default:
                                                                        withCtx(
                                                                            () => [
                                                                                createVNode(
                                                                                    _component_CTabList,
                                                                                    {
                                                                                        variant:
                                                                                            "pills",
                                                                                    },
                                                                                    {
                                                                                        default:
                                                                                            withCtx(
                                                                                                () => [
                                                                                                    createVNode(
                                                                                                        _component_CTab,
                                                                                                        {
                                                                                                            itemKey: 0,
                                                                                                        },
                                                                                                        {
                                                                                                            default:
                                                                                                                withCtx(
                                                                                                                    () => [
                                                                                                                        createTextVNode(
                                                                                                                            toDisplayString(
                                                                                                                                $data.tab.values[0].toUpperCase()
                                                                                                                            ),
                                                                                                                            1
                                                                                                                        ),
                                                                                                                    ]
                                                                                                                ),
                                                                                                            _: 1,
                                                                                                        }
                                                                                                    ),
                                                                                                    createVNode(
                                                                                                        _component_CTab,
                                                                                                        {
                                                                                                            itemKey: 1,
                                                                                                        },
                                                                                                        {
                                                                                                            default:
                                                                                                                withCtx(
                                                                                                                    () => [
                                                                                                                        createTextVNode(
                                                                                                                            toDisplayString(
                                                                                                                                $data.tab.values[1].toUpperCase()
                                                                                                                            ),
                                                                                                                            1
                                                                                                                        ),
                                                                                                                    ]
                                                                                                                ),
                                                                                                            _: 1,
                                                                                                        }
                                                                                                    ),
                                                                                                    createVNode(
                                                                                                        _component_CTab,
                                                                                                        {
                                                                                                            itemKey: 2,
                                                                                                        },
                                                                                                        {
                                                                                                            default:
                                                                                                                withCtx(
                                                                                                                    () => [
                                                                                                                        createTextVNode(
                                                                                                                            toDisplayString(
                                                                                                                                $data.tab.values[2].toUpperCase()
                                                                                                                            ),
                                                                                                                            1
                                                                                                                        ),
                                                                                                                    ]
                                                                                                                ),
                                                                                                            _: 1,
                                                                                                        }
                                                                                                    ),
                                                                                                ]
                                                                                            ),
                                                                                        _: 1,
                                                                                    }
                                                                                ),
                                                                                createVNode(
                                                                                    _component_CTabContent,
                                                                                    null,
                                                                                    {
                                                                                        default:
                                                                                            withCtx(
                                                                                                () => [
                                                                                                    createVNode(
                                                                                                        _component_CTabPanel,
                                                                                                        {
                                                                                                            class: "p-3",
                                                                                                            itemKey: 0,
                                                                                                        },
                                                                                                        {
                                                                                                            default:
                                                                                                                withCtx(
                                                                                                                    () => [
                                                                                                                        createVNode(
                                                                                                                            _component_ShippingInvoice,
                                                                                                                            {
                                                                                                                                id: this
                                                                                                                                    .$route
                                                                                                                                    .params
                                                                                                                                    .id,
                                                                                                                            },
                                                                                                                            null,
                                                                                                                            8,
                                                                                                                            [
                                                                                                                                "id",
                                                                                                                            ]
                                                                                                                        ),
                                                                                                                    ]
                                                                                                                ),
                                                                                                            _: 1,
                                                                                                        }
                                                                                                    ),
                                                                                                    createVNode(
                                                                                                        _component_CTabPanel,
                                                                                                        {
                                                                                                            class: "p-3",
                                                                                                            itemKey: 1,
                                                                                                        },
                                                                                                        {
                                                                                                            default:
                                                                                                                withCtx(
                                                                                                                    () => [
                                                                                                                        createVNode(
                                                                                                                            _component_NewShippingItemTable,
                                                                                                                            {
                                                                                                                                goodsShipId:
                                                                                                                                    this
                                                                                                                                        .$route
                                                                                                                                        .params
                                                                                                                                        .id,
                                                                                                                            },
                                                                                                                            null,
                                                                                                                            8,
                                                                                                                            [
                                                                                                                                "goodsShipId",
                                                                                                                            ]
                                                                                                                        ),
                                                                                                                    ]
                                                                                                                ),
                                                                                                            _: 1,
                                                                                                        }
                                                                                                    ),
                                                                                                    createVNode(
                                                                                                        _component_CTabPanel,
                                                                                                        {
                                                                                                            class: "p-3",
                                                                                                            itemKey: 2,
                                                                                                        },
                                                                                                        {
                                                                                                            default:
                                                                                                                withCtx(
                                                                                                                    () => [
                                                                                                                        createVNode(
                                                                                                                            _component_ShippingAlterationTable,
                                                                                                                            {
                                                                                                                                goodsShipId:
                                                                                                                                    this
                                                                                                                                        .$route
                                                                                                                                        .params
                                                                                                                                        .id,
                                                                                                                            },
                                                                                                                            null,
                                                                                                                            8,
                                                                                                                            [
                                                                                                                                "goodsShipId",
                                                                                                                            ]
                                                                                                                        ),
                                                                                                                    ]
                                                                                                                ),
                                                                                                            _: 1,
                                                                                                        }
                                                                                                    ),
                                                                                                ]
                                                                                            ),
                                                                                        _: 1,
                                                                                    }
                                                                                ),
                                                                            ]
                                                                        ),
                                                                    _: 1,
                                                                }
                                                            ),
                                                        ]),
                                                        _: 1,
                                                    }
                                                ),
                                            ]),
                                            _: 1,
                                        }
                                    ),
                                ]),
                                _: 1,
                            }),
                        ];
                    }
                }),
                _: 1,
            },
            _parent
        )
    );
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (
        ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())
    ).add("resources/js/views/shippings/ShippingDetails.vue");
    return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const ShippingDetails = /* @__PURE__ */ _export_sfc(_sfc_main, [
    ["ssrRender", _sfc_ssrRender],
]);
export { ShippingDetails as default };
