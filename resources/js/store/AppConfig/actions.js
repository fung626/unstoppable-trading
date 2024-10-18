// import axios from "axios";
import * as types from "./mutation-types";

const name = "app-config";

export default {
    [`${name}/update`]({ commit, dispatch }, payload) {
        commit(types.UPDATE_APP_CONFIG, payload);
    },
};
