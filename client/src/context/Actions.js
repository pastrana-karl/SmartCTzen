export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START"
});

export const LoginSuccessful = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
});

export const LoginFailure = () => ({
    type: "LOGIN_FAILURE"
});

export const Logout = () => ({
    type: "LOGOUT"
});

export const SALoginStart = (userCredentials) => ({
    type: "SALOGIN_START"
});

export const SALoginSuccessful = (saUser) => ({
    type: "SALOGIN_SUCCESS",
    payload: saUser,
});

export const SALoginFailure = () => ({
    type: "SALOGIN_FAILURE"
});

export const SALogout = () => ({
    type: "SALOGOUT"
});

export const UpdateStart = (userCredentials) => ({
    type: "UPDATE_START"
});

export const UpdateSuccessful = (user) => ({
    type: "UPDATE_SUCCESS",
    payload: user,
});

export const UpdateFailure = () => ({
    type: "UPDATE_FAILURE"
});