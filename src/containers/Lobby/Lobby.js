import React, { Component } from 'react';
import {NavLink} from 'react-router-dom'
import styles from './Lobby.module.css'

class Lobby extends Component {
    state={
        rooms:[],
        currentConnection:this.createNewConnection()
    }
    async createNewConnection() {
        //Создаем новое сокет-подключение
        let promise = new Promise((resolve, reject) => {
            let socket = new WebSocket('ws://localhost:4000')
            socket.onopen = () => resolve(socket)
            socket.onerror = (error) => reject(error)
        });
        //Когда будет создано - обновляем state
        promise.then(
            result => {
                this.setState({
                    currentConnection:result
                })
                //Получаем список существующих комнат от сервера
                const msg = {type: 'RoomsList'}
                this.state.currentConnection.send(JSON.stringify(msg))
                result.onmessage = (event) =>  {
                    const response = JSON.parse(event.data)
                    switch(response.type){
                        case "RoomsList" :
                            this.setState({
                                rooms: response.rooms,
                            })
                            console.log(this.state)
                            break;
                        default:
                            console.log('Unknown response from server')
                    }
                }
            },
            error => {
                console.log(`Error ${error}. Please, tell admin about this issue`)
            }
        )
    }

    onNewRoomHandler = () => {
        console.log('inside newRoom')
        const msg = {
            type: "NewRoom"
        }
        this.state.currentConnection.send(JSON.stringify(msg))
    }

    componentWillUnmount() {
        this.state.currentConnection.close()
    }

    render() {
    return (
        <div className={styles.Lobby}>
            <h1>Live rooms</h1>
            <ul>
                {this.state.rooms.map((room,index)=><li key={index}><NavLink to={'/rooms/'+room.id}>{`Room ${room.id}`}</NavLink></li>)}
            </ul>
            <button onClick={this.onNewRoomHandler}>New Room</button>
        </div>
    )
  }
}

export default Lobby