import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useChat } from "../contexts/ChatContext";

const ChatWindow = () => {
  const { user } = useAuth();
  const { selectedUser, messages, sendMessage, bottomRef,onlineUsers } = useChat();
  const [text, setText] = useState("");

  // Scroll to bottom on new message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(text);
      setText("");
    }
  };

  // No user selected
 // ChatWindow.jsx
return !selectedUser ? (
  <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
    <h3 className="text-xl font-medium mb-2">Select a conversation</h3>
    <p className="text-sm">Choose a user from your connections to start chatting</p>
  </div>
) : (
  <div className="flex-1 flex flex-col bg-white">
    {/* Header */}
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
          {selectedUser.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="font-semibold text-gray-800">{selectedUser.name}</h2>
          <p className="text-xs text-gray-500">
            {onlineUsers[selectedUser._id] ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
    </div>

    {/* Messages */}
    <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
      {messages.length === 0 ? (
        <div className="text-center text-gray-400 mt-10">No messages yet</div>
      ) : (
        <div className="space-y-2">
          {messages.map((msg, i) => {
            const senderId = typeof msg.sender === "string" ? msg.sender : msg.sender?._id;
            const isSender = senderId === user._id;

            return (
              <div key={i} className={`flex ${isSender ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-xs px-4 py-2 rounded-xl text-sm ${
                  isSender ? "bg-blue-500 text-white" : "bg-white border"
                }`}>
                  {msg.content}
                  <div className="mt-1 text-xs text-right text-gray-400">
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>
      )}
    </div>

    {/* Input */}
    <div className="p-4 border-t">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-1 focus:ring-blue-400"
        />
        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className={`px-4 py-2 rounded-full text-sm ${
            text.trim()
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          Send
        </button>
      </div>
    </div>
  </div>
);



};

export default ChatWindow;
