export default {
    visible(state) {
        if (state.visible === null) {
            return false;
        }
        return state.visible;
    },
    unfoldable(state) {
        if (state.unfoldable === null) {
            return false;
        }
        return state.unfoldable;
    },
};
