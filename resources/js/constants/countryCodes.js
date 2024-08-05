import i18n from "@/plugins/vue-i18n";

const { t } = i18n.global;

const codes = [
    {
        name: `${t("country.HK")} +852`,
        value: "852",
    },
    {
        name: `${t("country.TW")} +886`,
        value: "886",
    },
];

export default codes;
