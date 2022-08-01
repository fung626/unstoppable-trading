import { i18n } from "../../plugins";
import router from "../../router";
import axios from "../../utils/myAxios";
import * as types from "./mutation-types";

const endpoint = "/api/auth/";
const name = "auth";

export default {
    [`login`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}login`, payload)
                .then(function(response) {
                    if (!response.data.error && "data" in response.data) {
                        let res = response.data;
                        commit(types.LOGIN_SUCCESS, res);
                        dispatch("snackbar/show", {
                            color: "success",
                            text: i18n.t("snackbar.success.login")
                        });
                        resolve(res);
                    } else {
                        dispatch("snackbar/show", {
                            color: "success",
                            text: i18n.t("snackbar.fail.login")
                        });
                        reject(response);
                    }
                })
                .catch(function(error) {
                    dispatch("snackbar/show", {
                        color: "success",
                        text: i18n.t("snackbar.fail.login")
                    });
                    reject(error);
                });
        });
    },
    [`${name}/logout`]({ commit }) {
        commit(types.LOGOUT);
    },
    [`${name}/forgot/password/email`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}forgot/password/email`, payload)
                .then(function(response) {
                    if (!response.data.error) {
                        dispatch("snackbar/show", {
                            color: "success",
                            text: i18n.t("auth.forgotpassword.mailsent")
                        });
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch(function(error) {
                    let status = error.response.status;
                    switch (status) {
                        case 401:
                            dispatch("snackbar/show", {
                                color: "success",
                                text: i18n.t("snackbar.fail.token")
                            });
                            dispatch("auth/logout");
                            router.push({ name: "Login" });
                            break;
                    }
                    reject(error);
                });
        });
    },
    [`${name}/forgot/password/find`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}forgot/password/find`, payload)
                .then(function(response) {
                    if (!response.data.error) {
                        resolve(response);
                    } else {
                        router.push({ name: "Login" });
                        reject(response);
                    }
                })
                .catch(function(error) {
                    let status = error.response.status;
                    switch (status) {
                        case 401:
                            router.push({ name: "Login" });
                            break;
                    }
                    reject(error);
                });
        });
    },
    [`${name}/forgot/password/reset`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}forgot/password/reset`, payload)
                .then(function(response) {
                    if (!response.data.error) {
                        dispatch("snackbar/show", {
                            color: "success",
                            text: i18n.t("auth.resetpassword.success")
                        });
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch(function(error) {
                    let status = error.response.status;
                    switch (status) {
                        case 401:
                            router.push({ name: "Login" });
                            break;
                    }
                    reject(error);
                });
        });
    }
};
