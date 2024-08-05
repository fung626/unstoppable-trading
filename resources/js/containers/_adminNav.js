import i18n from "@/plugins/vue-i18n";

const { t } = i18n.global;
// import store from "../store";

// console.log(store.getters.permissions);
export default [
    {
        component: "CNavItem",
        name: t("dashboard"),
        to: "/dashboard",
        icon: "cil-speedometer",
    },
    {
        component: "CNavTitle",
        name: t("management"),
    },
    {
        component: "CNavItem",
        name: t("salesreport"),
        to: "/sales-report",
        icon: "cil-chart-line",
    },
    {
        component: "CNavItem",
        name: t("users"),
        to: "/users",
        icon: "cil-contact",
    },
    {
        component: "CNavItem",
        name: t("duty"),
        to: "/duty",
        icon: "cil-view-quilt",
    },
    {
        component: "CNavItem",
        name: t("goods"),
        to: "/goods",
        icon: "cil-square",
    },
    {
        component: "CNavItem",
        name: t("stock"),
        to: "/stock",
        icon: "cil-square",
    },
    {
        component: "CNavItem",
        name: t("purchase.title"),
        to: "/purchase",
        icon: "cil-storage",
    },
    {
        component: "CNavItem",
        name: t("shipping.title"),
        to: "/shipping",
        icon: "cil-truck",
    },
    {
        component: "CNavItem",
        name: t("supplier"),
        to: "/supplier",
        icon: "cil-people",
    },
    {
        component: "CNavItem",
        name: t("category"),
        to: "/category",
        icon: "cil-short-text",
    },
    {
        component: "CNavItem",
        name: t("warehouse"),
        to: "/warehouse",
        icon: "cil-room",
    },
    {
        component: "CNavItem",
        name: t("clients"),
        to: "/clients",
        icon: "cil-people",
    },
];
