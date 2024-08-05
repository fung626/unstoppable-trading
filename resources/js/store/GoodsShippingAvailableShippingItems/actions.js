// import axios from "axios";
import router from "../../router";
import axios from "../../utils/myAxios";
import * as types from "./mutation-types";

const endpoint = "/api/goods/shipping/available/shipping/item/";
const name = "goods/shipping/available/shipping/item";

export default {
    [`${name}/get`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}get`, payload)
                .then(function (response) {
                    let res = response.data;
                    commit(types.FETCH_AVAILABLE_SHIPPING_ITEMS_SUCCESS, res);
                    resolve(res);
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
