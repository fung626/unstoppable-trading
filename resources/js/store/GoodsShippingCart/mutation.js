import * as types from "./mutation-types";

export default {
    [types.ADD_SHIPPING_CART_ITEM](state, { data }) {
        let index = state.items.findIndex((obj) => obj.id === data.id);
        if (index > -1) {
            state.items[index] = {
                ...data,
                unit: data.unit + state.items[index].unit,
            };
        } else {
            state.items = [...state.items, data];
        }
    },
    [types.REMOVE_SHIPPING_CART_ITEM](state, { data }) {
        let index = state.items.findIndex((obj) => obj.id === data.id);
    },
    [types.CLEAR_SHIPPING_CART_ITEM](state) {
        state.items = [];
        state.formatted = [];
    },
    [types.FORMAT_SHIPPING_SUCCESS](state, { data }) {
        state.formatted = data;
    },
};
