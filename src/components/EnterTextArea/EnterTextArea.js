import React, { Component } from 'react';
import styles from './EnterTextArea.module.css'

class EnterTextArea extends Component {
    constructor(props){
      super(props)
      this.state = {
          textArea:''
      }
    }
    updateTextArea = (e) => {
       this.setState({
           textArea:e.target.value
       })
    }
    //Отправляем непустые сообщения
    onClickHandler = (e) => {
        e.preventDefault()
        if(this.state.textArea.replace(/\s*/gi,'')) {
            this.props.onMessageHandler(this.state.textArea)
            this.setState({
                textArea: ''
            })
        }
    }
    render() {
        return (
            <div className={styles.Border}>
             <form className={styles.EnterTextArea}>
                   <textarea placeholder="Start typing..."
                             className={styles.textArea}
                             value={this.state.textArea}
                             onChange={e =>this.updateTextArea(e)}
                   ></textarea>
                   <button className={styles.Button}
                           onClick={this.onClickHandler}
                   >Send!</button>
                </form>
            </div>
        )
    }
}

export default EnterTextArea
