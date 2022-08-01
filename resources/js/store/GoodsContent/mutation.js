import * as types from "./mutation-types";

export default {
    [types.FETCH_GOODS_CONTENTS_SUCCESS](state, { data }) {
        state.data = data;
    },
    [types.FETCH_GOODS_CONTENT_DETAILS_SUCCESS](state, { data }) {
        state.detailsData = data;
    }
};
