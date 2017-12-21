import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginError: ''
    };
  }

  submit(e) {
    e.preventDefault();
    axios.post('/api/login', {
      username: e.target.username.value,
      password: e.target.password.value
    }).then(resp => {
      if (resp.data) this.props.login();
    }).catch((err) => {
      this.setState({
        loginError: `Incorrect username/password combination`
      });
    });
  }

  render() {
    return (
      <form className="col form" onSubmit={e => this.submit(e)}>
        <h2>Login</h2>
        <input type="text" name="username" placeholder="Username" />
        <input type="password" name="password" placeholder="Password" />
        <RaisedButton label="Submit" primary type="submit" />
        <p className="error-msg">{this.state.loginError ? `Error: ${this.state.loginError}` : ''}</p>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: 'LOGIN' })
});

export default connect(null, mapDispatchToProps)(Login);
