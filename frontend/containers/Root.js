import React from 'react';
import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Provider, connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import ViewingContainer from './ViewingContainer.js';
import UserContainer from './UserContainer.js';
import '../css/main.css';

class Root extends React.Component {
  componentWillMount() {
    axios.get('/api/isLoggedIn').then(resp => {
      if (resp.data) this.props.login();
      else this.props.logout();
    }).catch(e => console.log(e));
  }
  render() {
    if (this.props.loggedIn === 'pending') return <div />;
    return (
      <Provider store={this.props.store}>
        <BrowserRouter>
          <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
            { this.props.loggedIn ?
              <UserContainer /> :
              <ViewingContainer /> }
          </MuiThemeProvider>
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
