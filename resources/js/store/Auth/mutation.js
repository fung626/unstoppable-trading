import * as types from "./mutation-types";

export default {
    [types.LOGIN_SUCCESS](state, { data }) {
        sessionStorage.setItem("token", data.token);
        state.user = data;
        state.token = data.token;
    },
    [types.LOGOUT](state) {
        state.user = null;
        state.token = null;
        sessionStorage.token = null;
    }
};
