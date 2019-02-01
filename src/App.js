import React, { Component } from 'react';
import {Route, Switch,NavLink} from 'react-router-dom'
import Room from "./containers/Room/Room"
import Lobby from "./containers/Lobby/Lobby"
import Auth from "./containers/Auth/Auth"
import styles from './App.module.css'
import Layout from "./containers/hoc/Layout";

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            currentUser: "Guest_"+Math.floor(Math.random()*10000),
            users:[],
            rooms:[{id:1},{id:2},{id:3}],
        }
    }
    //Если было введено новое имя - меняем на него, иначе оставляем предыдущее
    onInputHandler = (userName) => {
        this.setState({
            currentUser: userName||this.state.currentUser
        })
    }

    render() {

    //Рендерим хедер с навигационным меню
    return (
            <Layout>
                <div className={styles.menu}>
                    <div className={styles.link}>
                        <NavLink to="/" exact>Re-Auth</NavLink>
                    </div>
                    <div>
                        <NavLink to = "/rooms" exact>Lobby</NavLink>
                    </div>
                </div>
                    <Switch>
                        <Route path="/" exact render={()=><Auth handler={this.onInputHandler} user={this.state.currentUser}/>} />
                        <Route path="/rooms/:id" exact render = {(props) => <Room {...props} params={this.state} />} />
                        <Route path="/rooms" exact render = {() => <Lobby rooms={this.state.rooms}/>} />
                    </Switch>
            </Layout>
    );
  }
}

export default App;