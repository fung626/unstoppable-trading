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
    ...(permissions["sales-reports"]
        ? [
              {
                  component: "CNavItem",
                  name: t("sales-reports"),
                  to: "/sales-reports",
                  icon: "cil-chart-line",
              },
          ]
        : []),
    ...(permissions.users
        ? [
              {
                  component: "CNavItem",
                  name: t("users"),
                  to: "/users",
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
    ...(permissions.stocks
        ? [
              {
                  component: "CNavItem",
                  name: t("stocks"),
                  to: "/stocks",
                  icon: "cil-square",
              },
          ]
        : []),
    ...(permissions.purchases
        ? [
              {
                  component: "CNavItem",
                  name: t("purchases.title"),
                  to: "/purchases",
                  icon: "cil-storage",
              },
          ]
        : []),
    ...(permissions.purchases
        ? [
              {
                  component: "CNavItem",
                  name: t("shippings.title"),
                  to: "/shippings",
                  icon: "cil-truck",
              },
          ]
        : []),
    ...(permissions.suppliers
        ? [
              {
                  component: "CNavItem",
                  name: t("suppliers"),
                  to: "/suppliers",
                  icon: "cil-people",
              },
          ]
        : []),
    ...(permissions.categories
        ? [
              {
                  component: "CNavItem",
                  name: t("categories"),
                  to: "/categories",
                  icon: "cil-short-text",
              },
          ]
        : []),
    ...(permissions.warehouses
        ? [
              {
                  component: "CNavItem",
                  name: t("warehouses"),
                  to: "/warehouses",
                  icon: "cil-room",
              },
          ]
        : []),
    ...(permissions.clients
        ? [
              {
                  component: "CNavItem",
                  name: t("clients"),
                  to: "/clients",
                  icon: "cil-people",
              },
          ]
        : []),
];
