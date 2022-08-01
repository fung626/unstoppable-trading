import * as types from "./mutation-types";

export default {
    [types.FETCH_USERS_SUCCESS](state, { data }) {
        state.data = data;
    },
    [types.FETCH_USER_DETAILS_SUCCESS](state, { data }) {
        state.detailsData = data;
    }
};
