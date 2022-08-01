const name = "snackbar";

export default {
    [`${name}/color`](state) {
        return state.color;
    },
    [`${name}/text`](state) {
        return state.text;
    }
};
