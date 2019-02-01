import React, { Component } from 'react';
import styles from './Room.module.css';
import EnterTextArea from "../../components/EnterTextArea/EnterTextArea";
import MessageArea from "../../components/MessageArea/MessageArea";
import CurrentUsersArea from "../../components/CurrentUsersArea/CurrentUsersArea";

class Room extends Component {
    constructor(props){
        super(props)
        this.state={
            roomID: this.props.match.params.id,
            currentUser:this.props.params.currentUser,
            currentConnection: this.createNewConnection(),
            users:[],
            messages:[]
        }
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
                //Сообщаем серверу, что пользователь вошел в комнату
                const msg = {
                    type: 'NewEntry',
                    user: this.state.currentUser,
                    room: this.state.roomID
                }
                this.state.currentConnection.send(JSON.stringify(msg))
                //Когда получаем первый(NewEntry) и последующий(NewMessage/RefreshList) ответы - обновляем state
                result.onmessage = (event) =>  {
                    const response = JSON.parse(event.data)
                    switch(response.type){
                        case "NewEntry" :
                            this.setState({
                                users: response.users,
                                messages:response.messages
                            })
                            break
                        case "NewMessage":
                            this.setState({
                                messages:response.messages
                            })
                            break
                        case "RefreshList":
                            this.setState({
                                users:response.users
                            })
                            break
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

    //Если было отправлено непустое сообщение - отправляем его на сервер
    onMessageSendHandler = (elem) => {
        if(elem.replace(/\s*/gi,'')){
            const msg = {
                type: 'NewMessage',
                user: this.state.currentUser,
                content: elem,
                room: this.state.roomID
            }
            this.state.currentConnection.send(JSON.stringify(msg))
        }
    }
    //При выходе из комнаты закрываем соединение
    componentWillUnmount() {
        this.state.currentConnection.close()
    }

    render() {
        return (
            <div>
                <h2>Welcome to the chat-room #{this.state.roomID}, {this.state.currentUser}</h2>
                <div className={styles.Content}>
                    <div className={styles.UpperBlock}>
                        <div id='auto-scroll-bottom' className={styles.UpperBlockLeft}>
                            <MessageArea messages={this.state.messages}/>
                        </div>
                        <div className={styles.UpperBlockRight}>
                            <CurrentUsersArea users={this.state.users}/>
                        </div>
                    </div>
                    <div className={styles.DownBlock}>
                        <EnterTextArea handler={this.onMessageSendHandler}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Room;