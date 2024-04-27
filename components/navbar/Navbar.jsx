// components/Navbar.js
"use client"
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Link from 'next/link';
import ThemeToggle from '../ThemeToggle';
import UserProfile from '../user-menu/UserMenu';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);

    return (
        <nav className="bg-light-secondary dark:bg-dark-primary shadow-md py-4 px-5 fixed w-full z-50">
            <div className="container mx-auto flex flex-wrap justify-between items-center">
                <div className="flex items-center flex-grow">
                    <img src="/assets/logo.jpg" alt="Logo" className="h-12 md:h-16" />
                    <span className="hidden md:block font-bold text-xl text-center ml-2 text-dark-secondary dark:text-light-primary">Glorius Vision<br/> University</span>
                </div>
                <div className="flex items-center md:order-3">
                    <div className="md:hidden">
                        <ThemeToggle />
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-3xl ml-2">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </div>
                </div>
                <div className={`absolute md:relative inset-x-0 top-full md:top-0 transition-all transform ${isMenuOpen ? 'scale-100 opacity-100 visible' : 'scale-95 opacity-0 invisible'} md:visible md:opacity-100 md:scale-100 flex-col md:flex-row md:flex items-center md:justify-center bg-custom-gray dark:bg-primary-dark`}>
                    <ul className={`mr-64 flex flex-col md:flex-row md:space-x-6 lg:space-x-10 w-full md:text-center`}>
                        <li><Link legacyBehavior href="/about"><a className="text-sm px-2 py-4 hover:bg-gray-200 dark:hover:bg-gray-900">About</a></Link></li>
                        <li><Link legacyBehavior href="/services"><a className="text-sm px-2 py-4 hover:bg-gray-200 dark:hover:bg-gray-900">Services</a></Link></li>
                        <li><Link legacyBehavior href="/blog"><a className="text-sm px-2 py-4 hover:bg-gray-200 dark:hover:bg-gray-900">Blog</a></Link></li>
                        <li><Link legacyBehavior href="/contact"><a className="text-sm px-2 py-4 hover:bg-gray-200 dark:hover:bg-gray-900">Contact</a></Link></li>
                        <li><Link legacyBehavior href="/faq"><a className="text-sm px-2 py-4 hover:bg-gray-200 dark:hover:bg-gray-900">FAQ</a></Link></li>
                    </ul>
                    <div className="w-full hidden md:flex items-center space-x-4 ml-auto">
                        <ThemeToggle />
                        {isAuthenticated && user ? (
                            <UserProfile user={user} logout={logout} setIsUserProfileOpen={setIsUserProfileOpen} />
                        ) : (
                            <>
                                <Link legacyBehavior href="/login"><a className="px-4 py-2 rounded bg-blue-500 text-white">Login</a></Link>
                                <Link legacyBehavior href="/signup"><a className="px-4 py-2 rounded bg-gray-300">Sign Up</a></Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className="md:hidden absolute inset-x-0 top-full bg-light-secondary dark:bg-dark-primary p-5 transition-all">
                    <ul className="flex flex-col items-center space-y-4">
                        <li><Link legacyBehavior href="/about"><a className="text-sm px-2 py-4 hover:bg-gray-200 dark:hover:bg-gray-900">About</a></Link></li>
                        <li><Link legacyBehavior href="/services"><a className="text-sm px-2 py-4 hover:bg-gray-200 dark:hover:bg-gray-900">Services</a></Link></li>
                        <li><Link legacyBehavior href="/blog"><a className="text-sm px-2 py-4 hover:bg-gray-200 dark:hover:bg-gray-900">Blog</a></Link></li>
                        <li><Link legacyBehavior href="/contact"><a className="text-sm px-2 py-4 hover:bg-gray-200 dark:hover:bg-gray-900">Contact</a></Link></li>
                        <li><Link legacyBehavior href="/faq"><a className="text-sm px-2 py-4 hover:bg-gray-200 dark:hover:bg-gray-900">FAQ</a></Link></li>
                        {isAuthenticated && user ? (
                            <UserProfile user={user} logout={logout} setIsUserProfileOpen={setIsUserProfileOpen} />
                        ) : (
                            <>
                                <Link legacyBehavior href="/login"><a className="px-4 py-2 rounded bg-blue-500 text-white">Login</a></Link>
                                <Link legacyBehavior href="/signup"><a className="px-4 py-2 rounded bg-gray-300">Sign Up</a></Link>
                            </>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
