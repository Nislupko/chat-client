import React from 'react';
import styles from './UserInfo.module.css';

const UserInfo = props => {
  return (
    <div className={styles.UserInfo}>
      <p className={styles.Name}>{props.name}</p>
    </div>
  );
};

export default UserInfo;
