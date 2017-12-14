import React from 'react';
// import { Link } from 'react-router-dom';

class DashboardTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experiment: props.experiment,
      groupSelected: null,
      cageSelected: null,
    };
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
    return (
      <div id="dashboard-btn-bank">
        <div className="column">
          <div>Treatment Groups:</div>
          {/* <Link to={`/experiment/${this.state.experiment.id}/groups`}><button></button></Link> */}
          {this.state.experiment ?
            (this.state.experiment.treatment_groups.map((group, index)=>(<button
              key={group.id} onClick={(evt)=>this.selectGroup(evt, index)}
              className={`list-btn
                ${(this.state.groupSelected && group.id === this.state.groupSelected.id) ? 'selected' : ''}
                ${group.isControl ? 'control-group' : ''}
              `}
              >
              <h2>{group.name}</h2>
              <h4>{group.cages.length} cages</h4>
              <h4>Sessions: {group.sessions.length}</h4>
            </button>))
            ) : ''
          }
        </div>
        <div className="column">
          <div>Cages:</div>
          {/* <Link to={`/experiment/${this.state.experiment.id}/cages`}><button>Cages: </button></Link> */}
          {this.state.groupSelected ?
            (this.state.groupSelected.cages.map((cage, index)=>(
              <button
              key={cage.id}
              onClick={(evt)=>this.selectCage(evt, index)}
              className={`
                list-btn
                ${(this.state.cageSelected && cage.id === this.state.cageSelected.id) ? 'selected' : ''}
                ${cage.sessions.length <= this.state.experiment.minDailySessions ? 'inactive' : ''}`}>
              <h2>{cage.name}</h2>
              <h4>{`${cage.mice.length} mice`}</h4>
              <h4>Sessions: {cage.sessions.length}</h4>
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
                ${mouse.isAlive ? '' : 'inactive'}
              `}>
              {/* className={`list-btn ${(this.state.cageSelected && cage.id === this.state.cageSelected.id) ? 'selected' : ''}`}> */}
              <h2>{mouse.id}</h2>
              <h4>Sessions: {mouse.sessions.length}</h4>
              </button>))) :
            (<div>No cage selected</div>)}
        </div>
      </div>
    );
  }
}

export default DashboardTable;
