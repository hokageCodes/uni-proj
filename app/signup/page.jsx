// components/Register.js
"use client"
import React, { useState } from 'react';
import axios from 'axios';
import { IoPersonOutline, IoMailOutline, IoLockClosedOutline, IoSchoolOutline } from 'react-icons/io5';
import Link from 'next/link';

const Register = () => {
    const [formData, setFormData] = useState({
        matricNumber: '',
        fullName: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});

    const { matricNumber, fullName, email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setErrors({}); // Clear previous errors
        if (!matricNumber || !fullName || !email || !password) {
            setErrors({ msg: 'Please fill in all fields' });
            return;
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const body = JSON.stringify({ matricNumber, fullName, email, password });
            const res = await axios.post('http://localhost:8000/api/auth/register', body, config);
            window.location.href = "/login"
            console.log(res.data); // Implement your logic for success
        } catch (err) {
            console.error(err.response.data); // Handle errors
            setErrors(err.response.data);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 pt-8">
            <div className=" mt-16 max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10" style={{ height: '550px' }}>
                <div className="text-center flex flex-col justify-between h-full">
                    <img src="/assets/logo.jpg" className="mx-auto h-28 w-auto" alt="Logo" />
                    <h2 className="text-lg font-extrabold text-gray-900">Create your account</h2>
                    <form className="flex flex-col justify-between flex-1 mt-2" onSubmit={onSubmit}>
                        <div className="flex-grow">
                            <div className="rounded-md shadow-sm -space-y-px">
                                {['matricNumber', 'fullName', 'email', 'password'].map((field, idx) => (
                                    <div key={idx} className="mb-4">
                                        <label htmlFor={field} className="sr-only">{field}</label>
                                        <div className="relative">
                                            <input
                                                id={field}
                                                name={field}
                                                type={field === 'password' ? 'password' : 'text'}
                                                required
                                                className="input-field pl-3 pr-10 py-2 mb-4 rounded-md w-full focus:ring-indigo-500 focus:border-indigo-500"
                                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                                value={formData[field]}
                                                onChange={onChange}
                                            />
                                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                                {(field === 'matricNumber' && <IoSchoolOutline className="text-gray-400" />) ||
                                                 (field === 'fullName' && <IoPersonOutline className="text-gray-400" />) ||
                                                 (field === 'email' && <IoMailOutline className="text-gray-400" />) ||
                                                 (field === 'password' && <IoLockClosedOutline className="text-gray-400" />)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {errors.msg && (
                                <div className="text-red-500 text-sm text-center">
                                    {errors.msg}
                                </div>
                            )}
                        </div>
                        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </button>
                        <p className="mt-2 text-sm text-center text-gray-600">
                            Or <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">already have an account?</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
