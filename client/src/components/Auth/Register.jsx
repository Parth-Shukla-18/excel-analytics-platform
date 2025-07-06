import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
      <div className="fixed flex h-screen w-full">
        {/* Left Panel */}
        <div className="w-1/2 bg-blue-500 text-white flex items-center justify-center p-10">
          <h2 className="text-3xl font-bold text-center">
            Excel Analytics Platform
          </h2>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-1/2 max-w-4xl p-10 bg-white flex flex-col justify-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6 justify-center">
            Register
          </h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">
                Email address
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 text-sm mb-1">
                Select Role
              </label>
              <select
                name="role"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
            >
              Register
            </button>
            <p className="text-sm text-gray-600 mt-4 text-center">
              Already register?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
  );
};

export default Register;
