import i18n from "@/plugins/vue-i18n";

const { t } = i18n.global;

const types = [
    {
        name: `${t("parttime")}`,
        value: "PARTTIME",
    },
    {
        name: `${t("fulltime")}`,
        value: "FULLTIME",
    },
];

export default types;
