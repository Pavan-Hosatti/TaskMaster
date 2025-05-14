import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PriorityFilter = ({ isOpen, onClose, todolist, darkMode }) => {
  const [selectedPriority, setSelectedPriority] = useState('all');
  
  if (!isOpen) return null;
  
  // Filter tasks by priority
  const filteredTasks = selectedPriority === 'all' 
    ? todolist 
    : todolist.filter(task => task.priority === selectedPriority);
  
  // Count tasks by priority
  const highPriorityCount = todolist.filter(task => task.priority === 'high').length;
  const normalPriorityCount = todolist.filter(task => task.priority === 'normal').length;
  const lowPriorityCount = todolist.filter(task => task.priority === 'low').length;
  
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
          <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 text-transparent bg-clip-text">
            Priority Focus
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
        
        {/* Priority distribution */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Priority Distribution</h3>
          <div className="bg-white dark:bg-gray-700 rounded-xl p-4 border border-gray-100 dark:border-gray-600">
            <div className="flex h-8 rounded-lg overflow-hidden mb-2">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(highPriorityCount / todolist.length) * 100}%` }}
                transition={{ duration: 0.8 }}
                className="bg-red-500 h-full"
              ></motion.div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(normalPriorityCount / todolist.length) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-green-500 h-full"
              ></motion.div>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(lowPriorityCount / todolist.length) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-blue-500 h-full"
              ></motion.div>
            </div>
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-300">
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-red-500 mr-1"></span>
                <span>High ({highPriorityCount})</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-1"></span>
                <span>Normal ({normalPriorityCount})</span>
              </div>
              <div className="flex items-center">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-1"></span>
                <span>Low ({lowPriorityCount})</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Priority filter buttons */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Filter by Priority</h3>
          <div className="flex space-x-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPriority('all')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                selectedPriority === 'all' 
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              All Tasks
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPriority('high')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                selectedPriority === 'high' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              🔴 High
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPriority('normal')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                selectedPriority === 'normal' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              🟢 Normal
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPriority('low')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${
                selectedPriority === 'low' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              🔵 Low
            </motion.button>
          </div>
        </div>
        
        {/* Filtered tasks */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
            {selectedPriority === 'all' ? 'All Tasks' : `${selectedPriority.charAt(0).toUpperCase() + selectedPriority.slice(1)} Priority Tasks`}
          </h3>
          <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task, index) => (
                <motion.div 
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-3 rounded-lg border ${
                    task.priority === 'high' ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' :
                    task.priority === 'normal' ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20' :
                    'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'normal' ? 'bg-green-500' :
                      'bg-blue-500'
                    }`}></div>
                    <span className={`${task.isComplete ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                      {task.text}
                    </span>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                No tasks with {selectedPriority} priority found
              </div>
            )}
          </div>
        </div>
        
        {/* Tips */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-4 rounded-xl border border-orange-100 dark:border-orange-800"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
            <span className="mr-2">💡</span> Priority Tips
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {selectedPriority === 'high' 
              ? "Focus on high priority tasks first to make significant progress on important goals."
              : selectedPriority === 'normal'
                ? "Normal priority tasks create the foundation for your daily productivity."
                : selectedPriority === 'low'
                  ? "Low priority tasks can be handled when you have extra time or batched together."
                  : "Organize your tasks by priority to work more effectively and reduce stress."
            }
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PriorityFilter;
