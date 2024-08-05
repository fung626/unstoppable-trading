import auth from "./auth";
import common from "./common";
import route from "./route";
import salesreport from "./salesreport";

export default {
    en: {
        ...common,
        ...auth,
        ...salesreport,
        ...route,
    },
};
