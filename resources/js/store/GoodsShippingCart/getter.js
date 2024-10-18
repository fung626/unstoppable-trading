const name = "goods/shipping-cart";

export default {
    [`${name}/items`](state) {
        return state.items;
    },
    [`${name}/data/details`](state) {
        return state.detailsData;
    },
};
