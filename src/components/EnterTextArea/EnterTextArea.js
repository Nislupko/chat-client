import React, { Component } from 'react';
import styles from './EnterTextArea.module.css';

class EnterTextArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textArea: ''
    };
  }
  updateTextArea = e => {
    this.setState({
      textArea: e.target.value
    });
  };
  //Отправляем непустые сообщения
  onClickHandler = e => {
    e.preventDefault();
    if (this.state.textArea.replace(/\s*/gi, '')) {
      this.props.onMessageHandler(this.state.textArea);
      this.setState({
        textArea: ''
      });
    }
  };
  render() {
    return (
      <div className="container-fluid">
        <div className={styles.noResize}>
          <div className="input-group mb-3">
            <textarea
              type="text"
              className="form-control"
              placeholder="Start typing..."
              value={this.state.textArea}
              onChange={e => this.updateTextArea(e)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.onClickHandler}
              >
                Send!
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EnterTextArea;
