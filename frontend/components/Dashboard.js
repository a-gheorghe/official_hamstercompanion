import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experiment: false
    };
  }
  componentWillMount() {
    axios.get('/api/experiment/' + this.props.match.params.id).then(resp => {
      this.setState({experiment: resp.data});
    }).catch(e => console.log(e));
  }

  render() {
    return (this.state.experiment ? (
      <div>
        <h1>Experiment Dashboard</h1>
        <h2>{this.state.experiment.name}</h2>
        <h3>Experiment ID: {this.state.experiment.id}</h3>
        <p>{this.state.experiment.description}</p>
        <Link to="/">Back to Experiments</Link>
      </div>
    ) : (
      <div>
        <p className="error-msg">You do not have access to this experiment.</p>
        <Link to="/">Back to Experiments</Link>
      </div>
    ));
  }
}

export default Dashboard;
