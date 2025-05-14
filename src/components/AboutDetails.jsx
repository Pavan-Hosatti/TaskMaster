import React from 'react';
import { motion } from 'framer-motion';

const AboutDetails = ({ isOpen, onClose, darkMode }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">
            About TaskMaster
          </h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </div>
        
        {/* App logo and version */}
        <div className="flex flex-col items-center mb-6">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ type: "spring" }}
            className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg"
          >
            <span className="text-3xl">✓</span>
          </motion.div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">TaskMaster</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Version 1.0.0</p>
        </div>
        
        {/* App description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">About the App</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            TaskMaster is a modern, feature-rich task management application designed to help you stay organized and boost your productivity. With an intuitive interface and powerful features, TaskMaster makes it easy to manage your daily tasks.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Built with React and styled with Tailwind CSS, TaskMaster offers a seamless experience across devices with a responsive design and smooth animations powered by Framer Motion.
          </p>
        </div>

        {/* Add developer information */}
        <div className="mb-6 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 flex items-center">
            <span className="mr-2">👨‍💻</span> Developer
          </h3>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <span className="font-medium text-purple-600 dark:text-purple-400 w-24">Name:</span>
              <span className="text-gray-700 dark:text-gray-300">Pavan Hosatti</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-purple-600 dark:text-purple-400 w-24">Institution:</span>
              <span className="text-gray-700 dark:text-gray-300">Cambridge Institute of Technology</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-purple-600 dark:text-purple-400 w-24">Email:</span>
              <a href="mailto:pavan876p3s@gmail.com" className="text-blue-500 hover:underline">pavan876p3s@gmail.com</a>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-purple-600 dark:text-purple-400 w-24">Phone:</span>
              <a href="tel:+916363840929" className="text-blue-500 hover:underline">+91 6363840929</a>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Key Features</h3>
          <ul className="space-y-2">
            {[
              "Task organization with priority levels",
              "Dark mode support for comfortable viewing",
              "Progress tracking and insights",
              "Task filtering and sorting",
              "Animated UI for a delightful experience",
              "Local storage to save your tasks"
            ].map((feature, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start"
              >
                <span className="text-green-500 mr-2">✓</span>
                <span className="text-gray-600 dark:text-gray-300">{feature}</span>
              </motion.li>
            ))}
          </ul>
        </div>
        
        {/* Credits */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Credits</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-2">
            Developed with ❤️ by a passionate developer.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Icons and animations powered by Framer Motion and Tailwind CSS.
          </p>
        </div>
        
        {/* Contact/Share */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
            <span className="mr-2">📢</span> Share TaskMaster
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Enjoying TaskMaster? Share it with your friends and colleagues!
          </p>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 px-4 bg-blue-500 text-white rounded-lg font-medium flex items-center justify-center"
            >
              <span className="mr-2">📱</span> Share Link
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 px-4 bg-purple-500 text-white rounded-lg font-medium flex items-center justify-center"
            >
              <span className="mr-2">📧</span> Email
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutDetails;

