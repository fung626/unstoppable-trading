// import Dashboard from "../pages/Dashboard";
// import Welcome from "../components/user/User";
import { i18n } from "../plugins";

const Error404 = () => import("../pages/error/404");
const Error500 = () => import("../pages/error/500");

// auth
const Login = () => import("../pages/auth/Login");
const ForgotPassword = () => import("../pages/auth/ForgotPassword");
const ResetPassword = () => import("../pages/auth/ResetPassword");

const Profile = () => import("../pages/profile/Profile");

const TheContainer = () => import("../containers/TheContainer");

const Dashboard = () => import("../pages/dashboard/Dashboard");

// SalesReport
const SalesReport = () => import("../pages/salesReport/SalesReport");

// ExchangeRate
const ExchangeRate = () => import("../pages/exchangeRate/ExchangeRate");
const ExchangeRateDetails = () =>
    import("../pages/exchangeRate/ExchangeRateDetails");

// User
const User = () => import("../pages/user/User");
const CreateUser = () => import("../pages/user/CreateUser");
const UserDetails = () => import("../pages/user/UserDetails");

// Duty
const Duty = () => import("../pages/duty/Duty");
const CreateDuty = () => import("../pages/duty/CreateDuty");
const DutyDetails = () => import("../pages/duty/DutyDetails");

// Goods
const Goods = () => import("../pages/goods/Goods");
const CreateGoods = () => import("../pages/goods/CreateGoods");
const GoodsDetails = () => import("../pages/goods/GoodsDetails");

// GoodsStock
const GoodsStock = () => import("../pages/goodsStock/GoodsStock");

// Purchase
const Purchase = () => import("../pages/purchase/Purchase");
const CreatePurchase = () => import("../pages/purchase/CreatePurchase");
const PurchaseDetails = () => import("../pages/purchase/PurchaseDetails");
const StockTake = () => import("../pages/purchase/StockTake");

// Shipping
const Shipping = () => import("../pages/shipping/Shipping");
const CreateShipping = () => import("../pages/shipping/CreateShipping");
const ShippingDetails = () => import("../pages/shipping/ShippingDetails");

// Supplier
const Supplier = () => import("../pages/supplier/Supplier");
const CreateSupplier = () => import("../pages/supplier/CreateSupplier");
const SupplierDetails = () => import("../pages/supplier/SupplierDetails");

// Category
const Category = () => import("../pages/category/Category");
const CreateCategory = () => import("../pages/category/CreateCategory");
const CategoryDetails = () => import("../pages/category/CategoryDetails");

// Warehouse
const Warehouse = () => import("../pages/warehouse/Warehouse");
const CreateWarehouse = () => import("../pages/warehouse/CreateWarehouse");
const WarehouseDetails = () => import("../pages/warehouse/WarehouseDetails");

// Client
const Client = () => import("../pages/client/Client");
const CreateClient = () => import("../pages/client/CreateClient");
const ClientDetails = () => import("../pages/client/ClientDetails");

