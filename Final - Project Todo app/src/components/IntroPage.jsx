import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const IntroPage = ({ onEnter }) => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 flex flex-col items-center justify-center text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white opacity-10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50],
              x: [0, Math.random() * 100 - 50],
              scale: [1, Math.random() + 0.5],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>
      
      {loading ? (
        // Enhanced loading animation
        <div className="flex flex-col items-center z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl font-extrabold mb-8 tracking-tight"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            TaskMaster
          </motion.div>
          
          <motion.div 
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="w-20 h-20 border-4 border-white border-t-transparent rounded-full"
          />
        </div>
      ) : (
        // Enhanced intro content
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center px-6 max-w-lg z-10"
        >
          <motion.div
            initial={{ y: -30 }}
            animate={{ y: 0 }}
            transition={{ 
              duration: 0.8,
              type: "spring",
              stiffness: 200
            }}
          >
            <h1 
              className="text-6xl font-extrabold mb-3 tracking-tight"
              style={{ fontFamily: "'Poppins', sans-serif", textShadow: "0 2px 10px rgba(0,0,0,0.2)" }}
            >
              TaskMaster
            </h1>
            <p className="text-2xl mb-10 opacity-90 font-light">Your ultimate productivity companion</p>
          </motion.div>
          
          <motion.div 
            className="space-y-6 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            {/* Feature highlights with cooler animations */}
            {[
              { icon: "✨", text: "Supercharge your productivity with style" },
              { icon: "🎯", text: "Set priorities and crush your goals" },
              { icon: "🌙", text: "Personalized themes and dark mode" }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                className="flex items-center bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4"
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + (index * 0.2) }}
                whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.3)" }}
              >
                <span className="text-4xl mr-4">{feature.icon}</span>
                <p className="text-left text-lg font-medium">{feature.text}</p>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.button
            onClick={onEnter}
            className="bg-white text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500 font-bold py-4 px-10 rounded-full text-xl shadow-xl border-2 border-white"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Get Started
          </motion.button>
          
          <motion.p 
            className="mt-8 text-sm opacity-80 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.9 }}
          >
            Created by Pavan Hosatti
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default IntroPage;


