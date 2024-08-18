import * as types from "./mutation-types";

export default {
    [types.FETCH_CREATESHIPPINGCONFIG_SUCCESS](state, { data }) {
        state.data = data;
    },
};
