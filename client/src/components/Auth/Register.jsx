import React from "react";
import {
  UserIcon,
  EnvelopeIcon as MailIcon,
  PhoneIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import signup from "../../assets/signup.png";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="fixed flex flex-col md:flex-row h-screen w-full bg-white">
      {/* Gradient Section (Left side) - Hidden on mobile */}
      <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center rounded-tr-3xl rounded-br-3xl bg-gradient-to-br from-blue-500 to-purple-600 text-white p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
        <p className="text-lg mb-6">
          To keep connected with us please log in with your personal info
        </p>
        <div className="mt-6">
          <img
            src={signup}
            alt="Welcome Illustration"
            className="w-3/4 max-w-sm mx-auto"
          />
        </div>
      </div>

      {/* Create Account Section (Right side) - Full width on mobile */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-white p-8">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
          Create Account
        </h1>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Use mobile number or email for registration
        </p>
        <form className="space-y-4 w-full max-w-md">
          {/* user name */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative w-full">
              <UserIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="text-black w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="relative w-full">
              <UserIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <select className="text-gray-500 w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">Select Role</option>
                <option value="Employer">Employer</option>
                <option value="Job Seeker">Job Seeker</option>
              </select>
            </div>
          </div>

          {/* Email */}
          <div className="relative">
            <MailIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Email"
              name="email"
              className="text-black w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Password"
              name="password"
              className="text-black w-full pl-10 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg transition duration-200"
            >
              Register
            </button>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
