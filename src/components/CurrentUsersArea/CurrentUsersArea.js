import React from 'react';
import styles from './CurrentUsersArea.module.css'
import UserInfo from "./UserInfo/UserInfo";

const CurrentUsersArea = (props) => {
    return (
        <div className={styles.CurrentUserArea}>
            <h4>Online:</h4>
            {props.users.map((elem,index)=>{
               return <UserInfo name={elem.name} key={index} />
            })}
        </div>
    )
}

export default CurrentUsersArea
