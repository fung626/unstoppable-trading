// import * as Cookies from "js-cookie";
import SecureLS from "secure-ls";
import Vue from "vue";
import Vuex from "vuex";
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
import GoodsStock from "./GoodsStock";
import Profile from "./Profile";
import Purchase from "./Purchase";
import PurchaseInvoice from "./PurchaseInvoice";
import PurchaseLineChart from "./PurchaseLineChart";
import PurchaseStockTake from "./PurchaseStockTake";
import SalesReport from "./SalesReport";
import Supplier from "./Supplier";
import UIAlert from "./UI/Alert";
import UISidebar from "./UI/Sidebar";
import UISnackbar from "./UI/Snackbar";
import User from "./User";
import UserEmployee from "./UserEmployee";
import UserEvent from "./UserEvent";
import UserPermission from "./UserPermission";
import Warehouse from "./Warehouse";

Vue.use(Vuex);

// Load store modules dynamically.

const ls = new SecureLS({ isCompression: false });

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
        // API
        dashboard: Dashboard,
        auth: Auth,
        exchangeRate: ExchangeRate,
        profile: Profile,
        user: User,
        ["user/employee"]: UserEmployee,
        ["user/permission"]: UserPermission,
        ["user/event"]: UserEvent,
        goods: Goods,
        ["goods/item"]: GoodsItem,
        ["goods/content"]: GoodsContent,
        ["goods/purchase"]: Purchase,
        ["goods/purchase/invoice"]: PurchaseInvoice,
        ["goods/purchase/stocktake"]: PurchaseStockTake,
        ["goods/shipping"]: GoodsShipping,
        ["goods/shipping/packing"]: GoodsShippingPacking,
        ["goods/shipping/mailer"]: GoodsShipingMailer,
        ["goods/shipping/invoice"]: GoodsShippingInvoice,
        ["goods/shipping/available/shipping/item"]: GoodsShipAvailableShippingItems,
        ["goods/shipping/alteration"]: GoodsShippingAlteration,
        ["goods/stock"]: GoodsStock,
        ["salesreport"]: SalesReport,
        category: Category,
        supplier: Supplier,
        warehouse: Warehouse,
        client: Client,
        ["chart/purchaseline"]: PurchaseLineChart,
        // UI
        uisidebar: UISidebar,
        uialert: UIAlert,
        uisnackbar: UISnackbar
    },
    // plugins: [createPersistedState({ storage: window.sessionStorage })]
    plugins: [
        createPersistedState({
            storage: {
                getItem: key => {
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
                removeItem: key => ls.remove(key)
            }
        })
    ]
});
