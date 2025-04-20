import React, { useState } from 'react';
import { Send } from 'lucide-react';

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
    <div className="h-[300px] w-full flex flex-col justify-end p-4">
      <div className="relative w-full max-w-3xl mx-auto">
        <textarea
          rows="1"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything"
          className="w-full resize-none rounded-3xl p-8 h-[100px] text-white bg-[#2c2c2c] border border-gray-600 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/20"
        />
        <button
          onClick={handleSend}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full flex items-center justify-center hover:bg-gray-300 transition"
        >
          <Send className="w-5 h-5 text-orange-400" />
        </button>
      </div>
    </div>
  );
}

export default HomeD;
