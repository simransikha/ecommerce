import { createContext, useState, useEffect } from "react";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../../firebase/firebase";

export const UserContext = createContext();

// eslint-disable-next-line react/prop-types
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
        if (user) {
            setUser(user);
        } else {
            setUser(null);
        }
        });
    }, []);
    
    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
    }