import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import styles from './Lobby.module.css'

class Lobby extends Component {
    render() {console.log(this.props)
    return (
        <div className={styles.Lobby}>
            <h1>Live rooms</h1>
            <ul>
                {this.props.rooms.map((room,index)=><li key={index}><NavLink to={'/rooms/'+room.id}>{`Room ${room.id}`}</NavLink></li>)}
            </ul>
            <button onClick={this.props.handler}>New Room</button>
        </div>
    )
  }
}

export default Lobby