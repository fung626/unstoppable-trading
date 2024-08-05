import i18n from "@/plugins/vue-i18n";

const { t } = i18n.global;

const shippingStatus = [
    {
        name: t("shipping.status.pending"),
        value: "PENDING",
    },
    {
        name: t("shipping.status.processing"),
        value: "PROCESSING",
    },
    {
        name: t("shipping.status.delivered"),
        value: "DELIVERED",
    },
];

export default shippingStatus;
