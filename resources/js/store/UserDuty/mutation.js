import * as types from "./mutation-types";

export default {
    [types.FETCH_DUTIES_SUCCESS](state, { data }) {
        state.data = data;
    }
};
