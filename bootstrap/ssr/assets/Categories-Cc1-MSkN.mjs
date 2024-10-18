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
    createTextVNode,
    createVNode,
    Fragment,
    openBlock,
    renderList,
    resolveComponent,
    toDisplayString,
    useSSRContext,
    withCtx,
} from "vue";
import "vue-barcode-reader";
import "vue-i18n";
import "vue-router";
import {
    ssrInterpolate,
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
import { VDataTableServer } from "vuetify/lib/components/VDataTable/index.mjs";
import "vuetify/lib/components/VDialog/index.mjs";
import "vuetify/lib/components/VGrid/index.mjs";
import "vuetify/lib/components/VMenu/index.mjs";
import "vuetify/lib/components/VProgressLinear/index.mjs";
import "vuetify/lib/components/VSelect/index.mjs";
import { VSkeletonLoader } from "vuetify/lib/components/VSkeletonLoader/index.mjs";
import "vuetify/lib/components/VSnackbar/index.mjs";
import "vuetify/lib/components/VTextField/index.mjs";
import "vuetify/lib/components/VToolbar/index.mjs";
import "vuetify/lib/components/VTooltip/index.mjs";
import "vuex";
import "vuex-persistedstate";
import { _ as _export_sfc, a as Dialog, S as Snackbar } from "../app.mjs";
const _sfc_main = {
    name: "Categories",
    components: {
        Dialog,
        Snackbar,
    },
    data() {
        return {
            search: null,
            loading: false,
            mobile: window.innerWidth < 769,
            items: [],
            pageCount: 0,
            serverItemsLength: 0,
            options: {
                page: 1,
                itemsPerPage: 10,
                sortBy: "name",
            },
            disableItemsPerPage: false,
            disablePagination: false,
            headers: [
                { title: this.$t("name"), value: "name" },
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

                search,
            };
            this.$store
                .dispatch("categories/get", data)
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
            this.$router.push({ path: "categories/create" });
        },
        download() {
            let self = this;
            self.loading = true;
            const { itemsPerPage, sortBy, sortDesc } = self.options;
            let data = {
                per_page: itemsPerPage,
                sort_by: sortBy,
                sort_desc: sortDesc,
                search: self.searchText,
                extension: "pdf",
            };
            this.$store
                .dispatch("categories/export", data)
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
                case "RouterPush":
                    let route = action.route;
                    this.$router.push({
                        path: route,
                    });
                    break;
                case "Delete":
                    if (
                        await this.$refs.dialog.open(
                            this.$t("alert.title"),
                            this.$t("alert.delete")
                        )
                    ) {
                        let self = this;
                        self.loading = true;
                        this.$store
                            .dispatch("categories/delete", { id: item.id })
                            .then((response) => {
                                self.loading = false;
                                self.fetch({ ...this.options });
                            })
                            .catch((error) => {
                                self.loading = false;
                            });
                    }
                    break;
            }
        },
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
    const _component_Snackbar = resolveComponent("Snackbar");
    const _component_Dialog = resolveComponent("Dialog");
    const _component_CRow = resolveComponent("CRow");
    const _component_CCol = resolveComponent("CCol");
    const _component_CInputGroup = resolveComponent("CInputGroup");
    const _component_CButton = resolveComponent("CButton");
    const _component_CIcon = resolveComponent("CIcon");
    const _component_CFormInput = resolveComponent("CFormInput");
    const _component_CButtonGroup = resolveComponent("CButtonGroup");
    _push(`<!--[-->`);
    _push(ssrRenderComponent(_component_Snackbar, null, null, _parent));
    _push(
        ssrRenderComponent(_component_Dialog, { ref: "dialog" }, null, _parent)
    );
    _push(`<div>`);
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
                                    md: 10,
                                    sm: 10,
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
                                    md: 2,
                                    sm: 2,
                                    class: "text-right",
                                },
                                {
                                    default: withCtx(
                                        (_2, _push3, _parent3, _scopeId2) => {
                                            if (_push3) {
                                                _push3(
                                                    ssrRenderComponent(
                                                        _component_CButtonGroup,
                                                        { role: "group" },
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
                                                                                ]
                                                                            ),
                                                                            createVNode(
                                                                                _component_CButton,
                                                                                {
                                                                                    color: "primary",
                                                                                    size: "sm",
                                                                                    onClick:
                                                                                        $options.download,
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
                                                                                ]
                                                                            ),
                                                                            createVNode(
                                                                                _component_CButton,
                                                                                {
                                                                                    color: "primary",
                                                                                    size: "sm",
                                                                                    onClick:
                                                                                        $options.reload,
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
                                                        { role: "group" },
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
                                                                        ]
                                                                    ),
                                                                    createVNode(
                                                                        _component_CButton,
                                                                        {
                                                                            color: "primary",
                                                                            size: "sm",
                                                                            onClick:
                                                                                $options.download,
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
                                                                        ]
                                                                    ),
                                                                    createVNode(
                                                                        _component_CButton,
                                                                        {
                                                                            color: "primary",
                                                                            size: "sm",
                                                                            onClick:
                                                                                $options.reload,
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
                                    md: 10,
                                    sm: 10,
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
                                    md: 2,
                                    sm: 2,
                                    class: "text-right",
                                },
                                {
                                    default: withCtx(() => [
                                        createVNode(
                                            _component_CButtonGroup,
                                            { role: "group" },
                                            {
                                                default: withCtx(() => [
                                                    createVNode(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
                                                            onClick:
                                                                $options.add,
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
                                                        ["onClick"]
                                                    ),
                                                    createVNode(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
                                                            onClick:
                                                                $options.download,
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
                                                        ["onClick"]
                                                    ),
                                                    createVNode(
                                                        _component_CButton,
                                                        {
                                                            color: "primary",
                                                            size: "sm",
                                                            onClick:
                                                                $options.reload,
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
                                                        ["onClick"]
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
            VDataTableServer,
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
                [`item.created_at`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            _push2(
                                `${ssrInterpolate(
                                    this.$formatDate(item.created_at)
                                )}`
                            );
                        } else {
                            return [
                                createTextVNode(
                                    toDisplayString(
                                        this.$formatDate(item.created_at)
                                    ),
                                    1
                                ),
                            ];
                        }
                    }
                ),
                [`item.updated_at`]: withCtx(
                    ({ item }, _push2, _parent2, _scopeId) => {
                        if (_push2) {
                            _push2(
                                `${ssrInterpolate(
                                    this.$formatDate(item.updated_at)
                                )}`
                            );
                        } else {
                            return [
                                createTextVNode(
                                    toDisplayString(
                                        this.$formatDate(item.updated_at)
                                    ),
                                    1
                                ),
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
    _push(`</div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
    const ssrContext = useSSRContext();
    (
        ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())
    ).add("resources/js/views/categories/Categories.vue");
    return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Categories = /* @__PURE__ */ _export_sfc(_sfc_main, [
    ["ssrRender", _sfc_ssrRender],
]);
export { Categories as default };
//# sourceMappingURL=Categories-Cc1-MSkN.mjs.map
