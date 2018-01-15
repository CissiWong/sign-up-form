import React from "react"
import "./style.css"

export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  handlePassword = event => {
    this.setState({ password: event.target.value })
  }
  handleUsername = event => {
    this.setState({ username: event.target.value })
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch(
      "http://localhost:8080/login",
      {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(this.state)
      }).then(response => {
      response.json()
    })
    this.setState({
      username: "",
      password: ""
    })
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}>
        <div className="signin-container">
          <label>
            <h1>Sign in</h1>
            <div className="username">
              <input
                placeholder="username"
                value={this.state.username}
                onChange={this.handleUsername}
                type="text"
                required />
            </div>
            <div className="password">
              <input
                placeholder="password"
                value={this.state.password}
                onChange={this.handlePassword}
                type="password"
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                // title="Password must contain at least 8 characters, one uppercase, one lowercase and one symbol."
                required />
            </div>
            <button
              text="sign in"
              className="send-btn"
              type="submit">sign up
            </button>
          </label>
        </div>
      </form>
    )
  }
}
