import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ShareModal = ({ isOpen, onClose, darkMode }) => {
  const [copied, setCopied] = useState(false);
  const shareLink = "https://task-master-git-main-pavan-hosattis-projects.vercel.app/";
  const shareText = "Check out TaskMaster - the beautifully designed productivity app that's helping me stay organized! Try it now:";
  
  if (!isOpen) return null;
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'TaskMaster',
        text: shareText,
        url: shareLink,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      handleCopyLink();
      alert("Link copied to clipboard! Your browser doesn't support direct sharing.");
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 w-full max-w-md"
        onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 text-transparent bg-clip-text">
            Share TaskMaster
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
        
        {/* Share link */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Share this link with others
          </label>
          <div className="flex">
            <input 
              type="text" 
              value={shareLink} 
              readOnly
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-l-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-r-lg font-medium"
            >
              {copied ? 'Copied!' : 'Copy'}
            </motion.button>
          </div>
        </div>
        
        {/* Simple Share Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg font-medium flex items-center justify-center"
        >
          <span className="mr-2">🔗</span>
          Share TaskMaster
        </motion.button>
        
        {/* Share message */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 mt-6"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center">
            <span className="mr-2">💬</span> Suggested Message
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-300 italic">
            "Check out TaskMaster, the productivity app that's helping me stay organized! It's beautifully designed and super easy to use."
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ShareModal;



