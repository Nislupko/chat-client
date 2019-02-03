import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Lobby.module.css';

class Lobby extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-9">
            <div className={styles.Lobby}>
              <h1>Live rooms</h1>
              <div className={styles.RoomList}>
                {this.props.rooms ? (
                  this.props.rooms.map((room, index) => (
                    <NavLink key={index} to={'/rooms/' + room.id}>
                      <div className="list-group-item m-1 ">
                        {`Room ${room.id}`}
                      </div>
                    </NavLink>
                  ))
                ) : (
                  <div className={styles.RoomList}>
                    Connection Error. Try later
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="col-sm">
            <div className={styles.extraMargin}>
              <button className="btn-primary " onClick={this.props.handler}>
                New Room
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Lobby;
