"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Mail, Lock, Key } from "lucide-react";

export default function ForgotPasswordPage() {
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
        } else {
            console.log("Password reset successfully for:", email);
            alert("Password reset completed successfully!");
            window.location.href = "/register"; // Redirect to login/register page
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <main className="w-full min-h-screen pt-32 pb-20 flex flex-col items-center justify-center bg-transparent text-white px-4 md:px-8 relative overflow-hidden">
            {/* Background Radial Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[130px] pointer-events-none -z-10" />
            
            <div className="w-full max-w-xl bg-black/45 border border-gray-700/50 rounded-[40px] p-8 md:p-12 backdrop-blur-md shadow-[0_0_35px_rgba(0,191,255,0.15)] relative z-10">
                
                {/* Heading White Pill */}
                <div className="flex justify-center bg-white px-8 py-3 rounded-full w-fit mx-auto mb-10 shadow-lg">
                    <span className="text-black font-extrabold text-sm tracking-widest uppercase">
                        Forgot Password
                    </span>
                </div>

                <AnimatePresence mode="wait">
                    <motion.form
                        key={`forgot-password-step-${currentStep}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleNext}
                        className="flex flex-col gap-6"
                    >
                        <div className="text-center">
                            <h2 className="text-xl font-bold tracking-wider text-white">
                                {currentStep === 1 && "Enter Email Address"}
                                {currentStep === 2 && "Verify OTP"}
                                {currentStep === 3 && "Reset Password"}
                            </h2>
                        </div>

                        {/* Connection line stepper */}
                        <div className="flex items-center justify-between max-w-[200px] mx-auto w-full mb-6 relative px-2">
                            <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[2px] bg-gray-800 -z-10" />
                            <div
                                className="absolute left-6 top-1/2 -translate-y-1/2 h-[2px] bg-[#00bfff] transition-all duration-500 -z-10"
                                style={{ width: `${((currentStep - 1) / 2) * 88}%` }}
                            />
                            {[1, 2, 3].map((step) => {
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

                        <div className="min-h-[100px]">
                            <AnimatePresence mode="wait">
                                {currentStep === 1 && (
                                    <motion.div
                                        key="forgot-step1"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex flex-col gap-5 animate-fade-in"
                                    >
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Email*"
                                            required
                                            className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-4 outline-none transition-all w-full text-base placeholder-gray-500"
                                        />
                                    </motion.div>
                                )}

                                {currentStep === 2 && (
                                    <motion.div
                                        key="forgot-step2"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex flex-col gap-5 animate-fade-in"
                                    >
                                        <p className="text-sm text-center text-gray-400">
                                            We sent a verification code to <span className="text-[#00bfff]">{email}</span>
                                        </p>
                                        <input
                                            type="text"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value)}
                                            placeholder="OTP*"
                                            required
                                            maxLength={6}
                                            className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-4 outline-none transition-all w-full text-base placeholder-gray-500 text-center tracking-widest font-bold"
                                        />
                                    </motion.div>
                                )}

                                {currentStep === 3 && (
                                    <motion.div
                                        key="forgot-step3"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="flex flex-col gap-5 animate-fade-in"
                                    >
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="New Password*"
                                            required
                                            className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-4 outline-none transition-all w-full text-base placeholder-gray-500"
                                        />

                                        <input
                                            type="password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            placeholder="Confirm New Password*"
                                            required
                                            className="bg-transparent border border-gray-700/60 focus:border-[#00bfff] focus:shadow-[0_0_15px_rgba(0,191,255,0.15)] text-white rounded-full px-6 py-4 outline-none transition-all w-full text-base placeholder-gray-500"
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <div className="flex gap-4 items-center justify-center mt-6">
                            {currentStep > 1 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="px-8 py-3 border border-gray-700 text-gray-300 rounded-full hover:bg-white/5 hover:text-white transition-all duration-300 font-extrabold uppercase tracking-widest text-xs cursor-pointer"
                                >
                                    Back
                                </button>
                            )}
                            <button
                                type="submit"
                                className="px-12 py-3.5 border border-[#00bfff] text-[#00bfff] bg-transparent rounded-full hover:bg-[#00bfff] hover:text-black transition-all duration-300 font-extrabold uppercase tracking-widest text-xs shadow-[0_0_15px_rgba(0,191,255,0.1)] hover:shadow-[0_0_25px_rgba(0,191,255,0.4)] cursor-pointer"
                            >
                                {currentStep === 1 && "Sent OTP"}
                                {currentStep === 2 && "Verify"}
                                {currentStep === 3 && "Reset Password"}
                            </button>
                        </div>
                    </motion.form>
                </AnimatePresence>
            </div>
        </main>
    );
}
