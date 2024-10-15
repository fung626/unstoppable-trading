import * as types from "./mutation-types";

export default {
    [types.FETCH_CLIENTS_SUCCESS](state, { data }) {
        state.data = data;
    },
    [types.FETCH_CLIENT_DETAILS_SUCCESS](state, { data }) {
        state.detailsData = data;
    }
};
