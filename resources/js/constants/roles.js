import i18n from "@/plugins/vue-i18n";

const { t } = i18n.global;

const roles = [
    {
        name: `${t("admin")}`,
        value: "ADMIN",
    },
    {
        name: `${t("employee")}`,
        value: "EMPLOYEE",
    },
];

export default roles;
