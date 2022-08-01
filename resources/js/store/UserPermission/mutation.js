import * as types from "./mutation-types";

export default {
    [types.FETCH_PERMISSION_SUCCESS](state, { data }) {
        state.data = data;
    }
};
