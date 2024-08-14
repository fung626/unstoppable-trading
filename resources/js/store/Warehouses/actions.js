// import axios from "axios";
import i18n from "@/plugins/vue-i18n";
import moment from "moment";
import queryString from "query-string";
import router from "../../router";
import axios from "../../utils/myAxios";
import * as types from "./mutation-types";

const { t } = i18n.global;
const endpoint = "/api/goods/warehouses/";
const name = "goods/warehouses";

export default {
    [`${name}/get`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}get`, payload)
                .then(function (response) {
                    if (!response.data.error) {
                        let res = response.data;
                        commit(types.FETCH_WAREHOUSES_SUCCESS, res);
                        resolve(res);
                    } else {
                        reject(response);
                    }
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
                    // commit(types.FETCH_EMPLOYEES_FAILURE);
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
                        commit(types.FETCH_WAREHOUSE_DETAILS_SUCCESS, res);
                        resolve(res);
                    } else {
                        reject(response);
                    }
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
                    // commit(types.FETCH_EMPLOYEES_FAILURE);
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
                            text: t("snackbar.success.created"),
                        });
                        resolve(response);
                    } else {
                        dispatch("snackbar/show", {
                            color: "error",
                            text: t("snackbar.fail.created"),
                        });
                        reject(response);
                    }
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
                    dispatch("snackbar/show", {
                        color: "error",
                        text: t("snackbar.fail.created"),
                    });
                    reject(error);
                });
        });
    },
    [`${name}/update`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}update`, payload)
                .then(function (response) {
                    if (!response.data.error && "data" in response.data) {
                        let res = response.data;
                        dispatch("snackbar/show", {
                            color: "success",
                            text: t("snackbar.success.updated"),
                        });
                        resolve(res);
                    } else {
                        dispatch("snackbar/show", {
                            color: "error",
                            text: t("snackbar.fail.update"),
                        });
                        reject(response);
                    }
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
                    dispatch("snackbar/show", {
                        color: "error",
                        text: t("snackbar.fail.update"),
                    });
                    reject(error);
                });
        });
    },
    [`${name}/delete`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .delete(`${endpoint}delete`, { data: payload })
                .then(function (response) {
                    if (!response.data.error) {
                        dispatch("snackbar/show", {
                            color: "success",
                            text: t("snackbar.success.deleted"),
                        });
                        resolve(response);
                    } else {
                        dispatch("snackbar/show", {
                            color: "error",
                            text: t("snackbar.fail.delete"),
                        });
                        reject(response);
                    }
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
                    dispatch("snackbar/show", {
                        color: "error",
                        text: t("snackbar.fail.delete"),
                    });
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
                        `${t("warehouse")}-${moment().format(
                            "dddd, Do MMMM YYYY"
                        )}.pdf`
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
