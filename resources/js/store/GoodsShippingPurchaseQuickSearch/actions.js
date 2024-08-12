// import axios from "axios";
import i18n from "@/plugins/vue-i18n";
import router from "../../router";
import axios from "../../utils/myAxios";

const { t } = i18n.global;
const endpoint = "/api/goods/shippings/purchase/quicksearch/";
const name = "goods/shippings/purchase/quicksearch";

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
