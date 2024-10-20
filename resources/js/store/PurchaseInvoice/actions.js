// import axios from "axios";
import i18n from "@/plugins/vue-i18n";
import queryString from "query-string";
import router from "../../router";
import axios from "../../utils/myAxios";
import * as types from "./mutation-types";

const { t } = i18n.global;

const endpoint = "/api/goods/purchases/invoices/";
const name = "goods/purchases/invoices";

export default {
    [`${name}/items`]({ commit, dispatch }, payload) {
        let query = queryString.stringify(payload);
        return new Promise((resolve, reject) => {
            axios
                .get(`${endpoint}items?${query}`)
                .then(function (response) {
                    if (!response.data.error && "data" in response.data) {
                        let res = response.data;
                        commit(types.FETCH_INVOICE_ITEMS_SUCCESS, res);
                        resolve(res);
                    } else {
                        reject(response);
                    }
                })
                .catch(function (error) {
                    // commit(types.FETCH_EMPLOYEES_FAILURE);
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
    [`${name}/details`]({ commit, dispatch }, payload) {
        let query = queryString.stringify(payload);
        return new Promise((resolve, reject) => {
            axios
                .get(`${endpoint}details?${query}`)
                .then(function (response) {
                    if (!response.data.error && "data" in response.data) {
                        let res = response.data;
                        commit(types.FETCH_INVOICE_DETAILS_SUCCESS, res);
                        resolve(res);
                    } else {
                        reject(response);
                    }
                })
                .catch(function (error) {
                    // commit(types.FETCH_EMPLOYEES_FAILURE);
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
    [`${name}/export`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios({
                url: `${endpoint}export`,
                method: "POST",
                data: payload,
                responseType: "blob",
            })
                .then((response) => {
                    // let fileURL = window.URL.createObjectURL(
                    //     new Blob([response.data])
                    // );
                    // let fileLink = document.createElement("a");
                    // fileLink.href = fileURL;
                    // fileLink.setAttribute(
                    //     "download",
                    //     `${"purchases"}-${moment().format("YYYYMMDDY")}.pdf`
                    // );
                    // document.body.appendChild(fileLink);
                    // fileLink.click();
                    // resolve();
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
