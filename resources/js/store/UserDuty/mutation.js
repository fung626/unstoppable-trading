import * as types from "./mutation-types";

export default {
    [types.FETCH_DUTY_SUCCESS](state, { data }) {
        state.data = data;
    }
};
