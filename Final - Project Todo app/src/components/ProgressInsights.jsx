import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProgressInsights = ({ isOpen, onClose, todolist, darkMode }) => {
  if (!isOpen) return null;
  
  // Calculate real stats instead of random data
  const completionRate = todolist.length ? Math.round((todolist.filter(t => t.isComplete).length / todolist.length) * 100) : 0;
  const completedTasks = todolist.filter(t => t.isComplete).length;
  const activeTasks = todolist.filter(t => !t.isComplete).length;
  
  // Get current day and calculate stats for the last 7 days
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();
  const weekDays = Array(7).fill(0).map((_, i) => days[(today + i) % 7]);
  
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
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
            Progress Insights
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
        
        {/* Circular progress */}
        <div className="flex justify-center mb-6">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke={darkMode ? "#374151" : "#f3f4f6"} strokeWidth="10" />
              <motion.circle 
                initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - completionRate/100) }}
                transition={{ duration: 1, type: "spring" }}
                cx="50" cy="50" r="45" 
                fill="none" 
                stroke="url(#progressGradient)" 
                strokeWidth="10" 
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                transform="rotate(-90 50 50)"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </svg>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
                className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
                {completionRate}%
              </motion.div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Completion Rate
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-xl border border-purple-100 dark:border-purple-800">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Tasks Completed</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {completedTasks}
              </motion.span>
              {completedTasks > 5 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="ml-2 text-yellow-500"
                >
                  🏆
                </motion.span>
              )}
            </div>
          </motion.div>
          
          <motion.div 
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Active Tasks</div>
            <div className="text-2xl font-bold text-gray-800 dark:text-white flex items-center">
              {activeTasks}
              {activeTasks === 0 && completedTasks > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="ml-2"
                >
                  ✅
                </motion.span>
              )}
            </div>
          </motion.div>
        </div>
        
        {/* Productivity Tip */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800 mb-4"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
            <span className="mr-2">💡</span> Productivity Tip
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {completedTasks > activeTasks 
              ? "You're doing great! Try to maintain this momentum by tackling your most important tasks first thing each day."
              : "Try breaking down larger tasks into smaller, manageable chunks to make progress feel more achievable."}
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ProgressInsights;


