import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
        <h2 className="text-2xl font-semibold text-gray-700 mb-6 justify-center">Login</h2>
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
            <label className="block text-gray-600 text-sm mb-1">Password</label>
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

          <div className="mb-4 flex items-center">
            <input type="checkbox" id="adminCheck" className="mr-2" />
            <label htmlFor="adminCheck" className="text-sm text-gray-600">
              I am an Admin
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-md"
          >
            Login
          </button>

          <p className="text-sm text-gray-600 mt-4 text-center">
            New user?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
