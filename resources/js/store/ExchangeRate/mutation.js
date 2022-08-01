import * as types from "./mutation-types";

export default {
    [types.FETCH_EXCHANGERATE_SUCCESS](state, { data }) {
        state.data = data;
    }
};