export default ({ authGuard, guestGuard }) => [
    // { path: "*", component: require("../pages/errors/404.vue") }
    // Authenticated routes.
    ...authGuard([
        {
            path: "/",
            redirect: "/dashboard",
            name: i18n.t("home"),
            component: TheContainer,
            children: [
                {
                    path: "",
                    name: i18n.t("dashboard"),
                    component: Dashboard
                },
                {
                    path: "/profile",
                    meta: { label: i18n.t("profile") },
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                            path: "",
                            component: Profile
                        }
                    ]
                },
                {
                    path: "salesreport",
                    meta: { label: i18n.t("salesreport") },
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                            path: "",
                            meta: { label: i18n.t("home") },
                            name: "SalesReport",
                            component: SalesReport
                        }
                    ]
                },
                {
                    path: "exchangerate",
                    meta: { label: i18n.t("exchangerate") },
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                            path: "",
                            meta: { label: i18n.t("table") },
                            name: "ExchangeRate",
                            component: ExchangeRate
                        },
                        {
                            path: "details/:base/:symbol",
                            meta: { label: i18n.t("details") },
                            name: "ExchangeRateDetails",
                            component: ExchangeRateDetails
                        }
                    ]
                },
                {
                    path: "user",
                    meta: { label: i18n.t("user") },
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                            path: "",
                            meta: { label: i18n.t("table") },
                            name: "User",
                            component: User
                        },
                        {
                            path: "create",
                            meta: { label: i18n.t("create") },
                            name: "CreateUser",
                            component: CreateUser
                        },
                        {
                            path: "details/:id",
                            meta: { label: i18n.t("details") },
                            name: "UserDetails",
                            component: UserDetails
                        }
                    ]
                },
                {
                    path: "duty",
                    meta: { label: i18n.t("duty") },
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                            path: "",
                            meta: { label: i18n.t("table") },
                            name: "Duty",
                            component: Duty
                        },
                        {
                            path: "create/:userId?",
                            meta: { label: i18n.t("create") },
                            name: "CreateDuty",
                            component: CreateDuty
                        },
                        {
                            path: "details/:id",
                            meta: { label: i18n.t("details") },
                            name: "DutyDetails",
                            component: DutyDetails
                        }
                    ]
                },
                {
                    path: "/goods",
                    meta: { label: i18n.t("goods") },
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                            path: "",
                            meta: { label: i18n.t("table") },
                            name: "Goods",
                            component: Goods
                        },
                        {
                            path: "create",
                            meta: { label: i18n.t("create") },
                            name: "CreateGoods",
                            component: CreateGoods
                        },
                        {
                            path: "details/:id",
                            meta: { label: i18n.t("details") },
                            name: "GoodsDetails",
                            component: GoodsDetails
                        }
                    ]
                },
                {
                    path: "/stock",
                    meta: { label: i18n.t("stock") },
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                            path: "",
                            meta: { label: i18n.t("table") },
                            name: "GoodsStock",
                            component: GoodsStock
                        }
                    ]
                },
                {
                    path: "/purchase",
                    meta: { label: i18n.t("purchase") },
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                            path: "",
                            meta: { label: i18n.t("table") },
                            name: "Purchase",
                            component: Purchase
                        },
                        {
                            path: "create/:id",
                            meta: { label: i18n.t("create") },
                            name: "CreatePurchase",
                            component: CreatePurchase
                        },
                        {
                            path: "details/:id",
                            meta: { label: i18n.t("details") },
                            name: "PurchaseDetails",
                            component: PurchaseDetails
                        },
                        {
                            path: "stocktake/:id",
                            meta: { label: i18n.t("stocktake") },
                            name: "StockTake",
                            component: StockTake
                        }
                    ]
                },
                {
                    path: "/shipping",
                    meta: { label: i18n.t("shipping") },
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                            path: "",
                            meta: { label: i18n.t("table") },
                            name: "Shipping",
                            component: Shipping
                        },
                        {
                            path: "create",
                            meta: { label: i18n.t("create") },
                            name: "CreateShipping",
                            component: CreateShipping
                        },
                        {
                            path: "details/:id",
                            meta: { label: i18n.t("details") },
                            name: "ShippingDetails",
                            component: ShippingDetails
                        }
                    ]
                },
                {
                    path: "/supplier",
                    meta: { label: i18n.t("supplier") },
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                            path: "",
                            meta: { label: i18n.t("table") },
                            name: "Supplier",
                            component: Supplier
                        },
                        {
                            path: "create",
                            meta: { label: i18n.t("create") },
                            name: "CreateSupplier",
                            component: CreateSupplier
                        },
                        {
                            path: "details/:id",
                            meta: { label: i18n.t("details") },
                            name: "SupplierDetails",
                            component: SupplierDetails
                        }
                    ]
                },
                {
                    path: "/category",
                    meta: { label: i18n.t("category") },
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                            path: "",
                            meta: { label: i18n.t("table") },
                            name: "Category",
                            component: Category
                        },
                        {
                            path: "create",
                            meta: { label: i18n.t("create") },
                            name: "CreateCategory",
                            component: CreateCategory
                        },
                        {
                            path: "details/:id",
                            meta: { label: i18n.t("details") },
                            name: "CategoryDetails",
                            component: CategoryDetails
                        }
                    ]
                },
                {
                    path: "/warehouse",
                    meta: { label: i18n.t("warehouse") },
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                            path: "",
                            meta: { label: i18n.t("table") },
                            name: "Warehouse",
                            component: Warehouse
                        },
                        {
                            path: "create",
                            meta: { label: i18n.t("create") },
                            name: "CreateWarehouse",
                            component: CreateWarehouse
                        },
                        {
                            path: "details/:id",
                            meta: { label: i18n.t("details") },
                            name: "WarehouseDetails",
                            component: WarehouseDetails
                        }
                    ]
                },
                {
                    path: "/client",
                    meta: { label: i18n.t("client") },
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [
                        {
                            path: "",
                            meta: { label: i18n.t("table") },
                            name: "Client",
                            component: Client
                        },
                        {
                            path: "create",
                            meta: { label: i18n.t("create") },
                            name: "CreateClient",
                            component: CreateClient
                        },
                        {
                            path: "details/:id",
                            meta: { label: i18n.t("details") },
                            name: "ClientDetails",
                            component: ClientDetails
                        }
                    ]
                }
            ]
        }
    ]),
    // Guest routes.
    ...guestGuard([
        {
            path: "/login",
            name: "Login",
            component: Login
        },
        {
            path: "/forgotpassword",
            name: "ForgotPassword",
            component: ForgotPassword
        },
        {
            path: "/auth/forgot/password/reset/:id/:token",
            name: "ResetPassword",
            component: ResetPassword
        },
        { path: "*", component: Error404 }
    ])
];
