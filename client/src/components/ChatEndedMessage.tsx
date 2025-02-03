import React from 'react'
import { Box, Typography } from '@mui/material'

const ChatEndedMessage = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        padding: '10px',
        backgroundColor: 'hashtag#ffcdd2',
        borderRadius: '20px',
        margin: '10px auto'
      }}
    >
      <Typography variant="body1" color="error">
        The chat has been ended.
      </Typography>
    </Box>
  )
}

export default ChatEndedMessage
