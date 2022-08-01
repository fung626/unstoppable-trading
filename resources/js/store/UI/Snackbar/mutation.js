import * as types from "./mutation-types";

export default {
    [types.SHOW](state, { color, text }) {
        state.color = color;
        state.text = text;
        state.show = true;
    },
    [types.CLOSE](state) {
        state.show = false;
    }
};
