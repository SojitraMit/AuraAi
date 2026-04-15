import React, { useState } from "react";
import Template from "../components/Template";
import { useLogin, useSignUp } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Cookies from "js-cookie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isSignup, setIsSignup] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const loginMutation = useLogin();
  const signUpMutation = useSignUp();
  const isPending = loginMutation.isPending || signUpMutation.isPending;

  const handleSignUp = (event) => {
    event.preventDefault();
    if (isSignup && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate loading for 2 seconds
    signUpMutation.mutate(
      { email, password },
      {
        onError: (error) => {
          setTimeout(() => {
            setError(
              error.response?.data?.detail ||
                error.response?.data?.message ||
                "Signup failed. Please try again.",
            );
          }, 1400);
        },
        onSuccess: (data) => {
          Cookies.set("token", data.access_token, { expires: 7 }); // expires in 7 days
          dispatch(addUser(data.user));
          navigate("/");
        },
      },
    );
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate loading for 2 seconds

    loginMutation.mutate(
      { email, password },
      {
        onError: (error) => {
          setTimeout(() => {
            const detail = error.response?.data?.detail;
            // console.error(detail);

            if (Array.isArray(detail)) {
              // FastAPI validation errors — extract the messages
              setError(detail.map((d) => d.msg).join(", "));
            } else if (typeof detail === "string") {
              setIsLoading(false);
              setError(detail);
            } else {
              setError("Login failed. Please try again.");
            }
          }, 1800); // Simulate loading for 2 seconds
        },
        onSuccess: (data) => {
          Cookies.set("token", data.access_token, { expires: 7 }); // expires in 7 days
          dispatch(addUser(data.user));
          navigate("/");
        },
      },
    );
  };

  return (
    <main className="flex min-h-screen w-full flex-col md:flex-row bg-[#12121d] text-white overflow-y-auto">
      {/* LEFT SECTION */}
      <Template />
      <section className="  hidden md:flex w-[45%] flex-col justify-between p-12 bg-[#0d0d18]"></section>

      {/* RIGHT SECTION */}
      <section className="flex w-full md:w-1/2 items-center justify-center p-6 overflow-y-auto">
        <div className="w-full  max-w-md">
          <div className="bg-[#1B1A26] p-8   rounded-2xl shadow-2xl">
            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold">
                {isSignup ? "Create account" : "Welcome back"}
              </h2>

              <p className="text-gray-400 mt-2">
                {isSignup
                  ? "Join our platform and get started"
                  : "Enter your credentials to access your workspace"}
              </p>
            </div>

            <form
              className="space-y-6"
              onSubmit={isSignup ? handleSignUp : handleLogin}>
              {/* Email */}
              <div>
                <label className="text-xs uppercase text-gray-400 tracking-widest text-on-surface-variant/80 font-bold">
                  Email Address
                </label>

                <div className="relative mt-2">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    alternate_email
                  </span>

                  <input
                    type="email"
                    placeholder="name@company.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2a2935] focus:ring-2 focus:ring-purple-500 outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between">
                  <label
                    className="text-xs font-bold uppercase text-gray-400 tracking-widest text-on-surface-variant/80"
                    htmlFor="password">
                    Password
                  </label>
                  <span className="text-xs text-purple-400 cursor-pointer">
                    Forgot password?
                  </span>
                </div>

                <div className="relative mt-2">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    lock
                  </span>

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#2a2935] focus:ring-2 focus:ring-purple-500 outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {isSignup && (
                <div>
                  <label className="text-xs uppercase text-gray-400">
                    Confirm Password
                  </label>

                  <div className="relative mt-2">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                      verified_user
                    </span>

                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#2a2935] focus:ring-2 focus:ring-purple-500 outline-none"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Remember */}
              {isSignup ? (
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 w-4 h-4 rounded bg-[#2a2935]"
                  />

                  <label className="text-sm text-gray-400">
                    I agree to the{" "}
                    <span className="text-purple-400 cursor-pointer">
                      Terms of Service
                    </span>{" "}
                    and{" "}
                    <span className="text-purple-400 cursor-pointer">
                      Privacy Policy
                    </span>
                  </label>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-sm text-gray-400">
                    Remember this device
                  </span>
                </div>
              )}

              {/* Button */}

              {/* ERROR (only once) */}
              {error && (
                <div className="text-red-500 text-sm mb-3">{error}</div>
              )}

              {isSignup ? (
                <button
                  type="submit"
                  disabled={isPending || isLoading}
                  className="w-full h-[56px] rounded-xl bg-gradient-to-br from-purple-700 to-purple-950 font-bold text-white shadow-lg shadow-purple-700/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center relative overflow-hidden disabled:opacity-70">
                  {/* TEXT */}
                  <span
                    className={`flex items-center gap-2 transition-all duration-200 ${
                      isPending || isLoading
                        ? "opacity-0 scale-95"
                        : "opacity-100"
                    }`}>
                    Get started
                    <span className="material-symbols-outlined text-lg">
                      arrow_forward
                    </span>
                  </span>

                  {/* LOTTIE */}
                  {(isPending || isLoading) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <DotLottieReact
                        src="https://lottie.host/12991057-9077-404d-816c-e93f2787a942/sHUbqllBWt.lottie"
                        loop
                        autoplay
                        className="w-32 h-32"
                      />
                    </div>
                  )}
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full h-[56px] rounded-xl bg-gradient-to-br from-purple-700 to-purple-950 font-bold text-white shadow-lg shadow-purple-700/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center relative overflow-hidden disabled:opacity-70">
                  {isPending || isLoading ? (
                    <DotLottieReact
                      src="https://lottie.host/12991057-9077-404d-816c-e93f2787a942/sHUbqllBWt.lottie"
                      loop
                      autoplay
                      className="w-32 h-32"
                    />
                  ) : (
                    "Sign in"
                  )}
                </button>
              )}
            </form>

            {/* Divider */}
            <div className="my-8 flex items-center gap-4">
              <div className="h-[1px] flex-1 bg-white/5"></div>
              <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest text-on-surface-variant/40">
                or continue with
              </span>
              <div className="h-[1px] flex-1 bg-white/5"></div>
            </div>

            {/* Social */}
            <div className="grid grid-cols-2 gap-4">
              <button className="bg-[#2a2935] py-2 rounded-xl flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">language</span>
                Google
              </button>
              <button className="bg-[#2a2935] py-2 rounded-xl flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">terminal</span>
                Github
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-6">
            {isSignup ? "Already have an account?" : "Don’t have an account?"}{" "}
            <span
              className="text-purple-400 cursor-pointer"
              onClick={() => setIsSignup(!isSignup)}>
              {isSignup ? "Login" : "Create one"}
            </span>
          </p>
        </div>
      </section>
    </main>
  );
};

export default Login;
