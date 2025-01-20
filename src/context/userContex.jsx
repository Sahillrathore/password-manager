import { createContext, useContext, useEffect, useState } from "react";

// Create the context
const userContext = createContext();

// Create the provider component
export const UserContextProvider = ({ children }) => {
    // Create state to manage the user
    const [user, setUser] = useState(() => {
        // Load the user from localStorage if it exists
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        // Save the user to localStorage whenever it changes
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    // Pass the state and updater function in the context value
    const value = {
        user,
        setUser,
    };

    return <userContext.Provider value={value}>{children}</userContext.Provider>;
};

// Custom hook to access the context
export const useUserContext = () => {
    return useContext(userContext);
};
