import * as types from "./mutation-types";

export default {
    [types.FETCH_EXCHANGERATE_SUCCESS](state, { data }) {
        state.data = data;
    },
    [types.FETCH_EXCHANGERATE_DETAILS_SUCCESS](state, { data }) {
        state.details = data;
    }
};
