import auth from "./auth";
import route from "./route";
import salesreport from "./salesreport";

export default {
    tc: {
        ...common,
        ...auth,
        ...salesreport,
        ...route,
    },
};
