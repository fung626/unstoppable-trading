import * as types from "./mutation-types";

export default {
    [types.FETCH_SUPPLIERS_SUCCESS](state, { data }) {
        state.data = data;
    },
    [types.FETCH_SUPPLIER_DETAILS_SUCCESS](state, { data }) {
        state.detailsData = data;
    }
};
