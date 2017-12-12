import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Experiments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exps: []
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
      id: e.target.id.value,
      password: e.target.password.value
    }).then(resp => {
      if (!resp.data) alert('Incorrect password!');
      else this.componentWillMount();
    });
  }

  render() {
    return (
      <div className="col">
        <h1>Experiments</h1>
        {this.state.exps.map(e => (
          // <div key={e.id}>{JSON.stringify(e)}</div>
          <Link to={`/experiment/${e.id}`} key={e.id}>{e.name}</Link>
        ))}
        <h3>Join an Experiment</h3>
        <form className="col form" onSubmit={e => this.submit(e)}>
          <input type="text" name="id" placeholder="Experiment ID" />
          <input type="password" name="password" placeholder="Experiment Password" />
          <input type="submit" />
        </form>
        <Link to="/new/experiment">Create a new experiment</Link>
      </div>
    );
  }
}

export default Experiments;
