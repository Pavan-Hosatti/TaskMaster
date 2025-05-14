import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TodoItems = ({
  text, 
  description,
  id, 
  isComplete, 
  deleteTodo, 
  toggle, 
  date, 
  dueDate,
  priority = 'normal',
  changePriority,
  isEditing,
  editText,
  setEditText,
  startEditing,
  saveEdit,
  handleEditKeyPress,
  editInputRef,
  mood = '😊'
}) => {
  const [expanded, setExpanded] = useState(false);
  
  // Completely revise the priority colors for better contrast in light mode
  const priorityColors = {
    low: "border-blue-300 dark:border-blue-800 bg-white dark:bg-blue-900/20 text-gray-800 dark:text-blue-100",
    normal: "border-green-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100",
    high: "border-red-300 dark:border-red-800 bg-white dark:bg-red-900/20 text-gray-800 dark:text-red-100"
  };

  // Simplified due date display
  const formatDueDate = () => {
    if (!dueDate) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return <span className="text-red-500 font-medium">Overdue</span>;
    if (diffDays === 0) return <span className="text-orange-500 font-medium">Due Today</span>;
    if (diffDays === 1) return <span className="text-orange-400 font-medium">Due Tomorrow</span>;
    
    
    return <span className="text-gray-500">Due: {new Date(dueDate).toLocaleDateString()}</span>;
  };
  
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className={`flex flex-col p-4 my-2 rounded-xl shadow-sm transition-all border w-full ${priorityColors[priority]}`}
    >
      {isEditing === id ? (
        <div className="flex items-center w-full">
          <input
            type="text"
            ref={editInputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyPress={handleEditKeyPress}
            className="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg mr-2 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => saveEdit(id)}
            className="p-2 bg-green-500 text-white rounded-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </motion.button>
        </div>
      ) : (
        <>
          <div className="flex items-center">
            <div onClick={()=>{toggle(id)}} className='flex flex-1 items-center cursor-pointer'>
              <motion.div 
                whileTap={{ scale: 0.9 }}
                className='w-6 h-6 flex items-center justify-center'
                initial={false}
                animate={isComplete ? { rotate: [0, 360], scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.5 }}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${isComplete 
                    ? 'border-green-500 bg-green-500' 
                    : 'border-gray-300 dark:border-gray-600'}`}
                >
                  {isComplete && (
                    <motion.svg 
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-3 h-3 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </motion.svg>
                  )}
                </div>
              </motion.div>
              <div className="ml-3 flex-1">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <motion.span 
                      className="mr-2 text-xl"
                      whileHover={{ scale: 1.3, rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 0.5 }}
                    >
                      {mood}
                    </motion.span>
                    <p 
                      className={`${isComplete ? "line-through text-gray-500 dark:text-gray-400": ""} text-base sm:text-lg font-medium`}
                      onClick={() => description && setExpanded(!expanded)}
                    >
                      {text}
                    </p>
                  </div>
                  {priority === 'high' && (
                    <span className="ml-2 px-2 py-0.5 bg-red-200 dark:bg-red-900/50 text-red-800 dark:text-red-300 text-xs rounded-full font-medium border border-red-300 dark:border-red-800">
                      Priority
                    </span>
                  )}
                  {priority === 'normal' && (
                    <span className="ml-2 px-2 py-0.5 bg-green-200 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-xs rounded-full font-medium border border-green-300 dark:border-green-800">
                      Normal
                    </span>
                  )}
                  {priority === 'low' && (
                    <span className="ml-2 px-2 py-0.5 bg-blue-200 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 text-xs rounded-full font-medium border border-blue-300 dark:border-blue-800">
                      Low
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-1 text-xs">
                  {dueDate && (
                    <div className="text-xs font-medium">
                      {formatDueDate()}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                whileTap={{ scale: 0.9 }}
                onClick={() => !isComplete && startEditing(id, text)}
                className={`mr-2 text-xs p-1.5 rounded ${isComplete ? 'text-gray-400 cursor-not-allowed' : 'text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20'}`}
                disabled={isComplete}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.2, rotate: 10, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.stopPropagation();
                  deleteTodo(id);
                }}
                className='w-8 h-8 flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-full transition-colors'
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </motion.button>
            </div>
          </div>
          
          {/* Enhanced description section with better styling */}
          {description && (
            <AnimatePresence>
              {expanded && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-3 pl-9 text-sm text-gray-600 dark:text-gray-300 overflow-hidden bg-pinki-50 dark:bg-gray-700/30 p-3 rounded-lg"
                >
                  {description}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </>
      )}
    </motion.div>
  );
};

export default TodoItems
