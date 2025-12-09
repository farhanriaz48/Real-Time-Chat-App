import React, { useState } from 'react';

export default function Login({ setUser, setRoom }) {
  const [name, setName] = useState('');
  const [roomName, setRoomName] = useState('');

  const handleLogin = () => {
    if(name && roomName){
      setUser(name);
      setRoom(roomName);
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <input placeholder="Your Name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Room Name" value={roomName} onChange={e => setRoomName(e.target.value)} />
      <button onClick={handleLogin}>Join Chat</button>
    </div>
  );
}
