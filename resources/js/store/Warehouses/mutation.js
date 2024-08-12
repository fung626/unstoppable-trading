import * as types from "./mutation-types";

export default {
    [types.FETCH_WAREHOUSES_SUCCESS](state, { data }) {
        state.data = data;
    },
    [types.FETCH_WAREHOUSE_DETAILS_SUCCESS](state, { data }) {
        state.detailsData = data;
    }
};
