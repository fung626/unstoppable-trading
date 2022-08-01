import * as types from "./mutation-types";

export default {
    [types.FETCH_AVAILABLE_SHIPPING_ITEMS_SUCCESS](state, { data }) {
        state.data = data;
    }
};
