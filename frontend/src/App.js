import React, { useState } from 'react';
import ChatRoom from './components/ChatRoom';
import Login from './components/Login';

function App() {
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="App">
      {!user || !room ? (
        <Login setUser={setUser} setRoom={setRoom} />
      ) : (
        <ChatRoom user={user} room={room} />
      )}
    </div>
  );
}

export default App;
