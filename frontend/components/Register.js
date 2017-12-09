import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './styles/register.css';

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
      <div id="register-container">
        <div id="mouse-login-btn"><img src={`http://weclipart.com/gimg/A0F8CD424E369A2C/cute-mouse-silhouette.png`}/></div>
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
          <img id="test-tubes" src="http://www.clker.com/cliparts/g/e/N/n/k/Q/test-tubes-md.png" alt=""/>
          <img id="blue-flask" src="http://www.clker.com/cliparts/8/b/1/8/12375604602121138608pitr_Lab_icon_3.svg.med.png" alt=""/>
          <img id="sniffing-mouse" src="https://image.flaticon.com/icons/png/512/47/47240.png" alt=""/>
          <img id="curious-mouse" src="https://img.clipartxtras.com/c9490d6d5087f542980b90624ab29347_mouse-clipart-clipartpen-black-mouse-clipart_333-261.png" alt=""/>
        </div>
        <div id="right-side">
          <h3>Register</h3>
          <form className="col form" onSubmit={e => this.submit(e)}>
            <input type="text" name="username" placeholder="username" />
            <input type="password" name="password" placeholder="password" />
            <input type="submit" />
          </form>
          <h5>Already have an account?</h5>
          <Link to="/login">Login</Link>
        </div>
      </div>
    );
  }
}

export default Register;
