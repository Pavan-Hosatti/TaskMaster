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
  
  const handleShare = (platform) => {
    let shareUrl = '';
    
    switch(platform) {
      case 'Facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}&quote=${encodeURIComponent(shareText)}`;
        break;
      case 'Twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareLink)}`;
        break;
      case 'WhatsApp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareLink)}`;
        break;
      case 'Email':
        shareUrl = `mailto:?subject=${encodeURIComponent('Check out TaskMaster!')}&body=${encodeURIComponent(shareText + ' ' + shareLink)}`;
        break;
      default:
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank');
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
        
        {/* Share options */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Share via</h3>
          <div className="grid grid-cols-4 gap-4">
            {[
              { name: 'Facebook', icon: '📘', color: 'bg-blue-600' },
              { name: 'Twitter', icon: '🐦', color: 'bg-blue-400' },
              { name: 'WhatsApp', icon: '📱', color: 'bg-green-500' }
            ].map((platform) => (
              <motion.button
                key={platform.name}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className={`${platform.color} text-white p-3 rounded-xl flex flex-col items-center justify-center`}
                onClick={() => handleShare(platform.name)}
              >
                <span className="text-2xl mb-1">{platform.icon}</span>
                <span className="text-xs">{platform.name}</span>
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* QR Code */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">QR Code</h3>
          <div className="flex justify-center">
            <div className="w-40 h-40 bg-white p-2 rounded-lg border border-gray-200 dark:border-gray-600 flex items-center justify-center">
              <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                <span className="text-gray-500 dark:text-gray-400 text-xs text-center">
                  QR Code Placeholder
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Share message */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800"
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


