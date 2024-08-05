import i18n from "@/plugins/vue-i18n";

const { t } = i18n.global;

const types = [
    {
        name: `${t("calendar.month")}`,
        value: "month",
    },
    {
        name: `${t("calendar.week")}`,
        value: "week",
    },
    {
        name: `${t("calendar.day")}`,
        value: "day",
    },
];

export default types;
