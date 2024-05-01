// context/AuthContext.js
"use client"
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import jwtDecode from 'jsonwebtoken/decode'; 
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const isAuthenticated = !user;

    const router = useRouter();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decoded = jwtDecode(token); // Use jwtDecode for clarity
                    console.log("Decoded token:", decoded);
                    setUser(decoded.user);
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
            router.push('/'); // Redirect to homepage after login
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login'); // Redirect to login page after logout
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);
