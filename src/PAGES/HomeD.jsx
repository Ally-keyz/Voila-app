import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { motion } from 'motion/react';

function HomeD() {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;
    console.log("Sending:", input);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
    <div className="h-[300px]  w-full flex flex-row justify-around p-4">
      <motion.div
      initial={{scale:0,opacity:0}}
      whileInView={{scale:1,opacity:1 , transition:{duration:0.5}}}
      whileHover={{ scale:1.1 }}
      whileTap={{scale:0.8}}
       className="w-[300px] h-[250px] cursor-pointer rounded-xl bg-[#2c2c2c] border border-gray-600"></motion.div>
      <motion.div
            initial={{scale:0,opacity:0}}
            whileInView={{scale:1,opacity:1 , transition:{duration:0.5}}}
            whileHover={{ scale:1.1 }}
            whileTap={{scale:0.8}}
             className="w-[300px] cursor-pointer h-[250px] rounded-xl bg-[#2c2c2c] border border-gray-600"></motion.div>
      
    </div>
        <div className="h-[300px]  w-full flex flex-row gap-4 justify-evenly p-5">
<div className="flex flex-col">
<motion.div
        initial={{scale:0,opacity:0}}
        whileInView={{scale:1,opacity:1 , transition:{duration:0.5}}}
        whileHover={{ scale:1.1 }}
        whileTap={{scale:0.8}}
         className="w-[300px] h-[100px] cursor-pointer rounded-xl bg-[#2c2c2c] border border-gray-600">
          
         </motion.div>
         <motion.div
        initial={{scale:0,opacity:0}}
        whileInView={{scale:1,opacity:1 , transition:{duration:0.5}}}
        whileHover={{ scale:1.1 }}
        whileTap={{scale:0.8}}
         className="w-[300px] h-[150px] cursor-pointer rounded-xl bg-[#2c2c2c] border border-gray-600">
          
         </motion.div>
</div>
        <motion.div
              initial={{scale:0,opacity:0}}
              whileInView={{scale:1,opacity:1 , transition:{duration:0.5}}}
              whileHover={{ scale:1.1 }}
              whileTap={{scale:0.8}}
               className="w-[400px] cursor-pointer h-[250px] rounded-xl bg-[#2c2c2c] border border-gray-600"></motion.div>
        
      </div>
      </>
  );
}

export default HomeD;
