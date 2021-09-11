import axios from 'axios';

export const loginCall = async (user, dispatch) => {
    dispatch({ type: "LOGIN_START" })

    try {
        const res = await axios.post("/api/superAdmin/login" || "/api/admin/login" || "/api/citizen/login", userCredentials);
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch(err) {
        dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
};