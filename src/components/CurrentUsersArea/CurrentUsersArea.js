import React from 'react';
import styles from './CurrentUsersArea.module.css';

const CurrentUsersArea = props => {
  return (
    <div className={styles.CurrentUserArea}>
      <ul className="list-group">
        {props.users.map((elem, index) => {
          return (
            <li className="alert alert-success" key={index}>
              {elem.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CurrentUsersArea;
