import * as types from "./mutation-types";

export default {
    [types.FETCH_SHIPPING_ALTER_SUCCESS](state, { data }) {
        state.data = data;
    }
};
