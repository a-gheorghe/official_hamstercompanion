import PropTypes from 'prop-types';
import React from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import ViewingContainer from './ViewingContainer.js';
import UserContainer from './UserContainer.js';

class Root extends React.Component {
  componentWillMount() {
    axios.get('/auth/isLoggedIn').then(resp => {
      if (resp.data) this.props.login();
      else this.props.logout();
    }).catch(e => console.log(e));
  }
  render() {
    if (this.props.loggedIn === 'pending') return <div />;
    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          { this.props.loggedIn ?
            <div><UserContainer /></div> :
            <div><ViewingContainer /></div> }
        </BrowserRouter>
      </Provider>
    );
  }
}

const mapStateToProps = state => ({
  loggedIn: state.loggedIn
});

const mapDispatchToProps = dispatch => ({
  login: () => dispatch({ type: 'LOGIN' }),
  logout: () => dispatch({ type: 'LOGOUT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};
