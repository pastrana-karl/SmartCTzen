const Reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START": return {
            saUser: null,
            user: null,
            isFetching: true,
            error: false,
        };

        case "LOGIN_SUCCESS": return {
            saUser: null,
            user: action.payload,
            isFetching: false,
            error: false,
        };

        case "LOGIN_FAILURE": return {
            saUser: null,
            user: null,
            isFetching: false,
            error: true,
        };

        case "LOGOUT": return {
            saUser: null,
            user: null,
            isFetching: false,
            error: false,
        };

        case "SALOGIN_START": return {
            user: null,
            saUser: null,
            isFetching: true,
            error: false,
        };

        case "SALOGIN_SUCCESS": return {
            user: null,
            saUser: action.payload,
            isFetching: false,
            error: false,
        };

        case "SALOGIN_FAILURE": return {
            user: null,
            saUser: null,
            isFetching: false,
            error: true,
        };

        case "SALOGOUT": return {
            user: null,
            saUser: null,
            isFetching: false,
            error: false,
        };

        case "UPDATE_START": return {
            ...state,
            isFetching: true,
        };

        case "UPDATE_SUCCESS": return {
            user: action.payload,
            isFetching: false,
            error: false,
        };

        case "UPDATE_FAILURE": return {
            user: state.user,
            isFetching: false,
            error: true,
        };

        default: return state;
    }
};

export default Reducer;