import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false
    };
  }

  submit(e) {
    e.preventDefault();
    axios.post('/auth/register', {
      username: e.target.username.value,
      password: e.target.password.value
    }).then(resp => {
      if (resp.data.success) this.setState({ registered: true });
    }).catch(err => console.log(err));
  }

  render() {
    if (this.state.registered) return <Redirect to="/login" />;

    return (
      <div>
        <h3>Register</h3>
        <form className="col form" onSubmit={e => this.submit(e)}>
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
