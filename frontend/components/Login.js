import React from 'react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  submit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={e => this.submit(e)}>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          <input type="submit" />
        </form>
        <h5>Don't have an account?</h5>
        <Link to="/register">Register</Link>
      </div>
    );
  }
}

export default Login;
