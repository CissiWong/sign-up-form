import React from "react"
import "./style.css"

export default class Form extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: [],
      email: [],
      password: []
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    fetch("http://localhost:8080/users", {
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    }).then(response => {
      return response.json()
    })
    this.setState({
      username: "",
      email: "",
      password: ""
    })
  }

  addUsername = event => {
    this.setState({
      username: event.target.value
    })
  }

  addEmail = event => {
    this.setState({
      email: event.target.value
    })
  }

  addPassword = event => {
    this.setState({
      password: event.target.value
    })
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}>
        <label>
          <input
            value={this.state.username}
            onChange={this.addUsername}
            type="text"
            required />
          <input
            value={this.state.email}
            onChange={this.addEmail}
            type="email"
            required />
          <input
            value={this.state.password}
            onChange={this.addPassword}
            type="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Password must contain at least 8 characters, one uppercase, one lowercase and one symbol."
            required />
          <button
            type="submit" />
        </label>
      </form>
    )
  }
}
