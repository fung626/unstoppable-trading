// import axios from "axios";
import router from "../../router";
import axios from "../../utils/myAxios";
import * as types from "./mutation-types";

const endpoint = "/api/salesreport/topsales/";
const name = "salesreport/topsales";

export default {
    [`${name}/get`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .get(`${endpoint}get`, payload)
                .then(function (response) {
                    if (!response.data.error && "data" in response.data) {
                        let res = response.data;
                        commit(types.FETCH_SALESREPORT_TOPSALES_SUCCESS, res);
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
};
