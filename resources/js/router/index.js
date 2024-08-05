import DefaultLayout from "@/layouts/DefaultLayout.vue";
import i18n from "@/plugins/vue-i18n";
import { h, resolveComponent } from "vue";
import { createRouter, createWebHashHistory } from "vue-router";
// import routes from "./routes";

const { t } = i18n.global;

const routes = [
    {
        path: "/",
        name: t("home"),
        component: DefaultLayout,
        redirect: "/dashboard",
        beforeEnter(to, from, next) {
            const isAuthenticated = false;
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
                path: "sales-report",
                name: "salesreport.home",
                component: {
                    render() {
                        return h(resolveComponent("router-view"));
                    },
                },
                children: [
                    {
                        path: "",
                        name: t("salesreport.table"),
                        component: import(
                            "@/views/sales-report/SalesReport.vue"
                        ),
                    },
                ],
            },
            {
                path: "/users",
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
                        name: "CreateDuty",
                        component: () => import("@/views/duty/CreateDuty.vue"),
                    },
                    {
                        path: "details/:id",
                        name: "route.duty.details",
                        component: () => import("@/views/duty/DutyDetails.vue"),
                    },
                ],
            },
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
        path: "/login",
        name: "login",
        component: () => import("@/views/auth/Login.vue"),
    },
    {
        path: "/forgotpassword",
        name: "forgotpassword",
        component: () => import("@/views/auth/ForgotPassword.vue"),
    },
    {
        path: "/auth/forgot/password/reset/:id/:token",
        name: "resetpassword",
        component: () => import("@/views/auth/ResetPassword.vue"),
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
