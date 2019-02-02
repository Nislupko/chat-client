import React, {Component} from 'react'
import styles from './Auth.module.css'

export default class Auth extends Component {
  state={
    inputName:''
  }
  updateInputName = (e) => {
      this.setState({
          inputName:e.target.value
      })
  }
  onClickHandler = (e) => {
        e.preventDefault()
        this.props.handler(this.state.inputName)
        this.setState({
            inputName:''
        })
  }
  render() {
    return (
        <div className={styles.Container}>
          <div className={styles.Auth}>
              <div className={styles.Center}>
                  <h3>You are logged as <i>{this.props.user}</i></h3>
              </div>
              <div className={styles.Center}>
                  <input value={this.state.inputName}
                         onChange={e =>this.updateInputName(e)}
                  />
                  <button onClick={this.onClickHandler}
                  >
                      Click
                  </button>
              </div>
              <div>
                  {this.props.errorMessage}
              </div>
          </div>
        </div>
    )
  }
}