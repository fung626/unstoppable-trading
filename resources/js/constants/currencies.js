import i18n from "@/plugins/vue-i18n";

const { t } = i18n.global;

const currencies = [
    {
        name: t("currencies.HKD"),
        value: "HKD",
    },
    {
        name: t("currencies.TWD"),
        value: "TWD",
    },
];

export default currencies;
