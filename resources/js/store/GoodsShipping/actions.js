// import axios from "axios";
import moment from "moment";
import queryString from "query-string";
import { i18n } from "../../plugins";
import router from "../../router";
import axios from "../../utils/myAxios";
import * as types from "./mutation-types";

const endpoint = "/api/goods/shipping/";
const name = "goods/shipping";

export default {
    [`${name}/add`]({ commit, dispatch }, payload) {
        commit(types.ADD_SHIPPING, payload);
    },
    [`${name}/clear`]({ commit, dispatch }) {
        commit(types.CLEAR_SHIPPING);
    },
    [`${name}/get`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}get`, payload)
                .then(function (response) {
                    if (!response.data.error) {
                        let res = response.data;
                        commit(types.FETCH_SHIPPING_SUCCESS, res);
                        resolve(res);
                    } else {
                        reject(response);
                    }
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
                                color: "success",
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
    [`${name}/details`]({ commit, dispatch }, payload) {
        let query = queryString.stringify(payload);
        return new Promise((resolve, reject) => {
            axios
                .get(`${endpoint}details?${query}`)
                .then(function (response) {
                    if (!response.data.error) {
                        let res = response.data;
                        commit(types.FETCH_SHIPPING_DETAILS_SUCCESS, res);
                        resolve(res);
                    } else {
                        reject(response);
                    }
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
                                color: "success",
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
    [`${name}/update`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}update`, payload)
                .then(function (response) {
                    if (!response.data.error) {
                        let res = response.data;
                        commit(types.UPDATE_SHIPPING_DETAILS_SUCCESS, res);
                        dispatch("snackbar/show", {
                            color: "success",
                            text: i18n.t("snackbar.success.updated"),
                        });
                        resolve(res);
                    } else {
                        dispatch("snackbar/show", {
                            color: "error",
                            text: i18n.t("snackbar.fail.update"),
                        });
                        reject(response);
                    }
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
                                color: "success",
                                text: i18n.t("snackbar.fail.token"),
                            });
                            dispatch("auth/logout");
                            router.push({ name: "Login" });
                            break;
                    }
                    dispatch("snackbar/show", {
                        color: "error",
                        text: i18n.t("snackbar.fail.update"),
                    });
                    reject(error);
                });
        });
    },
    [`${name}/create`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}create`, payload)
                .then(function (response) {
                    if (!response.data.error) {
                        dispatch("snackbar/show", {
                            color: "success",
                            text: i18n.t("snackbar.success.created"),
                        });
                        resolve(response);
                    } else {
                        dispatch("snackbar/show", {
                            color: "error",
                            text: i18n.t("snackbar.fail.create"),
                        });
                        reject(response);
                    }
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
                                color: "success",
                                text: i18n.t("snackbar.fail.token"),
                            });
                            dispatch("auth/logout");
                            router.push({ name: "Login" });
                            break;
                    }
                    dispatch("snackbar/show", {
                        color: "error",
                        text: i18n.t("snackbar.fail.create"),
                    });
                    reject(error);
                });
        });
    },
    [`${name}/format`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}format`, payload)
                .then(function (response) {
                    if (!response.data.error) {
                        let res = response.data;
                        commit(types.FORMAT_SHIPPING_SUCCESS, res);
                        resolve(res);
                    } else {
                        reject(response);
                    }
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
                                color: "success",
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
                        `${i18n.t("shipping")}-${moment().format(
                            "dddd, Do MMMM YYYY"
                        )}.pdf`
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
                                color: "success",
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
