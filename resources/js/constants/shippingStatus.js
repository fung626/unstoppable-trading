import { i18n } from "../plugins";

const shippingStatus = [
    {
        name: i18n.t("shippingstatus.pending"),
        value: "PENDING"
    },
    {
        name: i18n.t("shippingstatus.processing"),
        value: "PROCESSING"
    },
    {
        name: i18n.t("shippingstatus.delivered"),
        value: "DELIVERED"
    }
];

export default shippingStatus;
