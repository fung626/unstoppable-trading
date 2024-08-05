const name = "snackbar";

export default {
    [`${name}/show`](state) {
        return state.show;
    },
    [`${name}/color`](state) {
        return state.color;
    },
    [`${name}/text`](state) {
        return state.text;
    },
};
