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
import { v4 } from "uuid";
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
    useSSRContext,
    withCtx,
    withModifiers,
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
import { VAutocomplete } from "vuetify/lib/components/VAutocomplete/index.mjs";
import "vuetify/lib/components/VBtn/index.mjs";
import { VCard, VCardActions } from "vuetify/lib/components/VCard/index.mjs";
import "vuetify/lib/components/VColorPicker/index.mjs";
import { VDataTable } from "vuetify/lib/components/VDataTable/index.mjs";
import { VDialog } from "vuetify/lib/components/VDialog/index.mjs";
import { VSpacer } from "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VMenu/index.mjs";
import { VProgressCircular } from "vuetify/lib/components/VProgressCircular/index.mjs";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
import { VSelect } from "vuetify/lib/components/VSelect/index.mjs";
import { VSkeletonLoader } from "vuetify/lib/components/VSkeletonLoader/index.mjs";
import "vuetify/lib/components/VSnackbar/index.mjs";
import { VTextField } from "vuetify/lib/components/VTextField/index.mjs";
import {
    VToolbar,
    VToolbarTitle,
} from "vuetify/lib/components/VToolbar/index.mjs";
import { mapState } from "vuex";
import "vuex-persistedstate";
import {
    _ as _export_sfc,
    d as defaults,
    a as Dialog,
    s as sizes,
} from "../app.mjs";
import { a as colors, c as cups, g as goodsTypes } from "./types-bOJiVplI.mjs";
const _sfc_main$4 = {
    name: "GoodsContentTable",
    props: {
        goodsId: null,
    },
    components: {
        Dialog,
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
                sortBy: "key",
                sortDesc: false,
            },
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { title: this.$t("contentkey"), value: "key" },
                { title: this.$t("contentvalue"), value: "value" },
                { title: this.$t("updatedat"), value: "updated_at" },
                {
                    title: this.$t("actions"),
                    value: "actions",
                    sortable: false,
                },
            ],
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
        fetch({ page, itemsPerPage, sortBy, search: search4 }) {
            let self = this;
            self.loading = true;
            self.options.page = page;
            self.options.itemsPerPage = itemsPerPage;
            self.options.sortBy = sortBy;
            let data = {
                goods_id: self.goodsId,
                page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: null,
                search: search4,
            };
            this.$store
                .dispatch("goods/contents/get", data)
                .then((response) => {
                    let res = response.data;
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
        add() {
            this.items = [
                ...this.items,
                { ...defaults.content.remote, id: v4() },
            ];
            this.serverItemsLength += 1;
        },
        download() {
            let self = this;
            self.loading = true;
            const { itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                goods_id: self.goodsId,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/contents/export", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        reload() {
            this.fetch({ ...this.options });
        },
        async click(item, action) {
            let type = action.type;
            switch (type) {
                case "Update":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("button.confirm"),
                            this.$t("alert.update")
                        )
                    ) {
                        let self = this;
                        if (self.loading) {
                            return;
                        }
                        self.loading = true;
                        let data = { ...item, goods_id: self.goodsId };
                        let index = self.items.findIndex((obj) => {
                            return obj.id === item.id;
                        });
                        this.$store
                            .dispatch("goods/contents/update", data)
                            .then((response) => {
                                self.loading = false;
                                self.items[index] = response.data.data;
                            })
                            .catch((error) => {
                                self.loading = false;
                            });
                    }
                    break;
                case "Delete":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("button.confirm"),
                            this.$t("alert.delete")
                        )
                    ) {
                        let self = this;
                        if (self.loading) {
                            return;
                        }
                        if (item.updated === false) {
                            let tempItems = self.items.filter((obj) => {
                                if (obj.id) {
                                    return obj.id !== item.id;
                                }
                                return true;
                            });
                            self.items = tempItems;
                        } else {
                            self.loading = true;
                            this.$store
                                .dispatch("goods/contents/delete", {
                                    id: item.id,
                                })
                                .then((response) => {
                                    self.loading = false;
                                    self.fetch();
                                })
                                .catch((error) => {
                                    self.loading = false;
                                });
                        }
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
    const _component_Dialog = resolveComponent("Dialog");
    const _component_CRow = resolveComponent("CRow");
    const _component_CCol = resolveComponent("CCol");
    const _component_CInputGroup = resolveComponent("CInputGroup");
    const _component_CButton = resolveComponent("CButton");
    const _component_CIcon = resolveComponent("CIcon");
    const _component_CFormInput = resolveComponent("CFormInput");
    const _component_CButtonGroup = resolveComponent("CButtonGroup");
    _push(`<div${ssrRenderAttrs(_attrs)}>`);
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
                                                        _component_CInputGroup,
                                                        { class: "mb-3" },
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
                                                                                _component_CButton,
                                                                                {
                                                                                    color: "primary",
                                                                                    size: "sm",
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
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CFormInput,
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
                                                                                },
                                                                                null,
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
                                                                                }
                                                                            ),
                                                                            createVNode(
                                                                                _component_CFormInput,
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
                                                                                },
                                                                                null,
                                                                                8,
                                                                                [
                                                                                    "modelValue",
                                                                                    "onUpdate:modelValue",
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
                                                        _component_CInputGroup,
                                                        { class: "mb-3" },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CButton,
                                                                        {
                                                                            color: "primary",
                                                                            size: "sm",
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
                                                                        }
                                                                    ),
                                                                    createVNode(
                                                                        _component_CFormInput,
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
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            "modelValue",
                                                                            "onUpdate:modelValue",
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
                                                        _component_CButtonGroup,
                                                        null,
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
                                                                                _component_CButton,
                                                                                {
                                                                                    color: "primary",
                                                                                    size: "sm",
                                                                                    onClick:
                                                                                        $options.add,
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
                                                                                                                name: "cil-plus",
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
                                                                                                                name: "cil-plus",
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
                                                                        _push4(
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
                                                                                                                name: "cil-cloud-download",
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
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                        _push4(
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
                                                                                                                name: "cil-reload",
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
                                                                                        $options.add,
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
                                                                                                        name: "cil-plus",
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
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                            } else {
                                                return [
                                                    createVNode(
                                                        _component_CButtonGroup,
                                                        null,
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CButton,
                                                                        {
                                                                            color: "primary",
                                                                            size: "sm",
                                                                            onClick:
                                                                                $options.add,
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
                                                                                                name: "cil-plus",
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
                                            _component_CInputGroup,
                                            { class: "mb-3" },
                                            {
                                                default: withCtx(() => [
                                                    createVNode(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
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
                                                        }
                                                    ),
                                                    createVNode(
                                                        _component_CFormInput,
                                                        {
                                                            size: "sm",
                                                            modelValue:
                                                                $data.search,
                                                            "onUpdate:modelValue":
                                                                ($event) =>
                                                                    ($data.search =
                                                                        $event),
                                                        },
                                                        null,
                                                        8,
                                                        [
                                                            "modelValue",
                                                            "onUpdate:modelValue",
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
                                _component_CCol,
                                {
                                    md: "3",
                                    sm: "3",
                                    class: "text-right",
                                },
                                {
                                    default: withCtx(() => [
                                        createVNode(
                                            _component_CButtonGroup,
                                            null,
                                            {
                                                default: withCtx(() => [
                                                    createVNode(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
                                                            onClick:
                                                                $options.add,
                                                            disabled:
                                                                $data.loading,
                                                        },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CIcon,
                                                                        {
                                                                            name: "cil-plus",
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
                                                ]),
                                                _: 1,
                                            }
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
                    itemsPerPageOptions: [10, 20, 50, 100],
                },
            },
            {
                loading: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                        _push2(
                            ssrRenderComponent(
                                VSkeletonLoader,
                                { type: "table-row@10" },
                                null,
                                _parent2,
                                _scopeId
                            )
                        );
                    } else {
                        return [
                            createVNode(VSkeletonLoader, {
                                type: "table-row@10",
                            }),
                        ];
                    }
                }),
                [`item.key`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            _push2(
                                ssrRenderComponent(
                                    VTextField,
                                    {
                                        modelValue: item.key,
                                        "onUpdate:modelValue": ($event) =>
                                            (item.key = $event),
                                        label: _ctx.$t("key"),
                                        "single-line": "",
                                        variant: "plain",
                                        "hide-details": "",
                                        counter: "",
                                    },
                                    null,
                                    _parent2,
                                    _scopeId
                                )
                            );
                        } else {
                            return [
                                createVNode(
                                    VTextField,
                                    {
                                        modelValue: item.key,
                                        "onUpdate:modelValue": ($event) =>
                                            (item.key = $event),
                                        label: _ctx.$t("key"),
                                        "single-line": "",
                                        variant: "plain",
                                        "hide-details": "",
                                        counter: "",
                                    },
                                    null,
                                    8,
                                    [
                                        "modelValue",
                                        "onUpdate:modelValue",
                                        "label",
                                    ]
                                ),
                            ];
                        }
                    }
                ),
                [`item.value`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            _push2(
                                ssrRenderComponent(
                                    VTextField,
                                    {
                                        modelValue: item.value,
                                        "onUpdate:modelValue": ($event) =>
                                            (item.value = $event),
                                        label: _ctx.$t("value"),
                                        "single-line": "",
                                        variant: "plain",
                                        "hide-details": "",
                                        counter: "",
                                    },
                                    null,
                                    _parent2,
                                    _scopeId
                                )
                            );
                        } else {
                            return [
                                createVNode(
                                    VTextField,
                                    {
                                        modelValue: item.value,
                                        "onUpdate:modelValue": ($event) =>
                                            (item.value = $event),
                                        label: _ctx.$t("value"),
                                        "single-line": "",
                                        variant: "plain",
                                        "hide-details": "",
                                        counter: "",
                                    },
                                    null,
                                    8,
                                    [
                                        "modelValue",
                                        "onUpdate:modelValue",
                                        "label",
                                    ]
                                ),
                            ];
                        }
                    }
                ),
                [`item.created_at`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            if (item.created_at) {
                                _push2(
                                    `<div${_scopeId}>${ssrInterpolate(
                                        this.$formatDate(item.created_at)
                                    )}</div>`
                                );
                            } else {
                                _push2(`<!---->`);
                            }
                        } else {
                            return [
                                item.created_at
                                    ? (openBlock(),
                                      createBlock(
                                          "div",
                                          { key: 0 },
                                          toDisplayString(
                                              this.$formatDate(item.created_at)
                                          ),
                                          1
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
                                    `<div${_scopeId}>${ssrInterpolate(
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
    ).add("resources/js/views/goods/components/GoodsContentTable.vue");
    return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const GoodsContentTable = /* @__PURE__ */ _export_sfc(_sfc_main$4, [
    ["ssrRender", _sfc_ssrRender$4],
]);
const _sfc_main$3 = {
    name: "GoodsForm",
    components: {},
    props: {
        id: null,
    },
    data() {
        return {
            formData: {},
            errors: {},
            fetchLoading: false,
            updateLoading: false,
            supplier: {
                items: [],
                loading: false,
            },
            category: {
                items: [],
                loading: false,
            },
            warehouse: {
                items: [],
                loading: false,
            },
            goodsTypes,
        };
    },
    watch: {
        supplier: [
            function search(val) {
                let self = this;
                if (self.supplier.length > 0 || self.supplier.loading) return;
                self.supplier.loading = true;
                this.$store
                    .dispatch("goods/suppliers/get", {})
                    .then((response) => {
                        self.supplier.items = response.data;
                        self.supplier.loading = false;
                    })
                    .catch((error) => {
                        self.supplier.loading = false;
                    });
            },
        ],
        category: [
            function search2(val) {
                let self = this;
                if (self.category.length > 0 || self.category.loading) return;
                self.category.loading = true;
                this.$store
                    .dispatch("goods/category/get", {})
                    .then((response) => {
                        self.category.items = response.data;
                        self.category.loading = false;
                    })
                    .catch((error) => {
                        self.category.loading = false;
                    });
            },
        ],
        warehouse: [
            function search3(val) {
                let self = this;
                if (self.warehouse.length > 0 || self.warehouse.loading) return;
                self.warehouse.loading = true;
                this.$store
                    .dispatch("goods/warehouses/get", {})
                    .then((response) => {
                        self.warehouse.items = response.data;
                        self.warehouse.loading = false;
                    })
                    .catch((error) => {
                        self.warehouse.loading = false;
                    });
            },
        ],
    },
    mounted() {
        this.fetch();
    },
    methods: {
        fetch() {
            let self = this;
            if (self.fetchLoading) {
                return;
            }
            let data = {
                id: self.$props.id,
            };
            self.fetchLoading = true;
            this.$store
                .dispatch("goods/details", data)
                .then((response) => {
                    self.formData = JSON.parse(JSON.stringify(response.data));
                    self.fetchLoading = false;
                })
                .catch((error) => {
                    self.fetchLoading = false;
                });
        },
        update() {
            let self = this;
            if (self.updateLoading) {
                return;
            }
            self.updateLoading = true;
            this.$store
                .dispatch("goods/update", self.formData)
                .then((response) => {
                    self.formData = JSON.parse(JSON.stringify(response.data));
                    self.errors = {};
                    self.updateLoading = false;
                })
                .catch((error) => {
                    var _a;
                    self.errors =
                        (_a = error.response.data) == null ? void 0 : _a.data;
                    self.updateLoading = false;
                });
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
    const _component_CCard = resolveComponent("CCard");
    const _component_CCardBody = resolveComponent("CCardBody");
    const _component_CRow = resolveComponent("CRow");
    const _component_CCol = resolveComponent("CCol");
    const _component_CButton = resolveComponent("CButton");
    _push(
        ssrRenderComponent(
            _component_CCard,
            mergeProps({ class: "border-0" }, _attrs),
            {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                        _push2(
                            ssrRenderComponent(
                                VProgressLinear,
                                {
                                    active: $data.fetchLoading,
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
                                                    `<form data-v-f9ebed7c${_scopeId2}>`
                                                );
                                                _push3(
                                                    ssrRenderComponent(
                                                        VTextField,
                                                        {
                                                            modelValue:
                                                                $data.formData
                                                                    .name,
                                                            "onUpdate:modelValue":
                                                                ($event) =>
                                                                    ($data.formData.name =
                                                                        $event),
                                                            label: _ctx.$t(
                                                                "name"
                                                            ),
                                                            error: $data.errors
                                                                .name
                                                                ? true
                                                                : false,
                                                            "error-messages":
                                                                $data.errors
                                                                    .name,
                                                            required: "",
                                                            outlined: "",
                                                            dense: "",
                                                            clearable: "",
                                                            maxlength: "45",
                                                        },
                                                        null,
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                                _push3(
                                                    ssrRenderComponent(
                                                        VTextField,
                                                        {
                                                            modelValue:
                                                                $data.formData
                                                                    .stock_alert,
                                                            "onUpdate:modelValue":
                                                                ($event) =>
                                                                    ($data.formData.stock_alert =
                                                                        $event),
                                                            label: _ctx.$t(
                                                                "stockalert"
                                                            ),
                                                            error: $data.errors
                                                                .stock_alert
                                                                ? true
                                                                : false,
                                                            "error-messages":
                                                                $data.errors
                                                                    .stock_alert,
                                                            type: "number",
                                                            required: "",
                                                            outlined: "",
                                                            dense: "",
                                                            clearable: "",
                                                        },
                                                        null,
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                                _push3(
                                                    ssrRenderComponent(
                                                        _component_CRow,
                                                        null,
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
                                                                                    md: "3",
                                                                                    sm: "3",
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
                                                                                                            VTextField,
                                                                                                            {
                                                                                                                modelValue:
                                                                                                                    $data
                                                                                                                        .formData
                                                                                                                        .cost_price,
                                                                                                                "onUpdate:modelValue":
                                                                                                                    (
                                                                                                                        $event
                                                                                                                    ) =>
                                                                                                                        ($data.formData.cost_price =
                                                                                                                            $event),
                                                                                                                error: $data
                                                                                                                    .errors
                                                                                                                    .cost_price
                                                                                                                    ? true
                                                                                                                    : false,
                                                                                                                "error-messages":
                                                                                                                    $data
                                                                                                                        .errors
                                                                                                                        .cost_price,
                                                                                                                label: _ctx.$t(
                                                                                                                    "price.cost"
                                                                                                                ),
                                                                                                                type: "number",
                                                                                                                required:
                                                                                                                    "",
                                                                                                                outlined:
                                                                                                                    "",
                                                                                                                dense: "",
                                                                                                                clearable:
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
                                                                                                            VTextField,
                                                                                                            {
                                                                                                                modelValue:
                                                                                                                    $data
                                                                                                                        .formData
                                                                                                                        .cost_price,
                                                                                                                "onUpdate:modelValue":
                                                                                                                    (
                                                                                                                        $event
                                                                                                                    ) =>
                                                                                                                        ($data.formData.cost_price =
                                                                                                                            $event),
                                                                                                                error: $data
                                                                                                                    .errors
                                                                                                                    .cost_price
                                                                                                                    ? true
                                                                                                                    : false,
                                                                                                                "error-messages":
                                                                                                                    $data
                                                                                                                        .errors
                                                                                                                        .cost_price,
                                                                                                                label: _ctx.$t(
                                                                                                                    "price.cost"
                                                                                                                ),
                                                                                                                type: "number",
                                                                                                                required:
                                                                                                                    "",
                                                                                                                outlined:
                                                                                                                    "",
                                                                                                                dense: "",
                                                                                                                clearable:
                                                                                                                    "",
                                                                                                            },
                                                                                                            null,
                                                                                                            8,
                                                                                                            [
                                                                                                                "modelValue",
                                                                                                                "onUpdate:modelValue",
                                                                                                                "error",
                                                                                                                "error-messages",
                                                                                                                "label",
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
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CCol,
                                                                                {
                                                                                    md: "3",
                                                                                    sm: "3",
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
                                                                                                            VTextField,
                                                                                                            {
                                                                                                                modelValue:
                                                                                                                    $data
                                                                                                                        .formData
                                                                                                                        .wholesale_price,
                                                                                                                "onUpdate:modelValue":
                                                                                                                    (
                                                                                                                        $event
                                                                                                                    ) =>
                                                                                                                        ($data.formData.wholesale_price =
                                                                                                                            $event),
                                                                                                                error: $data
                                                                                                                    .errors
                                                                                                                    .wholesale_price
                                                                                                                    ? true
                                                                                                                    : false,
                                                                                                                "error-messages":
                                                                                                                    $data
                                                                                                                        .errors
                                                                                                                        .wholesale_price,
                                                                                                                label: _ctx.$t(
                                                                                                                    "price.wholesale"
                                                                                                                ),
                                                                                                                type: "number",
                                                                                                                required:
                                                                                                                    "",
                                                                                                                outlined:
                                                                                                                    "",
                                                                                                                dense: "",
                                                                                                                clearable:
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
                                                                                                            VTextField,
                                                                                                            {
                                                                                                                modelValue:
                                                                                                                    $data
                                                                                                                        .formData
                                                                                                                        .wholesale_price,
                                                                                                                "onUpdate:modelValue":
                                                                                                                    (
                                                                                                                        $event
                                                                                                                    ) =>
                                                                                                                        ($data.formData.wholesale_price =
                                                                                                                            $event),
                                                                                                                error: $data
                                                                                                                    .errors
                                                                                                                    .wholesale_price
                                                                                                                    ? true
                                                                                                                    : false,
                                                                                                                "error-messages":
                                                                                                                    $data
                                                                                                                        .errors
                                                                                                                        .wholesale_price,
                                                                                                                label: _ctx.$t(
                                                                                                                    "price.wholesale"
                                                                                                                ),
                                                                                                                type: "number",
                                                                                                                required:
                                                                                                                    "",
                                                                                                                outlined:
                                                                                                                    "",
                                                                                                                dense: "",
                                                                                                                clearable:
                                                                                                                    "",
                                                                                                            },
                                                                                                            null,
                                                                                                            8,
                                                                                                            [
                                                                                                                "modelValue",
                                                                                                                "onUpdate:modelValue",
                                                                                                                "error",
                                                                                                                "error-messages",
                                                                                                                "label",
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
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CCol,
                                                                                {
                                                                                    md: "3",
                                                                                    sm: "3",
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
                                                                                                            VTextField,
                                                                                                            {
                                                                                                                modelValue:
                                                                                                                    $data
                                                                                                                        .formData
                                                                                                                        .retail_price,
                                                                                                                "onUpdate:modelValue":
                                                                                                                    (
                                                                                                                        $event
                                                                                                                    ) =>
                                                                                                                        ($data.formData.retail_price =
                                                                                                                            $event),
                                                                                                                error: $data
                                                                                                                    .errors
                                                                                                                    .retail_price
                                                                                                                    ? true
                                                                                                                    : false,
                                                                                                                "error-messages":
                                                                                                                    $data
                                                                                                                        .errors
                                                                                                                        .retail_price,
                                                                                                                label: _ctx.$t(
                                                                                                                    "price.retail"
                                                                                                                ),
                                                                                                                type: "number",
                                                                                                                required:
                                                                                                                    "",
                                                                                                                outlined:
                                                                                                                    "",
                                                                                                                dense: "",
                                                                                                                clearable:
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
                                                                                                            VTextField,
                                                                                                            {
                                                                                                                modelValue:
                                                                                                                    $data
                                                                                                                        .formData
                                                                                                                        .retail_price,
                                                                                                                "onUpdate:modelValue":
                                                                                                                    (
                                                                                                                        $event
                                                                                                                    ) =>
                                                                                                                        ($data.formData.retail_price =
                                                                                                                            $event),
                                                                                                                error: $data
                                                                                                                    .errors
                                                                                                                    .retail_price
                                                                                                                    ? true
                                                                                                                    : false,
                                                                                                                "error-messages":
                                                                                                                    $data
                                                                                                                        .errors
                                                                                                                        .retail_price,
                                                                                                                label: _ctx.$t(
                                                                                                                    "price.retail"
                                                                                                                ),
                                                                                                                type: "number",
                                                                                                                required:
                                                                                                                    "",
                                                                                                                outlined:
                                                                                                                    "",
                                                                                                                dense: "",
                                                                                                                clearable:
                                                                                                                    "",
                                                                                                            },
                                                                                                            null,
                                                                                                            8,
                                                                                                            [
                                                                                                                "modelValue",
                                                                                                                "onUpdate:modelValue",
                                                                                                                "error",
                                                                                                                "error-messages",
                                                                                                                "label",
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
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CCol,
                                                                                {
                                                                                    md: "3",
                                                                                    sm: "3",
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
                                                                                                            VSelect,
                                                                                                            {
                                                                                                                modelValue:
                                                                                                                    $data
                                                                                                                        .formData
                                                                                                                        .type,
                                                                                                                "onUpdate:modelValue":
                                                                                                                    (
                                                                                                                        $event
                                                                                                                    ) =>
                                                                                                                        ($data.formData.type =
                                                                                                                            $event),
                                                                                                                items: $data.goodsTypes,
                                                                                                                label: _ctx.$t(
                                                                                                                    "type"
                                                                                                                ),
                                                                                                                error: $data
                                                                                                                    .errors
                                                                                                                    .type
                                                                                                                    ? true
                                                                                                                    : false,
                                                                                                                "error-messages":
                                                                                                                    $data
                                                                                                                        .errors
                                                                                                                        .type,
                                                                                                                "item-title":
                                                                                                                    "name",
                                                                                                                "item-value":
                                                                                                                    "name",
                                                                                                                disabled:
                                                                                                                    "",
                                                                                                                required:
                                                                                                                    "",
                                                                                                                outlined:
                                                                                                                    "",
                                                                                                                dense: "",
                                                                                                            },
                                                                                                            null,
                                                                                                            _parent5,
                                                                                                            _scopeId4
                                                                                                        )
                                                                                                    );
                                                                                                } else {
                                                                                                    return [
                                                                                                        createVNode(
                                                                                                            VSelect,
                                                                                                            {
                                                                                                                modelValue:
                                                                                                                    $data
                                                                                                                        .formData
                                                                                                                        .type,
                                                                                                                "onUpdate:modelValue":
                                                                                                                    (
                                                                                                                        $event
                                                                                                                    ) =>
                                                                                                                        ($data.formData.type =
                                                                                                                            $event),
                                                                                                                items: $data.goodsTypes,
                                                                                                                label: _ctx.$t(
                                                                                                                    "type"
                                                                                                                ),
                                                                                                                error: $data
                                                                                                                    .errors
                                                                                                                    .type
                                                                                                                    ? true
                                                                                                                    : false,
                                                                                                                "error-messages":
                                                                                                                    $data
                                                                                                                        .errors
                                                                                                                        .type,
                                                                                                                "item-title":
                                                                                                                    "name",
                                                                                                                "item-value":
                                                                                                                    "name",
                                                                                                                disabled:
                                                                                                                    "",
                                                                                                                required:
                                                                                                                    "",
                                                                                                                outlined:
                                                                                                                    "",
                                                                                                                dense: "",
                                                                                                            },
                                                                                                            null,
                                                                                                            8,
                                                                                                            [
                                                                                                                "modelValue",
                                                                                                                "onUpdate:modelValue",
                                                                                                                "items",
                                                                                                                "label",
                                                                                                                "error",
                                                                                                                "error-messages",
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
                                                                                    md: "3",
                                                                                    sm: "3",
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            () => [
                                                                                                createVNode(
                                                                                                    VTextField,
                                                                                                    {
                                                                                                        modelValue:
                                                                                                            $data
                                                                                                                .formData
                                                                                                                .cost_price,
                                                                                                        "onUpdate:modelValue":
                                                                                                            (
                                                                                                                $event
                                                                                                            ) =>
                                                                                                                ($data.formData.cost_price =
                                                                                                                    $event),
                                                                                                        error: $data
                                                                                                            .errors
                                                                                                            .cost_price
                                                                                                            ? true
                                                                                                            : false,
                                                                                                        "error-messages":
                                                                                                            $data
                                                                                                                .errors
                                                                                                                .cost_price,
                                                                                                        label: _ctx.$t(
                                                                                                            "price.cost"
                                                                                                        ),
                                                                                                        type: "number",
                                                                                                        required:
                                                                                                            "",
                                                                                                        outlined:
                                                                                                            "",
                                                                                                        dense: "",
                                                                                                        clearable:
                                                                                                            "",
                                                                                                    },
                                                                                                    null,
                                                                                                    8,
                                                                                                    [
                                                                                                        "modelValue",
                                                                                                        "onUpdate:modelValue",
                                                                                                        "error",
                                                                                                        "error-messages",
                                                                                                        "label",
                                                                                                    ]
                                                                                                ),
                                                                                            ]
                                                                                        ),
                                                                                    _: 1,
                                                                                }
                                                                            ),
                                                                            createVNode(
                                                                                _component_CCol,
                                                                                {
                                                                                    md: "3",
                                                                                    sm: "3",
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            () => [
                                                                                                createVNode(
                                                                                                    VTextField,
                                                                                                    {
                                                                                                        modelValue:
                                                                                                            $data
                                                                                                                .formData
                                                                                                                .wholesale_price,
                                                                                                        "onUpdate:modelValue":
                                                                                                            (
                                                                                                                $event
                                                                                                            ) =>
                                                                                                                ($data.formData.wholesale_price =
                                                                                                                    $event),
                                                                                                        error: $data
                                                                                                            .errors
                                                                                                            .wholesale_price
                                                                                                            ? true
                                                                                                            : false,
                                                                                                        "error-messages":
                                                                                                            $data
                                                                                                                .errors
                                                                                                                .wholesale_price,
                                                                                                        label: _ctx.$t(
                                                                                                            "price.wholesale"
                                                                                                        ),
                                                                                                        type: "number",
                                                                                                        required:
                                                                                                            "",
                                                                                                        outlined:
                                                                                                            "",
                                                                                                        dense: "",
                                                                                                        clearable:
                                                                                                            "",
                                                                                                    },
                                                                                                    null,
                                                                                                    8,
                                                                                                    [
                                                                                                        "modelValue",
                                                                                                        "onUpdate:modelValue",
                                                                                                        "error",
                                                                                                        "error-messages",
                                                                                                        "label",
                                                                                                    ]
                                                                                                ),
                                                                                            ]
                                                                                        ),
                                                                                    _: 1,
                                                                                }
                                                                            ),
                                                                            createVNode(
                                                                                _component_CCol,
                                                                                {
                                                                                    md: "3",
                                                                                    sm: "3",
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            () => [
                                                                                                createVNode(
                                                                                                    VTextField,
                                                                                                    {
                                                                                                        modelValue:
                                                                                                            $data
                                                                                                                .formData
                                                                                                                .retail_price,
                                                                                                        "onUpdate:modelValue":
                                                                                                            (
                                                                                                                $event
                                                                                                            ) =>
                                                                                                                ($data.formData.retail_price =
                                                                                                                    $event),
                                                                                                        error: $data
                                                                                                            .errors
                                                                                                            .retail_price
                                                                                                            ? true
                                                                                                            : false,
                                                                                                        "error-messages":
                                                                                                            $data
                                                                                                                .errors
                                                                                                                .retail_price,
                                                                                                        label: _ctx.$t(
                                                                                                            "price.retail"
                                                                                                        ),
                                                                                                        type: "number",
                                                                                                        required:
                                                                                                            "",
                                                                                                        outlined:
                                                                                                            "",
                                                                                                        dense: "",
                                                                                                        clearable:
                                                                                                            "",
                                                                                                    },
                                                                                                    null,
                                                                                                    8,
                                                                                                    [
                                                                                                        "modelValue",
                                                                                                        "onUpdate:modelValue",
                                                                                                        "error",
                                                                                                        "error-messages",
                                                                                                        "label",
                                                                                                    ]
                                                                                                ),
                                                                                            ]
                                                                                        ),
                                                                                    _: 1,
                                                                                }
                                                                            ),
                                                                            createVNode(
                                                                                _component_CCol,
                                                                                {
                                                                                    md: "3",
                                                                                    sm: "3",
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            () => [
                                                                                                createVNode(
                                                                                                    VSelect,
                                                                                                    {
                                                                                                        modelValue:
                                                                                                            $data
                                                                                                                .formData
                                                                                                                .type,
                                                                                                        "onUpdate:modelValue":
                                                                                                            (
                                                                                                                $event
                                                                                                            ) =>
                                                                                                                ($data.formData.type =
                                                                                                                    $event),
                                                                                                        items: $data.goodsTypes,
                                                                                                        label: _ctx.$t(
                                                                                                            "type"
                                                                                                        ),
                                                                                                        error: $data
                                                                                                            .errors
                                                                                                            .type
                                                                                                            ? true
                                                                                                            : false,
                                                                                                        "error-messages":
                                                                                                            $data
                                                                                                                .errors
                                                                                                                .type,
                                                                                                        "item-title":
                                                                                                            "name",
                                                                                                        "item-value":
                                                                                                            "name",
                                                                                                        disabled:
                                                                                                            "",
                                                                                                        required:
                                                                                                            "",
                                                                                                        outlined:
                                                                                                            "",
                                                                                                        dense: "",
                                                                                                    },
                                                                                                    null,
                                                                                                    8,
                                                                                                    [
                                                                                                        "modelValue",
                                                                                                        "onUpdate:modelValue",
                                                                                                        "items",
                                                                                                        "label",
                                                                                                        "error",
                                                                                                        "error-messages",
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
                                                        VAutocomplete,
                                                        {
                                                            modelValue:
                                                                $data.formData
                                                                    .supplier,
                                                            "onUpdate:modelValue":
                                                                ($event) =>
                                                                    ($data.formData.supplier =
                                                                        $event),
                                                            items: $data
                                                                .supplier.items,
                                                            loading:
                                                                $data.supplier
                                                                    .loading,
                                                            "search-input":
                                                                $data.supplier
                                                                    .search,
                                                            required: "",
                                                            outlined: "",
                                                            dense: "",
                                                            "hide-no-data": "",
                                                            "hide-selected": "",
                                                            "item-title":
                                                                "name",
                                                            "item-value": "id",
                                                            label: _ctx.$t(
                                                                "supplier"
                                                            ),
                                                            error: $data.errors
                                                                .supplier
                                                                ? true
                                                                : false,
                                                            "error-messages":
                                                                $data.errors
                                                                    .supplier,
                                                            "return-object": "",
                                                        },
                                                        null,
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                                _push3(
                                                    ssrRenderComponent(
                                                        VAutocomplete,
                                                        {
                                                            modelValue:
                                                                $data.formData
                                                                    .categories,
                                                            "onUpdate:modelValue":
                                                                ($event) =>
                                                                    ($data.formData.categories =
                                                                        $event),
                                                            items: $data
                                                                .category.items,
                                                            loading:
                                                                $data.category
                                                                    .loading,
                                                            "search-input":
                                                                $data.category
                                                                    .search,
                                                            "hide-no-data": "",
                                                            "hide-selected": "",
                                                            outlined: "",
                                                            "item-title":
                                                                "name",
                                                            "item-value": "id",
                                                            label: _ctx.$t(
                                                                "categories"
                                                            ),
                                                            "return-object": "",
                                                            chips: "",
                                                            "small-chips": "",
                                                            "closable-chips":
                                                                "",
                                                            multiple: "",
                                                        },
                                                        null,
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                                _push3(
                                                    ssrRenderComponent(
                                                        VAutocomplete,
                                                        {
                                                            modelValue:
                                                                $data.formData
                                                                    .warehouses,
                                                            "onUpdate:modelValue":
                                                                ($event) =>
                                                                    ($data.formData.warehouses =
                                                                        $event),
                                                            items: $data
                                                                .warehouse
                                                                .items,
                                                            loading:
                                                                $data.warehouse
                                                                    .loading,
                                                            "search-input":
                                                                $data.warehouse
                                                                    .search,
                                                            required: "",
                                                            outlined: "",
                                                            dense: "",
                                                            "hide-no-data": "",
                                                            "hide-selected": "",
                                                            "item-title":
                                                                "name",
                                                            "item-value": "id",
                                                            label: _ctx.$t(
                                                                "warehouse"
                                                            ),
                                                            "return-object": "",
                                                            chips: "",
                                                            "small-chips": "",
                                                            "closable-chips":
                                                                "",
                                                            multiple: "",
                                                        },
                                                        null,
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                                _push3(
                                                    ssrRenderComponent(
                                                        VTextField,
                                                        {
                                                            modelValue:
                                                                $data.formData
                                                                    .description,
                                                            "onUpdate:modelValue":
                                                                ($event) =>
                                                                    ($data.formData.description =
                                                                        $event),
                                                            label: _ctx.$t(
                                                                "description"
                                                            ),
                                                            required: "",
                                                            outlined: "",
                                                            dense: "",
                                                            clearable: "",
                                                        },
                                                        null,
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                                _push3(
                                                    `<hr data-v-f9ebed7c${_scopeId2}>`
                                                );
                                                if (
                                                    _ctx.$store.getters.isAdmin
                                                ) {
                                                    _push3(
                                                        ssrRenderComponent(
                                                            _component_CButton,
                                                            {
                                                                onClick:
                                                                    $options.update,
                                                                color: "primary",
                                                                class: "px-4",
                                                            },
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
                                                                                if (
                                                                                    $data.updateLoading
                                                                                ) {
                                                                                    _push4(
                                                                                        ssrRenderComponent(
                                                                                            VProgressCircular,
                                                                                            {
                                                                                                indeterminate:
                                                                                                    "",
                                                                                                size: 15,
                                                                                            },
                                                                                            null,
                                                                                            _parent4,
                                                                                            _scopeId3
                                                                                        )
                                                                                    );
                                                                                } else {
                                                                                    _push4(
                                                                                        `<!---->`
                                                                                    );
                                                                                }
                                                                                _push4(
                                                                                    ` ${ssrInterpolate(
                                                                                        _ctx.$t(
                                                                                            "button.update"
                                                                                        )
                                                                                    )}`
                                                                                );
                                                                            } else {
                                                                                return [
                                                                                    $data.updateLoading
                                                                                        ? (openBlock(),
                                                                                          createBlock(
                                                                                              VProgressCircular,
                                                                                              {
                                                                                                  key: 0,
                                                                                                  indeterminate:
                                                                                                      "",
                                                                                                  size: 15,
                                                                                              }
                                                                                          ))
                                                                                        : createCommentVNode(
                                                                                              "",
                                                                                              true
                                                                                          ),
                                                                                    createTextVNode(
                                                                                        " " +
                                                                                            toDisplayString(
                                                                                                _ctx.$t(
                                                                                                    "button.update"
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
                                                            _parent3,
                                                            _scopeId2
                                                        )
                                                    );
                                                } else {
                                                    _push3(`<!---->`);
                                                }
                                                _push3(`</form>`);
                                            } else {
                                                return [
                                                    createVNode(
                                                        "form",
                                                        {
                                                            onSubmit:
                                                                withModifiers(() => {}, [
                                                                    "prevent",
                                                                ]),
                                                        },
                                                        [
                                                            createVNode(
                                                                VTextField,
                                                                {
                                                                    modelValue:
                                                                        $data
                                                                            .formData
                                                                            .name,
                                                                    "onUpdate:modelValue":
                                                                        (
                                                                            $event
                                                                        ) =>
                                                                            ($data.formData.name =
                                                                                $event),
                                                                    label: _ctx.$t(
                                                                        "name"
                                                                    ),
                                                                    error: $data
                                                                        .errors
                                                                        .name
                                                                        ? true
                                                                        : false,
                                                                    "error-messages":
                                                                        $data
                                                                            .errors
                                                                            .name,
                                                                    required:
                                                                        "",
                                                                    outlined:
                                                                        "",
                                                                    dense: "",
                                                                    clearable:
                                                                        "",
                                                                    maxlength:
                                                                        "45",
                                                                },
                                                                null,
                                                                8,
                                                                [
                                                                    "modelValue",
                                                                    "onUpdate:modelValue",
                                                                    "label",
                                                                    "error",
                                                                    "error-messages",
                                                                ]
                                                            ),
                                                            createVNode(
                                                                VTextField,
                                                                {
                                                                    modelValue:
                                                                        $data
                                                                            .formData
                                                                            .stock_alert,
                                                                    "onUpdate:modelValue":
                                                                        (
                                                                            $event
                                                                        ) =>
                                                                            ($data.formData.stock_alert =
                                                                                $event),
                                                                    label: _ctx.$t(
                                                                        "stockalert"
                                                                    ),
                                                                    error: $data
                                                                        .errors
                                                                        .stock_alert
                                                                        ? true
                                                                        : false,
                                                                    "error-messages":
                                                                        $data
                                                                            .errors
                                                                            .stock_alert,
                                                                    type: "number",
                                                                    required:
                                                                        "",
                                                                    outlined:
                                                                        "",
                                                                    dense: "",
                                                                    clearable:
                                                                        "",
                                                                },
                                                                null,
                                                                8,
                                                                [
                                                                    "modelValue",
                                                                    "onUpdate:modelValue",
                                                                    "label",
                                                                    "error",
                                                                    "error-messages",
                                                                ]
                                                            ),
                                                            createVNode(
                                                                _component_CRow,
                                                                null,
                                                                {
                                                                    default:
                                                                        withCtx(
                                                                            () => [
                                                                                createVNode(
                                                                                    _component_CCol,
                                                                                    {
                                                                                        md: "3",
                                                                                        sm: "3",
                                                                                    },
                                                                                    {
                                                                                        default:
                                                                                            withCtx(
                                                                                                () => [
                                                                                                    createVNode(
                                                                                                        VTextField,
                                                                                                        {
                                                                                                            modelValue:
                                                                                                                $data
                                                                                                                    .formData
                                                                                                                    .cost_price,
                                                                                                            "onUpdate:modelValue":
                                                                                                                (
                                                                                                                    $event
                                                                                                                ) =>
                                                                                                                    ($data.formData.cost_price =
                                                                                                                        $event),
                                                                                                            error: $data
                                                                                                                .errors
                                                                                                                .cost_price
                                                                                                                ? true
                                                                                                                : false,
                                                                                                            "error-messages":
                                                                                                                $data
                                                                                                                    .errors
                                                                                                                    .cost_price,
                                                                                                            label: _ctx.$t(
                                                                                                                "price.cost"
                                                                                                            ),
                                                                                                            type: "number",
                                                                                                            required:
                                                                                                                "",
                                                                                                            outlined:
                                                                                                                "",
                                                                                                            dense: "",
                                                                                                            clearable:
                                                                                                                "",
                                                                                                        },
                                                                                                        null,
                                                                                                        8,
                                                                                                        [
                                                                                                            "modelValue",
                                                                                                            "onUpdate:modelValue",
                                                                                                            "error",
                                                                                                            "error-messages",
                                                                                                            "label",
                                                                                                        ]
                                                                                                    ),
                                                                                                ]
                                                                                            ),
                                                                                        _: 1,
                                                                                    }
                                                                                ),
                                                                                createVNode(
                                                                                    _component_CCol,
                                                                                    {
                                                                                        md: "3",
                                                                                        sm: "3",
                                                                                    },
                                                                                    {
                                                                                        default:
                                                                                            withCtx(
                                                                                                () => [
                                                                                                    createVNode(
                                                                                                        VTextField,
                                                                                                        {
                                                                                                            modelValue:
                                                                                                                $data
                                                                                                                    .formData
                                                                                                                    .wholesale_price,
                                                                                                            "onUpdate:modelValue":
                                                                                                                (
                                                                                                                    $event
                                                                                                                ) =>
                                                                                                                    ($data.formData.wholesale_price =
                                                                                                                        $event),
                                                                                                            error: $data
                                                                                                                .errors
                                                                                                                .wholesale_price
                                                                                                                ? true
                                                                                                                : false,
                                                                                                            "error-messages":
                                                                                                                $data
                                                                                                                    .errors
                                                                                                                    .wholesale_price,
                                                                                                            label: _ctx.$t(
                                                                                                                "price.wholesale"
                                                                                                            ),
                                                                                                            type: "number",
                                                                                                            required:
                                                                                                                "",
                                                                                                            outlined:
                                                                                                                "",
                                                                                                            dense: "",
                                                                                                            clearable:
                                                                                                                "",
                                                                                                        },
                                                                                                        null,
                                                                                                        8,
                                                                                                        [
                                                                                                            "modelValue",
                                                                                                            "onUpdate:modelValue",
                                                                                                            "error",
                                                                                                            "error-messages",
                                                                                                            "label",
                                                                                                        ]
                                                                                                    ),
                                                                                                ]
                                                                                            ),
                                                                                        _: 1,
                                                                                    }
                                                                                ),
                                                                                createVNode(
                                                                                    _component_CCol,
                                                                                    {
                                                                                        md: "3",
                                                                                        sm: "3",
                                                                                    },
                                                                                    {
                                                                                        default:
                                                                                            withCtx(
                                                                                                () => [
                                                                                                    createVNode(
                                                                                                        VTextField,
                                                                                                        {
                                                                                                            modelValue:
                                                                                                                $data
                                                                                                                    .formData
                                                                                                                    .retail_price,
                                                                                                            "onUpdate:modelValue":
                                                                                                                (
                                                                                                                    $event
                                                                                                                ) =>
                                                                                                                    ($data.formData.retail_price =
                                                                                                                        $event),
                                                                                                            error: $data
                                                                                                                .errors
                                                                                                                .retail_price
                                                                                                                ? true
                                                                                                                : false,
                                                                                                            "error-messages":
                                                                                                                $data
                                                                                                                    .errors
                                                                                                                    .retail_price,
                                                                                                            label: _ctx.$t(
                                                                                                                "price.retail"
                                                                                                            ),
                                                                                                            type: "number",
                                                                                                            required:
                                                                                                                "",
                                                                                                            outlined:
                                                                                                                "",
                                                                                                            dense: "",
                                                                                                            clearable:
                                                                                                                "",
                                                                                                        },
                                                                                                        null,
                                                                                                        8,
                                                                                                        [
                                                                                                            "modelValue",
                                                                                                            "onUpdate:modelValue",
                                                                                                            "error",
                                                                                                            "error-messages",
                                                                                                            "label",
                                                                                                        ]
                                                                                                    ),
                                                                                                ]
                                                                                            ),
                                                                                        _: 1,
                                                                                    }
                                                                                ),
                                                                                createVNode(
                                                                                    _component_CCol,
                                                                                    {
                                                                                        md: "3",
                                                                                        sm: "3",
                                                                                    },
                                                                                    {
                                                                                        default:
                                                                                            withCtx(
                                                                                                () => [
                                                                                                    createVNode(
                                                                                                        VSelect,
                                                                                                        {
                                                                                                            modelValue:
                                                                                                                $data
                                                                                                                    .formData
                                                                                                                    .type,
                                                                                                            "onUpdate:modelValue":
                                                                                                                (
                                                                                                                    $event
                                                                                                                ) =>
                                                                                                                    ($data.formData.type =
                                                                                                                        $event),
                                                                                                            items: $data.goodsTypes,
                                                                                                            label: _ctx.$t(
                                                                                                                "type"
                                                                                                            ),
                                                                                                            error: $data
                                                                                                                .errors
                                                                                                                .type
                                                                                                                ? true
                                                                                                                : false,
                                                                                                            "error-messages":
                                                                                                                $data
                                                                                                                    .errors
                                                                                                                    .type,
                                                                                                            "item-title":
                                                                                                                "name",
                                                                                                            "item-value":
                                                                                                                "name",
                                                                                                            disabled:
                                                                                                                "",
                                                                                                            required:
                                                                                                                "",
                                                                                                            outlined:
                                                                                                                "",
                                                                                                            dense: "",
                                                                                                        },
                                                                                                        null,
                                                                                                        8,
                                                                                                        [
                                                                                                            "modelValue",
                                                                                                            "onUpdate:modelValue",
                                                                                                            "items",
                                                                                                            "label",
                                                                                                            "error",
                                                                                                            "error-messages",
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
                                                                VAutocomplete,
                                                                {
                                                                    modelValue:
                                                                        $data
                                                                            .formData
                                                                            .supplier,
                                                                    "onUpdate:modelValue":
                                                                        (
                                                                            $event
                                                                        ) =>
                                                                            ($data.formData.supplier =
                                                                                $event),
                                                                    items: $data
                                                                        .supplier
                                                                        .items,
                                                                    loading:
                                                                        $data
                                                                            .supplier
                                                                            .loading,
                                                                    "search-input":
                                                                        $data
                                                                            .supplier
                                                                            .search,
                                                                    required:
                                                                        "",
                                                                    outlined:
                                                                        "",
                                                                    dense: "",
                                                                    "hide-no-data":
                                                                        "",
                                                                    "hide-selected":
                                                                        "",
                                                                    "item-title":
                                                                        "name",
                                                                    "item-value":
                                                                        "id",
                                                                    label: _ctx.$t(
                                                                        "supplier"
                                                                    ),
                                                                    error: $data
                                                                        .errors
                                                                        .supplier
                                                                        ? true
                                                                        : false,
                                                                    "error-messages":
                                                                        $data
                                                                            .errors
                                                                            .supplier,
                                                                    "return-object":
                                                                        "",
                                                                },
                                                                null,
                                                                8,
                                                                [
                                                                    "modelValue",
                                                                    "onUpdate:modelValue",
                                                                    "items",
                                                                    "loading",
                                                                    "search-input",
                                                                    "label",
                                                                    "error",
                                                                    "error-messages",
                                                                ]
                                                            ),
                                                            createVNode(
                                                                VAutocomplete,
                                                                {
                                                                    modelValue:
                                                                        $data
                                                                            .formData
                                                                            .categories,
                                                                    "onUpdate:modelValue":
                                                                        (
                                                                            $event
                                                                        ) =>
                                                                            ($data.formData.categories =
                                                                                $event),
                                                                    items: $data
                                                                        .category
                                                                        .items,
                                                                    loading:
                                                                        $data
                                                                            .category
                                                                            .loading,
                                                                    "search-input":
                                                                        $data
                                                                            .category
                                                                            .search,
                                                                    "hide-no-data":
                                                                        "",
                                                                    "hide-selected":
                                                                        "",
                                                                    outlined:
                                                                        "",
                                                                    "item-title":
                                                                        "name",
                                                                    "item-value":
                                                                        "id",
                                                                    label: _ctx.$t(
                                                                        "categories"
                                                                    ),
                                                                    "return-object":
                                                                        "",
                                                                    chips: "",
                                                                    "small-chips":
                                                                        "",
                                                                    "closable-chips":
                                                                        "",
                                                                    multiple:
                                                                        "",
                                                                },
                                                                null,
                                                                8,
                                                                [
                                                                    "modelValue",
                                                                    "onUpdate:modelValue",
                                                                    "items",
                                                                    "loading",
                                                                    "search-input",
                                                                    "label",
                                                                ]
                                                            ),
                                                            createVNode(
                                                                VAutocomplete,
                                                                {
                                                                    modelValue:
                                                                        $data
                                                                            .formData
                                                                            .warehouses,
                                                                    "onUpdate:modelValue":
                                                                        (
                                                                            $event
                                                                        ) =>
                                                                            ($data.formData.warehouses =
                                                                                $event),
                                                                    items: $data
                                                                        .warehouse
                                                                        .items,
                                                                    loading:
                                                                        $data
                                                                            .warehouse
                                                                            .loading,
                                                                    "search-input":
                                                                        $data
                                                                            .warehouse
                                                                            .search,
                                                                    required:
                                                                        "",
                                                                    outlined:
                                                                        "",
                                                                    dense: "",
                                                                    "hide-no-data":
                                                                        "",
                                                                    "hide-selected":
                                                                        "",
                                                                    "item-title":
                                                                        "name",
                                                                    "item-value":
                                                                        "id",
                                                                    label: _ctx.$t(
                                                                        "warehouse"
                                                                    ),
                                                                    "return-object":
                                                                        "",
                                                                    chips: "",
                                                                    "small-chips":
                                                                        "",
                                                                    "closable-chips":
                                                                        "",
                                                                    multiple:
                                                                        "",
                                                                },
                                                                null,
                                                                8,
                                                                [
                                                                    "modelValue",
                                                                    "onUpdate:modelValue",
                                                                    "items",
                                                                    "loading",
                                                                    "search-input",
                                                                    "label",
                                                                ]
                                                            ),
                                                            createVNode(
                                                                VTextField,
                                                                {
                                                                    modelValue:
                                                                        $data
                                                                            .formData
                                                                            .description,
                                                                    "onUpdate:modelValue":
                                                                        (
                                                                            $event
                                                                        ) =>
                                                                            ($data.formData.description =
                                                                                $event),
                                                                    label: _ctx.$t(
                                                                        "description"
                                                                    ),
                                                                    required:
                                                                        "",
                                                                    outlined:
                                                                        "",
                                                                    dense: "",
                                                                    clearable:
                                                                        "",
                                                                },
                                                                null,
                                                                8,
                                                                [
                                                                    "modelValue",
                                                                    "onUpdate:modelValue",
                                                                    "label",
                                                                ]
                                                            ),
                                                            createVNode("hr"),
                                                            _ctx.$store.getters
                                                                .isAdmin
                                                                ? (openBlock(),
                                                                  createBlock(
                                                                      _component_CButton,
                                                                      {
                                                                          key: 0,
                                                                          onClick:
                                                                              $options.update,
                                                                          color: "primary",
                                                                          class: "px-4",
                                                                      },
                                                                      {
                                                                          default:
                                                                              withCtx(
                                                                                  () => [
                                                                                      $data.updateLoading
                                                                                          ? (openBlock(),
                                                                                            createBlock(
                                                                                                VProgressCircular,
                                                                                                {
                                                                                                    key: 0,
                                                                                                    indeterminate:
                                                                                                        "",
                                                                                                    size: 15,
                                                                                                }
                                                                                            ))
                                                                                          : createCommentVNode(
                                                                                                "",
                                                                                                true
                                                                                            ),
                                                                                      createTextVNode(
                                                                                          " " +
                                                                                              toDisplayString(
                                                                                                  _ctx.$t(
                                                                                                      "button.update"
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
                                                                      ]
                                                                  ))
                                                                : createCommentVNode(
                                                                      "",
                                                                      true
                                                                  ),
                                                        ],
                                                        40,
                                                        ["onSubmit"]
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
                                    active: $data.fetchLoading,
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
                                        "form",
                                        {
                                            onSubmit: withModifiers(() => {}, [
                                                "prevent",
                                            ]),
                                        },
                                        [
                                            createVNode(
                                                VTextField,
                                                {
                                                    modelValue:
                                                        $data.formData.name,
                                                    "onUpdate:modelValue": (
                                                        $event
                                                    ) =>
                                                        ($data.formData.name =
                                                            $event),
                                                    label: _ctx.$t("name"),
                                                    error: $data.errors.name
                                                        ? true
                                                        : false,
                                                    "error-messages":
                                                        $data.errors.name,
                                                    required: "",
                                                    outlined: "",
                                                    dense: "",
                                                    clearable: "",
                                                    maxlength: "45",
                                                },
                                                null,
                                                8,
                                                [
                                                    "modelValue",
                                                    "onUpdate:modelValue",
                                                    "label",
                                                    "error",
                                                    "error-messages",
                                                ]
                                            ),
                                            createVNode(
                                                VTextField,
                                                {
                                                    modelValue:
                                                        $data.formData
                                                            .stock_alert,
                                                    "onUpdate:modelValue": (
                                                        $event
                                                    ) =>
                                                        ($data.formData.stock_alert =
                                                            $event),
                                                    label: _ctx.$t(
                                                        "stockalert"
                                                    ),
                                                    error: $data.errors
                                                        .stock_alert
                                                        ? true
                                                        : false,
                                                    "error-messages":
                                                        $data.errors
                                                            .stock_alert,
                                                    type: "number",
                                                    required: "",
                                                    outlined: "",
                                                    dense: "",
                                                    clearable: "",
                                                },
                                                null,
                                                8,
                                                [
                                                    "modelValue",
                                                    "onUpdate:modelValue",
                                                    "label",
                                                    "error",
                                                    "error-messages",
                                                ]
                                            ),
                                            createVNode(_component_CRow, null, {
                                                default: withCtx(() => [
                                                    createVNode(
                                                        _component_CCol,
                                                        {
                                                            md: "3",
                                                            sm: "3",
                                                        },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        VTextField,
                                                                        {
                                                                            modelValue:
                                                                                $data
                                                                                    .formData
                                                                                    .cost_price,
                                                                            "onUpdate:modelValue":
                                                                                (
                                                                                    $event
                                                                                ) =>
                                                                                    ($data.formData.cost_price =
                                                                                        $event),
                                                                            error: $data
                                                                                .errors
                                                                                .cost_price
                                                                                ? true
                                                                                : false,
                                                                            "error-messages":
                                                                                $data
                                                                                    .errors
                                                                                    .cost_price,
                                                                            label: _ctx.$t(
                                                                                "price.cost"
                                                                            ),
                                                                            type: "number",
                                                                            required:
                                                                                "",
                                                                            outlined:
                                                                                "",
                                                                            dense: "",
                                                                            clearable:
                                                                                "",
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            "modelValue",
                                                                            "onUpdate:modelValue",
                                                                            "error",
                                                                            "error-messages",
                                                                            "label",
                                                                        ]
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        }
                                                    ),
                                                    createVNode(
                                                        _component_CCol,
                                                        {
                                                            md: "3",
                                                            sm: "3",
                                                        },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        VTextField,
                                                                        {
                                                                            modelValue:
                                                                                $data
                                                                                    .formData
                                                                                    .wholesale_price,
                                                                            "onUpdate:modelValue":
                                                                                (
                                                                                    $event
                                                                                ) =>
                                                                                    ($data.formData.wholesale_price =
                                                                                        $event),
                                                                            error: $data
                                                                                .errors
                                                                                .wholesale_price
                                                                                ? true
                                                                                : false,
                                                                            "error-messages":
                                                                                $data
                                                                                    .errors
                                                                                    .wholesale_price,
                                                                            label: _ctx.$t(
                                                                                "price.wholesale"
                                                                            ),
                                                                            type: "number",
                                                                            required:
                                                                                "",
                                                                            outlined:
                                                                                "",
                                                                            dense: "",
                                                                            clearable:
                                                                                "",
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            "modelValue",
                                                                            "onUpdate:modelValue",
                                                                            "error",
                                                                            "error-messages",
                                                                            "label",
                                                                        ]
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        }
                                                    ),
                                                    createVNode(
                                                        _component_CCol,
                                                        {
                                                            md: "3",
                                                            sm: "3",
                                                        },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        VTextField,
                                                                        {
                                                                            modelValue:
                                                                                $data
                                                                                    .formData
                                                                                    .retail_price,
                                                                            "onUpdate:modelValue":
                                                                                (
                                                                                    $event
                                                                                ) =>
                                                                                    ($data.formData.retail_price =
                                                                                        $event),
                                                                            error: $data
                                                                                .errors
                                                                                .retail_price
                                                                                ? true
                                                                                : false,
                                                                            "error-messages":
                                                                                $data
                                                                                    .errors
                                                                                    .retail_price,
                                                                            label: _ctx.$t(
                                                                                "price.retail"
                                                                            ),
                                                                            type: "number",
                                                                            required:
                                                                                "",
                                                                            outlined:
                                                                                "",
                                                                            dense: "",
                                                                            clearable:
                                                                                "",
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            "modelValue",
                                                                            "onUpdate:modelValue",
                                                                            "error",
                                                                            "error-messages",
                                                                            "label",
                                                                        ]
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        }
                                                    ),
                                                    createVNode(
                                                        _component_CCol,
                                                        {
                                                            md: "3",
                                                            sm: "3",
                                                        },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        VSelect,
                                                                        {
                                                                            modelValue:
                                                                                $data
                                                                                    .formData
                                                                                    .type,
                                                                            "onUpdate:modelValue":
                                                                                (
                                                                                    $event
                                                                                ) =>
                                                                                    ($data.formData.type =
                                                                                        $event),
                                                                            items: $data.goodsTypes,
                                                                            label: _ctx.$t(
                                                                                "type"
                                                                            ),
                                                                            error: $data
                                                                                .errors
                                                                                .type
                                                                                ? true
                                                                                : false,
                                                                            "error-messages":
                                                                                $data
                                                                                    .errors
                                                                                    .type,
                                                                            "item-title":
                                                                                "name",
                                                                            "item-value":
                                                                                "name",
                                                                            disabled:
                                                                                "",
                                                                            required:
                                                                                "",
                                                                            outlined:
                                                                                "",
                                                                            dense: "",
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            "modelValue",
                                                                            "onUpdate:modelValue",
                                                                            "items",
                                                                            "label",
                                                                            "error",
                                                                            "error-messages",
                                                                        ]
                                                                    ),
                                                                ]
                                                            ),
                                                            _: 1,
                                                        }
                                                    ),
                                                ]),
                                                _: 1,
                                            }),
                                            createVNode(
                                                VAutocomplete,
                                                {
                                                    modelValue:
                                                        $data.formData.supplier,
                                                    "onUpdate:modelValue": (
                                                        $event
                                                    ) =>
                                                        ($data.formData.supplier =
                                                            $event),
                                                    items: $data.supplier.items,
                                                    loading:
                                                        $data.supplier.loading,
                                                    "search-input":
                                                        $data.supplier.search,
                                                    required: "",
                                                    outlined: "",
                                                    dense: "",
                                                    "hide-no-data": "",
                                                    "hide-selected": "",
                                                    "item-title": "name",
                                                    "item-value": "id",
                                                    label: _ctx.$t("supplier"),
                                                    error: $data.errors.supplier
                                                        ? true
                                                        : false,
                                                    "error-messages":
                                                        $data.errors.supplier,
                                                    "return-object": "",
                                                },
                                                null,
                                                8,
                                                [
                                                    "modelValue",
                                                    "onUpdate:modelValue",
                                                    "items",
                                                    "loading",
                                                    "search-input",
                                                    "label",
                                                    "error",
                                                    "error-messages",
                                                ]
                                            ),
                                            createVNode(
                                                VAutocomplete,
                                                {
                                                    modelValue:
                                                        $data.formData
                                                            .categories,
                                                    "onUpdate:modelValue": (
                                                        $event
                                                    ) =>
                                                        ($data.formData.categories =
                                                            $event),
                                                    items: $data.category.items,
                                                    loading:
                                                        $data.category.loading,
                                                    "search-input":
                                                        $data.category.search,
                                                    "hide-no-data": "",
                                                    "hide-selected": "",
                                                    outlined: "",
                                                    "item-title": "name",
                                                    "item-value": "id",
                                                    label: _ctx.$t(
                                                        "categories"
                                                    ),
                                                    "return-object": "",
                                                    chips: "",
                                                    "small-chips": "",
                                                    "closable-chips": "",
                                                    multiple: "",
                                                },
                                                null,
                                                8,
                                                [
                                                    "modelValue",
                                                    "onUpdate:modelValue",
                                                    "items",
                                                    "loading",
                                                    "search-input",
                                                    "label",
                                                ]
                                            ),
                                            createVNode(
                                                VAutocomplete,
                                                {
                                                    modelValue:
                                                        $data.formData
                                                            .warehouses,
                                                    "onUpdate:modelValue": (
                                                        $event
                                                    ) =>
                                                        ($data.formData.warehouses =
                                                            $event),
                                                    items: $data.warehouse
                                                        .items,
                                                    loading:
                                                        $data.warehouse.loading,
                                                    "search-input":
                                                        $data.warehouse.search,
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
                                                    multiple: "",
                                                },
                                                null,
                                                8,
                                                [
                                                    "modelValue",
                                                    "onUpdate:modelValue",
                                                    "items",
                                                    "loading",
                                                    "search-input",
                                                    "label",
                                                ]
                                            ),
                                            createVNode(
                                                VTextField,
                                                {
                                                    modelValue:
                                                        $data.formData
                                                            .description,
                                                    "onUpdate:modelValue": (
                                                        $event
                                                    ) =>
                                                        ($data.formData.description =
                                                            $event),
                                                    label: _ctx.$t(
                                                        "description"
                                                    ),
                                                    required: "",
                                                    outlined: "",
                                                    dense: "",
                                                    clearable: "",
                                                },
                                                null,
                                                8,
                                                [
                                                    "modelValue",
                                                    "onUpdate:modelValue",
                                                    "label",
                                                ]
                                            ),
                                            createVNode("hr"),
                                            _ctx.$store.getters.isAdmin
                                                ? (openBlock(),
                                                  createBlock(
                                                      _component_CButton,
                                                      {
                                                          key: 0,
                                                          onClick:
                                                              $options.update,
                                                          color: "primary",
                                                          class: "px-4",
                                                      },
                                                      {
                                                          default: withCtx(
                                                              () => [
                                                                  $data.updateLoading
                                                                      ? (openBlock(),
                                                                        createBlock(
                                                                            VProgressCircular,
                                                                            {
                                                                                key: 0,
                                                                                indeterminate:
                                                                                    "",
                                                                                size: 15,
                                                                            }
                                                                        ))
                                                                      : createCommentVNode(
                                                                            "",
                                                                            true
                                                                        ),
                                                                  createTextVNode(
                                                                      " " +
                                                                          toDisplayString(
                                                                              _ctx.$t(
                                                                                  "button.update"
                                                                              )
                                                                          ),
                                                                      1
                                                                  ),
                                                              ]
                                                          ),
                                                          _: 1,
                                                      },
                                                      8,
                                                      ["onClick"]
                                                  ))
                                                : createCommentVNode("", true),
                                        ],
                                        40,
                                        ["onSubmit"]
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (
        ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())
    ).add("resources/js/views/goods/components/GoodsForm.vue");
    return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const GoodsForm = /* @__PURE__ */ _export_sfc(_sfc_main$3, [
    ["ssrRender", _sfc_ssrRender$3],
    ["__scopeId", "data-v-f9ebed7c"],
]);
const _sfc_main$2 = {
    name: "ShippingDialog",
    computed: {
        ...mapState(["goods/shippings"]),
        shippingItems() {
            return this["goods/shippings"].shippingItems;
        },
    },
    data() {
        return {
            dialog: false,
            resolve: null,
            reject: null,
            message: null,
            title: null,
            item: null,
            unit: 0,
            options: {
                color: "grey lighten-3",
                width: 400,
                zIndex: 200,
                noconfirm: false,
            },
        };
    },
    methods: {
        open(title, message, item) {
            this.dialog = true;
            this.title = title;
            this.message = message;
            this.item = item;
            let temp = this.shippingItems.find((obj) => obj.id === item.id);
            this.unit = temp ? temp.unit : 0;
            return new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            });
        },
        confirm() {
            this.$store.dispatch("goods/shipping-cart/add", {
                data: { ...this.item, unit: this.unit },
            });
            this.resolve(true);
            this.item = null;
            this.unit = 0;
            this.dialog = false;
        },
        cancel() {
            this.resolve(false);
            this.item = null;
            this.unit = 0;
            this.dialog = false;
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
    const _component_vue_barcode = resolveComponent("vue-barcode");
    const _component_v_number_input = resolveComponent("v-number-input");
    const _component_CButton = resolveComponent("CButton");
    _push(
        ssrRenderComponent(
            VDialog,
            mergeProps(
                {
                    modelValue: $data.dialog,
                    "onUpdate:modelValue": ($event) => ($data.dialog = $event),
                    "max-width": $data.options.width,
                    onKeydown: $options.cancel,
                },
                _attrs
            ),
            {
                default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                        _push2(
                            ssrRenderComponent(
                                VCard,
                                null,
                                {
                                    default: withCtx(
                                        (_2, _push3, _parent3, _scopeId2) => {
                                            if (_push3) {
                                                _push3(
                                                    ssrRenderComponent(
                                                        VToolbar,
                                                        {
                                                            dark: "",
                                                            color: $data.options
                                                                .color,
                                                            dense: "",
                                                            flat: "",
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
                                                                                VToolbarTitle,
                                                                                {
                                                                                    class: "text-body-2 font-weight-bold grey--text",
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
                                                                                                        `${ssrInterpolate(
                                                                                                            $data.title
                                                                                                        )}`
                                                                                                    );
                                                                                                } else {
                                                                                                    return [
                                                                                                        createTextVNode(
                                                                                                            toDisplayString(
                                                                                                                $data.title
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
                                                                                VToolbarTitle,
                                                                                {
                                                                                    class: "text-body-2 font-weight-bold grey--text",
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            () => [
                                                                                                createTextVNode(
                                                                                                    toDisplayString(
                                                                                                        $data.title
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
                                                    `<div class="d-flex justify-content-center"${_scopeId2}>`
                                                );
                                                if (
                                                    $data.item &&
                                                    $data.item.barcode
                                                ) {
                                                    _push3(
                                                        ssrRenderComponent(
                                                            _component_vue_barcode,
                                                            {
                                                                class: "m-4",
                                                                value: $data
                                                                    .item
                                                                    .barcode,
                                                                options: {
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
                                                _push3(
                                                    `</div><div class="d-flex justify-content-center"${_scopeId2}>`
                                                );
                                                _push3(
                                                    ssrRenderComponent(
                                                        _component_v_number_input,
                                                        {
                                                            class: "px-4",
                                                            modelValue:
                                                                $data.unit,
                                                            "onUpdate:modelValue":
                                                                ($event) =>
                                                                    ($data.unit =
                                                                        $event),
                                                            "control-variant":
                                                                "split",
                                                            max: $data.item
                                                                ? $data.item
                                                                      .stock_unit
                                                                : 0,
                                                        },
                                                        null,
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                                _push3(`</div>`);
                                                _push3(
                                                    ssrRenderComponent(
                                                        VCardActions,
                                                        { class: "pt-3" },
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
                                                                                VSpacer,
                                                                                null,
                                                                                null,
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CButton,
                                                                                {
                                                                                    onClick:
                                                                                        $options.confirm,
                                                                                    color: "danger",
                                                                                    class: "px-4",
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
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                        if (
                                                                            !$data
                                                                                .options
                                                                                .noconfirm
                                                                        ) {
                                                                            _push4(
                                                                                ssrRenderComponent(
                                                                                    _component_CButton,
                                                                                    {
                                                                                        onClick:
                                                                                            $options.cancel,
                                                                                        color: "secondary",
                                                                                        class: "px-4 ml-2",
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
                                                                                                            `${ssrInterpolate(
                                                                                                                _ctx.$t(
                                                                                                                    "button.cancel"
                                                                                                                )
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
                                                                                    _parent4,
                                                                                    _scopeId3
                                                                                )
                                                                            );
                                                                        } else {
                                                                            _push4(
                                                                                `<!---->`
                                                                            );
                                                                        }
                                                                    } else {
                                                                        return [
                                                                            createVNode(
                                                                                VSpacer
                                                                            ),
                                                                            createVNode(
                                                                                _component_CButton,
                                                                                {
                                                                                    onClick:
                                                                                        $options.confirm,
                                                                                    color: "danger",
                                                                                    class: "px-4",
                                                                                },
                                                                                {
                                                                                    default:
                                                                                        withCtx(
                                                                                            () => [
                                                                                                createTextVNode(
                                                                                                    toDisplayString(
                                                                                                        _ctx.$t(
                                                                                                            "button.confirm"
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
                                                                                ]
                                                                            ),
                                                                            !$data
                                                                                .options
                                                                                .noconfirm
                                                                                ? (openBlock(),
                                                                                  createBlock(
                                                                                      _component_CButton,
                                                                                      {
                                                                                          key: 0,
                                                                                          onClick:
                                                                                              $options.cancel,
                                                                                          color: "secondary",
                                                                                          class: "px-4 ml-2",
                                                                                      },
                                                                                      {
                                                                                          default:
                                                                                              withCtx(
                                                                                                  () => [
                                                                                                      createTextVNode(
                                                                                                          toDisplayString(
                                                                                                              _ctx.$t(
                                                                                                                  "button.cancel"
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
                                                                                      ]
                                                                                  ))
                                                                                : createCommentVNode(
                                                                                      "",
                                                                                      true
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
                                                        VToolbar,
                                                        {
                                                            dark: "",
                                                            color: $data.options
                                                                .color,
                                                            dense: "",
                                                            flat: "",
                                                        },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        VToolbarTitle,
                                                                        {
                                                                            class: "text-body-2 font-weight-bold grey--text",
                                                                        },
                                                                        {
                                                                            default:
                                                                                withCtx(
                                                                                    () => [
                                                                                        createTextVNode(
                                                                                            toDisplayString(
                                                                                                $data.title
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
                                                        },
                                                        8,
                                                        ["color"]
                                                    ),
                                                    createVNode(
                                                        "div",
                                                        {
                                                            class: "d-flex justify-content-center",
                                                        },
                                                        [
                                                            $data.item &&
                                                            $data.item.barcode
                                                                ? (openBlock(),
                                                                  createBlock(
                                                                      _component_vue_barcode,
                                                                      {
                                                                          key: 0,
                                                                          class: "m-4",
                                                                          value: $data
                                                                              .item
                                                                              .barcode,
                                                                          options:
                                                                              {
                                                                                  format: "CODE39",
                                                                                  height: 32,
                                                                              },
                                                                      },
                                                                      null,
                                                                      8,
                                                                      ["value"]
                                                                  ))
                                                                : createCommentVNode(
                                                                      "",
                                                                      true
                                                                  ),
                                                        ]
                                                    ),
                                                    createVNode(
                                                        "div",
                                                        {
                                                            class: "d-flex justify-content-center",
                                                        },
                                                        [
                                                            createVNode(
                                                                _component_v_number_input,
                                                                {
                                                                    class: "px-4",
                                                                    modelValue:
                                                                        $data.unit,
                                                                    "onUpdate:modelValue":
                                                                        (
                                                                            $event
                                                                        ) =>
                                                                            ($data.unit =
                                                                                $event),
                                                                    "control-variant":
                                                                        "split",
                                                                    max: $data.item
                                                                        ? $data
                                                                              .item
                                                                              .stock_unit
                                                                        : 0,
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
                                                    createVNode(
                                                        VCardActions,
                                                        { class: "pt-3" },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        VSpacer
                                                                    ),
                                                                    createVNode(
                                                                        _component_CButton,
                                                                        {
                                                                            onClick:
                                                                                $options.confirm,
                                                                            color: "danger",
                                                                            class: "px-4",
                                                                        },
                                                                        {
                                                                            default:
                                                                                withCtx(
                                                                                    () => [
                                                                                        createTextVNode(
                                                                                            toDisplayString(
                                                                                                _ctx.$t(
                                                                                                    "button.confirm"
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
                                                                        ]
                                                                    ),
                                                                    !$data
                                                                        .options
                                                                        .noconfirm
                                                                        ? (openBlock(),
                                                                          createBlock(
                                                                              _component_CButton,
                                                                              {
                                                                                  key: 0,
                                                                                  onClick:
                                                                                      $options.cancel,
                                                                                  color: "secondary",
                                                                                  class: "px-4 ml-2",
                                                                              },
                                                                              {
                                                                                  default:
                                                                                      withCtx(
                                                                                          () => [
                                                                                              createTextVNode(
                                                                                                  toDisplayString(
                                                                                                      _ctx.$t(
                                                                                                          "button.cancel"
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
                                                                              ]
                                                                          ))
                                                                        : createCommentVNode(
                                                                              "",
                                                                              true
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
                            createVNode(VCard, null, {
                                default: withCtx(() => [
                                    createVNode(
                                        VToolbar,
                                        {
                                            dark: "",
                                            color: $data.options.color,
                                            dense: "",
                                            flat: "",
                                        },
                                        {
                                            default: withCtx(() => [
                                                createVNode(
                                                    VToolbarTitle,
                                                    {
                                                        class: "text-body-2 font-weight-bold grey--text",
                                                    },
                                                    {
                                                        default: withCtx(() => [
                                                            createTextVNode(
                                                                toDisplayString(
                                                                    $data.title
                                                                ),
                                                                1
                                                            ),
                                                        ]),
                                                        _: 1,
                                                    }
                                                ),
                                            ]),
                                            _: 1,
                                        },
                                        8,
                                        ["color"]
                                    ),
                                    createVNode(
                                        "div",
                                        {
                                            class: "d-flex justify-content-center",
                                        },
                                        [
                                            $data.item && $data.item.barcode
                                                ? (openBlock(),
                                                  createBlock(
                                                      _component_vue_barcode,
                                                      {
                                                          key: 0,
                                                          class: "m-4",
                                                          value: $data.item
                                                              .barcode,
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
                                        ]
                                    ),
                                    createVNode(
                                        "div",
                                        {
                                            class: "d-flex justify-content-center",
                                        },
                                        [
                                            createVNode(
                                                _component_v_number_input,
                                                {
                                                    class: "px-4",
                                                    modelValue: $data.unit,
                                                    "onUpdate:modelValue": (
                                                        $event
                                                    ) => ($data.unit = $event),
                                                    "control-variant": "split",
                                                    max: $data.item
                                                        ? $data.item.stock_unit
                                                        : 0,
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
                                    createVNode(
                                        VCardActions,
                                        { class: "pt-3" },
                                        {
                                            default: withCtx(() => [
                                                createVNode(VSpacer),
                                                createVNode(
                                                    _component_CButton,
                                                    {
                                                        onClick:
                                                            $options.confirm,
                                                        color: "danger",
                                                        class: "px-4",
                                                    },
                                                    {
                                                        default: withCtx(() => [
                                                            createTextVNode(
                                                                toDisplayString(
                                                                    _ctx.$t(
                                                                        "button.confirm"
                                                                    )
                                                                ),
                                                                1
                                                            ),
                                                        ]),
                                                        _: 1,
                                                    },
                                                    8,
                                                    ["onClick"]
                                                ),
                                                !$data.options.noconfirm
                                                    ? (openBlock(),
                                                      createBlock(
                                                          _component_CButton,
                                                          {
                                                              key: 0,
                                                              onClick:
                                                                  $options.cancel,
                                                              color: "secondary",
                                                              class: "px-4 ml-2",
                                                          },
                                                          {
                                                              default: withCtx(
                                                                  () => [
                                                                      createTextVNode(
                                                                          toDisplayString(
                                                                              _ctx.$t(
                                                                                  "button.cancel"
                                                                              )
                                                                          ),
                                                                          1
                                                                      ),
                                                                  ]
                                                              ),
                                                              _: 1,
                                                          },
                                                          8,
                                                          ["onClick"]
                                                      ))
                                                    : createCommentVNode(
                                                          "",
                                                          true
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (
        ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())
    ).add("resources/js/views/goods/components/ShippingDialog.vue");
    return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ShippingDialog = /* @__PURE__ */ _export_sfc(_sfc_main$2, [
    ["ssrRender", _sfc_ssrRender$2],
]);
const _sfc_main$1 = {
    name: "GoodsItemTable",
    props: {
        goodsId: null,
    },
    components: {
        Dialog,
        ShippingDialog,
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
                sortBy: "cup",
                sortDesc: false,
            },
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { title: this.$t("cup"), value: "cup", sortable: true },
                { title: this.$t("color"), value: "color", sortable: true },
                { title: this.$t("size"), value: "size", sortable: true },
                { title: this.$t("barcode"), value: "barcode", sortable: true },
                {
                    title: this.$t("stock-unit"),
                    value: "stock_unit",
                    sortable: false,
                },
                { title: this.$t("updatedat"), value: "updated_at" },
                {
                    title: this.$t("actions"),
                    value: "actions",
                    sortable: false,
                },
            ],
            goodsCups: cups,
            goodsColors: colors,
            goodsSizes: sizes,
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
        fetch({ page, itemsPerPage, sortBy, search: search4 }) {
            let self = this;
            self.loading = true;
            self.options.page = page;
            self.options.itemsPerPage = itemsPerPage;
            self.options.sortBy = sortBy;
            let data = {
                goods_id: self.$props.goodsId,
                page,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: null,
                search: search4,
            };
            this.$store
                .dispatch("goods/items/get", data)
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
        add() {
            this.items = [...this.items, { ...defaults.item.remote, id: v4() }];
            this.serverItemsLength += 1;
        },
        download() {
            let self = this;
            self.loading = true;
            const { itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                goods_id: self.$props.goodsId,
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.options.search,
                extension: "pdf",
            };
            this.$store
                .dispatch("goods/items/export", data)
                .then((response) => {
                    self.loading = false;
                })
                .catch((error) => {
                    self.loading = false;
                });
        },
        reload() {
            this.fetch({ ...this.options });
        },
        async click(item, action) {
            let type = action.type;
            switch (type) {
                case "Update":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("button.confirm"),
                            this.$t("alert.update")
                        )
                    ) {
                        let self = this;
                        if (self.loading) {
                            return;
                        }
                        self.loading = true;
                        let data = { ...item, goods_id: self.goodsId };
                        this.$store
                            .dispatch("goods/items/update", data)
                            .then((response) => {
                                self.loading = false;
                                self.fetch({ ...this.options });
                            })
                            .catch((error) => {
                                self.loading = false;
                            });
                    }
                    break;
                case "AddShipping":
                    await this.$refs.shippingDialog.open(
                        this.$t("alert.shipping"),
                        null,
                        item
                    );
                    break;
                case "Delete":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("button.confirm"),
                            this.$t("alert.delete")
                        )
                    ) {
                        let self = this;
                        if (self.loading) {
                            return;
                        }
                        if (item.updated === false) {
                            let tempItems = self.items.filter((obj) => {
                                if (obj.id) {
                                    return obj.id !== item.id;
                                }
                                return true;
                            });
                            self.items = tempItems;
                        } else {
                            self.loading = true;
                            this.$store
                                .dispatch("goods/items/delete", { id: item.id })
                                .then((response) => {
                                    self.loading = false;
                                    self.fetch({ ...this.options });
                                })
                                .catch((error) => {
                                    self.loading = false;
                                });
                        }
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
    const _component_ShippingDialog = resolveComponent("ShippingDialog");
    const _component_CRow = resolveComponent("CRow");
    const _component_CCol = resolveComponent("CCol");
    const _component_CInputGroup = resolveComponent("CInputGroup");
    const _component_CButton = resolveComponent("CButton");
    const _component_CIcon = resolveComponent("CIcon");
    const _component_CFormInput = resolveComponent("CFormInput");
    const _component_CButtonGroup = resolveComponent("CButtonGroup");
    const _component_vue_barcode = resolveComponent("vue-barcode");
    _push(`<div${ssrRenderAttrs(_attrs)} data-v-5734978f>`);
    _push(
        ssrRenderComponent(_component_Dialog, { ref: "dialog" }, null, _parent)
    );
    _push(
        ssrRenderComponent(
            _component_ShippingDialog,
            { ref: "shippingDialog" },
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
                                                        _component_CInputGroup,
                                                        { class: "mb-3" },
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
                                                                                _component_CButton,
                                                                                {
                                                                                    color: "primary",
                                                                                    size: "sm",
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
                                                                        _push4(
                                                                            ssrRenderComponent(
                                                                                _component_CFormInput,
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
                                                                                },
                                                                                null,
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
                                                                                }
                                                                            ),
                                                                            createVNode(
                                                                                _component_CFormInput,
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
                                                                                },
                                                                                null,
                                                                                8,
                                                                                [
                                                                                    "modelValue",
                                                                                    "onUpdate:modelValue",
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
                                                        _component_CInputGroup,
                                                        { class: "mb-3" },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CButton,
                                                                        {
                                                                            color: "primary",
                                                                            size: "sm",
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
                                                                        }
                                                                    ),
                                                                    createVNode(
                                                                        _component_CFormInput,
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
                                                                        },
                                                                        null,
                                                                        8,
                                                                        [
                                                                            "modelValue",
                                                                            "onUpdate:modelValue",
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
                                                        _component_CButtonGroup,
                                                        null,
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
                                                                                _component_CButton,
                                                                                {
                                                                                    color: "primary",
                                                                                    size: "sm",
                                                                                    onClick:
                                                                                        $options.add,
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
                                                                                                                name: "cil-plus",
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
                                                                                                                name: "cil-plus",
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
                                                                        _push4(
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
                                                                                                                name: "cil-cloud-download",
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
                                                                                _parent4,
                                                                                _scopeId3
                                                                            )
                                                                        );
                                                                        _push4(
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
                                                                                                                name: "cil-reload",
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
                                                                                        $options.add,
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
                                                                                                        name: "cil-plus",
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
                                                        _parent3,
                                                        _scopeId2
                                                    )
                                                );
                                            } else {
                                                return [
                                                    createVNode(
                                                        _component_CButtonGroup,
                                                        null,
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CButton,
                                                                        {
                                                                            color: "primary",
                                                                            size: "sm",
                                                                            onClick:
                                                                                $options.add,
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
                                                                                                name: "cil-plus",
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
                                            _component_CInputGroup,
                                            { class: "mb-3" },
                                            {
                                                default: withCtx(() => [
                                                    createVNode(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
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
                                                        }
                                                    ),
                                                    createVNode(
                                                        _component_CFormInput,
                                                        {
                                                            size: "sm",
                                                            modelValue:
                                                                $data.search,
                                                            "onUpdate:modelValue":
                                                                ($event) =>
                                                                    ($data.search =
                                                                        $event),
                                                        },
                                                        null,
                                                        8,
                                                        [
                                                            "modelValue",
                                                            "onUpdate:modelValue",
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
                                _component_CCol,
                                {
                                    md: "3",
                                    sm: "3",
                                    class: "text-right",
                                },
                                {
                                    default: withCtx(() => [
                                        createVNode(
                                            _component_CButtonGroup,
                                            null,
                                            {
                                                default: withCtx(() => [
                                                    createVNode(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
                                                            onClick:
                                                                $options.add,
                                                            disabled:
                                                                $data.loading,
                                                        },
                                                        {
                                                            default: withCtx(
                                                                () => [
                                                                    createVNode(
                                                                        _component_CIcon,
                                                                        {
                                                                            name: "cil-plus",
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
                                                ]),
                                                _: 1,
                                            }
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
                    itemsPerPageOptions: [10, 20, 50, 100],
                },
            },
            {
                loading: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                        _push2(
                            ssrRenderComponent(
                                VSkeletonLoader,
                                { type: "table-row@10" },
                                null,
                                _parent2,
                                _scopeId
                            )
                        );
                    } else {
                        return [
                            createVNode(VSkeletonLoader, {
                                type: "table-row@10",
                            }),
                        ];
                    }
                }),
                [`item.cup`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            _push2(
                                ssrRenderComponent(
                                    VAutocomplete,
                                    {
                                        modelValue: item.cup,
                                        "onUpdate:modelValue": ($event) =>
                                            (item.cup = $event),
                                        items: $data.goodsCups,
                                        "item-title": "name",
                                        "item-value": "name",
                                        variant: "plain",
                                        "hide-details": "",
                                    },
                                    null,
                                    _parent2,
                                    _scopeId
                                )
                            );
                        } else {
                            return [
                                createVNode(
                                    VAutocomplete,
                                    {
                                        modelValue: item.cup,
                                        "onUpdate:modelValue": ($event) =>
                                            (item.cup = $event),
                                        items: $data.goodsCups,
                                        "item-title": "name",
                                        "item-value": "name",
                                        variant: "plain",
                                        "hide-details": "",
                                    },
                                    null,
                                    8,
                                    [
                                        "modelValue",
                                        "onUpdate:modelValue",
                                        "items",
                                    ]
                                ),
                            ];
                        }
                    }
                ),
                [`item.color`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            _push2(
                                ssrRenderComponent(
                                    VAutocomplete,
                                    {
                                        modelValue: item.color,
                                        "onUpdate:modelValue": ($event) =>
                                            (item.color = $event),
                                        items: $data.goodsColors,
                                        "item-title": "name",
                                        "item-value": "name",
                                        variant: "plain",
                                        "hide-details": "",
                                    },
                                    null,
                                    _parent2,
                                    _scopeId
                                )
                            );
                        } else {
                            return [
                                createVNode(
                                    VAutocomplete,
                                    {
                                        modelValue: item.color,
                                        "onUpdate:modelValue": ($event) =>
                                            (item.color = $event),
                                        items: $data.goodsColors,
                                        "item-title": "name",
                                        "item-value": "name",
                                        variant: "plain",
                                        "hide-details": "",
                                    },
                                    null,
                                    8,
                                    [
                                        "modelValue",
                                        "onUpdate:modelValue",
                                        "items",
                                    ]
                                ),
                            ];
                        }
                    }
                ),
                [`item.size`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            _push2(
                                ssrRenderComponent(
                                    VAutocomplete,
                                    {
                                        modelValue: item.size,
                                        "onUpdate:modelValue": ($event) =>
                                            (item.size = $event),
                                        items: $data.goodsSizes,
                                        "item-title": "name",
                                        "item-value": "name",
                                        variant: "plain",
                                        "hide-details": "",
                                    },
                                    null,
                                    _parent2,
                                    _scopeId
                                )
                            );
                        } else {
                            return [
                                createVNode(
                                    VAutocomplete,
                                    {
                                        modelValue: item.size,
                                        "onUpdate:modelValue": ($event) =>
                                            (item.size = $event),
                                        items: $data.goodsSizes,
                                        "item-title": "name",
                                        "item-value": "name",
                                        variant: "plain",
                                        "hide-details": "",
                                    },
                                    null,
                                    8,
                                    [
                                        "modelValue",
                                        "onUpdate:modelValue",
                                        "items",
                                    ]
                                ),
                            ];
                        }
                    }
                ),
                [`item.barcode`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            _push2(
                                `<div class="d-flex justify-content-center" data-v-5734978f${_scopeId}>`
                            );
                            if (item.barcode) {
                                _push2(
                                    ssrRenderComponent(
                                        _component_vue_barcode,
                                        {
                                            value: item.barcode,
                                            options: {
                                                format: "CODE39",
                                                height: 36,
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
                            _push2(`</div>`);
                        } else {
                            return [
                                createVNode(
                                    "div",
                                    { class: "d-flex justify-content-center" },
                                    [
                                        item.barcode
                                            ? (openBlock(),
                                              createBlock(
                                                  _component_vue_barcode,
                                                  {
                                                      key: 0,
                                                      value: item.barcode,
                                                      options: {
                                                          format: "CODE39",
                                                          height: 36,
                                                      },
                                                  },
                                                  null,
                                                  8,
                                                  ["value"]
                                              ))
                                            : createCommentVNode("", true),
                                    ]
                                ),
                            ];
                        }
                    }
                ),
                [`item.updated_at`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            if (item.updated_at) {
                                _push2(
                                    `<div data-v-5734978f${_scopeId}>${ssrInterpolate(
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (
        ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())
    ).add("resources/js/views/goods/components/GoodsItemTable.vue");
    return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const GoodsItemTable = /* @__PURE__ */ _export_sfc(_sfc_main$1, [
    ["ssrRender", _sfc_ssrRender$1],
    ["__scopeId", "data-v-5734978f"],
]);
const _sfc_main = {
    name: "GoodsDetails",
    components: {
        GoodsForm,
        GoodsItemTable,
        GoodsContentTable,
    },
    data() {
        return {
            tab: {
                values: [
                    this.$t("info"),
                    this.$t("goodsitem"),
                    this.$t("goodscontent"),
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
    const _component_GoodsForm = resolveComponent("GoodsForm");
    const _component_GoodsItemTable = resolveComponent("GoodsItemTable");
    const _component_GoodsContentTable = resolveComponent("GoodsContentTable");
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
                                                                                                                                                                                                _component_GoodsForm,
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
                                                                                                                                                                                                _component_GoodsForm,
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
                                                                                                                                                                                                _component_GoodsItemTable,
                                                                                                                                                                                                {
                                                                                                                                                                                                    goodsId:
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
                                                                                                                                                                                                _component_GoodsItemTable,
                                                                                                                                                                                                {
                                                                                                                                                                                                    goodsId:
                                                                                                                                                                                                        this
                                                                                                                                                                                                            .$route
                                                                                                                                                                                                            .params
                                                                                                                                                                                                            .id,
                                                                                                                                                                                                },
                                                                                                                                                                                                null,
                                                                                                                                                                                                8,
                                                                                                                                                                                                [
                                                                                                                                                                                                    "goodsId",
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
                                                                                                                                                                                                _component_GoodsContentTable,
                                                                                                                                                                                                {
                                                                                                                                                                                                    goodsId:
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
                                                                                                                                                                                                _component_GoodsContentTable,
                                                                                                                                                                                                {
                                                                                                                                                                                                    goodsId:
                                                                                                                                                                                                        this
                                                                                                                                                                                                            .$route
                                                                                                                                                                                                            .params
                                                                                                                                                                                                            .id,
                                                                                                                                                                                                },
                                                                                                                                                                                                null,
                                                                                                                                                                                                8,
                                                                                                                                                                                                [
                                                                                                                                                                                                    "goodsId",
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
                                                                                                                                                                                        _component_GoodsForm,
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
                                                                                                                                                                                        _component_GoodsItemTable,
                                                                                                                                                                                        {
                                                                                                                                                                                            goodsId:
                                                                                                                                                                                                this
                                                                                                                                                                                                    .$route
                                                                                                                                                                                                    .params
                                                                                                                                                                                                    .id,
                                                                                                                                                                                        },
                                                                                                                                                                                        null,
                                                                                                                                                                                        8,
                                                                                                                                                                                        [
                                                                                                                                                                                            "goodsId",
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
                                                                                                                                                                                        _component_GoodsContentTable,
                                                                                                                                                                                        {
                                                                                                                                                                                            goodsId:
                                                                                                                                                                                                this
                                                                                                                                                                                                    .$route
                                                                                                                                                                                                    .params
                                                                                                                                                                                                    .id,
                                                                                                                                                                                        },
                                                                                                                                                                                        null,
                                                                                                                                                                                        8,
                                                                                                                                                                                        [
                                                                                                                                                                                            "goodsId",
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
                                                                                                                                                                                _component_GoodsForm,
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
                                                                                                                                                                                _component_GoodsItemTable,
                                                                                                                                                                                {
                                                                                                                                                                                    goodsId:
                                                                                                                                                                                        this
                                                                                                                                                                                            .$route
                                                                                                                                                                                            .params
                                                                                                                                                                                            .id,
                                                                                                                                                                                },
                                                                                                                                                                                null,
                                                                                                                                                                                8,
                                                                                                                                                                                [
                                                                                                                                                                                    "goodsId",
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
                                                                                                                                                                                _component_GoodsContentTable,
                                                                                                                                                                                {
                                                                                                                                                                                    goodsId:
                                                                                                                                                                                        this
                                                                                                                                                                                            .$route
                                                                                                                                                                                            .params
                                                                                                                                                                                            .id,
                                                                                                                                                                                },
                                                                                                                                                                                null,
                                                                                                                                                                                8,
                                                                                                                                                                                [
                                                                                                                                                                                    "goodsId",
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
                                                                                                                                                                        _component_GoodsForm,
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
                                                                                                                                                                        _component_GoodsItemTable,
                                                                                                                                                                        {
                                                                                                                                                                            goodsId:
                                                                                                                                                                                this
                                                                                                                                                                                    .$route
                                                                                                                                                                                    .params
                                                                                                                                                                                    .id,
                                                                                                                                                                        },
                                                                                                                                                                        null,
                                                                                                                                                                        8,
                                                                                                                                                                        [
                                                                                                                                                                            "goodsId",
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
                                                                                                                                                                        _component_GoodsContentTable,
                                                                                                                                                                        {
                                                                                                                                                                            goodsId:
                                                                                                                                                                                this
                                                                                                                                                                                    .$route
                                                                                                                                                                                    .params
                                                                                                                                                                                    .id,
                                                                                                                                                                        },
                                                                                                                                                                        null,
                                                                                                                                                                        8,
                                                                                                                                                                        [
                                                                                                                                                                            "goodsId",
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
                                                                                                                                                                _component_GoodsForm,
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
                                                                                                                                                                _component_GoodsItemTable,
                                                                                                                                                                {
                                                                                                                                                                    goodsId:
                                                                                                                                                                        this
                                                                                                                                                                            .$route
                                                                                                                                                                            .params
                                                                                                                                                                            .id,
                                                                                                                                                                },
                                                                                                                                                                null,
                                                                                                                                                                8,
                                                                                                                                                                [
                                                                                                                                                                    "goodsId",
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
                                                                                                                                                                _component_GoodsContentTable,
                                                                                                                                                                {
                                                                                                                                                                    goodsId:
                                                                                                                                                                        this
                                                                                                                                                                            .$route
                                                                                                                                                                            .params
                                                                                                                                                                            .id,
                                                                                                                                                                },
                                                                                                                                                                null,
                                                                                                                                                                8,
                                                                                                                                                                [
                                                                                                                                                                    "goodsId",
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
                                                                                                                                                        _component_GoodsForm,
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
                                                                                                                                                        _component_GoodsItemTable,
                                                                                                                                                        {
                                                                                                                                                            goodsId:
                                                                                                                                                                this
                                                                                                                                                                    .$route
                                                                                                                                                                    .params
                                                                                                                                                                    .id,
                                                                                                                                                        },
                                                                                                                                                        null,
                                                                                                                                                        8,
                                                                                                                                                        [
                                                                                                                                                            "goodsId",
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
                                                                                                                                                        _component_GoodsContentTable,
                                                                                                                                                        {
                                                                                                                                                            goodsId:
                                                                                                                                                                this
                                                                                                                                                                    .$route
                                                                                                                                                                    .params
                                                                                                                                                                    .id,
                                                                                                                                                        },
                                                                                                                                                        null,
                                                                                                                                                        8,
                                                                                                                                                        [
                                                                                                                                                            "goodsId",
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
                                                                                                                            _component_GoodsForm,
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
                                                                                                                            _component_GoodsItemTable,
                                                                                                                            {
                                                                                                                                goodsId:
                                                                                                                                    this
                                                                                                                                        .$route
                                                                                                                                        .params
                                                                                                                                        .id,
                                                                                                                            },
                                                                                                                            null,
                                                                                                                            8,
                                                                                                                            [
                                                                                                                                "goodsId",
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
                                                                                                                            _component_GoodsContentTable,
                                                                                                                            {
                                                                                                                                goodsId:
                                                                                                                                    this
                                                                                                                                        .$route
                                                                                                                                        .params
                                                                                                                                        .id,
                                                                                                                            },
                                                                                                                            null,
                                                                                                                            8,
                                                                                                                            [
                                                                                                                                "goodsId",
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
    ).add("resources/js/views/goods/GoodsDetails.vue");
    return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const GoodsDetails = /* @__PURE__ */ _export_sfc(_sfc_main, [
    ["ssrRender", _sfc_ssrRender],
]);
export { GoodsDetails as default };
