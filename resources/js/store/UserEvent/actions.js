// import axios from "axios";
import i18n from "@/plugins/vue-i18n";
import queryString from "query-string";
import router from "../../router";
import axios from "../../utils/myAxios";
import * as types from "./mutation-types";

const { t } = i18n.global;
const endpoint = "/api/users/event/";
const name = "users/event";

export default {
    [`${name}/get`]({ commit, dispatch }, payload) {
        let query = queryString.stringify(payload);
        return new Promise((resolve, reject) => {
            axios
                .get(`${endpoint}get?${query}`)
                .then(function (response) {
                    if (!response.data.error && "data" in response.data) {
                        let res = response.data;
                        commit(types.FETCH_EVENTS_SUCCESS, res);
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
    [`${name}/post`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}update`, payload)
                .then(function (response) {
                    if (!response.data.error && "data" in response.data) {
                        dispatch("snackbar/show", {
                            color: "success",
                            text: t("snackbar.success.updated"),
                        });
                        let res = response.data;
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
    [`${name}/update`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}update`, payload)
                .then(function (response) {
                    if (!response.data.error && "data" in response.data) {
                        dispatch("snackbar/show", {
                            color: "success",
                            text: t("snackbar.success.updated"),
                        });
                        let res = response.data;
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
};
