import i18n from "@/plugins/vue-i18n";
import { v4 as uuidv4 } from "uuid";

const { t } = i18n.global;

const defaults = {
    item: {
        local: {
            cup: "",
            color: "",
            size: "",
            barcode: "",
            actions: [
                {
                    key: uuidv4(),
                    title: t("button.delete"),
                    color: "danger",
                    type: "Delete",
                    disabled: false,
                },
            ],
        },
        remote: {
            updated: false,
            cup: "",
            color: "",
            size: "",
            barcode: "",
            actions: [
                {
                    key: uuidv4(),
                    title: t("button.update"),
                    color: "primary",
                    type: "Update",
                    disabled: false,
                },
                {
                    key: uuidv4(),
                    title: t("button.delete"),
                    color: "danger",
                    type: "Delete",
                    disabled: false,
                },
            ],
        },
    },
    content: {
        local: {
            key: "",
            value: "",
            actions: [
                {
                    key: uuidv4(),
                    title: t("button.delete"),
                    color: "danger",
                    type: "Delete",
                    disabled: false,
                },
            ],
        },
        remote: {
            updated: false,
            key: "",
            value: "",
            actions: [
                {
                    key: uuidv4(),
                    title: t("button.update"),
                    color: "primary",
                    type: "Update",
                    disabled: false,
                },
                {
                    key: uuidv4(),
                    title: t("button.delete"),
                    color: "danger",
                    type: "Delete",
                    disabled: false,
                },
            ],
        },
    },
};

export default defaults;
