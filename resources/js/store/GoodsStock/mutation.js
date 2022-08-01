import * as types from "./mutation-types";

export default {
    [types.FETCH_GOODS_STOCK_SUCCESS](state, { data }) {
        state.data = data;
    },
};
