const name = "salesreport";

export default {
    [`${name}/data`](state) {
        return state.data;
    },
    [`${name}/daily/data`](state) {
        return state.dailyData;
    }
};
