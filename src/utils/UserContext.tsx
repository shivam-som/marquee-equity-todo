import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the user type
interface User {
    username: string;
    name: string;
    email: string;
    password?: string;
}
const userInfo = { username: '', name: '', email: '', password: '' };

// Define the context type
export interface UserContextType {
    user: User;
    login: (userData: User) => void;
    logout: () => void;
}

// Create the context
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create the provider component
interface UserProviderProps {
    children: ReactNode;
}

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>(userInfo);

    const login = (userData: User) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(userInfo);
    };

    const contextValue: UserContextType = {
        user,
        login,
        logout,
    };

    return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// Create a custom hook for accessing the UserContext
const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
};

export { UserProvider, useUserContext };
