import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/treatmentGroups.css';

class CageEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cage: null
    };
  }

  componentWillMount() {
    axios.get(`/api/experiment/${this.props.match.params.id}/cage/${this.props.match.params.cageId}`).then(resp => {
      this.setState({cage: resp.data});
    }).catch(e => console.log(e));
  }

  render() {
    if (this.state.cage === null) return null;
    return (this.state.cage ? (
      <div id="dashboard-container">
        <h1>Cage: {this.state.cage.name}</h1>
      </div>
    ) : (
      <div>
        <p className="error-msg">You do not have access to this experiment.</p>
        <Link to="/" className={"back-btn"}><button>Back to Experiments</button></Link>
      </div>
    ));
  }
}

export default CageEdit;
