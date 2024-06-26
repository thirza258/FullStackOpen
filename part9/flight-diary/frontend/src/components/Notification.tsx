import React from 'react';

interface NotificationProps {
  message: string;
}

const Notification = (props: NotificationProps)=> {
  if (!props.message) return null;

  return (
    <div style={{ color: 'red' }}>
      {props.message}
    </div>
  );
};

export default Notification;
