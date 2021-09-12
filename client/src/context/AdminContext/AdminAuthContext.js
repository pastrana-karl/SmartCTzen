import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    user: null, 
    isFetching: false,
    error: false
};

export const AdminAuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(AdminAuthContext, INITIAL_STATE);

    return (
        <AdminAuthContext.Provider
         value={{ 
             user: state.user, 
             isFetching: state.isFetching, 
             error: state.error,
             dispatch }}>
            {children}
        </AdminAuthContext.Provider>
    );
}