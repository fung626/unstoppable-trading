import * as types from "./mutation-types";

export default {
    [types.FETCH_CATEGORIES_SUCCESS](state, { data }) {
        state.data = data;
    },
    [types.FETCH_CATEGORY_DETAILS_SUCCESS](state, { data }) {
        state.detailsData = data;
    }
};
