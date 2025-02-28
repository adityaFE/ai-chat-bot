import {useState} from "react";
import ChatBox from "./components/ChatBot";
import WelcomePage from "./components/WelcomePage";

const App = () => {
  const [showChat, setShowChat] = useState(false);
  const handleStartChat = () => {
    setShowChat(true);
  };
  return <>{showChat ? <ChatBox /> : <WelcomePage onStartChat={handleStartChat} />}</>;
};

export default App;
