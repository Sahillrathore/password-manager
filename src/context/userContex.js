import { createContext, useContext } from "react";


const userContext = createContext();

export const userContextProvider = userContext.Provider;

export const useUserContext = () => {
    return useContext(userContext);
}