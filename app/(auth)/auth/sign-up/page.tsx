"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Check, AlertCircle } from "lucide-react";

// Redux Imports
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "@/redux/features/authSlice"; // Adjust path

const SignUp = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Local State
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    role: "user", // Default role
    password: "",
    confirmPassword: "",
  });

  // Redux State (to check if already logged in)
  const { isAuthenticated, role, loading } = useSelector((state: any) => state.auth);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      if (role === "organizer") router.push("/organizer-dashboard");
      else router.push("/user-dashboard");
    }
  }, [isAuthenticated, role, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginStart());

    // SIMULATED API CALL
    setTimeout(() => {
      if (formData.password !== formData.confirmPassword) {
        dispatch(loginFailure("Passwords do not match"));
        return;
      }

      // Mock Success Response
      const mockUser = { name: formData.fullName, email: formData.email };
      
      // Dispatch to Redux
      dispatch(loginSuccess({ user: mockUser, role: formData.role as "user" | "organizer" }));
      
      // Redirection handled by useEffect above
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF5F7] flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-[1400px] h-full min-h-[800px] flex rounded-[30px] overflow-hidden shadow-2xl bg-white">
        
        {/* LEFT SIDE - FORM */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
          <div className="max-w-[500px] mx-auto w-full">
            <h1 className="text-[32px] sm:text-[40px] font-serif font-bold text-gray-900 mb-2">
              Sign Up
            </h1>
            <p className="text-gray-500 mb-8">
              Please fill out this field to continue the registration
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Full Name */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="Brian O'Conner"
                  className="w-full h-[50px] px-4 rounded-lg text-gray-500 border border-gray-200 focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] outline-none transition-all"
                  onChange={handleChange}
                />
              </div>

              {/* Role Selector (Critical for Redux) */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">I am a</label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full h-[50px] px-4 text-gray-500 rounded-lg border border-gray-200 focus:border-[#A01C1C] bg-white appearance-none outline-none cursor-pointer"
                  >
                    <option value="user">Participant / User</option>
                    <option value="organizer">Contest Organizer</option>
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                    <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
                      <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="brian@email.com"
                  className="w-full h-[50px] px-4 rounded-lg text-gray-500 border border-gray-200 focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] outline-none transition-all"
                  onChange={handleChange}
                />
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    placeholder="*************"
                    className="w-full h-[50px] px-4 rounded-lg text-gray-500 border border-gray-200 focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] outline-none transition-all pr-12"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formData.password.length > 0 && formData.password.length < 8 && (
                   <p className="text-xs text-red-500 mt-1">Must contain at least 8 characters</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    placeholder="*************"
                    className="w-full h-[50px] px-4 rounded-lg text-gray-500 border border-gray-200 focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] outline-none transition-all pr-12"
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-xs text-[#A01C1C] mt-1 font-medium">Password matched</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-[52px] mt-4 bg-gradient-to-r from-[#A01C1C] to-[#800e0e] text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all duration-200 disabled:opacity-70"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="h-[1px] bg-gray-200 flex-1"></div>
                <span className="text-gray-400 text-sm">or register with</span>
                <div className="h-[1px] bg-gray-200 flex-1"></div>
              </div>

              {/* Social Login */}
              <div className="flex gap-4">
                <button type="button" className="flex-1 h-[50px] border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <Image src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" width={20} height={20} />
                  <span className="text-sm font-medium text-gray-700">Google</span>
                </button>
                <button type="button" className="flex-1 h-[50px] border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
                  <Image src="https://www.svgrepo.com/show/448234/apple.svg" alt="Apple" width={20} height={20} />
                  <span className="text-sm font-medium text-gray-700">Apple</span>
                </button>
              </div>

              <div className="text-center mt-6">
                <span className="text-gray-500 text-sm">Already have an account? </span>
                <Link href="/auth/sign-in" className="text-gray-900 font-bold hover:underline">
                  Login
                </Link>
              </div>

            </form>
          </div>
        </div>

        {/* RIGHT SIDE - ILLUSTRATION/LOGO */}
        <div className="hidden lg:flex w-1/2 bg-[#FFF5F7] items-center justify-center p-12 relative overflow-hidden">
          {/* Background Decorative Circle */}
          <div className="absolute w-[150%] h-[150%] border-[60px] border-white/40 rounded-full animate-spin-slow pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col items-center">
             {/* Replace with your actual Logo Image */}
             <div className="w-80 h-80 relative">
                <Image 
                    src="/images/logo.svg" 
                    alt="Contest Nepal Logo"
                    fill
                    className="object-contain"
                />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;