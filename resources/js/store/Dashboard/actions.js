// import axios from "axios";
import router from "../../router";
import axios from "../../utils/myAxios";
import * as types from "./mutation-types";

const endpoint = "/api/dashboard/";
const name = "dashboard";

export default {
    [`${name}/get`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${endpoint}get`)
                .then(function(response) {
                    if (!response.data.error) {
                        let res = response.data;
                        commit(types.FETCH_DASHBOARD_SUCCESS, res);
                        resolve(response);
                    } else {
                        reject(response);
                    }
                })
                .catch(function(error) {
                    // commit(types.FETCH_COMPANIES_FAILURE);
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
                        text: error.response.data.msg
                    });
                    reject(error);
                });
        });
    }
};
