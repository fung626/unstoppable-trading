// import axios from "axios";
import { i18n } from "../../plugins";
import router from "../../router";
import axios from "../../utils/myAxios";
import * as types from "./mutation-types";

const endpoint = "/api/user/profile/";
const name = "profile";

export default {
    [`${name}/get`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${endpoint}get`, payload)
                .then(function(response) {
                    let res = response.data;
                    commit(types.FETCH_PROFILE_SUCCESS, res);
                    resolve(res);
                })
                .catch(function(error) {
                    if (!error.response) {
                        reject(error);
                        return;
                    }
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
                    // commit(types.FETCH_COMPANIES_FAILURE);
                    reject(error);
                });
        });
    },
    [`${name}/update`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}update`, payload)
                .then(function(response) {
                    if (!response.data.error) {
                        let res = response.data;
                        commit(types.UPDATE_PROFILE_SUCCESS, res);
                        dispatch("snackbar/show", {
                            color: "success",
                            text: i18n.t("snackbar.success.updated")
                        });
                        resolve(response);
                    } else {
                        dispatch("snackbar/show", {
                            color: "error",
                            text: i18n.t("snackbar.fail.update")
                        });
                        reject(response);
                    }
                })
                .catch(function(error) {
                    if (!error.response) {
                        reject(error);
                        return;
                    }
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
                    // commit(types.UPDATE_COMPANY_FAILURE);
                    dispatch("snackbar/show", {
                        color: "error",
                        text: i18n.t("snackbar.fail.update")
                    });
                    reject(error);
                });
        });
    },
    [`${name}/password/update`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}password/update`, payload)
                .then(function(response) {
                    if (!response.data.error) {
                        dispatch("snackbar/show", {
                            color: "success",
                            text: i18n.t("snackbar.success.updated")
                        });
                        resolve(response);
                    } else {
                        dispatch("snackbar/show", {
                            color: "error",
                            text: i18n.t("snackbar.fail.update")
                        });
                        reject(response);
                    }
                })
                .catch(function(error) {
                    if (!error.response) {
                        reject(error);
                        return;
                    }
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
                    dispatch("snackbar/show", {
                        color: "error",
                        text: i18n.t("snackbar.fail.update")
                    });
                    reject(error);
                });
        });
    }
};
