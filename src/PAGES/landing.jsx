import { Settings, User, Search, Library, Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

function Landing({ children }) {
  const [email, setEmail] = useState("manzialpe@gmail.com");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // NEW state to control sidebar

  const nav = [
    { id: 1, name: "Home" },
    { id: 2, name: "Borrow a book" },
  ];
  const nav2 = [
    { id: 1, name: "Read books" },
    { id: 2, name: "Do Exercises" },
    { id: 3, name: "Study friends" },
  ];

  useEffect(() => {
    setEmail(localStorage.getItem("EMAIL"));
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-full p-3" style={{ backgroundImage: `url('/bg.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      
      {/* Sidebar */}
      <aside className={`w-full md:w-[230px] h-[150px] md:h-full rounded-xl p-4 bg-gradient-to-br from-gray-900 to-orange-900 shadow-md relative z-20
        ${isSidebarOpen ? 'flex' : 'hidden'} md:flex justify-center transition-all duration-500`}>
        
        <div className="w-full">
          {/* Close button for mobile */}
          <div className="flex justify-end md:hidden mb-2">
            <button onClick={() => setIsSidebarOpen(false)}>
              <X className="text-orange-300 w-8 h-8" />
            </button>
          </div>

          <h1 className="text-orange-300 text-center text-[24px] md:text-[20px] sm:p-2 font-semibold">Libria</h1>

          <div className="flex flex-col  mt-16">
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

          <div className="flex flex-col mt-10">
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

          <div className="flex flex-row mt-10 ">
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
      <div className="relative flex-1 h-screen overflow-auto mt-3 md:mt-0 md:ml-3">
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/70 to-zinc-900/70 rounded-xl z-10 backdrop-blur-sm"></div>

        {/* Main content */}
        <div className="relative z-20 p-5">
          
          {/* Topbar */}
          <div className="w-full flex flex-col md:flex-row md:justify-between items-center gap-4">
            
            {/* Mobile Menu Button */}
            <div className="md:hidden flex w-full justify-between items-center">
              <h2 className="text-white text-[24px] md:text-[20px] font-semibold">Read more</h2>
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <Menu className="w-8 h-8 text-white" />
              </button>
            </div>

            {/* Welcome Text (desktop) */}
            <div className="p-2 hidden md:block">
              <h2 className="text-white text-[24px] md:text-[20px] font-semibold">Read <span className='text-orange-300'>more</span></h2>
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
                <Search className="text-white w-5 h-5" />
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
          <div className="p-5 md:p-14 w-full h-full overflow-auto">
            {children}
          </div>

        </div>
      </div>

    </div>
  );
}

export default Landing;
