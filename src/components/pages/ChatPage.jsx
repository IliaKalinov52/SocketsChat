import React, { useState, useRef, useEffect } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import UsersList from './chat/ui/UsersList';
import ChatComponent from './chat/ui/ChatComponent';

export default function ChatPage({ messages: initMessages, user: loggedUser }) {
  const [messages, setMessages] = useState(initMessages);
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null)
  const socketRef = useRef(null)

  useEffect(() => {
    socketRef.current = new WebSocket('ws://localhost:3000')
    const socket = socketRef.current

    socket.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);
      switch (type) {
        case 'SET_USERS_FROM_SERVER':
          setUsers(payload)
          break;

        case 'ADD_MESSAGE_FROM_SERVER':
          setMessages(prev => [...prev, payload])
          break;

        case 'USER_TYPING_FROM_SERVER':
          setTypingUser(payload)
          break

        case 'USER_STOP_TYPING_FROM_SERVER':
          setTypingUser(null)
          break

        default:
          break;
      }
    }
  }, [])

  const submitMessage = (input) => {
    const socket = socketRef.current;
    socket.send(JSON.stringify({ type: 'ADD_MESSAGE_FROM_CLIENT', payload: input }))
  };

  return (
    <Container>
      <Row className="justify-content-center align-items-center text-center">
        <Col xs={6}>
          <h1 className="p-2 display-3">Chat</h1>
        </Col>
      </Row>
      <Card className="p-4">
        <Row>
          <Col xs={2}>
            <UsersList users={users.filter(el => el.id !== loggedUser.id)} />
          </Col>
          <Col xs={10}>
            <ChatComponent
              submitMessage={submitMessage}
              messages={messages}
              loggedUser={loggedUser}
              socketRef={socketRef}
            />
            {typingUser && `${typingUser.name} is typing now...`}
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
