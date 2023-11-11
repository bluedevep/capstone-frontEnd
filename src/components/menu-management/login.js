import React, { Component } from "react";
import axios from 'axios'; 

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorText: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    
  }


  

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ""
    });
  }

  /*
  http://127.0.0.1:5000 route /login, post 
  */

  handleSubmit(event) {
    axios.post('https://fangaloka-db-b7b295303892.herokuapp.com/login', {
      username: this.state.username,
      password: this.state.password
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      // Check if the login was successful without using a token
      if (response.data.message === 'Login successful') {
        // Handle successful login
        this.props.history.push("/menu-manager"); // Redirect to the main route
      } else {
        // Handle unsuccessful login
        this.setState({
          errorText: "Wrong username or password"
        });
        this.props.handleUnsuccessfulAuth();
      }
    })
    .catch(error => {
      // Handle other errors
      this.setState({
        errorText: "An error occurred"
      });
    });
  
    event.preventDefault();
  }
  

  render() {
    return (
      <div>
        <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>

        <div>{this.state.errorText}</div>
        
        <form onSubmit={this.handleSubmit}>
          
          <input
            type="text"
            name="username"
            placeholder="Your username"
            value={this.state.username}
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}