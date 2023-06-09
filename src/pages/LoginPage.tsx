// src/pages/LoginPage.tsx
import React, { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';
import Dashboard from '../components/Dashboard';
import { mockTodos, mockUser } from '../utils/mock';
import { decrypt, encrypt } from '../utils/ducks';
import { useUserContext } from '../utils/UserContext';

type LoginPageProps = {};

const LoginPage: React.FC<LoginPageProps> = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [todos, setTodos] = useState<{ id: number; title: string, isDone: boolean }[]>([]);
    const { user, login } = useUserContext();

    useEffect(() => {
        const isLoggedInLocal = localStorage.getItem('isLoggedIn');
        if (isLoggedInLocal) {
            const localString = decrypt(isLoggedInLocal);
            if (localString.length > 0 && localString?.split(',')[0] === 'yes') {
                const user_exist = mockUser.find((user) => user.username === localString?.split(',')[1])
                setIsLoggedIn(true);
                setTodos(mockTodos);
                login(user_exist ? user_exist : { username: '', name: '', email: '' });
            }
        }
    }, []);

    const handleLogin = (username: string, password: string) => {
        const user_exist = mockUser.find((user) => user.username === username)
        if (user_exist && password === user_exist.password) {
            setIsLoggedIn(true);
            localStorage.setItem('isLoggedIn', encrypt(`yes,${username}`));
            setTodos(mockTodos);
            login(user_exist ? user_exist : { username: '', name: '', email: '' });
        } else {
            alert('Invalid credentials');
            localStorage.removeItem('isLoggedIn');
        }
    };

    return (
        <div>
            {!isLoggedIn ? (
                <LoginForm onLogin={handleLogin} />
            ) : (
                <Dashboard todos={todos} setIsLoggedIn={setIsLoggedIn} />
            )}
        </div>
    );
};

export default LoginPage;
