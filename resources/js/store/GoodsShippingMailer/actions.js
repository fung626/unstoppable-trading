// import axios from "axios";
import moment from "moment";
import router from "../../router";
import axios from "../../utils/myAxios";
// import * as types from "./mutation-types";
import i18n from "@/plugins/vue-i18n";

const { t } = i18n.global;
const endpoint = "/api/goods/shippings/mailer/";
const name = "goods/shippings/mailer";

export default {
    [`${name}/export`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: `${endpoint}export`,
                method: "POST",
                data: payload,
                responseType: "blob",
            })
                .then((response) => {
                    let fileURL = window.URL.createObjectURL(
                        new Blob([response.data])
                    );
                    let fileLink = document.createElement("a");
                    fileLink.href = fileURL;
                    fileLink.setAttribute(
                        "download",
                        `${t("shipping.title")}-${t(
                            "mailer"
                        )}-${moment().format("dddd, Do MMMM YYYY")}.pdf`
                    );
                    document.body.appendChild(fileLink);
                    fileLink.click();
                    resolve();
                })
                .catch(function (error) {
                    let status = error.response.status;
                    switch (status) {
                        case 401:
                            dispatch("snackbar/show", {
                                color: "success",
                                text: t("snackbar.fail.token"),
                            });
                            dispatch("auth/logout");
                            router.push({ name: "Login" });
                            break;
                    }
                    reject(error);
                });
        });
    },
};
