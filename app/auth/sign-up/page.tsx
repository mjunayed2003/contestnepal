"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Mail, Lock, User, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess } from "@/redux/features/authSlice";

// ─── Password strength helper ──────────────────────────────────
function getStrength(password: string): { label: string; color: string; score: number } {
  if (!password) return { label: "", color: "", score: 0 };
  let score = 0;
  if (password.length >= 8)              score++;
  if (/[A-Z]/.test(password))           score++;
  if (/[a-z]/.test(password))           score++;
  if (/[0-9]/.test(password))           score++;
  if (/[^A-Za-z0-9]/.test(password))   score++;

  if (score <= 1) return { label: "very weak",   color: "text-red-500",    score };
  if (score === 2) return { label: "weak",        color: "text-orange-500", score };
  if (score === 3) return { label: "moderate",    color: "text-yellow-500", score };
  if (score === 4) return { label: "strong",      color: "text-blue-500",   score };
  return              { label: "very strong",  color: "text-green-600",  score };
}

const ROLES = ["User", "Organizer"];

const SignUp = () => {
  const router   = useRouter();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm,  setShowConfirm]  = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    role:     "User",
    email:    "",
    password: "",
    confirm:  "",
  });

  const { isAuthenticated, role, loading } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      router.push(role === "organizer" ? "/admin" : "/");
    }
  }, [isAuthenticated, role, router]);

  const strength    = getStrength(formData.password);
  const isMatched   = formData.confirm.length > 0 && formData.password === formData.confirm;
  const isMismatch  = formData.confirm.length > 0 && formData.password !== formData.confirm;

  const handleChange = (field: string, value: string) =>
    setFormData((p) => ({ ...p, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm) return;

    dispatch(loginStart());
    setTimeout(() => {
      const detectedRole: "user" | "organizer" =
        formData.role === "Organizer" ? "organizer" : "user";

      dispatch(
        loginSuccess({
          user: { name: formData.fullName, email: formData.email },
          role: detectedRole,
        })
      );
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-[#FFF5F7] flex items-center justify-center p-4 lg:p-8">
      <div className="w-full max-w-[1400px] min-h-[700px] flex rounded-[30px] overflow-hidden shadow-2xl bg-white">

        {/* ── LEFT — FORM ── */}
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
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => handleChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full h-[50px] pl-12 pr-4 text-gray-700 rounded-lg border border-gray-200 focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Role */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Role</label>
                <div className="relative">
                  <select
                    value={formData.role}
                    onChange={(e) => handleChange("role", e.target.value)}
                    className="w-full h-[50px] pl-4 pr-10 text-gray-700 rounded-lg border border-gray-200 focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] outline-none transition-all appearance-none bg-white cursor-pointer"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder="brian@email.com"
                    className="w-full h-[50px] pl-12 pr-4 text-gray-700 rounded-lg border border-gray-200 focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] outline-none transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    placeholder="Enter your password"
                    className="w-full h-[50px] pl-12 pr-12 text-gray-700 rounded-lg border border-gray-200 focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C] outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Password hint + strength */}
                {formData.password.length === 0 ? (
                  <p className="text-xs text-gray-400 mt-1">
                    Must contain at least 8 characters, with capital letter(s), small letter(s), and number(s) in it.
                  </p>
                ) : (
                  <p className="text-xs text-gray-500 mt-1">
                    Your password strength:{" "}
                    <span className={`font-semibold ${strength.color}`}>{strength.label}</span>
                  </p>
                )}
              </div>

              {/* Password Confirmation */}
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-gray-700">Password Confirmation</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type={showConfirm ? "text" : "password"}
                    required
                    value={formData.confirm}
                    onChange={(e) => handleChange("confirm", e.target.value)}
                    placeholder="Re-enter your password"
                    className={`w-full h-[50px] pl-12 pr-12 text-gray-700 rounded-lg border outline-none transition-all
                      ${isMismatch
                        ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-400"
                        : isMatched
                          ? "border-green-400 focus:border-green-400 focus:ring-1 focus:ring-green-400"
                          : "border-gray-200 focus:border-[#A01C1C] focus:ring-1 focus:ring-[#A01C1C]"
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* Match feedback */}
                {isMatched  && <p className="text-xs text-green-600 font-medium mt-1">Password matched</p>}
                {isMismatch && <p className="text-xs text-red-500 font-medium mt-1">Passwords do not match</p>}
              </div>

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading || isMismatch}
                className="w-full h-[52px] mt-2 bg-gradient-to-b from-[#c0312a] to-[#8a1212] hover:from-[#b02a23] hover:to-[#7a0f0f] text-white font-bold text-lg rounded-lg shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Registering...
                  </>
                ) : "Register"}
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4 my-2">
                <div className="h-[1px] bg-gray-200 flex-1" />
                <span className="text-gray-400 text-sm">or register with</span>
                <div className="h-[1px] bg-gray-200 flex-1" />
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="h-[50px] border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <Image
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    width={22}
                    height={22}
                  />
                  <span className="text-sm font-medium text-gray-700">Google</span>
                </button>
                <button
                  type="button"
                  className="h-[50px] border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                >
                  <Image src="/images/apple.svg" alt="Apple" width={22} height={22} />
                  <span className="text-sm font-medium text-gray-700">Apple</span>
                </button>
              </div>

              {/* Login link */}
              <div className="text-center mt-4">
                <span className="text-gray-500 text-sm">Already have an account? </span>
                <Link href="/auth/sign-in" className="text-[#A01C1C] font-bold hover:underline">
                  Login
                </Link>
              </div>

            </form>
          </div>
        </div>

        {/* ── RIGHT — LOGO ── */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#FFF5F7] to-[#ffe4e8] items-center justify-center p-12 relative">
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-64 h-64 md:w-96 md:h-96 relative drop-shadow-2xl">
              <Image
                src="/images/logo.svg"
                alt="Logo"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="mt-8 text-2xl font-bold text-[#A01C1C] tracking-wide">
              Join the Contest Revolution
            </h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignUp;