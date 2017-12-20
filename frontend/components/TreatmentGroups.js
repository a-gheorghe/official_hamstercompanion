import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/treatmentGroups.css';

class TreatmentGroupEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      group: null
    };
  }

  componentWillMount() {
    axios.get(`/api/experiment/${this.props.match.params.id}/group/${this.props.match.params.groupId}`).then(resp => {
      this.setState({group: resp.data});
    }).catch(e => console.log(e));
  }

  render() {
    if (this.state.group === null) return null;
    return (this.state.group ? (
      <div id="dashboard-container">
        <h1>Treatment Group: {this.state.group.name}</h1>
      </div>
    ) : (
      <div>
        <p className="error-msg">You do not have access to this experiment.</p>
        <Link to="/" className={"back-btn"}><button>Back to Experiments</button></Link>
      </div>
    ));
  }
}

export default TreatmentGroupEdit;
