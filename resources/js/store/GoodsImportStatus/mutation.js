import * as types from "./mutation-types";

export default {
    [types.FETCH_GOODS_IMPORT_JOBS_BEGIN](state) {
        state.loading = true;
    },
    [types.FETCH_GOODS_IMPORT_JOBS_SUCCESS](state, { data }) {
        state.loading = false;
        state.data = data;
    },
    [types.FETCH_GOODS_IMPORT_JOBS_FAILURE](state) {
        state.loading = false;
        state.data = [];
    },
};
