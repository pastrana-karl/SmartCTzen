import axios from "axios";

export const loginCall = async (adminCredential, dispatch) => {
    dispatch({ type: "ALOGIN_START"});
    try {
        const res = await axios.post("/api/admin/login", adminCredential);
        dispatch({ type: "ALOGIN_SUCCESS", payload: res.data })
    } catch (err) {
        dispatch({ type: "ALOGIN_FAILURE" });
    }
};