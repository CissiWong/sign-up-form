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
      <form>
        <label
          className="username">
          <input
            value={this.state.username}
            onChange={this.addUsername}
            type="text" />
          <button
            onClick={this.handleSubmit}
            type="submit" />
        </label>
        <label className="email">
          <input
            value={this.state.email}
            onChange={this.addEmail}
            type="text"
            required />
          <button
            onClick={this.handleSubmit}
            type="submit" />
        </label>
        <label
          className="password">
          <input
            value={this.state.password}
            onChange={this.addPassword}
            type="text" />
          <button
            onClick={this.handleSubmit}
            type="submit" />
        </label>
      </form>
    )
  }
}
