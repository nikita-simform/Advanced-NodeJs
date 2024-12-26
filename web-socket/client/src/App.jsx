import { Button, Form, Input, Typography } from "antd";
import { useEffect, useMemo, useState } from "react";
import { Container } from "react-bootstrap";
import { io } from "socket.io-client";

const { Title, Paragraph } = Typography;

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
    // e.preventDefault();
    socket.emit('message', { message, room })
    setMessage("")
  }
  const joinRoomHandler = (e) => {
    // e.preventDefault();
    socket.emit("join-room", roomName);
    setRoomName("")
  }
  return (
    <>
      <Container>
        <Title level={1}>Welcome to Socket.io</Title>
        <Paragraph>{socketId}</Paragraph>

        {/* Join Room Form */}
        <Form onFinish={joinRoomHandler} layout="vertical">
          <Title level={5}>Join Room</Title>
          <Form.Item label="Room Name" name="roomName">
            <Input
              placeholder="Enter room name"
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Join
            </Button>
          </Form.Item>
        </Form>

        {/* Send Message Form */}
        <Form onFinish={handleSubmit} layout="vertical">
          <Form.Item label="Message" name="message">
            <Input
              placeholder="Enter your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item label="Room" name="room">
            <Input
              placeholder="Enter room"
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              autoComplete="off"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send
            </Button>
          </Form.Item>
        </Form>

        {/* Message List */}
        <div>
          {messageList.map((message, index) => (
            <Paragraph key={index}>{message.message}</Paragraph>
          ))}
        </div>
      </Container>

    </>
  )
}

export default App
