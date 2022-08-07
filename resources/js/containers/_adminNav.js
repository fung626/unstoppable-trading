import { i18n } from "../plugins";
// import store from "../store";

// console.log(store.getters.permissions);
export default [
    {
        _name: "CSidebarNav",
        _children: [
            {
                _name: "CSidebarNavItem",
                name: i18n.t("dashboard"),
                to: "/dashboard",
                icon: "cil-speedometer"
            },
            {
                _name: "CSidebarNavItem",
                name: i18n.t("salesreport"),
                to: "/salesreport",
                icon: "cil-chart-line"
            },
            {
                _name: "CSidebarNavTitle",
                _children: [i18n.t("management")]
            },
            {
                _name: "CSidebarNavItem",
                name: i18n.t("user"),
                to: "/user",
                icon: "cil-contact"
            },
            {
                _name: "CSidebarNavItem",
                name: i18n.t("duty"),
                to: "/duty",
                icon: "cil-view-quilt"
            },
            {
                _name: "CSidebarNavItem",
                name: i18n.t("goods"),
                to: "/goods",
                icon: "cil-square"
            },
            {
                _name: "CSidebarNavItem",
                name: i18n.t("stock"),
                to: "/stock",
                icon: "cil-square"
            },
            {
                _name: "CSidebarNavItem",
                name: i18n.t("purchase"),
                to: "/purchase",
                icon: "cil-storage"
            },
            {
                _name: "CSidebarNavItem",
                name: i18n.t("shipping"),
                to: "/shipping",
                icon: "cil-truck"
            },
            {
                _name: "CSidebarNavItem",
                name: i18n.t("supplier"),
                to: "/supplier",
                icon: "cil-people"
            },
            {
                _name: "CSidebarNavItem",
                name: i18n.t("category"),
                to: "/category",
                icon: "cil-short-text"
            },
            {
                _name: "CSidebarNavItem",
                name: i18n.t("warehouse"),
                to: "/warehouse",
                icon: "cil-room"
            },
            {
                _name: "CSidebarNavItem",
                name: i18n.t("client"),
                to: "/client",
                icon: "cil-people"
            }
        ]
    }
];
