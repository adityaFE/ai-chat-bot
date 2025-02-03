import {useState} from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  useMediaQuery,
  useTheme,
  Rating,
  Modal,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatActions from "./ChatActions";

// Mock function to simulate API call for getting answer
const fetchAnswerFromAPI = async (question) => {
  try {
    const response = await new Promise((resolve) => {
      setTimeout(() => {
        if (question.toLowerCase().includes("hello")) {
          resolve({answer: "Hi! How can I assist you today?"});
        } else if (question.toLowerCase().includes("name")) {
          resolve({answer: "I am your friendly chatbot."});
        } else {
          resolve({
            answer: "I didn't understand that. Can you ask something else?",
          });
        }
      }, 1500);
    });
    return response.answer;
  } catch (error) {
    console.error("Error fetching answer:", error);
    throw new Error("Failed to fetch answer from API");
  }
};
// Simulate AI response
const simulateAIResponse = (userMessage, onResponse) => {
  setTimeout(() => {
    fetchAnswerFromAPI(userMessage)
      .then((response) => {
        onResponse({text: response, sender: "bot"});
      })
      .catch(() => {
        onResponse({text: "Error: Unable to fetch response", sender: "bot"});
      });
  }, 1000);
};



const ChatBot = () => {
  const [messages, setMessages] = useState([
    {text: "Hello, how can I help you today?", sender: "bot"},
  ]);
  const [userInput, setUserInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [showChatActions, setShowChatActions] = useState(false);
  const [isChatEnded, setIsChatEnded] = useState(false); // New state to track if chat has ended
  const [rating, setRating] = useState(0); // New state for chat rating
  const [isModalOpen, setIsModalOpen] = useState(false); // New state for modal
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSendMessage = () => {
    if (isChatEnded) return
    if (userInput.trim()) {
      setMessages([
        ...messages,
        {text: userInput, sender: "user"},
        {text: "Let me process that...", sender: "bot"},
      ]);
      setUserInput("");
      simulateAIResponse(userInput, (response) => {
        setMessages((prevMessages) => [...prevMessages, response]);
      });
    }
  };

  // Simulating file upload

  const simulateUpload = (file, setUploadProgress, onComplete) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress === 100) {
        clearInterval(interval);
        onComplete();
      }
    }, 300); // Update progress every 300ms
  }

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      setFileName(file.name);
      simulateUpload(file, setUploadProgress, () => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {text: `File ${file.name} uploaded successfully!`, sender: "bot"},
        ]);
        setIsUploading(false);
        setUploadProgress(0); // Reset progress
      });
    }
  };

  const handleEndChat = () => {
    setShowChatActions(false)
    setIsChatEnded(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      {text: "The chat has ended. Thank you!", sender: "bot"},
    ]);
    setIsModalOpen(true); // Show rating modal
  };

  const handleRestartChat = () => {
    setMessages([{text: "Hello, how can I help you today?", sender: "bot"}]);
    setUserInput("");
    setIsUploading(false);
    setUploadProgress(0);
    setFileName("");
    setIsChatEnded(false);
    setRating(0);
    setIsModalOpen(false);
  };


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "90vh",
        maxWidth: "400px",
        margin: "10px auto",
        padding: isMobile ? "10px" : "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        overflow: "hidden",
      }}
    >
      {/* Top Bar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          backgroundColor: isChatEnded ? "red" : "#4caf50",
          borderRadius: "10px 10px 0 0",
          color: "white",
        }}
      >
        <Box sx={{display: "flex", alignItems: "center", gap: "10px"}}>
          <Box
            component="img"
            src="https://randomuser.me/api/portraits"
            alt="User"
            sx={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "2px solid white",
            }}
          />
          <Box>
            <Typography variant="body1" fontWeight="bold">
              John Doe
            </Typography>
            <Typography variant="body2" sx={{fontSize: "12px", opacity: 0.8}}>
              {isChatEnded ? "Offline" : "Online"}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={() => setShowChatActions((prev) => !prev)}
          sx={{color: "white"}}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>
      {/* Chat Actions */}
      {showChatActions && (
        <ChatActions messages={messages} onEndChat={handleEndChat} />
      )}
      {/* Chat Messages */}
      <Box sx={{flex: 1, overflowY: "auto", marginBottom: "20px"}}>
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: msg.sender === "user" ? "row-reverse" : "row",
              marginTop: "20px",
              marginBottom: "10px",
            }}
          >
            <Box
              sx={{
                padding: "10px",
                borderRadius: "20px",
                backgroundColor:
                  msg.sender === "user" ? "#5c6bc0" : "#eceff1",
                color: msg.sender === "user" ? "white" : "black",
                maxWidth: "80%",
                wordBreak: "break-word",
              }}
            >
              <Typography variant={isMobile ? "body2" : "body1"}>
                {msg.text}
              </Typography>
            </Box>
          </Box>
        ))}
        {isUploading && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginTop: "10px",
            }}
          >
            <CircularProgress size={24} />
            <Typography variant="body2">
              Uploading {fileName}... {uploadProgress}%
            </Typography>
          </Box>
        )}
      </Box>
      {/* Input Section */}
      <Box sx={{display: "flex", gap: "10px", alignItems: "center"}}>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Type your message"
          value={userInput}
          disabled={isChatEnded}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          sx={{
            borderRadius: "20px",
            backgroundColor: "#fff",
            "& .MuiInputBase-root": {
              borderRadius: "20px",
            },
          }}
        />
        <Button
          variant="outlined"
          component="label"
          sx={{
            borderRadius: "14px",
            backgroundColor: "#ff4081",
            "&:hover": {backgroundColor: "#d7336b"},
            color: "white",
          }}
          disabled={isChatEnded}
        >
          Attach
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4caf50",
            "&:hover": {backgroundColor: "#388e3c"},
            borderRadius: "14px",
          }}
          onClick={handleSendMessage}
          disabled={isChatEnded}
        >
          Send
        </Button>
      </Box>
      {/* Restart Chat Button */}
      {isChatEnded && (
        <Button
          variant="contained"
          sx={{
            marginTop: "10px",
            backgroundColor: "#4caf50",
            "&:hover": {backgroundColor: "#388e3c"},
          }}
          onClick={handleRestartChat}
        >
          Restart Chat
        </Button>
      )}
      {/* Rating Modal */}
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Rate your experience</Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            sx={{marginTop: "10px"}}
          />
          <Button
            sx={{marginTop: "10px"}}
            variant="contained"
            onClick={() => setIsModalOpen(false)}
          >
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ChatBot;
