// import axios from "axios";
import axios from "../../utils/myAxios";
// import * as types from "./mutation-types";
import i18n from "@/plugins/vue-i18n";

const { t } = i18n.global;
const endpoint = "/api/goods/shippings/packing/";
const name = "goods/shippings/packing";

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
                    var blob = new Blob([response.data], {
                        type: "application/pdf",
                    });
                    var blobURL = URL.createObjectURL(blob);

                    let iframe = document.createElement("iframe"); //load content in an iframe to print later
                    document.body.appendChild(iframe);

                    iframe.style.display = "none";
                    iframe.src = blobURL;
                    iframe.onload = function () {
                        setTimeout(function () {
                            iframe.focus();
                            iframe.contentWindow.print();
                        }, 1);
                    };
                    // let fileURL = window.URL.createObjectURL(
                    //     new Blob([response.data])
                    // );
                    // let fileLink = document.createElement("a");
                    // fileLink.href = fileURL;
                    // fileLink.setAttribute(
                    //     "download",
                    //     `shipping_packing-${moment().format("YYYYMMDD")}.pdf`
                    // );
                    // document.body.appendChild(fileLink);
                    // fileLink.click();
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
