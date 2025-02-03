import {Box, IconButton} from '@mui/material';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

// Function to download chat transcript as a text file
const downloadTranscript = (messages) => {
  const transcript = messages
    .map((msg) => `${msg.sender.toUpperCase()}: ${msg.text}`)
    .join('\n\n');

  const blob = new Blob([transcript], {type: 'text/plain;charset=utf-8'});
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = 'chat_transcript.txt';
  link.click();
};

// eslint-disable-next-line react/prop-types
const ChatActions = ({messages, onEndChat}) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <IconButton
        onClick={() => downloadTranscript(messages)}
        sx={{
          backgroundColor: '#4caf50',
          '&:hover': {backgroundColor: '#388e3c'},
        }}
      >
        <FileDownloadIcon sx={{color: 'white'}} />
      </IconButton>

      <IconButton
        onClick={onEndChat}
        sx={{
          backgroundColor: '#f44336',
          '&:hover': {backgroundColor: '#e53935'},
        }}
      >
        <ExitToAppIcon sx={{color: 'white'}} />
      </IconButton>
    </Box>
  );
};

export default ChatActions;
