const name = "goods/purchases/stocktake";

export default {
    [`${name}/data`](state) {
        return state.data;
    },
    [`${name}/data/details`](state) {
        return state.detailsData;
    },
};
