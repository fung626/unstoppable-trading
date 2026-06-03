const name = "goods/import/status";

export default {
    [`${name}/data`](state) {
        return state.data;
    },
    [`${name}/loading`](state) {
        return state.loading;
    },
};
