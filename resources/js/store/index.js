// import * as Cookies from "js-cookie";
import SecureLS from "secure-ls";
import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate";
import Auth from "./Auth";
import Category from "./Category";
import Client from "./Client";
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
import Purchase from "./Purchase";
import PurchaseInvoice from "./PurchaseInvoice";
import PurchaseLineChart from "./PurchaseLineChart";
import PurchaseStockTake from "./PurchaseStockTake";
import SalesReport from "./SalesReport";
import SalesReportChart from "./SalesReportChart";
import SalesReportStockChart from "./SalesReportStockChart";
import SalesReportTopSales from "./SalesReportTopSales";
import SalesReportTopSocks from "./SalesReportTopSocks";
import Supplier from "./Supplier";
import UIAlert from "./UI/Alert";
import UISidebar from "./UI/Sidebar";
import UISnackbar from "./UI/Snackbar";
import User from "./User";
import UserDuty from "./UserDuty";
import UserDutyCalendar from "./UserDutyCalendar";
import UserEmployee from "./UserEmployee";
import UserEvent from "./UserEvent";
import UserPermission from "./UserPermission";
import Warehouse from "./Warehouse";

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
        ["user/duty"]: UserDuty,
        ["user/duty/calendar"]: UserDutyCalendar,
        ["user/employee"]: UserEmployee,
        ["user/event"]: UserEvent,
        ["user/permission"]: UserPermission,
        goods: Goods,
        ["goods/content"]: GoodsContent,
        ["goods/item"]: GoodsItem,
        ["goods/shipping"]: GoodsShipping,
        ["goods/shipping/packing"]: GoodsShippingPacking,
        ["goods/shipping/purchase/quicksearch"]:
            GoodsShippingPurchaseQuickSearch,
        ["goods/shipping/mailer"]: GoodsShipingMailer,
        ["goods/shipping/invoice"]: GoodsShippingInvoice,
        ["goods/shipping/available/shipping/item"]:
            GoodsShipAvailableShippingItems,
        ["goods/shipping/alteration"]: GoodsShippingAlteration,
        ["goods/stock"]: GoodsStock,
        ["goods/stock/calendar"]: GoodsStockCalendar,
        ["goods/purchase"]: Purchase,
        ["goods/purchase/invoice"]: PurchaseInvoice,
        ["goods/purchase/stocktake"]: PurchaseStockTake,
        salesreport: SalesReport,
        ["salesreport/chart"]: SalesReportChart,
        ["salesreport/stockchart"]: SalesReportStockChart,
        ["salesreport/topsales"]: SalesReportTopSales,
        ["salesreport/topstocks"]: SalesReportTopSocks,
        category: Category,
        supplier: Supplier,
        warehouse: Warehouse,
        client: Client,
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
