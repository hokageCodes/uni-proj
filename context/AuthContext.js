// context/AuthContext.js
"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const isAuthenticated = user; 

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const config = {
                        headers: { Authorization: `Bearer ${token}` }
                    };
                    const response = await axios.get('http://localhost:8000/api/user/profile', config);
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Authentication error:", error);
                setUser(null);
            }
        };

        verifyUser();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:8000/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setUser(response.data.user);
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        // window.location.href = "/" 
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
