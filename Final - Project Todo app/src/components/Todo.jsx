import React, { useState, useEffect } from 'react';
import TodoItems from './TodoItems';
import ProgressInsights from './ProgressInsights';
import PriorityFilter from './PriorityFilter';
import AboutDetails from './AboutDetails';
import ShareModal from './ShareModal';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const Todo = () => {
  const [todolist, settodolist] = useState(
    localStorage.getItem("todos") ? JSON.parse(localStorage.getItem("todos")) : []
  );
  const [showAddTask, setShowAddTask] = useState(false);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("normal");
  const [mood, setMood] = useState("😊");
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [showCelebration, setShowCelebration] = useState(false);
  const [completedTaskText, setCompletedTaskText] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  
  // Add new states for feature interactions
  const [showProgressDetails, setShowProgressDetails] = useState(false);
  const [showMoodGame, setShowMoodGame] = useState(false);
  const [showPriorityFilter, setShowPriorityFilter] = useState(false);
  const [showCelebrationCards, setShowCelebrationCards] = useState(false);
  const [showAboutDetails, setShowAboutDetails] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Add this state for celebration cards
  const [scratchedCards, setScratchedCards] = useState([]);
  const [revealedRewards, setRevealedRewards] = useState({});
  const [isScratching, setIsScratching] = useState(false);

  // Improved celebration card rewards
  const cardRewards = [
    { emoji: "🌟", title: "Star Power", description: "You're shining bright today! +5 to motivation." },
    { emoji: "🔥", title: "On Fire", description: "You're on a productivity streak! +8 to efficiency." },
    { emoji: "💎", title: "Gem Finder", description: "You discovered a productivity gem! +10 to focus." },
    { emoji: "🚀", title: "Rocket Boost", description: "Blast through your tasks! +12 to speed." },
    { emoji: "🧠", title: "Brain Power", description: "Mind power activated! +15 to concentration." },
    { emoji: "🏆", title: "Champion", description: "You're a productivity champion! +20 to achievement." }
  ];

  // Function to scratch a card with improved logic
  const scratchCard = (cardIndex) => {
    if (scratchedCards.includes(cardIndex) || isScratching) return;
    
    setIsScratching(true);
    
    // Animation timing
    setTimeout(() => {
      // Select a random reward, but ensure variety
      let availableRewards = cardRewards.filter(reward => 
        !Object.values(revealedRewards).some(r => r.title === reward.title)
      );
      
      // If all rewards have been used, reset
      if (availableRewards.length === 0) {
        availableRewards = cardRewards;
      }
      
      const randomReward = availableRewards[Math.floor(Math.random() * availableRewards.length)];
      
      // Update state
      setScratchedCards([...scratchedCards, cardIndex]);
      setRevealedRewards({...revealedRewards, [cardIndex]: randomReward});
      setIsScratching(false);
      
      // Save to localStorage
      const savedRewards = JSON.parse(localStorage.getItem('scratchedRewards') || '{}');
      savedRewards[cardIndex] = randomReward;
      localStorage.setItem('scratchedRewards', JSON.stringify(savedRewards));
      
      // Trigger confetti for celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 800);
  };

  // Add this component for the Celebration Cards modal
  const CelebrationCardsModal = () => {
    if (!showCelebrationCards) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={() => setShowCelebrationCards(false)}
      >
        <motion.div 
          initial={{ scale: 0.8, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 20 }}
          className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-md w-full"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-transparent bg-clip-text">
              Celebration Cards
            </h2>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowCelebrationCards(false)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Congratulations on your progress! Scratch these cards to reveal special rewards and motivational boosts.
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            {[0, 1, 2, 3].map((cardIndex) => (
              <motion.div
                key={cardIndex}
                className={`relative h-40 rounded-xl overflow-hidden cursor-pointer border-2 ${
                  scratchedCards.includes(cardIndex) 
                    ? "border-green-400 dark:border-green-600" 
                    : "border-yellow-200 dark:border-yellow-700"
                }`}
                onClick={() => scratchCard(cardIndex)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {scratchedCards.includes(cardIndex) ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 flex flex-col items-center justify-center p-4 text-white"
                  >
                    <motion.div 
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                      className="text-4xl mb-2"
                    >
                      {revealedRewards[cardIndex]?.emoji}
                    </motion.div>
                    <h3 className="font-bold text-lg mb-1">{revealedRewards[cardIndex]?.title}</h3>
                    <p className="text-xs text-center">{revealedRewards[cardIndex]?.description}</p>
                  </motion.div>
                ) : (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-amber-500 flex items-center justify-center">
                      {isScratching ? (
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="text-4xl"
                        >
                          ✨
                        </motion.div>
                      ) : (
                        <motion.div 
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                          className="text-center"
                        >
                          <div className="text-4xl mb-2">❓</div>
                          <div className="text-sm font-bold text-white">Scratch Me!</div>
                        </motion.div>
                      )}
                    </div>
                    <motion.div 
                      className="absolute inset-0 bg-contain bg-center bg-no-repeat opacity-30"
                      style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTIxLDEyLjlWMTVIMTVWMTJIMTdWMTAuOUMxNyw4LjcgMTUuNCw3IDEzLjIsN0g5LjhDNy42LDcgNiw4LjcgNiwxMC45VjEySDE1VjE1SDlWMTIuOUg4VjE1SDNWMTIuOUg0VjEwLjlDNCw3LjYgNi42LDUgOS44LDVIMTMuMkMxNi40LDUgMTksNy42IDE5LDEwLjlIMjFaIiBmaWxsPSIjZmZmZmZmIi8+PC9zdmc+')" }}
                    />
                  </>
                )}
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Complete more tasks to unlock additional cards!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCelebrationCards(false)}
              className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-medium"
            >
              Back to Tasks
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    );
  };

  // Add this function to get random celebration messages
  const getRandomMessage = () => {
    const messages = [
      "Great job completing your task!",
      "You're making excellent progress!",
      "One step closer to your goals!",
      "Keep up the amazing work!",
      "You're on a productivity streak!"
    ];
    return messages[Math.floor(Math.random() * messages.length)];
  };
  
  const editInputRef = React.useRef(null);
  
  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);
  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todolist));
  }, [todolist]);
  
  const addTodo = () => {
    if (text.trim() !== "") {
      const newTodo = {
        id: Date.now(),
        text: text,
        description: description,
        isComplete: false,
        dueDate: dueDate,
        priority: priority,
        mood: mood
      };
      settodolist([...todolist, newTodo]);
      setText("");
      setDescription("");
      setDueDate("");
      setPriority("normal");
      setMood("😊");
      setShowAddTask(false);
    }
  };
  
  const deleteTodo = (id) => {
    settodolist(todolist.filter(item => item.id !== id));
  };
  
  const toggle = (id) => {
    const task = todolist.find(item => item.id === id);
    if (task && !task.isComplete) {
      setCompletedTaskText(task.text);
      settodolist(todolist.map(item => 
        item.id === id ? {...item, isComplete: true} : item
      ));
      setTimeout(() => {
        setShowCelebration(true);
        triggerConfetti();
      }, 300);
    } else {
      settodolist(todolist.map(item => 
        item.id === id ? {...item, isComplete: false} : item
      ));
    }
  };
  
  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };
  
  const startEditing = (id, currentText) => {
    setIsEditing(id);
    setEditText(currentText);
  };
  
  const saveEdit = () => {
    if (editText.trim() !== "") {
      settodolist(todolist.map(item => 
        item.id === isEditing ? {...item, text: editText} : item
      ));
      setIsEditing(null);
    }
  };
  
  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveEdit();
    }
  };
  
  const changePriority = (id, newPriority) => {
    settodolist(todolist.map(item => 
      item.id === id ? {...item, priority: newPriority} : item
    ));
  };
  
  const filteredTodos = todolist.filter(item => {
    if (filter === "active") return !item.isComplete;
    if (filter === "completed") return item.isComplete;
    return true;
  });
  
  const moods = ["😊", "😎", "🤔", "😫", "😡", "🥳", "😴"];

  // Add these states for the rating feature
  const [selectedRating, setSelectedRating] = useState(0);
  const [ratingFeedback, setRatingFeedback] = useState("");
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} 
        w-full max-w-md
        h-[100vh] 
        flex flex-col 
        p-5
        rounded-xl shadow-xl 
        relative
        overflow-hidden
        mx-auto
        sm:w-[90%] sm:h-[85vh] sm:rounded-xl
        md:max-w-md
        fixed inset-0 sm:relative sm:inset-auto`}
    >
      {/* Header with hamburger menu */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text">TaskMaster</h1>
        <div className="flex items-center">
          {/* Dark mode toggle button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </motion.button>
          
          {/* Hamburger menu button */}
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowMenu(!showMenu)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </motion.button>
        </div>
      </div>

      {/* Add this right after your header section */}
      {/* <div className="flex justify-end mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowShareModal(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md flex items-center"
        >
          <span className="mr-2">🔗</span> Share
        </motion.button>
      </div> */}
      
      {/* Add Task Button - Enhanced with better contrast */}
      {!showAddTask ? (
        <motion.button 
          whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddTask(true)}
          className="mb-6 p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg flex items-center justify-center font-medium relative overflow-hidden group"
        >
          <motion.span 
            className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.5, opacity: 0.1 }}
            transition={{ duration: 0.5 }}
          />
          <motion.span 
            className="text-xl mr-2"
            animate={{ rotate: [0, 0, 180, 180, 0], scale: [1, 1.2, 1.2, 1, 1] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
          >
            ✨
          </motion.span> 
          <span className="font-bold text-lg">Create New Task</span>
        </motion.button>
      ) : (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            className="mb-6 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl shadow-xl border border-gray-100 dark:border-gray-600"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-purple-600 dark:text-purple-400">Create Magic ✨</h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowAddTask(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="relative"
            >
              <input 
                type="text" 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind?" 
                className="w-full p-3 mb-3 border rounded-lg bg-white dark:bg-gray-600 dark:border-gray-500 focus:ring-2 focus:ring-purple-300 outline-none shadow-sm text-gray-800 dark:text-white"
                autoFocus
              />
              <motion.span 
                className="absolute right-3 top-3 text-lg"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                💭
              </motion.span>
            </motion.div>
            
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <textarea 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add some details..." 
                className="w-full p-3 mb-3 border rounded-lg bg-white dark:bg-gray-600 dark:border-gray-500 focus:ring-2 focus:ring-purple-300 outline-none min-h-[80px] shadow-sm text-gray-800 dark:text-white"
              />
            </motion.div>
            
            <div className="grid grid-cols-2 gap-3 mb-4">
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="col-span-2 sm:col-span-1"
              >
                <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300 font-medium">Due Date</label>
                <input 
                  type="date" 
                  value={dueDate} 
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-600 dark:border-gray-500 focus:ring-2 focus:ring-purple-300 outline-none shadow-sm text-gray-800 dark:text-white"
                />
              </motion.div>
              
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="col-span-2 sm:col-span-1"
              >
                <label className="block text-sm mb-1 text-gray-600 dark:text-gray-300 font-medium">Priority</label>
                <select 
                  value={priority} 
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-600 dark:border-gray-500 focus:ring-2 focus:ring-purple-300 outline-none shadow-sm text-gray-800 dark:text-white"
                >
                  <option value="low">🔵 Low</option>
                  <option value="normal">🟢 Normal</option>
                  <option value="high">🔴 High</option>
                </select>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ x: -10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-4"
            >
              <label className="block text-sm mb-1 text-gray-500 dark:text-gray-400">Task Mood</label>
              <div className="flex justify-between bg-white dark:bg-gray-600 p-2 rounded-lg border dark:border-gray-500 shadow-sm">
                {moods.map(m => (
                  <motion.button
                    key={m}
                    whileHover={{ scale: 1.3, y: -5 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setMood(m)}
                    className={`text-2xl p-1 rounded-full transition-all ${mood === m ? 'bg-gradient-to-r from-purple-200 to-pink-200 dark:bg-gray-500 scale-125' : ''}`}
                  >
                    {m}
                  </motion.button>
                ))}
              </div>
            </motion.div>
            
            <div className="flex gap-2">
              <motion.button 
                whileHover={{ scale: 1.03, boxShadow: "0 5px 15px rgba(0,0,0,0.1)" }}
                whileTap={{ scale: 0.97 }}
                onClick={addTodo}
                className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-lg shadow-md"
              >
                <span className="flex items-center justify-center">
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="inline-block mr-2"
                  >
                    ✨
                  </motion.span>
                  Create Task
                </span>
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAddTask(false)}
                className="py-3 px-4 bg-gray-200 dark:bg-gray-600 rounded-lg font-medium shadow-sm"
              >
                Cancel
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
      
      {/* Filters - Moved inside the box */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 mb-2 flex justify-center space-x-3 z-20 px-2"
      >
        {["all", "active", "completed"].map((filterType) => (
          <motion.button 
            key={filterType}
            whileHover={{ scale: 1.05, boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilter(filterType)}
            className={`px-5 py-2 rounded-full transition-all ${
              filter === filterType 
                ? "bg-gradient-to-r from-orange-400 to-pink-500 text-white shadow-md"
                : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
          >
            {filterType === "all" && "📋 All"}
            {filterType === "active" && "🚀 Active"}
            {filterType === "completed" && "✅ Done"}
          </motion.button>
        ))}
      </motion.div>
      
      <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar pr-1">
        {filteredTodos.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            No tasks to display
          </div>
        ) : (
          filteredTodos.map(item => (
            <TodoItems 
              key={item.id}
              text={item.text}
              description={item.description}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
              date={item.date}
              dueDate={item.dueDate}
              priority={item.priority}
              changePriority={changePriority}
              isEditing={isEditing === item.id}
              editText={editText}
              setEditText={setEditText}
              startEditing={startEditing}
              saveEdit={saveEdit}
              handleEditKeyPress={handleEditKeyPress}
              editInputRef={editInputRef}
              mood={item.mood}
            />
          ))
        )}
      </div>
      
      {/* Celebration Modal */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowCelebration(false)}
          >
            <motion.div 
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl max-w-sm w-full mx-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="text-center">
                <motion.div 
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 10, -10, 10, 0] }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-5xl mb-4"
                >
                  🎉
                </motion.div>
                <h2 className="text-xl font-bold mb-2 dark:text-white">Task Completed!</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Great job completing: <span className="font-medium">{completedTaskText}</span>
                </p>
                <p className="text-sm text-blue-500 dark:text-blue-400 mb-4">
                  Don't forget to check out the Celebration Cards to collect your rewards!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setShowCelebration(false);
                    // Optionally, you can automatically open the menu and highlight celebration cards
                    // setShowMenu(true);
                    // setShowCelebrationCards(true);
                  }}
                  className="px-4 py-2 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg"
                >
                  Continue
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Hamburger menu content inside the main box */}
      <AnimatePresence>
        {showMenu && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white dark:bg-gray-800 z-40 p-5 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-500 text-transparent bg-clip-text">
                TaskMaster Features
              </h2>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowMenu(false)}
                className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
            
            {/* Feature grid with more spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Feature 1: Progress Tracker */}
              <motion.div 
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-5 rounded-xl border border-purple-100 dark:border-purple-800 shadow-sm cursor-pointer"
                onClick={() => setShowProgressDetails(true)}
              >
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-purple-600 dark:text-purple-400 mb-2 text-lg">Progress Insights</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Track your productivity journey with detailed analytics</p>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${todolist.length ? (todolist.filter(t => t.isComplete).length / todolist.length) * 100 : 0}%` }}
                    transition={{ duration: 1, type: "spring" }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                  ></motion.div>
                </div>
                <div className="text-sm text-right text-gray-500 dark:text-gray-400">
                  {todolist.filter(t => t.isComplete).length}/{todolist.length} tasks
                </div>
                <motion.div 
                  className="mt-3 text-center text-sm font-medium text-purple-600 dark:text-purple-400"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Tap to explore your progress →
                </motion.div>
              </motion.div>
              
              {/* Feature 2: Task Moods
              <motion.div 
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 p-5 rounded-xl border border-blue-100 dark:border-blue-800 shadow-sm cursor-pointer"
                onClick={() => setShowMoodGame(true)}
              >
                <div className="text-3xl mb-3">😊</div>
                <h3 className="font-bold text-blue-600 dark:text-blue-400 mb-2 text-lg">Mood Matcher</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Match your mood with tasks</p>
                <div className="flex justify-between">
                  {["😊", "🚀", "🔥", "🎯", "🌈"].map(m => (
                    <motion.span
                      key={m}
                      whileHover={{ scale: 1.3, y: -5 }}
                      className="text-2xl"
                    >
                      {m}
                    </motion.span>
                  ))}
                </div>
              </motion.div> */}
              
              {/* Feature 3: Priority Levels */}
              <motion.div 
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-5 rounded-xl border border-orange-100 dark:border-orange-800 shadow-sm cursor-pointer"
                onClick={() => setShowPriorityFilter(true)}
              >
                <div className="text-3xl mb-3">🔥</div>
                <h3 className="font-bold text-orange-600 dark:text-orange-400 mb-2 text-lg">Priority Focus</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Filter and focus on what matters most</p>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <span className="w-4 h-4 rounded-full bg-red-500 mr-2"></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">High Priority</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 h-4 rounded-full bg-yellow-500 mr-2"></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Normal Priority</span>
                  </div>
                  <div className="flex items-center">
                    <span className="w-4 h-4 rounded-full bg-blue-500 mr-2"></span>
                    <span className="text-sm text-gray-700 dark:text-gray-300">Low Priority</span>
                  </div>
                </div>
                <motion.div 
                  className="mt-3 text-center text-sm font-medium text-orange-600 dark:text-orange-400"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Tap to filter by priority →
                </motion.div>
              </motion.div>
              
              {/* Feature 4: Celebrations */}
              <motion.div 
                whileHover={{ scale: 1.03, boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}
                className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-5 rounded-xl border border-green-100 dark:border-green-800 shadow-sm cursor-pointer"
                onClick={() => setShowCelebrationCards(true)}
              >
                <div className="text-3xl mb-3">🎉</div>
                <h3 className="font-bold text-green-600 dark:text-green-400 mb-2 text-lg">Celebration Cards</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">Scratch to reveal your achievement rewards</p>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[1, 2, 3].map((card) => (
                    <motion.div
                      key={card}
                      whileHover={{ 
                        scale: 1.1, 
                        rotate: Math.random() * 10 - 5,
                        boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
                      }}
                      className="bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-800/30 dark:to-amber-800/30 p-2 rounded-lg border border-yellow-200 dark:border-yellow-700 h-16 flex items-center justify-center"
                    >
                      <motion.span 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 5, -5, 0]
                        }}
                        transition={{ 
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        className="text-xl"
                      >
                        {["🌟", "🔥", "💎"][card-1]}
                      </motion.span>
                    </motion.div>
                  ))}
                </div>
                <p className="text-xs text-green-600 dark:text-green-400 text-center font-medium">
                  Complete tasks to unlock rewards!
                </p>
              </motion.div>
            </div>
            
            {/* About Section with increased top margin */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl border border-gray-200 dark:border-gray-600 mb-6 mt-8 cursor-pointer"
              onClick={() => setShowAboutDetails(true)}
            >
              <h3 className="font-bold text-gray-800 dark:text-white mb-2 flex items-center text-lg">
                <span className="mr-2">ℹ️</span> About TaskMaster
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                TaskMaster is a beautifully designed productivity app that helps you organize tasks with style and efficiency.
              </p>
            </motion.div>
            
            {/* Share & Rate */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-900/20 dark:to-indigo-800/20 p-5 rounded-xl border border-indigo-100 dark:border-indigo-800 share-button"
                onClick={() => {
                  setShowMenu(false);
                  setShowShareModal(true);
                }}
              >
                <h3 className="font-bold text-indigo-600 dark:text-indigo-400 mb-3 flex items-center text-lg">
                  <span className="mr-2">🔗</span> Share TaskMaster
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Spread the productivity love with your friends and colleagues
                </p>
                <div className="flex justify-around">
                  <motion.button
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-md"
                    onClick={() => window.open('https://facebook.com/sharer/sharer.php?u=' + encodeURIComponent(window.location.href), '_blank')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center shadow-md"
                    onClick={() => window.open('https://twitter.com/intent/tweet?text=Check out this awesome task manager!&url=' + encodeURIComponent(window.location.href), '_blank')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                    </svg>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.2, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center shadow-md"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592z"/>
                    </svg>
                  </motion.button>
                </div>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-5 rounded-xl border border-amber-100 dark:border-amber-800"
              >
                <h3 className="font-bold text-amber-600 dark:text-amber-400 mb-2 flex items-center text-lg">
                  <span className="mr-2">⭐</span> Rate TaskMaster
                </h3>
                
                {ratingSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-4"
                  >
                    <div className="text-4xl mb-3">🙏</div>
                    <h4 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-2">
                      Thank You For Your Feedback!
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your rating helps us improve TaskMaster for everyone.
                    </p>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="flex mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <motion.button
                          key={star}
                          whileHover={{ 
                            scale: 1.2, 
                            rotate: [0, 15, -15, 0]
                          }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedRating(star)}
                          className={`text-2xl mx-1 ${
                            star <= selectedRating 
                              ? "text-yellow-400" 
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        >
                          ★
                        </motion.button>
                      ))}
                    </div>
                    
                    {selectedRating > 0 && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="w-full mt-2"
                      >
                        <textarea 
                          value={ratingFeedback}
                          onChange={(e) => setRatingFeedback(e.target.value)}
                          placeholder={`Tell us why you gave ${selectedRating} ${selectedRating === 1 ? 'star' : 'stars'}...`}
                          className="w-full p-3 text-sm border border-gray-200 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                          rows="3"
                        ></textarea>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setRatingSubmitted(true)}
                          className="mt-3 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-md text-sm font-medium w-full"
                        >
                          Submit Rating
                        </motion.button>
                      </motion.div>
                    )}
                  </div>
                )}
              </motion.div>
            </div>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowMenu(false)}
              className="w-full mt-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-bold text-lg shadow-md"
            >
              Back to Tasks
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
      
      <ProgressInsights 
        isOpen={showProgressDetails} 
        onClose={() => setShowProgressDetails(false)} 
        todolist={todolist} 
        darkMode={darkMode} 
      />

      <PriorityFilter 
        isOpen={showPriorityFilter} 
        onClose={() => setShowPriorityFilter(false)} 
        todolist={todolist} 
        darkMode={darkMode} 
      />

      <AboutDetails 
        isOpen={showAboutDetails} 
        onClose={() => setShowAboutDetails(false)} 
        darkMode={darkMode} 
      />

      <ShareModal 
        isOpen={showShareModal} 
        onClose={() => setShowShareModal(false)} 
        darkMode={darkMode} 
      />

      <AnimatePresence>
        {showCelebrationCards && <CelebrationCardsModal />}
      </AnimatePresence>
    </motion.div>
    
  );
};

export default Todo;



