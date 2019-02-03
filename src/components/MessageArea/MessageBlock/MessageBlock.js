import React, { Component } from 'react';
import styles from './MessageBlock.module.css';

class MessageBlock extends Component {
  render() {
    const date = this.props.time.match(/\d{4}-\d{2}-\d{2}/gi);
    const time = this.props.time.match(/\d{2}:\d{2}:\d{2}/gi);
    return (
      <div className='alert alert-light'>
        <div className={styles.FlexBlock}>
          <div className={styles.MessageInfo}>
            <p className={styles.Name}>{this.props.name}:</p>
            <p className={styles.Time}>{time}</p>
            <p className={styles.Time}>{date}</p>
          </div>
          <div>
            <p className={styles.Text}>{this.props.text}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageBlock;
