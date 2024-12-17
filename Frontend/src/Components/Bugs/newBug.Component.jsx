import { motion } from 'framer-motion';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import axios from 'axios';
import { Bounce, ToastContainer, toast } from 'react-toastify';

const NewBug = () => {
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL;
  const [error, setError] = useState('');
  const [bugInfo, setBugInfo] = useState({
    title: '',
    description: '',
    stepsToReproduce: '',
  });

  const PostNewBug = async () => {
    try {
      const response = await axios.post(`${apiUrl}/api/bug/new`, bugInfo, {
        withCredentials: true,
      });
      if (response.status === 200) {
        toast.success('Bug successfully reported!', { position: "top-center" });
        setBugInfo({ title: '', description: '', stepsToReproduce: '' });
        setError('');
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error, { position:"top-center" });
        setError(err.response.data.error);
      } else {
        toast.error('An unexpected error occurred.', { position: "top-center" });
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6 t0-gray-800">
      <motion.div
        className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Decorative Circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-pink-400 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full blur-3xl opacity-30"></div>

        <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
          Report a Bug
        </h2>
        <form className="space-y-6">
          <div className="relative">
            <motion.input
              type="text"
              id="title"
              name="title"
              value={bugInfo.title}
              onChange={(e) => setBugInfo({ ...bugInfo, title: e.target.value })}
              className="peer w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-500 placeholder-transparent"
              placeholder="Enter bug title"
              required
              whileFocus={{ scale: 1.02 }}
            />
            <label
              htmlFor="title"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Bug Title
            </label>
          </div>

          <div className="relative">
            <motion.textarea
              id="description"
              name="description"
              value={bugInfo.description}
              onChange={(e) => setBugInfo({ ...bugInfo, description: e.target.value })}
              className="peer w-full h-24 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-500 resize-none placeholder-transparent"
              placeholder="Describe the bug"
              required
              whileFocus={{ scale: 1.02 }}
            ></motion.textarea>
            <label
              htmlFor="description"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Bug Description
            </label>
          </div>

          <div className="relative">
            <motion.textarea
              id="stepsToReproduce"
              name="stepsToReproduce"
              value={bugInfo.stepsToReproduce}
              onChange={(e) => setBugInfo({ ...bugInfo, stepsToReproduce: e.target.value })}
              className="peer w-full h-24 border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:border-purple-500 resize-none placeholder-transparent"
              placeholder="Steps to reproduce the bug"
              required
              whileFocus={{ scale: 1.02 }}
            ></motion.textarea>
            <label
              htmlFor="stepsToReproduce"
              className="absolute left-0 -top-3.5 text-gray-600 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
            >
              Steps to Reproduce
            </label>
          </div>

          <motion.button
            type="button"
            className="w-full bg-gradient-to-r from-gray-500 via-purple-500 to-gray-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
            onClick={()=>{
              PostNewBug()
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Submit Bug Report
          </motion.button>
        </form>
        {error && <p className="mt-4 text-red-500">{error}</p>}

        <ToastContainer transition={Bounce} />
      </motion.div>
    </div>
  );
};

export default NewBug;
