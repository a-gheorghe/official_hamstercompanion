import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/treatmentGroups.css';

class MouseEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mouse: null
    };
  }

  componentWillMount() {
    axios.get(`/api/experiment/${this.props.match.params.id}/mouse/${this.props.match.params.mouseId}`).then(resp => {
      this.setState({mouse: resp.data});
    }).catch(e => console.log(e));
  }

  render() {
    if (this.state.mouse === null) return null;
    return (this.state.mouse ? (
      <div id="dashboard-container">
        <h1>Mouse: {this.state.mouse.id}</h1>
      </div>
    ) : (
      <div>
        <p className="error-msg">You do not have access to this experiment.</p>
        <Link to="/" className={"back-btn"}><button>Back to Experiments</button></Link>
      </div>
    ));
  }
}

export default MouseEdit;
