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

  render() {
    return (
      <div className="col">
        <h1>Experiments</h1>
        {this.state.exps.map(e => (
          // <div key={e.id}>{JSON.stringify(e)}</div>
          <Link to={`/experiment/${e.id}`} key={e.id}>{e.name}</Link>
        ))}
      </div>
    );
  }
}

export default Experiments;
