import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bounce, toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import LoggedInRightNow from './whosLoggedIn.jsx';
import { motion } from 'framer-motion';
import axios from 'axios';

const LoginForm = ({ passTheUserInfo }) => {

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {getMe} = LoggedInRightNow();
  const navigate = useNavigate();

  const handleLogin = () => {
    window.location.href = "/user/list"; 
    toast('"Login successful. You can view your role permissions in the navigation bar."', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    });
  
  };

  const postLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.post(`${apiUrl}/api/user/login`, loginInfo, {
        withCredentials: true,
      });
  
      if (response.status === 200) {
        handleLogin();
      }
    } catch (error) {
      console.error(error.message);
      if (error.response) {
        setError(error.response.data.error);
      } else if (error.request) {
        setError('No response received from the server');
      } else {
        setError('There was a server error');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-300 to-purple-500 p-4">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="backdrop-blur-lg bg-white/80 shadow-xl rounded-lg p-6">
          <h2 className="text-2xl font-bold text-center">Welcome back </h2>
          <p className="text-center text-gray-600">Enter your credentials to access your account</p>
          <div className="space-y-4 mt-6">
            <div className="space-y-2">
              <label htmlFor="email" className="block font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                placeholder="email@example.com"
                value={loginInfo.email}
                onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={loginInfo.password}
                  onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="form-checkbox rounded text-purple-500 focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="remember-me" className="text-gray-700">Remember me</label>
            </div>
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-red-500"
              >
                {error}
              </motion.p>
            )}
          </div>
          <div className="mt-6 space-y-4">
            <button
              className="w-full px-4 py-2 font-bold text-white bg-purple-500 rounded-md shadow-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
              onClick={postLogin}
              disabled={isLoading}
            >
              {isLoading ? 'Please wait...' : 'Sign In'}
            </button>
            <p className="text-sm text-center text-gray-600">
              Don't have an account?{' '}
              <a
                href="/user/register"
                className="text-purple-600 hover:underline"
              >
                Register Now
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginForm;
