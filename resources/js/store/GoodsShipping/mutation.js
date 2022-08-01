import Vue from "vue";
import * as types from "./mutation-types";

export default {
    [types.ADD_SHIPPING](state, { data }) {
        let index = state.shippingData.findIndex(obj => obj.id === data.id);
        if (index > -1) {
            // state.shippingData[index] = data;
            Vue.set(state.shippingData, index, data);
        } else {
            state.shippingData = [...state.shippingData, data];
        }
    },
    [types.CLEAR_SHIPPING](state) {
        state.shippingData = [];
        state.formattedShipData = [];
    },
    [types.FETCH_SHIPPING_SUCCESS](state, { data }) {
        state.data = data;
    },
    [types.FETCH_SHIPPING_DETAILS_SUCCESS](state, { data }) {
        state.detailsData = data;
    },
    [types.UPDATE_SHIPPING_DETAILS_SUCCESS](state, { data }) {
        state.detailsData = data;
    },
    [types.FORMAT_SHIPPING_SUCCESS](state, { data }) {
        state.formattedShipData = data;
    }
};
