import React from 'react';
import { Link } from 'react-router-dom';
import { RaisedButton } from 'material-ui';

function DashboardTable(props) {
  return (
      <div id="dashboard-btn-bank">
        <div className="column">
          <div className="column-label"><h2>Treatment Groups:</h2></div>
          {props.experiment ?
            (props.experiment.treatment_groups.map((group, index)=>{
              if(group.deleted) {return null;}
              return(
              <button
                key={group.id} onClick={(evt)=>props.selectGroup(evt, index)}
                className={`list-btn
                  ${(props.groupSelected && group.id === props.groupSelected.id) ? 'selected' : ''}
                  ${group.isControl ? 'control-group' : ''}
                `}
              >
                <h2>{group.name}</h2>
              </button>);
            })
            ) : ''
          }
          <Link to={`/experiment/${props.experiment.id}/group/new`}>
            <RaisedButton label="+" backgroundColor="LimeGreen" style={{borderRadius: '5px', marginTop: '10px'}} labelStyle={{color: 'white', fontSize: '20px'}}/>
          </Link>
        </div>
        <div className="column">
          <div className="column-label"><h2>Cages:</h2></div>
          {props.groupSelected ?
            props.groupSelected.cages.map((cage, index)=>{
              if(cage.deleted) {return null;}
              return (<button
                key={cage.id}
                onClick={(evt)=>props.selectCage(evt, index)}
                className={`
                list-btn
                ${(props.cageSelected && cage.id === props.cageSelected.id) ? 'selected' : ''}
                ${cage.sessions.length <= props.experiment.minDailySessions ? 'inactive' : ''}`}>
                <h2>{cage.name}</h2>
              </button>);}) : ''}
            {props.groupSelected ?
                <Link to={`/experiment/${props.experiment.id}/group/${props.groupSelected.id}/cage/new`}>
                  <RaisedButton label="+" backgroundColor="LimeGreen" style={{borderRadius: '5px', marginTop: '10px'}} labelStyle={{color: 'white', fontSize: '20px'}}/>
                </Link>
                :
                <div style={{marginTop: '20px'}}><h2>No group selected</h2></div>
            }
        </div>
        <div className="column">
          <div className="column-label"><h2>Mice:</h2></div>
          {props.cageSelected ?
            props.cageSelected.mice.map((mouse, index)=>{
              if(mouse.deleted) {return null;}
              return (<button
                key={mouse.id}
                onClick={(evt)=>props.selectMouse(evt, index)}
                className={`list-btn
                ${mouse.isAlive ? '' : 'inactive'}
                ${(props.mouseSelected && mouse.id === props.mouseSelected.id) ? 'selected' : ''}
              `}>
                <h2>{mouse.id}</h2>
              </button>);}) : ''}
          {props.cageSelected ?
            <RaisedButton label="+" backgroundColor="LimeGreen" style={{borderRadius: '5px', marginTop: '10px'}} labelStyle={{color: 'white', fontSize: '20px'}}/>
            :
            <div style={{marginTop: '20px'}}><h2>No cage selected</h2></div>
          }
        </div>
      </div>
  );
}

export default DashboardTable;
