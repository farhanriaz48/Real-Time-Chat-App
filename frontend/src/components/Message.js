import React from 'react';

export default function Message({ user, message, time }) {
  return (
    <div>
      <strong>{user}</strong>: {message} <small>{time}</small>
    </div>
  );
}
