import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import './styles/login.css';

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
      console.log(err);
      this.setState({
        loginError: `Incorrect username/password combination`
      });
    });
  }

  render() {
    return (
      <div id="login-container">
        <div id="left-side" className="main-column">
          <div id="feature-list">
            <div className="feature-item">
              <div className="mouse-bullet-point color-inverted">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Mouse_cartoon.svg/2000px-Mouse_cartoon.svg.png" alt = ""/>
              </div>
              <h2>Cool product feature #1</h2>
            </div>
            <div className="feature-item">
              <div className="mouse-bullet-point color-inverted">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Mouse_cartoon.svg/2000px-Mouse_cartoon.svg.png" alt = ""/>
              </div>
              <h2>Amazing product feature #2</h2>
            </div>
            <div className="feature-item">
              <div className="mouse-bullet-point color-inverted">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Mouse_cartoon.svg/2000px-Mouse_cartoon.svg.png" alt = ""/>
              </div>
              <h2>Groundbreaking product feature #3</h2>
            </div>
          </div>
          <div className="fixed-image-container" id="fixed-image-container-1">
            <img id="test-tubes" src="http://www.clker.com/cliparts/g/e/N/n/k/Q/test-tubes-md.png" alt=""/>
            <img id="sniffing-mouse" src="https://image.flaticon.com/icons/png/512/47/47240.png" alt=""/>
          </div>
        </div>
        <div id="login-form-container" className="main-column">
          <h1>Login</h1>
          { this.state.loginError ? <p style={{ color: 'red' }}>{this.state.loginError}</p> : null }
          <form className="col form" id="login-form" onSubmit={e => this.submit(e)}>
            <h3>Login</h3>
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <input type="submit" id="big-submit-btn" />
            <p className="error-msg">{this.state.loginError ? `Error: ${this.state.loginError}` : ''}</p>
          </form>
        </div>
        <div id="right-side" className="main-column">
          <div id="mouse-register-btn"><img src={`http://weclipart.com/gimg/A0F8CD424E369A2C/cute-mouse-silhouette.png`}/></div>
          <Link to="/" id="register-btn">Register</Link>
          <div className="fixed-image-container">
            <img id="flask" src="http://www.clker.com/cliparts/Q/K/x/q/i/P/empty-erlenmeyer-flask-md.png" alt=""/>
            <img id="curious-mouse" src="https://img.clipartxtras.com/c9490d6d5087f542980b90624ab29347_mouse-clipart-clipartpen-black-mouse-clipart_333-261.png" alt=""/>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: 'LOGIN' })
});

export default connect(null, mapDispatchToProps)(Login);
