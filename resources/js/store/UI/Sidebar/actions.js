import * as types from "./mutation-types";

const name = "ui/sidebar";

export default {
    [`${name}/toggleVisible`]({ commit, dispatch }, payload) {
        commit(types.TOGGLE_SIDEBAR_VISIBLE, payload);
    },
    [`${name}/toggleUnfoldable`]({ commit, dispatch }, payload) {
        commit(types.TOGGLE_SIDEBAR_UNFOLDABLE, payload);
    },
};
