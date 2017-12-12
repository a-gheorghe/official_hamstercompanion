import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import './styles/login.css';

class Login extends React.Component {
  submit(e) {
    e.preventDefault();
    axios.post('/auth/login', {
      username: e.target.username.value,
      password: e.target.password.value
    }).then(resp => {
      if (resp.data) this.props.login();
    }).catch(err => console.log("error", err));
  }

  render() {
    return (
      <div id="login-container">
        <div id="mouse-login-btn"><img src={`http://weclipart.com/gimg/A0F8CD424E369A2C/cute-mouse-silhouette.png`}/></div>
        <h3>Login</h3>
        <form className="col form" onSubmit={e => this.submit(e)}>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          <input type="submit" />
        </form>
        <Link to="/" id="register-btn">Register</Link>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: 'LOGIN' })
});

export default connect(null, mapDispatchToProps)(Login);
