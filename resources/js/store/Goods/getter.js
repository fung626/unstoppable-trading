const name = "goods";

export default {
    [`${name}/data`](state) {
        return state.data;
    },
    [`${name}/data/details`](state) {
        return state.detailsData;
    }
};
