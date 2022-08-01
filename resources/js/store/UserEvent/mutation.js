import * as types from "./mutation-types";

export default {
    [types.FETCH_EVENTS_SUCCESS](state, { data }) {
        state.data = data;
    }
};
