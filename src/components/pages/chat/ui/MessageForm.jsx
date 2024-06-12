import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import SendIcon from '../../../ui/icons/SendIcon';

export default function MessageForm({ submitMessage, socketRef }) {
  const [input, setInput] = useState('');
  const changeHandler = (e) => setInput(e.target.value);

  useEffect(() => {
    if (!socketRef.current) return;

    const socket = socketRef.current;

    socket.send(JSON.stringify({ type: 'USER_TYPING_FROM_CLIENT' }))

    setTimeout(() => {
      socket.send(JSON.stringify({ type: 'USER_STOP_TYPING_FROM_CLIENT' }))
    }, 2000)

  }, [input])

  return (
    <Form
      onSubmit={(event) => {
        event.preventDefault();
        submitMessage(input);
        setInput('');
      }}
    >
      <InputGroup className="mb-3">
        <Form.Control placeholder="Your message" value={input} onChange={changeHandler} />
        <InputGroup.Text id="basic-addon2">
          <Button variant="outline-primary" type="submit">
            <SendIcon />
          </Button>
        </InputGroup.Text>
      </InputGroup>
    </Form>
  );
}
