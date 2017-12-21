import React from 'react';
import { Link } from 'react-router-dom';
import { RaisedButton } from 'material-ui';

class DashboardTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experiment: props.experiment,
      groupSelected: null,
      cageSelected: null,
      mouseSelected: null
    };
  }

  selectGroup(evt, index) {
    evt.preventDefault();
    var newGroup = this.state.experiment.treatment_groups[index];
    this.setState({
      groupSelected: newGroup,
      cageSelected: null,
      mouseSelected: null
    });
    this.props.updateFocusData('group', newGroup);
  }

  selectCage(evt, index) {
    evt.preventDefault();
    var newCage = this.state.groupSelected.cages[index];
    this.setState({
      cageSelected: newCage,
      mouseSelected: null
    });
    this.props.updateFocusData('cage', newCage);
  }

  selectMouse(evt, index) {
    evt.preventDefault();
    var newMouse = this.state.cageSelected.mice[index];
    this.setState({
      mouseSelected: newMouse
    });
    this.props.updateFocusData('mouse', newMouse);
  }

  render() {
    return (
      <div id="dashboard-btn-bank">
        <div className="column">
          <div className="column-label"><h2>Treatment Groups:</h2></div>
          {this.state.experiment ?
            (this.state.experiment.treatment_groups.map((group, index)=>(<button
              key={group.id} onClick={(evt)=>this.selectGroup(evt, index)}
              className={`list-btn
                ${(this.state.groupSelected && group.id === this.state.groupSelected.id) ? 'selected' : ''}
                ${group.isControl ? 'control-group' : ''}
              `}
            >
              <h2>{group.name}</h2>
            </button>))
            ) : ''
          }
          <Link to={`/experiment/${this.props.experiment}/group/new`}>
            <RaisedButton label="+" backgroundColor="LimeGreen" style={{borderRadius: '5px', marginTop: '10px'}} labelStyle={{color: 'white', fontSize: '20px'}}/>
          </Link>
        </div>
        <div className="column">
          <div className="column-label"><h2>Cages:</h2></div>
          {this.state.groupSelected ?
            this.state.groupSelected.cages.map((cage, index)=>(
              <button
                key={cage.id}
                onClick={(evt)=>this.selectCage(evt, index)}
                className={`
                list-btn
                ${(this.state.cageSelected && cage.id === this.state.cageSelected.id) ? 'selected' : ''}
                ${cage.sessions.length <= this.state.experiment.minDailySessions ? 'inactive' : ''}`}>
                <h2>{cage.name}</h2>
              </button>)) : ''}
            {this.state.groupSelected ?
                <Link to={`/experiment/${this.props.experiment.id}/group/${this.state.groupSelected.id}/cage/new`}>
                  <RaisedButton label="+" backgroundColor="LimeGreen" style={{borderRadius: '5px', marginTop: '10px'}} labelStyle={{color: 'white', fontSize: '20px'}}/>
                </Link>
                :
                <div style={{marginTop: '20px'}}><h2>No group selected</h2></div>
            }
        </div>
        <div className="column">
          <div className="column-label"><h2>Mice:</h2></div>
          {this.state.cageSelected ?
            this.state.cageSelected.mice.map((mouse, index)=>(
              <button
                key={mouse.id}
                onClick={(evt)=>this.selectMouse(evt, index)}
                className={`list-btn
                ${mouse.isAlive ? '' : 'inactive'}
                ${(this.state.mouseSelected && mouse.id === this.state.mouseSelected.id) ? 'selected' : ''}
              `}>
                <h2>{mouse.id}</h2>
              </button>)) : ''}
          {this.state.cageSelected ?
            <RaisedButton label="+" backgroundColor="LimeGreen" style={{borderRadius: '5px', marginTop: '10px'}} labelStyle={{color: 'white', fontSize: '20px'}}/>
            :
            <div style={{marginTop: '20px'}}><h2>No cage selected</h2></div>
          }
        </div>
      </div>
    );
  }
}

export default DashboardTable;
