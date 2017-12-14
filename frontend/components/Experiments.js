import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import DisplayBox from './DisplayBox';
import axios from 'axios';
import './styles/experiments.css';

class Experiments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exps: [],
      id: '',
      password: '',
      error: ''
    };
  }

  componentWillMount() {
    axios.get('/api/experiments').then(resp => {
      this.setState({exps: resp.data});
    }).catch(e => console.log(e));
  }

  submit(e) {
    e.preventDefault();
    axios.post('/api/join/experiment', {
      id: this.state.id,
      password: this.state.password
    }).then(resp => {
      if (!resp.data.success) this.setState({ error: resp.data.error });
      else {
        this.componentWillMount();
        this.setState({ id: '', password: '' });
      }
    });
  }

  logout() {
    axios.get('/logout').then(resp => {
      if (resp.data) this.props.logout();
      else alert('Sorry, there was an error');
    }).catch(e => console.log(e));
  }

  changeId(e) {
    this.setState({ id: e.target.value });
  }

  changePass(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <div className="col">
        <h1>Experiments</h1>
        <div id="boxes">
          {this.state.exps.map(e => (
            <DisplayBox key={e.id} experiment={e} />
          ))}
        </div>
        <h3>Join an Experiment</h3>
        { this.state.error ?
          <p style={{ color: 'red' }}>{this.state.error}</p> :
          null }
        <form className="col form" onSubmit={e => this.submit(e)}>
          <input type="text" name="id" placeholder="Experiment ID"
            value={this.state.id} onChange={e => this.changeId(e)}
          />
          <input type="password" name="password"
            placeholder="Experiment Password"
            value={this.state.password} onChange={e => this.changePass(e)}
          />
          <input type="submit" />
        </form>
        <Link className="btn box" to="/new/experiment">Create a new experiment</Link>
        <button className="btn box" onClick={e => this.logout(e)}>Logout</button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch({ type: 'LOGOUT' })
});

export default connect(null, mapDispatchToProps)(Experiments);
