// import axios from "axios";
import i18n from "@/plugins/vue-i18n";
import router from "../../router";
import axios from "../../utils/myAxios";

const { t } = i18n.global;
const endpoint = "/api/goods/purchase/stocktake/";
const name = "goods/purchase/stocktake";

export default {
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
                            text: t("snackbar.fail.create"),
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
                        text: t("snackbar.fail.create"),
                    });

                    reject(error);
                });
        });
    },
};
