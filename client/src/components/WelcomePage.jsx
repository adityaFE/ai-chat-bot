import {useState, useEffect} from "react";
import {Box, Typography, Button} from "@mui/material";

// eslint-disable-next-line react/prop-types
const WelcomePage = ({onStartChat}) => {
  const [currentPage, setCurrentPage] = useState(0);
  // Hardcoded content for each page
  const pages = [
    {
      title: "Welcome to SyfBot",
      description: "Chat with our friendly and intelligent bot",
      bgColor: "#ffe6f0",
    },
    {
      title: "Stay Connected",
      description: "Keep in touch with loved ones anytime, anywhere with SyfBot's seamless experience.",
      bgColor: "#e6f7ff",
    },
    {
      title: "Get Started",
      description: "Your journey to smarter and faster communication begins here!",
      bgColor: "#e6ffe6",
    },
  ];
  // Navigate pages via keyboard

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowRight") {
        setCurrentPage((prev) => (prev < pages.length - 1 ? prev + 1 : prev));
      } else if (event.key === "ArrowLeft") {
        setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (event.key === "Enter" && currentPage === pages.length - 1) {
        onStartChat(); // Trigger Start Chat when Enter is pressed on the last page
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [pages.length, currentPage, onStartChat]);

  const handleDotClick = (index) => {
    setCurrentPage(index);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        bgcolor: pages[currentPage].bgColor,
        transition: "background-color 0.5s ease",
      }}
    >
      {/* Chatty Icon Placeholder */}
      <Box
        sx={{
          width: "120px",
          height: "120px",
          mb: 3,
          position: "relative",
        }}
      >
        <img src=""></img>
      </Box>
      {/* Dynamic Title and Description */}
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          fontWeight: "bold",
          color: "#333333",
          textAlign: "center",
        }}
      >
        {pages[currentPage].title}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          mb: 5,
          color: "#666666",
          textAlign: "center",
          maxWidth: "300px",
        }}
      >
        {pages[currentPage].description}
      </Typography>
      {/* Pagination Dots */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mb: 4,
        }}
      >
        {pages.map((_, index) => (
          <Box
            key={index}
            onClick={() => handleDotClick(index)}
            sx={{
              width: "12px",
              height: "12px",
              bgcolor: currentPage === index ? "#333333" : "#cccccc",
              borderRadius: "50%",
              mx: "4px",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
            }}
          />
        ))}
      </Box>
      {/* Start Chat Button */}
      {
        currentPage === pages.length - 1 && (
          <Button
            variant="contained"
            color="secondary"
            onClick={onStartChat}
            sx={{
              bgcolor: "#ff4081",
              "&:hover": {bgcolor: "#d7336b"},
              px: 6,
              py: 1.5,
              fontSize: "1rem",
              borderRadius: "24px",
            }}
          >
            Start Chat
          </Button>
        )
      }
    </Box >
  );
};

export default WelcomePage;
