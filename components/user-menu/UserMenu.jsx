"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const UserProfile = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);

    // Debug logging
    console.log("UserProfile received user:", user);
    console.log("UserProfile user's email:", user?.email);
    console.log("UserProfile user's matricNumber:", user?.matricNumber);

    return (
        <div className="relative">
            <img src="/assets/logo.jpg" alt="User Avatar" className="w-8 h-8 rounded-full cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded shadow-xl">
                    <div className="block px-4 py-2 text-sm text-gray-700">{user?.email}</div>
                    <div className="block px-4 py-2 text-sm text-gray-700">{user?.matricNumber}</div>
                    <Link legacyBehavior href="/profile"><a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a></Link>
                    <Link legacyBehavior href="/settings"><a className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a></Link>
                    <button className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 focus:outline-none">Logout</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
