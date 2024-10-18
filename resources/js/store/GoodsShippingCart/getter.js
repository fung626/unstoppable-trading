const name = "goods/shipping-cart";

export default {
    [`${name}/items`](state) {
        return state.items;
    },
    [`${name}/client`](state) {
        return state.client;
    },
};
