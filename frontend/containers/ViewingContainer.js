import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Register from '../components/Register';
import Login from '../components/Login';
import '../components/styles/view.css';

const ViewingContainer = () => {
  return (
    <div id="router-container">
      <div id="header">
        <h1>Hamster Companion</h1>
        <div id="mouse-btn"><img src={`http://weclipart.com/gimg/A0F8CD424E369A2C/cute-mouse-silhouette.png`}/></div>
        <Route path="/" exact render={() => <Link to="/login" id="login-btn">Login</Link>} />
        <Route path="/login" render={() => <Link to="/" id="register-btn">Register</Link>} />
      </div>
      <div id="body-container">
        <div id="left-side">
          <Features />
          <img id="test-tubes" src="http://www.clker.com/cliparts/g/e/N/n/k/Q/test-tubes-md.png" alt=""/>
          <img id="sniffing-mouse" src="https://image.flaticon.com/icons/png/512/47/47240.png" alt=""/>
        </div>
        <div id="middle">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" exact component={Register} />
            <Redirect to="/" />
          </Switch>
        </div>
        <div id="right-side">
          <img id="blue-flask" src="http://www.clker.com/cliparts/8/b/1/8/12375604602121138608pitr_Lab_icon_3.svg.med.png" alt=""/>
          <img id="curious-mouse" src="https://img.clipartxtras.com/c9490d6d5087f542980b90624ab29347_mouse-clipart-clipartpen-black-mouse-clipart_333-261.png" alt=""/>
        </div>
      </div>
    </div>
  );
};

const Features = () => (
  <div className="col">
    <div className="feature-item">
      <div className="mouse-bullet-point color-inverted">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Mouse_cartoon.svg/2000px-Mouse_cartoon.svg.png" alt = ""/>
      </div>
      <h2>High-detailed data results right at your fingertips</h2>
    </div>
    <div className="feature-item">
      <div className="mouse-bullet-point color-inverted">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Mouse_cartoon.svg/2000px-Mouse_cartoon.svg.png" alt = ""/>
      </div>
      <h2>Real-time info on each group, cage, and mouse</h2>
    </div>
  </div>
);

export default ViewingContainer;
