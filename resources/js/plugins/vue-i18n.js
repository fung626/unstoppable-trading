import { createI18n } from "vue-i18n";

const imports = {
    en: import.meta.glob(`./vue-i18n/en/*.json`, {
        eager: true,
        import: "default",
    }),
    tc: import.meta.glob(`./vue-i18n/tc/*.json`, {
        eager: true,
        import: "default",
    }),
};

const locales = Object.keys(imports);

const getLocaleMessages = () =>
    locales.reduce(
        (messages, locale) => ({
            ...messages,
            // Combine messages for the current language
            [locale]: Object.values(imports[locale]).reduce(
                (message, current) => ({ ...message, ...current }),
                {}
            ),
        }),
        // Starting with an empty object
        {}
    );

const i18n = createI18n({
    locale: "tc",
    messages: getLocaleMessages() || [],
});

export default i18n;
