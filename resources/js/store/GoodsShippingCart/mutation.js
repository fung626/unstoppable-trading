import * as types from "./mutation-types";

export default {
    [types.UPDATE_SHIPPING_CART_CLIENT](state, { data }) {
        state.client = data;
    },
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
        state.items.sort((a, b) => a.goods.name - b.goods.name);
    },
    [types.UPDATE_SHIPPING_CART_ITEM_UNIT](state, { data }) {
        let index = state.items.findIndex((obj) => obj.id === data.id);
        if (index > -1) {
            state.items[index] = {
                ...state.items[index],
                unit: data.unit,
            };
        }
    },
    [types.REMOVE_SHIPPING_CART_ITEM](state, { data }) {
        let index = state.items.findIndex((obj) => obj.id === data.id);
    },
    [types.CLEAR_SHIPPING_CART_ITEM](state) {
        state.items = [];
        state.formatted = [];
        state.client = {};
    },
    [types.FORMAT_SHIPPING_SUCCESS](state, { data }) {
        state.formatted = data;
    },
};
