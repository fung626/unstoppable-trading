import * as types from "./mutation-types";

export default {
    [types.UPDATE_APP_CONFIG](state, { data }) {
        state.data = data;
    },
};
