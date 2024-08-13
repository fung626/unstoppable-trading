import DefaultLayout from "@/layouts/DefaultLayout.vue";
import i18n from "@/plugins/vue-i18n";
import { h, resolveComponent } from "vue";

const { t } = i18n.global;

export default [
    // {
    //     path: "/login",
    //     name: "Login",
    //     component: () => import("@/views/auth/Login.vue"),
    // },
    // {
    //     path: "/forgotpassword",
    //     name: "ForgotPassword",
    //     component: () => import("@/views/auth/ForgotPassword.vue"),
    // },
    // {
    //     path: "/auth/forgot/password/reset/:id/:token",
    //     name: "ResetPassword",
    //     component: () => import("@/views/auth/ResetPassword.vue"),
    // },
    {
        path: "/",
        name: t("home"),
        redirect: "dashboard",
        component: DefaultLayout,
        children: [
            {
                path: "dashboard",
                name: t("dashboard"),
                component: () => import("@/views/dashboard/Dashboard.vue"),
            },
            // {
            //     path: "profile",
            //     name: t("profile"),
            //     component: {
            //         render() {
            //             return h(resolveComponent("router-view"));
            //         },
            //     },
            //     children: [
            //         {
            //             path: "",
            //             name: t("home"),
            //             component: () => import("@/views/profile/Profile.vue"),
            //         },
            //     ],
            // },
            // {
            //     path: "sales-report",
            //     name: t("salesreport"),
            //     component: {
            //         render() {
            //             return h(resolveComponent("router-view"));
            //         },
            //     },
            //     children: [
            //         {
            //             path: "",
            //             name: t("home"),
            //             component: import(
            //                 "@/views/salesReport/SalesReport.vue"
            //             ),
            //         },
            //     ],
            // },
            // {
            //     path: "exchangerate",
            //     name: t("exchangerate"),
            //     component: {
            //         render() {
            //             return h(resolveComponent("router-view"));
            //         },
            //     },
            //     children: [
            //         {
            //             path: "",
            //             name: t("table"),
            //             component: () =>
            //                 import("@/views/exchangeRate/ExchangeRate.vue"),
            //         },
            //         {
            //             path: "details/:base/:symbol",
            //             name: t("details"),
            //             component: () =>
            //                 import(
            //                     "@/views/exchangeRate/ExchangeRateDetails.vue"
            //                 ),
            //         },
            //     ],
            // },
            // {
            // {
            //     path: "duty",
            //     name: t("duty"),
            //     component: {
            //         render() {
            //             return h(resolveComponent("router-view"));
            //         },
            //     },
            //     children: [
            //         {
            //             path: "",
            //             name: t("table"),
            //             component: () => import("@/views/duty/Duty.vue"),
            //         },
            //         {
            //             path: "create/:userId?",
            //             name: t("create"),
            //             name: "CreateDuty",
            //             component: () => import("@/views/duty/CreateDuty.vue"),
            //         },
            //         {
            //             path: "details/:id",
            //             name: t("details"),
            //             component: () => import("@/views/duty/DutyDetails.vue"),
            //         },
            //     ],
            // },
            // {
            //     path: "leave",
            //     name: t("leave"),
            //     component: {
            //         render() {
            //             return h(resolveComponent("router-view"));
            //         },
            //     },
            //     children: [
            //         {
            //             path: "",
            //             name: t("table"),
            //             component: () => import("@/views/duty/Duty.vue"),
            //         },
            //         {
            //             path: "leave/create/:userId?",
            //             name: t("create"),
            //             component: () =>
            //                 import("@/views/leave/CreateLeave.vue"),
            //         },
            //         {
            //             path: "leave/details/:id",
            //             name: t("details"),
            //             component: () => import("@/views/duty/DutyDetails.vue"),
            //         },
            //     ],
            // },
            // {
            //     path: "goods",
            //     name: t("goods"),
            //     component: {
            //         render() {
            //             return h(resolveComponent("router-view"));
            //         },
            //     },
            //     children: [
            //         {
            //             path: "",
            //             name: t("table"),
            //             component: () => import("@/views/goods/Goods.vue"),
            //         },
            //         {
            //             path: "create",
            //             name: t("create"),
            //             component: () =>
            //                 import("@/views/goods/CreateGoods.vue"),
            //         },
            //         {
            //             path: "details/:id",
            //             name: t("details"),
            //             component: () =>
            //                 import("@/views/goods/GoodsDetails.vue"),
            //         },
            //     ],
            // },
            // {
            //     path: "stock",
            //     name: t("stock"),
            //     component: {
            //         render() {
            //             return h(resolveComponent("router-view"));
            //         },
            //     },
            //     children: [
            //         {
            //             path: "",
            //             name: t("table"),
            //             component: () =>
            //                 import("@/views/goods-stock/GoodsStock.vue"),
            //         },
            //     ],
            // },
            // {
            //     path: "purchase",
            //     name: t("purchase.title"),
            //     component: {
            //         render() {
            //             return h(resolveComponent("router-view"));
            //         },
            //     },
            //     children: [
            //         {
            //             path: "",
            //             name: t("table"),
            //             component: () =>
            //                 import("@/views/purchase/Purchase.vue"),
            //         },
            //         {
            //             path: "create/:id",
            //             name: t("create"),
            //             component: () =>
            //                 import("@/views/purchase/CreatePurchase.vue"),
            //         },
            //         {
            //             path: "details/:id",
            //             name: t("details"),
            //             component: () =>
            //                 import("@/views/purchase/PurchaseDetails.vue"),
            //         },
            //         {
            //             path: "stocktake/:id",
            //             name: t("stocktake"),
            //             component: () =>
            //                 import("@/views/purchase/Stocktake.vue"),
            //         },
            //     ],
            // },
            // {
            //     path: "shipping",
            //     name: t("shipping.title"),
            //     component: {
            //         render() {
            //             return h(resolveComponent("router-view"));
            //         },
            //     },
            //     children: [
            //         {
            //             path: "",
            //             name: t("table"),
            //             component: () =>
            //                 import("@/views/shipping/Shipping.vue"),
            //         },
            //         {
            //             path: "create",
            //             name: t("create"),
            //             component: () =>
            //                 import("@/views/shipping/CreateShipping.vue"),
            //         },
            //         {
            //             path: "details/:id",
            //             name: t("details"),
            //             component: () =>
            //                 import("@/views/shipping/ShippingDetails.vue"),
            //         },
            //     ],
            // },
            // {
            //     path: "supplier",
            //     name: t("supplier"),
            //     component: {
            //         render() {
            //             return h(resolveComponent("router-view"));
            //         },
            //     },
            //     children: [
            //         {
            //             path: "",
            //             name: t("table"),
            //             component: () =>
            //                 import("@/views/supplier/Supplier.vue"),
            //         },
            //         {
            //             path: "create",
            //             name: t("create"),
            //             component: () =>
            //                 import("@/views/supplier/CreateSupplier.vue"),
            //         },
            //         {
            //             path: "details/:id",
            //             name: t("details"),
            //             component: () =>
            //                 import("@/views/supplier/SupplierDetails.vue"),
            //         },
            //     ],
            // },
            // {
            //     path: "category",
            //     name: t("category"),
            //     component: {
            //         render() {
            //             return h(resolveComponent("router-view"));
            //         },
            //     },
            //     children: [
            //         {
            //             path: "",
            //             name: t("table"),
            //             component: () =>
            //                 import("@/views/category/Category.vue"),
            //         },
            //         {
            //             path: "create",
            //             name: t("create"),
            //             component: () =>
            //                 import("@/views/category/CreateCategory.vue"),
            //         },
            //         {
            //             path: "details/:id",
            //             name: t("details"),
            //             component: () =>
            //                 import("@/views/category/CategoryDetails.vue"),
            //         },
            //     ],
            // },
            // {
            //     path: "warehouse",
            //     name: t("warehouse"),
            //     component: {
            //         render() {
            //             return h(resolveComponent("router-view"));
            //         },
            //     },
            //     children: [
            //         {
            //             path: "",
            //             name: t("table"),
            //             component: () =>
            //                 import("@/views/warehouse/Warehouse.vue"),
            //         },
            //         {
            //             path: "create",
            //             name: t("create"),
            //             component: () =>
            //                 import("@/views/warehouse/CreateWarehouse.vue"),
            //         },
            //         {
            //             path: "details/:id",
            //             name: t("details"),
            //             component: () =>
            //                 import("@/views/warehouse/WarehouseDetails.vue"),
            //         },
            //     ],
            // },
            // {
            //     path: "clients",
            //     name: t("clients"),
            //     component: {
            //         render() {
            //             return h(resolveComponent("router-view"));
            //         },
            //     },
            //     children: [
            //         {
            //             path: "",
            //             name: t("table"),
            //             component: () => {
            //                 console.log("import");
            //                 return import("@/views/clients/Clients.vue");
            //             },
            //         },
            //         {
            //             path: "create",
            //             name: t("create"),
            //             component: () =>
            //                 import("@/views/clients/CreateClient.vue"),
            //         },
            //         {
            //             path: "details/:id",
            //             name: t("details"),
            //             component: () =>
            //                 import("@/views/clients/ClientDetails.vue"),
            //         },
            //     ],
            // },
        ],
    },
    {
        path: "users",
        name: t("users"),
        component: {
            render() {
                return h(resolveComponent("router-view"));
            },
        },
        children: [
            {
                path: "",
                name: t("table"),
                // component: () => import("@/views/users/Users.vue"),
                component: () => {
                    console.log("import");
                    return import("@/views/users/Users.vue");
                },
            },
            //     {
            //         path: "create",
            //         name: t("create"),
            //         component: () => import("@/views/users/CreateUser.vue"),
            //     },
            //     {
            //         path: "details/:id",
            //         name: t("details"),
            //         component: () =>
            //             import("@/views/users/UserDetails.vue"),
            //     },
        ],
    },

    // { path: "*", component: Error404 },
];
