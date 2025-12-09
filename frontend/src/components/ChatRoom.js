import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import Message from './Message';

const socket = io('http://localhost:5000');

export default function ChatRoom({ user, room }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit('joinRoom', room);

    socket.on('receiveMessage', (msg) => {
      setMessages(prev => [...prev, msg]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [room]);

  const sendMessage = () => {
    if(message.trim() !== ''){
      socket.emit('sendMessage', { room, message, user });
      setMessage('');
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Room: {room}</h2>
      <div style={{ border: '1px solid gray', height: '300px', overflowY: 'scroll', marginBottom: '10px', padding: '5px' }}>
        {messages.map((msg, i) => <Message key={i} {...msg} />)}
      </div>
      <input
        value={message}
        onChange={e => setMessage(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
        style={{ width: '80%', marginRight: '10px' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
