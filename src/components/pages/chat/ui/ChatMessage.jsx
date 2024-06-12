import React from 'react';
import { Card } from 'react-bootstrap';

export default function ChatMessage({ message, loggedUser }) {

  const justifyContent =
    loggedUser.id === message.User.id ? 'justify-content-end' : 'justify-content-start';
  return (
    <div className={`d-flex ${justifyContent} mt-2 mb-2`}>
      <Card style={{ width: '15rem' }}>
        <Card.Body>
          <Card.Subtitle className="mb-2 text-muted">{message.User.name}</Card.Subtitle>
          <Card.Text>{message.text}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
