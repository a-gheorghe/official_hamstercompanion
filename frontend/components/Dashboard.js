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
              <div>Treatment Groups:</div>
              {/* <Link to={`/experiment/${this.state.experiment.id}/groups`}><button></button></Link> */}
              {this.state.experiment.treatment_groups.map((group, index)=>(<button
                key={group.id} onClick={(evt)=>this.selectGroup(evt, index)}
                className={`list-btn
                  ${(this.state.groupSelected && group.id === this.state.groupSelected.id) ? 'selected' : ''}
                  ${group.isControl ? 'control-group' : ''}
                `}
                >
                <h2>{group.name}</h2>
                <h4>{`${group.cages.length} cages`}</h4>
              </button>))}
            </div>
            <div className="column">
              <div>Cages:</div>
              {/* <Link to={`/experiment/${this.state.experiment.id}/cages`}><button>Cages: </button></Link> */}
              {this.state.groupSelected ?
                (this.state.groupSelected.cages.map((cage, index)=>(
                  <button
                  key={cage.id}
                  onClick={(evt)=>this.selectCage(evt, index)}
                  className={`list-btn ${(this.state.cageSelected && cage.id === this.state.cageSelected.id) ? 'selected' : ''}`}>
                  <h2>{cage.name}</h2>
                  <h4>{`${cage.mice.length} mice`}</h4>
                  </button>))) :
                (<div>No group selected</div>)}
            </div>
            <div className="column">
              <div>Mice:</div>
              {/* <Link to={`/experiment/${this.state.experiment.id}/mice`}><button>Mice: </button></Link> */}
              {this.state.cageSelected ?
                (this.state.cageSelected.mice.map((mouse)=>(
                  <button
                  key={mouse.id}
                  className={`list-btn
                    ${mouse.isAlive ? '' : 'dead'}
                  `}>
                  {/* className={`list-btn ${(this.state.cageSelected && cage.id === this.state.cageSelected.id) ? 'selected' : ''}`}> */}
                  <h2>{mouse.id}</h2>
                  </button>))) :
                (<div>No cage selected</div>)}
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
