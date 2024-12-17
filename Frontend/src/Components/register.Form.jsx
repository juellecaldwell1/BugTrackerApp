import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";

const RegisterForm = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [postedData, setPostedData] = useState({
    familyName: "",
    givenName: "",
    email: "",
    password: "",
    fullName: "",
    role: "Developer",
  });
  const [error, setError] = useState("");

  const PostData = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/api/user/register`,
        postedData
      );
      console.log(response.data);
      if (response.status === 200) {
        toast.success("You have now made an account You may now go back to the login page");
        console.log(
          "You have successfully register a new account Welcome: " +
            response.data.id
        );
        setPostedData({
          familyName: "",
          givenName: "",
          email: "",
          password: "",
          fullName: "",
        })
      }
    } catch (error) {
      console.error(error.message);
      if (error.response) {
        toast.error(error.response.data.error);
        setError(error.response.data.error);
      } else if (error.request) {
        toast.error("Error:", error.request);
        console.error("Error:", error.request);
      } else {
        toast.error("Error:", error.message);
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-purple-500 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Create an Account
        </h1>
        <div className="grid grid-cols-1 gap-4">
          {/* Family Name */}
          <div>
            <label htmlFor="familyName" className="text-sm font-semibold text-gray-600">
              Family Name
            </label>
            <input
              type="text"
              id="familyName"
              placeholder="Family name"
              value={postedData.familyName}
              onChange={(e) =>
                setPostedData((prev) => ({ ...prev, familyName: e.target.value }))
              }
              className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>
          {/* Given Name */}
          <div>
            <label htmlFor="givenName" className="text-sm font-semibold text-gray-600">
              Given Name
            </label>
            <input
              type="text"
              id="givenName"
              placeholder="Given name"
              value={postedData.givenName}
              onChange={(e) =>
                setPostedData((prev) => ({ ...prev, givenName: e.target.value }))
              }
              className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="text-sm font-semibold text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              placeholder="Full name"
              value={postedData.fullName}
              onChange={(e) =>
                setPostedData((prev) => ({ ...prev, fullName: e.target.value }))
              }
              className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>
          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              value={postedData.email}
              onChange={(e) =>
                setPostedData((prev) => ({ ...prev, email: e.target.value }))
              }
              className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={postedData.password}
              onChange={(e) =>
                setPostedData((prev) => ({ ...prev, password: e.target.value }))
              }
              className="w-full p-3 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              required
            />
          </div>
        </div>
        {/* Agree to Terms */}
        <div className="mt-4 flex items-center">
          <input
            type="checkbox"
            id="agreeTerms"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            required
          />
          <label htmlFor="agreeTerms" className="ml-2 text-sm text-gray-600">
            I agree to the terms and conditions
          </label>
        </div>
        {/* Buttons */}
        <div className="mt-6 space-y-4">
          <button
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition duration-300"
            onClick={PostData}
          >
            Register Now
          </button>
          <Link to="/user/login">
            <button className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-300 transition duration-300">
              Go Back
            </button>
          </Link>
        </div>
        {/* Error Message */}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterForm;
