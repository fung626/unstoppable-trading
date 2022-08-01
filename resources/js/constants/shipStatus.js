import { i18n } from "../plugins";

const shipStatus = [
    {
        name: i18n.t("shipstatus.pending"),
        value: "PENDING"
    },
    {
        name: i18n.t("shipstatus.processing"),
        value: "PROCESSING"
    },
    {
        name: i18n.t("shipstatus.delivered"),
        value: "DELIVERED"
    }
];

export default shipStatus;
