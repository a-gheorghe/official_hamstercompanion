import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
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
    if (this.state.registered) return <Redirect to="/login" />;

    return (
      <div id="register-container">
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
        <div id="registration-form-container" className="main-column">
          <h1>Register</h1>
          { this.state.error ? <p style={{ color: 'red' }}>{this.state.error}</p> : null }
          <form className="col form" id="register-form" onSubmit={e => this.submit(e)}>
            <input type="text" name="fname" placeholder="First Name" />
            <input type="text" name="lname" placeholder="Last Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <input type="password" name="passRepeat" placeholder="Repeat Password" />
            <input type="submit" id="big-submit-btn"/>
          </form>
        </div>
        <div id="right-side" className="main-column">
          <div id="mouse-login-btn"><img src={`http://weclipart.com/gimg/A0F8CD424E369A2C/cute-mouse-silhouette.png`}/></div>
          <Link to="/login" id="login-btn">Login</Link>
          <div className="fixed-image-container">
            <img id="flask" src="http://www.clker.com/cliparts/Q/K/x/q/i/P/empty-erlenmeyer-flask-md.png" alt=""/>
            <img id="curious-mouse" src="https://img.clipartxtras.com/c9490d6d5087f542980b90624ab29347_mouse-clipart-clipartpen-black-mouse-clipart_333-261.png" alt=""/>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
