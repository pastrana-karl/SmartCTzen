import React, { createContext, useReducer } from 'react';

import AdminAuthReducer from './AdminAuthReducer';

const INITIAL_STATE = {
    user: null,
    isFetching: false,
    error: false
};

export const AdminAuthContext = createContext(INITIAL_STATE);

//ContextProvider

export const AdminAuthContextProvider = ( props ) => {
    const [state, dispatch] = useReducer(AdminAuthReducer, INITIAL_STATE);

    return (
        <AdminAuthContext.Provider value={
            {
                user: state.user, 
                isFetching: state.isFetching, 
                error: state.error,
                dispatch
            }
        }>
        {props.children}
        </AdminAuthContext.Provider>
    )
};