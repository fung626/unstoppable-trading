import * as types from "./mutation-types";

export default {
    [types.FETCH_SALESREPORT_SUCCESS](state, { data }) {
        state.data = data;
    },
    [types.FETCH_DAILYSALESREPORT_SUCCESS](state, { data }) {
        state.dailyData = data;
    }
};
