import React, { Component } from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';
import Room from './containers/Room/Room';
import Lobby from './containers/Lobby/Lobby';
import Auth from './containers/Auth/Auth';
import styles from './App.module.css';
import Layout from './containers/Layout/Layout';
import openSocket from 'socket.io-client';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Guest_' + Math.floor(Math.random() * 10000),
      currentRoom: null,
      socket: null,
      users: [],
      rooms: [],
      messages: [],
      errorMessage: ''
    };
  }

  async createNewSocket(context) {
    const socket = openSocket('http://localhost:4000');
    socket.emit('initial', JSON.stringify(this.state.currentUser));
    socket.emit('room_list');
    socket.on('room_list', function(data) {
      const response = JSON.parse(data);
      context.setState({
        rooms: response.rooms
      });
    });
    socket.on('new_message', function(data) {
      const response = JSON.parse(data);
      console.log(response);
      context.setState({
        messages: response.messages
      });
    });
    socket.on('new_entry', function(data) {
      const response = JSON.parse(data);
      console.log(response);
      context.setState({
        users: response.users
      });
    });
    socket.on('bad_name', function(data) {
      console.log('bad_name');
      context.setState({
        errorMessage: `${data} is already in use. Try another name`
      });
    });
    socket.on('good_name', function(data) {
      console.log('good_name');
      context.setState({
        errorMessage: ``,
        currentUser: data
      });
    });
    context.setState({ socket: socket });
  }

  UNSAFE_componentWillMount() {
    this.createNewSocket(this);
  }

  onEntryHandler = room => {
    this.setState({
      currentRoom: room
    });
    this.state.socket.emit(
      'new_entry',
      JSON.stringify({ user: this.state.currentUser, room: room })
    );
  };
  onExitHandler = () => {
    this.state.socket.emit(
      'exit_room',
      JSON.stringify({
        user: this.state.currentUser,
        room: this.state.currentRoom
      })
    );
    this.setState({
      currentRoom: null,
      messages: [],
      users: []
    });
  };
  //Если было введено новое имя - меняем на него, иначе оставляем предыдущее
  onInputHandler = userName => {
    this.state.socket.emit('change_name', userName);
  };
  onMessageHandler = text => {
    this.state.socket.emit(
      'create_message',
      JSON.stringify({
        user: this.state.currentUser,
        room: this.state.currentRoom,
        content: text
      })
    );
  };
  onNewRoom = () => this.state.socket.emit('new_room');

  render() {
    //Рендерим хедер с навигационным меню
    return (
      <Layout>
        <nav className="navbar navbar-light bg-light">
          <a className="navbar-brand" href="#">
            CoolChat
          </a>
          <ul className="navbar-nav">
            <div className={styles.menu}>
              <li className="nav-item">
                <NavLink className="nav-link" to="/rooms" exact>
                  Lobby
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/" exact>
                  Re-Auth
                </NavLink>
              </li>
            </div>
          </ul>
        </nav>
        <div />
        <Switch>
          <Route
            path="/"
            exact
            render={() => (
              <Auth
                handler={this.onInputHandler}
                user={this.state.currentUser}
                errorMessage={this.state.errorMessage}
              />
            )}
          />
          <Route
            path="/rooms/:id"
            exact
            render={props => (
              <Room
                {...props}
                params={this.state}
                onMessageHandler={this.onMessageHandler}
                onEntryHandler={this.onEntryHandler}
                onExitHandler={this.onExitHandler}
              />
            )}
          />
          <Route
            path="/rooms"
            exact
            render={() => (
              <Lobby rooms={this.state.rooms} handler={this.onNewRoom} />
            )}
          />
        </Switch>
      </Layout>
    );
  }
}

export default App;
