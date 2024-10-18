import { createI18n } from "vue-i18n";
import { cilArrowBottom, cilArrowRight, cilArrowTop, cilBan, cilBarcode, cilBasket, cilBell, cilCalculator, cilCalendar, cilCalendarCheck, cilChartLine, cilChartPie, cilCheck, cilCheckAlt, cilCheckCircle, cilChevronBottom, cilChevronTop, cilCloudDownload, cilCode, cilCommentSquare, cilContact, cilContrast, cilCursor, cilDescription, cilDollar, cilDrop, cilEnvelopeClosed, cilEnvelopeOpen, cilEuro, cilFile, cilGlobeAlt, cilGrid, cilJustifyCenter, cilLaptop, cilLayers, cilLightbulb, cilList, cilLocationPin, cilLockLocked, cilMagnifyingGlass, cilMediaPlay, cilMenu, cilMoon, cilNotes, cilOptions, cilPencil, cilPeople, cilPlaylistAdd, cilPlus, cilPuzzle, cilReload, cilRoom, cilSend, cilSettings, cilShieldAlt, cilShortText, cilSpeech, cilSpeedometer, cilSpreadsheet, cilSquare, cilStar, cilStorage, cilSun, cilTask, cilTruck, cilUser, cilUserFemale, cilUserFollow, cilViewQuilt, cilX, cilXCircle, cifBr, cifEs, cifFr, cifIn, cifPl, cifUs, cibBehance, cibCcAmex, cibCcApplePay, cibCcMastercard, cibCcPaypal, cibCcStripe, cibCcVisa, cibDribbble, cibFacebook, cibFlickr, cibGithub, cibGoogle, cibInstagram, cibLinkedin, cibPinterest, cibReddit, cibServerFault, cibStackoverflow, cibTumblr, cibTwitter, cibVimeo, cibVk, cibXing, cibYahoo, cibYoutube } from "@coreui/icons";
import VueBarcode from "@chenfengyuan/vue-barcode";
import VueNumberInput from "@chenfengyuan/vue-number-input";
import CIcon from "@coreui/icons-vue";
import CoreuiVue, { useColorModes, CNavItem, CNavGroup, CNavTitle, CSidebarNav, CBadge, CContainer } from "@coreui/vue";
import { localize, setLocale } from "@vee-validate/i18n";
import * as rules from "@vee-validate/rules";
import moment from "moment";
import { defineRule, configure, ErrorMessage } from "vee-validate";
import { resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, toHandlers, useSSRContext, Fragment, renderList, withDirectives, vShow, ref, onMounted, unref, defineComponent, h, createApp } from "vue";
import Popper from "vue3-popper";
import _, { debounce } from "lodash";
import { v4 } from "uuid";
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrRenderAttr } from "vue/server-renderer";
import { VDataTableServer, VDataTable } from "vuetify/lib/components/VDataTable/index.mjs";
import { VProgressLinear } from "vuetify/lib/components/VProgressLinear/index.mjs";
import { VSkeletonLoader } from "vuetify/lib/components/VSkeletonLoader/index.mjs";
import { VTooltip } from "vuetify/lib/components/VTooltip/index.mjs";
import { mapState, createStore } from "vuex";
import { VCard, VCardText, VCardActions } from "vuetify/lib/components/VCard/index.mjs";
import { VDialog } from "vuetify/lib/components/VDialog/index.mjs";
import { VSpacer } from "vuetify/lib/components/VGrid/index.mjs";
import { VToolbar, VToolbarTitle } from "vuetify/lib/components/VToolbar/index.mjs";
import { useDate, createVuetify, useTheme } from "vuetify";
import { VSelect } from "vuetify/lib/components/VSelect/index.mjs";
import { VTextField } from "vuetify/lib/components/VTextField/index.mjs";
import { StreamBarcodeReader } from "vue-barcode-reader";
import { VAutocomplete } from "vuetify/lib/components/VAutocomplete/index.mjs";
import { VBtn } from "vuetify/lib/components/VBtn/index.mjs";
import { VSnackbar } from "vuetify/lib/components/VSnackbar/index.mjs";
import { VColorPicker } from "vuetify/lib/components/VColorPicker/index.mjs";
import { VMenu } from "vuetify/lib/components/VMenu/index.mjs";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import * as labsComponents from "vuetify/labs/components";
import { useRoute, RouterLink, createRouter, createWebHashHistory } from "vue-router";
import SecureLS from "secure-ls";
import createPersistedState from "vuex-persistedstate";
import axios from "axios";
import queryString from "query-string";
import simplebar from "simplebar-vue";
const alert$1 = {
  title: "Alert",
  update: "Are you sure you want to update this record?",
  "delete": "Are you sure you want to delete this record?",
  stocktake: "Are you sure you want to submit this stocktake?",
  shipping: "Please enter unit"
};
const __vite_glob_0_0 = {
  alert: alert$1
};
const auth$1 = {
  signin: {
    msg: "Welcome"
  },
  forgotpassword: {
    title: "Forgot your password?",
    msg: "Enter the email address associated with your account and we will send you a link to reset your password.",
    mailsent: "An email has been sent to your email account."
  },
  resetpassword: {
    success: "Your password has been reset",
    invalid: "Invalid reset password link"
  }
};
const __vite_glob_0_1 = {
  auth: auth$1
};
const button$1 = {
  jumpto: "Jump to",
  details: "Details",
  submit: "Submit",
  confirm: "Confirm",
  update: "update",
  edit: "Edit",
  add: "Add",
  "delete": "Delete",
  cancel: "Cancel",
  clear: "Clear",
  close: "Close",
  "export": "Export"
};
const __vite_glob_0_2 = {
  button: button$1
};
const calendar$1 = {
  title: "Calendar",
  year: "Year",
  month: "Month",
  week: "Week",
  day: "Day"
};
const __vite_glob_0_3 = {
  calendar: calendar$1
};
const login$1 = "Login";
const logout$1 = "Logout";
const prev$1 = "Prev";
const next$1 = "Next";
const start$1 = "Start";
const end$1 = "End";
const forgotpassword$1 = "Forgot Password";
const oldpassword$1 = "Old Password";
const newpassword$1 = "New Password";
const confirmpassword$1 = "Confirm Password";
const resetpassword$1 = "Reset Password";
const password$1 = "Password";
const table$1 = "Table";
const account$1 = "Account";
const profile$1 = "Profile";
const settings$1 = "Settings";
const management$1 = "Management";
const home$1 = "Home";
const dashboard$1 = "Dashboard";
const empty$1 = "Empty";
const more$1 = "More";
const example$1 = "Example";
const number$1 = "Number";
const role$1 = "Role";
const user$1 = "User";
const users$1 = "Users";
const permission$3 = "Permission";
const permissions$2 = "Permissions";
const salary$1 = "Salary";
const fulltime$1 = "Full-Time";
const parttime$1 = "Part-Time";
const goods$1 = "Goods";
const stock$1 = "Stock";
const stocks$1 = "Stocks";
const month$1 = "Month";
const year$1 = "Year";
const amount$1 = "Amount";
const cost$1 = "Cost";
const client$1 = "Client";
const clients$1 = "Clients";
const supplier$1 = "Supplier";
const suppliers$1 = "Suppliers";
const category$1 = "Category";
const categories$1 = "Categories";
const purchase$2 = "Purchase";
const warehouse$1 = "Warehouse";
const details$1 = "Details";
const info$1 = "Info";
const description$1 = "Description";
const subtotal$3 = "Sub Total";
const name$19 = "Name";
const email$1 = "Email";
const contact$1 = "Contact";
const countrycode$1 = "Country Code";
const phone$1 = "Phone";
const fax$1 = "Fax";
const sector$1 = "Sector";
const shelf$1 = "Shelf";
const segment$1 = "Segment";
const district$1 = "District";
const address$1 = "Address";
const type$2 = "Type";
const status$1 = "Status";
const creator$1 = "Creator";
const date$1 = "Date";
const cup$1 = "Cup";
const color$1 = "Color";
const size$1 = "Size";
const barcode$1 = "Barcode";
const updatedat$1 = "Updated at";
const createdat$1 = "Created at";
const actions$H = "Actions";
const currency$1 = "Currency";
const invoice$1 = "Invoice";
const stockalert$1 = "Stock Alert";
const stocktake$1 = "Stocktake";
const mailerinfo = "Mailer Info";
const packing = "Packing";
const update$1 = "Update";
const alteration$1 = "Alteration";
const altered$1 = "Altered";
const quantity$1 = "Quantity";
const unit$1 = "Unit";
const scanner$1 = "Scanner";
const search$1 = "Search";
const admin$1 = "Admin";
const ADMIN$2 = "ADMIN";
const employee$1 = "Employee";
const EMPLOYEE$2 = "EMPLOYEE";
const employer$1 = "employer";
const duty$1 = "Duty";
const dutylist$1 = "Duty List";
const leave$1 = "Leave";
const traffic$1 = "Traffic";
const base$1 = "Base";
const symbol$1 = "Symbol";
const rate$1 = "rate";
const __vite_glob_0_4 = {
  login: login$1,
  logout: logout$1,
  prev: prev$1,
  next: next$1,
  start: start$1,
  end: end$1,
  "no-data": "No Data",
  forgotpassword: forgotpassword$1,
  oldpassword: oldpassword$1,
  newpassword: newpassword$1,
  confirmpassword: confirmpassword$1,
  resetpassword: resetpassword$1,
  password: password$1,
  table: table$1,
  account: account$1,
  profile: profile$1,
  settings: settings$1,
  "sales-report": "Sales Report",
  "sales-reports": "Sales Reports",
  "top-sales": "Top Sales",
  "top-stocks": "Top Stocks",
  management: management$1,
  home: home$1,
  dashboard: dashboard$1,
  "default": "Default",
  empty: empty$1,
  more: more$1,
  example: example$1,
  number: number$1,
  role: role$1,
  user: user$1,
  users: users$1,
  permission: permission$3,
  permissions: permissions$2,
  salary: salary$1,
  fulltime: fulltime$1,
  parttime: parttime$1,
  goods: goods$1,
  "goods-name": "Name",
  "goods-item": "Goods Item",
  "goods-content": "Goods Content",
  "content-key": "Key",
  "content-value": "Value",
  stock: stock$1,
  stocks: stocks$1,
  "unit-price": "Unit Price",
  "total-unit": "Total Unit",
  "default-unit": "Default Unit",
  "updated-unit": "Updated Unit",
  month: month$1,
  year: year$1,
  amount: amount$1,
  cost: cost$1,
  "stock-unit": "Stock Unit",
  client: client$1,
  clients: clients$1,
  supplier: supplier$1,
  suppliers: suppliers$1,
  category: category$1,
  categories: categories$1,
  purchase: purchase$2,
  warehouse: warehouse$1,
  details: details$1,
  info: info$1,
  description: description$1,
  subtotal: subtotal$3,
  name: name$19,
  email: email$1,
  contact: contact$1,
  countrycode: countrycode$1,
  phone: phone$1,
  fax: fax$1,
  sector: sector$1,
  shelf: shelf$1,
  segment: segment$1,
  district: district$1,
  address: address$1,
  type: type$2,
  status: status$1,
  creator: creator$1,
  date: date$1,
  cup: cup$1,
  color: color$1,
  size: size$1,
  barcode: barcode$1,
  updatedat: updatedat$1,
  createdat: createdat$1,
  actions: actions$H,
  currency: currency$1,
  invoice: invoice$1,
  stockalert: stockalert$1,
  stocktake: stocktake$1,
  mailerinfo,
  packing,
  update: update$1,
  "return": "Return",
  "delete": "Delete",
  alteration: alteration$1,
  altered: altered$1,
  quantity: quantity$1,
  unit: unit$1,
  scanner: scanner$1,
  search: search$1,
  "quick-search": "Quick Search",
  admin: admin$1,
  ADMIN: ADMIN$2,
  employee: employee$1,
  EMPLOYEE: EMPLOYEE$2,
  employer: employer$1,
  duty: duty$1,
  dutylist: dutylist$1,
  leave: leave$1,
  traffic: traffic$1,
  "joined-at": "Joined at",
  "left-at": "Left at",
  "annual-leave-days": "Annual Leave Days",
  "exchange-rate": "Exchange Rate",
  "exchange-rates": "Exchange Rates",
  base: base$1,
  symbol: symbol$1,
  rate: rate$1,
  "average-inventory": "Average Inventory",
  "inventory-turnover": "Inventory Turnover",
  "inventory-change": "Inventory Change",
  "days-inventory-outstanding": "Days Inventory Outstanding",
  "last-three-months": "Last Three Months",
  "last-some-days": "Last {days} Days"
};
const country$1 = {
  HK: "香港",
  TW: "台灣"
};
const __vite_glob_0_5 = {
  country: country$1
};
const currencies$2 = {
  HKD: "HKD",
  TWD: "TWD"
};
const __vite_glob_0_6 = {
  currencies: currencies$2
};
const error$1 = {
  "exceed-stock-unit": "Exceed stock unit",
  camera: "Device not compatible"
};
const hint$1 = {
  duty: {
    date: "You may select multi date to create more than one duty with same time range"
  }
};
const __vite_glob_0_7 = {
  error: error$1,
  hint: hint$1
};
const mpf$1 = {
  contribution: " MPF Contribution"
};
const __vite_glob_0_8 = {
  mpf: mpf$1
};
const permission$2 = {
  goods: {
    title: "Goods",
    description: "Allow to create/edit/view goods data"
  },
  users: {
    title: "Users",
    description: "Allow to create/edit/view users data"
  },
  stocks: {
    title: "Stocks",
    description: "Allow to create/edit/view stocks data"
  },
  clients: {
    title: "Clients",
    description: "Allow to create/edit/view clients data"
  },
  purchases: {
    title: "Purchases",
    description: "Allow to create/edit/view purchases data"
  },
  shippings: {
    title: "Shippings",
    description: "Allow to create/edit/view shippings data"
  },
  suppliers: {
    title: "Suppliers",
    description: "Allow to create/edit/view suppliers data"
  },
  categories: {
    title: "Clients",
    description: "Allow to create/edit/view categories data"
  },
  warehouses: {
    title: "Warehouses",
    description: "Allow to create/edit/view warehouses data"
  },
  "sales-reports": {
    title: "Sales Reports",
    description: "Allow to view sales reports data"
  }
};
const __vite_glob_0_9 = {
  permission: permission$2
};
const price$1 = {
  cost: "Cost",
  retail: "Retail Price",
  wholesale: "Wholesale Price"
};
const subtotal$2 = "Sub Total";
const __vite_glob_0_10 = {
  price: price$1,
  subtotal: subtotal$2
};
const purchases$1 = {
  title: "Purchases"
};
const purchase$1 = {
  title: "Purchase",
  invoice: "Purchase Invoice",
  deliver: "Deliver",
  status: {
    pending: "Pending",
    PENDING: "Pending",
    processing: "Processing",
    PROCESSING: "Processing",
    delivered: "Delivered",
    DELIVERED: "Delivered"
  }
};
const __vite_glob_0_11 = {
  purchases: purchases$1,
  purchase: purchase$1
};
const route$1 = {
  leaves: {
    home: "leaves",
    create: "Create"
  },
  users: {
    home: "Users",
    table: "Table",
    create: "Create",
    details: "Details"
  },
  "exchange-rates": {
    home: "Exchange Rates",
    table: "Table",
    create: "Create",
    details: "Details"
  },
  "sales-reports": {
    home: "Sales Reports",
    table: "Table",
    create: "Create",
    details: "Details"
  },
  duty: {
    home: "Duty",
    table: "Table",
    create: "Create",
    details: "Details"
  },
  goods: {
    home: "Goods",
    table: "Table",
    create: "Create",
    details: "Details"
  },
  stocks: {
    home: "Stocks",
    table: "Table",
    create: "Create",
    details: "Details"
  },
  purchases: {
    home: "Purchases",
    table: "Table",
    create: "Create",
    details: "Details",
    stocktakes: "Stocktakes"
  },
  shippings: {
    home: "Shippings",
    table: "Table",
    create: "Create",
    details: "Details"
  },
  suppliers: {
    home: "Suppliers",
    table: "Table",
    create: "Create",
    details: "Details"
  },
  categories: {
    home: "Categories",
    table: "Table",
    create: "Create",
    details: "Details"
  },
  warehouses: {
    home: "Warehouses",
    table: "Table",
    create: "Create",
    details: "Details"
  },
  clients: {
    home: "Clients",
    table: "Table",
    create: "Create",
    details: "Details"
  }
};
const __vite_glob_0_12 = {
  route: route$1
};
const shippings$1 = {
  title: "Shippings"
};
const shipping$1 = {
  invoice: "Shipping invoice",
  cart: "Shipping Cart",
  "monthly-statement": "Monthly Statement",
  "number-of-shipments": "Number of Shipments",
  "total-number-of-shipments": "Total Number of Shipments",
  "total-gross-profit": "Total Gross Profit",
  "export-mailer-info": "Export Mailer Info",
  "export-packing": "Export Packing",
  "export-invoice": "Export Invoice",
  "export-invoice-and-hide-prices": "Export Invoice and Hide Prices",
  "add-shipment-goods": "Add Shipment Goods",
  "browse-stock-table": "Browse Stocks Table",
  "quick-search-goods": "Quick Search Goods",
  period: {
    months: "months",
    years: "years"
  },
  status: {
    pending: "Pending",
    PENDING: "Pending",
    processing: "Processing",
    PROCESSING: "Processing",
    delivered: "Delivered",
    DELIVERED: "Delivered"
  }
};
const __vite_glob_0_13 = {
  shippings: shippings$1,
  shipping: shipping$1
};
const snackbar$1 = {
  fail: {
    token: "Invalid token",
    login: "Fail to login",
    update: "Fail to update",
    create: "Fail to create",
    "delete": "Fail to delete"
  },
  success: {
    login: "Successfully Login",
    updated: "Successfully Updated",
    created: "Successfully Created",
    deleted: "Successfully deleted"
  }
};
const __vite_glob_0_14 = {
  snackbar: snackbar$1
};
const alert = {
  title: "提示",
  update: "您確定要更新此記錄嗎？",
  "delete": "您確定要刪除此記錄嗎？",
  stocktake: "您確定要提交此盤點嗎？",
  shipping: "請輸入出貨數量"
};
const __vite_glob_1_0 = {
  alert
};
const auth = {
  signin: {
    msg: "歡迎"
  },
  forgotpassword: {
    title: "忘記了您的密碼?",
    msg: "輸入與您的帳戶電子郵件地址，我們將向您發送一個鏈接以重置您的密碼。",
    mailsent: "忘記密碼的電子郵件已發送到您的電子郵件帳戶。"
  },
  resetpassword: {
    success: "您的密碼已重設",
    invalid: "無效重置密碼連結"
  }
};
const __vite_glob_1_1 = {
  auth
};
const button = {
  jumpto: "跳至",
  details: "詳細",
  submit: "提交",
  confirm: "確定",
  update: "更新",
  edit: "更改",
  add: "新增",
  "delete": "刪除",
  cancel: "取消",
  clear: "清除",
  close: "關閉",
  "export": "匯出"
};
const __vite_glob_1_2 = {
  button
};
const calendar = {
  title: "日曆",
  year: "年",
  month: "月",
  week: "星期",
  day: "日"
};
const __vite_glob_1_3 = {
  calendar
};
const login = "登入";
const logout = "登出";
const prev = "上一個";
const next = "下一個";
const start = "開始";
const end = "結束";
const forgotpassword = "忘記密碼";
const oldpassword = "舊密碼";
const newpassword = "新密碼";
const confirmpassword = "確認密碼";
const resetpassword = "重設密碼";
const password = "密碼";
const table = "清單";
const account = "帳戶";
const profile = "我的帳戶";
const settings = "設定";
const warehouses = "倉庫";
const management = "管理";
const home = "主頁";
const dashboard = "控制板";
const empty = "空的";
const more = "更多";
const example = "例子";
const number = "編號";
const role = "權限";
const user = "用戶";
const users = "用戶";
const permission$1 = "允許權限";
const permissions$1 = "允許權限";
const salary = "薪酬";
const fulltime = "全職";
const parttime = "兼職";
const goods = "貨物";
const goodsname = "貨號";
const goodsitem = "貨物項目";
const goodscontent = "貨物自定內容";
const contentkey = "名稱";
const contentvalue = "內容";
const stock = "庫存";
const stocks = "庫存";
const month = "月";
const months = "月";
const year = "年";
const years = "年";
const amount = "金額";
const cost = "價錢";
const client = "客戶";
const clients = "客戶";
const supplier = "供應商";
const suppliers = "供應商";
const category = "類別";
const categories = "類別";
const warehouse = "貨倉";
const create = "新增";
const details = "詳細";
const info = "詳細";
const description = "描述";
const subtotal$1 = "總金額";
const name$18 = "名稱";
const email = "電郵";
const contact = "聯絡";
const countrycode = "區號";
const phone = "電話";
const fax = "傳真";
const sector = "區";
const shelf = "貨架";
const segment = "行";
const district = "地區";
const address = "地址";
const type$1 = "類型";
const status = "狀態";
const creator = "負責用戶";
const date = "日期";
const cup = "罩杯";
const color = "顏色";
const size = "尺碼";
const barcode = "條碼";
const updatedat = "更新日期";
const createdat = "新增日期";
const actions$G = "功能";
const currency = "貨幣";
const invoice = "單";
const stockalert = "庫存提示";
const stocktake = "點貨";
const update = "更新";
const alteration = "更改";
const altered = "已更改";
const quantity = "數量";
const unit = "數量";
const scanner = "掃描器";
const search = "搜尋";
const quicksearch = "快速搜尋";
const admin = "管理員";
const ADMIN$1 = "管理員";
const employee = "員工";
const EMPLOYEE$1 = "員工";
const employer = "雇主";
const duty = "更";
const dutylist = "更表";
const leave = "休假";
const traffic = "流量";
const base = "Base";
const symbol = "Symbol";
const rate = "匯率";
const __vite_glob_1_4 = {
  login,
  logout,
  prev,
  next,
  start,
  end,
  "no-data": "沒有數據",
  forgotpassword,
  oldpassword,
  newpassword,
  confirmpassword,
  resetpassword,
  password,
  table,
  account,
  profile,
  settings,
  "sales-report": "銷售報告",
  "sales-reports": "銷售報告",
  "top-sales": "最高銷售貨物",
  "top-stocks": "最高庫庫存物",
  warehouses,
  management,
  home,
  dashboard,
  "default": "預設",
  empty,
  more,
  example,
  number,
  role,
  user,
  users,
  permission: permission$1,
  permissions: permissions$1,
  salary,
  fulltime,
  parttime,
  goods,
  goodsname,
  goodsitem,
  goodscontent,
  contentkey,
  contentvalue,
  stock,
  stocks,
  "unit-price": "單價",
  "total-unit": "總數",
  "default-unit": "預設數量",
  "updated-unit": "已更新數量",
  month,
  months,
  year,
  years,
  amount,
  cost,
  "stock-unit": "庫存數量",
  client,
  clients,
  supplier,
  suppliers,
  category,
  categories,
  warehouse,
  create,
  details,
  info,
  description,
  subtotal: subtotal$1,
  name: name$18,
  email,
  contact,
  countrycode,
  phone,
  fax,
  sector,
  shelf,
  segment,
  district,
  address,
  type: type$1,
  status,
  creator,
  date,
  cup,
  color,
  size,
  barcode,
  updatedat,
  createdat,
  "delivery-date": "交貨日期",
  actions: actions$G,
  currency,
  invoice,
  stockalert,
  stocktake,
  update,
  "return": "退貨",
  "delete": "刪除",
  alteration,
  altered,
  quantity,
  unit,
  scanner,
  search,
  quicksearch,
  admin,
  ADMIN: ADMIN$1,
  employee,
  EMPLOYEE: EMPLOYEE$1,
  employer,
  duty,
  dutylist,
  leave,
  traffic,
  "joined-at": "加入日期",
  "left-at": "離職日期",
  "annual-leave-days": "年假天數",
  "exchange-rate": "匯率",
  "exchange-rates": "匯率",
  base,
  symbol,
  rate,
  "average-inventory": "平均庫存",
  "inventory-turnover": "庫存周轉率",
  "inventory-change": "庫存變化",
  "days-inventory-outstanding": "庫存周轉天數",
  "last-three-months": "過去三個月",
  "last-some-days": "過去{days}日"
};
const country = {
  HK: "HK",
  TW: "TW"
};
const __vite_glob_1_5 = {
  country
};
const currencies$1 = {
  HKD: "港幣",
  TWD: "台幣"
};
const __vite_glob_1_6 = {
  currencies: currencies$1
};
const error = {
  "exceed-stock-unit": "超出庫存數量",
  camera: "設備不兼容"
};
const hint = {
  duty: {
    date: "您可以選擇多個日期以新增多個擁有相同時間的更"
  }
};
const __vite_glob_1_7 = {
  error,
  hint
};
const mpf = {
  contribution: " MPF 供款"
};
const __vite_glob_1_8 = {
  mpf
};
const permission = {
  goods: {
    title: "貨物",
    description: "允許建立/編輯/檢閱貨物資料"
  },
  users: {
    title: "用户",
    description: "允許建立/編輯/檢閱用户資料"
  },
  stocks: {
    title: "庫存",
    description: "允許建立/編輯/檢閱庫存資料"
  },
  clients: {
    title: "客戶",
    description: "允許建立/編輯/檢閱客戶資料"
  },
  purchases: {
    title: "購買",
    description: "允許建立/編輯/檢閱購買資料"
  },
  shippings: {
    title: "出貨",
    description: "允許建立/編輯/檢閱出貨資料"
  },
  suppliers: {
    title: "供應商",
    description: "允許建立/編輯/檢閱供應商資料"
  },
  categories: {
    title: "類別",
    description: "允許建立/編輯/檢閱類別資料"
  },
  warehouses: {
    title: "貨倉",
    description: "允許建立/編輯/檢閱貨倉資料"
  },
  "sales-reports": {
    title: "銷售報告",
    description: "允許檢閱貨倉資料"
  }
};
const __vite_glob_1_9 = {
  permission
};
const price = {
  cost: "成本價",
  retail: "零售價",
  wholesale: "批發價"
};
const subtotal = "總金額";
const __vite_glob_1_10 = {
  price,
  subtotal
};
const purchases = {
  title: "訂貨"
};
const purchase = {
  title: "訂貨",
  invoice: "訂貨單",
  deliver: "交付",
  status: {
    pending: "待確定",
    PENDING: "待確定",
    processing: "處理中",
    PROCESSING: "處理中",
    delivered: "已交付",
    DELIVERED: "已交付"
  }
};
const __vite_glob_1_11 = {
  purchases,
  purchase
};
const route = {
  leaves: {
    home: "休假",
    create: "新增"
  },
  users: {
    home: "用戶",
    table: "清單",
    create: "新增",
    details: "詳細"
  },
  "exchange-rates": {
    home: "匯率",
    table: "清單",
    create: "新增",
    details: "詳細"
  },
  "sales-reports": {
    home: "銷售報告",
    table: "清單",
    create: "新增",
    details: "詳細"
  },
  duty: {
    home: "更",
    table: "清單",
    create: "新增",
    details: "詳細"
  },
  goods: {
    home: "貨物",
    table: "清單",
    create: "新增",
    details: "詳細"
  },
  stocks: {
    home: "庫存",
    table: "清單",
    create: "新增",
    details: "詳細"
  },
  purchases: {
    home: "訂貨",
    table: "清單",
    create: "新增",
    details: "詳細",
    stocktakes: "盤點"
  },
  shippings: {
    home: "出貨",
    table: "清單",
    create: "新增",
    details: "詳細"
  },
  suppliers: {
    home: "供應商",
    table: "清單",
    create: "新增",
    details: "詳細"
  },
  categories: {
    home: "類別",
    table: "清單",
    create: "新增",
    details: "詳細"
  },
  warehouses: {
    home: "貨倉",
    table: "清單",
    create: "新增",
    details: "詳細"
  },
  clients: {
    home: "客戶",
    table: "清單",
    create: "新增",
    details: "詳細"
  }
};
const __vite_glob_1_12 = {
  route
};
const shippings = {
  title: "出貨"
};
const shipping = {
  invoice: "出貨單",
  cart: "出貨",
  "monthly-statement": "月結單",
  "number-of-shipments": "出貨次數",
  "total-number-of-shipments": "總出貨次數",
  "total-gross-profit": "總毛利額",
  "export-mailer-info": "信封資料",
  "export-packing": "匯出包裝",
  "export-invoice": "匯出發票",
  "export-invoice-and-hide-prices": "匯出隱藏價錢發票",
  "add-shipment-goods": "新增出貨",
  "quick-search-goods": "快速搜尋商品",
  "quick-search-and-add-goods": "快速搜尋並出貨",
  "browse-stock-table": "瀏覽庫存表",
  period: {
    months: "個月",
    years: "年"
  },
  status: {
    pending: "待確定",
    PENDING: "待確定",
    processing: "處理中",
    PROCESSING: "處理中",
    delivered: "已交付",
    DELIVERED: "已交付"
  }
};
const __vite_glob_1_13 = {
  shippings,
  shipping
};
const snackbar = {
  fail: {
    token: "無效登入認證",
    login: "登入失敗",
    update: "更新記錄失敗",
    create: "新增記錄失敗",
    "delete": "刪除記錄失敗"
  },
  success: {
    login: "成功登入",
    updated: "成功更新記錄",
    created: "成功新增記錄",
    deleted: "成功刪除記錄"
  }
};
const __vite_glob_1_14 = {
  snackbar
};
const imports = {
  en: /* @__PURE__ */ Object.assign({
    "./vue-i18n/en/alert.json": __vite_glob_0_0,
    "./vue-i18n/en/auth.json": __vite_glob_0_1,
    "./vue-i18n/en/button.json": __vite_glob_0_2,
    "./vue-i18n/en/calendar.json": __vite_glob_0_3,
    "./vue-i18n/en/common.json": __vite_glob_0_4,
    "./vue-i18n/en/country.json": __vite_glob_0_5,
    "./vue-i18n/en/currencies.json": __vite_glob_0_6,
    "./vue-i18n/en/error.json": __vite_glob_0_7,
    "./vue-i18n/en/mpf.json": __vite_glob_0_8,
    "./vue-i18n/en/permission.json": __vite_glob_0_9,
    "./vue-i18n/en/price.json": __vite_glob_0_10,
    "./vue-i18n/en/purchases.json": __vite_glob_0_11,
    "./vue-i18n/en/route.json": __vite_glob_0_12,
    "./vue-i18n/en/shippings.json": __vite_glob_0_13,
    "./vue-i18n/en/snackbar.json": __vite_glob_0_14
  }),
  tc: /* @__PURE__ */ Object.assign({
    "./vue-i18n/tc/alert.json": __vite_glob_1_0,
    "./vue-i18n/tc/auth.json": __vite_glob_1_1,
    "./vue-i18n/tc/button.json": __vite_glob_1_2,
    "./vue-i18n/tc/calendar.json": __vite_glob_1_3,
    "./vue-i18n/tc/common.json": __vite_glob_1_4,
    "./vue-i18n/tc/country.json": __vite_glob_1_5,
    "./vue-i18n/tc/currencies.json": __vite_glob_1_6,
    "./vue-i18n/tc/error.json": __vite_glob_1_7,
    "./vue-i18n/tc/mpf.json": __vite_glob_1_8,
    "./vue-i18n/tc/permission.json": __vite_glob_1_9,
    "./vue-i18n/tc/price.json": __vite_glob_1_10,
    "./vue-i18n/tc/purchases.json": __vite_glob_1_11,
    "./vue-i18n/tc/route.json": __vite_glob_1_12,
    "./vue-i18n/tc/shippings.json": __vite_glob_1_13,
    "./vue-i18n/tc/snackbar.json": __vite_glob_1_14
  })
};
const locales = Object.keys(imports);
const getLocaleMessages = () => locales.reduce(
  (messages2, locale) => ({
    ...messages2,
    // Combine messages for the current language
    [locale]: Object.values(imports[locale]).reduce(
      (message, current) => ({ ...message, ...current }),
      {}
    )
  }),
  // Starting with an empty object
  {}
);
const i18n = createI18n({
  locale: "tc",
  messages: getLocaleMessages() || []
});
const format = function(value, defaultDecimal = 2, symbol2 = true) {
  value = value * 1;
  if (isNaN(value)) {
    value = 0;
  }
  const count = numberOfDecimals(value);
  const places = count > defaultDecimal ? count : defaultDecimal;
  return (symbol2 ? " $ " : "") + value.toFixed(places).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const numberOfDecimals = function(value) {
  if (parseInt(value) === value) {
    return 0;
  } else if (isNaN(value)) {
    return false;
  }
  value = parseFloat(value);
  let count = 0;
  while (value !== Math.round(value, count)) {
    count++;
  }
  return count;
};
const iconsSet = Object.assign(
  {},
  {
    cilArrowBottom,
    cilArrowRight,
    cilArrowTop,
    cilBan,
    cilBarcode,
    cilBasket,
    cilBell,
    cilCalculator,
    cilCalendar,
    cilCalendarCheck,
    cilChartLine,
    cilChartPie,
    cilCheck,
    cilCheckAlt,
    cilCheckCircle,
    cilChevronBottom,
    cilChevronTop,
    cilCloudDownload,
    cilCode,
    cilCommentSquare,
    cilContact,
    cilContrast,
    cilCursor,
    cilDescription,
    cilDollar,
    cilDrop,
    cilEnvelopeClosed,
    cilEnvelopeOpen,
    cilEuro,
    cilFile,
    cilGlobeAlt,
    cilGrid,
    cilJustifyCenter,
    cilLaptop,
    cilLayers,
    cilLightbulb,
    cilList,
    cilLocationPin,
    cilLockLocked,
    cilMagnifyingGlass,
    cilMediaPlay,
    cilMenu,
    cilMoon,
    cilNotes,
    cilOptions,
    cilPencil,
    cilPeople,
    cilPlaylistAdd,
    cilPlus,
    cilPuzzle,
    cilReload,
    cilRoom,
    cilSend,
    cilSettings,
    cilShieldAlt,
    cilShortText,
    cilSpeech,
    cilSpeedometer,
    cilSpreadsheet,
    cilSquare,
    cilStar,
    cilStorage,
    cilSun,
    cilTask,
    cilTruck,
    cilUser,
    cilUserFemale,
    cilUserFollow,
    cilViewQuilt,
    cilX,
    cilXCircle
  },
  {
    cifBr,
    cifEs,
    cifFr,
    cifIn,
    cifPl,
    cifUs
  },
  {
    cibBehance,
    cibCcAmex,
    cibCcApplePay,
    cibCcMastercard,
    cibCcPaypal,
    cibCcStripe,
    cibCcVisa,
    cibDribbble,
    cibFacebook,
    cibFlickr,
    cibGithub,
    cibGoogle,
    cibInstagram,
    cibLinkedin,
    cibPinterest,
    cibReddit,
    cibServerFault,
    cibStackoverflow,
    cibTumblr,
    cibTwitter,
    cibVimeo,
    cibVk,
    cibXing,
    cibYahoo,
    cibYoutube
  }
);
const code = "zh_TW";
const messages = {
  _default: "{field} 的值無效",
  alpha: "{field} 須以英文組成",
  alpha_dash: "{field} 須以英數、破折號及底線組成",
  alpha_num: "{field} 須以英數組成",
  alpha_spaces: "{field} 須以英文及空格組成",
  between: "{field} 須介於 0:{min} 至 1:{max}之間",
  confirmed: " {field} 不一致",
  digits: "{field} 須為 0:{length} 位數字",
  dimensions: "{field} 圖片尺寸不正確。須為 0:{width} x 1:{height} 像素",
  email: "{field} 須為有效的電子信箱",
  not_one_of: "{field} 的選項無效",
  ext: "{field} 須為有效的檔案",
  image: "{field} 須為圖片",
  one_of: "{field} 的選項無效",
  integer: "{field} 須為整數",
  length: "{field} 的長度須為 0:{length}",
  max: "{field} 不能大於 0:{length} 個字元",
  max_value: "{field} 不得大於 0:{max}",
  mimes: "{field} 須為有效的檔案類型",
  min: "{field} 不能小於 0:{length} 個字元",
  min_value: "{field} 不得小於 0:{min}",
  numeric: "{field} 須為數字",
  regex: "{field} 的格式錯誤",
  required: "{field} 為必填",
  required_if: "{field} 為必填",
  size: "{field} 的檔案須小於 0:{size}KB",
  url: "{field} 須為有效的URL"
};
const zhTW = {
  code,
  messages
};
window._ = _;
try {
  window.$ = window.jQuery = require("jquery");
  require("bootstrap");
} catch (e) {
}
const { t: t$N } = i18n.global;
const types$1 = [
  {
    name: `${t$N("calendar.month")}`,
    value: "month"
  },
  // {
  //     name: `${t("calendar.year")}`,
  //     value: "year",
  // },
  {
    name: `${t$N("calendar.week")}`,
    value: "week"
  },
  {
    name: `${t$N("calendar.day")}`,
    value: "day"
  }
];
const { t: t$M } = i18n.global;
const codes = [
  {
    name: `${t$M("country.HK")} +852`,
    value: "852"
  },
  {
    name: `${t$M("country.TW")} +886`,
    value: "886"
  }
];
const { t: t$L } = i18n.global;
const currencies = [
  {
    name: t$L("currencies.HKD"),
    value: "HKD"
  },
  {
    name: t$L("currencies.TWD"),
    value: "TWD"
  }
];
const { t: t$K } = i18n.global;
const types = [
  {
    name: `${t$K("parttime")}`,
    value: "PARTTIME"
  },
  {
    name: `${t$K("fulltime")}`,
    value: "FULLTIME"
  }
];
const { t: t$J } = i18n.global;
const defaults = {
  item: {
    local: {
      cup: "",
      color: "",
      size: "",
      barcode: "",
      actions: [
        {
          key: v4(),
          title: t$J("button.delete"),
          color: "danger",
          type: "Delete",
          disabled: false
        }
      ]
    },
    remote: {
      updated: false,
      cup: "",
      color: "",
      size: "",
      barcode: "",
      actions: [
        {
          key: v4(),
          title: t$J("button.update"),
          color: "primary",
          type: "Update",
          disabled: false
        },
        {
          key: v4(),
          title: t$J("button.delete"),
          color: "danger",
          type: "Delete",
          disabled: false
        }
      ]
    }
  },
  content: {
    local: {
      key: "",
      value: "",
      actions: [
        {
          key: v4(),
          title: t$J("button.delete"),
          color: "danger",
          type: "Delete",
          disabled: false
        }
      ]
    },
    remote: {
      updated: false,
      key: "",
      value: "",
      actions: [
        {
          key: v4(),
          title: t$J("button.update"),
          color: "primary",
          type: "Update",
          disabled: false
        },
        {
          key: v4(),
          title: t$J("button.delete"),
          color: "danger",
          type: "Delete",
          disabled: false
        }
      ]
    }
  }
};
const sizes = [
  {
    name: "32-S"
  },
  {
    name: "34-M"
  },
  {
    name: "36-L"
  },
  {
    name: "38-XL"
  },
  {
    name: "40-Q"
  },
  {
    name: "42-EQ"
  },
  {
    name: "44-Free"
  }
];
const { t: t$I } = i18n.global;
const purchaseStatus = [
  {
    name: t$I("purchase.status.pending"),
    value: "PENDING"
  },
  {
    name: t$I("purchase.status.processing"),
    value: "PROCESSING"
  },
  {
    name: t$I("purchase.status.delivered"),
    value: "DELIVERED"
  }
];
const { t: t$H } = i18n.global;
const roles = [
  {
    name: `${t$H("admin")}`,
    value: "ADMIN"
  },
  {
    name: `${t$H("employee")}`,
    value: "EMPLOYEE"
  }
];
const { t: t$G } = i18n.global;
const shippingStatus = [
  {
    name: t$G("shipping.status.pending"),
    value: "PENDING"
  },
  {
    name: t$G("shipping.status.processing"),
    value: "PROCESSING"
  },
  {
    name: t$G("shipping.status.delivered"),
    value: "DELIVERED"
  }
];
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$i = {
  name: "AddNewShippingItemsTableDialog",
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      search: null,
      loading: false,
      items: [],
      selected: [],
      page: 1,
      pageCount: 0,
      serverItemsLength: 0,
      options: {
        page: 1,
        itemsPerPage: 25,
        sortBy: null,
        sortDesc: false
      },
      disableItemsPerPage: false,
      disablePagination: false,
      headers: [
        { title: this.$t("name"), value: "goods.name" },
        { title: this.$t("type"), value: "goods.type" },
        { title: this.$t("cup"), value: "cup" },
        { title: this.$t("color"), value: "color" },
        { title: "32-S", value: "32-S", sortable: false },
        { title: "34-M", value: "34-M", sortable: false },
        { title: "36-L", value: "36-L", sortable: false },
        { title: "38-XL", value: "38-XL", sortable: false },
        { title: "40-Q", value: "40-Q", sortable: false },
        { title: "42-EQ", value: "42-EQ", sortable: false },
        { title: "44-Free", value: "44-Free", sortable: false },
        {
          title: this.$t("total-unit"),
          value: "total_unit",
          sortable: false
        }
      ]
    };
  },
  unmounted() {
    this.search = null;
    this.selected = [];
  },
  methods: {
    open() {
      this.title = `shipping.add-shipment-goods`;
      this.dialog = true;
      this.fetch({ ...this.options });
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    fetch({ page, itemsPerPage, sortBy, search: search2 }) {
      let self = this;
      self.loading = true;
      self.options.page = page;
      self.options.itemsPerPage = itemsPerPage;
      self.options.sortBy = sortBy;
      let data = {
        page,
        per_page: itemsPerPage,
        sort_by: sortBy,
        sort_desc: null,
        search: search2
      };
      this.$store.dispatch("goods/stocks/get", data).then((response) => {
        let res = JSON.parse(JSON.stringify(response.data));
        self.items = res.data.map((x, index) => {
          return { id: index, ...x };
        });
        self.serverItemsLength = res.total;
        self.pageCount = res.last_page;
        self.page = res.current_page;
        self.selected = [];
        self.loading = false;
      }).catch((error2) => {
        self.loading = false;
      });
    },
    confirm() {
      let self = this;
      if (self.loading) {
        return;
      }
      let ids = [];
      for (const x of self.selected) {
        let found = self.items.find((y) => y.id === x);
        if (found) {
          for (const y of sizes) {
            if (found[y.name]) {
              ids = [...ids, found[y.name].goods_item_id];
            }
          }
        }
      }
      if (ids.length === 0) {
        return;
      }
      let data = {
        item_ids: ids
      };
      self.loading = true;
      this.$store.dispatch("goods/items/get", data).then((response) => {
        let res = JSON.parse(JSON.stringify(response.data));
        for (const x of res) {
          this.$store.dispatch("goods/shipping-cart/add", {
            data: { ...x, unit: 0 }
          });
        }
        self.loading = false;
        self.dialog = false;
        self.selected = [];
      }).catch((error2) => {
        self.loading = false;
      });
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
      this.clear();
    },
    clear() {
      this.item = {};
    }
  }
};
function _sfc_ssrRender$e(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CModal = resolveComponent("CModal");
  const _component_CModalHeader = resolveComponent("CModalHeader");
  const _component_CModalTitle = resolveComponent("CModalTitle");
  const _component_CModalBody = resolveComponent("CModalBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CInputGroup = resolveComponent("CInputGroup");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_CFormInput = resolveComponent("CFormInput");
  const _component_vue_barcode = resolveComponent("vue-barcode");
  const _component_CModalFooter = resolveComponent("CModalFooter");
  const _component_CBadge = resolveComponent("CBadge");
  _push(ssrRenderComponent(_component_CModal, mergeProps({
    visible: $data.dialog,
    centered: true,
    fullscreen: true,
    size: "xl",
    onClosePrevented: ($event) => console.log("close-prevented"),
    onClose: () => $data.dialog = false
  }, _attrs), {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CModalHeader, null, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CModalTitle, null, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.$t(_ctx.title))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t(_ctx.title)), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CModalTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t(_ctx.title)), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<div class="mb-4" data-v-1535d40b${_scopeId}>`);
        _push2(ssrRenderComponent(VProgressLinear, {
          active: $data.loading,
          indeterminate: "",
          color: "cyan"
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
        _push2(ssrRenderComponent(_component_CModalBody, null, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, null, {
                      default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CInputGroup, { class: "mb-3" }, {
                            default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(_component_CButton, {
                                  color: "primary",
                                  size: "sm"
                                }, {
                                  default: withCtx((_7, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(ssrRenderComponent(_component_CIcon, {
                                        name: "cil-magnifying-glass",
                                        size: "sm"
                                      }, null, _parent7, _scopeId6));
                                    } else {
                                      return [
                                        createVNode(_component_CIcon, {
                                          name: "cil-magnifying-glass",
                                          size: "sm"
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(_component_CFormInput, {
                                  size: "sm",
                                  modelValue: $data.search,
                                  "onUpdate:modelValue": ($event) => $data.search = $event
                                }, null, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(_component_CButton, {
                                    color: "primary",
                                    size: "sm"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_CIcon, {
                                        name: "cil-magnifying-glass",
                                        size: "sm"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_CFormInput, {
                                    size: "sm",
                                    modelValue: $data.search,
                                    "onUpdate:modelValue": ($event) => $data.search = $event
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CInputGroup, { class: "mb-3" }, {
                              default: withCtx(() => [
                                createVNode(_component_CButton, {
                                  color: "primary",
                                  size: "sm"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CIcon, {
                                      name: "cil-magnifying-glass",
                                      size: "sm"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CFormInput, {
                                  size: "sm",
                                  modelValue: $data.search,
                                  "onUpdate:modelValue": ($event) => $data.search = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, null, {
                        default: withCtx(() => [
                          createVNode(_component_CInputGroup, { class: "mb-3" }, {
                            default: withCtx(() => [
                              createVNode(_component_CButton, {
                                color: "primary",
                                size: "sm"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_CIcon, {
                                    name: "cil-magnifying-glass",
                                    size: "sm"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CFormInput, {
                                size: "sm",
                                modelValue: $data.search,
                                "onUpdate:modelValue": ($event) => $data.search = $event
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VDataTableServer, {
                class: "my-2 elevation-1",
                modelValue: $data.selected,
                "onUpdate:modelValue": [($event) => $data.selected = $event, ($event) => console.log($data.options.itemsPerPage)],
                headers: $data.headers,
                items: $data.items,
                "items-length": $data.serverItemsLength,
                search: $data.search,
                loading: $data.loading,
                "items-per-page": $data.options.itemsPerPage,
                "onUpdate:options": $options.fetch,
                mobile: _ctx.mobile,
                "items-per-page-options": [],
                "show-select": ""
              }, {
                loading: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VSkeletonLoader, { type: "table-row@10" }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VSkeletonLoader, { type: "table-row@10" })
                    ];
                  }
                }),
                [`item.32-S`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item["32-S"]) {
                      _push4(`<div data-v-1535d40b${_scopeId3}>`);
                      _push4(ssrRenderComponent(VTooltip, { bottom: "" }, {
                        activator: withCtx(({ props }, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span${ssrRenderAttrs(props)} data-v-1535d40b${_scopeId4}>${ssrInterpolate(item["32-S"].stock_unit)}</span>`);
                          } else {
                            return [
                              createVNode("span", props, toDisplayString(item["32-S"].stock_unit), 17)
                            ];
                          }
                        }),
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span data-v-1535d40b${_scopeId4}>`);
                            if (item["32-S"].barcode) {
                              _push5(ssrRenderComponent(_component_vue_barcode, {
                                value: item["32-S"].barcode,
                                options: { format: "CODE39", height: 32 }
                              }, null, _parent5, _scopeId4));
                            } else {
                              _push5(`<!---->`);
                            }
                            _push5(`</span>`);
                          } else {
                            return [
                              createVNode("span", null, [
                                item["32-S"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                                  key: 0,
                                  value: item["32-S"].barcode,
                                  options: { format: "CODE39", height: 32 }
                                }, null, 8, ["value"])) : createCommentVNode("", true)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                      _push4(`</div>`);
                    } else {
                      _push4(`<div data-v-1535d40b${_scopeId3}>－</div>`);
                    }
                  } else {
                    return [
                      item["32-S"] ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(VTooltip, { bottom: "" }, {
                          activator: withCtx(({ props }) => [
                            createVNode("span", props, toDisplayString(item["32-S"].stock_unit), 17)
                          ]),
                          default: withCtx(() => [
                            createVNode("span", null, [
                              item["32-S"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                                key: 0,
                                value: item["32-S"].barcode,
                                options: { format: "CODE39", height: 32 }
                              }, null, 8, ["value"])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`item.34-M`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item["34-M"]) {
                      _push4(`<div data-v-1535d40b${_scopeId3}>`);
                      _push4(ssrRenderComponent(VTooltip, { bottom: "" }, {
                        activator: withCtx(({ props }, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span${ssrRenderAttrs(props)} data-v-1535d40b${_scopeId4}>${ssrInterpolate(item["34-M"].stock_unit)}</span>`);
                          } else {
                            return [
                              createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["34-M"].stock_unit), 17)
                            ];
                          }
                        }),
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span data-v-1535d40b${_scopeId4}>`);
                            if (item["34-M"].barcode) {
                              _push5(ssrRenderComponent(_component_vue_barcode, {
                                value: item["34-M"].barcode,
                                options: { format: "CODE39", height: 32 }
                              }, null, _parent5, _scopeId4));
                            } else {
                              _push5(`<!---->`);
                            }
                            _push5(`</span>`);
                          } else {
                            return [
                              createVNode("span", null, [
                                item["34-M"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                                  key: 0,
                                  value: item["34-M"].barcode,
                                  options: { format: "CODE39", height: 32 }
                                }, null, 8, ["value"])) : createCommentVNode("", true)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                      _push4(`</div>`);
                    } else {
                      _push4(`<div data-v-1535d40b${_scopeId3}>－</div>`);
                    }
                  } else {
                    return [
                      item["34-M"] ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(VTooltip, { bottom: "" }, {
                          activator: withCtx(({ props }) => [
                            createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["34-M"].stock_unit), 17)
                          ]),
                          default: withCtx(() => [
                            createVNode("span", null, [
                              item["34-M"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                                key: 0,
                                value: item["34-M"].barcode,
                                options: { format: "CODE39", height: 32 }
                              }, null, 8, ["value"])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`item.36-L`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item["36-L"]) {
                      _push4(`<div data-v-1535d40b${_scopeId3}>`);
                      _push4(ssrRenderComponent(VTooltip, { bottom: "" }, {
                        activator: withCtx(({ props }, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span${ssrRenderAttrs(props)} data-v-1535d40b${_scopeId4}>${ssrInterpolate(item["36-L"].stock_unit)}</span>`);
                          } else {
                            return [
                              createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["36-L"].stock_unit), 17)
                            ];
                          }
                        }),
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span data-v-1535d40b${_scopeId4}>`);
                            if (item["36-L"].barcode) {
                              _push5(ssrRenderComponent(_component_vue_barcode, {
                                value: item["36-L"].barcode,
                                options: { format: "CODE39", height: 32 }
                              }, null, _parent5, _scopeId4));
                            } else {
                              _push5(`<!---->`);
                            }
                            _push5(`</span>`);
                          } else {
                            return [
                              createVNode("span", null, [
                                item["36-L"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                                  key: 0,
                                  value: item["36-L"].barcode,
                                  options: { format: "CODE39", height: 32 }
                                }, null, 8, ["value"])) : createCommentVNode("", true)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                      _push4(`</div>`);
                    } else {
                      _push4(`<div data-v-1535d40b${_scopeId3}>－</div>`);
                    }
                  } else {
                    return [
                      item["36-L"] ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(VTooltip, { bottom: "" }, {
                          activator: withCtx(({ props }) => [
                            createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["36-L"].stock_unit), 17)
                          ]),
                          default: withCtx(() => [
                            createVNode("span", null, [
                              item["36-L"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                                key: 0,
                                value: item["36-L"].barcode,
                                options: { format: "CODE39", height: 32 }
                              }, null, 8, ["value"])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`item.38-XL`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item["38-XL"]) {
                      _push4(`<div data-v-1535d40b${_scopeId3}>`);
                      _push4(ssrRenderComponent(VTooltip, { bottom: "" }, {
                        activator: withCtx(({ props }, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span${ssrRenderAttrs(props)} data-v-1535d40b${_scopeId4}>${ssrInterpolate(item["38-XL"].stock_unit)}</span>`);
                          } else {
                            return [
                              createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["38-XL"].stock_unit), 17)
                            ];
                          }
                        }),
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span data-v-1535d40b${_scopeId4}>`);
                            if (item["38-XL"].barcode) {
                              _push5(ssrRenderComponent(_component_vue_barcode, {
                                value: item["38-XL"].barcode,
                                options: { format: "CODE39", height: 32 }
                              }, null, _parent5, _scopeId4));
                            } else {
                              _push5(`<!---->`);
                            }
                            _push5(`</span>`);
                          } else {
                            return [
                              createVNode("span", null, [
                                item["38-XL"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                                  key: 0,
                                  value: item["38-XL"].barcode,
                                  options: { format: "CODE39", height: 32 }
                                }, null, 8, ["value"])) : createCommentVNode("", true)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                      _push4(`</div>`);
                    } else {
                      _push4(`<div data-v-1535d40b${_scopeId3}>－</div>`);
                    }
                  } else {
                    return [
                      item["38-XL"] ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(VTooltip, { bottom: "" }, {
                          activator: withCtx(({ props }) => [
                            createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["38-XL"].stock_unit), 17)
                          ]),
                          default: withCtx(() => [
                            createVNode("span", null, [
                              item["38-XL"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                                key: 0,
                                value: item["38-XL"].barcode,
                                options: { format: "CODE39", height: 32 }
                              }, null, 8, ["value"])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`item.40-Q`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item["40-Q"]) {
                      _push4(`<div data-v-1535d40b${_scopeId3}>`);
                      _push4(ssrRenderComponent(VTooltip, { bottom: "" }, {
                        activator: withCtx(({ props }, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span${ssrRenderAttrs(props)} data-v-1535d40b${_scopeId4}>${ssrInterpolate(item["40-Q"].stock_unit)}</span>`);
                          } else {
                            return [
                              createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["40-Q"].stock_unit), 17)
                            ];
                          }
                        }),
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span data-v-1535d40b${_scopeId4}>`);
                            if (item["40-Q"].barcode) {
                              _push5(ssrRenderComponent(_component_vue_barcode, {
                                value: item["40-Q"].barcode,
                                options: { format: "CODE39", height: 32 }
                              }, null, _parent5, _scopeId4));
                            } else {
                              _push5(`<!---->`);
                            }
                            _push5(`</span>`);
                          } else {
                            return [
                              createVNode("span", null, [
                                item["40-Q"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                                  key: 0,
                                  value: item["40-Q"].barcode,
                                  options: { format: "CODE39", height: 32 }
                                }, null, 8, ["value"])) : createCommentVNode("", true)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                      _push4(`</div>`);
                    } else {
                      _push4(`<div data-v-1535d40b${_scopeId3}>－</div>`);
                    }
                  } else {
                    return [
                      item["40-Q"] ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(VTooltip, { bottom: "" }, {
                          activator: withCtx(({ props }) => [
                            createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["40-Q"].stock_unit), 17)
                          ]),
                          default: withCtx(() => [
                            createVNode("span", null, [
                              item["40-Q"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                                key: 0,
                                value: item["40-Q"].barcode,
                                options: { format: "CODE39", height: 32 }
                              }, null, 8, ["value"])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`item.42-EQ`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item["42-EQ"]) {
                      _push4(`<div data-v-1535d40b${_scopeId3}>`);
                      _push4(ssrRenderComponent(VTooltip, { bottom: "" }, {
                        activator: withCtx(({ props }, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span${ssrRenderAttrs(props)} data-v-1535d40b${_scopeId4}>${ssrInterpolate(item["42-EQ"].stock_unit)}</span>`);
                          } else {
                            return [
                              createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["42-EQ"].stock_unit), 17)
                            ];
                          }
                        }),
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span data-v-1535d40b${_scopeId4}>`);
                            if (item["42-EQ"].barcode) {
                              _push5(ssrRenderComponent(_component_vue_barcode, {
                                value: item["42-EQ"].barcode,
                                options: { format: "CODE39", height: 32 }
                              }, null, _parent5, _scopeId4));
                            } else {
                              _push5(`<!---->`);
                            }
                            _push5(`</span>`);
                          } else {
                            return [
                              createVNode("span", null, [
                                item["42-EQ"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                                  key: 0,
                                  value: item["42-EQ"].barcode,
                                  options: { format: "CODE39", height: 32 }
                                }, null, 8, ["value"])) : createCommentVNode("", true)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                      _push4(`</div>`);
                    } else {
                      _push4(`<div data-v-1535d40b${_scopeId3}>－</div>`);
                    }
                  } else {
                    return [
                      item["42-EQ"] ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(VTooltip, { bottom: "" }, {
                          activator: withCtx(({ props }) => [
                            createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["42-EQ"].stock_unit), 17)
                          ]),
                          default: withCtx(() => [
                            createVNode("span", null, [
                              item["42-EQ"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                                key: 0,
                                value: item["42-EQ"].barcode,
                                options: { format: "CODE39", height: 32 }
                              }, null, 8, ["value"])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                    ];
                  }
                }),
                [`item.44-Free`]: withCtx(({ item }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if (item["44-Free"]) {
                      _push4(`<div data-v-1535d40b${_scopeId3}>`);
                      _push4(ssrRenderComponent(VTooltip, { bottom: "" }, {
                        activator: withCtx(({ props }, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span${ssrRenderAttrs(props)} data-v-1535d40b${_scopeId4}>${ssrInterpolate(item["44-Free"].stock_unit)}</span>`);
                          } else {
                            return [
                              createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["44-Free"].stock_unit), 17)
                            ];
                          }
                        }),
                        default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<span data-v-1535d40b${_scopeId4}>`);
                            if (item["44-Free"].barcode) {
                              _push5(ssrRenderComponent(_component_vue_barcode, {
                                value: item["44-Free"].barcode,
                                options: { format: "CODE39", height: 32 }
                              }, null, _parent5, _scopeId4));
                            } else {
                              _push5(`<!---->`);
                            }
                            _push5(`</span>`);
                          } else {
                            return [
                              createVNode("span", null, [
                                item["44-Free"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                                  key: 0,
                                  value: item["44-Free"].barcode,
                                  options: { format: "CODE39", height: 32 }
                                }, null, 8, ["value"])) : createCommentVNode("", true)
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                      _push4(`</div>`);
                    } else {
                      _push4(`<div data-v-1535d40b${_scopeId3}>－</div>`);
                    }
                  } else {
                    return [
                      item["44-Free"] ? (openBlock(), createBlock("div", { key: 0 }, [
                        createVNode(VTooltip, { bottom: "" }, {
                          activator: withCtx(({ props }) => [
                            createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["44-Free"].stock_unit), 17)
                          ]),
                          default: withCtx(() => [
                            createVNode("span", null, [
                              item["44-Free"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                                key: 0,
                                value: item["44-Free"].barcode,
                                options: { format: "CODE39", height: 32 }
                              }, null, 8, ["value"])) : createCommentVNode("", true)
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                    ];
                  }
                }),
                _: 2
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CRow, { class: "p-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, null, {
                      default: withCtx(() => [
                        createVNode(_component_CInputGroup, { class: "mb-3" }, {
                          default: withCtx(() => [
                            createVNode(_component_CButton, {
                              color: "primary",
                              size: "sm"
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_CIcon, {
                                  name: "cil-magnifying-glass",
                                  size: "sm"
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_CFormInput, {
                              size: "sm",
                              modelValue: $data.search,
                              "onUpdate:modelValue": ($event) => $data.search = $event
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(VDataTableServer, {
                  class: "my-2 elevation-1",
                  modelValue: $data.selected,
                  "onUpdate:modelValue": [($event) => $data.selected = $event, ($event) => console.log($data.options.itemsPerPage)],
                  headers: $data.headers,
                  items: $data.items,
                  "items-length": $data.serverItemsLength,
                  search: $data.search,
                  loading: $data.loading,
                  "items-per-page": $data.options.itemsPerPage,
                  "onUpdate:options": $options.fetch,
                  mobile: _ctx.mobile,
                  "items-per-page-options": [],
                  "show-select": ""
                }, {
                  loading: withCtx(() => [
                    createVNode(VSkeletonLoader, { type: "table-row@10" })
                  ]),
                  [`item.32-S`]: withCtx(({ item }) => [
                    item["32-S"] ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode(VTooltip, { bottom: "" }, {
                        activator: withCtx(({ props }) => [
                          createVNode("span", props, toDisplayString(item["32-S"].stock_unit), 17)
                        ]),
                        default: withCtx(() => [
                          createVNode("span", null, [
                            item["32-S"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                              key: 0,
                              value: item["32-S"].barcode,
                              options: { format: "CODE39", height: 32 }
                            }, null, 8, ["value"])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                  ]),
                  [`item.34-M`]: withCtx(({ item }) => [
                    item["34-M"] ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode(VTooltip, { bottom: "" }, {
                        activator: withCtx(({ props }) => [
                          createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["34-M"].stock_unit), 17)
                        ]),
                        default: withCtx(() => [
                          createVNode("span", null, [
                            item["34-M"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                              key: 0,
                              value: item["34-M"].barcode,
                              options: { format: "CODE39", height: 32 }
                            }, null, 8, ["value"])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                  ]),
                  [`item.36-L`]: withCtx(({ item }) => [
                    item["36-L"] ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode(VTooltip, { bottom: "" }, {
                        activator: withCtx(({ props }) => [
                          createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["36-L"].stock_unit), 17)
                        ]),
                        default: withCtx(() => [
                          createVNode("span", null, [
                            item["36-L"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                              key: 0,
                              value: item["36-L"].barcode,
                              options: { format: "CODE39", height: 32 }
                            }, null, 8, ["value"])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                  ]),
                  [`item.38-XL`]: withCtx(({ item }) => [
                    item["38-XL"] ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode(VTooltip, { bottom: "" }, {
                        activator: withCtx(({ props }) => [
                          createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["38-XL"].stock_unit), 17)
                        ]),
                        default: withCtx(() => [
                          createVNode("span", null, [
                            item["38-XL"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                              key: 0,
                              value: item["38-XL"].barcode,
                              options: { format: "CODE39", height: 32 }
                            }, null, 8, ["value"])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                  ]),
                  [`item.40-Q`]: withCtx(({ item }) => [
                    item["40-Q"] ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode(VTooltip, { bottom: "" }, {
                        activator: withCtx(({ props }) => [
                          createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["40-Q"].stock_unit), 17)
                        ]),
                        default: withCtx(() => [
                          createVNode("span", null, [
                            item["40-Q"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                              key: 0,
                              value: item["40-Q"].barcode,
                              options: { format: "CODE39", height: 32 }
                            }, null, 8, ["value"])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                  ]),
                  [`item.42-EQ`]: withCtx(({ item }) => [
                    item["42-EQ"] ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode(VTooltip, { bottom: "" }, {
                        activator: withCtx(({ props }) => [
                          createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["42-EQ"].stock_unit), 17)
                        ]),
                        default: withCtx(() => [
                          createVNode("span", null, [
                            item["42-EQ"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                              key: 0,
                              value: item["42-EQ"].barcode,
                              options: { format: "CODE39", height: 32 }
                            }, null, 8, ["value"])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                  ]),
                  [`item.44-Free`]: withCtx(({ item }) => [
                    item["44-Free"] ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode(VTooltip, { bottom: "" }, {
                        activator: withCtx(({ props }) => [
                          createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["44-Free"].stock_unit), 17)
                        ]),
                        default: withCtx(() => [
                          createVNode("span", null, [
                            item["44-Free"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                              key: 0,
                              value: item["44-Free"].barcode,
                              options: { format: "CODE39", height: 32 }
                            }, null, 8, ["value"])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                  ]),
                  _: 2
                }, 1032, ["modelValue", "onUpdate:modelValue", "headers", "items", "items-length", "search", "loading", "items-per-page", "onUpdate:options", "mobile"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CModalFooter, null, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.confirm,
                color: "primary",
                class: "position-relative px-4",
                disabled: $data.selected.length === 0
              }, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.$t("button.confirm"))} `);
                    if ($data.selected.length > 0) {
                      _push4(ssrRenderComponent(_component_CBadge, {
                        color: "warning",
                        shape: "rounded-pill"
                      }, {
                        default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`${ssrInterpolate($data.selected.length)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString($data.selected.length), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      _push4(`<!---->`);
                    }
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("button.confirm")) + " ", 1),
                      $data.selected.length > 0 ? (openBlock(), createBlock(_component_CBadge, {
                        key: 0,
                        color: "warning",
                        shape: "rounded-pill"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString($data.selected.length), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.cancel,
                color: "secondary",
                class: "px-4 ml-2"
              }, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.$t("button.cancel"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CButton, {
                  onClick: $options.confirm,
                  color: "primary",
                  class: "position-relative px-4",
                  disabled: $data.selected.length === 0
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("button.confirm")) + " ", 1),
                    $data.selected.length > 0 ? (openBlock(), createBlock(_component_CBadge, {
                      key: 0,
                      color: "warning",
                      shape: "rounded-pill"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString($data.selected.length), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["onClick", "disabled"]),
                createVNode(_component_CButton, {
                  onClick: $options.cancel,
                  color: "secondary",
                  class: "px-4 ml-2"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CModalHeader, null, {
            default: withCtx(() => [
              createVNode(_component_CModalTitle, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t(_ctx.title)), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode("div", { class: "mb-4" }, [
            createVNode(VProgressLinear, {
              active: $data.loading,
              indeterminate: "",
              color: "cyan"
            }, null, 8, ["active"])
          ]),
          createVNode(_component_CModalBody, null, {
            default: withCtx(() => [
              createVNode(_component_CRow, { class: "p-2" }, {
                default: withCtx(() => [
                  createVNode(_component_CCol, null, {
                    default: withCtx(() => [
                      createVNode(_component_CInputGroup, { class: "mb-3" }, {
                        default: withCtx(() => [
                          createVNode(_component_CButton, {
                            color: "primary",
                            size: "sm"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CIcon, {
                                name: "cil-magnifying-glass",
                                size: "sm"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_CFormInput, {
                            size: "sm",
                            modelValue: $data.search,
                            "onUpdate:modelValue": ($event) => $data.search = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VDataTableServer, {
                class: "my-2 elevation-1",
                modelValue: $data.selected,
                "onUpdate:modelValue": [($event) => $data.selected = $event, ($event) => console.log($data.options.itemsPerPage)],
                headers: $data.headers,
                items: $data.items,
                "items-length": $data.serverItemsLength,
                search: $data.search,
                loading: $data.loading,
                "items-per-page": $data.options.itemsPerPage,
                "onUpdate:options": $options.fetch,
                mobile: _ctx.mobile,
                "items-per-page-options": [],
                "show-select": ""
              }, {
                loading: withCtx(() => [
                  createVNode(VSkeletonLoader, { type: "table-row@10" })
                ]),
                [`item.32-S`]: withCtx(({ item }) => [
                  item["32-S"] ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(VTooltip, { bottom: "" }, {
                      activator: withCtx(({ props }) => [
                        createVNode("span", props, toDisplayString(item["32-S"].stock_unit), 17)
                      ]),
                      default: withCtx(() => [
                        createVNode("span", null, [
                          item["32-S"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                            key: 0,
                            value: item["32-S"].barcode,
                            options: { format: "CODE39", height: 32 }
                          }, null, 8, ["value"])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                ]),
                [`item.34-M`]: withCtx(({ item }) => [
                  item["34-M"] ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(VTooltip, { bottom: "" }, {
                      activator: withCtx(({ props }) => [
                        createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["34-M"].stock_unit), 17)
                      ]),
                      default: withCtx(() => [
                        createVNode("span", null, [
                          item["34-M"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                            key: 0,
                            value: item["34-M"].barcode,
                            options: { format: "CODE39", height: 32 }
                          }, null, 8, ["value"])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                ]),
                [`item.36-L`]: withCtx(({ item }) => [
                  item["36-L"] ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(VTooltip, { bottom: "" }, {
                      activator: withCtx(({ props }) => [
                        createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["36-L"].stock_unit), 17)
                      ]),
                      default: withCtx(() => [
                        createVNode("span", null, [
                          item["36-L"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                            key: 0,
                            value: item["36-L"].barcode,
                            options: { format: "CODE39", height: 32 }
                          }, null, 8, ["value"])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                ]),
                [`item.38-XL`]: withCtx(({ item }) => [
                  item["38-XL"] ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(VTooltip, { bottom: "" }, {
                      activator: withCtx(({ props }) => [
                        createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["38-XL"].stock_unit), 17)
                      ]),
                      default: withCtx(() => [
                        createVNode("span", null, [
                          item["38-XL"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                            key: 0,
                            value: item["38-XL"].barcode,
                            options: { format: "CODE39", height: 32 }
                          }, null, 8, ["value"])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                ]),
                [`item.40-Q`]: withCtx(({ item }) => [
                  item["40-Q"] ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(VTooltip, { bottom: "" }, {
                      activator: withCtx(({ props }) => [
                        createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["40-Q"].stock_unit), 17)
                      ]),
                      default: withCtx(() => [
                        createVNode("span", null, [
                          item["40-Q"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                            key: 0,
                            value: item["40-Q"].barcode,
                            options: { format: "CODE39", height: 32 }
                          }, null, 8, ["value"])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                ]),
                [`item.42-EQ`]: withCtx(({ item }) => [
                  item["42-EQ"] ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(VTooltip, { bottom: "" }, {
                      activator: withCtx(({ props }) => [
                        createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["42-EQ"].stock_unit), 17)
                      ]),
                      default: withCtx(() => [
                        createVNode("span", null, [
                          item["42-EQ"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                            key: 0,
                            value: item["42-EQ"].barcode,
                            options: { format: "CODE39", height: 32 }
                          }, null, 8, ["value"])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                ]),
                [`item.44-Free`]: withCtx(({ item }) => [
                  item["44-Free"] ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode(VTooltip, { bottom: "" }, {
                      activator: withCtx(({ props }) => [
                        createVNode("span", mergeProps(props, toHandlers(_ctx.on, true)), toDisplayString(item["44-Free"].stock_unit), 17)
                      ]),
                      default: withCtx(() => [
                        createVNode("span", null, [
                          item["44-Free"].barcode ? (openBlock(), createBlock(_component_vue_barcode, {
                            key: 0,
                            value: item["44-Free"].barcode,
                            options: { format: "CODE39", height: 32 }
                          }, null, 8, ["value"])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 2
                    }, 1024)
                  ])) : (openBlock(), createBlock("div", { key: 1 }, "－"))
                ]),
                _: 2
              }, 1032, ["modelValue", "onUpdate:modelValue", "headers", "items", "items-length", "search", "loading", "items-per-page", "onUpdate:options", "mobile"])
            ]),
            _: 1
          }),
          createVNode(_component_CModalFooter, null, {
            default: withCtx(() => [
              createVNode(_component_CButton, {
                onClick: $options.confirm,
                color: "primary",
                class: "position-relative px-4",
                disabled: $data.selected.length === 0
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("button.confirm")) + " ", 1),
                  $data.selected.length > 0 ? (openBlock(), createBlock(_component_CBadge, {
                    key: 0,
                    color: "warning",
                    shape: "rounded-pill"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString($data.selected.length), 1)
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["onClick", "disabled"]),
              createVNode(_component_CButton, {
                onClick: $options.cancel,
                color: "secondary",
                class: "px-4 ml-2"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$i = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/AddNewShippingItemsTableDialog.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const AddNewShippingItemsTableDialog = /* @__PURE__ */ _export_sfc(_sfc_main$i, [["ssrRender", _sfc_ssrRender$e], ["__scopeId", "data-v-1535d40b"]]);
const _sfc_main$h = {
  name: "CreateShippingDialog",
  computed: {
    ...mapState(["goods/shippingg-cart"]),
    shippingItems() {
      return this["goods/shipping-cart"].items;
    }
  },
  data() {
    return {
      item: {},
      items: [],
      empty: 0,
      dialog: false,
      resolve: null,
      reject: null,
      title: null,
      errors: {},
      loading: false,
      goodsSizes: sizes
    };
  },
  methods: {
    fetch() {
      let self = this;
      if (self.loading) {
        return;
      }
      var ids = [];
      sizes.forEach((size2) => {
        if (self.item[size2.name]) {
          ids = [...ids, self.item[size2.name].goods_item_id];
        }
      });
      if (ids.length === 0) {
        return;
      }
      let data = {
        item_ids: ids
      };
      self.loading = true;
      this.$store.dispatch("goods/items/get", data).then((response) => {
        let res = JSON.parse(JSON.stringify(response.data));
        self.items = res;
        self.loading = false;
      }).catch((error2) => {
        self.loading = false;
      });
    },
    open(item) {
      this.title = `${this.$t("shippings.title")}－${item.goods.name}－${item.color}`;
      this.dialog = true;
      let data = this.shippingItems;
      let subData = sizes;
      for (const x of data) {
        for (const y of subData) {
          if (item[y.name] && x.id === item[y.name].goods_item_id) {
            item[y.name].unit = x.unit;
          }
        }
      }
      this.item = item;
      this.fetch();
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    confirm() {
      let xData = sizes;
      let yData = this.items;
      let iData = this.item;
      for (const x of xData) {
        if (iData[x.name] && iData[x.name].unit > 0) {
          let i = iData[x.name];
          for (const y of yData) {
            if (y.id && y.id === i.goods_item_id) {
              this.$store.dispatch("goods/shipping-cart/add", {
                data: { ...y, unit: i.unit }
              });
            }
          }
        }
      }
      this.resolve(true);
      this.dialog = false;
      this.clear();
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
      this.clear();
    },
    clear() {
      this.item = {};
      this.items = [];
    }
  }
};
function _sfc_ssrRender$d(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CModal = resolveComponent("CModal");
  const _component_CModalHeader = resolveComponent("CModalHeader");
  const _component_CModalTitle = resolveComponent("CModalTitle");
  const _component_CModalBody = resolveComponent("CModalBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_v_number_input = resolveComponent("v-number-input");
  const _component_CModalFooter = resolveComponent("CModalFooter");
  const _component_CButton = resolveComponent("CButton");
  _push(ssrRenderComponent(_component_CModal, mergeProps({
    visible: $data.dialog,
    centered: true,
    onClose: () => $data.dialog = false
  }, _attrs), {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CModalHeader, null, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CModalTitle, null, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate($data.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString($data.title), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CModalTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString($data.title), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`<div class="mb-4"${_scopeId}>`);
        _push2(ssrRenderComponent(VProgressLinear, {
          active: $data.loading,
          indeterminate: "",
          color: "cyan"
        }, null, _parent2, _scopeId));
        _push2(`</div>`);
        _push2(ssrRenderComponent(_component_CModalBody, null, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              ssrRenderList($data.goodsSizes, (size2) => {
                _push3(`<div${_scopeId2}>`);
                _push3(ssrRenderComponent(_component_CRow, null, {
                  default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_CCol, null, {
                        default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<div class="d-flex justify-content-center"${_scopeId4}>${ssrInterpolate(size2.name)}</div>`);
                          } else {
                            return [
                              createVNode("div", { class: "d-flex justify-content-center" }, toDisplayString(size2.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_CCol, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex justify-content-center" }, toDisplayString(size2.name), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
                _push3(ssrRenderComponent(_component_CRow, null, {
                  default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_CCol, null, {
                        default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<div class="d-flex justify-content-center"${_scopeId4}>`);
                            if ($data.item && $data.item[size2.name]) {
                              _push5(`<div${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_v_number_input, {
                                size: "small",
                                modelValue: $data.item[size2.name].unit,
                                "onUpdate:modelValue": ($event) => $data.item[size2.name].unit = $event,
                                min: 0,
                                max: $data.item[size2.name] ? $data.item[size2.name].stock_unit : 0,
                                inline: "",
                                center: "",
                                controls: "",
                                "control-variant": "split"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              _push5(`<div${_scopeId4}>`);
                              _push5(ssrRenderComponent(_component_v_number_input, {
                                size: "small",
                                modelValue: $data.empty,
                                "onUpdate:modelValue": ($event) => $data.empty = $event,
                                min: 0,
                                max: 0,
                                inline: "",
                                center: "",
                                controls: "",
                                "control-variant": "split"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div>`);
                            }
                            _push5(`</div>`);
                          } else {
                            return [
                              createVNode("div", { class: "d-flex justify-content-center" }, [
                                $data.item && $data.item[size2.name] ? (openBlock(), createBlock("div", { key: 0 }, [
                                  createVNode(_component_v_number_input, {
                                    size: "small",
                                    modelValue: $data.item[size2.name].unit,
                                    "onUpdate:modelValue": ($event) => $data.item[size2.name].unit = $event,
                                    min: 0,
                                    max: $data.item[size2.name] ? $data.item[size2.name].stock_unit : 0,
                                    inline: "",
                                    center: "",
                                    controls: "",
                                    "control-variant": "split"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                                ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                  createVNode(_component_v_number_input, {
                                    size: "small",
                                    modelValue: $data.empty,
                                    "onUpdate:modelValue": ($event) => $data.empty = $event,
                                    min: 0,
                                    max: 0,
                                    inline: "",
                                    center: "",
                                    controls: "",
                                    "control-variant": "split"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]))
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_CCol, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex justify-content-center" }, [
                              $data.item && $data.item[size2.name] ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode(_component_v_number_input, {
                                  size: "small",
                                  modelValue: $data.item[size2.name].unit,
                                  "onUpdate:modelValue": ($event) => $data.item[size2.name].unit = $event,
                                  min: 0,
                                  max: $data.item[size2.name] ? $data.item[size2.name].stock_unit : 0,
                                  inline: "",
                                  center: "",
                                  controls: "",
                                  "control-variant": "split"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode(_component_v_number_input, {
                                  size: "small",
                                  modelValue: $data.empty,
                                  "onUpdate:modelValue": ($event) => $data.empty = $event,
                                  min: 0,
                                  max: 0,
                                  inline: "",
                                  center: "",
                                  controls: "",
                                  "control-variant": "split"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]))
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
                _push3(`</div>`);
              });
              _push3(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList($data.goodsSizes, (size2) => {
                  return openBlock(), createBlock("div", {
                    key: size2.name
                  }, [
                    createVNode(_component_CRow, null, {
                      default: withCtx(() => [
                        createVNode(_component_CCol, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex justify-content-center" }, toDisplayString(size2.name), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024),
                    createVNode(_component_CRow, null, {
                      default: withCtx(() => [
                        createVNode(_component_CCol, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "d-flex justify-content-center" }, [
                              $data.item && $data.item[size2.name] ? (openBlock(), createBlock("div", { key: 0 }, [
                                createVNode(_component_v_number_input, {
                                  size: "small",
                                  modelValue: $data.item[size2.name].unit,
                                  "onUpdate:modelValue": ($event) => $data.item[size2.name].unit = $event,
                                  min: 0,
                                  max: $data.item[size2.name] ? $data.item[size2.name].stock_unit : 0,
                                  inline: "",
                                  center: "",
                                  controls: "",
                                  "control-variant": "split"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                              ])) : (openBlock(), createBlock("div", { key: 1 }, [
                                createVNode(_component_v_number_input, {
                                  size: "small",
                                  modelValue: $data.empty,
                                  "onUpdate:modelValue": ($event) => $data.empty = $event,
                                  min: 0,
                                  max: 0,
                                  inline: "",
                                  center: "",
                                  controls: "",
                                  "control-variant": "split"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]))
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CModalFooter, null, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.confirm,
                color: "danger",
                class: "px-4"
              }, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.$t("button.confirm"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("button.confirm")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.cancel,
                color: "secondary",
                class: "px-4 ml-2"
              }, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.$t("button.cancel"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CButton, {
                  onClick: $options.confirm,
                  color: "danger",
                  class: "px-4"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("button.confirm")), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode(_component_CButton, {
                  onClick: $options.cancel,
                  color: "secondary",
                  class: "px-4 ml-2"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CModalHeader, null, {
            default: withCtx(() => [
              createVNode(_component_CModalTitle, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString($data.title), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode("div", { class: "mb-4" }, [
            createVNode(VProgressLinear, {
              active: $data.loading,
              indeterminate: "",
              color: "cyan"
            }, null, 8, ["active"])
          ]),
          createVNode(_component_CModalBody, null, {
            default: withCtx(() => [
              (openBlock(true), createBlock(Fragment, null, renderList($data.goodsSizes, (size2) => {
                return openBlock(), createBlock("div", {
                  key: size2.name
                }, [
                  createVNode(_component_CRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "d-flex justify-content-center" }, toDisplayString(size2.name), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(_component_CRow, null, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "d-flex justify-content-center" }, [
                            $data.item && $data.item[size2.name] ? (openBlock(), createBlock("div", { key: 0 }, [
                              createVNode(_component_v_number_input, {
                                size: "small",
                                modelValue: $data.item[size2.name].unit,
                                "onUpdate:modelValue": ($event) => $data.item[size2.name].unit = $event,
                                min: 0,
                                max: $data.item[size2.name] ? $data.item[size2.name].stock_unit : 0,
                                inline: "",
                                center: "",
                                controls: "",
                                "control-variant": "split"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                            ])) : (openBlock(), createBlock("div", { key: 1 }, [
                              createVNode(_component_v_number_input, {
                                size: "small",
                                modelValue: $data.empty,
                                "onUpdate:modelValue": ($event) => $data.empty = $event,
                                min: 0,
                                max: 0,
                                inline: "",
                                center: "",
                                controls: "",
                                "control-variant": "split"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]))
                          ])
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ]);
              }), 128))
            ]),
            _: 1
          }),
          createVNode(_component_CModalFooter, null, {
            default: withCtx(() => [
              createVNode(_component_CButton, {
                onClick: $options.confirm,
                color: "danger",
                class: "px-4"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("button.confirm")), 1)
                ]),
                _: 1
              }, 8, ["onClick"]),
              createVNode(_component_CButton, {
                onClick: $options.cancel,
                color: "secondary",
                class: "px-4 ml-2"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$h = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/CreateShippingDialog.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const CreateShippingDialog = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["ssrRender", _sfc_ssrRender$d]]);
const _sfc_main$g = {
  name: "Dialog",
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      message: null,
      title: null,
      options: {
        color: "grey lighten-3",
        width: 400,
        zIndex: 200,
        noconfirm: false
      }
    };
  },
  methods: {
    open(title, message, options) {
      this.dialog = true;
      this.title = title;
      this.message = message;
      this.options = Object.assign(this.options, options);
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    confirm() {
      this.resolve(true);
      this.dialog = false;
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
    }
  }
};
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CButton = resolveComponent("CButton");
  _push(ssrRenderComponent(VDialog, mergeProps({
    modelValue: $data.dialog,
    "onUpdate:modelValue": ($event) => $data.dialog = $event,
    "max-width": $data.options.width,
    style: `z-index:${$data.options.zIndex};`,
    onKeydown: $options.cancel
  }, _attrs), {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCard, null, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VToolbar, {
                dark: "",
                color: $data.options.color,
                dense: "",
                flat: ""
              }, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VToolbarTitle, { class: "text-body-2 font-weight-bold grey--text" }, {
                      default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`${ssrInterpolate($data.title)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString($data.title), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VToolbarTitle, { class: "text-body-2 font-weight-bold grey--text" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString($data.title), 1)
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardText, {
                style: !!$data.message ? null : { display: "none" },
                class: "pa-4 black--text"
              }, null, _parent3, _scopeId2));
              _push3(ssrRenderComponent(VCardActions, { class: "pt-3" }, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CButton, {
                      onClick: $options.confirm,
                      color: "danger",
                      class: "px-4"
                    }, {
                      default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`${ssrInterpolate(_ctx.$t("button.confirm"))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(_ctx.$t("button.confirm")), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    if (!$data.options.noconfirm) {
                      _push4(ssrRenderComponent(_component_CButton, {
                        onClick: $options.cancel,
                        color: "secondary",
                        class: "px-4 ml-2"
                      }, {
                        default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`${ssrInterpolate(_ctx.$t("button.cancel"))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      _push4(`<!---->`);
                    }
                  } else {
                    return [
                      createVNode(VSpacer),
                      createVNode(_component_CButton, {
                        onClick: $options.confirm,
                        color: "danger",
                        class: "px-4"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("button.confirm")), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      !$data.options.noconfirm ? (openBlock(), createBlock(_component_CButton, {
                        key: 0,
                        onClick: $options.cancel,
                        color: "secondary",
                        class: "px-4 ml-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VToolbar, {
                  dark: "",
                  color: $data.options.color,
                  dense: "",
                  flat: ""
                }, {
                  default: withCtx(() => [
                    createVNode(VToolbarTitle, { class: "text-body-2 font-weight-bold grey--text" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString($data.title), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["color"]),
                withDirectives(createVNode(VCardText, {
                  class: "pa-4 black--text",
                  innerHTML: $data.message
                }, null, 8, ["innerHTML"]), [
                  [vShow, !!$data.message]
                ]),
                createVNode(VCardActions, { class: "pt-3" }, {
                  default: withCtx(() => [
                    createVNode(VSpacer),
                    createVNode(_component_CButton, {
                      onClick: $options.confirm,
                      color: "danger",
                      class: "px-4"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("button.confirm")), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    !$data.options.noconfirm ? (openBlock(), createBlock(_component_CButton, {
                      key: 0,
                      onClick: $options.cancel,
                      color: "secondary",
                      class: "px-4 ml-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"])) : createCommentVNode("", true)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VCard, null, {
            default: withCtx(() => [
              createVNode(VToolbar, {
                dark: "",
                color: $data.options.color,
                dense: "",
                flat: ""
              }, {
                default: withCtx(() => [
                  createVNode(VToolbarTitle, { class: "text-body-2 font-weight-bold grey--text" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString($data.title), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["color"]),
              withDirectives(createVNode(VCardText, {
                class: "pa-4 black--text",
                innerHTML: $data.message
              }, null, 8, ["innerHTML"]), [
                [vShow, !!$data.message]
              ]),
              createVNode(VCardActions, { class: "pt-3" }, {
                default: withCtx(() => [
                  createVNode(VSpacer),
                  createVNode(_component_CButton, {
                    onClick: $options.confirm,
                    color: "danger",
                    class: "px-4"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("button.confirm")), 1)
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  !$data.options.noconfirm ? (openBlock(), createBlock(_component_CButton, {
                    key: 0,
                    onClick: $options.cancel,
                    color: "secondary",
                    class: "px-4 ml-2"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
                    ]),
                    _: 1
                  }, 8, ["onClick"])) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$g = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Dialog.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const Dialog = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["ssrRender", _sfc_ssrRender$c]]);
const _sfc_main$f = {
  name: "DutyCalendar",
  props: {
    userId: null
  },
  computed: {
    ...mapState(["users/duty/calendar"]),
    events() {
      let temp = [];
      if (this["users/duty/calendar"]) {
        let data = this["users/duty/calendar"].data;
        for (const item of data) {
          let start2 = new Date(item["start"]);
          let end2 = new Date(item["end"]);
          let name2 = item["user"] ? `${item["user"]["name"]} ` : "";
          temp.push({
            data: item,
            title: `${name2}`,
            start: start2,
            end: end2,
            color: item.color ? item.color : "cyan"
          });
        }
      }
      return temp;
    }
  },
  data() {
    return {
      adapter: null,
      loading: false,
      focus: [/* @__PURE__ */ new Date()],
      type: "month",
      types: types$1,
      mode: "stack",
      modes: ["stack", "column"],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
        { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
        { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
        { text: "Mon, Wed, Fri", value: [1, 3, 5] }
      ],
      selectedEvent: null,
      selectedElement: null,
      selectedOpen: false
    };
  },
  mounted() {
    this.adapter = useDate();
    this.fetch({
      start: this.adapter.startOfDay(
        this.adapter.startOfMonth(/* @__PURE__ */ new Date())
      ),
      end: this.adapter.endOfDay(this.adapter.endOfMonth(/* @__PURE__ */ new Date()))
    });
  },
  methods: {
    getEvents(e) {
      this.fetch({
        start: this.adapter.startOfDay(this.adapter.startOfMonth(e[0])),
        end: this.adapter.endOfDay(this.adapter.endOfMonth(e[0]))
      });
    },
    fetch({ start: start2, end: end2 }) {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      self.selectedEvent = null;
      let data = {
        user_id: this.userId,
        from: moment(start2).format("Y-MM-DD"),
        to: moment(end2).format("Y-MM-DD")
      };
      this.$store.dispatch("users/duty/calendar/get", data).then((response) => {
        self.loading = false;
      }).catch((error2) => {
        self.loading = false;
      });
    },
    showEvent({ nativeEvent, event }) {
      console.log(event);
    },
    click(event) {
      this.selectedEvent = event;
    },
    allowed() {
      if (this.$store.getters.isAdmin) {
        return true;
      }
      if (this.$store.getters.authUser.id === this.userId) {
        return true;
      }
      return false;
    },
    onTypeChange(type2) {
      this.type = type2.value;
    }
  }
};
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButtonGroup = resolveComponent("CButtonGroup");
  const _component_CButton = resolveComponent("CButton");
  const _component_v_calendar = resolveComponent("v-calendar");
  if ($options.allowed) {
    _push(ssrRenderComponent(_component_CCard, _attrs, {
      default: withCtx((_2, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(ssrRenderComponent(VProgressLinear, {
            active: $data.loading,
            indeterminate: "",
            color: "cyan"
          }, null, _parent2, _scopeId));
          _push2(ssrRenderComponent(_component_CCardBody, null, {
            default: withCtx((_3, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
                  default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_CCol, { sm: "12" }, {
                        default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<h4 id="duty" class="card-title mb-0"${_scopeId4}>${ssrInterpolate(_ctx.$t("dutylist"))}</h4>`);
                          } else {
                            return [
                              createVNode("h4", {
                                id: "duty",
                                class: "card-title mb-0"
                              }, toDisplayString(_ctx.$t("dutylist")), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_CCol, { sm: "12" }, {
                          default: withCtx(() => [
                            createVNode("h4", {
                              id: "duty",
                              class: "card-title mb-0"
                            }, toDisplayString(_ctx.$t("dutylist")), 1)
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
                _push3(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
                  default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_CCol, {
                        class: "text-right",
                        md: 12
                      }, {
                        default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(_component_CButtonGroup, null, {
                              default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(`<!--[-->`);
                                  ssrRenderList($data.types, (t2) => {
                                    _push6(ssrRenderComponent(_component_CButton, {
                                      key: t2.value,
                                      color: t2.value === $data.type ? "primary" : "light",
                                      disabled: $data.loading,
                                      onClick: ($event) => $options.onTypeChange(t2)
                                    }, {
                                      default: withCtx((_7, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(t2.name)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(t2.name), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  });
                                  _push6(`<!--]-->`);
                                } else {
                                  return [
                                    (openBlock(true), createBlock(Fragment, null, renderList($data.types, (t2) => {
                                      return openBlock(), createBlock(_component_CButton, {
                                        key: t2.value,
                                        color: t2.value === $data.type ? "primary" : "light",
                                        disabled: $data.loading,
                                        onClick: ($event) => $options.onTypeChange(t2)
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(t2.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["color", "disabled", "onClick"]);
                                    }), 128))
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(_component_CButtonGroup, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList($data.types, (t2) => {
                                    return openBlock(), createBlock(_component_CButton, {
                                      key: t2.value,
                                      color: t2.value === $data.type ? "primary" : "light",
                                      disabled: $data.loading,
                                      onClick: ($event) => $options.onTypeChange(t2)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(t2.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["color", "disabled", "onClick"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_CCol, {
                          class: "text-right",
                          md: 12
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CButtonGroup, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList($data.types, (t2) => {
                                  return openBlock(), createBlock(_component_CButton, {
                                    key: t2.value,
                                    color: t2.value === $data.type ? "primary" : "light",
                                    disabled: $data.loading,
                                    onClick: ($event) => $options.onTypeChange(t2)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(t2.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["color", "disabled", "onClick"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
                _push3(ssrRenderComponent(_component_v_calendar, {
                  class: "p-4",
                  ref: "calendar",
                  modelValue: $data.focus,
                  "onUpdate:modelValue": [($event) => $data.focus = $event, $options.getEvents],
                  weekdays: $data.weekday,
                  "view-mode": $data.type,
                  events: $options.events,
                  "event-overlap-mode": $data.mode,
                  "event-overlap-threshold": 30
                }, {
                  event: withCtx(({ event }, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`<div class="d-flex align-items-center rounded shadow-lg cursor-pointer px-2 py-1 m-2" style="${ssrRenderStyle({
                        backgroundColor: event.allDay ? "#3462E3" : "#5A5A5A",
                        color: "white"
                      })}"${_scopeId3}><div class="rounded-circle p-2" style="${ssrRenderStyle({
                        backgroundColor: event.color,
                        width: "6px",
                        height: "6px"
                      })}"${_scopeId3}></div><span class="px-2"${_scopeId3}>${ssrInterpolate(event.title)}</span></div>`);
                    } else {
                      return [
                        createVNode("div", {
                          class: "d-flex align-items-center rounded shadow-lg cursor-pointer px-2 py-1 m-2",
                          style: {
                            backgroundColor: event.allDay ? "#3462E3" : "#5A5A5A",
                            color: "white"
                          },
                          onClick: ($event) => $options.click(event)
                        }, [
                          createVNode("div", {
                            class: "rounded-circle p-2",
                            style: {
                              backgroundColor: event.color,
                              width: "6px",
                              height: "6px"
                            }
                          }, null, 4),
                          createVNode("span", { class: "px-2" }, toDisplayString(event.title), 1)
                        ], 12, ["onClick"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
                if ($data.selectedEvent) {
                  _push3(ssrRenderComponent(_component_CRow, { class: "my-4" }, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CCol, {
                          sm: 12,
                          md: 12
                        }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CCard, null, {
                                default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_CCardBody, null, {
                                      default: withCtx((_7, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<div class="d-flex align-items-center"${_scopeId6}><div class="d-flex rounded align-items-center justify-content-center me-3" style="${ssrRenderStyle({
                                            backgroundColor: $data.selectedEvent.color,
                                            width: "26px",
                                            height: "26px"
                                          })}"${_scopeId6}></div><div class="d-flex flex-column justify-content-center"${_scopeId6}><label${_scopeId6}>${ssrInterpolate(`${$data.selectedEvent.data.user.name} ${_ctx.$t(
                                            "duty"
                                          )}`)}</label><label${_scopeId6}>${ssrInterpolate(`${$data.selectedEvent.data.start} - ${$data.selectedEvent.data.end}`)}</label></div></div>`);
                                        } else {
                                          return [
                                            createVNode("div", { class: "d-flex align-items-center" }, [
                                              createVNode("div", {
                                                class: "d-flex rounded align-items-center justify-content-center me-3",
                                                style: {
                                                  backgroundColor: $data.selectedEvent.color,
                                                  width: "26px",
                                                  height: "26px"
                                                }
                                              }, null, 4),
                                              createVNode("div", { class: "d-flex flex-column justify-content-center" }, [
                                                createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.user.name} ${_ctx.$t(
                                                  "duty"
                                                )}`), 1),
                                                createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.start} - ${$data.selectedEvent.data.end}`), 1)
                                              ])
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_CCardBody, null, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "d-flex align-items-center" }, [
                                            createVNode("div", {
                                              class: "d-flex rounded align-items-center justify-content-center me-3",
                                              style: {
                                                backgroundColor: $data.selectedEvent.color,
                                                width: "26px",
                                                height: "26px"
                                              }
                                            }, null, 4),
                                            createVNode("div", { class: "d-flex flex-column justify-content-center" }, [
                                              createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.user.name} ${_ctx.$t(
                                                "duty"
                                              )}`), 1),
                                              createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.start} - ${$data.selectedEvent.data.end}`), 1)
                                            ])
                                          ])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CCard, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_CCardBody, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "d-flex align-items-center" }, [
                                          createVNode("div", {
                                            class: "d-flex rounded align-items-center justify-content-center me-3",
                                            style: {
                                              backgroundColor: $data.selectedEvent.color,
                                              width: "26px",
                                              height: "26px"
                                            }
                                          }, null, 4),
                                          createVNode("div", { class: "d-flex flex-column justify-content-center" }, [
                                            createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.user.name} ${_ctx.$t(
                                              "duty"
                                            )}`), 1),
                                            createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.start} - ${$data.selectedEvent.data.end}`), 1)
                                          ])
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CCol, {
                            sm: 12,
                            md: 12
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CCard, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CCardBody, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-flex align-items-center" }, [
                                        createVNode("div", {
                                          class: "d-flex rounded align-items-center justify-content-center me-3",
                                          style: {
                                            backgroundColor: $data.selectedEvent.color,
                                            width: "26px",
                                            height: "26px"
                                          }
                                        }, null, 4),
                                        createVNode("div", { class: "d-flex flex-column justify-content-center" }, [
                                          createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.user.name} ${_ctx.$t(
                                            "duty"
                                          )}`), 1),
                                          createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.start} - ${$data.selectedEvent.data.end}`), 1)
                                        ])
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  _push3(`<!---->`);
                }
              } else {
                return [
                  createVNode(_component_CRow, { class: "p-2" }, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, { sm: "12" }, {
                        default: withCtx(() => [
                          createVNode("h4", {
                            id: "duty",
                            class: "card-title mb-0"
                          }, toDisplayString(_ctx.$t("dutylist")), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CRow, { class: "p-2" }, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        class: "text-right",
                        md: 12
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CButtonGroup, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList($data.types, (t2) => {
                                return openBlock(), createBlock(_component_CButton, {
                                  key: t2.value,
                                  color: t2.value === $data.type ? "primary" : "light",
                                  disabled: $data.loading,
                                  onClick: ($event) => $options.onTypeChange(t2)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(t2.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["color", "disabled", "onClick"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_v_calendar, {
                    class: "p-4",
                    ref: "calendar",
                    modelValue: $data.focus,
                    "onUpdate:modelValue": [($event) => $data.focus = $event, $options.getEvents],
                    weekdays: $data.weekday,
                    "view-mode": $data.type,
                    events: $options.events,
                    "event-overlap-mode": $data.mode,
                    "event-overlap-threshold": 30
                  }, {
                    event: withCtx(({ event }) => [
                      createVNode("div", {
                        class: "d-flex align-items-center rounded shadow-lg cursor-pointer px-2 py-1 m-2",
                        style: {
                          backgroundColor: event.allDay ? "#3462E3" : "#5A5A5A",
                          color: "white"
                        },
                        onClick: ($event) => $options.click(event)
                      }, [
                        createVNode("div", {
                          class: "rounded-circle p-2",
                          style: {
                            backgroundColor: event.color,
                            width: "6px",
                            height: "6px"
                          }
                        }, null, 4),
                        createVNode("span", { class: "px-2" }, toDisplayString(event.title), 1)
                      ], 12, ["onClick"])
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "weekdays", "view-mode", "events", "event-overlap-mode"]),
                  $data.selectedEvent ? (openBlock(), createBlock(_component_CRow, {
                    key: 0,
                    class: "my-4"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CCol, {
                        sm: 12,
                        md: 12
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CCard, null, {
                            default: withCtx(() => [
                              createVNode(_component_CCardBody, null, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "d-flex align-items-center" }, [
                                    createVNode("div", {
                                      class: "d-flex rounded align-items-center justify-content-center me-3",
                                      style: {
                                        backgroundColor: $data.selectedEvent.color,
                                        width: "26px",
                                        height: "26px"
                                      }
                                    }, null, 4),
                                    createVNode("div", { class: "d-flex flex-column justify-content-center" }, [
                                      createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.user.name} ${_ctx.$t(
                                        "duty"
                                      )}`), 1),
                                      createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.start} - ${$data.selectedEvent.data.end}`), 1)
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
        } else {
          return [
            createVNode(VProgressLinear, {
              active: $data.loading,
              indeterminate: "",
              color: "cyan"
            }, null, 8, ["active"]),
            createVNode(_component_CCardBody, null, {
              default: withCtx(() => [
                createVNode(_component_CRow, { class: "p-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, { sm: "12" }, {
                      default: withCtx(() => [
                        createVNode("h4", {
                          id: "duty",
                          class: "card-title mb-0"
                        }, toDisplayString(_ctx.$t("dutylist")), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CRow, { class: "p-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      class: "text-right",
                      md: 12
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_CButtonGroup, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList($data.types, (t2) => {
                              return openBlock(), createBlock(_component_CButton, {
                                key: t2.value,
                                color: t2.value === $data.type ? "primary" : "light",
                                disabled: $data.loading,
                                onClick: ($event) => $options.onTypeChange(t2)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(t2.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["color", "disabled", "onClick"]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_calendar, {
                  class: "p-4",
                  ref: "calendar",
                  modelValue: $data.focus,
                  "onUpdate:modelValue": [($event) => $data.focus = $event, $options.getEvents],
                  weekdays: $data.weekday,
                  "view-mode": $data.type,
                  events: $options.events,
                  "event-overlap-mode": $data.mode,
                  "event-overlap-threshold": 30
                }, {
                  event: withCtx(({ event }) => [
                    createVNode("div", {
                      class: "d-flex align-items-center rounded shadow-lg cursor-pointer px-2 py-1 m-2",
                      style: {
                        backgroundColor: event.allDay ? "#3462E3" : "#5A5A5A",
                        color: "white"
                      },
                      onClick: ($event) => $options.click(event)
                    }, [
                      createVNode("div", {
                        class: "rounded-circle p-2",
                        style: {
                          backgroundColor: event.color,
                          width: "6px",
                          height: "6px"
                        }
                      }, null, 4),
                      createVNode("span", { class: "px-2" }, toDisplayString(event.title), 1)
                    ], 12, ["onClick"])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "weekdays", "view-mode", "events", "event-overlap-mode"]),
                $data.selectedEvent ? (openBlock(), createBlock(_component_CRow, {
                  key: 0,
                  class: "my-4"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      sm: 12,
                      md: 12
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_CCard, null, {
                          default: withCtx(() => [
                            createVNode(_component_CCardBody, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex align-items-center" }, [
                                  createVNode("div", {
                                    class: "d-flex rounded align-items-center justify-content-center me-3",
                                    style: {
                                      backgroundColor: $data.selectedEvent.color,
                                      width: "26px",
                                      height: "26px"
                                    }
                                  }, null, 4),
                                  createVNode("div", { class: "d-flex flex-column justify-content-center" }, [
                                    createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.user.name} ${_ctx.$t(
                                      "duty"
                                    )}`), 1),
                                    createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.start} - ${$data.selectedEvent.data.end}`), 1)
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ]),
              _: 1
            })
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$f = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/DutyCalendar.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const DutyCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$b]]);
const _sfc_main$e = {
  name: "ExchangeRateTable",
  props: {
    base: null,
    symbol: null
  },
  computed: {
    ...mapState(["exchange-rates"]),
    // base() {
    //     return this["exchange-rates"].details.base;
    // },
    // symbol() {
    //     return this["exchange-rates"].details.symbol;
    // },
    items() {
      if (Array.isArray(this["exchange-rates"].data)) {
        return this["exchange-rates"].data;
      }
      return [];
    },
    details() {
      return this["exchange-rates"].details;
    }
  },
  data() {
    return {
      loading: false,
      mobile: window.innerWidth < 769,
      headers: [
        { title: this.$t("base"), value: "base" },
        { title: this.$t("symbol"), value: "symbol" },
        { title: this.$t("rate"), value: "rate" },
        { title: this.$t("updatedat"), value: "updated_at" },
        {
          title: this.$t("actions"),
          value: "actions",
          sortable: false
        }
      ]
    };
  },
  // watch: {
  //     details: function (newVal, oldVal) {
  //         this.fetch();
  //     },
  // },
  mounted() {
    this.fetch();
    window.addEventListener("resize", this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onResize() {
      this.mobile = window.innerWidth < 769;
    },
    fetch() {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      let data = {
        base: self.base,
        symbol: self.symbol
      };
      this.$store.dispatch("exchange-rates/get", data).then((response) => {
        self.loading = false;
      }).catch((error2) => {
        self.loading = false;
      });
    },
    reload() {
      this.fetch();
    },
    async click(item, action) {
      let type2 = action.type;
      switch (type2) {
        case "RouterPush":
          let route2 = action.route;
          this.$router.push({
            path: route2
          });
          break;
      }
    }
  }
};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButton = resolveComponent("CButton");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_CButtonGroup = resolveComponent("CButtonGroup");
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCol, { class: "text-right" }, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CButton, {
                color: "primary",
                size: "sm",
                onClick: $options.reload
              }, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CIcon, {
                      name: "cil-reload",
                      size: "sm"
                    }, null, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CIcon, {
                        name: "cil-reload",
                        size: "sm"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CButton, {
                  color: "primary",
                  size: "sm",
                  onClick: $options.reload
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CIcon, {
                      name: "cil-reload",
                      size: "sm"
                    })
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CCol, { class: "text-right" }, {
            default: withCtx(() => [
              createVNode(_component_CButton, {
                color: "primary",
                size: "sm",
                onClick: $options.reload
              }, {
                default: withCtx(() => [
                  createVNode(_component_CIcon, {
                    name: "cil-reload",
                    size: "sm"
                  })
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(ssrRenderComponent(VDataTable, {
    class: "elevation-1",
    headers: $data.headers,
    items: $options.items,
    loading: $data.loading,
    mobile: $data.mobile,
    "hide-default-footer": true
  }, {
    [`item.updated_at`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(this.$formatDate(item.updated_at))}`);
      } else {
        return [
          createTextVNode(toDisplayString(this.$formatDate(item.updated_at)), 1)
        ];
      }
    }),
    [`item.actions`]: withCtx(({ item }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CButtonGroup, null, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<!--[-->`);
              ssrRenderList(item.actions, (action) => {
                _push3(ssrRenderComponent(_component_CButton, {
                  key: action.key,
                  color: action.color,
                  disabled: action.disabled,
                  size: "sm",
                  onClick: ($event) => $options.click(item, action)
                }, {
                  default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`${ssrInterpolate(action.title)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(action.title), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent3, _scopeId2));
              });
              _push3(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(item.actions, (action) => {
                  return openBlock(), createBlock(_component_CButton, {
                    key: action.key,
                    color: action.color,
                    disabled: action.disabled,
                    size: "sm",
                    onClick: ($event) => $options.click(item, action)
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(action.title), 1)
                    ]),
                    _: 2
                  }, 1032, ["color", "disabled", "onClick"]);
                }), 128))
              ];
            }
          }),
          _: 2
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CButtonGroup, null, {
            default: withCtx(() => [
              (openBlock(true), createBlock(Fragment, null, renderList(item.actions, (action) => {
                return openBlock(), createBlock(_component_CButton, {
                  key: action.key,
                  color: action.color,
                  disabled: action.disabled,
                  size: "sm",
                  onClick: ($event) => $options.click(item, action)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(action.title), 1)
                  ]),
                  _: 2
                }, 1032, ["color", "disabled", "onClick"]);
              }), 128))
            ]),
            _: 2
          }, 1024)
        ];
      }
    }),
    _: 2
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ExchangeRateTable.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const ExchangeRateTable = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["ssrRender", _sfc_ssrRender$a]]);
const _sfc_main$d = {
  name: "ExchangeRate",
  components: {
    ExchangeRateTable
  },
  computed: {
    ...mapState(["exchange-rates"]),
    rate() {
      if (this["exchange-rates"] && this["exchange-rates"].details) {
        return this["exchange-rates"].details.rate;
      }
      return 0;
    }
  },
  data() {
    return {
      baseAmount: 0,
      base: "HKD",
      symbolAmount: 0,
      symbol: "TWD",
      // rate: 0,
      currencies,
      updatedAt: null,
      errors: {},
      loading: false
    };
  },
  watch: {
    base: function(newVal, oldVal) {
      let symbol2 = this.symbol;
      if (newVal === symbol2) {
        for (const x of currencies) {
          if (symbol2 !== x.value) {
            symbol2 = x.value;
            break;
          }
        }
      }
      if (newVal != oldVal) {
        this.fetch(this.base, symbol2);
      }
    },
    symbol: function(newVal, oldVal) {
      let base2 = this.base;
      if (newVal === base2) {
        for (const x of currencies) {
          if (base2 !== x.value) {
            base2 = x.value;
            break;
          }
        }
      }
      if (newVal != oldVal) {
        this.fetch(base2, this.symbol);
      }
    },
    baseAmount: function(val) {
      this.symbolAmount = val * this.rate;
    },
    symbolAmount: function(val) {
      this.baseAmount = val / this.rate * 1;
    }
  },
  mounted() {
    this.fetch(this.base, this.symbol);
  },
  methods: {
    fetch(base2, symbol2) {
      let self = this;
      if (self.loading || !base2 || !symbol2) {
        return;
      }
      self.loading = true;
      let data = {
        base: base2,
        symbol: symbol2
      };
      this.$store.dispatch("exchange-rates/details", data).then((response) => {
        let res = response.data.data;
        self.base = res.base;
        self.symbol = res.symbol;
        self.symbolAmount = self.baseAmount * self.rate;
        self.updatedAt = res.updated_at;
        self.loading = false;
        self.errors = {};
      }).catch((error2) => {
        var _a;
        self.errors = (_a = error2.response.data) == null ? void 0 : _a.data;
        self.loading = false;
      });
    }
  }
};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_ExchangeRateTable = resolveComponent("ExchangeRateTable");
  _push(ssrRenderComponent(_component_CCard, mergeProps({ class: "my-2" }, _attrs), {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VProgressLinear, {
          active: $data.loading,
          indeterminate: "",
          color: "cyan"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CCardBody, null, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<h4${_scopeId2}>${ssrInterpolate(_ctx.$t("exchange-rate"))}</h4>`);
              _push3(ssrRenderComponent(_component_CRow, null, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: 3,
                      sm: 3
                    }, {
                      default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VTextField, {
                            modelValue: $data.baseAmount,
                            "onUpdate:modelValue": ($event) => $data.baseAmount = $event,
                            disabled: $data.loading,
                            type: "number",
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.baseAmount,
                              "onUpdate:modelValue": ($event) => $data.baseAmount = $event,
                              disabled: $data.loading,
                              type: "number",
                              required: "",
                              outlined: "",
                              dense: "",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: 3,
                      sm: 3
                    }, {
                      default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VSelect, {
                            modelValue: $data.base,
                            "onUpdate:modelValue": ($event) => $data.base = $event,
                            items: $data.currencies,
                            "item-title": "name",
                            "item-value": "value",
                            error: $data.errors.base ? true : false,
                            "error-messages": $data.errors.base,
                            disabled: $data.loading,
                            outlined: "",
                            dense: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VSelect, {
                              modelValue: $data.base,
                              "onUpdate:modelValue": ($event) => $data.base = $event,
                              items: $data.currencies,
                              "item-title": "name",
                              "item-value": "value",
                              error: $data.errors.base ? true : false,
                              "error-messages": $data.errors.base,
                              disabled: $data.loading,
                              outlined: "",
                              dense: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error", "error-messages", "disabled"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: 3,
                      sm: 3
                    }, {
                      default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VTextField, {
                            modelValue: $data.symbolAmount,
                            "onUpdate:modelValue": ($event) => $data.symbolAmount = $event,
                            disabled: $data.loading,
                            type: "number",
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VTextField, {
                              modelValue: $data.symbolAmount,
                              "onUpdate:modelValue": ($event) => $data.symbolAmount = $event,
                              disabled: $data.loading,
                              type: "number",
                              required: "",
                              outlined: "",
                              dense: "",
                              clearable: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, {
                      md: 3,
                      sm: 3
                    }, {
                      default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VSelect, {
                            modelValue: $data.symbol,
                            "onUpdate:modelValue": ($event) => $data.symbol = $event,
                            items: $data.currencies,
                            "item-title": "name",
                            "item-value": "value",
                            error: $data.errors.symbol ? true : false,
                            "error-messages": $data.errors.symbol,
                            disabled: $data.loading,
                            outlined: "",
                            dense: ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VSelect, {
                              modelValue: $data.symbol,
                              "onUpdate:modelValue": ($event) => $data.symbol = $event,
                              items: $data.currencies,
                              "item-title": "name",
                              "item-value": "value",
                              error: $data.errors.symbol ? true : false,
                              "error-messages": $data.errors.symbol,
                              disabled: $data.loading,
                              outlined: "",
                              dense: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error", "error-messages", "disabled"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, {
                        md: 3,
                        sm: 3
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.baseAmount,
                            "onUpdate:modelValue": ($event) => $data.baseAmount = $event,
                            disabled: $data.loading,
                            type: "number",
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: 3,
                        sm: 3
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, {
                            modelValue: $data.base,
                            "onUpdate:modelValue": ($event) => $data.base = $event,
                            items: $data.currencies,
                            "item-title": "name",
                            "item-value": "value",
                            error: $data.errors.base ? true : false,
                            "error-messages": $data.errors.base,
                            disabled: $data.loading,
                            outlined: "",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error", "error-messages", "disabled"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: 3,
                        sm: 3
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: $data.symbolAmount,
                            "onUpdate:modelValue": ($event) => $data.symbolAmount = $event,
                            disabled: $data.loading,
                            type: "number",
                            required: "",
                            outlined: "",
                            dense: "",
                            clearable: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, {
                        md: 3,
                        sm: 3
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, {
                            modelValue: $data.symbol,
                            "onUpdate:modelValue": ($event) => $data.symbol = $event,
                            items: $data.currencies,
                            "item-title": "name",
                            "item-value": "value",
                            error: $data.errors.symbol ? true : false,
                            "error-messages": $data.errors.symbol,
                            disabled: $data.loading,
                            outlined: "",
                            dense: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error", "error-messages", "disabled"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              if ($data.updatedAt) {
                _push3(ssrRenderComponent(_component_CRow, null, {
                  default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_CCol, { class: "text-right text-muted" }, {
                        default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`${ssrInterpolate(`${_ctx.$t("updatedat")}:`)} ${ssrInterpolate(this.$formatDate($data.updatedAt))}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(`${_ctx.$t("updatedat")}:`) + " " + toDisplayString(this.$formatDate($data.updatedAt)), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_CCol, { class: "text-right text-muted" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(`${_ctx.$t("updatedat")}:`) + " " + toDisplayString(this.$formatDate($data.updatedAt)), 1)
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
              _push3(ssrRenderComponent(_component_CRow, null, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, null, {
                      default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_ExchangeRateTable, {
                            base: $data.base,
                            symbol: $data.symbol
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_ExchangeRateTable, {
                              base: $data.base,
                              symbol: $data.symbol
                            }, null, 8, ["base", "symbol"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, null, {
                        default: withCtx(() => [
                          createVNode(_component_ExchangeRateTable, {
                            base: $data.base,
                            symbol: $data.symbol
                          }, null, 8, ["base", "symbol"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("h4", null, toDisplayString(_ctx.$t("exchange-rate")), 1),
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      md: 3,
                      sm: 3
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.baseAmount,
                          "onUpdate:modelValue": ($event) => $data.baseAmount = $event,
                          disabled: $data.loading,
                          type: "number",
                          required: "",
                          outlined: "",
                          dense: "",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: 3,
                      sm: 3
                    }, {
                      default: withCtx(() => [
                        createVNode(VSelect, {
                          modelValue: $data.base,
                          "onUpdate:modelValue": ($event) => $data.base = $event,
                          items: $data.currencies,
                          "item-title": "name",
                          "item-value": "value",
                          error: $data.errors.base ? true : false,
                          "error-messages": $data.errors.base,
                          disabled: $data.loading,
                          outlined: "",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error", "error-messages", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: 3,
                      sm: 3
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: $data.symbolAmount,
                          "onUpdate:modelValue": ($event) => $data.symbolAmount = $event,
                          disabled: $data.loading,
                          type: "number",
                          required: "",
                          outlined: "",
                          dense: "",
                          clearable: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, {
                      md: 3,
                      sm: 3
                    }, {
                      default: withCtx(() => [
                        createVNode(VSelect, {
                          modelValue: $data.symbol,
                          "onUpdate:modelValue": ($event) => $data.symbol = $event,
                          items: $data.currencies,
                          "item-title": "name",
                          "item-value": "value",
                          error: $data.errors.symbol ? true : false,
                          "error-messages": $data.errors.symbol,
                          disabled: $data.loading,
                          outlined: "",
                          dense: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error", "error-messages", "disabled"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                $data.updatedAt ? (openBlock(), createBlock(_component_CRow, { key: 0 }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, { class: "text-right text-muted" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(`${_ctx.$t("updatedat")}:`) + " " + toDisplayString(this.$formatDate($data.updatedAt)), 1)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, null, {
                      default: withCtx(() => [
                        createVNode(_component_ExchangeRateTable, {
                          base: $data.base,
                          symbol: $data.symbol
                        }, null, 8, ["base", "symbol"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VProgressLinear, {
            active: $data.loading,
            indeterminate: "",
            color: "cyan"
          }, null, 8, ["active"]),
          createVNode(_component_CCardBody, null, {
            default: withCtx(() => [
              createVNode("h4", null, toDisplayString(_ctx.$t("exchange-rate")), 1),
              createVNode(_component_CRow, null, {
                default: withCtx(() => [
                  createVNode(_component_CCol, {
                    md: 3,
                    sm: 3
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: $data.baseAmount,
                        "onUpdate:modelValue": ($event) => $data.baseAmount = $event,
                        disabled: $data.loading,
                        type: "number",
                        required: "",
                        outlined: "",
                        dense: "",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CCol, {
                    md: 3,
                    sm: 3
                  }, {
                    default: withCtx(() => [
                      createVNode(VSelect, {
                        modelValue: $data.base,
                        "onUpdate:modelValue": ($event) => $data.base = $event,
                        items: $data.currencies,
                        "item-title": "name",
                        "item-value": "value",
                        error: $data.errors.base ? true : false,
                        "error-messages": $data.errors.base,
                        disabled: $data.loading,
                        outlined: "",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error", "error-messages", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CCol, {
                    md: 3,
                    sm: 3
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: $data.symbolAmount,
                        "onUpdate:modelValue": ($event) => $data.symbolAmount = $event,
                        disabled: $data.loading,
                        type: "number",
                        required: "",
                        outlined: "",
                        dense: "",
                        clearable: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CCol, {
                    md: 3,
                    sm: 3
                  }, {
                    default: withCtx(() => [
                      createVNode(VSelect, {
                        modelValue: $data.symbol,
                        "onUpdate:modelValue": ($event) => $data.symbol = $event,
                        items: $data.currencies,
                        "item-title": "name",
                        "item-value": "value",
                        error: $data.errors.symbol ? true : false,
                        "error-messages": $data.errors.symbol,
                        disabled: $data.loading,
                        outlined: "",
                        dense: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "error", "error-messages", "disabled"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              $data.updatedAt ? (openBlock(), createBlock(_component_CRow, { key: 0 }, {
                default: withCtx(() => [
                  createVNode(_component_CCol, { class: "text-right text-muted" }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(`${_ctx.$t("updatedat")}:`) + " " + toDisplayString(this.$formatDate($data.updatedAt)), 1)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_component_CRow, null, {
                default: withCtx(() => [
                  createVNode(_component_CCol, null, {
                    default: withCtx(() => [
                      createVNode(_component_ExchangeRateTable, {
                        base: $data.base,
                        symbol: $data.symbol
                      }, null, 8, ["base", "symbol"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ExchangeRate.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const ExchangeRate$1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$9]]);
const _sfc_main$c = {
  name: "ScannerDialog",
  computed: {
    ...mapState(["goods/shipping-cart"]),
    shippingItems() {
      return this["goods/shipping-cart"].items;
    }
  },
  components: {
    StreamBarcodeReader
  },
  data() {
    return {
      dialog: false,
      resolve: null,
      reject: null,
      barcode: null,
      title: null,
      type: null,
      unit: 0,
      error: false,
      loading: false,
      data: null,
      goodsSizes: sizes
    };
  },
  methods: {
    fetchItemDetails() {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      let data = {
        barcode: self.barcode
      };
      this.$store.dispatch("goods/items/details", data).then((response) => {
        let data2 = JSON.parse(JSON.stringify(response.data));
        self.data = data2;
        self.loading = false;
      }).catch((error2) => {
        self.loading = false;
      });
    },
    fetchPurchaseDetails() {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      let data = {
        barcode: self.barcode
      };
      this.$store.dispatch("goods/purchases/details", data).then((response) => {
        let data2 = JSON.parse(JSON.stringify(response.data));
        self.data = data2;
        self.loading = false;
      }).catch((error2) => {
        self.loading = false;
      });
    },
    update() {
      this.type = type;
      switch (type) {
        case "Shipping":
          let xData = this.shippingItems;
          let yData = this.data;
          for (const x of xData) {
            if (x.unit && x.id === yData.id) {
              this.data.unit = x.unit;
            }
          }
          break;
      }
    },
    open(type2, item) {
      this.dialog = true;
      this.type = type2;
      switch (type2) {
        case "Shipping":
          this.title = `${this.$t("shippings.title")}${this.$t(
            "scanner"
          )}`;
          if (item && "barcode" in item) {
            this.barcode = item.barcode;
            this.fetchItemDetails();
          }
          break;
        case "Search":
          this.title = `${this.$t("search")}${this.$t("scanner")}`;
          break;
        case "Stocktake":
          this.title = `${this.$t("stocktake")}`;
          break;
      }
      return new Promise((resolve, reject) => {
        this.resolve = resolve;
        this.reject = reject;
      });
    },
    confirm() {
      if (this.data) {
        switch (this.type) {
          case "Shipping":
            this.$store.dispatch("goods/shipping-cart/add", {
              data: { ...this.data, unit: this.unit }
            });
            break;
          case "Search":
            this.$router.push({
              name: "GoodsDetails",
              params: { id: this.data.goods.id }
            });
            break;
          case "Stocktake":
            this.$router.push({
              name: "Stocktake",
              params: { id: this.data.id }
            });
            break;
        }
      }
      this.resolve(true);
      this.dialog = false;
      this.clear();
    },
    cancel() {
      this.resolve(false);
      this.dialog = false;
      this.clear();
    },
    onDecode(a, b, c) {
      if (a) {
        this.barcode = a;
        switch (this.type) {
          case "Shipping":
            this.fetchItemDetails();
            break;
          case "Search":
            this.fetchItemDetails();
            break;
          case "Stocktake":
            this.fetchPurchaseDetails();
            break;
        }
      }
    },
    onLoaded() {
      this.error = false;
    },
    onError() {
      this.error = true;
    },
    clear() {
      this.unit = 0;
      this.barcode = null;
      this.data = null;
    }
  }
};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CModal = resolveComponent("CModal");
  const _component_CModalHeader = resolveComponent("CModalHeader");
  const _component_CModalTitle = resolveComponent("CModalTitle");
  const _component_CModalBody = resolveComponent("CModalBody");
  const _component_StreamBarcodeReader = resolveComponent("StreamBarcodeReader");
  const _component_barcode = resolveComponent("barcode");
  const _component_v_number_input = resolveComponent("v-number-input");
  const _component_CModalFooter = resolveComponent("CModalFooter");
  const _component_CButton = resolveComponent("CButton");
  _push(ssrRenderComponent(_component_CModal, mergeProps({
    visible: $data.dialog,
    centered: true,
    fullscreen: "sm",
    size: "lg",
    onClose: () => $data.dialog = false
  }, _attrs), {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CModalHeader, null, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CModalTitle, null, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate($data.title)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString($data.title), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CModalTitle, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString($data.title), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(VProgressLinear, {
          active: $data.loading,
          indeterminate: "",
          color: "cyan"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CModalBody, null, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_StreamBarcodeReader, {
                onDecode: (a, b, c) => $options.onDecode(a, b, c),
                onLoaded: () => $options.onLoaded(),
                onError: () => $options.onError()
              }, null, _parent3, _scopeId2));
              if ($data.error) {
                _push3(`<div class="d-flex justify-content-center"${_scopeId2}><h4${_scopeId2}>${ssrInterpolate(_ctx.$t("error.camera"))}</h4></div>`);
              } else {
                _push3(`<!---->`);
              }
              _push3(`<div class="d-flex justify-content-center"${_scopeId2}>`);
              if ($data.barcode) {
                _push3(ssrRenderComponent(_component_barcode, {
                  class: "m-4",
                  value: $data.barcode,
                  options: { format: "CODE39", height: 32 }
                }, null, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
              _push3(`</div>`);
              if ($data.type === "Shipping") {
                _push3(`<div class="d-flex justify-content-center"${_scopeId2}>`);
                _push3(ssrRenderComponent(_component_v_number_input, {
                  class: "my-4",
                  size: "small",
                  modelValue: $data.unit,
                  "onUpdate:modelValue": ($event) => $data.unit = $event,
                  width: "100%",
                  min: 0,
                  max: $data.data ? $data.data.stock_unit : 0,
                  inline: "",
                  center: "",
                  controls: "",
                  "control-variant": "split"
                }, null, _parent3, _scopeId2));
                _push3(`</div>`);
              } else {
                _push3(`<!---->`);
              }
            } else {
              return [
                createVNode(_component_StreamBarcodeReader, {
                  onDecode: (a, b, c) => $options.onDecode(a, b, c),
                  onLoaded: () => $options.onLoaded(),
                  onError: () => $options.onError()
                }, null, 8, ["onDecode", "onLoaded", "onError"]),
                $data.error ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "d-flex justify-content-center"
                }, [
                  createVNode("h4", null, toDisplayString(_ctx.$t("error.camera")), 1)
                ])) : createCommentVNode("", true),
                createVNode("div", { class: "d-flex justify-content-center" }, [
                  $data.barcode ? (openBlock(), createBlock(_component_barcode, {
                    key: 0,
                    class: "m-4",
                    value: $data.barcode,
                    options: { format: "CODE39", height: 32 }
                  }, null, 8, ["value"])) : createCommentVNode("", true)
                ]),
                $data.type === "Shipping" ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "d-flex justify-content-center"
                }, [
                  createVNode(_component_v_number_input, {
                    class: "my-4",
                    size: "small",
                    modelValue: $data.unit,
                    "onUpdate:modelValue": ($event) => $data.unit = $event,
                    width: "100%",
                    min: 0,
                    max: $data.data ? $data.data.stock_unit : 0,
                    inline: "",
                    center: "",
                    controls: "",
                    "control-variant": "split"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
                ])) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CModalFooter, null, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.confirm,
                disabled: $data.data === null,
                color: "danger",
                class: "px-4"
              }, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    if ($data.type === "Shipping") {
                      _push4(`<div${_scopeId3}>${ssrInterpolate(_ctx.$t("button.confirm"))}</div>`);
                    } else if ($data.type === "Search") {
                      _push4(`<div${_scopeId3}>${ssrInterpolate(_ctx.$t("button.jumpto"))}${ssrInterpolate(_ctx.$t("details"))}</div>`);
                    } else if ($data.type === "Stocktake") {
                      _push4(`<div${_scopeId3}>${ssrInterpolate(_ctx.$t("button.confirm"))}</div>`);
                    } else {
                      _push4(`<!---->`);
                    }
                  } else {
                    return [
                      $data.type === "Shipping" ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(_ctx.$t("button.confirm")), 1)) : $data.type === "Search" ? (openBlock(), createBlock("div", { key: 1 }, toDisplayString(_ctx.$t("button.jumpto")) + toDisplayString(_ctx.$t("details")), 1)) : $data.type === "Stocktake" ? (openBlock(), createBlock("div", { key: 2 }, toDisplayString(_ctx.$t("button.confirm")), 1)) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CButton, {
                onClick: $options.cancel,
                color: "secondary",
                class: "px-4 ml-2"
              }, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.$t("button.cancel"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CButton, {
                  onClick: $options.confirm,
                  disabled: $data.data === null,
                  color: "danger",
                  class: "px-4"
                }, {
                  default: withCtx(() => [
                    $data.type === "Shipping" ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(_ctx.$t("button.confirm")), 1)) : $data.type === "Search" ? (openBlock(), createBlock("div", { key: 1 }, toDisplayString(_ctx.$t("button.jumpto")) + toDisplayString(_ctx.$t("details")), 1)) : $data.type === "Stocktake" ? (openBlock(), createBlock("div", { key: 2 }, toDisplayString(_ctx.$t("button.confirm")), 1)) : createCommentVNode("", true)
                  ]),
                  _: 1
                }, 8, ["onClick", "disabled"]),
                createVNode(_component_CButton, {
                  onClick: $options.cancel,
                  color: "secondary",
                  class: "px-4 ml-2"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CModalHeader, null, {
            default: withCtx(() => [
              createVNode(_component_CModalTitle, null, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString($data.title), 1)
                ]),
                _: 1
              })
            ]),
            _: 1
          }),
          createVNode(VProgressLinear, {
            active: $data.loading,
            indeterminate: "",
            color: "cyan"
          }, null, 8, ["active"]),
          createVNode(_component_CModalBody, null, {
            default: withCtx(() => [
              createVNode(_component_StreamBarcodeReader, {
                onDecode: (a, b, c) => $options.onDecode(a, b, c),
                onLoaded: () => $options.onLoaded(),
                onError: () => $options.onError()
              }, null, 8, ["onDecode", "onLoaded", "onError"]),
              $data.error ? (openBlock(), createBlock("div", {
                key: 0,
                class: "d-flex justify-content-center"
              }, [
                createVNode("h4", null, toDisplayString(_ctx.$t("error.camera")), 1)
              ])) : createCommentVNode("", true),
              createVNode("div", { class: "d-flex justify-content-center" }, [
                $data.barcode ? (openBlock(), createBlock(_component_barcode, {
                  key: 0,
                  class: "m-4",
                  value: $data.barcode,
                  options: { format: "CODE39", height: 32 }
                }, null, 8, ["value"])) : createCommentVNode("", true)
              ]),
              $data.type === "Shipping" ? (openBlock(), createBlock("div", {
                key: 1,
                class: "d-flex justify-content-center"
              }, [
                createVNode(_component_v_number_input, {
                  class: "my-4",
                  size: "small",
                  modelValue: $data.unit,
                  "onUpdate:modelValue": ($event) => $data.unit = $event,
                  width: "100%",
                  min: 0,
                  max: $data.data ? $data.data.stock_unit : 0,
                  inline: "",
                  center: "",
                  controls: "",
                  "control-variant": "split"
                }, null, 8, ["modelValue", "onUpdate:modelValue", "max"])
              ])) : createCommentVNode("", true)
            ]),
            _: 1
          }),
          createVNode(_component_CModalFooter, null, {
            default: withCtx(() => [
              createVNode(_component_CButton, {
                onClick: $options.confirm,
                disabled: $data.data === null,
                color: "danger",
                class: "px-4"
              }, {
                default: withCtx(() => [
                  $data.type === "Shipping" ? (openBlock(), createBlock("div", { key: 0 }, toDisplayString(_ctx.$t("button.confirm")), 1)) : $data.type === "Search" ? (openBlock(), createBlock("div", { key: 1 }, toDisplayString(_ctx.$t("button.jumpto")) + toDisplayString(_ctx.$t("details")), 1)) : $data.type === "Stocktake" ? (openBlock(), createBlock("div", { key: 2 }, toDisplayString(_ctx.$t("button.confirm")), 1)) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["onClick", "disabled"]),
              createVNode(_component_CButton, {
                onClick: $options.cancel,
                color: "secondary",
                class: "px-4 ml-2"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("button.cancel")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ScannerDialog.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const ScannerDialog = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$8]]);
const _sfc_main$b = {
  name: "ShippingPurchaseQuickSearch",
  data() {
    return {
      value: null,
      search: null,
      autocomplete: {
        data: {
          items: [],
          loading: false
        }
      }
    };
  },
  watch: {
    search: function(newVal, oldVal) {
      this.fetch(this, newVal, oldVal);
    }
  },
  methods: {
    fetch: debounce((self, newVal, oldVal) => {
      if (newVal == oldVal && newVal != "" || !newVal || newVal == "") {
        return;
      }
      const found = self.autocomplete.data.items.find(
        (x) => x.name === newVal
      );
      if (found) {
        return;
      }
      self.autocomplete.data.loading = true;
      let data = {
        search: newVal
      };
      self.$store.dispatch("goods/shippings/purchase/quicksearch/get", data).then((response) => {
        self.autocomplete.data.items = response.data;
        self.autocomplete.data.loading = false;
      }).catch((error2) => {
        self.autocomplete.data.loading = false;
      });
    }, 300),
    details() {
      if (this.value) {
        const { id, type: type2 } = this.value;
        switch (type2) {
          case "SHIPPING":
            this.$router.push({
              path: `shippings/details/${id}`
            });
            break;
          case "PURCHASE":
            this.$router.push({
              path: `purchases/details/${id}`
            });
            break;
        }
      }
    }
  }
};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButton = resolveComponent("CButton");
  _push(ssrRenderComponent(_component_CCard, _attrs, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CCardBody, null, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<h4${_scopeId2}>${ssrInterpolate(`${_ctx.$t("quicksearch")} ${_ctx.$t("shipping.invoice")} / ${_ctx.$t(
                "purchase.invoice"
              )} `)}</h4><hr${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_CRow, null, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, null, {
                      default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VAutocomplete, {
                            modelValue: $data.value,
                            "onUpdate:modelValue": ($event) => $data.value = $event,
                            search: $data.search,
                            "onUpdate:search": ($event) => $data.search = $event,
                            items: $data.autocomplete.data.items,
                            loading: $data.autocomplete.data.loading,
                            required: "",
                            outlined: "",
                            dense: "",
                            "hide-selected": "",
                            "item-title": "name",
                            "item-value": "id",
                            "return-object": ""
                          }, null, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(VAutocomplete, {
                              modelValue: $data.value,
                              "onUpdate:modelValue": ($event) => $data.value = $event,
                              search: $data.search,
                              "onUpdate:search": ($event) => $data.search = $event,
                              items: $data.autocomplete.data.items,
                              loading: $data.autocomplete.data.loading,
                              required: "",
                              outlined: "",
                              dense: "",
                              "hide-selected": "",
                              "item-title": "name",
                              "item-value": "id",
                              "return-object": ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "search", "onUpdate:search", "items", "loading"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, null, {
                        default: withCtx(() => [
                          createVNode(VAutocomplete, {
                            modelValue: $data.value,
                            "onUpdate:modelValue": ($event) => $data.value = $event,
                            search: $data.search,
                            "onUpdate:search": ($event) => $data.search = $event,
                            items: $data.autocomplete.data.items,
                            loading: $data.autocomplete.data.loading,
                            required: "",
                            outlined: "",
                            dense: "",
                            "hide-selected": "",
                            "item-title": "name",
                            "item-value": "id",
                            "return-object": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "search", "onUpdate:search", "items", "loading"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CRow, null, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, { class: "text-right" }, {
                      default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CButton, {
                            onClick: $options.details,
                            color: "primary",
                            class: "btn-block px-4",
                            size: "sm",
                            disabled: $data.autocomplete.data.loading || !$data.value
                          }, {
                            default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`${ssrInterpolate(_ctx.$t("details"))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(_ctx.$t("details")), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CButton, {
                              onClick: $options.details,
                              color: "primary",
                              class: "btn-block px-4",
                              size: "sm",
                              disabled: $data.autocomplete.data.loading || !$data.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("details")), 1)
                              ]),
                              _: 1
                            }, 8, ["onClick", "disabled"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, { class: "text-right" }, {
                        default: withCtx(() => [
                          createVNode(_component_CButton, {
                            onClick: $options.details,
                            color: "primary",
                            class: "btn-block px-4",
                            size: "sm",
                            disabled: $data.autocomplete.data.loading || !$data.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("details")), 1)
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode("h4", null, toDisplayString(`${_ctx.$t("quicksearch")} ${_ctx.$t("shipping.invoice")} / ${_ctx.$t(
                  "purchase.invoice"
                )} `), 1),
                createVNode("hr"),
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, null, {
                      default: withCtx(() => [
                        createVNode(VAutocomplete, {
                          modelValue: $data.value,
                          "onUpdate:modelValue": ($event) => $data.value = $event,
                          search: $data.search,
                          "onUpdate:search": ($event) => $data.search = $event,
                          items: $data.autocomplete.data.items,
                          loading: $data.autocomplete.data.loading,
                          required: "",
                          outlined: "",
                          dense: "",
                          "hide-selected": "",
                          "item-title": "name",
                          "item-value": "id",
                          "return-object": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "search", "onUpdate:search", "items", "loading"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_CRow, null, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, { class: "text-right" }, {
                      default: withCtx(() => [
                        createVNode(_component_CButton, {
                          onClick: $options.details,
                          color: "primary",
                          class: "btn-block px-4",
                          size: "sm",
                          disabled: $data.autocomplete.data.loading || !$data.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("details")), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CCardBody, null, {
            default: withCtx(() => [
              createVNode("h4", null, toDisplayString(`${_ctx.$t("quicksearch")} ${_ctx.$t("shipping.invoice")} / ${_ctx.$t(
                "purchase.invoice"
              )} `), 1),
              createVNode("hr"),
              createVNode(_component_CRow, null, {
                default: withCtx(() => [
                  createVNode(_component_CCol, null, {
                    default: withCtx(() => [
                      createVNode(VAutocomplete, {
                        modelValue: $data.value,
                        "onUpdate:modelValue": ($event) => $data.value = $event,
                        search: $data.search,
                        "onUpdate:search": ($event) => $data.search = $event,
                        items: $data.autocomplete.data.items,
                        loading: $data.autocomplete.data.loading,
                        required: "",
                        outlined: "",
                        dense: "",
                        "hide-selected": "",
                        "item-title": "name",
                        "item-value": "id",
                        "return-object": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "search", "onUpdate:search", "items", "loading"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CRow, null, {
                default: withCtx(() => [
                  createVNode(_component_CCol, { class: "text-right" }, {
                    default: withCtx(() => [
                      createVNode(_component_CButton, {
                        onClick: $options.details,
                        color: "primary",
                        class: "btn-block px-4",
                        size: "sm",
                        disabled: $data.autocomplete.data.loading || !$data.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("details")), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/ShippingPurchaseQuickSearch.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const ShippingPurchaseQuickSearch = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$7]]);
const _sfc_main$a = {
  name: "Snackbar",
  data() {
    return {
      timeout: 1e4
    };
  },
  computed: {
    show: {
      get() {
        return this.$store.getters["snackbar/show"];
      },
      set(value) {
        if (!value) {
          this.$store.dispatch("snackbar/close");
        }
      }
    },
    color() {
      return this.$store.getters["snackbar/color"];
    },
    text() {
      return this.$store.getters["snackbar/text"];
    }
  },
  mounted() {
    this.close();
  },
  unmounted() {
    this.close();
  },
  methods: {
    close() {
      this.$store.dispatch("snackbar/close");
    }
  }
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(ssrRenderComponent(VSnackbar, mergeProps({
    modelValue: $options.show,
    "onUpdate:modelValue": ($event) => $options.show = $event,
    color: $options.color,
    timeout: $data.timeout,
    vertical: true,
    "multi-line": ""
  }, _attrs), {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate($options.text)} <template${_scopeId}>`);
        _push2(ssrRenderComponent(VBtn, {
          dark: "",
          text: "",
          onClick: $options.close
        }, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate(_ctx.$t("button.close"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("button.close")), 1)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(`</template>`);
      } else {
        return [
          createTextVNode(toDisplayString($options.text) + " ", 1),
          createVNode("template", null, [
            createVNode(VBtn, {
              dark: "",
              text: "",
              onClick: $options.close
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(_ctx.$t("button.close")), 1)
              ]),
              _: 1
            }, 8, ["onClick"])
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/Snackbar.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const Snackbar = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$6]]);
const _sfc_main$9 = {
  name: "StockCalendar",
  props: {
    cType: null
  },
  components: {},
  computed: {
    ...mapState(["goods/stocks/calendar"]),
    events() {
      let temp = [];
      if (this["goods/stocks/calendar"]) {
        let data = this["goods/stocks/calendar"].data;
        for (const item of data) {
          let color2 = "cyan";
          this.$t(
            `${this.cType}.status.${item["status"]}`
          );
          switch (item["status"]) {
            case "PENDING":
              color2 = "#F9B115";
              break;
            case "PROCESSING":
              color2 = "#3399FF";
              break;
            case "DELIVERED":
              color2 = "#2EB85C";
              break;
          }
          let start2 = new Date(item["created_at"]);
          let end2 = new Date(item["created_at"]);
          temp.push({
            data: item,
            title: `${item["status"]}`,
            start: start2,
            end: end2,
            color: color2,
            timed: false
          });
        }
      }
      return temp;
    }
  },
  data() {
    return {
      adapter: null,
      loading: false,
      focus: [/* @__PURE__ */ new Date()],
      type: "month",
      types: types$1,
      mode: "stack",
      modes: ["stack", "column"],
      weekday: [0, 1, 2, 3, 4, 5, 6],
      weekdays: [
        { text: "Sun - Sat", value: [0, 1, 2, 3, 4, 5, 6] },
        { text: "Mon - Sun", value: [1, 2, 3, 4, 5, 6, 0] },
        { text: "Mon - Fri", value: [1, 2, 3, 4, 5] },
        { text: "Mon, Wed, Fri", value: [1, 3, 5] }
      ],
      selectedEvent: null,
      selectedElement: null,
      selectedOpen: false,
      config: {
        locale: "zh-CN",
        defaultMode: "month"
      }
    };
  },
  mounted() {
    this.adapter = useDate();
    this.fetch({
      start: this.adapter.startOfDay(
        this.adapter.startOfMonth(/* @__PURE__ */ new Date())
      ),
      end: this.adapter.endOfDay(this.adapter.endOfMonth(/* @__PURE__ */ new Date()))
    });
  },
  methods: {
    getEvents(e) {
      this.fetch({
        start: this.adapter.startOfDay(this.adapter.startOfMonth(e[0])),
        end: this.adapter.endOfDay(this.adapter.endOfMonth(e[0]))
      });
    },
    fetch({ start: start2, end: end2 }) {
      let self = this;
      if (self.loading) {
        return;
      }
      self.loading = true;
      let data = {
        type: this.cType,
        from: moment(start2).format("Y-MM-DD"),
        to: moment(end2).format("Y-MM-DD")
      };
      this.$store.dispatch("goods/stocks/calendar/get", data).then((response) => {
        self.loading = false;
      }).catch((error2) => {
        self.loading = false;
      });
    },
    showEvent({ nativeEvent, event }) {
      console.log(event);
    },
    click(event) {
      this.selectedEvent = event;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    onTypeChange(type2) {
      this.type = type2;
    }
  }
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CCard = resolveComponent("CCard");
  const _component_CCardBody = resolveComponent("CCardBody");
  const _component_CRow = resolveComponent("CRow");
  const _component_CCol = resolveComponent("CCol");
  const _component_CButtonGroup = resolveComponent("CButtonGroup");
  const _component_CButton = resolveComponent("CButton");
  const _component_v_calendar = resolveComponent("v-calendar");
  _push(ssrRenderComponent(_component_CCard, _attrs, {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VProgressLinear, {
          active: $data.loading,
          indeterminate: "",
          color: "cyan"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CCardBody, null, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CRow, { class: "p-2" }, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CCol, { class: "text-left" }, {
                      default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<h4 class="card-title mb-0"${_scopeId4}>${ssrInterpolate(_ctx.$t("calendar.title"))}</h4>`);
                        } else {
                          return [
                            createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("calendar.title")), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                    _push4(ssrRenderComponent(_component_CCol, { class: "text-right" }, {
                      default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(_component_CButtonGroup, null, {
                            default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(`<!--[-->`);
                                ssrRenderList($data.types, (t2) => {
                                  _push6(ssrRenderComponent(_component_CButton, {
                                    key: t2.value,
                                    color: t2.value === $data.type ? "primary" : "light",
                                    disabled: $data.loading,
                                    onClick: ($event) => $options.onTypeChange(t2.value)
                                  }, {
                                    default: withCtx((_7, _push7, _parent7, _scopeId6) => {
                                      if (_push7) {
                                        _push7(`${ssrInterpolate(t2.name)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(t2.name), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent6, _scopeId5));
                                });
                                _push6(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList($data.types, (t2) => {
                                    return openBlock(), createBlock(_component_CButton, {
                                      key: t2.value,
                                      color: t2.value === $data.type ? "primary" : "light",
                                      disabled: $data.loading,
                                      onClick: ($event) => $options.onTypeChange(t2.value)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(t2.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["color", "disabled", "onClick"]);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent5, _scopeId4));
                        } else {
                          return [
                            createVNode(_component_CButtonGroup, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList($data.types, (t2) => {
                                  return openBlock(), createBlock(_component_CButton, {
                                    key: t2.value,
                                    color: t2.value === $data.type ? "primary" : "light",
                                    disabled: $data.loading,
                                    onClick: ($event) => $options.onTypeChange(t2.value)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(t2.name), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["color", "disabled", "onClick"]);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(_component_CCol, { class: "text-left" }, {
                        default: withCtx(() => [
                          createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("calendar.title")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CCol, { class: "text-right" }, {
                        default: withCtx(() => [
                          createVNode(_component_CButtonGroup, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList($data.types, (t2) => {
                                return openBlock(), createBlock(_component_CButton, {
                                  key: t2.value,
                                  color: t2.value === $data.type ? "primary" : "light",
                                  disabled: $data.loading,
                                  onClick: ($event) => $options.onTypeChange(t2.value)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(t2.name), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["color", "disabled", "onClick"]);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_v_calendar, {
                class: "p-4",
                ref: "calendar",
                modelValue: $data.focus,
                "onUpdate:modelValue": [($event) => $data.focus = $event, $options.getEvents],
                weekdays: $data.weekday,
                "view-mode": $data.type,
                events: $options.events,
                "event-overlap-mode": $data.mode,
                "event-overlap-threshold": 30,
                "onClick:event": $options.showEvent
              }, {
                event: withCtx(({ event }, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<div class="d-flex align-items-center rounded shadow-lg cursor-pointer px-2 py-1 m-2" style="${ssrRenderStyle({
                      backgroundColor: event.allDay ? "#3462E3" : "#5A5A5A",
                      color: "white"
                    })}"${_scopeId3}><div class="rounded-circle p-2" style="${ssrRenderStyle({
                      backgroundColor: event.color,
                      width: "6px",
                      height: "6px"
                    })}"${_scopeId3}></div><span class="px-2"${_scopeId3}>${ssrInterpolate(event.title)}</span></div>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: "d-flex align-items-center rounded shadow-lg cursor-pointer px-2 py-1 m-2",
                        style: {
                          backgroundColor: event.allDay ? "#3462E3" : "#5A5A5A",
                          color: "white"
                        },
                        onClick: ($event) => $options.click(event)
                      }, [
                        createVNode("div", {
                          class: "rounded-circle p-2",
                          style: {
                            backgroundColor: event.color,
                            width: "6px",
                            height: "6px"
                          }
                        }, null, 4),
                        createVNode("span", { class: "px-2" }, toDisplayString(event.title), 1)
                      ], 12, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              if ($data.selectedEvent) {
                _push3(ssrRenderComponent(_component_CRow, { class: "my-4" }, {
                  default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_CCol, {
                        sm: 12,
                        md: 12
                      }, {
                        default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(_component_CCard, null, {
                              default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                if (_push6) {
                                  _push6(ssrRenderComponent(_component_CCardBody, null, {
                                    default: withCtx((_7, _push7, _parent7, _scopeId6) => {
                                      if (_push7) {
                                        _push7(`<div class="d-flex align-items-center"${_scopeId6}><div class="d-flex rounded align-items-center justify-content-center me-3" style="${ssrRenderStyle({
                                          backgroundColor: $data.selectedEvent.color,
                                          width: "26px",
                                          height: "26px"
                                        })}"${_scopeId6}></div><div class="d-flex flex-column justify-content-center"${_scopeId6}><label${_scopeId6}>${ssrInterpolate(`${$data.selectedEvent.data.client_name}`)}</label><label${_scopeId6}>${ssrInterpolate($data.selectedEvent.data.client_contact)}</label></div></div>`);
                                      } else {
                                        return [
                                          createVNode("div", { class: "d-flex align-items-center" }, [
                                            createVNode("div", {
                                              class: "d-flex rounded align-items-center justify-content-center me-3",
                                              style: {
                                                backgroundColor: $data.selectedEvent.color,
                                                width: "26px",
                                                height: "26px"
                                              }
                                            }, null, 4),
                                            createVNode("div", { class: "d-flex flex-column justify-content-center" }, [
                                              createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.client_name}`), 1),
                                              createVNode("label", null, toDisplayString($data.selectedEvent.data.client_contact), 1)
                                            ])
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent6, _scopeId5));
                                } else {
                                  return [
                                    createVNode(_component_CCardBody, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "d-flex align-items-center" }, [
                                          createVNode("div", {
                                            class: "d-flex rounded align-items-center justify-content-center me-3",
                                            style: {
                                              backgroundColor: $data.selectedEvent.color,
                                              width: "26px",
                                              height: "26px"
                                            }
                                          }, null, 4),
                                          createVNode("div", { class: "d-flex flex-column justify-content-center" }, [
                                            createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.client_name}`), 1),
                                            createVNode("label", null, toDisplayString($data.selectedEvent.data.client_contact), 1)
                                          ])
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent5, _scopeId4));
                          } else {
                            return [
                              createVNode(_component_CCard, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CCardBody, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-flex align-items-center" }, [
                                        createVNode("div", {
                                          class: "d-flex rounded align-items-center justify-content-center me-3",
                                          style: {
                                            backgroundColor: $data.selectedEvent.color,
                                            width: "26px",
                                            height: "26px"
                                          }
                                        }, null, 4),
                                        createVNode("div", { class: "d-flex flex-column justify-content-center" }, [
                                          createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.client_name}`), 1),
                                          createVNode("label", null, toDisplayString($data.selectedEvent.data.client_contact), 1)
                                        ])
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_CCol, {
                          sm: 12,
                          md: 12
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CCard, null, {
                              default: withCtx(() => [
                                createVNode(_component_CCardBody, null, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "d-flex align-items-center" }, [
                                      createVNode("div", {
                                        class: "d-flex rounded align-items-center justify-content-center me-3",
                                        style: {
                                          backgroundColor: $data.selectedEvent.color,
                                          width: "26px",
                                          height: "26px"
                                        }
                                      }, null, 4),
                                      createVNode("div", { class: "d-flex flex-column justify-content-center" }, [
                                        createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.client_name}`), 1),
                                        createVNode("label", null, toDisplayString($data.selectedEvent.data.client_contact), 1)
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
            } else {
              return [
                createVNode(_component_CRow, { class: "p-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, { class: "text-left" }, {
                      default: withCtx(() => [
                        createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("calendar.title")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCol, { class: "text-right" }, {
                      default: withCtx(() => [
                        createVNode(_component_CButtonGroup, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList($data.types, (t2) => {
                              return openBlock(), createBlock(_component_CButton, {
                                key: t2.value,
                                color: t2.value === $data.type ? "primary" : "light",
                                disabled: $data.loading,
                                onClick: ($event) => $options.onTypeChange(t2.value)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(t2.name), 1)
                                ]),
                                _: 2
                              }, 1032, ["color", "disabled", "onClick"]);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_v_calendar, {
                  class: "p-4",
                  ref: "calendar",
                  modelValue: $data.focus,
                  "onUpdate:modelValue": [($event) => $data.focus = $event, $options.getEvents],
                  weekdays: $data.weekday,
                  "view-mode": $data.type,
                  events: $options.events,
                  "event-overlap-mode": $data.mode,
                  "event-overlap-threshold": 30,
                  "onClick:event": $options.showEvent
                }, {
                  event: withCtx(({ event }) => [
                    createVNode("div", {
                      class: "d-flex align-items-center rounded shadow-lg cursor-pointer px-2 py-1 m-2",
                      style: {
                        backgroundColor: event.allDay ? "#3462E3" : "#5A5A5A",
                        color: "white"
                      },
                      onClick: ($event) => $options.click(event)
                    }, [
                      createVNode("div", {
                        class: "rounded-circle p-2",
                        style: {
                          backgroundColor: event.color,
                          width: "6px",
                          height: "6px"
                        }
                      }, null, 4),
                      createVNode("span", { class: "px-2" }, toDisplayString(event.title), 1)
                    ], 12, ["onClick"])
                  ]),
                  _: 1
                }, 8, ["modelValue", "onUpdate:modelValue", "weekdays", "view-mode", "events", "event-overlap-mode", "onClick:event"]),
                $data.selectedEvent ? (openBlock(), createBlock(_component_CRow, {
                  key: 0,
                  class: "my-4"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CCol, {
                      sm: 12,
                      md: 12
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_CCard, null, {
                          default: withCtx(() => [
                            createVNode(_component_CCardBody, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex align-items-center" }, [
                                  createVNode("div", {
                                    class: "d-flex rounded align-items-center justify-content-center me-3",
                                    style: {
                                      backgroundColor: $data.selectedEvent.color,
                                      width: "26px",
                                      height: "26px"
                                    }
                                  }, null, 4),
                                  createVNode("div", { class: "d-flex flex-column justify-content-center" }, [
                                    createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.client_name}`), 1),
                                    createVNode("label", null, toDisplayString($data.selectedEvent.data.client_contact), 1)
                                  ])
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VProgressLinear, {
            active: $data.loading,
            indeterminate: "",
            color: "cyan"
          }, null, 8, ["active"]),
          createVNode(_component_CCardBody, null, {
            default: withCtx(() => [
              createVNode(_component_CRow, { class: "p-2" }, {
                default: withCtx(() => [
                  createVNode(_component_CCol, { class: "text-left" }, {
                    default: withCtx(() => [
                      createVNode("h4", { class: "card-title mb-0" }, toDisplayString(_ctx.$t("calendar.title")), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CCol, { class: "text-right" }, {
                    default: withCtx(() => [
                      createVNode(_component_CButtonGroup, null, {
                        default: withCtx(() => [
                          (openBlock(true), createBlock(Fragment, null, renderList($data.types, (t2) => {
                            return openBlock(), createBlock(_component_CButton, {
                              key: t2.value,
                              color: t2.value === $data.type ? "primary" : "light",
                              disabled: $data.loading,
                              onClick: ($event) => $options.onTypeChange(t2.value)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(t2.name), 1)
                              ]),
                              _: 2
                            }, 1032, ["color", "disabled", "onClick"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_v_calendar, {
                class: "p-4",
                ref: "calendar",
                modelValue: $data.focus,
                "onUpdate:modelValue": [($event) => $data.focus = $event, $options.getEvents],
                weekdays: $data.weekday,
                "view-mode": $data.type,
                events: $options.events,
                "event-overlap-mode": $data.mode,
                "event-overlap-threshold": 30,
                "onClick:event": $options.showEvent
              }, {
                event: withCtx(({ event }) => [
                  createVNode("div", {
                    class: "d-flex align-items-center rounded shadow-lg cursor-pointer px-2 py-1 m-2",
                    style: {
                      backgroundColor: event.allDay ? "#3462E3" : "#5A5A5A",
                      color: "white"
                    },
                    onClick: ($event) => $options.click(event)
                  }, [
                    createVNode("div", {
                      class: "rounded-circle p-2",
                      style: {
                        backgroundColor: event.color,
                        width: "6px",
                        height: "6px"
                      }
                    }, null, 4),
                    createVNode("span", { class: "px-2" }, toDisplayString(event.title), 1)
                  ], 12, ["onClick"])
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue", "weekdays", "view-mode", "events", "event-overlap-mode", "onClick:event"]),
              $data.selectedEvent ? (openBlock(), createBlock(_component_CRow, {
                key: 0,
                class: "my-4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_CCol, {
                    sm: 12,
                    md: 12
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CCard, null, {
                        default: withCtx(() => [
                          createVNode(_component_CCardBody, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex align-items-center" }, [
                                createVNode("div", {
                                  class: "d-flex rounded align-items-center justify-content-center me-3",
                                  style: {
                                    backgroundColor: $data.selectedEvent.color,
                                    width: "26px",
                                    height: "26px"
                                  }
                                }, null, 4),
                                createVNode("div", { class: "d-flex flex-column justify-content-center" }, [
                                  createVNode("label", null, toDisplayString(`${$data.selectedEvent.data.client_name}`), 1),
                                  createVNode("label", null, toDisplayString($data.selectedEvent.data.client_contact), 1)
                                ])
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/StockCalendar.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const StockCalendar = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$5]]);
const _sfc_main$8 = {
  name: "TextFieldColorPicker",
  props: {
    modelValue: [String, Array]
  },
  data() {
    return {
      mask: "!#XXXXXXXX",
      menu: false
      // value: "#7417BE",
    };
  },
  // watch: {
  //     value: function (val) {
  //         console.log(val);
  //     },
  // },
  // mounted() {
  //     console.log(this.value);
  // },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      }
    },
    swatchStyle() {
      const { value, menu } = this;
      return {
        backgroundColor: value,
        cursor: "pointer",
        height: "30px",
        width: "30px",
        borderRadius: menu ? "50%" : "4px",
        transition: "border-radius 200ms ease-in-out"
      };
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(_attrs)}>`);
  _push(ssrRenderComponent(VMenu, {
    class: "w",
    modelValue: $data.menu,
    "onUpdate:modelValue": ($event) => $data.menu = $event
  }, {
    activator: withCtx(({ props }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VBtn, mergeProps({
          class: "w-100",
          style: { backgroundColor: $options.value, color: "white" }
        }, props), {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`${ssrInterpolate($options.value)}`);
            } else {
              return [
                createTextVNode(toDisplayString($options.value), 1)
              ];
            }
          }),
          _: 2
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VBtn, mergeProps({
            class: "w-100",
            style: { backgroundColor: $options.value, color: "white" }
          }, props), {
            default: withCtx(() => [
              createTextVNode(toDisplayString($options.value), 1)
            ]),
            _: 2
          }, 1040, ["style"])
        ];
      }
    }),
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCard, {
          color: "transparent",
          elevation: "0",
          outlined: ""
        }, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VColorPicker, {
                class: "mx-auto",
                modelValue: $options.value,
                "onUpdate:modelValue": ($event) => $options.value = $event,
                "hide-canvas": "",
                "hide-inputs": "",
                "show-swatches": "",
                border: false
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(VColorPicker, {
                  class: "mx-auto",
                  modelValue: $options.value,
                  "onUpdate:modelValue": ($event) => $options.value = $event,
                  "hide-canvas": "",
                  "hide-inputs": "",
                  "show-swatches": "",
                  border: false
                }, null, 8, ["modelValue", "onUpdate:modelValue"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(VCard, {
            color: "transparent",
            elevation: "0",
            outlined: ""
          }, {
            default: withCtx(() => [
              createVNode(VColorPicker, {
                class: "mx-auto",
                modelValue: $options.value,
                "onUpdate:modelValue": ($event) => $options.value = $event,
                "hide-canvas": "",
                "hide-inputs": "",
                "show-swatches": "",
                border: false
              }, null, 8, ["modelValue", "onUpdate:modelValue"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/components/TextFieldColorPicker.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const TextFieldColorPicker = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$4]]);
const { colorMode } = useColorModes("unstoppable-trading-theme");
const vuetify = createVuetify({
  theme: {
    defaultTheme: colorMode.value
  },
  components: {
    ...components,
    ...labsComponents
  },
  directives
});
const _sfc_main$7 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_CFooter = resolveComponent("CFooter");
  _push(ssrRenderComponent(_component_CFooter, mergeProps({ fixed: false }, _attrs), {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div${_scopeId}><span class="ml-1"${_scopeId}>© ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())} 永行貿易有限公司.</span></div><div class="ml-auto"${_scopeId}><span class="mr-1"${_scopeId}>Powered by</span><a href="／" target="_blank"${_scopeId}>永行貿易有限公司</a></div>`);
      } else {
        return [
          createVNode("div", null, [
            createVNode("span", { class: "ml-1" }, "© " + toDisplayString((/* @__PURE__ */ new Date()).getFullYear()) + " 永行貿易有限公司.", 1)
          ]),
          createVNode("div", { class: "ml-auto" }, [
            createVNode("span", { class: "mr-1" }, "Powered by"),
            createVNode("a", {
              href: "／",
              target: "_blank"
            }, "永行貿易有限公司")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/containers/TheFooter.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const TheFooter = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$3]]);
const _sfc_main$6 = {
  __name: "TheBreadcrumb",
  __ssrInlineRender: true,
  setup(__props) {
    const breadcrumbs = ref();
    const getBreadcrumbs = () => {
      return router$2.currentRoute.value.matched.map((route2) => {
        return {
          active: route2.path === router$2.currentRoute.value.fullPath,
          name: route2.name,
          path: `${router$2.options.history.base}${route2.path}`
        };
      });
    };
    router$2.afterEach(() => {
      breadcrumbs.value = getBreadcrumbs();
    });
    onMounted(() => {
      breadcrumbs.value = getBreadcrumbs();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CBreadcrumb = resolveComponent("CBreadcrumb");
      const _component_CBreadcrumbItem = resolveComponent("CBreadcrumbItem");
      _push(ssrRenderComponent(_component_CBreadcrumb, mergeProps({ class: "my-0" }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(breadcrumbs.value, (item) => {
              _push2(ssrRenderComponent(_component_CBreadcrumbItem, {
                key: item,
                href: item.active ? "" : item.path,
                active: item.active
              }, {
                default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t(item.name))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t(item.name)), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(breadcrumbs.value, (item) => {
                return openBlock(), createBlock(_component_CBreadcrumbItem, {
                  key: item,
                  href: item.active ? "" : item.path,
                  active: item.active
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t(item.name)), 1)
                  ]),
                  _: 2
                }, 1032, ["href", "active"]);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/containers/TheBreadcrumb.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = {
  name: "TheHeaderDropdownAccnt",
  computed: {
    avatar() {
      var _a;
      return `https://www.gravatar.com/avatar/${(_a = this.$store.getters.authUser) == null ? void 0 : _a.email}?s=160&d=retro`;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push({ path: "/login" });
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CDropdown = resolveComponent("CDropdown");
  const _component_CDropdownToggle = resolveComponent("CDropdownToggle");
  const _component_CAvatar = resolveComponent("CAvatar");
  const _component_CDropdownMenu = resolveComponent("CDropdownMenu");
  const _component_CDropdownHeader = resolveComponent("CDropdownHeader");
  const _component_CDropdownItem = resolveComponent("CDropdownItem");
  const _component_CIcon = resolveComponent("CIcon");
  _push(ssrRenderComponent(_component_CDropdown, mergeProps({
    placement: "bottom-end",
    variant: "nav-item"
  }, _attrs), {
    default: withCtx((_2, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_CDropdownToggle, {
          class: "py-0 pe-0",
          caret: false
        }, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CAvatar, {
                src: $options.avatar,
                size: "md"
              }, null, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CAvatar, {
                  src: $options.avatar,
                  size: "md"
                }, null, 8, ["src"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_CDropdownMenu, { class: "pt-0" }, {
          default: withCtx((_3, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(_component_CDropdownHeader, {
                component: "h6",
                class: "bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
              }, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`${ssrInterpolate(_ctx.$t("account"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("account")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_CDropdownItem, { href: "#/profile" }, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CIcon, { icon: "cil-user" }, null, _parent4, _scopeId3));
                    _push4(` ${ssrInterpolate(_ctx.$t("profile"))}`);
                  } else {
                    return [
                      createVNode(_component_CIcon, { icon: "cil-user" }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("profile")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
              if (_ctx.$store.getters.isEmployee) {
                _push3(ssrRenderComponent(_component_CDropdownItem, { href: "#/leaves" }, {
                  default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_CIcon, { name: "cil-description" }, null, _parent4, _scopeId3));
                      _push4(` ${ssrInterpolate(_ctx.$t("leave"))}`);
                    } else {
                      return [
                        createVNode(_component_CIcon, { name: "cil-description" }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("leave")), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                _push3(`<!---->`);
              }
              _push3(ssrRenderComponent(_component_CDropdownItem, { onClick: $options.logout }, {
                default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(_component_CIcon, { icon: "cil-lock-locked" }, null, _parent4, _scopeId3));
                    _push4(` ${ssrInterpolate(_ctx.$t("logout"))}`);
                  } else {
                    return [
                      createVNode(_component_CIcon, { icon: "cil-lock-locked" }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("logout")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent3, _scopeId2));
            } else {
              return [
                createVNode(_component_CDropdownHeader, {
                  component: "h6",
                  class: "bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("account")), 1)
                  ]),
                  _: 1
                }),
                createVNode(_component_CDropdownItem, { href: "#/profile" }, {
                  default: withCtx(() => [
                    createVNode(_component_CIcon, { icon: "cil-user" }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("profile")), 1)
                  ]),
                  _: 1
                }),
                _ctx.$store.getters.isEmployee ? (openBlock(), createBlock(_component_CDropdownItem, {
                  key: 0,
                  href: "#/leaves"
                }, {
                  default: withCtx(() => [
                    createVNode(_component_CIcon, { name: "cil-description" }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("leave")), 1)
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                createVNode(_component_CDropdownItem, { onClick: $options.logout }, {
                  default: withCtx(() => [
                    createVNode(_component_CIcon, { icon: "cil-lock-locked" }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("logout")), 1)
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_CDropdownToggle, {
            class: "py-0 pe-0",
            caret: false
          }, {
            default: withCtx(() => [
              createVNode(_component_CAvatar, {
                src: $options.avatar,
                size: "md"
              }, null, 8, ["src"])
            ]),
            _: 1
          }),
          createVNode(_component_CDropdownMenu, { class: "pt-0" }, {
            default: withCtx(() => [
              createVNode(_component_CDropdownHeader, {
                component: "h6",
                class: "bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("account")), 1)
                ]),
                _: 1
              }),
              createVNode(_component_CDropdownItem, { href: "#/profile" }, {
                default: withCtx(() => [
                  createVNode(_component_CIcon, { icon: "cil-user" }),
                  createTextVNode(" " + toDisplayString(_ctx.$t("profile")), 1)
                ]),
                _: 1
              }),
              _ctx.$store.getters.isEmployee ? (openBlock(), createBlock(_component_CDropdownItem, {
                key: 0,
                href: "#/leaves"
              }, {
                default: withCtx(() => [
                  createVNode(_component_CIcon, { name: "cil-description" }),
                  createTextVNode(" " + toDisplayString(_ctx.$t("leave")), 1)
                ]),
                _: 1
              })) : createCommentVNode("", true),
              createVNode(_component_CDropdownItem, { onClick: $options.logout }, {
                default: withCtx(() => [
                  createVNode(_component_CIcon, { icon: "cil-lock-locked" }),
                  createTextVNode(" " + toDisplayString(_ctx.$t("logout")), 1)
                ]),
                _: 1
              }, 8, ["onClick"])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/containers/TheHeaderDropdownAccnt.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const TheHeaderDropdownAccnt = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-9a5e2543"]]);
const _sfc_main$4 = {
  name: "TheHeaderDropdownShipping",
  computed: {
    ...mapState(["goods/shipping-cart"]),
    data() {
      return this["goods/shipping-cart"].items;
    }
  },
  methods: {
    clear() {
      this.$store.dispatch("goods/shipping-cart/clear");
    },
    show() {
      return this.data.length > 0 ? true : false;
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_CHeaderNav = resolveComponent("CHeaderNav");
  const _component_CDropdown = resolveComponent("CDropdown");
  const _component_CDropdownToggle = resolveComponent("CDropdownToggle");
  const _component_CIcon = resolveComponent("CIcon");
  const _component_CBadge = resolveComponent("CBadge");
  const _component_CDropdownMenu = resolveComponent("CDropdownMenu");
  const _component_CDropdownHeader = resolveComponent("CDropdownHeader");
  const _component_CDropdownItem = resolveComponent("CDropdownItem");
  if ($options.show()) {
    _push(ssrRenderComponent(_component_CHeaderNav, _attrs, {
      default: withCtx((_2, _push2, _parent2, _scopeId) => {
        if (_push2) {
          _push2(ssrRenderComponent(_component_CDropdown, {
            variant: "nav-item",
            placement: "bottom-end"
          }, {
            default: withCtx((_3, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(ssrRenderComponent(_component_CDropdownToggle, { caret: false }, {
                  default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(`<div class="d-flex align-items-center justify-content-center"${_scopeId3}>`);
                      _push4(ssrRenderComponent(_component_CIcon, {
                        class: "me-2",
                        name: "cil-truck"
                      }, null, _parent4, _scopeId3));
                      _push4(ssrRenderComponent(_component_CBadge, {
                        color: "danger",
                        position: "top-end",
                        shape: "rounded-pill"
                      }, {
                        default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`${ssrInterpolate($options.data.length > 99 ? "99+" : $options.data.length)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString($options.data.length > 99 ? "99+" : $options.data.length), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                      _push4(` ${ssrInterpolate(_ctx.$t("shipping.cart"))}</div>`);
                    } else {
                      return [
                        createVNode("div", { class: "d-flex align-items-center justify-content-center" }, [
                          createVNode(_component_CIcon, {
                            class: "me-2",
                            name: "cil-truck"
                          }),
                          createVNode(_component_CBadge, {
                            color: "danger",
                            position: "top-end",
                            shape: "rounded-pill"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString($options.data.length > 99 ? "99+" : $options.data.length), 1)
                            ]),
                            _: 1
                          }),
                          createTextVNode(" " + toDisplayString(_ctx.$t("shipping.cart")), 1)
                        ])
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
                _push3(ssrRenderComponent(_component_CDropdownMenu, { class: "pt-0" }, {
                  default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                    if (_push4) {
                      _push4(ssrRenderComponent(_component_CDropdownHeader, {
                        component: "h6",
                        class: "bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
                      }, {
                        default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(`<strong${_scopeId4}>${ssrInterpolate(_ctx.$t("shippings.title"))}${ssrInterpolate(_ctx.$t("table"))}</strong>`);
                          } else {
                            return [
                              createVNode("strong", null, toDisplayString(_ctx.$t("shippings.title")) + toDisplayString(_ctx.$t("table")), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                      if ($options.show()) {
                        _push4(`<div${_scopeId3}><!--[-->`);
                        ssrRenderList($options.data, (item) => {
                          _push4(ssrRenderComponent(_component_CDropdownItem, {
                            key: item.id
                          }, {
                            default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(item.goods.name)} － ${ssrInterpolate(item.color)} ${ssrInterpolate(item.size)} － ${ssrInterpolate(_ctx.$t("unit"))} ${ssrInterpolate(item.unit)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(item.goods.name) + " － " + toDisplayString(item.color) + " " + toDisplayString(item.size) + " － " + toDisplayString(_ctx.$t("unit")) + " " + toDisplayString(item.unit), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]--></div>`);
                      } else {
                        _push4(`<div${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_CDropdownItem, null, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(_ctx.$t("empty"))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(_ctx.$t("empty")), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      }
                      _push4(ssrRenderComponent(_component_CDropdownItem, { href: "#/shippings/create" }, {
                        default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(_component_CIcon, { icon: "cil-check-alt" }, null, _parent5, _scopeId4));
                            _push5(` ${ssrInterpolate(_ctx.$t("button.confirm"))}`);
                          } else {
                            return [
                              createVNode(_component_CIcon, { icon: "cil-check-alt" }),
                              createTextVNode(" " + toDisplayString(_ctx.$t("button.confirm")), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                      _push4(ssrRenderComponent(_component_CDropdownItem, { onClick: $options.clear }, {
                        default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                          if (_push5) {
                            _push5(ssrRenderComponent(_component_CIcon, { icon: "cil-x" }, null, _parent5, _scopeId4));
                            _push5(` ${ssrInterpolate(_ctx.$t("button.clear"))}`);
                          } else {
                            return [
                              createVNode(_component_CIcon, { icon: "cil-x" }),
                              createTextVNode(" " + toDisplayString(_ctx.$t("button.clear")), 1)
                            ];
                          }
                        }),
                        _: 1
                      }, _parent4, _scopeId3));
                    } else {
                      return [
                        createVNode(_component_CDropdownHeader, {
                          component: "h6",
                          class: "bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
                        }, {
                          default: withCtx(() => [
                            createVNode("strong", null, toDisplayString(_ctx.$t("shippings.title")) + toDisplayString(_ctx.$t("table")), 1)
                          ]),
                          _: 1
                        }),
                        $options.show() ? (openBlock(), createBlock("div", { key: 0 }, [
                          (openBlock(true), createBlock(Fragment, null, renderList($options.data, (item) => {
                            return openBlock(), createBlock(_component_CDropdownItem, {
                              key: item.id
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item.goods.name) + " － " + toDisplayString(item.color) + " " + toDisplayString(item.size) + " － " + toDisplayString(_ctx.$t("unit")) + " " + toDisplayString(item.unit), 1)
                              ]),
                              _: 2
                            }, 1024);
                          }), 128))
                        ])) : (openBlock(), createBlock("div", { key: 1 }, [
                          createVNode(_component_CDropdownItem, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("empty")), 1)
                            ]),
                            _: 1
                          })
                        ])),
                        createVNode(_component_CDropdownItem, { href: "#/shippings/create" }, {
                          default: withCtx(() => [
                            createVNode(_component_CIcon, { icon: "cil-check-alt" }),
                            createTextVNode(" " + toDisplayString(_ctx.$t("button.confirm")), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_CDropdownItem, { onClick: $options.clear }, {
                          default: withCtx(() => [
                            createVNode(_component_CIcon, { icon: "cil-x" }),
                            createTextVNode(" " + toDisplayString(_ctx.$t("button.clear")), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ];
                    }
                  }),
                  _: 1
                }, _parent3, _scopeId2));
              } else {
                return [
                  createVNode(_component_CDropdownToggle, { caret: false }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "d-flex align-items-center justify-content-center" }, [
                        createVNode(_component_CIcon, {
                          class: "me-2",
                          name: "cil-truck"
                        }),
                        createVNode(_component_CBadge, {
                          color: "danger",
                          position: "top-end",
                          shape: "rounded-pill"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString($options.data.length > 99 ? "99+" : $options.data.length), 1)
                          ]),
                          _: 1
                        }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("shipping.cart")), 1)
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CDropdownMenu, { class: "pt-0" }, {
                    default: withCtx(() => [
                      createVNode(_component_CDropdownHeader, {
                        component: "h6",
                        class: "bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
                      }, {
                        default: withCtx(() => [
                          createVNode("strong", null, toDisplayString(_ctx.$t("shippings.title")) + toDisplayString(_ctx.$t("table")), 1)
                        ]),
                        _: 1
                      }),
                      $options.show() ? (openBlock(), createBlock("div", { key: 0 }, [
                        (openBlock(true), createBlock(Fragment, null, renderList($options.data, (item) => {
                          return openBlock(), createBlock(_component_CDropdownItem, {
                            key: item.id
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(item.goods.name) + " － " + toDisplayString(item.color) + " " + toDisplayString(item.size) + " － " + toDisplayString(_ctx.$t("unit")) + " " + toDisplayString(item.unit), 1)
                            ]),
                            _: 2
                          }, 1024);
                        }), 128))
                      ])) : (openBlock(), createBlock("div", { key: 1 }, [
                        createVNode(_component_CDropdownItem, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(_ctx.$t("empty")), 1)
                          ]),
                          _: 1
                        })
                      ])),
                      createVNode(_component_CDropdownItem, { href: "#/shippings/create" }, {
                        default: withCtx(() => [
                          createVNode(_component_CIcon, { icon: "cil-check-alt" }),
                          createTextVNode(" " + toDisplayString(_ctx.$t("button.confirm")), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_CDropdownItem, { onClick: $options.clear }, {
                        default: withCtx(() => [
                          createVNode(_component_CIcon, { icon: "cil-x" }),
                          createTextVNode(" " + toDisplayString(_ctx.$t("button.clear")), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 1
          }, _parent2, _scopeId));
        } else {
          return [
            createVNode(_component_CDropdown, {
              variant: "nav-item",
              placement: "bottom-end"
            }, {
              default: withCtx(() => [
                createVNode(_component_CDropdownToggle, { caret: false }, {
                  default: withCtx(() => [
                    createVNode("div", { class: "d-flex align-items-center justify-content-center" }, [
                      createVNode(_component_CIcon, {
                        class: "me-2",
                        name: "cil-truck"
                      }),
                      createVNode(_component_CBadge, {
                        color: "danger",
                        position: "top-end",
                        shape: "rounded-pill"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString($options.data.length > 99 ? "99+" : $options.data.length), 1)
                        ]),
                        _: 1
                      }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("shipping.cart")), 1)
                    ])
                  ]),
                  _: 1
                }),
                createVNode(_component_CDropdownMenu, { class: "pt-0" }, {
                  default: withCtx(() => [
                    createVNode(_component_CDropdownHeader, {
                      component: "h6",
                      class: "bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
                    }, {
                      default: withCtx(() => [
                        createVNode("strong", null, toDisplayString(_ctx.$t("shippings.title")) + toDisplayString(_ctx.$t("table")), 1)
                      ]),
                      _: 1
                    }),
                    $options.show() ? (openBlock(), createBlock("div", { key: 0 }, [
                      (openBlock(true), createBlock(Fragment, null, renderList($options.data, (item) => {
                        return openBlock(), createBlock(_component_CDropdownItem, {
                          key: item.id
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(item.goods.name) + " － " + toDisplayString(item.color) + " " + toDisplayString(item.size) + " － " + toDisplayString(_ctx.$t("unit")) + " " + toDisplayString(item.unit), 1)
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ])) : (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode(_component_CDropdownItem, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.$t("empty")), 1)
                        ]),
                        _: 1
                      })
                    ])),
                    createVNode(_component_CDropdownItem, { href: "#/shippings/create" }, {
                      default: withCtx(() => [
                        createVNode(_component_CIcon, { icon: "cil-check-alt" }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("button.confirm")), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CDropdownItem, { onClick: $options.clear }, {
                      default: withCtx(() => [
                        createVNode(_component_CIcon, { icon: "cil-x" }),
                        createTextVNode(" " + toDisplayString(_ctx.$t("button.clear")), 1)
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ]),
              _: 1
            })
          ];
        }
      }),
      _: 1
    }, _parent));
  } else {
    _push(`<!---->`);
  }
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/containers/TheHeaderDropdownShipping.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const TheHeaderDropdownShipping = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$1]]);
const __default__$1 = {
  components: {
    TheHeaderDropdownAccnt,
    TheHeaderDropdownShipping,
    AddNewShippingItemsTableDialog
  },
  computed: {
    ...mapState(["ui/sidebar"])
  },
  methods: {
    toggleVisible() {
      this.$store.dispatch("ui/sidebar/toggleVisible");
    },
    async showNewShippingItemsTable() {
      await this.$refs.newShippingItemsTableDialog.open();
    }
  }
};
const _sfc_main$3 = /* @__PURE__ */ Object.assign(__default__$1, {
  __name: "TheHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const headerClassNames = ref("mb-4 p-0");
    const theme = useTheme();
    const { colorMode: colorMode2, setColorMode } = useColorModes("unstoppable-trading-theme");
    onMounted(() => {
      document.addEventListener("scroll", () => {
        if (document.documentElement.scrollTop > 0) {
          headerClassNames.value = "mb-4 p-0 shadow-sm";
        } else {
          headerClassNames.value = "mb-4 p-0";
        }
      });
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CHeader = resolveComponent("CHeader");
      const _component_CContainer = resolveComponent("CContainer");
      const _component_CHeaderToggler = resolveComponent("CHeaderToggler");
      const _component_CIcon = resolveComponent("CIcon");
      const _component_CHeaderNav = resolveComponent("CHeaderNav");
      const _component_CNavItem = resolveComponent("CNavItem");
      const _component_CNavLink = resolveComponent("CNavLink");
      const _component_CDropdown = resolveComponent("CDropdown");
      const _component_CDropdownToggle = resolveComponent("CDropdownToggle");
      const _component_CDropdownMenu = resolveComponent("CDropdownMenu");
      const _component_CDropdownItem = resolveComponent("CDropdownItem");
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(AddNewShippingItemsTableDialog), { ref: "newShippingItemsTableDialog" }, null, _parent));
      _push(ssrRenderComponent(_component_CHeader, {
        position: "sticky",
        class: headerClassNames.value
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CContainer, {
              class: "border-bottom px-4",
              fluid: ""
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CHeaderToggler, {
                    onClick: ($event) => _ctx.toggleVisible(),
                    style: { "margin-inline-start": "-14px" }
                  }, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CIcon, {
                          icon: "cil-menu",
                          size: "lg"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CIcon, {
                            icon: "cil-menu",
                            size: "lg"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CHeaderNav, { class: "ms-auto" }, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CNavItem, null, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CNavLink, {
                                onClick: _ctx.showNewShippingItemsTable,
                                role: "button"
                              }, {
                                default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="d-flex align-items-center justify-content-center"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(_component_CIcon, {
                                      class: "me-2",
                                      icon: "cil-playlist-add",
                                      size: "lg"
                                    }, null, _parent6, _scopeId5));
                                    _push6(` ${ssrInterpolate(_ctx.$t("shipping.add-shipment-goods"))}</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "d-flex align-items-center justify-content-center" }, [
                                        createVNode(_component_CIcon, {
                                          class: "me-2",
                                          icon: "cil-playlist-add",
                                          size: "lg"
                                        }),
                                        createTextVNode(" " + toDisplayString(_ctx.$t("shipping.add-shipment-goods")), 1)
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CNavLink, {
                                  onClick: _ctx.showNewShippingItemsTable,
                                  role: "button"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "d-flex align-items-center justify-content-center" }, [
                                      createVNode(_component_CIcon, {
                                        class: "me-2",
                                        icon: "cil-playlist-add",
                                        size: "lg"
                                      }),
                                      createTextVNode(" " + toDisplayString(_ctx.$t("shipping.add-shipment-goods")), 1)
                                    ])
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CNavItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_CNavLink, {
                                onClick: _ctx.showNewShippingItemsTable,
                                role: "button"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "d-flex align-items-center justify-content-center" }, [
                                    createVNode(_component_CIcon, {
                                      class: "me-2",
                                      icon: "cil-playlist-add",
                                      size: "lg"
                                    }),
                                    createTextVNode(" " + toDisplayString(_ctx.$t("shipping.add-shipment-goods")), 1)
                                  ])
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(TheHeaderDropdownShipping, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CHeaderNav, null, {
                    default: withCtx((_4, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<li class="nav-item py-1"${_scopeId3}><div class="vr h-100 mx-2 text-body text-opacity-75"${_scopeId3}></div></li>`);
                        _push4(ssrRenderComponent(_component_CDropdown, {
                          variant: "nav-item",
                          placement: "bottom-end"
                        }, {
                          default: withCtx((_5, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CDropdownToggle, { caret: false }, {
                                default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    if (unref(colorMode2) === "dark") {
                                      _push6(ssrRenderComponent(_component_CIcon, {
                                        icon: "cil-moon",
                                        size: "lg"
                                      }, null, _parent6, _scopeId5));
                                    } else if (unref(colorMode2) === "light") {
                                      _push6(ssrRenderComponent(_component_CIcon, {
                                        icon: "cil-sun",
                                        size: "lg"
                                      }, null, _parent6, _scopeId5));
                                    } else {
                                      _push6(ssrRenderComponent(_component_CIcon, {
                                        icon: "cil-contrast",
                                        size: "lg"
                                      }, null, _parent6, _scopeId5));
                                    }
                                  } else {
                                    return [
                                      unref(colorMode2) === "dark" ? (openBlock(), createBlock(_component_CIcon, {
                                        key: 0,
                                        icon: "cil-moon",
                                        size: "lg"
                                      })) : unref(colorMode2) === "light" ? (openBlock(), createBlock(_component_CIcon, {
                                        key: 1,
                                        icon: "cil-sun",
                                        size: "lg"
                                      })) : (openBlock(), createBlock(_component_CIcon, {
                                        key: 2,
                                        icon: "cil-contrast",
                                        size: "lg"
                                      }))
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_CDropdownMenu, null, {
                                default: withCtx((_6, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_CDropdownItem, {
                                      active: unref(colorMode2) === "light",
                                      class: "d-flex align-items-center",
                                      component: "button",
                                      type: "button",
                                      onClick: () => {
                                        unref(theme).global.name.value = "light";
                                        unref(setColorMode)("light");
                                      }
                                    }, {
                                      default: withCtx((_7, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_CIcon, {
                                            class: "me-2",
                                            icon: "cil-sun",
                                            size: "lg"
                                          }, null, _parent7, _scopeId6));
                                          _push7(` Light `);
                                        } else {
                                          return [
                                            createVNode(_component_CIcon, {
                                              class: "me-2",
                                              icon: "cil-sun",
                                              size: "lg"
                                            }),
                                            createTextVNode(" Light ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_CDropdownItem, {
                                      active: unref(colorMode2) === "dark",
                                      class: "d-flex align-items-center",
                                      component: "button",
                                      type: "button",
                                      onClick: () => {
                                        unref(theme).global.name.value = "dark";
                                        unref(setColorMode)("dark");
                                      }
                                    }, {
                                      default: withCtx((_7, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_CIcon, {
                                            class: "me-2",
                                            icon: "cil-moon",
                                            size: "lg"
                                          }, null, _parent7, _scopeId6));
                                          _push7(` Dark `);
                                        } else {
                                          return [
                                            createVNode(_component_CIcon, {
                                              class: "me-2",
                                              icon: "cil-moon",
                                              size: "lg"
                                            }),
                                            createTextVNode(" Dark ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_CDropdownItem, {
                                      active: unref(colorMode2) === "auto",
                                      class: "d-flex align-items-center",
                                      component: "button",
                                      type: "button",
                                      onClick: ($event) => unref(setColorMode)("auto")
                                    }, {
                                      default: withCtx((_7, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_CIcon, {
                                            class: "me-2",
                                            icon: "cil-contrast",
                                            size: "lg"
                                          }, null, _parent7, _scopeId6));
                                          _push7(` Auto `);
                                        } else {
                                          return [
                                            createVNode(_component_CIcon, {
                                              class: "me-2",
                                              icon: "cil-contrast",
                                              size: "lg"
                                            }),
                                            createTextVNode(" Auto ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_CDropdownItem, {
                                        active: unref(colorMode2) === "light",
                                        class: "d-flex align-items-center",
                                        component: "button",
                                        type: "button",
                                        onClick: () => {
                                          unref(theme).global.name.value = "light";
                                          unref(setColorMode)("light");
                                        }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_CIcon, {
                                            class: "me-2",
                                            icon: "cil-sun",
                                            size: "lg"
                                          }),
                                          createTextVNode(" Light ")
                                        ]),
                                        _: 1
                                      }, 8, ["active", "onClick"]),
                                      createVNode(_component_CDropdownItem, {
                                        active: unref(colorMode2) === "dark",
                                        class: "d-flex align-items-center",
                                        component: "button",
                                        type: "button",
                                        onClick: () => {
                                          unref(theme).global.name.value = "dark";
                                          unref(setColorMode)("dark");
                                        }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_CIcon, {
                                            class: "me-2",
                                            icon: "cil-moon",
                                            size: "lg"
                                          }),
                                          createTextVNode(" Dark ")
                                        ]),
                                        _: 1
                                      }, 8, ["active", "onClick"]),
                                      createVNode(_component_CDropdownItem, {
                                        active: unref(colorMode2) === "auto",
                                        class: "d-flex align-items-center",
                                        component: "button",
                                        type: "button",
                                        onClick: ($event) => unref(setColorMode)("auto")
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_CIcon, {
                                            class: "me-2",
                                            icon: "cil-contrast",
                                            size: "lg"
                                          }),
                                          createTextVNode(" Auto ")
                                        ]),
                                        _: 1
                                      }, 8, ["active", "onClick"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CDropdownToggle, { caret: false }, {
                                  default: withCtx(() => [
                                    unref(colorMode2) === "dark" ? (openBlock(), createBlock(_component_CIcon, {
                                      key: 0,
                                      icon: "cil-moon",
                                      size: "lg"
                                    })) : unref(colorMode2) === "light" ? (openBlock(), createBlock(_component_CIcon, {
                                      key: 1,
                                      icon: "cil-sun",
                                      size: "lg"
                                    })) : (openBlock(), createBlock(_component_CIcon, {
                                      key: 2,
                                      icon: "cil-contrast",
                                      size: "lg"
                                    }))
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_CDropdownMenu, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_CDropdownItem, {
                                      active: unref(colorMode2) === "light",
                                      class: "d-flex align-items-center",
                                      component: "button",
                                      type: "button",
                                      onClick: () => {
                                        unref(theme).global.name.value = "light";
                                        unref(setColorMode)("light");
                                      }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_CIcon, {
                                          class: "me-2",
                                          icon: "cil-sun",
                                          size: "lg"
                                        }),
                                        createTextVNode(" Light ")
                                      ]),
                                      _: 1
                                    }, 8, ["active", "onClick"]),
                                    createVNode(_component_CDropdownItem, {
                                      active: unref(colorMode2) === "dark",
                                      class: "d-flex align-items-center",
                                      component: "button",
                                      type: "button",
                                      onClick: () => {
                                        unref(theme).global.name.value = "dark";
                                        unref(setColorMode)("dark");
                                      }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_CIcon, {
                                          class: "me-2",
                                          icon: "cil-moon",
                                          size: "lg"
                                        }),
                                        createTextVNode(" Dark ")
                                      ]),
                                      _: 1
                                    }, 8, ["active", "onClick"]),
                                    createVNode(_component_CDropdownItem, {
                                      active: unref(colorMode2) === "auto",
                                      class: "d-flex align-items-center",
                                      component: "button",
                                      type: "button",
                                      onClick: ($event) => unref(setColorMode)("auto")
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_CIcon, {
                                          class: "me-2",
                                          icon: "cil-contrast",
                                          size: "lg"
                                        }),
                                        createTextVNode(" Auto ")
                                      ]),
                                      _: 1
                                    }, 8, ["active", "onClick"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<li class="nav-item py-1"${_scopeId3}><div class="vr h-100 mx-2 text-body text-opacity-75"${_scopeId3}></div></li>`);
                        _push4(ssrRenderComponent(TheHeaderDropdownAccnt, null, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("li", { class: "nav-item py-1" }, [
                            createVNode("div", { class: "vr h-100 mx-2 text-body text-opacity-75" })
                          ]),
                          createVNode(_component_CDropdown, {
                            variant: "nav-item",
                            placement: "bottom-end"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CDropdownToggle, { caret: false }, {
                                default: withCtx(() => [
                                  unref(colorMode2) === "dark" ? (openBlock(), createBlock(_component_CIcon, {
                                    key: 0,
                                    icon: "cil-moon",
                                    size: "lg"
                                  })) : unref(colorMode2) === "light" ? (openBlock(), createBlock(_component_CIcon, {
                                    key: 1,
                                    icon: "cil-sun",
                                    size: "lg"
                                  })) : (openBlock(), createBlock(_component_CIcon, {
                                    key: 2,
                                    icon: "cil-contrast",
                                    size: "lg"
                                  }))
                                ]),
                                _: 1
                              }),
                              createVNode(_component_CDropdownMenu, null, {
                                default: withCtx(() => [
                                  createVNode(_component_CDropdownItem, {
                                    active: unref(colorMode2) === "light",
                                    class: "d-flex align-items-center",
                                    component: "button",
                                    type: "button",
                                    onClick: () => {
                                      unref(theme).global.name.value = "light";
                                      unref(setColorMode)("light");
                                    }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_CIcon, {
                                        class: "me-2",
                                        icon: "cil-sun",
                                        size: "lg"
                                      }),
                                      createTextVNode(" Light ")
                                    ]),
                                    _: 1
                                  }, 8, ["active", "onClick"]),
                                  createVNode(_component_CDropdownItem, {
                                    active: unref(colorMode2) === "dark",
                                    class: "d-flex align-items-center",
                                    component: "button",
                                    type: "button",
                                    onClick: () => {
                                      unref(theme).global.name.value = "dark";
                                      unref(setColorMode)("dark");
                                    }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_CIcon, {
                                        class: "me-2",
                                        icon: "cil-moon",
                                        size: "lg"
                                      }),
                                      createTextVNode(" Dark ")
                                    ]),
                                    _: 1
                                  }, 8, ["active", "onClick"]),
                                  createVNode(_component_CDropdownItem, {
                                    active: unref(colorMode2) === "auto",
                                    class: "d-flex align-items-center",
                                    component: "button",
                                    type: "button",
                                    onClick: ($event) => unref(setColorMode)("auto")
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_CIcon, {
                                        class: "me-2",
                                        icon: "cil-contrast",
                                        size: "lg"
                                      }),
                                      createTextVNode(" Auto ")
                                    ]),
                                    _: 1
                                  }, 8, ["active", "onClick"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("li", { class: "nav-item py-1" }, [
                            createVNode("div", { class: "vr h-100 mx-2 text-body text-opacity-75" })
                          ]),
                          createVNode(TheHeaderDropdownAccnt)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CHeaderToggler, {
                      onClick: ($event) => _ctx.toggleVisible(),
                      style: { "margin-inline-start": "-14px" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_CIcon, {
                          icon: "cil-menu",
                          size: "lg"
                        })
                      ]),
                      _: 1
                    }, 8, ["onClick"]),
                    createVNode(_component_CHeaderNav, { class: "ms-auto" }, {
                      default: withCtx(() => [
                        createVNode(_component_CNavItem, null, {
                          default: withCtx(() => [
                            createVNode(_component_CNavLink, {
                              onClick: _ctx.showNewShippingItemsTable,
                              role: "button"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "d-flex align-items-center justify-content-center" }, [
                                  createVNode(_component_CIcon, {
                                    class: "me-2",
                                    icon: "cil-playlist-add",
                                    size: "lg"
                                  }),
                                  createTextVNode(" " + toDisplayString(_ctx.$t("shipping.add-shipment-goods")), 1)
                                ])
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(TheHeaderDropdownShipping),
                    createVNode(_component_CHeaderNav, null, {
                      default: withCtx(() => [
                        createVNode("li", { class: "nav-item py-1" }, [
                          createVNode("div", { class: "vr h-100 mx-2 text-body text-opacity-75" })
                        ]),
                        createVNode(_component_CDropdown, {
                          variant: "nav-item",
                          placement: "bottom-end"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CDropdownToggle, { caret: false }, {
                              default: withCtx(() => [
                                unref(colorMode2) === "dark" ? (openBlock(), createBlock(_component_CIcon, {
                                  key: 0,
                                  icon: "cil-moon",
                                  size: "lg"
                                })) : unref(colorMode2) === "light" ? (openBlock(), createBlock(_component_CIcon, {
                                  key: 1,
                                  icon: "cil-sun",
                                  size: "lg"
                                })) : (openBlock(), createBlock(_component_CIcon, {
                                  key: 2,
                                  icon: "cil-contrast",
                                  size: "lg"
                                }))
                              ]),
                              _: 1
                            }),
                            createVNode(_component_CDropdownMenu, null, {
                              default: withCtx(() => [
                                createVNode(_component_CDropdownItem, {
                                  active: unref(colorMode2) === "light",
                                  class: "d-flex align-items-center",
                                  component: "button",
                                  type: "button",
                                  onClick: () => {
                                    unref(theme).global.name.value = "light";
                                    unref(setColorMode)("light");
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CIcon, {
                                      class: "me-2",
                                      icon: "cil-sun",
                                      size: "lg"
                                    }),
                                    createTextVNode(" Light ")
                                  ]),
                                  _: 1
                                }, 8, ["active", "onClick"]),
                                createVNode(_component_CDropdownItem, {
                                  active: unref(colorMode2) === "dark",
                                  class: "d-flex align-items-center",
                                  component: "button",
                                  type: "button",
                                  onClick: () => {
                                    unref(theme).global.name.value = "dark";
                                    unref(setColorMode)("dark");
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CIcon, {
                                      class: "me-2",
                                      icon: "cil-moon",
                                      size: "lg"
                                    }),
                                    createTextVNode(" Dark ")
                                  ]),
                                  _: 1
                                }, 8, ["active", "onClick"]),
                                createVNode(_component_CDropdownItem, {
                                  active: unref(colorMode2) === "auto",
                                  class: "d-flex align-items-center",
                                  component: "button",
                                  type: "button",
                                  onClick: ($event) => unref(setColorMode)("auto")
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_CIcon, {
                                      class: "me-2",
                                      icon: "cil-contrast",
                                      size: "lg"
                                    }),
                                    createTextVNode(" Auto ")
                                  ]),
                                  _: 1
                                }, 8, ["active", "onClick"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("li", { class: "nav-item py-1" }, [
                          createVNode("div", { class: "vr h-100 mx-2 text-body text-opacity-75" })
                        ]),
                        createVNode(TheHeaderDropdownAccnt)
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CContainer, {
              class: "px-4",
              fluid: ""
            }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$6, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$6)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CContainer, {
                class: "border-bottom px-4",
                fluid: ""
              }, {
                default: withCtx(() => [
                  createVNode(_component_CHeaderToggler, {
                    onClick: ($event) => _ctx.toggleVisible(),
                    style: { "margin-inline-start": "-14px" }
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_CIcon, {
                        icon: "cil-menu",
                        size: "lg"
                      })
                    ]),
                    _: 1
                  }, 8, ["onClick"]),
                  createVNode(_component_CHeaderNav, { class: "ms-auto" }, {
                    default: withCtx(() => [
                      createVNode(_component_CNavItem, null, {
                        default: withCtx(() => [
                          createVNode(_component_CNavLink, {
                            onClick: _ctx.showNewShippingItemsTable,
                            role: "button"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "d-flex align-items-center justify-content-center" }, [
                                createVNode(_component_CIcon, {
                                  class: "me-2",
                                  icon: "cil-playlist-add",
                                  size: "lg"
                                }),
                                createTextVNode(" " + toDisplayString(_ctx.$t("shipping.add-shipment-goods")), 1)
                              ])
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(TheHeaderDropdownShipping),
                  createVNode(_component_CHeaderNav, null, {
                    default: withCtx(() => [
                      createVNode("li", { class: "nav-item py-1" }, [
                        createVNode("div", { class: "vr h-100 mx-2 text-body text-opacity-75" })
                      ]),
                      createVNode(_component_CDropdown, {
                        variant: "nav-item",
                        placement: "bottom-end"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CDropdownToggle, { caret: false }, {
                            default: withCtx(() => [
                              unref(colorMode2) === "dark" ? (openBlock(), createBlock(_component_CIcon, {
                                key: 0,
                                icon: "cil-moon",
                                size: "lg"
                              })) : unref(colorMode2) === "light" ? (openBlock(), createBlock(_component_CIcon, {
                                key: 1,
                                icon: "cil-sun",
                                size: "lg"
                              })) : (openBlock(), createBlock(_component_CIcon, {
                                key: 2,
                                icon: "cil-contrast",
                                size: "lg"
                              }))
                            ]),
                            _: 1
                          }),
                          createVNode(_component_CDropdownMenu, null, {
                            default: withCtx(() => [
                              createVNode(_component_CDropdownItem, {
                                active: unref(colorMode2) === "light",
                                class: "d-flex align-items-center",
                                component: "button",
                                type: "button",
                                onClick: () => {
                                  unref(theme).global.name.value = "light";
                                  unref(setColorMode)("light");
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_CIcon, {
                                    class: "me-2",
                                    icon: "cil-sun",
                                    size: "lg"
                                  }),
                                  createTextVNode(" Light ")
                                ]),
                                _: 1
                              }, 8, ["active", "onClick"]),
                              createVNode(_component_CDropdownItem, {
                                active: unref(colorMode2) === "dark",
                                class: "d-flex align-items-center",
                                component: "button",
                                type: "button",
                                onClick: () => {
                                  unref(theme).global.name.value = "dark";
                                  unref(setColorMode)("dark");
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_CIcon, {
                                    class: "me-2",
                                    icon: "cil-moon",
                                    size: "lg"
                                  }),
                                  createTextVNode(" Dark ")
                                ]),
                                _: 1
                              }, 8, ["active", "onClick"]),
                              createVNode(_component_CDropdownItem, {
                                active: unref(colorMode2) === "auto",
                                class: "d-flex align-items-center",
                                component: "button",
                                type: "button",
                                onClick: ($event) => unref(setColorMode)("auto")
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_CIcon, {
                                    class: "me-2",
                                    icon: "cil-contrast",
                                    size: "lg"
                                  }),
                                  createTextVNode(" Auto ")
                                ]),
                                _: 1
                              }, 8, ["active", "onClick"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("li", { class: "nav-item py-1" }, [
                        createVNode("div", { class: "vr h-100 mx-2 text-body text-opacity-75" })
                      ]),
                      createVNode(TheHeaderDropdownAccnt)
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_CContainer, {
                class: "px-4",
                fluid: ""
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$6)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/containers/TheHeader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const config = {
  // mode: "no-cors",
  // httpsAgent: new https.Agent({ rejectUnauthorized: false }),
  // headers: {
  //     "Content-Type": "application/json",
  //     Accept: "application/json",
  //     "Access-Control-Allow-Origin": "*"
  // }
};
const instance = axios.create(config);
instance.interceptors.request.use(function(config2) {
  const token = store.getters.authToken;
  config2.headers.Authorization = token ? `Bearer ${token}` : "";
  return config2;
});
const LOGIN_SUCCESS = "auth/login/success";
const LOGOUT = "auth/logout";
const { t: t$F } = i18n.global;
const endpoint$C = "/api/auth/";
const name$17 = "auth";
const actions$F = {
  [`login`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$C}login`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(LOGIN_SUCCESS, res);
          dispatch("snackbar/show", {
            color: "success",
            text: t$F("snackbar.success.login")
          });
          resolve(res);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$F("snackbar.fail.login")
          });
          reject(response);
        }
      }).catch(function(error2) {
        dispatch("snackbar/show", {
          color: "error",
          text: t$F("snackbar.fail.login")
        });
        reject(error2);
      });
    });
  },
  [`${name$17}/logout`]({ commit }) {
    commit(LOGOUT);
  },
  [`${name$17}/forgotpassword/email`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$C}forgotpassword/email`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$F("auth.forgotpassword.mailsent")
          });
          resolve(response);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "error",
              text: t$F("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$17}/forgotpassword/find`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$C}forgotpassword/find`, payload).then(function(response) {
        if (!response.data.error) {
          resolve(response);
        } else {
          router$2.push({ name: "Login" });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$17}/forgotpassword/reset`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$C}forgotpassword/reset`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$F("auth.resetpassword.success")
          });
          resolve(response);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            router$2.push({ path: "/login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const ADMIN = "ADMIN";
const EMPLOYEE = "EMPLOYEE";
const getters$F = {
  authUser(state2) {
    if (state2.user === null) {
      return false;
    }
    return state2.user;
  },
  authToken(state2) {
    if (state2.token === null || state2.token === void 0) {
      return false;
    }
    return state2.token;
  },
  isAuthenticated(state2) {
    return state2.token !== null && state2.token !== void 0;
  },
  isAdmin(state2) {
    var _a;
    return ((_a = state2.user) == null ? void 0 : _a.role) === ADMIN;
  },
  isEmployee(state2) {
    var _a;
    return ((_a = state2.user) == null ? void 0 : _a.role) === EMPLOYEE;
  },
  isPermissionGranted(state2) {
    return (key) => {
      var _a, _b, _c, _d, _e;
      if (((_a = state2.user) == null ? void 0 : _a.role) === ADMIN) {
        return true;
      }
      let granted = false;
      let items = ((_c = (_b = state2.user) == null ? void 0 : _b.permission) == null ? void 0 : _c.items) ? (_e = (_d = state2.user) == null ? void 0 : _d.permission) == null ? void 0 : _e.items : {};
      for (const _key in items) {
        if (_key === key) {
          granted = items[_key];
          break;
        }
      }
      return granted;
    };
  },
  permissions(state2) {
    var _a, _b, _c, _d;
    return ((_b = (_a = state2.user) == null ? void 0 : _a.permission) == null ? void 0 : _b.items) ? (_d = (_c = state2.user) == null ? void 0 : _c.permission) == null ? void 0 : _d.items : {};
  }
};
const mutations$F = {
  [LOGIN_SUCCESS](state2, { data }) {
    sessionStorage.setItem("token", data.token);
    state2.user = data;
    state2.token = data.token;
  },
  [LOGOUT](state2) {
    state2.user = null;
    state2.token = null;
    sessionStorage.token = null;
  }
};
const state$G = {
  user: null,
  token: null
};
const Auth = {
  namespaced: false,
  state: state$G,
  mutations: mutations$F,
  getters: getters$F,
  actions: actions$F
};
const FETCH_CATEGORIES_SUCCESS = "FETCH_CATEGORIES_SUCCESS";
const FETCH_CATEGORY_DETAILS_SUCCESS = "FETCH_CATEGORY_DETAILS_SUCCESS";
const { t: t$E } = i18n.global;
const endpoint$B = "/api/categories/";
const name$16 = "categories";
const actions$E = {
  [`${name$16}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$B}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_CATEGORIES_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "error",
              text: t$E("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$16}/details`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$B}details?${query}`).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_CATEGORY_DETAILS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "error",
              text: t$E("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$16}/create`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$B}create`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$E("snackbar.success.created")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$E("snackbar.fail.create")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$E("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$E("snackbar.fail.create")
        });
        reject(error2);
      });
    });
  },
  [`${name$16}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$B}update`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$E("snackbar.success.updated")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$E("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$E("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$E("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  },
  [`${name$16}/delete`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.delete(`${endpoint$B}delete`, { data: payload }).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$E("snackbar.success.deleted")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$E("snackbar.fail.delete")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$E("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$E("snackbar.fail.delete")
        });
        reject(error2);
      });
    });
  },
  [`${name$16}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$B}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"categories"}-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$E("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$15 = "category";
const getters$E = {
  [`${name$15}/data`](state2) {
    return state2.data;
  },
  [`${name$15}/data/details`](state2) {
    return state2.detailsData;
  }
};
const mutations$E = {
  [FETCH_CATEGORIES_SUCCESS](state2, { data }) {
    state2.data = data;
  },
  [FETCH_CATEGORY_DETAILS_SUCCESS](state2, { data }) {
    state2.detailsData = data;
  }
};
const state$F = {
  data: [],
  detailsData: {}
};
const Categories = {
  namespaced: false,
  state: state$F,
  mutations: mutations$E,
  getters: getters$E,
  actions: actions$E
};
const FETCH_CLIENTS_MONTHLY_STATEMENT_SUCCESS = "FETCH_CLIENTS_MONTHLY_STATEMENT_SUCCESS";
const { t: t$D } = i18n.global;
const endpoint$A = "/api/clients/monthly-statements/";
const name$14 = "clients/monthly-statements";
const actions$D = {
  [`${name$14}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$A}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(
            FETCH_CLIENTS_MONTHLY_STATEMENT_SUCCESS,
            res
          );
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$D("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$14}/create`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$A}create`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$D("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$14}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$A}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"clients"}-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$D("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$13 = "clients/monthly-statements";
const getters$D = {
  [`${name$13}/data`](state2) {
    return state2.data;
  }
};
const mutations$D = {
  [FETCH_CLIENTS_MONTHLY_STATEMENT_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$E = {
  data: [],
  detailsData: {}
};
const ClientMonthlyStatements = {
  namespaced: false,
  state: state$E,
  mutations: mutations$D,
  getters: getters$D,
  actions: actions$D
};
const FETCH_CLIENTS_SUCCESS = "FETCH_CLIENTS_SUCCESS";
const FETCH_CLIENT_DETAILS_SUCCESS = "FETCH_CLIENT_DETAILS_SUCCESS";
const { t: t$C } = i18n.global;
const endpoint$z = "/api/clients/";
const name$12 = "clients";
const actions$C = {
  [`${name$12}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$z}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_CLIENTS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$C("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$12}/details`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$z}details?${query}`).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_CLIENT_DETAILS_SUCCESS, res.data);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$C("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$12}/create`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$z}create`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$C("snackbar.success.created")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$C("snackbar.fail.create")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$C("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$C("snackbar.fail.create")
        });
        reject(error2);
      });
    });
  },
  [`${name$12}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$z}update`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          dispatch("snackbar/show", {
            color: "success",
            text: t$C("snackbar.success.updated")
          });
          resolve(res);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$C("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$C("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$C("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  },
  [`${name$12}/delete`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.delete(`${endpoint$z}delete`, { data: payload }).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$C("snackbar.success.deleted")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$C("snackbar.fail.delete")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$C("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$C("snackbar.fail.delete")
        });
        reject(error2);
      });
    });
  },
  [`${name$12}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$z}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"clients"}-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$C("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$11 = "client";
const getters$C = {
  [`${name$11}/data`](state2) {
    return state2.data;
  },
  [`${name$11}/data/details`](state2) {
    return state2.detailsData;
  }
};
const mutations$C = {
  [FETCH_CLIENTS_SUCCESS](state2, { data }) {
    state2.data = data;
  },
  [FETCH_CLIENT_DETAILS_SUCCESS](state2, { data }) {
    state2.detailsData = data;
  }
};
const state$D = {
  data: [],
  detailsData: {}
};
const Clients = {
  namespaced: false,
  state: state$D,
  mutations: mutations$C,
  getters: getters$C,
  actions: actions$C
};
const FETCH_DASHBOARD_SUCCESS = "FETCH_DASHBOARD_SUCCESS";
const { t: t$B } = i18n.global;
const endpoint$y = "/api/dashboard/";
const name$10 = "dashboard";
const actions$B = {
  [`${name$10}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$y}get`).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          commit(FETCH_DASHBOARD_SUCCESS, res);
          resolve(response);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$B("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: error2.response.data.msg
        });
        reject(error2);
      });
    });
  }
};
const name$$ = "dashboard";
const getters$B = {
  [`${name$$}/data`](state2) {
    return state2.data;
  }
};
const mutations$B = {
  [FETCH_DASHBOARD_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$C = {
  data: {}
};
const Dashboard = {
  namespaced: false,
  state: state$C,
  mutations: mutations$B,
  getters: getters$B,
  actions: actions$B
};
const FETCH_EXCHANGERATE_SUCCESS = "FETCH_EXCHANGERATE_SUCCESS";
const FETCH_EXCHANGERATE_DETAILS_SUCCESS = "FETCH_EXCHANGERATE_DETAILS_SUCCESS";
const { t: t$A } = i18n.global;
const endpoint$x = "/api/exchange-rates/";
const name$_ = "exchange-rates";
const actions$A = {
  [`${name$_}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$x}get`, payload).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          commit(FETCH_EXCHANGERATE_SUCCESS, res);
          resolve(response);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$A("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$_}/details`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$x}details`, payload).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          commit(FETCH_EXCHANGERATE_DETAILS_SUCCESS, res);
          resolve(response);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$A("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$_}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$x}update`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$A("snackbar.success.updated")
          });
          let res = response.data;
          resolve(res);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$A("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$A("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$A("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  }
};
const name$Z = "exchange-rates";
const getters$A = {
  [`${name$Z}/data`](state2) {
    return state2.data;
  }
};
const mutations$A = {
  [FETCH_EXCHANGERATE_SUCCESS](state2, { data }) {
    state2.data = data;
  },
  [FETCH_EXCHANGERATE_DETAILS_SUCCESS](state2, { data }) {
    state2.details = data;
  }
};
const state$B = {
  data: {}
};
const ExchangeRate = {
  namespaced: false,
  state: state$B,
  mutations: mutations$A,
  getters: getters$A,
  actions: actions$A
};
const FETCH_GOODS_SUCCESS = "FETCH_GOODS_SUCCESS";
const FETCH_GOODS_DETAILS_SUCCESS = "FETCH_GOODS_DETAILS_SUCCESS";
const { t: t$z } = i18n.global;
const endpoint$w = "/api/goods/";
const name$Y = "goods";
const actions$z = {
  [`${name$Y}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$w}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_GOODS_SUCCESS, res);
          resolve(response);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$z("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$Y}/details`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$w}details?${query}`).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_GOODS_DETAILS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$z("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$Y}/create`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$w}create`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$z("snackbar.success.created")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$z("snackbar.fail.create")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$z("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$z("snackbar.fail.create")
        });
        reject(error2);
      });
    });
  },
  [`${name$Y}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$w}update`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$z("snackbar.success.updated")
          });
          let res = response.data;
          resolve(res);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$z("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$z("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$z("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  },
  [`${name$Y}/delete`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.delete(`${endpoint$w}delete`, { data: payload }).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$z("snackbar.success.deleted")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$z("snackbar.fail.delete")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$z("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$z("snackbar.fail.delete")
        });
        reject(error2);
      });
    });
  },
  [`${name$Y}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$w}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"goods"}-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$z("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$X = "goods";
const getters$z = {
  [`${name$X}/data`](state2) {
    return state2.data;
  },
  [`${name$X}/data/details`](state2) {
    return state2.detailsData;
  }
};
const mutations$z = {
  [FETCH_GOODS_SUCCESS](state2, { data }) {
    state2.data = data;
  },
  [FETCH_GOODS_DETAILS_SUCCESS](state2, { data }) {
    state2.detailsData = data;
  }
};
const state$A = {
  data: [],
  detailsData: {}
};
const Goods = {
  namespaced: false,
  state: state$A,
  mutations: mutations$z,
  getters: getters$z,
  actions: actions$z
};
const FETCH_GOODS_CONTENTS_SUCCESS = "FETCH_GOODS_CONTENTS_SUCCESS";
const FETCH_GOODS_CONTENT_DETAILS_SUCCESS = "FETCH_GOODS_CONTENT_DETAILS_SUCCESS";
const { t: t$y } = i18n.global;
const endpoint$v = "/api/goods/contents/";
const name$W = "goods/contents";
const actions$y = {
  [`${name$W}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$v}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_GOODS_CONTENTS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$y("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$W}/details`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$v}details?${query}`).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_GOODS_CONTENT_DETAILS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$y("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$W}/create`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$v}create`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$y("snackbar.success.created")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$y("snackbar.fail.create")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$y("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$y("snackbar.fail.create")
        });
        reject(error2);
      });
    });
  },
  [`${name$W}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$v}update`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$y("snackbar.success.updated")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$y("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$y("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$y("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  },
  [`${name$W}/delete`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.delete(`${endpoint$v}delete`, { data: payload }).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$y("snackbar.success.deleted")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$y("snackbar.fail.delete")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$y("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$y("snackbar.fail.delete")
        });
        reject(error2);
      });
    });
  },
  [`${name$W}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$v}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"goods_contents"}-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$y("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$V = "goods/contents";
const getters$y = {
  [`${name$V}/data`](state2) {
    return state2.data;
  },
  [`${name$V}/data/details`](state2) {
    return state2.detailsData;
  }
};
const mutations$y = {
  [FETCH_GOODS_CONTENTS_SUCCESS](state2, { data }) {
    state2.data = data;
  },
  [FETCH_GOODS_CONTENT_DETAILS_SUCCESS](state2, { data }) {
    state2.detailsData = data;
  }
};
const state$z = {
  data: [],
  detailsData: {}
};
const GoodsContent = {
  namespaced: false,
  state: state$z,
  mutations: mutations$y,
  getters: getters$y,
  actions: actions$y
};
const FETCH_CREATESHIPPINGCONFIG_SUCCESS = "FETCH_CREATESHIPPINGCONFIG_SUCCESS";
const { t: t$x } = i18n.global;
const endpoint$u = "/api/goods/create-shipping-config/";
const name$U = "goods/create-shipping-config";
const actions$x = {
  [`${name$U}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$u}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_CREATESHIPPINGCONFIG_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$x("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$T = "goods/create-shipping-config";
const getters$x = {
  [`${name$T}/data`](state2) {
    return state2.data;
  }
};
const mutations$x = {
  [FETCH_CREATESHIPPINGCONFIG_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$y = {
  items: [],
  clients: []
};
const GoodsCreateShippingConfig = {
  namespaced: false,
  state: state$y,
  mutations: mutations$x,
  getters: getters$x,
  actions: actions$x
};
const FETCH_GOODS_ITEMS_SUCCESS = "FETCH_GOODS_ITEMS_SUCCESS";
const FETCH_GOODS_ITEM_DETAILS_SUCCESS = "FETCH_GOODS_ITEM_DETAILS_SUCCESS";
const { t: t$w } = i18n.global;
const endpoint$t = "/api/goods/items/";
const name$S = "goods/items";
const actions$w = {
  [`${name$S}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$t}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_GOODS_ITEMS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$w("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$S}/details`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$t}details?${query}`).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(
            FETCH_GOODS_ITEM_DETAILS_SUCCESS,
            res.data
          );
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$w("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$S}/create`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$t}create`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$w("snackbar.success.created")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$w("snackbar.fail.create")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$w("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$w("snackbar.fail.create")
        });
        reject(error2);
      });
    });
  },
  [`${name$S}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$t}update`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$w("snackbar.success.updated")
          });
          resolve(response);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$w("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$w("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  },
  [`${name$S}/delete`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.delete(`${endpoint$t}delete`, { data: payload }).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$w("snackbar.success.deleted")
          });
          resolve(response);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$w("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$w("snackbar.fail.delete")
        });
        reject(error2);
      });
    });
  },
  [`${name$S}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$t}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"goods_items"}-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$w("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$R = "goods/items";
const getters$w = {
  [`${name$R}/data`](state2) {
    return state2.data;
  },
  [`${name$R}/data/details`](state2) {
    return state2.detailsData;
  }
};
const mutations$w = {
  [FETCH_GOODS_ITEMS_SUCCESS](state2, { data }) {
    state2.data = data;
  },
  [FETCH_GOODS_ITEM_DETAILS_SUCCESS](state2, { data }) {
    state2.detailsData = data;
  }
};
const state$x = {
  data: [],
  detailsData: {}
};
const GoodsItem = {
  namespaced: false,
  state: state$x,
  mutations: mutations$w,
  getters: getters$w,
  actions: actions$w
};
const { t: t$v } = i18n.global;
const endpoint$s = "/api/goods/quicksearch/";
const name$Q = "goods/quicksearch";
const actions$v = {
  [`${name$Q}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$s}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$v("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$P = "goods";
const getters$v = {
  [`${name$P}/data`](state2) {
    return state2.data;
  },
  [`${name$P}/data/details`](state2) {
    return state2.detailsData;
  }
};
const mutations$v = {};
const state$w = {
  data: []
};
const GoodsQuickSearch = {
  namespaced: false,
  state: state$w,
  mutations: mutations$v,
  getters: getters$v,
  actions: actions$v
};
const FETCH_SHIPPING_SUCCESS = "FETCH_SHIPPING_SUCCESS";
const FETCH_SHIPPING_DETAILS_SUCCESS = "FETCH_SHIPPING_DETAILS_SUCCESS";
const UPDATE_SHIPPING_DETAILS_SUCCESS = "UPDATE_SHIPPING_DETAILS_SUCCESS";
const { t: t$u } = i18n.global;
const endpoint$r = "/api/goods/shippings/";
const name$O = "goods/shippings";
const actions$u = {
  [`${name$O}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$r}get`, payload).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          commit(FETCH_SHIPPING_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$u("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$O}/details`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$r}details?${query}`).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          commit(FETCH_SHIPPING_DETAILS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$u("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$O}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$r}update`, payload).then(function(response) {
        console.log(response);
        if (!response.data.error) {
          let res = response.data;
          commit(UPDATE_SHIPPING_DETAILS_SUCCESS, res);
          dispatch("snackbar/show", {
            color: "success",
            text: t$u("snackbar.success.updated")
          });
          resolve(res);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$u("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        console.log(error2);
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$u("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$u("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  },
  [`${name$O}/create`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$r}create`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$u("snackbar.success.created")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$u("snackbar.fail.create")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$u("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$u("snackbar.fail.create")
        });
        reject(error2);
      });
    });
  },
  [`${name$O}/format`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$r}format`, payload).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          commit(void 0, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$u("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$O}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$r}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"shippings"}-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$u("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$N = "goods/shippings";
const getters$u = {
  [`${name$N}/data`](state2) {
    return state2.data;
  },
  [`${name$N}/data/details`](state2) {
    return state2.detailsData;
  }
};
const mutations$u = {
  [FETCH_SHIPPING_SUCCESS](state2, { data }) {
    state2.data = data;
  },
  [FETCH_SHIPPING_DETAILS_SUCCESS](state2, { data }) {
    state2.detailsData = data;
  },
  [UPDATE_SHIPPING_DETAILS_SUCCESS](state2, { data }) {
    state2.detailsData = data;
  },
  [void 0](state2, { data }) {
    state2.formattedShipData = data;
  }
};
const state$v = {
  data: [],
  detailsData: {}
};
const GoodsShipping = {
  namespaced: false,
  state: state$v,
  mutations: mutations$u,
  getters: getters$u,
  actions: actions$u
};
const FETCH_SHIPPING_ALTER_SUCCESS = "FETCH_SHIPPING_ALTER_SUCCESS";
const { t: t$t } = i18n.global;
const endpoint$q = "/api/goods/shippings/alteration/";
const name$M = "goods/shippings/alteration";
const actions$t = {
  [`${name$M}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$q}get`, payload).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          commit(FETCH_SHIPPING_ALTER_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$t("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$M}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$q}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"alteration"}-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$t("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$L = "goods/shippings/alteration";
const getters$t = {
  [`${name$L}/data`](state2) {
    return state2.data;
  }
};
const mutations$t = {
  [FETCH_SHIPPING_ALTER_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$u = {
  data: []
};
const GoodsShippingAlteration = {
  namespaced: false,
  state: state$u,
  mutations: mutations$t,
  getters: getters$t,
  actions: actions$t
};
const FETCH_AVAILABLE_SHIPPING_ITEMS_SUCCESS = "FETCH_AVAILABLE_SHIPPING_ITEMS_SUCCESS";
const { t: t$s } = i18n.global;
const endpoint$p = "/api/goods/shippings/available-shippings-items/";
const name$K = "goods/shippings/available-shippings-items";
const actions$s = {
  [`${name$K}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$p}get`, payload).then(function(response) {
        let res = response.data;
        commit(FETCH_AVAILABLE_SHIPPING_ITEMS_SUCCESS, res);
        resolve(res);
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$s("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$J = "goods/shippings/available-shippings-items";
const getters$s = {
  [`${name$J}/data`](state2) {
    return state2.data;
  }
};
const mutations$s = {
  [FETCH_AVAILABLE_SHIPPING_ITEMS_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$t = {
  data: []
};
const GoodsShipAvailableShippingItems = {
  namespaced: false,
  state: state$t,
  mutations: mutations$s,
  getters: getters$s,
  actions: actions$s
};
const ADD_SHIPPING_CART_ITEM = "ADD_SHIPPING_CART_ITEM";
const REMOVE_SHIPPING_CART_ITEM = "REMOVE_SHIPPING_CART_ITEM";
const CLEAR_SHIPPING_CART_ITEM = "CLEAR_SHIPPING_CART_ITEM";
const { t: t$r } = i18n.global;
const endpoint$o = "/api/goods/shippings/";
const name$I = "goods/shipping-cart";
const actions$r = {
  [`${name$I}/add`]({ commit, dispatch }, payload) {
    commit(void 0, payload);
  },
  [`${name$I}/clear`]({ commit, dispatch }) {
    commit(void 0);
  },
  [`${name$I}/format`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$o}format`, payload).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          commit(void 0, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$r("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$H = "goods/shipping-cart";
const getters$r = {
  [`${name$H}/items`](state2) {
    return state2.items;
  },
  [`${name$H}/data/details`](state2) {
    return state2.detailsData;
  }
};
const mutations$r = {
  [ADD_SHIPPING_CART_ITEM](state2, { data }) {
    let index = state2.items.findIndex((obj) => obj.id === data.id);
    if (index > -1) {
      state2.items[index] = {
        ...data,
        unit: data.unit + state2.items[index].unit
      };
    } else {
      state2.items = [...state2.items, data];
    }
  },
  [REMOVE_SHIPPING_CART_ITEM](state2, { data }) {
    state2.items.findIndex((obj) => obj.id === data.id);
  },
  [CLEAR_SHIPPING_CART_ITEM](state2) {
    state2.items = [];
    state2.formatted = [];
  },
  [void 0](state2, { data }) {
    state2.formatted = data;
  }
};
const state$s = {
  client: {},
  clients: [],
  items: [],
  formatted: []
};
const GoodsShippingCart = {
  namespaced: false,
  state: state$s,
  mutations: mutations$r,
  getters: getters$r,
  actions: actions$r
};
const { t: t$q } = i18n.global;
const endpoint$n = "/api/goods/shippings/invoice/";
const name$G = "goods/shippings/invoice";
const actions$q = {
  [`${name$G}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$n}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"shipping_invoice"}-${moment().format(
            "YYYYMMDD"
          )}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$q("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const getters$q = {};
const mutations$q = {};
const state$r = {};
const GoodsShippingInvoice = {
  namespaced: false,
  state: state$r,
  mutations: mutations$q,
  getters: getters$q,
  actions: actions$q
};
const { t: t$p } = i18n.global;
const endpoint$m = "/api/goods/shippings/mailer/";
const name$F = "goods/shippings/mailer";
const actions$p = {
  [`${name$F}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$m}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"shipping_mailer"}-${moment().format(
            "YYYYMMDD"
          )}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$p("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const getters$p = {};
const mutations$p = {};
const state$q = {};
const GoodsShipingMailer = {
  namespaced: false,
  state: state$q,
  mutations: mutations$p,
  getters: getters$p,
  actions: actions$p
};
const { t: t$o } = i18n.global;
const endpoint$l = "/api/goods/shippings/packing/";
const name$E = "goods/shippings/packing";
const actions$o = {
  [`${name$E}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$l}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `shipping_packing-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$o("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const getters$o = {};
const mutations$o = {};
const state$p = {};
const GoodsShippingPacking = {
  namespaced: false,
  state: state$p,
  mutations: mutations$o,
  getters: getters$o,
  actions: actions$o
};
const { t: t$n } = i18n.global;
const endpoint$k = "/api/goods/shippings/purchase/quicksearch/";
const name$D = "goods/shippings/purchase/quicksearch";
const actions$n = {
  [`${name$D}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$k}get`, payload).then(function(response) {
        let res = response.data;
        resolve(res);
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$n("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$C = "goods/shippings/purchase/quicksearch";
const getters$n = {
  [`${name$C}/data`](state2) {
    return state2.data;
  }
};
const mutations$n = {};
const state$o = {
  data: []
};
const GoodsShippingPurchaseQuickSearch = {
  namespaced: false,
  state: state$o,
  mutations: mutations$n,
  getters: getters$n,
  actions: actions$n
};
const FETCH_GOODS_STOCK_SUCCESS = "FETCH_GOODS_STOCK_SUCCESS";
const { t: t$m } = i18n.global;
const endpoint$j = "/api/goods/stocks/";
const name$B = "goods/stocks";
const actions$m = {
  [`${name$B}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$j}get`, payload).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          commit(FETCH_GOODS_STOCK_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$m("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$B}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$j}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"goods"}-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$m("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$A = "goods/stock";
const getters$m = {
  [`${name$A}/data`](state2) {
    return state2.data;
  }
};
const mutations$m = {
  [FETCH_GOODS_STOCK_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$n = {
  data: []
};
const GoodsStock = {
  namespaced: false,
  state: state$n,
  mutations: mutations$m,
  getters: getters$m,
  actions: actions$m
};
const FETCH_GOODS_STOCKCALENDAR_SUCCESS = "FETCH_GOODS_STOCKCALENDAR_SUCCESS";
const { t: t$l } = i18n.global;
const endpoint$i = "/api/goods/stocks/calendar/";
const name$z = "goods/stocks/calendar";
const actions$l = {
  [`${name$z}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$i}get`, payload).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          commit(FETCH_GOODS_STOCKCALENDAR_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$l("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$y = "goods/stocks/calendar";
const getters$l = {
  [`${name$y}/data`](state2) {
    return state2.data;
  }
};
const mutations$l = {
  [FETCH_GOODS_STOCKCALENDAR_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$m = {
  data: []
};
const GoodsStockCalendar = {
  namespaced: false,
  state: state$m,
  mutations: mutations$l,
  getters: getters$l,
  actions: actions$l
};
const FETCH_PROFILE_SUCCESS = "FETCH_PROFILE_SUCCESS";
const UPDATE_PROFILE_SUCCESS = "UPDATE_PROFILE_SUCCESS";
const { t: t$k } = i18n.global;
const endpoint$h = "/api/users/profile/";
const name$x = "profile";
const actions$k = {
  [`${name$x}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$h}get`, payload).then(function(response) {
        let res = response.data;
        commit(FETCH_PROFILE_SUCCESS, res);
        resolve(res);
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$k("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$x}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$h}update`, payload).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          commit(UPDATE_PROFILE_SUCCESS, res);
          dispatch("snackbar/show", {
            color: "success",
            text: t$k("snackbar.success.updated")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$k("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$k("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$k("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  },
  [`${name$x}/password/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$h}password/update`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$k("snackbar.success.updated")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$k("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$k("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$k("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  }
};
const name$w = "profile";
const getters$k = {
  [`${name$w}/data`](state2) {
    return state2.data;
  }
};
const mutations$k = {
  [FETCH_PROFILE_SUCCESS](state2, { data }) {
    state2.data = data;
  },
  [UPDATE_PROFILE_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$l = {
  data: {}
};
const Profile = {
  namespaced: false,
  state: state$l,
  mutations: mutations$k,
  getters: getters$k,
  actions: actions$k
};
const FETCH_INVOICE_ITEMS_SUCCESS = "FETCH_INVOICE_ITEMS_SUCCESS";
const FETCH_INVOICE_DETAILS_SUCCESS = "FETCH_INVOICE_DETAILS_SUCCESS";
const { t: t$j } = i18n.global;
const endpoint$g = "/api/goods/purchases/invoices/";
const name$v = "goods/purchases/invoices";
const actions$j = {
  [`${name$v}/items`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$g}items?${query}`).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_INVOICE_ITEMS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$j("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$v}/details`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$g}details?${query}`).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_INVOICE_DETAILS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$j("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$v}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$g}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"purchases"}-${moment().format("YYYYMMDDY")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$j("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$u = "goods/purchases/invoices";
const getters$j = {
  [`${name$u}/data`](state2) {
    return state2.data;
  },
  [`${name$u}/data/details`](state2) {
    return state2.detailsData;
  }
};
const mutations$j = {
  [FETCH_INVOICE_ITEMS_SUCCESS](state2, { data }) {
    state2.items = data;
  },
  [FETCH_INVOICE_DETAILS_SUCCESS](state2, { data }) {
    state2.detailsData = data;
  }
};
const state$k = {
  items: [],
  detailsData: {}
};
const PurchaseInvoice = {
  namespaced: false,
  state: state$k,
  mutations: mutations$j,
  getters: getters$j,
  actions: actions$j
};
const FETCH_PURCHASELINE_SUCCESS = "FETCH_PURCHASELINE_SUCCESS";
const { t: t$i } = i18n.global;
const endpoint$f = "/api/statistics/chart/purchase-line/";
const name$t = "chart/purchase-line";
const actions$i = {
  [`${name$t}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$f}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_PURCHASELINE_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$i("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$s = "chart/purchase-line";
const getters$i = {
  [`${name$s}/data`](state2) {
    return state2.data;
  }
};
const mutations$i = {
  [FETCH_PURCHASELINE_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$j = {
  data: []
};
const PurchaseLineChart = {
  namespaced: false,
  state: state$j,
  mutations: mutations$i,
  getters: getters$i,
  actions: actions$i
};
const FETCH_PURCHASES_SUCCESS = "FETCH_PURCHASES_SUCCESS";
const FETCH_PURCHASE_ITEMS_SUCCESS = "FETCH_PURCHASE_ITEMS_SUCCESS";
const FETCH_PURCHASE_DETAILS_SUCCESS = "FETCH_PURCHASE_DETAILS_SUCCESS";
const { t: t$h } = i18n.global;
const endpoint$e = "/api/goods/purchases/";
const name$r = "goods/purchases";
const actions$h = {
  [`${name$r}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$e}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_PURCHASES_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$h("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$r}/items`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$e}items?${query}`).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_PURCHASE_ITEMS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$h("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$r}/details`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$e}details?${query}`).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_PURCHASE_DETAILS_SUCCESS, res.data);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$h("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$r}/create`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$e}create`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$h("snackbar.success.created")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$h("snackbar.fail.create")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$h("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$h("snackbar.fail.create")
        });
        reject(error2);
      });
    });
  },
  [`${name$r}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$e}update`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$h("snackbar.success.updated")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$h("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$h("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  },
  [`${name$r}/delete`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.delete(`${endpoint$e}delete`, { data: payload }).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$h("snackbar.success.deleted")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$h("snackbar.fail.delete")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$h("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$h("snackbar.fail.delete")
        });
        reject(error2);
      });
    });
  },
  [`${name$r}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$e}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${t$h("purchases")}-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$h("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$q = "purchase";
const getters$h = {
  [`${name$q}/data`](state2) {
    return state2.data;
  },
  [`${name$q}/data/details`](state2) {
    return state2.detailsData;
  }
};
const mutations$h = {
  [FETCH_PURCHASES_SUCCESS](state2, { data }) {
    state2.data = data;
  },
  [FETCH_PURCHASE_ITEMS_SUCCESS](state2, { data }) {
    state2.items = data;
  },
  [FETCH_PURCHASE_DETAILS_SUCCESS](state2, { data }) {
    state2.detailsData = data;
  }
};
const state$i = {
  data: [],
  items: [],
  detailsData: {}
};
const Purchases = {
  namespaced: false,
  state: state$i,
  mutations: mutations$h,
  getters: getters$h,
  actions: actions$h
};
const { t: t$g } = i18n.global;
const endpoint$d = "/api/goods/purchases/stocktakes/";
const name$p = "goods/purchases/stocktakes";
const actions$g = {
  [`${name$p}/create`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$d}create`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$g("snackbar.success.created")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$g("snackbar.fail.create")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$g("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$g("snackbar.fail.create")
        });
        reject(error2);
      });
    });
  }
};
const name$o = "goods/purchases/stocktakes";
const getters$g = {
  [`${name$o}/data`](state2) {
    return state2.data;
  },
  [`${name$o}/data/details`](state2) {
    return state2.detailsData;
  }
};
const mutations$g = {};
const state$h = {
  items: [],
  detailsData: {}
};
const PurchaseStockTake = {
  namespaced: false,
  state: state$h,
  mutations: mutations$g,
  getters: getters$g,
  actions: actions$g
};
const FETCH_SALESREPORT_CHART_SUCCESS = "FETCH_SALESREPORT_CHART_SUCCESS";
const { t: t$f } = i18n.global;
const endpoint$c = "/api/sales-reports/chart/";
const name$n = "sales-reports/chart";
const actions$f = {
  [`${name$n}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$c}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_SALESREPORT_CHART_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$f("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$m = "sales-reports/chart";
const getters$f = {
  [`${name$m}/data`](state2) {
    return state2.data;
  }
};
const mutations$f = {
  [FETCH_SALESREPORT_CHART_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$g = {
  data: {}
};
const SalesReportChart = {
  namespaced: false,
  state: state$g,
  mutations: mutations$f,
  getters: getters$f,
  actions: actions$f
};
const FETCH_SALESREPORT_SUCCESS = "FETCH_SALESREPORT_SUCCESS";
const FETCH_DAILYSALESREPORT_SUCCESS = "FETCH_DAILYSALESREPORT_SUCCESS";
const { t: t$e } = i18n.global;
const endpoint$b = "/api/sales-reports/";
const name$l = "sales-reports";
const actions$e = {
  [`${name$l}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$b}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_SALESREPORT_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$e("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$l}/daily/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$b}daily/get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_DAILYSALESREPORT_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$e("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$k = "sales-reports";
const getters$e = {
  [`${name$k}/data`](state2) {
    return state2.data;
  },
  [`${name$k}/daily/data`](state2) {
    return state2.dailyData;
  }
};
const mutations$e = {
  [FETCH_SALESREPORT_SUCCESS](state2, { data }) {
    state2.data = data;
  },
  [FETCH_DAILYSALESREPORT_SUCCESS](state2, { data }) {
    state2.dailyData = data;
  }
};
const state$f = {
  data: {},
  dailyData: []
};
const SalesReports = {
  namespaced: false,
  state: state$f,
  mutations: mutations$e,
  getters: getters$e,
  actions: actions$e
};
const FETCH_SALESREPORT_STOCKCHART_SUCCESS = "FETCH_SALESREPORT_STOCKCHART_SUCCESS";
const { t: t$d } = i18n.global;
const endpoint$a = "/api/sales-reports/stockchart/";
const name$j = "sales-reports/stockchart";
const actions$d = {
  [`${name$j}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$a}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_SALESREPORT_STOCKCHART_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$d("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$i = "sales-reports/stockchart";
const getters$d = {
  [`${name$i}/data`](state2) {
    return state2.data;
  }
};
const mutations$d = {
  [FETCH_SALESREPORT_STOCKCHART_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$e = {
  data: {}
};
const SalesReportStockChart = {
  namespaced: false,
  state: state$e,
  mutations: mutations$d,
  getters: getters$d,
  actions: actions$d
};
const FETCH_SALESREPORT_TOPSALES_SUCCESS = "FETCH_SALESREPORT_TOPSALES_SUCCESS";
const { t: t$c } = i18n.global;
const endpoint$9 = "/api/sales-reports/top-sales/";
const name$h = "sales-reports/top-sales";
const actions$c = {
  [`${name$h}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$9}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_SALESREPORT_TOPSALES_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$c("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$g = "sales-reports/top-sales";
const getters$c = {
  [`${name$g}/data`](state2) {
    return state2.data;
  }
};
const mutations$c = {
  [FETCH_SALESREPORT_TOPSALES_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$d = {
  data: []
};
const SalesReportTopSales = {
  namespaced: false,
  state: state$d,
  mutations: mutations$c,
  getters: getters$c,
  actions: actions$c
};
const FETCH_SALESREPORT_TOPSTOCKS_SUCCESS = "FETCH_SALESREPORT_TOPSTOCKS_SUCCESS";
const { t: t$b } = i18n.global;
const endpoint$8 = "/api/sales-reports/top-stocks/";
const name$f = "sales-reports/top-stocks";
const actions$b = {
  [`${name$f}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$8}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_SALESREPORT_TOPSTOCKS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$b("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$e = "sales-reports/top-stocks";
const getters$b = {
  [`${name$e}/data`](state2) {
    return state2.data;
  }
};
const mutations$b = {
  [FETCH_SALESREPORT_TOPSTOCKS_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$c = {
  data: []
};
const SalesReportTopSocks = {
  namespaced: false,
  state: state$c,
  mutations: mutations$b,
  getters: getters$b,
  actions: actions$b
};
const FETCH_SUPPLIERS_SUCCESS = "FETCH_SUPPLIERS_SUCCESS";
const FETCH_SUPPLIER_DETAILS_SUCCESS = "FETCH_SUPPLIER_DETAILS_SUCCESS";
const { t: t$a } = i18n.global;
const endpoint$7 = "/api/goods/suppliers/";
const name$d = "goods/suppliers";
const actions$a = {
  [`${name$d}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$7}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_SUPPLIERS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$a("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$d}/details`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$7}details?${query}`).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_SUPPLIER_DETAILS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$a("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$d}/create`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$7}create`, payload).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          dispatch("snackbar/show", {
            color: "success",
            text: t$a("snackbar.success.created")
          });
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$a("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
          default:
            if (error2.response.data.msg) {
              dispatch("snackbar/show", {
                color: "error",
                text: error2.response.data.msg
              });
            } else {
              dispatch("snackbar/show", {
                color: "error",
                text: t$a("snackbar.fail.create")
              });
            }
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$d}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$7}update`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          dispatch("snackbar/show", {
            color: "success",
            text: t$a("snackbar.success.updated")
          });
          resolve(res);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$a("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$a("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$a("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  },
  [`${name$d}/delete`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.delete(`${endpoint$7}delete`, { data: payload }).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          dispatch("snackbar/show", {
            color: "success",
            text: t$a("snackbar.success.deleted")
          });
          resolve(res);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$a("snackbar.fail.delete")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$a("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
          default:
            if (error2.response.data.msg) {
              dispatch("snackbar/show", {
                color: "error",
                text: error2.response.data.msg
              });
            } else {
              dispatch("snackbar/show", {
                color: "error",
                text: t$a("snackbar.fail.delete")
              });
            }
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$d}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$7}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"suppliers"}-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$a("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$c = "supplier";
const getters$a = {
  [`${name$c}/data`](state2) {
    return state2.data;
  },
  [`${name$c}/data/details`](state2) {
    return state2.detailsData;
  }
};
const mutations$a = {
  [FETCH_SUPPLIERS_SUCCESS](state2, { data }) {
    state2.data = data;
  },
  [FETCH_SUPPLIER_DETAILS_SUCCESS](state2, { data }) {
    state2.detailsData = data;
  }
};
const state$b = {
  data: [],
  detailsData: {}
};
const Suppliers = {
  namespaced: false,
  state: state$b,
  mutations: mutations$a,
  getters: getters$a,
  actions: actions$a
};
const APPEND_ALERT = "APPEND_ALERT";
const REMOVE_ALERT = "REMOVE_ALERT";
const actions$9 = {
  appendAlert({ commit, dispatch }, payload) {
    commit(APPEND_ALERT, payload);
  },
  removeAlert({ commit, dispatch }, payload) {
    commit(REMOVE_ALERT, payload);
  }
};
const getters$9 = {
  alerts(state2) {
    if (state2.alerts === null) {
      return false;
    }
    return state2.alerts;
  }
};
const mutations$9 = {
  [APPEND_ALERT](state2, { id, color: color2, message }) {
    const filteredNullAlerts = state2.alerts.filter(function(value) {
      return value != null;
    });
    state2.alerts = filteredNullAlerts;
    state2.alerts = [...state2.alerts, { id, color: color2, message }];
  },
  [REMOVE_ALERT](state2, { id, color: color2, message }) {
    const filteredNullAlerts = state2.alerts.filter(function(value) {
      return value != null;
    });
    state2.alerts = filteredNullAlerts;
    const filteredAlerts = state2.alerts.filter(function(value) {
      return value.id !== id;
    });
    state2.alerts = filteredAlerts;
  }
};
const state$a = {
  alerts: []
};
const UIAlert = {
  namespaced: false,
  state: state$a,
  mutations: mutations$9,
  getters: getters$9,
  actions: actions$9
};
const TOGGLE_SIDEBAR_VISIBLE = "TOGGLE_SIDEBAR_VISIBLE";
const TOGGLE_SIDEBAR_UNFOLDABLE = "TOGGLE_SIDEBAR_UNFOLDABLE";
const name$b = "ui/sidebar";
const actions$8 = {
  [`${name$b}/toggleVisible`]({ commit, dispatch }, payload) {
    commit(TOGGLE_SIDEBAR_VISIBLE, payload);
  },
  [`${name$b}/toggleUnfoldable`]({ commit, dispatch }, payload) {
    commit(TOGGLE_SIDEBAR_UNFOLDABLE, payload);
  }
};
const getters$8 = {
  visible(state2) {
    if (state2.visible === null) {
      return false;
    }
    return state2.visible;
  },
  unfoldable(state2) {
    if (state2.unfoldable === null) {
      return false;
    }
    return state2.unfoldable;
  }
};
const mutations$8 = {
  [TOGGLE_SIDEBAR_VISIBLE](state2, payload) {
    state2.visible = payload !== void 0 ? payload : !state2.visible;
  },
  [TOGGLE_SIDEBAR_UNFOLDABLE](state2) {
    state2.unfoldable = !state2.unfoldable;
  }
};
const state$8 = () => ({
  visible: void 0,
  unfoldable: false
});
const state$9 = state$8;
const UISidebar = {
  namespaced: false,
  state: state$9,
  mutations: mutations$8,
  getters: getters$8,
  actions: actions$8
};
const SHOW = "SHOW";
const CLOSE = "CLOSE";
const name$a = "snackbar";
const actions$7 = {
  [`${name$a}/show`]({ commit, dispatch }, payload) {
    commit(SHOW, payload);
  },
  [`${name$a}/close`]({ commit, dispatch }) {
    commit(CLOSE);
  }
};
const name$9 = "snackbar";
const getters$7 = {
  [`${name$9}/show`](state2) {
    return state2.show;
  },
  [`${name$9}/color`](state2) {
    return state2.color;
  },
  [`${name$9}/text`](state2) {
    return state2.text;
  }
};
const mutations$7 = {
  [SHOW](state2, { color: color2, text }) {
    state2.color = color2;
    state2.text = text;
    state2.show = true;
  },
  [CLOSE](state2) {
    state2.show = false;
  }
};
const state$7 = {
  color: "info",
  text: "",
  show: false
};
const UISnackbar = {
  namespaced: false,
  state: state$7,
  mutations: mutations$7,
  getters: getters$7,
  actions: actions$7
};
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USER_DETAILS_SUCCESS = "FETCH_USER_DETAILS_SUCCESS";
const { t: t$9 } = i18n.global;
const endpoint$6 = "/api/users/";
const name$8 = "users";
const actions$6 = {
  [`${name$8}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$6}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_USERS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$9("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$8}/details`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$6}details?${query}`).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$9("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$8}/create`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$6}create`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$9("snackbar.success.created")
          });
          resolve(response);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$9("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$9("snackbar.fail.create")
        });
        reject(error2);
      });
    });
  },
  [`${name$8}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$6}update`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$9("snackbar.success.updated")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$9("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$9("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$9("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  },
  [`${name$8}/delete`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.delete(`${endpoint$6}delete`, { data: payload }).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$9("snackbar.success.deleted")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$9("snackbar.fail.delete")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$9("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$9("snackbar.fail.delete")
        });
        reject(error2);
      });
    });
  },
  [`${name$8}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$6}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"users"}-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$9("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name$7 = "user";
const getters$6 = {
  [`${name$7}/data`](state2) {
    return state2.data;
  }
};
const mutations$6 = {
  [FETCH_USERS_SUCCESS](state2, { data }) {
    state2.data = data;
  },
  [FETCH_USER_DETAILS_SUCCESS](state2, { data }) {
    state2.detailsData = data;
  }
};
const state$6 = {
  data: [],
  detailsData: {}
};
const User = {
  namespaced: false,
  state: state$6,
  mutations: mutations$6,
  getters: getters$6,
  actions: actions$6
};
const FETCH_DUTIES_SUCCESS = "FETCH_DUTIES_SUCCESS";
const { t: t$8 } = i18n.global;
const endpoint$5 = "/api/users/duty/";
const name$6 = "users/duty";
const actions$5 = {
  [`${name$6}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$5}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_DUTIES_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$8("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$6}/details`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$5}details?${query}`).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$8("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$6}/create`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$5}create`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$8("snackbar.success.created")
          });
          let res = response.data;
          resolve(res);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$8("snackbar.fail.create")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$8("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$8("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  },
  [`${name$6}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$5}update`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$8("snackbar.success.updated")
          });
          let res = response.data;
          resolve(res);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$8("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$8("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$8("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  },
  [`${name$6}/delete`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.delete(`${endpoint$5}delete`, { data: payload }).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$8("snackbar.success.deleted")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$8("snackbar.fail.delete")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$8("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$8("snackbar.fail.delete")
        });
        reject(error2);
      });
    });
  },
  [`${name$6}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint$5}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"user_duty"}-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$8("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const getters$5 = {};
const mutations$5 = {
  [FETCH_DUTIES_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$5 = {
  data: {}
};
const UserDuty = {
  namespaced: false,
  state: state$5,
  mutations: mutations$5,
  getters: getters$5,
  actions: actions$5
};
const FETCH_DUTYCALENDAR_SUCCESS = "FETCH_DUTYCALENDAR_SUCCESS";
const { t: t$7 } = i18n.global;
const endpoint$4 = "/api/users/duty/calendar/";
const name$5 = "users/duty/calendar";
const actions$4 = {
  [`${name$5}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$4}get`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_DUTYCALENDAR_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$7("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const getters$4 = {};
const mutations$4 = {
  [FETCH_DUTYCALENDAR_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$4 = {
  data: [],
  events: []
};
const UserDutyCalendar = {
  namespaced: false,
  state: state$4,
  mutations: mutations$4,
  getters: getters$4,
  actions: actions$4
};
const FETCH_EMPLOYEE_SUCCESS = "FETCH_EMPLOYEE_SUCCESS";
const { t: t$6 } = i18n.global;
const endpoint$3 = "/api/users/employee/";
const name$4 = "users/employee";
const actions$3 = {
  [`${name$4}/get`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$3}get?${query}`).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_EMPLOYEE_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$6("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$4}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$3}update`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$6("snackbar.success.updated")
          });
          let res = response.data;
          resolve(res);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$6("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$6("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$6("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  }
};
const getters$3 = {
  employee(state2) {
    return state2.data;
  }
};
const mutations$3 = {
  [FETCH_EMPLOYEE_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$3 = {
  data: {}
};
const UserEmployee = {
  namespaced: false,
  state: state$3,
  mutations: mutations$3,
  getters: getters$3,
  actions: actions$3
};
const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
const { t: t$5 } = i18n.global;
const endpoint$2 = "/api/users/event/";
const name$3 = "users/event";
const actions$2 = {
  [`${name$3}/get`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$2}get?${query}`).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_EVENTS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$5("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$3}/post`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$2}update`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$5("snackbar.success.updated")
          });
          let res = response.data;
          resolve(res);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$5("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$5("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$5("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  },
  [`${name$3}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$2}update`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$5("snackbar.success.updated")
          });
          let res = response.data;
          resolve(res);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$5("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$5("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$5("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  }
};
const getters$2 = {
  data(state2) {
    return state2.data;
  }
};
const mutations$2 = {
  [FETCH_EVENTS_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$2 = {
  data: []
};
const UserEvent = {
  namespaced: false,
  state: state$2,
  mutations: mutations$2,
  getters: getters$2,
  actions: actions$2
};
const FETCH_PERMISSION_SUCCESS = "FETCH_PERMISSION_SUCCESS";
const { t: t$4 } = i18n.global;
const endpoint$1 = "/api/users/permission/";
const name$2 = "users/permission";
const actions$1 = {
  [`${name$2}/get`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint$1}get?${query}`).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          commit(FETCH_PERMISSION_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$4("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$2}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint$1}update`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$4("snackbar.success.updated")
          });
          let res = response.data;
          resolve(res);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$4("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$4("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$4("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  }
};
const getters$1 = {
  permission(state2) {
    return state2.data;
  }
};
const mutations$1 = {
  [FETCH_PERMISSION_SUCCESS](state2, { data }) {
    state2.data = data;
  }
};
const state$1 = {
  data: {}
};
const UserPermission = {
  namespaced: false,
  state: state$1,
  mutations: mutations$1,
  getters: getters$1,
  actions: actions$1
};
const FETCH_WAREHOUSES_SUCCESS = "FETCH_WAREHOUSES_SUCCESS";
const FETCH_WAREHOUSE_DETAILS_SUCCESS = "FETCH_WAREHOUSE_DETAILS_SUCCESS";
const { t: t$3 } = i18n.global;
const endpoint = "/api/goods/warehouses/";
const name$1 = "goods/warehouses";
const actions = {
  [`${name$1}/get`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint}get`, payload).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          commit(FETCH_WAREHOUSES_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$3("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$1}/details`]({ commit, dispatch }, payload) {
    let query = queryString.stringify(payload);
    return new Promise((resolve, reject) => {
      instance.get(`${endpoint}details?${query}`).then(function(response) {
        if (!response.data.error) {
          let res = response.data;
          commit(FETCH_WAREHOUSE_DETAILS_SUCCESS, res);
          resolve(res);
        } else {
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$3("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  },
  [`${name$1}/create`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint}create`, payload).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$3("snackbar.success.created")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$3("snackbar.fail.created")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$3("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$3("snackbar.fail.created")
        });
        reject(error2);
      });
    });
  },
  [`${name$1}/update`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.post(`${endpoint}update`, payload).then(function(response) {
        if (!response.data.error && "data" in response.data) {
          let res = response.data;
          dispatch("snackbar/show", {
            color: "success",
            text: t$3("snackbar.success.updated")
          });
          resolve(res);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$3("snackbar.fail.update")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$3("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$3("snackbar.fail.update")
        });
        reject(error2);
      });
    });
  },
  [`${name$1}/delete`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance.delete(`${endpoint}delete`, { data: payload }).then(function(response) {
        if (!response.data.error) {
          dispatch("snackbar/show", {
            color: "success",
            text: t$3("snackbar.success.deleted")
          });
          resolve(response);
        } else {
          dispatch("snackbar/show", {
            color: "error",
            text: t$3("snackbar.fail.delete")
          });
          reject(response);
        }
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$3("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        dispatch("snackbar/show", {
          color: "error",
          text: t$3("snackbar.fail.delete")
        });
        reject(error2);
      });
    });
  },
  [`${name$1}/export`]({ commit, dispatch }, payload) {
    return new Promise((resolve, reject) => {
      instance({
        url: `${endpoint}export`,
        method: "POST",
        data: payload,
        responseType: "blob"
      }).then((response) => {
        let fileURL = window.URL.createObjectURL(
          new Blob([response.data])
        );
        let fileLink = document.createElement("a");
        fileLink.href = fileURL;
        fileLink.setAttribute(
          "download",
          `${"warehouses"}-${moment().format("YYYYMMDD")}.pdf`
        );
        document.body.appendChild(fileLink);
        fileLink.click();
        resolve();
      }).catch(function(error2) {
        let status2 = error2.response.status;
        switch (status2) {
          case 401:
            dispatch("snackbar/show", {
              color: "success",
              text: t$3("snackbar.fail.token")
            });
            dispatch("auth/logout");
            router$2.push({ name: "Login" });
            break;
        }
        reject(error2);
      });
    });
  }
};
const name = "warehouse";
const getters = {
  [`${name}/data`](state2) {
    return state2.data;
  },
  [`${name}/data/details`](state2) {
    return state2.detailsData;
  }
};
const mutations = {
  [FETCH_WAREHOUSES_SUCCESS](state2, { data }) {
    state2.data = data;
  },
  [FETCH_WAREHOUSE_DETAILS_SUCCESS](state2, { data }) {
    state2.detailsData = data;
  }
};
const state = {
  data: [],
  detailsData: {}
};
const Warehouses = {
  namespaced: false,
  state,
  mutations,
  getters,
  actions
};
const ls = new SecureLS({ isCompression: false });
const store = createStore({
  strict: process.env.NODE_ENV !== "production",
  modules: {
    // API
    dashboard: Dashboard,
    auth: Auth,
    ["exchange-rates"]: ExchangeRate,
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
    ["goods/quicksearch"]: GoodsQuickSearch,
    ["goods/shippings"]: GoodsShipping,
    ["goods/shipping-cart"]: GoodsShippingCart,
    ["goods/shippings/packing"]: GoodsShippingPacking,
    ["goods/shippings/purchases/quicksearch"]: GoodsShippingPurchaseQuickSearch,
    ["goods/shippings/mailer"]: GoodsShipingMailer,
    ["goods/shippings/invoices"]: GoodsShippingInvoice,
    ["goods/shippings/available-shippings-items"]: GoodsShipAvailableShippingItems,
    ["goods/shippings/alteration"]: GoodsShippingAlteration,
    ["goods/stocks"]: GoodsStock,
    ["goods/stocks/calendar"]: GoodsStockCalendar,
    ["goods/purchases"]: Purchases,
    ["goods/purchases/invoices"]: PurchaseInvoice,
    ["goods/purchases/stocktakes"]: PurchaseStockTake,
    ["goods/create-shipping-config"]: GoodsCreateShippingConfig,
    ["sales-reports"]: SalesReports,
    ["sales-reports/chart"]: SalesReportChart,
    ["sales-reports/stockchart"]: SalesReportStockChart,
    ["sales-reports/top-sales"]: SalesReportTopSales,
    ["sales-reports/top-stocks"]: SalesReportTopSocks,
    categories: Categories,
    suppliers: Suppliers,
    warehouses: Warehouses,
    clients: Clients,
    [""]: ClientMonthlyStatements,
    ["chart/purchase-line"]: PurchaseLineChart,
    // UI
    ["ui/sidebar"]: UISidebar,
    ["ui/alart"]: UIAlert,
    ["ui/snackbar"]: UISnackbar
  },
  // plugins: [createPersistedState({ storage: window.sessionStorage })]
  plugins: [
    createPersistedState({
      storage: {
        getItem: (key) => {
          let item = ls.get(key);
          if (item) {
            let state2 = JSON.parse(item);
            return state2;
          }
          return {};
        },
        // Please see https://github.com/js-cookie/js-cookie#json, on how to handle JSON.
        setItem: (key, state2) => {
          let str = JSON.stringify(state2);
          ls.set(key, str);
        },
        removeItem: (key) => ls.remove(key)
      }
    })
  ]
});
const { t: t$2 } = i18n.global;
const _adminNav = [
  {
    component: "CNavItem",
    name: t$2("dashboard"),
    to: "/dashboard",
    icon: "cil-speedometer"
  },
  {
    component: "CNavTitle",
    name: t$2("management")
  },
  {
    component: "CNavItem",
    name: t$2("sales-reports"),
    to: "/sales-reports",
    icon: "cil-chart-line"
  },
  {
    component: "CNavItem",
    name: t$2("users"),
    to: "/users",
    icon: "cil-contact"
  },
  {
    component: "CNavItem",
    name: t$2("duty"),
    to: "/duty",
    icon: "cil-calendar-check"
  },
  {
    component: "CNavItem",
    name: t$2("goods"),
    to: "/goods",
    icon: "cil-square"
  },
  {
    component: "CNavItem",
    name: t$2("stocks"),
    to: "/stocks",
    icon: "cil-square"
  },
  {
    component: "CNavItem",
    name: t$2("purchases.title"),
    to: "/purchases",
    icon: "cil-storage"
  },
  {
    component: "CNavItem",
    name: t$2("shippings.title"),
    to: "/shippings",
    icon: "cil-truck"
  },
  {
    component: "CNavItem",
    name: t$2("suppliers"),
    to: "/suppliers",
    icon: "cil-people"
  },
  {
    component: "CNavItem",
    name: t$2("categories"),
    to: "/categories",
    icon: "cil-short-text"
  },
  {
    component: "CNavItem",
    name: t$2("warehouses"),
    to: "/warehouses",
    icon: "cil-room"
  },
  {
    component: "CNavItem",
    name: t$2("clients"),
    to: "/clients",
    icon: "cil-people"
  },
  {
    component: "CNavItem",
    name: t$2("exchange-rates"),
    to: "/exchange-rates",
    icon: "cil-dollar"
  }
];
const { t: t$1 } = i18n.global;
const { permissions } = store.getters;
const _employeeNav = [
  {
    component: "CNavItem",
    name: t$1("dashboard"),
    to: "/dashboard",
    icon: "cil-speedometer"
  },
  ...permissions["sales-reports"] ? [
    {
      component: "CNavItem",
      name: t$1("sales-reports"),
      to: "/sales-reports",
      icon: "cil-chart-line"
    }
  ] : [],
  ...permissions.users ? [
    {
      component: "CNavItem",
      name: t$1("users"),
      to: "/users",
      icon: "cil-contact"
    }
  ] : [],
  ...permissions.goods ? [
    {
      component: "CNavItem",
      name: t$1("goods"),
      to: "/goods",
      icon: "cil-square"
    }
  ] : [],
  ...permissions.stocks ? [
    {
      component: "CNavItem",
      name: t$1("stocks"),
      to: "/stocks",
      icon: "cil-square"
    }
  ] : [],
  ...permissions.purchases ? [
    {
      component: "CNavItem",
      name: t$1("purchases.title"),
      to: "/purchases",
      icon: "cil-storage"
    }
  ] : [],
  ...permissions.purchases ? [
    {
      component: "CNavItem",
      name: t$1("shippings.title"),
      to: "/shippings",
      icon: "cil-truck"
    }
  ] : [],
  ...permissions.suppliers ? [
    {
      component: "CNavItem",
      name: t$1("suppliers"),
      to: "/suppliers",
      icon: "cil-people"
    }
  ] : [],
  ...permissions.categories ? [
    {
      component: "CNavItem",
      name: t$1("categories"),
      to: "/categories",
      icon: "cil-short-text"
    }
  ] : [],
  ...permissions.warehouses ? [
    {
      component: "CNavItem",
      name: t$1("warehouses"),
      to: "/warehouses",
      icon: "cil-room"
    }
  ] : [],
  ...permissions.clients ? [
    {
      component: "CNavItem",
      name: t$1("clients"),
      to: "/clients",
      icon: "cil-people"
    }
  ] : []
];
const { isAdmin } = store.getters;
const normalizePath = (path) => decodeURI(path).replace(/#.*$/, "").replace(/(index)?\.(html)$/, "");
const isActiveLink = (route2, link) => {
  if (link === void 0) {
    return false;
  }
  if (route2.hash === link) {
    return true;
  }
  const currentPath = normalizePath(route2.path);
  const targetPath = normalizePath(link);
  return currentPath === targetPath;
};
const isActiveItem = (route2, item) => {
  if (isActiveLink(route2, item.to)) {
    return true;
  }
  if (item.items) {
    return item.items.some((child) => isActiveItem(route2, child));
  }
  return false;
};
const TheSidebarNav = defineComponent({
  name: "TheSidebarNav",
  data() {
    return {
      nav: [],
      buffor: []
    };
  },
  components: {
    CNavItem,
    CNavGroup,
    CNavTitle
  },
  setup(props, context) {
    const route2 = useRoute();
    const firstRender = ref(true);
    onMounted(() => {
      firstRender.value = false;
    });
    const renderItem = (item) => {
      if (item.items) {
        return h(
          CNavGroup,
          {
            as: "div",
            compact: true,
            ...firstRender.value && {
              visible: item.items.some(
                (child) => isActiveItem(route2, child)
              )
            }
          },
          {
            togglerContent: () => [
              h(resolveComponent("CIcon"), {
                customClassName: "nav-icon",
                name: item.icon
              }),
              item.name
            ],
            default: () => item.items.map((child) => renderItem(child))
          }
        );
      }
      return item.to ? h(
        RouterLink,
        {
          to: item.to,
          custom: true
        },
        {
          default: (props2) => h(
            resolveComponent(item.component),
            {
              active: props2.isActive,
              as: "div",
              href: props2.href,
              onClick: () => props2.navigate()
            },
            {
              default: () => [
                item.icon ? h(resolveComponent("CIcon"), {
                  customClassName: "nav-icon",
                  name: item.icon
                }) : h(
                  "span",
                  { class: "nav-icon" },
                  h("span", {
                    class: "nav-icon-bullet"
                  })
                ),
                item.name,
                item.badge && h(
                  CBadge,
                  {
                    class: "ms-auto",
                    color: item.badge.color
                  },
                  {
                    default: () => item.badge.text
                  }
                )
              ]
            }
          )
        }
      ) : h(
        resolveComponent(item.component),
        {
          as: "div"
        },
        {
          default: () => item.name
        }
      );
    };
    return () => h(
      CSidebarNav,
      {
        as: simplebar
      },
      {
        default: () => isAdmin ? _adminNav.map((item) => renderItem(item)) : _employeeNav.map((item) => renderItem(item))
      }
    );
  }
});
const __default__ = {
  computed: {
    ...mapState(["ui/sidebar"]),
    logo() {
      return new URL("@images/header-logo-full.png", import.meta.url).href;
    },
    sygnet() {
      return new URL("@images/header-logo.png", import.meta.url).href;
    },
    unfoldable() {
      return this["ui/sidebar"].unfoldable;
    },
    visible() {
      return this["ui/sidebar"].visible;
    }
  },
  methods: {
    toggleVisible(value) {
      this.$store.dispatch("ui/sidebar/toggleVisible", value);
    },
    toggleUnfoldable() {
      this.$store.dispatch("ui/sidebar/toggleUnfoldable");
    }
  }
};
const _sfc_main$2 = /* @__PURE__ */ Object.assign(__default__, {
  __name: "TheSidebar",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CSidebar = resolveComponent("CSidebar");
      const _component_CSidebarHeader = resolveComponent("CSidebarHeader");
      const _component_CSidebarBrand = resolveComponent("CSidebarBrand");
      const _component_CCloseButton = resolveComponent("CCloseButton");
      const _component_CSidebarFooter = resolveComponent("CSidebarFooter");
      const _component_CSidebarToggler = resolveComponent("CSidebarToggler");
      _push(ssrRenderComponent(_component_CSidebar, mergeProps({
        class: "border-end",
        colorScheme: "dark",
        position: "fixed",
        unfoldable: _ctx.unfoldable,
        visible: _ctx.visible,
        onVisibleChange: (value) => _ctx.toggleVisible(value)
      }, _attrs), {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_CSidebarHeader, { class: "border-bottom" }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(RouterLink), {
                    custom: "",
                    to: "/"
                  }, {
                    default: withCtx(({ href, navigate }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_CSidebarBrand, mergeProps(_ctx.$attrs, {
                          as: "a",
                          href,
                          onClick: navigate
                        }), {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<img class="sidebar-brand-full"${ssrRenderAttr("src", _ctx.logo)} height="32"${_scopeId4}><img class="sidebar-brand-narrow"${ssrRenderAttr("src", _ctx.sygnet)} height="32"${_scopeId4}>`);
                            } else {
                              return [
                                createVNode("img", {
                                  class: "sidebar-brand-full",
                                  src: _ctx.logo,
                                  height: "32"
                                }, null, 8, ["src"]),
                                createVNode("img", {
                                  class: "sidebar-brand-narrow",
                                  src: _ctx.sygnet,
                                  height: "32"
                                }, null, 8, ["src"])
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_CSidebarBrand, mergeProps(_ctx.$attrs, {
                            as: "a",
                            href,
                            onClick: navigate
                          }), {
                            default: withCtx(() => [
                              createVNode("img", {
                                class: "sidebar-brand-full",
                                src: _ctx.logo,
                                height: "32"
                              }, null, 8, ["src"]),
                              createVNode("img", {
                                class: "sidebar-brand-narrow",
                                src: _ctx.sygnet,
                                height: "32"
                              }, null, 8, ["src"])
                            ]),
                            _: 2
                          }, 1040, ["href", "onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_CCloseButton, {
                    class: "d-lg-none",
                    dark: "",
                    onClick: ($event) => _ctx.toggleVisible()
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(unref(RouterLink), {
                      custom: "",
                      to: "/"
                    }, {
                      default: withCtx(({ href, navigate }) => [
                        createVNode(_component_CSidebarBrand, mergeProps(_ctx.$attrs, {
                          as: "a",
                          href,
                          onClick: navigate
                        }), {
                          default: withCtx(() => [
                            createVNode("img", {
                              class: "sidebar-brand-full",
                              src: _ctx.logo,
                              height: "32"
                            }, null, 8, ["src"]),
                            createVNode("img", {
                              class: "sidebar-brand-narrow",
                              src: _ctx.sygnet,
                              height: "32"
                            }, null, 8, ["src"])
                          ]),
                          _: 2
                        }, 1040, ["href", "onClick"])
                      ]),
                      _: 1
                    }),
                    createVNode(_component_CCloseButton, {
                      class: "d-lg-none",
                      dark: "",
                      onClick: ($event) => _ctx.toggleVisible()
                    }, null, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(TheSidebarNav), null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_CSidebarFooter, { class: "border-top d-none d-lg-flex" }, {
              default: withCtx((_3, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_CSidebarToggler, {
                    onClick: ($event) => _ctx.toggleUnfoldable()
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_CSidebarToggler, {
                      onClick: ($event) => _ctx.toggleUnfoldable()
                    }, null, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_CSidebarHeader, { class: "border-bottom" }, {
                default: withCtx(() => [
                  createVNode(unref(RouterLink), {
                    custom: "",
                    to: "/"
                  }, {
                    default: withCtx(({ href, navigate }) => [
                      createVNode(_component_CSidebarBrand, mergeProps(_ctx.$attrs, {
                        as: "a",
                        href,
                        onClick: navigate
                      }), {
                        default: withCtx(() => [
                          createVNode("img", {
                            class: "sidebar-brand-full",
                            src: _ctx.logo,
                            height: "32"
                          }, null, 8, ["src"]),
                          createVNode("img", {
                            class: "sidebar-brand-narrow",
                            src: _ctx.sygnet,
                            height: "32"
                          }, null, 8, ["src"])
                        ]),
                        _: 2
                      }, 1040, ["href", "onClick"])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_CCloseButton, {
                    class: "d-lg-none",
                    dark: "",
                    onClick: ($event) => _ctx.toggleVisible()
                  }, null, 8, ["onClick"])
                ]),
                _: 1
              }),
              createVNode(unref(TheSidebarNav)),
              createVNode(_component_CSidebarFooter, { class: "border-top d-none d-lg-flex" }, {
                default: withCtx(() => [
                  createVNode(_component_CSidebarToggler, {
                    onClick: ($event) => _ctx.toggleUnfoldable()
                  }, null, 8, ["onClick"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/containers/TheSidebar.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = {
  __name: "DefaultLayout",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_router_view = resolveComponent("router-view");
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<div class="wrapper d-flex flex-column min-vh-100">`);
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`<div class="body flex-grow-1">`);
      _push(ssrRenderComponent(unref(CContainer), {
        class: "px-4 pb-4",
        lg: ""
      }, {
        default: withCtx((_2, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_router_view, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_router_view)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(TheFooter, null, null, _parent));
      _push(`</div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/layouts/DefaultLayout.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const { t } = i18n.global;
const routes = [
  {
    path: "/",
    name: "home",
    component: _sfc_main$1,
    redirect: "/dashboard",
    beforeEnter(to, from, next2) {
      const isAuthenticated = store.getters.isAuthenticated;
      if (isAuthenticated) {
        next2();
      } else {
        next2("/login");
      }
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("./assets/Dashboard-Df9Kl7_x.mjs")
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("./assets/Profile-BuYFDHAD.mjs")
      },
      {
        path: "exchange-rates",
        name: "route.exchange-rates.home",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          }
        },
        // component: () =>
        //     import("@/views/exchange-rates/ExchangeRate.vue"),
        children: [
          {
            path: "",
            name: "route.exchange-rates.table",
            component: () => import("./assets/ExchangeRate-KKbXVwDu.mjs")
          },
          {
            path: "details/:base/:symbol",
            name: "route.exchange-rates.details",
            component: () => import("./assets/ExchangeRateDetails-UFRyn0w3.mjs")
          }
        ]
      },
      {
        path: "leaves",
        name: "route.leaves.home",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          }
        },
        children: [
          {
            path: "create/:id",
            name: "route.leaves.create",
            component: () => import("./assets/CreateLeave-CSZcWO4M.mjs")
          }
        ]
      },
      {
        path: "sales-reports",
        name: "route.sales-reports.home",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          }
        },
        children: [
          {
            path: "",
            name: "route.sales-reports.table",
            component: () => import("./assets/SalesReports-Ct5SvfDg.mjs")
          }
        ]
      },
      {
        path: "users",
        name: "route.users.home",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          }
        },
        children: [
          {
            path: "",
            name: "route.users.table",
            component: () => import("./assets/Users-BHnFRYgh.mjs")
          },
          {
            path: "create",
            name: "route.users.create",
            component: () => import("./assets/CreateUser-BWlfwZwP.mjs")
          },
          {
            path: "details/:id",
            name: "route.users.details",
            component: () => import("./assets/UserDetails-CALZ8BYd.mjs")
          }
        ]
      },
      {
        path: "duty",
        name: "route.duty.home",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          }
        },
        children: [
          {
            path: "",
            name: "route.duty.table",
            component: () => import("./assets/Duty-CVpTmUNK.mjs")
          },
          {
            path: "create/:userId?",
            name: "route.duty.create",
            component: () => import("./assets/CreateDuty-D0zpLS_n.mjs")
          },
          {
            path: "details/:id",
            name: "route.duty.details",
            component: () => import("./assets/DutyDetails-KdWlrRyg.mjs")
          }
        ]
      },
      {
        path: "goods",
        name: "route.goods.home",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          }
        },
        children: [
          {
            path: "",
            name: "route.goods.table",
            component: () => import("./assets/Goods-BhlJcWw0.mjs")
          },
          {
            path: "create",
            name: "route.goods.create",
            component: () => import("./assets/CreateGoods-CBsbZHAS.mjs")
          },
          {
            path: "details/:id",
            name: "route.goods.details",
            component: () => import("./assets/GoodsDetails-CrC2cpak.mjs")
          }
        ]
      },
      {
        path: "stocks",
        name: "route.stocks.home",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          }
        },
        children: [
          {
            path: "",
            name: "route.stocks.table",
            component: () => import("./assets/GoodsStock-D8ZQDOH3.mjs")
          }
        ]
      },
      {
        path: "purchases",
        name: "route.purchases.home",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          }
        },
        children: [
          {
            path: "",
            name: "route.purchases.table",
            component: () => import("./assets/Purchases-CEdkTTZJ.mjs")
          },
          {
            path: "create/:id",
            name: "route.purchases.create",
            component: () => import("./assets/CreatePurchase-DS6TYJ5w.mjs")
          },
          {
            path: "details/:id",
            name: "route.purchases.details",
            component: () => import("./assets/PurchaseDetails-2ZSdFPma.mjs")
          },
          {
            path: "stocktakes/:id",
            name: "route.purchases.stocktakes",
            component: () => import("./assets/Stocktake-DQ0aDJKn.mjs")
          }
        ]
      },
      {
        path: "shippings",
        name: "route.shippings.home",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          }
        },
        children: [
          {
            path: "",
            name: "route.shippings.table",
            component: () => import("./assets/Shippings-D0V3ipC0.mjs")
          },
          {
            path: "create",
            name: "route.shippings.create",
            component: () => import("./assets/CreateShipping-DOwNZ49-.mjs")
          },
          {
            path: "details/:id",
            name: "route.shippings.details",
            component: () => import("./assets/ShippingDetails-Cde5rr2e.mjs")
          }
        ]
      },
      {
        path: "suppliers",
        name: "route.suppliers.home",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          }
        },
        children: [
          {
            path: "",
            name: "route.suppliers.table",
            component: () => import("./assets/Suppliers-BjRuYEex.mjs")
          },
          {
            path: "create",
            name: "route.suppliers.create",
            component: () => import("./assets/CreateSupplier-COXM1tsE.mjs")
          },
          {
            path: "details/:id",
            name: "route.suppliers.details",
            component: () => import("./assets/SupplierDetails-m-OjS4hc.mjs")
          }
        ]
      },
      {
        path: "categories",
        name: "route.categories.home",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          }
        },
        children: [
          {
            path: "",
            name: "route.categories.table",
            component: () => import("./assets/Categories-Cc1-MSkN.mjs")
          },
          {
            path: "create",
            name: "route.categories.create",
            component: () => import("./assets/CreateCategory-Brou3WmA.mjs")
          },
          {
            path: "details/:id",
            name: "route.categories.details",
            component: () => import("./assets/CategoryDetails-DVADFbfB.mjs")
          }
        ]
      },
      {
        path: "warehouses",
        name: "route.warehouses.home",
        component: {
          render() {
            return h(resolveComponent("router-view"));
          }
        },
        children: [
          {
            path: "",
            name: "route.warehouses.table",
            component: () => import("./assets/Warehouses-Cm41wPcp.mjs")
          },
          {
            path: "create",
            name: "route.warehouses.create",
            component: () => import("./assets/CreateWarehouse-BQSM2o7X.mjs")
          },
          {
            path: "details/:id",
            name: "route.warehouses.details",
            component: () => import("./assets/WarehouseDetails-CeSZpLVj.mjs")
          }
        ]
      },
      {
        path: "clients",
        name: t("clients"),
        component: {
          render() {
            return h(resolveComponent("router-view"));
          }
        },
        children: [
          {
            path: "",
            name: "route.clients.table",
            component: () => {
              console.log("import");
              return import("./assets/Clients-RqaLa7vS.mjs");
            }
          },
          {
            path: "create",
            name: "route.clients.create",
            component: () => import("./assets/CreateClient-yIKcLguM.mjs")
          },
          {
            path: "details/:id",
            name: "route.clients.details",
            component: () => import("./assets/ClientDetails-DqzyUBE-.mjs")
          }
        ]
      }
    ]
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./assets/Login-VUnbiytk.mjs"),
    beforeEnter(to, from, next2) {
      const isAuthenticated = store.getters.isAuthenticated;
      if (isAuthenticated) {
        next2("/dashboard");
      } else {
        next2();
      }
    }
  },
  {
    path: "/forgotpassword",
    name: "forgotpassword",
    component: () => import("./assets/ForgotPassword-Cl7r6CVd.mjs")
  },
  {
    path: "/auth/forgotpassword/reset/:id/:token",
    name: "forgotpassword.reset",
    component: () => import("./assets/ResetPassword-BQwZLm6H.mjs")
  },
  {
    path: "/:catchAll(.*)",
    name: "not-found",
    component: () => import("./assets/404-B0DHqr87.mjs")
  }
];
const router$1 = createRouter({
  history: createWebHashHistory("/"),
  // history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  }
});
const router$2 = router$1;
String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
};
Number.prototype.format = function(n, x) {
  const re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\." : "$") + ")";
  return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, "g"), "$&,");
};
Date.prototype.toMyDateString = function() {
  let y = this.getFullYear();
  let m = `0${this.getMonth() + 1}`.slice(-2);
  let d = `0${this.getDate()}`.slice(-2);
  return `${y}-${m}-${d}`;
};
Number.prototype.abbreviateAmount = function() {
  let isNegative = false;
  let num = this;
  let formattedNumber = 0;
  if (num < 0) {
    isNegative = true;
  }
  num = Math.abs(num);
  if (num >= 1e9) {
    formattedNumber = (num / 1e9).toFixed(1).replace(/\.0$/, "") + "G";
  } else if (num >= 1e6) {
    formattedNumber = (num / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (num >= 1e3) {
    formattedNumber = (num / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  } else {
    formattedNumber = num;
  }
  if (isNegative) {
    formattedNumber = "-" + formattedNumber;
  }
  return formattedNumber;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_router_view = resolveComponent("router-view");
  _push(ssrRenderComponent(_component_router_view, _attrs, null, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/views/App.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
var define_import_meta_env_default = { BASE_URL: "/", DEV: false, MODE: "production", PROD: true, SSR: true, VITE_APP_NAME: "永行貿易有限公司" };
Object.keys(rules).forEach((rule) => {
  if (typeof rules[rule] === "function") {
    defineRule(rule, rules[rule]);
  }
});
configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true
});
setLocale("zh_TW");
const app = createApp(App);
app.config.globalProperties.$appName = define_import_meta_env_default.APP_NAME;
app.config.globalProperties.$env = define_import_meta_env_default.APP_ENV;
app.config.globalProperties.$url = define_import_meta_env_default.APP_URL;
app.config.globalProperties.$momentDateFormat = "dddd, Do MMMM YYYY";
app.config.globalProperties.$filters = {
  formatPrice(value) {
    return format(value);
  }
};
app.config.globalProperties.$log = console.log;
app.config.globalProperties.$moment = moment;
app.config.globalProperties.$formatDate = (value) => {
  if (!value) return "";
  return moment(value).format("YYYY-DD-MM");
};
app.use(CoreuiVue);
app.use(router$2);
app.use(i18n);
app.use(store);
app.use(vuetify);
app.provide("icons", iconsSet);
app.component("Popper", Popper);
app.component(VueBarcode.name, VueBarcode);
app.component(VueNumberInput.name, VueNumberInput);
app.component("CIcon", CIcon);
app.component("ErrorMessage", ErrorMessage);
app.mount("#app");
export {
  AddNewShippingItemsTableDialog as A,
  CreateShippingDialog as C,
  DutyCalendar as D,
  ExchangeRateTable as E,
  Snackbar as S,
  TextFieldColorPicker as T,
  _export_sfc as _,
  Dialog as a,
  StockCalendar as b,
  codes as c,
  defaults as d,
  currencies as e,
  ExchangeRate$1 as f,
  ScannerDialog as g,
  ShippingPurchaseQuickSearch as h,
  shippingStatus as i,
  purchaseStatus as p,
  roles as r,
  sizes as s,
  types as t
};
//# sourceMappingURL=app.mjs.map
