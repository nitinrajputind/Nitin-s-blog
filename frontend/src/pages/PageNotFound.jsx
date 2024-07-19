// src/NotFound.js
import { motion } from "framer-motion";

export const PageNotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 15 }}
          className="absolute w-1/2 h-1/2 bg-white opacity-20 rounded-full"
        ></motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center p-10 bg-opacity-70 bg-black rounded-lg shadow-lg max-w-md w-full"
      >
        <h1 className="text-8xl font-extrabold mb-4">404</h1>
        <p className="text-2xl mb-6">Oops! Page Not Found</p>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 8 }}
          className="mt-6 mb-8"
        >
          <svg
            className="w-16 h-16 mx-auto text-blue-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6 1.5A9.5 9.5 0 1112 2.5m6 1.5a9.5 9.5 0 11-6 6m0 0h.01"
            />
          </svg>
        </motion.div>
        <a
          href="/"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg"
        >
          Go back to Home
        </a>
      </motion.div>
    </div>
  );
};
