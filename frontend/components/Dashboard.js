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
      console.log(resp.data);
      this.setState({experiment: resp.data});
    }).catch(e => console.log(e));
  }

  render() {
    return (this.state.experiment ? (
      <div id="dashboard-container">
        <div id="dashboard-header"><h1>Dashboard: {this.state.experiment.name}</h1></div>
        <div id="dashboard-main">
          <div id="dashboard-info">
            <h3>Experiment ID: {this.state.experiment.id}</h3>
            <h3>Description: {this.state.experiment.description}</h3>
          </div>
          <div id="dashboard-btn-bank">
            <div id="column">
              <Link to={`/experiment/${this.state.experiment.id}/groups`}><button>Treatment Groups: </button></Link>
            </div>
            <Link to={`/experiment/${this.state.experiment.id}/cages`}><button>Cages: </button></Link>
            <Link to={`/experiment/${this.state.experiment.id}/mice`}><button>Mice: </button></Link>
          </div>
        </div>
        <Link to="/" className={"back-btn"}><button>Back to Experiments</button></Link>
      </div>
    ) : (
      <div>
        <p className="error-msg">You do not have access to this experiment.</p>
        <Link to="/" className={"back-btn"}><button>Back to Experiments</button></Link>
      </div>
    ));
  }
}

export default Dashboard;
