import { i18n } from "../plugins";

const purchaseStatus = [
    {
        name: i18n.t("purchasestatus.pending"),
        value: "PENDING"
    },
    {
        name: i18n.t("purchasestatus.processing"),
        value: "PROCESSING"
    },
    {
        name: i18n.t("purchasestatus.delivered"),
        value: "DELIVERED"
    }
];

export default purchaseStatus;
