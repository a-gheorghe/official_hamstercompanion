import React from 'react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  submit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <h3>Register</h3>
        <form onSubmit={e => this.submit(e)}>
          <input type="text" name="username" placeholder="username" />
          <input type="password" name="password" placeholder="password" />
          <input type="submit" />
        </form>
        <h5>Already have an account?</h5>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

export default Register;
