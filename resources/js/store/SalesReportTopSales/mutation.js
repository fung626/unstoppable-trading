import * as types from "./mutation-types";

export default {
    [types.FETCH_SALESREPORT_TOPSALES_SUCCESS](state, { data }) {
        state.data = data;
    }
};
