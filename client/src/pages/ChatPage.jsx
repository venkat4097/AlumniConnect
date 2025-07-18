import ChatSidebar from "../components/ChatSidebar";
import ChatWindow from "../components/ChatWindow";

const ChatPage = () => {
  return (
    <div className="flex h-screen">
      <ChatSidebar />
      <ChatWindow />
    </div>
  );
};

export default ChatPage;
