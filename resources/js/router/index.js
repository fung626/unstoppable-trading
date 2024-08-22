import DefaultLayout from "@/layouts/DefaultLayout.vue";
import i18n from "@/plugins/vue-i18n";
import { h, resolveComponent } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
// import routes from "./routes";
import store from "../store";

const { t } = i18n.global;

const routes = [
    {
        path: "/",
        name: "home",
        component: DefaultLayout,
        redirect: "/dashboard",
        beforeEnter(to, from, next) {
            const isAuthenticated = store.getters.isAuthenticated;
            if (isAuthenticated) {
                next();
            } else {
                next("/login");
            }
        },
        children: [
            {
                path: "dashboard",
                name: "dashboard",
                component: () => import("@/views/dashboard/Dashboard.vue"),
            },
            {
                path: "profile",
                name: "profile",
                component: () => import("@/views/profile/Profile.vue"),
            },
            {
                path: "leaves",
                name: "route.leaves.home",
                component: {
                    render() {
                        return h(resolveComponent("router-view"));
                    },
                },
                children: [
                    {
                        path: "create/:id",
                        name: "route.leaves.create",
                        component: () =>
                            import("@/views/leaves/CreateLeave.vue"),
                    },
                ],
            },
            {
                path: "sales-reports",
                name: "route.sales-reports.home",
                component: {
                    render() {
                        return h(resolveComponent("router-view"));
                    },
                },
                children: [
                    {
                        path: "",
                        name: "route.sales-reports.table",
                        component: () =>
                            import("@/views/sales-reports/SalesReports.vue"),
                    },
                ],
            },
            {
                path: "users",
                name: "route.users.home",
                component: {
                    render() {
                        return h(resolveComponent("router-view"));
                    },
                },
                children: [
                    {
                        path: "",
                        name: "route.users.table",
                        component: () => import("@/views/users/Users.vue"),
                    },
                    {
                        path: "create",
                        name: "route.users.create",
                        component: () => import("@/views/users/CreateUser.vue"),
                    },
                    {
                        path: "details/:id",
                        name: "route.users.details",
                        component: () =>
                            import("@/views/users/UserDetails.vue"),
                    },
                ],
            },
            {
                path: "duty",
                name: "route.duty.home",
                component: {
                    render() {
                        return h(resolveComponent("router-view"));
                    },
                },
                children: [
                    {
                        path: "",
                        name: "route.duty.table",
                        component: () => import("@/views/duty/Duty.vue"),
                    },
                    {
                        path: "create/:userId?",
                        name: "route.duty.create",
                        component: () => import("@/views/duty/CreateDuty.vue"),
                    },
                    {
                        path: "details/:id",
                        name: "route.duty.details",
                        component: () => import("@/views/duty/DutyDetails.vue"),
                    },
                ],
            },
            {
                path: "goods",
                name: "route.goods.home",
                component: {
                    render() {
                        return h(resolveComponent("router-view"));
                    },
                },
                children: [
                    {
                        path: "",
                        name: "route.goods.table",
                        component: () => import("@/views/goods/Goods.vue"),
                    },
                    {
                        path: "create",
                        name: "route.goods.create",
                        component: () =>
                            import("@/views/goods/CreateGoods.vue"),
                    },
                    {
                        path: "details/:id",
                        name: "route.goods.details",
                        component: () =>
                            import("@/views/goods/GoodsDetails.vue"),
                    },
                ],
            },
            {
                path: "stocks",
                name: "route.stocks.home",
                component: {
                    render() {
                        return h(resolveComponent("router-view"));
                    },
                },
                children: [
                    {
                        path: "",
                        name: "route.stocks.table",
                        component: () =>
                            import("@/views/goods-stocks/GoodsStock.vue"),
                    },
                ],
            },
            {
                path: "purchases",
                name: "route.purchases.home",
                component: {
                    render() {
                        return h(resolveComponent("router-view"));
                    },
                },
                children: [
                    {
                        path: "",
                        name: "route.purchases.table",
                        component: () =>
                            import("@/views/purchases/Purchases.vue"),
                    },
                    {
                        path: "create/:id",
                        name: "route.purchases.create",
                        component: () =>
                            import("@/views/purchases/CreatePurchase.vue"),
                    },
                    {
                        path: "details/:id",
                        name: "route.purchases.details",
                        component: () =>
                            import("@/views/purchases/PurchaseDetails.vue"),
                    },
                    {
                        path: "stocktakes/:id",
                        name: "route.purchases.stocktakes",
                        component: () =>
                            import("@/views/purchases/Stocktake.vue"),
                    },
                ],
            },
            {
                path: "shippings",
                name: "route.shippings.home",
                component: {
                    render() {
                        return h(resolveComponent("router-view"));
                    },
                },
                children: [
                    {
                        path: "",
                        name: "route.shippings.table",
                        component: () =>
                            import("@/views/shippings/Shippings.vue"),
                    },
                    {
                        path: "create",
                        name: "route.shippings.create",
                        component: () =>
                            import("@/views/shippings/CreateShipping.vue"),
                    },
                    {
                        path: "details/:id",
                        name: "route.shippings.details",
                        component: () =>
                            import("@/views/shippings/ShippingDetails.vue"),
                    },
                ],
            },
            {
                path: "suppliers",
                name: "route.suppliers.home",
                component: {
                    render() {
                        return h(resolveComponent("router-view"));
                    },
                },
                children: [
                    {
                        path: "",
                        name: "route.suppliers.table",
                        component: () =>
                            import("@/views/suppliers/Suppliers.vue"),
                    },
                    {
                        path: "create",
                        name: "route.suppliers.create",
                        component: () =>
                            import("@/views/suppliers/CreateSupplier.vue"),
                    },
                    {
                        path: "details/:id",
                        name: "route.suppliers.crdetailsdetailseate",
                        component: () =>
                            import("@/views/suppliers/SupplierDetails.vue"),
                    },
                ],
            },
            {
                path: "categories",
                name: "route.categories.home",
                component: {
                    render() {
                        return h(resolveComponent("router-view"));
                    },
                },
                children: [
                    {
                        path: "",
                        name: "route.categories.table",
                        component: () =>
                            import("@/views/categories/Categories.vue"),
                    },
                    {
                        path: "create",
                        name: "route.categories.create",
                        component: () =>
                            import("@/views/categories/CreateCategory.vue"),
                    },
                    {
                        path: "details/:id",
                        name: "route.categories.details",
                        component: () =>
                            import("@/views/categories/CategoryDetails.vue"),
                    },
                ],
            },
            {
                path: "warehouses",
                name: "route.warehouses.home",
                component: {
                    render() {
                        return h(resolveComponent("router-view"));
                    },
                },
                children: [
                    {
                        path: "",
                        name: "route.warehouses.table",
                        component: () =>
                            import("@/views/warehouses/Warehouses.vue"),
                    },
                    {
                        path: "create",
                        name: "route.warehouses.create",
                        component: () =>
                            import("@/views/warehouses/CreateWarehouse.vue"),
                    },
                    {
                        path: "details/:id",
                        name: "route.warehouses.details",
                        component: () =>
                            import("@/views/warehouses/WarehouseDetails.vue"),
                    },
                ],
            },
            {
                path: "clients",
                name: t("clients"),
                component: {
                    render() {
                        return h(resolveComponent("router-view"));
                    },
                },
                children: [
                    {
                        path: "",
                        name: "route.clients.table",
                        component: () => {
                            console.log("import");
                            return import("@/views/clients/Clients.vue");
                        },
                    },
                    {
                        path: "create",
                        name: "route.clients.create",
                        component: () =>
                            import("@/views/clients/CreateClient.vue"),
                    },
                    {
                        path: "details/:id",
                        name: "route.clients.details",
                        component: () =>
                            import("@/views/clients/ClientDetails.vue"),
                    },
                ],
            },
        ],
    },
    {
        path: "/login",
        name: "login",
        component: () => import("@/views/auth/Login.vue"),
        beforeEnter(to, from, next) {
            const isAuthenticated = store.getters.isAuthenticated;
            if (isAuthenticated) {
                next("/dashboard");
            } else {
                next();
            }
        },
    },
    {
        path: "/forgotpassword",
        name: "forgotpassword",
        component: () => import("@/views/auth/ForgotPassword.vue"),
    },
    {
        path: "/auth/forgotpassword/reset/:id/:token",
        name: "forgotpassword.reset",
        component: () => import("@/views/auth/ResetPassword.vue"),
    },
    {
        path: "/:catchAll(.*)",
        name: "not-found",
        component: () => import("@/views/error/404.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    // history: createWebHistory(),
    routes,
    scrollBehavior() {
        // always scroll to top
        return { top: 0 };
    },
});

// console.log(router);

// sync(store, router);

export default router;
