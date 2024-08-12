import auth from "./auth";
import common from "./common";
import permission from "./permission";
import route from "./route";
import salesreport from "./salesreport";

export default {
    en: {
        ...common,
        ...auth,
        ...salesreport,
        ...permission,
        ...route,
    },
};
