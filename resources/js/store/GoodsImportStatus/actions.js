import { i18n } from "../../plugins";
import router from "../../router";
import axios from "../../utils/myAxios";
import * as types from "./mutation-types";

const endpoint = "/api/goods/import/";
const name = "goods/import/status";

export default {
    [`${name}`]({ commit, dispatch }, payload = {}) {
        commit(types.FETCH_GOODS_IMPORT_JOBS_BEGIN);

        return new Promise((resolve, reject) => {
            axios
                .get(`${endpoint}status/get`, { params: payload })
                .then(function (response) {
                    if (!response.data.error && "data" in response.data) {
                        const res = response.data;
                        commit(types.FETCH_GOODS_IMPORT_JOBS_SUCCESS, {
                            data: res.data || [],
                        });
                        resolve(response);
                    } else {
                        commit(types.FETCH_GOODS_IMPORT_JOBS_FAILURE);
                        reject(response);
                    }
                })
                .catch(function (error) {
                    commit(types.FETCH_GOODS_IMPORT_JOBS_FAILURE);
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
    [`${name}/delete`]({ dispatch }, payload = {}) {
        const jobId = payload.jobId;
        if (!jobId) {
            return Promise.reject(new Error("job id is required"));
        }
        return new Promise((resolve, reject) => {
            axios
                .delete(`${endpoint}${jobId}`)
                .then(function (response) {
                    resolve(response);
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
