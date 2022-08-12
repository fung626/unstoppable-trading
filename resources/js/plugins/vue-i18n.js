import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

// const { locale, translations } = window.navigator;

// const i18n = new VueI18n({
//     locale,
//     messages: {
//         [locale]: translations
//     }
// });

const i18n = new VueI18n({
    locale: "tc",
    messages: {
        en: {
            auth: {
                signin: {
                    msg: "Sign In to your account"
                },
                forgotpassword: {
                    title: "Forgot your password?",
                    msg:
                        "Enter the email address associated with your account and we will send you a link to reset your password."
                }
            },
            login: "Login",
            logout: "Logout",
            prev: "Prev",
            next: "Next",
            start: "Start",
            end: "End",
            forgotpassword: "Forgot Password",
            oldpassword: "Old Password",
            newpassword: "New Password",
            confirmpassword: "Confirm Password",
            password: "Password",
            table: "Table",
            profile: "Profile",
            settings: "Settings",
            salesreport: "Sales Report",
            management: "Management",
            home: "Home",
            dashboard: "Dashboard",
            empty: "Empty",
            more: "More",
            example: "Example",
            number: "Number",
            role: "Role",
            user: "User",
            permission: "Permission",
            salary: "Salary",
            goods: "Goods",
            goodsname: "Name",
            goodsitem: "Goods Item",
            goodscontent: "Goods Content",
            contentkey: "Key",
            contentvalue: "Value",
            stock: "Stock",
            unitprice: "Unit Price",
            totalunit: "Total Unit",
            defaultunit: "Default Unit",
            updatedunit: "Updated Unit",
            cost: "Cost",
            stockunit: "Stock Unit",
            client: "Client",
            supplier: "Supplier",
            category: "Category",
            categories: "Categories",
            purchase: "Purchase",
            warehouse: "Warehouse",
            details: "Details",
            info: "Info",
            description: "Description",
            price: {
                cost: "Cost",
                retail: "Retail Price",
                wholesale: "Wholesale Price"
            },
            subtotal: "Sub Total",
            name: "Name",
            email: "Email",
            contact: "Contact",
            countrycode: "Country Code",
            phone: "Phone",
            fax: "Fax",
            sector: "Sector",
            shelf: "Shelf",
            segment: "Segment",
            district: "District",
            address: "Address",
            type: "Type",
            status: "Status",
            creator: "Creator",
            date: "Date",
            cup: "Cup",
            color: "Color",
            size: "Size",
            barcode: "Barcode",
            updatedat: "Updated at",
            createdat: "Created at",
            actions: "Actions",
            currency: "Currency",
            invoice: "Invoice",
            stockalert: "Stock Alert",
            stocktake: "Stock Take",
            shipping: "Shipping",
            mailerinfo: "Mailer Info",
            packing: "Packing",
            update: "Update",
            return: "Return",
            delete: "Delete",
            alteration: "Alteration",
            altered: "Altered",
            quantity: "Quantity",
            unit: "Unit",
            scanner: "Scanner",
            search: "Search",
            admin: "Admin",
            ADMIN: "ADMIN",
            employee: "Employee",
            EMPLOYEE: "EMPLOYEE",
            employer: "employer",
            duty: "Duty",
            dutylist: "Duty List",
            calendar: {
                month: "Month",
                week: "Week",
                day: "Day"
            },
            mpf: {
                contribution: " MPF Contribution"
            },
            traffic: "Traffic",
            joinedat: "Joined at",
            leftat: "Left at",
            exchangerate: "Exchange Rate",
            averageinventory: "Average Inventory",
            inventoryturnover: "Inventory Turnover",
            inventorychange: "Inventory Change",
            daysinventoryoutstanding: "Days Inventory Outstanding",
            lastthreemonths: "Last Three Months",
            purchasestatus: {
                pending: "Pending",
                PENDING: "Pending",
                processing: "Processing",
                PROCESSING: "Processing",
                delivered: "Delivered",
                DELIVERED: "Delivered"
            },
            shipstatus: {
                pending: "Pending",
                PENDING: "Pending",
                processing: "Processing",
                PROCESSING: "Processing",
                delivered: "Delivered",
                DELIVERED: "Delivered"
            },
            currencies: {
                HKD: "HKD",
                TWD: "TWD"
            },
            country: {
                HK: "Hong Kong",
                TW: "Taiwan"
            },
            button: {
                jumpto: "Jump to",
                submit: "Submit",
                confirm: "Confirm",
                update: "update",
                edit: "Edit",
                add: "Add",
                delete: "Delete",
                cancel: "Cancel",
                clear: "Clear",
                close: "Close",
                export: "Export"
            },
            alert: {
                title: "Alert",
                update: "Are you sure you want to update this record?",
                delete: "Are you sure you want to delete this record?",
                shipping: "Please enter unit"
            },
            snackbar: {
                fail: {
                    token: "Invalid token",
                    login: "Fail to login",
                    update: "Fail to update",
                    create: "Fail to create",
                    delete: "Fail to delete"
                },
                success: {
                    login: "Successfully Login",
                    updated: "Successfully Updated",
                    created: "Successfully Created",
                    deleted: "Successfully deleted"
                }
            },
            error: {
                exceedstockunit: "Exceed stock unit",
                camera: "Device not compatible"
            },
            hint: {
                duty: {
                    date:
                        "You may select multi date to create more than one duty with same time range"
                }
            }
        },
        tc: {
            auth: {
                signin: {
                    msg: "登錄到您的帳戶"
                },
                forgotpassword: {
                    title: "忘記了您的密碼?",
                    msg:
                        "輸入與您的帳戶電子郵件地址，我們將向您發送一個鏈接以重置您的密碼。"
                }
            },
            login: "登入",
            logout: "登出",
            prev: "上一個",
            next: "下一個",
            start: "開始",
            end: "結束",
            forgotpassword: "忘記密碼",
            oldpassword: "舊密碼",
            newpassword: "新密碼",
            confirmpassword: "確認密碼",
            password: "密碼",
            table: "清單",
            profile: "我的帳戶",
            settings: "設定",
            salesreport: "銷售報告",
            management: "管理",
            home: "主頁",
            dashboard: "控制板",
            empty: "空的",
            more: "更多",
            example: "例子",
            number: "編號",
            role: "權限",
            user: "用戶",
            permission: "允許權限",
            salary: "薪酬",
            goods: "貨物",
            goodsname: "貨號",
            goodsitem: "貨物項目",
            goodscontent: "貨物自定內容",
            contentkey: "名稱",
            contentvalue: "內容",
            stock: "存貨",
            unitprice: "單價",
            totalunit: "總數",
            defaultunit: "預設數量",
            updatedunit: "已更新數量",
            cost: "價錢",
            stockunit: "存貨數量",
            client: "客戶",
            supplier: "供應商",
            category: "類別",
            categories: "類別",
            purchase: "訂貨",
            warehouse: "貨倉",
            create: "新增",
            details: "詳細",
            info: "詳細",
            description: "描述",
            price: {
                cost: "成本價",
                retail: "零售價",
                wholesale: "批發價"
            },
            subtotal: "總金額",
            name: "名稱",
            email: "電郵",
            contact: "聯絡",
            countrycode: "區號",
            phone: "電話",
            fax: "傳真",
            sector: "區",
            shelf: "貨架",
            segment: "行",
            district: "地區",
            address: "地址",
            type: "類型",
            status: "狀態",
            creator: "負責用戶",
            date: "日期",
            cup: "罩杯",
            color: "顏色",
            size: "尺碼",
            barcode: "條碼",
            updatedat: "更新日期",
            createdat: "新增日期",
            actions: "功能",
            currency: "貨幣",
            invoice: "單",
            stockalert: "庫存提示",
            stocktake: "點貨",
            shipping: "出貨",
            mailerinfo: "信封資料",
            packing: "包裝",
            update: "更新",
            return: "退貨",
            delete: "刪除",
            alteration: "更改",
            altered: "已更改",
            quantity: "數量",
            unit: "數量",
            scanner: "掃描器",
            search: "搜尋",
            admin: "管理員",
            ADMIN: "管理員",
            employee: "員工",
            EMPLOYEE: "員工",
            employer: "雇主",
            duty: "更",
            dutylist: "更表",
            calendar: {
                month: "月",
                week: "星期",
                day: "日"
            },
            mpf: {
                contribution: " MPF 供款"
            },
            traffic: "流量",
            joinedat: "加入日期",
            leftat: "離職日期",
            exchangerate: "匯率",
            averageinventory: "平均庫存",
            inventoryturnover: "存貨周轉率",
            inventorychange: "庫存變化",
            daysinventoryoutstanding: "存貨周轉天數",
            lastthreemonths: "過去三個月",
            purchasestatus: {
                pending: "待確定",
                PENDING: "待確定",
                processing: "處理中",
                PROCESSING: "處理中",
                delivered: "已交付",
                DELIVERED: "已交付"
            },
            shipstatus: {
                pending: "待確定",
                PENDING: "待確定",
                processing: "處理中",
                PROCESSING: "處理中",
                delivered: "已交付",
                DELIVERED: "已交付"
            },
            currencies: {
                HKD: "港幣",
                TWD: "台幣"
            },
            country: {
                HK: "香港",
                TW: "台灣"
            },
            button: {
                jumpto: "跳至",
                submit: "提交",
                confirm: "確定",
                update: "更新",
                edit: "更改",
                add: "新增",
                delete: "刪除",
                cancel: "取消",
                clear: "清除",
                close: "關閉",
                export: "匯出"
            },
            alert: {
                title: "提示",
                update: "您確定要更新此記錄嗎？",
                delete: "您確定要刪除此記錄嗎？",
                shipping: "請輸入出貨數量"
            },
            snackbar: {
                fail: {
                    token: "無效登入認證",
                    login: "登入失敗",
                    update: "更新記錄失敗",
                    create: "新增記錄失敗",
                    delete: "刪除記錄失敗"
                },
                success: {
                    login: "成功登入",
                    updated: "成功更新記錄",
                    created: "成功新增記錄",
                    deleted: "成功刪除記錄"
                }
            },
            error: {
                exceedstockunit: "超出庫存數量",
                camera: "設備不兼容"
            },
            hint: {
                duty: {
                    date: "您可以選擇多個日期以新增多個擁有相同時間的更"
                }
            }
        }
    }
});

export default i18n;
