import { i18n } from "../plugins";
import store from "../store";

const { permissions } = store.getters;
// console.log(permissions);

export default [
    {
        _name: "CSidebarNav",
        _children: [
            {
                _name: "CSidebarNavItem",
                name: i18n.t("dashboard"),
                to: "/dashboard",
                icon: "cil-speedometer",
            },
            ...(permissions["sales-reports"]
                ? [
                      {
                          _name: "CSidebarNavItem",
                          name: i18n.t("salesreport"),
                          to: "/salesreport",
                          icon: "cil-chart-line",
                      },
                  ]
                : []),
            {
                _name: "CSidebarNavTitle",
                _children: [i18n.t("management")],
            },
            ...(permissions.users
                ? [
                      {
                          _name: "CSidebarNavItem",
                          name: i18n.t("user"),
                          to: "/user",
                          icon: "cil-contact",
                      },
                  ]
                : []),
            ...(permissions.goods
                ? [
                      {
                          _name: "CSidebarNavItem",
                          name: i18n.t("goods"),
                          to: "/goods",
                          icon: "cil-square",
                      },
                  ]
                : []),
            ...(permissions.stocks
                ? [
                      {
                          _name: "CSidebarNavItem",
                          name: i18n.t("stock"),
                          to: "/stock",
                          icon: "cil-square",
                      },
                  ]
                : []),
            ...(permissions.purchases
                ? [
                      {
                          _name: "CSidebarNavItem",
                          name: i18n.t("purchase"),
                          to: "/purchase",
                          icon: "cil-storage",
                      },
                  ]
                : []),
            ...(permissions.purchases
                ? [
                      {
                          _name: "CSidebarNavItem",
                          name: i18n.t("shipping"),
                          to: "/shipping",
                          icon: "cil-truck",
                      },
                  ]
                : []),
            ...(permissions.suppliers
                ? [
                      {
                          _name: "CSidebarNavItem",
                          name: i18n.t("supplier"),
                          to: "/supplier",
                          icon: "cil-people",
                      },
                  ]
                : []),
            ...(permissions.categories
                ? [
                      {
                          _name: "CSidebarNavItem",
                          name: i18n.t("category"),
                          to: "/category",
                          icon: "cil-short-text",
                      },
                  ]
                : []),
            ...(permissions.warehouses
                ? [
                      {
                          _name: "CSidebarNavItem",
                          name: i18n.t("warehouse"),
                          to: "/warehouse",
                          icon: "cil-room",
                      },
                  ]
                : []),
            ...(permissions.clients
                ? [
                      {
                          _name: "CSidebarNavItem",
                          name: i18n.t("client"),
                          to: "/client",
                          icon: "cil-people",
                      },
                  ]
                : []),
        ],
    },
];
