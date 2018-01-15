import React from "react"
import "./style.css"

export default class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      accesstoken: ""
    }
  }
  render() {
    return (
      <form>
        <div className="signin-container">
          <label>
            <h1>Sign in</h1>
            <div className="username">
              <input
                placeholder="username"
                // value={this.state.username}
                // onChange={this.addUsername}
                type="text"
                required />
            </div>
            <div className="password">
              <input
                placeholder="password"
                value={this.state.password}
                // onChange={this.addPassword}
                type="password"
                // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                title="Password must contain at least 8 characters, one uppercase, one lowercase and one symbol."
                required />
            </div>
            <button
              text="sign in"
              className="submit-btn"
              type="submit">sign up
            </button>
          </label>
        </div>
      </form>
    )
  }
}
