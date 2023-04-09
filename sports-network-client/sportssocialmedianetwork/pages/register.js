import NextLink from "next/link";
import { FaLock, FaUser, FaPhone, FaMailBulk } from 'react-icons/fa';
import Router from 'next/router';
import { useState } from "react";
import userService from "../services/user-service";

export default function Login() {
    const [username, setUsername] = useState("");
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (event) => {
        event.preventDefault();
        try {
            await userService.createUser(firstName, lastName, phoneNumber, username, password).then(
                () => {
                    Router.push("login");
                },
                (error) => {
                    setError(error)
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="">
            <div className="bg-gradient-to-r from-cyan-300 via-yellow-50 to-cyan-300 block h-screen items-center justify-center p-4 md:flex">
                <div className="bg-cover flex flex-col items-center max-w-screen-lg overflow-hidden rounded-lg shadow-lg text-gray-600 w-full md:flex-row">
                    <div className="backdrop-blur-sm backdrop-filter flex flex-col items:center justify-center p-4 text-white w-full md:w-1/2">
                        <h1 className='font-medium text-3xl text-cyan-600'>Sports social media network</h1>
                        <p className='italic text-lg'></p>
                    </div>

                    <div className="bg-white flex flex-col items-center p-4 space-y-8 w-full md:w-1/2">
                        <div className="flex flex-col items-center">
                            <h1 className="font-medium text-cyan-400 text-xl">Welcome!</h1>
                            <p>Create an account</p>
                        </div>

                        <form onSubmit={handleRegister} className='flex flex-col items-center space-y-4'>
                            <div className='relative'>
                                <span className='absolute flex inset-y-0 items-center pl-4 text-gray-400'><FaUser /></span>
                                <input
                                    className='border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-cyan-300'
                                    placeholder="First name...*"
                                    type="text"
                                    id="firstName"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required />
                            </div>
                            <div className='relative'>
                                <span className='absolute flex inset-y-0 items-center pl-4 text-gray-400'><FaUser /></span>
                                <input
                                    className='border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-cyan-300'
                                    placeholder="Last name...*"
                                    type="text"
                                    id="lastName"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required />
                            </div>
                            <div className='relative'>
                                <span className='absolute flex inset-y-0 items-center pl-4 text-gray-400'><FaPhone /></span>
                                <input
                                    className='border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-cyan-300'
                                    placeholder="Phone number..."
                                    type="text"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>
                            <div className='relative'>
                                <span className='absolute flex inset-y-0 items-center pl-4 text-gray-400'><FaMailBulk /></span>
                                <input
                                    className='border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-cyan-300'
                                    placeholder="Email...*"
                                    type="email"
                                    id="email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required />
                            </div>
                            <div className='relative'>
                                <span className='absolute flex inset-y-0 items-center pl-4 text-gray-400'><FaLock /></span>
                                <input
                                    className='border border-gray-300 outline-none placeholder-gray-400 pl-9 pr-4 py-1 rounded-md transition focus:ring-2 focus:ring-cyan-300'
                                    placeholder="Password...*"
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                            <button
                                className='bg-cyan-400 font-medium inline-flex items-center px-3 py-1 rounded-md shadow-md text-white transition hover:bg-cyan-500'
                                type='submit'>
                                <FaUser className='mr-2' /> Register
                            </button>
                        </form>

                        <div className="flex flex-col items-center">
                            {error && <p className="text-red-600">Something went wrong!</p>}
                            <p>Fields marked with * are required</p>
                            <p className='italic'>
                                Login
                                <NextLink
                                    href="/login"
                                    legacyBehavior
                                >
                                    <a className="ml-1 text-cyan-500 hover:underline"> Here</a>
                                </NextLink>
                                .
                            </p>
                            <p className='italic'>
                                Lost your password?
                                <NextLink href="/" legacyBehavior>
                                    <a className="ml-1 text-cyan-500 hover:underline">Reset password</a>
                                </NextLink>
                                .
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}