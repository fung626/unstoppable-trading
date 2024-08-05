const name = "auth";

const ADMIN = "ADMIN";
const EMPLOYEE = "EMPLOYEE";

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
    isAuthenticated(state) {
        return state.token !== null && state.token !== undefined;
    },
    isAdmin(state) {
        return state.user?.role === ADMIN;
    },
    isEmployee(state) {
        return state.user?.role === EMPLOYEE;
    },
    isPermissionGranted(state) {
        return (key) => {
            if (state.user?.role === ADMIN) {
                return true;
            }
            let granted = false;
            let items = state.user?.permission?.items
                ? state.user?.permission?.items
                : {};
            // console.log(items);
            for (const _key in items) {
                if (_key === key) {
                    granted = items[_key];
                    break;
                }
            }
            return granted;
        };
    },
    permissions(state) {
        return state.user?.permission?.items
            ? state.user?.permission?.items
            : {};
    },
};
