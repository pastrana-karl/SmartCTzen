import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    saUser: JSON.parse(localStorage.getItem("saUser")) || null,
    isFetching: false,
    error: false,
};

export const Context = createContext(INITIAL_STATE);

export const ContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    }, [state.user])

    useEffect(() => {
        localStorage.setItem("saUser", JSON.stringify(state.saUser))
    }, [state.saUser])
    
    return(
        <Context.Provider value = {{
            user: state.user,
            saUser: state.saUser,
            isFetching: state.isFetching,
            error: state.error,
            dispatch
        }}>
            { children }
        </Context.Provider>
    )
};