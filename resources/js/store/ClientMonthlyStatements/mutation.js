import * as types from "./mutation-types";

export default {
    [types.FETCH_CLIENTS_MONTHLY_STATEMENT_SUCCESS](state, { data }) {
        state.data = data;
    },
};
