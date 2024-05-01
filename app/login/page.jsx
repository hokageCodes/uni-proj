// components/Login.js
"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IoMailOutline, IoLockClosedOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({
        identifier: '',
        password: ''
    });
    const {login, user,isAuthenticated} = useAuth();
    const [error, setError] = useState('');
    const router = useRouter();

    const { identifier, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        await  auth.login({ identifier, password });

    };
    useEffect(() => {
        if(isAuthenticated){
            router.push("/")
        }
    }, [isAuthenticated])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10 mt-16">
                <div className="text-center">
                    <img src="/assets/logo.jpg" className="mx-auto h-28 w-auto" alt="Logo" />
                    <h2 className="mt-6 text-lg font-extrabold text-gray-900">Sign in to your account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={onSubmit}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div className='mb-4'>
                            <label htmlFor="identifier" className="sr-only">Email or Matric Number</label>
                            <div className="relative">
                                <IoMailOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                <input
                                    id="identifier"
                                    name="identifier"
                                    type="text"
                                    autoComplete="email"
                                    required
                                    className="input-field pl-10 pr-3 py-4 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Email or Matric Number"
                                    value={identifier}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="relative border">
                                <IoLockClosedOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="input-field pl-10 pr-3 py-4 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                                    placeholder="Password"
                                    value={password}
                                    onChange={onChange}
                                />
                            </div>
                        </div>
                    </div>
                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign In
                    </button>
                    <p className="text-sm text-center text-gray-600">
                        Or <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">need to create an account?</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
