import React, { Component } from 'react';
import styles from './Room.module.css';
import EnterTextArea from '../../components/EnterTextArea/EnterTextArea';
import MessageArea from '../../components/MessageArea/MessageArea';
import CurrentUsersArea from '../../components/CurrentUsersArea/CurrentUsersArea';

class Room extends Component {
  //Уведомляем о входе и получаем информацию о комнате
  componentWillMount() {
    console.log(this.props);
    this.props.onEntryHandler(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.onExitHandler();
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <h4 className="p-2">
                {this.props.params.currentUser}, welcome to the room #{this.props.params.currentRoom}!
              </h4>
            </div>
          </div>
          <div className="row ">
            <div className="col-9">
              <MessageArea messages={this.props.params.messages} />
            </div>
            <div className="col-3">
              <CurrentUsersArea users={this.props.params.users} />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <div className={styles.marginInput}>
                <EnterTextArea onMessageHandler={this.props.onMessageHandler} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Room;