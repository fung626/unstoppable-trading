// import axios from "axios";
import router from "../../router";
import axios from "../../utils/myAxios";

const endpoint = "/api/goods/shipping/purchase/quicksearch/";
const name = "goods/shipping/purchase/quicksearch";

export default {
    [`${name}/get`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}get`, payload)
                .then(function (response) {
                    let res = response.data;
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
