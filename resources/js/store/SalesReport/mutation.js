import * as types from "./mutation-types";

export default {
    [types.FETCH_SALES_REPORT_SUCCESS](state, { data }) {
        state.data = data;
    },
    [types.FETCH_DAILY_SALES_REPORT_SUCCESS](state, { data }) {
        state.dailyData = data;
    }
};
