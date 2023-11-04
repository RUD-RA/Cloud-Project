import { createContext, useState, useEffect } from "react";

export const UserContext = createContext({
    currentUser: {
        user: null,
    },
    setUser: () => { }
})

export const UserProvider = ({ children }) => {
    const [currentUser, setUser] = useState({
        user: JSON.parse(localStorage.getItem('user')) || null,
    });

    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(currentUser.user));
    }, [currentUser]);

    const values = { currentUser, setUser }

    return (
        <UserContext.Provider value={values}>{children}</UserContext.Provider>
    )
}