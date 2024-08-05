import * as types from "./mutation-types";

export default {
    [types.TOGGLE_SIDEBAR_VISIBLE](state, payload) {
        state.visible = payload !== undefined ? payload : !state.visible;
    },
    [types.TOGGLE_SIDEBAR_UNFOLDABLE](state) {
        state.unfoldable = !state.unfoldable;
    },
};
