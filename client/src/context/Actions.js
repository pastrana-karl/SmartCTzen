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

export const ALoginStart = (userCredentials) => ({
    type: "ALOGIN_START"
});

export const ALoginSuccessful = (aUser) => ({
    type: "ALOGIN_SUCCESS",
    payload: aUser,
});

export const ALoginFailure = () => ({
    type: "ALOGIN_FAILURE"
});

export const ALogout = () => ({
    type: "ALOGOUT"
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

export const SAUpdateStart = (userCredentials) => ({
    type: "SAUPDATE_START"
});

export const SAUpdateSuccessful = (user) => ({
    type: "SAUPDATE_SUCCESS",
    payload: user,
});

export const SAUpdateFailure = () => ({
    type: "SAUPDATE_FAILURE"
});