// import axios from "axios";
import i18n from "@/plugins/vue-i18n";
import router from "../../router";
import axios from "../../utils/myAxios";
import * as types from "./mutation-types";

const { t } = i18n.global;
const endpoint = "/api/goods/shippings/";
const name = "goods/shipping-cart";

export default {
    [`${name}/update-client`]({ commit, dispatch }, payload) {
        commit(types.UPDATE_SHIPPING_CART_CLIENT, payload);
    },
    [`${name}/add`]({ commit, dispatch }, payload) {
        commit(types.ADD_SHIPPING_CART_ITEM, payload);
    },
    [`${name}/update-item-unit`]({ commit, dispatch }, payload) {
        commit(types.UPDATE_SHIPPING_CART_ITEM_UNIT, payload);
    },
    [`${name}/remove`]({ commit, dispatch }, payload) {
        commit(types.REMOVE_SHIPPING_CART_ITEM, payload);
    },
    [`${name}/clear`]({ commit, dispatch }) {
        commit(types.CLEAR_SHIPPING_CART_ITEM);
    },
    [`${name}/format`]({ commit, dispatch }, payload) {
        return new Promise((resolve, reject) => {
            axios
                .post(`${endpoint}format`, payload)
                .then(function (response) {
                    if (!response.data.error) {
                        let res = response.data;
                        commit(types.FORMAT_SHIPPING_SUCCESS, res);
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
                    reject(error);
                });
        });
    },
};
