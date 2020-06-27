import React from 'react';
import style from './Notification.module.css';

const Notification = ({ onClick }) => (
  <div className={style.div}>
    <span className={style} onClick={onClick}>
      Contact alredy exists!
    </span>
  </div>
);

export default Notification;
