"use client";
import React, { useState } from "react";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};

    // Name validation (only for signup)
    if (!isLogin) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      } else if (formData.name.length < 2) {
        newErrors.name = "Name must be at least 2 characters";
      }
    }

    // Email validation (required for both login and signup)
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // Confirm password validation (only for signup)
    if (!isLogin) {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (isLogin) {
        console.log("Login attempt:", {
          email: formData.email,
          password: formData.password,
        });
        // Handle login logic here
        alert("Login successful!");
      } else {
        console.log("Signup attempt:", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        // Handle signup logic here
        alert("Account created successfully!");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle between login and signup
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-2">
          <h1 className="text-4xl font-bold text-base-content mb-2">StackIt</h1>
          <p className="text-base-content/70">
            {isLogin ? "Welcome back!" : "Create your account"}
          </p>
        </div>

        {/* Main Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-6 sm:p-6">
            {/* Toggle Tabs */}
            <div className="tabs tabs-boxed mb-6">
              <button
                className={`tab tab-lg flex-1 ${
                  isLogin
                    ? "border-b-2 border-blue-500 font-bold !text-blue-600"
                    : ""
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>
              <button
                className={`tab tab-lg flex-1 ${
                  !isLogin
                    ? "border-b-2 border-blue-500 font-bold !text-blue-600"
                    : ""
                }`}
                onClick={() => setIsLogin(false)}
              >
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Field (Signup only) */}
              {!isLogin && (
                <div className="form-control">
                  <label className="label mb-2">
                    <span className="label-text font-medium">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className={`input input-bordered w-full ${
                      errors.name ? "input-error" : ""
                    }`}
                  />
                  {errors.name && (
                    <label className="label mb-2">
                      <span className="label-text-alt text-error">
                        {errors.name}
                      </span>
                    </label>
                  )}
                </div>
              )}

              {/* Email Field (Required for both login and signup) */}
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={`input input-bordered w-full ${
                    errors.email ? "input-error" : ""
                  }`}
                />
                {errors.email && (
                  <label className="label mb-2">
                    <span className="label-text-alt text-error">
                      {errors.email}
                    </span>
                  </label>
                )}
              </div>

              {/* Password Field */}
              <div className="form-control">
                <label className="label mb-2">
                  <span className="label-text font-medium">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={`input input-bordered w-full ${
                    errors.password ? "input-error" : ""
                  }`}
                />
                {errors.password && (
                  <label className="label mb-2">
                    <span className="label-text-alt text-error">
                      {errors.password}
                    </span>
                  </label>
                )}
              </div>

              {/* Confirm Password Field (Signup only) */}
              {!isLogin && (
                <div className="form-control">
                  <label className="label mb-2">
                    <span className="label-text font-medium">
                      Confirm Password
                    </span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className={`input input-bordered w-full ${
                      errors.confirmPassword ? "input-error" : ""
                    }`}
                  />
                  {errors.confirmPassword && (
                    <label className="label mb-2">
                      <span className="label-text-alt text-error">
                        {errors.confirmPassword}
                      </span>
                    </label>
                  )}
                </div>
              )}

              {/* Forgot Password Link (Login only) */}
              {isLogin && (
                <div className="text-right">
                  <button type="button" className="link link-primary text-sm">
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button */}
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className={`btn btn-primary w-full ${
                    isLoading ? "loading" : ""
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                  ) : isLogin ? (
                    "Login"
                  ) : (
                    "Create Account"
                  )}
                </button>
              </div>
            </form>

            {/* Toggle Mode */}
            <div className="text-center mt-6">
              <p className="text-base-content/70">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleMode}
                  className="link link-primary ml-1"
                >
                  {isLogin ? "Sign up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-base-content/50">
          <p>
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
