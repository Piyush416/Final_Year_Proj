import React, { useState } from "react";

const conversations = [
  { id: 1, name: "John Doe", lastMessage: "Hey! How's it going?", avatar: "https://i.pravatar.cc/150?img=1" },
  { id: 2, name: "Jane Smith", lastMessage: "Let's catch up soon!", avatar: "https://i.pravatar.cc/150?img=2" },
  { id: 3, name: "Alice Johnson", lastMessage: "Did you get my last message?", avatar: "https://i.pravatar.cc/150?img=3" },
  { id: 4, name: "Michael Brown", lastMessage: "Looking forward to our meeting.", avatar: "https://i.pravatar.cc/150?img=4" },
  { id: 5, name: "Emma Wilson", lastMessage: "That sounds amazing!", avatar: "https://i.pravatar.cc/150?img=5" }
];

const Inbox = () => {
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-3/5 bg-white shadow-lg rounded-2xl overflow-hidden flex">
        {/* Sidebar */}
        <div className="w-1/3 bg-gray-50 p-4 overflow-y-auto">
          <h2 className="text-xl font-bold mb-4">Inbox</h2>
          <div className="space-y-3">
            {conversations.map((chat) => (
              <div 
                key={chat.id} 
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition ${selectedChat?.id === chat.id ? 'bg-gray-200' : 'hover:bg-gray-100'}`} 
                onClick={() => setSelectedChat(chat)}
              >
                <img src={chat.avatar} alt={chat.name} className="w-10 h-10 rounded-full" />
                <div>
                  <h3 className="font-semibold">{chat.name}</h3>
                  <p className="text-gray-500 text-sm truncate w-32">{chat.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Window */}
        <div className="flex-1 flex flex-col">
          {selectedChat ? (
            <>
              <div className="p-4 border-b flex items-center space-x-3 bg-gray-50">
                <img src={selectedChat.avatar} alt={selectedChat.name} className="w-10 h-10 rounded-full" />
                <h2 className="text-lg font-semibold">{selectedChat.name}</h2>
              </div>
              <div className="flex-1 p-4 overflow-y-auto flex flex-col-reverse bg-gray-50">
                <div className="space-y-3">
                  <div className="bg-gray-200 p-3 rounded-lg self-start max-w-xs">Hey! How are you?</div>
                  <div className="bg-blue-500 text-white p-3 rounded-lg self-end max-w-xs">I'm doing great! What about you?</div>
                </div>
              </div>
              <div className="p-4 border-t flex items-center bg-gray-50">
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition">Send</button>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center flex-1 text-gray-400 bg-gray-50">Select a conversation to start chatting</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inbox;
