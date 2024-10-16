import auth from "./auth";
import route from "./route";

export default {
    tc: {
        ...auth,
        ...route,
    },
};
