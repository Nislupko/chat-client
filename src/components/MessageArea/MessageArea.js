import React, { Component } from 'react';
import styles from './MessageArea.module.css'
import MessageBlock from "./MessageBlock/MessageBlock";

class MessageArea extends Component {
    scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
        this.scrollToBottom();
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }
  render() {
    return (
        <div className={styles.MessageArea}>
            {this.props.messages.map((msg, index)=>{
                return <MessageBlock key={index} name={msg.author} time={msg.date} text={msg.content}/>
            })}
            <div style={{ float:"left", clear: "both" }}
                 ref={(el) => { this.messagesEnd = el; }}>
            </div>
        </div>
    )
  }
}

export default MessageArea
