import React from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { RaisedButton } from 'material-ui';
import './styles/register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      registered: false,
      error: ''
    };
  }

  submit(e) {
    e.preventDefault();
    if (!e.target.password.value) {
      this.setState({ error: 'Password is required!' });
    } else if (e.target.password.value !== e.target.passRepeat.value) {
      this.setState({ error: 'Passwords do not match!' });
    } else if (!e.target.username.value) {
      this.setState({ error: 'Username is required! '});
    } else {
      axios.post('/api/register', {
        fName: e.target.fname.value || null,
        lName: e.target.lname.value || null,
        email: e.target.email.value || null,
        username: e.target.username.value,
        password: e.target.password.value
      }).then(resp => {
        if (resp.data.success) this.setState({ registered: true });
        else this.setState({ error: resp.data.error });
      }).catch(err => console.log(err));
    }
  }

  render() {
    console.log(this.state);
    if (this.state.registered) return <Redirect to="/login" />;

    return (
      <form className="col form" onSubmit={e => this.submit(e)}>
        <h2>Register</h2>
        { this.state.error ? <p style={{ color: 'red' }}>{this.state.error}</p> : "" }
        <input type="text" name="fname" placeholder="First Name" />
        <input type="text" name="lname" placeholder="Last Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <input type="password" name="passRepeat" placeholder="Repeat Password" />
        <RaisedButton label="Submit" primary type="submit" />
      </form>
    );
  }
}

export default Register;
