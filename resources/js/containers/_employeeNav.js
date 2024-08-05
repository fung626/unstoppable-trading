import i18n from "@/plugins/vue-i18n";
import store from "../store";

const { t } = i18n.global;
const { permissions } = store.getters;
// console.log(permissions);

export default [
    {
        component: "CNavItem",
        name: t("dashboard"),
        to: "/dashboard",
        icon: "cil-speedometer",
    },
    ...(permissions.salesreport
        ? [
              {
                  component: "CNavItem",
                  name: t("salesreport"),
                  to: "/salesreport",
                  icon: "cil-chart-line",
              },
          ]
        : []),
    ...(permissions.user
        ? [
              {
                  component: "CNavItem",
                  name: t("user"),
                  to: "/user",
                  icon: "cil-contact",
              },
          ]
        : []),
    ...(permissions.goods
        ? [
              {
                  component: "CNavItem",
                  name: t("goods"),
                  to: "/goods",
                  icon: "cil-square",
              },
          ]
        : []),
    ...(permissions.stock
        ? [
              {
                  component: "CNavItem",
                  name: t("stock"),
                  to: "/stock",
                  icon: "cil-square",
              },
          ]
        : []),
    ...(permissions.purchase
        ? [
              {
                  component: "CNavItem",
                  name: t("purchase.title"),
                  to: "/purchase",
                  icon: "cil-storage",
              },
          ]
        : []),
    ...(permissions.purchase
        ? [
              {
                  component: "CNavItem",
                  name: t("shipping.title"),
                  to: "/shipping",
                  icon: "cil-truck",
              },
          ]
        : []),
    ...(permissions.supplier
        ? [
              {
                  component: "CNavItem",
                  name: t("supplier"),
                  to: "/supplier",
                  icon: "cil-people",
              },
          ]
        : []),
    ...(permissions.category
        ? [
              {
                  component: "CNavItem",
                  name: t("category"),
                  to: "/category",
                  icon: "cil-short-text",
              },
          ]
        : []),
    ...(permissions.warehouse
        ? [
              {
                  component: "CNavItem",
                  name: t("warehouse"),
                  to: "/warehouse",
                  icon: "cil-room",
              },
          ]
        : []),
    ...(permissions.client
        ? [
              {
                  component: "CNavItem",
                  name: t("client"),
                  to: "/client",
                  icon: "cil-people",
              },
          ]
        : []),
];
