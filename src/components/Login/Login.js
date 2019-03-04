import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { updateUser } from "./../../ducks/reducer";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    // using the bind method in your constructor is the second way you can bind
    this.register = this.register.bind(this);
  }
  componentDidMount() {
    this.checkUser();
  }
  // writing your method as an arrow function is the third way you can bind
  checkUser = async () => {
    const {id} = this.props;
    if (!id) {
      try {
        let res = await axios.get("/api/current");
        this.props.updateUser(res.data)
        this.props.history.push('/private');
      } catch (err) {
      }
    } else {
      this.props.history.push('/private')
    }
  }
  handleChange(prop, val) {
    this.setState({
      // by wrapping the property name in square brackets, the property can use a variable/parameter to determine its name
      // when we use this method for our inputs below, we pass in what property of state we want to update as the first parameter, and the input value as the second
      [prop]: val
    });
  }
  async register() {
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    try {
      let res = await axios.post("/auth/register", user);
      this.props.updateUser(res.data);
      this.props.history.push("/private");
    } catch (err) {
      alert("Choose a unique username");
    }
  }
  login = async () => {
    let user = {
      username: this.state.username,
      password: this.state.password
    };
    try {
      let res = await axios.post("/auth/login", user);
      this.props.updateUser(res.data);
      this.props.history.push("/private");
    } catch (err) {
      alert("Incorrect username or password");
    }
  };
  render() {
    const { username, password } = this.state;
    return (
      <div>
        <input
          value={username}
          onChange={e => this.handleChange("username", e.target.value)}
        />
        <input
          type="password"
          value={password}
          // Wrapping your method in an arrow funtion in your render is the first way you can bind
          onChange={e => this.handleChange("password", e.target.value)}
        />
        <button onClick={this.register}>Register</button>
        <button onClick={this.login}>Login</button>
      </div>
    );
  }
}
const mapStateToProps = reduxState => {
  return {
    id: reduxState.id
  };
};
const mapDispatchToProps = {
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
