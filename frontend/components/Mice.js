import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/mice.css';

class Mice extends React.Component {
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
      <div id="dashboard-container">
        <h1>Mice: {this.state.experiment.name}</h1>
        <Link to={`/experiment/${this.state.experiment.id}/`} className={"back-btn"}><button>Back to Dashboard</button></Link>
      </div>
    ) : (
      <div>
        <p className="error-msg">You do not have access to this experiment.</p>
        <Link to="/" className={"back-btn"}><button>Back to Experiments</button></Link>
      </div>
    ));
  }
}

export default Mice;
