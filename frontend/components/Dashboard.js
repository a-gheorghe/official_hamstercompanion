import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './styles/dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experiment: false,
      groupSelected: null,
      cageSelected: null,
    };
  }
  componentWillMount() {
    axios.get('/api/experiment/' + this.props.match.params.id).then(resp => {
      console.log(resp.data);
      this.setState({experiment: resp.data});
    }).catch(e => console.log(e));
  }

  selectGroup(evt, index) {
    evt.preventDefault();
    var newGroup = this.state.experiment.treatment_groups[index];
    this.setState({
      groupSelected: newGroup,
      cageSelected: null
    });
  }

  selectCage(evt, index) {
    evt.preventDefault();
    var newCage = this.state.groupSelected.cages[index];
    this.setState({
      cageSelected: newCage
    });
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
            <div className="column">
              <Link to={`/experiment/${this.state.experiment.id}/groups`}><button>Treatment Groups: </button></Link>
              {this.state.experiment.treatment_groups.map((group, index)=>(<button key={group.id} onClick={(evt)=>this.selectGroup(evt, index)} className={`list-btn ${(this.state.groupSelected && group.id === this.state.groupSelected.id) ? 'selected' : ''}`}>{group.name}</button>))}
            </div>
            <div className="column">
              <Link to={`/experiment/${this.state.experiment.id}/cages`}><button>Cages: </button></Link>
              {this.state.groupSelected ?
                (this.state.groupSelected.cages.map((cage, index)=>(
                  <button
                  key={cage.id}
                  onClick={(evt)=>this.selectCage(evt, index)}
                  className={`list-btn ${(this.state.cageSelected && cage.id === this.state.cageSelected.id) ? 'selected' : ''}`}>
                    {cage.name}
                  </button>))) :
                (<div>none</div>)}
            </div>
            <div className="column">
              <Link to={`/experiment/${this.state.experiment.id}/mice`}><button>Mice: </button></Link>
            </div>
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
