// import axios from "axios";
import { i18n } from "../../plugins";
import router from "../../router";
import axios from "../../utils/myAxios";
// import * as types from "./mutation-types";

const endpoint = "/api/goods/shipping/packing/";
const name = "goods/shipping/packing";

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
                        `${payload.filename}_shipping_packing.${payload.extension}`
                    );
                    document.body.appendChild(fileLink);
                    fileLink.click();
                    resolve();
                })
                .catch(function (error) {
                    if (!error.response) {
                        reject(error);
                        return;
                    }
                    let status = error.response.status;
                    switch (status) {
                        case 401:
                            dispatch("snackbar/show", {
                                color: "error",
                                text: i18n.t("snackbar.fail.token"),
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
