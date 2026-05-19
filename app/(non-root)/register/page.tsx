"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ChevronRight, User, Phone, MapPin, GraduationCap, Lock, Check } from "lucide-react";

type FormMode = "login" | "register";

export default function RegisterPage() {
    const [mode, setMode] = useState<FormMode>("register");
    const [currentStep, setCurrentStep] = useState<number>(1);
    
    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const [registerData, setRegisterData] = useState({
        firstName: "",
        lastName: "",
        dob: "19/05/2004",
        gender: "",
        phone: "",
        altPhone: "",
        address: "",
        college: "",
        year: "",
        department: "",
        password: "",
        confirmPassword: ""
    });

    const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Login submitted:", loginData);
        alert("Logged in successfully!");
    };

    const handleRegisterNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log("Registration submitted:", registerData);
            alert("Registration completed successfully!");
        }
    };

    const handleRegisterBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <main className="w-full min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-transparent text-white px-4 md:px-8 relative overflow-hidden">
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
            <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[110px] pointer-events-none -z-10" />

            <div className="w-full max-w-xl bg-black/45 border border-gray-700/50 rounded-[40px] p-8 md:p-12 backdrop-blur-md shadow-[0_0_35px_rgba(0,191,255,0.15)] relative z-10">
                <div className="flex justify-center bg-black/60 border border-gray-800/80 p-1 rounded-full w-fit mx-auto mb-10">
                    <button
                        onClick={() => {
                            setMode("login");
                            setCurrentStep(1);
                        }}
                        className={`px-8 py-3 rounded-full font-extrabold text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                            mode === "login"
                                ? "bg-white text-black shadow-lg scale-102"
                                : "text-gray-400 hover:text-white bg-transparent"
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setMode("register")}
                        className={`px-8 py-3 rounded-full font-extrabold text-sm tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                            mode === "register"
                                ? "bg-white text-black shadow-lg scale-102"
                                : "text-gray-400 hover:text-white bg-transparent"
                        }`}
                    >
                        Register
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    {mode === "login" ? (
                        <motion.form
                            key="login-form"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            onSubmit={handleLoginSubmit}
                            className="flex flex-col gap-6"
                        >
                            <div className="text-center mb-2">
                                <h2 className="text-2xl font-bold tracking-wider text-white">Welcome Back</h2>
                                <p className="text-xs text-gray-400 mt-1">Please enter your credentials to login</p>
                            </div>

                            <input
                                type="email"
                                name="email"
                                value={loginData.email}
                                onChange={handleLoginChange}
                                placeholder="Email"
                                required
                                className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-4 outline-none transition-all w-full text-base placeholder-gray-500"
                            />

                            <input
                                type="password"
                                name="password"
                                value={loginData.password}
                                onChange={handleLoginChange}
                                placeholder="Password"
                                required
                                className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-4 outline-none transition-all w-full text-base placeholder-gray-500"
                            />

                            <div className="flex justify-between items-center mt-2">
                                <a href="/forgotpassword" className="text-sm text-gray-400 hover:text-[#00bfff] transition-colors underline underline-offset-4">
                                    Forgot Password
                                </a>
                                <button
                                    type="submit"
                                    className="px-10 py-3 border border-[#00bfff] text-[#00bfff] bg-transparent rounded-full hover:bg-[#00bfff] hover:text-black transition-all duration-300 font-extrabold uppercase tracking-widest text-xs shadow-[0_0_15px_rgba(0,191,255,0.1)] hover:shadow-[0_0_25px_rgba(0,191,255,0.4)] cursor-pointer"
                                >
                                    Login
                                </button>
                            </div>
                        </motion.form>
                    ) : (
                        <motion.form
                            key="register-form"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.3 }}
                            onSubmit={handleRegisterNext}
                            className="flex flex-col gap-6"
                        >
                            <div className="text-center">
                                <h2 className="text-2xl font-bold tracking-wider text-white">
                                    {currentStep === 1 && "Personal Details"}
                                    {currentStep === 2 && "Contact Information"}
                                    {currentStep === 3 && "Academic Details"}
                                    {currentStep === 4 && "Account Credentials"}
                                </h2>
                                <p className="text-xs text-gray-400 mt-1">Fields marked with * are required.</p>
                            </div>

                            <div className="flex items-center justify-between max-w-xs mx-auto w-full mb-4 relative px-2">
                                <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-gray-800 -z-10" />
                                <div
                                    className="absolute left-6 top-1/2 -translate-y-1/2 h-[2px] bg-[#00bfff] transition-all duration-500 -z-10"
                                    style={{ width: `${((currentStep - 1) / 3) * 88}%` }}
                                />
                                {[1, 2, 3, 4].map((step) => {
                                    const isCompleted = currentStep > step;
                                    const isActive = currentStep === step;
                                    return (
                                        <div
                                            key={step}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm transition-all duration-500 z-10 cursor-pointer ${
                                                isCompleted
                                                    ? "bg-[#00bfff] text-black shadow-[0_0_15px_rgba(0,191,255,0.5)]"
                                                    : isActive
                                                    ? "bg-[#eab308] text-black shadow-[0_0_15px_rgba(234,179,8,0.5)] scale-110"
                                                    : "bg-black/80 border border-gray-700 text-gray-400"
                                            }`}
                                            onClick={() => {
                                                if (step < currentStep) setCurrentStep(step);
                                            }}
                                        >
                                            {isCompleted ? <Check className="w-4 h-4" strokeWidth={3} /> : step}
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="min-h-[220px]">
                                <AnimatePresence mode="wait">
                                    {currentStep === 1 && (
                                        <motion.div
                                            key="step1"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex flex-col gap-5"
                                        >
                                            <div className="flex gap-4">
                                                <input
                                                    type="text"
                                                    name="firstName"
                                                    value={registerData.firstName}
                                                    onChange={handleRegisterChange}
                                                    placeholder="First Name*"
                                                    required
                                                    className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-3.5 outline-none transition-all w-1/2 text-base placeholder-gray-500"
                                                />
                                                <input
                                                    type="text"
                                                    name="lastName"
                                                    value={registerData.lastName}
                                                    onChange={handleRegisterChange}
                                                    placeholder="Last Name"
                                                    className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-3.5 outline-none transition-all w-1/2 text-base placeholder-gray-500"
                                                />
                                            </div>

                                            <div className="flex flex-col gap-1.5 w-full">
                                                <label className="text-[#00bfff] text-xs font-bold self-start ml-5 uppercase tracking-wider">Date of Birth*</label>
                                                <input
                                                    type="text"
                                                    name="dob"
                                                    value={registerData.dob}
                                                    onChange={handleRegisterChange}
                                                    placeholder="DD/MM/YYYY"
                                                    required
                                                    className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-3.5 outline-none transition-all w-full text-base placeholder-gray-500"
                                                />
                                            </div>

                                            <select
                                                name="gender"
                                                value={registerData.gender}
                                                onChange={handleRegisterChange}
                                                required
                                                className="bg-black/90 border border-gray-700/60 focus:border-[#00bfff] text-gray-400 focus:text-white rounded-full px-6 py-3.5 outline-none transition-all w-full text-base cursor-pointer appearance-none"
                                            >
                                                <option value="" disabled>Gender*</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other / Prefer not to say</option>
                                            </select>
                                        </motion.div>
                                    )}

                                    {currentStep === 2 && (
                                        <motion.div
                                            key="step2"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex flex-col gap-5"
                                        >
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={registerData.phone}
                                                onChange={handleRegisterChange}
                                                placeholder="Phone Number*"
                                                required
                                                className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-3.5 outline-none transition-all w-full text-base placeholder-gray-500"
                                            />

                                            <input
                                                type="tel"
                                                name="altPhone"
                                                value={registerData.altPhone}
                                                onChange={handleRegisterChange}
                                                placeholder="Alternate Phone Number"
                                                className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-3.5 outline-none transition-all w-full text-base placeholder-gray-500"
                                            />

                                            <input
                                                type="text"
                                                name="address"
                                                value={registerData.address}
                                                onChange={handleRegisterChange}
                                                placeholder="Postal Address*"
                                                required
                                                className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-3.5 outline-none transition-all w-full text-base placeholder-gray-500"
                                            />
                                        </motion.div>
                                    )}

                                    {currentStep === 3 && (
                                        <motion.div
                                            key="step3"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex flex-col gap-5"
                                        >
                                            <input
                                                type="text"
                                                name="college"
                                                value={registerData.college}
                                                onChange={handleRegisterChange}
                                                placeholder="College / School Name*"
                                                required
                                                className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-3.5 outline-none transition-all w-full text-base placeholder-gray-500"
                                            />

                                            <select
                                                name="year"
                                                value={registerData.year}
                                                onChange={handleRegisterChange}
                                                required
                                                className="bg-black/90 border border-gray-700/60 focus:border-[#00bfff] text-gray-400 focus:text-white rounded-full px-6 py-3.5 outline-none transition-all w-full text-base cursor-pointer appearance-none"
                                            >
                                                <option value="" disabled>Year of Study*</option>
                                                <option value="1st Year">1st Year</option>
                                                <option value="2nd Year">2nd Year</option>
                                                <option value="3rd Year">3rd Year</option>
                                                <option value="4th Year">4th Year</option>
                                                <option value="5th Year / PG">5th Year / PG</option>
                                                <option value="School Student">School Student</option>
                                            </select>

                                            <input
                                                type="text"
                                                name="department"
                                                value={registerData.department}
                                                onChange={handleRegisterChange}
                                                placeholder="Department / Branch*"
                                                required
                                                className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-3.5 outline-none transition-all w-full text-base placeholder-gray-500"
                                            />
                                        </motion.div>
                                    )}

                                    {currentStep === 4 && (
                                        <motion.div
                                            key="step4"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            className="flex flex-col gap-5"
                                        >
                                            <input
                                                type="password"
                                                name="password"
                                                value={registerData.password}
                                                onChange={handleRegisterChange}
                                                placeholder="Password*"
                                                required
                                                className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-3.5 outline-none transition-all w-full text-base placeholder-gray-500"
                                            />

                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                value={registerData.confirmPassword}
                                                onChange={handleRegisterChange}
                                                placeholder="Confirm Password*"
                                                required
                                                className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-3.5 outline-none transition-all w-full text-base placeholder-gray-500"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="flex gap-4 items-center justify-center mt-6">
                                {currentStep > 1 && (
                                    <button
                                        type="button"
                                        onClick={handleRegisterBack}
                                        className="px-8 py-3.5 border border-gray-700 text-gray-300 rounded-full hover:bg-white/5 hover:text-white transition-all duration-300 font-extrabold uppercase tracking-widest text-xs cursor-pointer"
                                    >
                                        Back
                                    </button>
                                )}
                                <button
                                    type="submit"
                                    className="px-12 py-3.5 bg-[#00bfff] hover:bg-transparent text-black hover:text-[#00bfff] border border-[#00bfff] rounded-full transition-all duration-300 font-extrabold uppercase tracking-widest text-xs shadow-[0_0_20px_rgba(0,191,255,0.35)] hover:shadow-[0_0_30px_rgba(0,191,255,0.7)] cursor-pointer"
                                >
                                    {currentStep === 4 ? "Submit" : "Continue"}
                                </button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}