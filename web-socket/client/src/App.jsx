import { Button } from "@mui/base"
import { TextField, Typography } from "@mui/material"
import { Container } from "@mui/system"
import { useEffect, useMemo, useState } from "react"
import { io } from "socket.io-client"

const App = () => {
  const socket = useMemo(() => io("http://localhost:5000", {
    withCredentials: true
  }), [])

  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('');
  const [socketId, setSocketId] = useState('');
  const [messageList, setMessageList] = useState([])
  const [roomName, setRoomName] = useState('');

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected", socket.id)
      setSocketId(socket.id)
    });
    socket.on("welcome", (msg) => {
      console.log("msg:", msg)
    })
    socket.on("receive-message", (data) => {
      console.log("received=message::", data)
      setMessageList((messageList) => [...messageList, data])
    })
    // return () => {
    //   socket.disconnect();
    // }
  }, [])
  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit('message', { message, room })
    setMessage("")
  }
  const joinRoomHandler = (e) => {
    e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("")
  }
  return (
    <>
      <Container maxWidth="sm">
        <Typography variant="h1" component="div" gutterBottom>
          Welcome to Socket.io
        </Typography>
        <Typography variant="h6" component="div" gutterBottom>
          {socketId}
        </Typography>
        <form onSubmit={joinRoomHandler}>
          <h5>
            Join Room
          </h5>
          <TextField id="outlined-basic" label="room name" variant="outlined" value={roomName} onChange={(e) => setRoomName(e.target.value)} autoComplete="off" />
          <Button type="submit" variant="contained" color="primary">Join</Button>
        </form>
        <form onSubmit={handleSubmit}>
          <TextField id="outlined-basic" label="message" variant="outlined" value={message} onChange={(e) => setMessage(e.target.value)} autoComplete="off" />
          <TextField id="outlined-basic" label="room" variant="outlined" value={room} onChange={(e) => setRoom(e.target.value)} autoComplete="off" />
          <Button type="submit" variant="contained" color="primary">Send</Button>
        </form>
        <div>{messageList.map((message) => {
          return <div key={message.message}>{message.message}</div>
        })}</div>
      </Container>

    </>
  )
}

export default App
