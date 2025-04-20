import { Settings, User, Search, Library, Menu, X, History, Send } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion'; // <- corrected 'motion/react' to 'framer-motion'

function Landing({ children }) {
  const [email, setEmail] = useState("manzialpe@gmail.com");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const nav = [
    { id: 1, name: "Home" },
    { id: 2, name: "BookStore" },
  ];
  const nav2 = [
    { id: 1, name: "Reader page" },
    { id: 2, name: "Achievements" },
    { id: 3, name: "Buy books" },
  ];

  useEffect(() => {
    const storedEmail = localStorage.getItem("EMAIL");
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  return (
    <div 
      className="flex flex-col md:flex-row w-full min-h-screen p-3" 
      style={{ backgroundImage: `url('/bg.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <style jsx="true">{`
        aside::-webkit-scrollbar {
          height: 8px;
        }
        aside::-webkit-scrollbar-thumb {
          background-color: orange;
          border-radius: 10px;
        }
        aside::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
        }
      `}</style>

      {/* Sidebar */}
      <aside className={`w-full md:w-[230px] ${isSidebarOpen ? 'flex' : 'hidden'} md:flex flex-col min-h-[210px] md:min-h-full rounded-xl sm:p-4 p-7 bg-gradient-to-br from-gray-900 to-orange-900 shadow-md relative z-20 transition-all duration-500 overflow-x-auto md:overflow-visible`}>

        <div className="w-max md:w-full flex md:flex-col">
          {/* Close button mobile */}
          <div className="flex relative top-[-40px] justify-center md:hidden mb-2 w-full">
            <button onClick={() => setIsSidebarOpen(false)}>
              <X className="text-orange-300 w-8 h-8" />
            </button>
          </div>

          <div className="sm:flex justify-between sm:p-4 min-w-[80px] ml-10 sm:ml-0 ">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              className="w-10 h-10 cursor-pointer flex duration-700 transition-all hover:bg-orange-400/40 items-center justify-center bg-black/40 rounded-full"
            >
              <Settings className='w-5 h-5 text-orange-300' />
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1, transition: { duration: 0.5 } }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.8 }}
              className="w-10 h-10 flex cursor-pointer duration-700 transition-all hover:bg-orange-400/40 items-center justify-center rounded-full bg-black/40"
            >
              <History className='w-5 h-5 text-orange-300' />
            </motion.div>
          </div>

          {/* Navigation links */}
          <div className="flex flex-col sm:mt-14 min-w-[250px]">
            {nav.map(item => (
              <motion.div
                key={item.id}
                className="w-[200px] rounded-xl h-[40px] bg-black/40 text-white text-center text-[14px] cursor-pointer font-semibold flex items-center justify-center mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.7 }}
              >
                {item.name}
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:mt-10 min-w-[250px]">
            {nav2.map(item => (
              <motion.div
                key={item.id}
                className="w-[200px] rounded-xl h-[40px] bg-black/40 text-white text-center text-[14px] cursor-pointer font-semibold flex items-center justify-center mb-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.7 }}
              >
                {item.name}
              </motion.div>
            ))}
          </div>

          <div className="flex flex-row mt-10 min-w-[250px]">
            <motion.div
              className="w-[200px] rounded-xl h-[40px] bg-red-300/40 text-white text-center text-[14px] cursor-pointer font-semibold flex items-center justify-center mb-2"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1, transition: { duration: 1 } }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.7 }}
            >
              Logout
            </motion.div>
          </div>
        </div>

      </aside>

      {/* Main Section */}
      <div className="relative flex-1 min-h-screen mt-3 md:mt-0 md:ml-3">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/70 to-zinc-900/70 rounded-xl z-10 backdrop-blur-sm"></div>

        {/* Main content */}
        <div className="relative z-20 flex flex-col p-5 min-h-full">
          
          {/* Topbar */}
          <div className="w-full flex flex-col md:flex-row md:justify-between items-center gap-4">
            {/* Mobile Menu Button */}
            <div className="md:hidden flex w-full p-4 justify-between items-center">
              <h2 className="text-orange-300 text-[24px] md:text-[20px] font-semibold">
                VOILA
              </h2>
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <Menu className="w-8 h-8 text-white" />
              </button>
            </div>

            {/* Welcome Text */}
            <div className="p-2 hidden md:block">
              <h2 className="text-orange-300 text-[24px] md:text-[20px] font-semibold">VOILA</h2>
            </div>

            {/* Search Bar */}
            <div className="flex items-center bg-black/40 rounded-full overflow-hidden w-full max-w-[400px]">
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-transparent outline-none px-4 py-2 w-full text-white placeholder-zinc-400"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileTap={{ scale: 0.8, opacity: 0.9 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 1 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-orange-400 cursor-pointer hover:bg-orange-950 duration-500 transition-all p-2 rounded-full m-1"
              >
                <Send className="text-white w-5 h-5" />
              </motion.div>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <button className="flex items-center bg-black/40 hover:bg-orange-950 transition-all duration-700 w-[120px] h-[40px] rounded-full cursor-pointer text-orange-400 font-semibold justify-center">
                <Library className="w-6 h-6" />
                <p className="ml-2 text-white text-sm">Saved</p>
              </button>
              <button className="flex items-center bg-black/40 hover:bg-orange-950 transition-all duration-700 w-[120px] h-[40px] rounded-full cursor-pointer text-orange-400 font-semibold justify-center">
                <User className="w-6 h-6" />
                <p className="ml-2 text-white text-sm">Profile</p>
              </button>
            </div>
          </div>

          {/* Children Content */}
          <div className="flex-1 w-full mt-6">
            {children}
          </div>

        </div>
      </div>

    </div>
  );
}

export default Landing;
