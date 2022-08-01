const name = "goods/content";

export default {
    [`${name}/data`](state) {
        return state.data;
    },
    [`${name}/data/details`](state) {
        return state.detailsData;
    }
};
