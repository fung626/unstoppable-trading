import i18n from "@/plugins/vue-i18n";

const { t } = i18n.global;

const purchaseStatus = [
    {
        name: t("purchase.status.pending"),
        value: "PENDING",
    },
    {
        name: t("purchase.status.processing"),
        value: "PROCESSING",
    },
    {
        name: t("purchase.status.delivered"),
        value: "DELIVERED",
    },
];

export default purchaseStatus;
