import * as types from "./mutation-types";

export default {
    [types.FETCH_INVOICE_ITEMS_SUCCESS](state, { data }) {
        state.items = data;
    },
    [types.FETCH_INVOICE_DETAILS_SUCCESS](state, { data }) {
        state.detailsData = data;
    }
};
