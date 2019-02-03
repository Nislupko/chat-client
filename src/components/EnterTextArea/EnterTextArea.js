import React, { Component } from 'react';

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
        <div className="input-group mb-3">
          <textarea
            type="text"
            className="form-control"
            placeholder="Start typing..."
            aria-label="Recipient's username"
            aria-describedby="button-addon2"
            value={this.state.textArea}
            onChange={e => this.updateTextArea(e)}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              id="button-addon2"
              onClick={this.onClickHandler}
            >
              Send!
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EnterTextArea;
