import * as types from "./mutation-types";

export default {
    [types.FETCH_GOODS_ITEMS_SUCCESS](state, { data }) {
        state.data = data;
    },
    [types.FETCH_GOODS_ITEM_DETAILS_SUCCESS](state, { data }) {
        state.detailsData = data;
    }
};
