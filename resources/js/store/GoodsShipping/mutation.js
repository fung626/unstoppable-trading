import * as types from "./mutation-types";

export default {
    [types.FETCH_SHIPPING_SUCCESS](state, { data }) {
        state.data = data;
    },
    [types.FETCH_SHIPPING_DETAILS_SUCCESS](state, { data }) {
        state.detailsData = data;
    },
    [types.UPDATE_SHIPPING_DETAILS_SUCCESS](state, { data }) {
        state.detailsData = data;
    },
    [types.FORMAT_SHIPPING_SUCCESS](state, { data }) {
        state.formattedShipData = data;
    },
};
