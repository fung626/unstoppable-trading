export default {
    authUser(state) {
        if (state.user === null) {
            return false;
        }
        return state.user;
    },
    authToken(state) {
        if (state.token === null || state.token === undefined) {
            return false;
        }
        return state.token;
    },
    authCheck(state) {
        return state.token !== null && state.token !== undefined;
    },
    isAdmin(state) {
        return state.user?.role === "ADMIN";
    },
    isEmployee(state) {
        return state.user?.role === "EMPLOYEE";
    },
    permissions(state) {
        return state.user?.permission.items;
    }
};
