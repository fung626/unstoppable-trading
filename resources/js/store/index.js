// import * as Cookies from "js-cookie";
import SecureLS from "secure-ls";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import Auth from "./Auth";
import Categories from "./Categories";
import Clients from "./Clients";
import Dashboard from "./Dashboard";
import ExchangeRate from "./ExchangeRate";
import Goods from "./Goods";
import GoodsContent from "./GoodsContent";
import GoodsItem from "./GoodsItem";
import GoodsShipping from "./GoodsShipping";
import GoodsShippingAlteration from "./GoodsShippingAlteration";
import GoodsShipAvailableShippingItems from "./GoodsShippingAvailableShippingItems";
import GoodsShippingInvoice from "./GoodsShippingInvoice";
import GoodsShipingMailer from "./GoodsShippingMailer";
import GoodsShippingPacking from "./GoodsShippingPacking";
import GoodsShippingPurchaseQuickSearch from "./GoodsShippingPurchaseQuickSearch";
import GoodsStock from "./GoodsStock";
import GoodsStockCalendar from "./GoodsStockCalendar";
import Profile from "./Profile";
import PurchaseInvoice from "./PurchaseInvoice";
import PurchaseLineChart from "./PurchaseLineChart";
import Purchases from "./Purchases";
import PurchaseStockTake from "./PurchaseStockTake";
import SalesReportChart from "./SalesReportChart";
import SalesReports from "./SalesReports";
import SalesReportStockChart from "./SalesReportStockChart";
import SalesReportTopSales from "./SalesReportTopSales";
import SalesReportTopSocks from "./SalesReportTopSocks";
import Suppliers from "./Suppliers";
import UIAlert from "./UI/Alert";
import UISidebar from "./UI/Sidebar";
import UISnackbar from "./UI/Snackbar";
import User from "./User";
import UserDuty from "./UserDuty";
import UserDutyCalendar from "./UserDutyCalendar";
import UserEmployee from "./UserEmployee";
import UserEvent from "./UserEvent";
import UserPermission from "./UserPermission";
import Warehouses from "./Warehouses";

// Load store modules dynamically.

const ls = new SecureLS({ isCompression: false });

export default createStore({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        // API
        dashboard: Dashboard,
        auth: Auth,
        exchangerate: ExchangeRate,
        profile: Profile,
        user: User,
        ["users/duty"]: UserDuty,
        ["users/duty/calendar"]: UserDutyCalendar,
        ["users/employee"]: UserEmployee,
        ["users/event"]: UserEvent,
        ["users/permission"]: UserPermission,
        goods: Goods,
        ["goods/contents"]: GoodsContent,
        ["goods/items"]: GoodsItem,
        ["goods/shippings"]: GoodsShipping,
        ["goods/shippings/packing"]: GoodsShippingPacking,
        ["goods/shippings/purchases/quicksearch"]:
            GoodsShippingPurchaseQuickSearch,
        ["goods/shippings/mailer"]: GoodsShipingMailer,
        ["goods/shippings/invoices"]: GoodsShippingInvoice,
        ["goods/shippings/available/shipping/item"]:
            GoodsShipAvailableShippingItems,
        ["goods/shippings/alteration"]: GoodsShippingAlteration,
        ["goods/stocks"]: GoodsStock,
        ["goods/stocks/calendar"]: GoodsStockCalendar,
        ["goods/purchases"]: Purchases,
        ["goods/purchases/invoices"]: PurchaseInvoice,
        ["goods/purchases/stocktakes"]: PurchaseStockTake,
        ["sales-reports"]: SalesReports,
        ["sales-reports/chart"]: SalesReportChart,
        ["sales-reports/stockchart"]: SalesReportStockChart,
        ["sales-reports/top-sales"]: SalesReportTopSales,
        ["sales-reports/top-stocks"]: SalesReportTopSocks,
        categories: Categories,
        suppliers: Suppliers,
        warehouses: Warehouses,
        clients: Clients,
        ["chart/purchaseline"]: PurchaseLineChart,
        // UI
        ["ui/sidebar"]: UISidebar,
        ["ui/alart"]: UIAlert,
        ["ui/snackbar"]: UISnackbar,
    },
    // plugins: [createPersistedState({ storage: window.sessionStorage })]
    plugins: [
        createPersistedState({
            storage: {
                getItem: (key) => {
                    let item = ls.get(key);
                    if (item) {
                        let state = JSON.parse(item);
                        return state;
                    }
                    return {};
                },
                // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
                setItem: (key, state) => {
                    let str = JSON.stringify(state);
                    ls.set(key, str);
                },
                removeItem: (key) => ls.remove(key),
            },
        }),
    ],
});
