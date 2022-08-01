import * as types from "./mutation-types";

export default {
    [types.FETCH_PURCHASES_SUCCESS](state, { data }) {
        state.data = data;
    },
    [types.FETCH_PURCHASE_ITEMS_SUCCESS](state, { data }) {
        state.items = data;
    },
    [types.FETCH_PURCHASE_DETAILS_SUCCESS](state, { data }) {
        state.detailsData = data;
    }
};
