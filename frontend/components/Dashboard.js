import React from 'react';
import axios from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { RaisedButton, Dialog } from 'material-ui';
import DashboardTable from './DashboardTable';
import './styles/dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experiment: null,
      isAdmin: false,
      focusData: {
        header: '',
        data: false,
        type: null
      },
      error: '',
      adminPassword: '',
      modalOpen: false,
      delete: false,
      groupSelected: null,
      cageSelected: null,
      mouseSelected: null
    };
  }
  componentWillMount() {
    axios.get('/api/experiment/' + this.props.match.params.id).then(resp => {
      this.setState({
        experiment: resp.data.experiment,
        isAdmin: resp.data.isAdmin
      });
    }).catch((e) => {
      console.log(e);
      this.setState({
        experiment: false
      });
    });
  }

  selectGroup(evt, index) {
    console.log(index);
    evt.preventDefault();
    var newGroup = this.state.experiment.treatment_groups[index];
    console.log(newGroup);
    console.log(this.state.groupSelected);
    this.setState({
      groupSelected: newGroup,
      cageSelected: newGroup === this.state.groupSelected ? this.state.cageSelected : null,
      mouseSelected: null
    });
    this.updateFocusData('group', newGroup);
  }

  selectCage(evt, index) {
    evt.preventDefault();
    var newCage = this.state.groupSelected.cages[index];
    this.setState({
      cageSelected: newCage,
      mouseSelected: null
    });
    this.updateFocusData('cage', newCage);
  }

  selectMouse(evt, index) {
    evt.preventDefault();
    var newMouse = this.state.cageSelected.mice[index];
    this.setState({
      mouseSelected: newMouse
    });
    this.updateFocusData('mouse', newMouse);
  }

  updateFocusData(dataType, data) {
    var attributes = [`ID: ${data.id}`];
    var header = '';
    switch (dataType) {
      case 'group':
        header = `Group: ${data.name} ${data.isControl ? '(control)' : ''}`;
        attributes.push(`Cages: ${data.cages.length}`);
        var numMice = data.cages.reduce((total, cage)=>(total + cage.mice.length), 0);
        attributes.push(`Mice: ${numMice}`);
        break;
      case 'cage':
        header = "Cage: ";
        if(data.name) {
          var name = data.name.split(' ');
          var firstWord = name[0].toLowerCase();
          if(firstWord === 'cage') {
            name.splice(0, 1);
            name = name.join('');
            header = header + name;
          }
          else{
            header = header + data.name;
          }
        }
        attributes.push(`Wheel Diameter: ${data.wheel_diameter} cm`);
        attributes.push(`Mice: ${data.mice.length}`);
        break;
      default:
        header = `Mouse:`;
        attributes.push(`Sex: ${data.sex}`);
        if(data.age) {
          var age = data.age;
          var now = (new Date()).getTime();
          var then = (new Date(data.createdAt)).getTime();
          var months = Math.floor((now - then) / 2592000000);
          age = age + months;
          attributes.push(`Current age in months: ${age}`);
        }
        attributes.push(`Status: ${data.isAlive ? 'alive' : 'dead'}`);
        break;
    }
    attributes.push(`Exercise sessions in last 24 hours: ${data.sessions.length}`);
    attributes.push(`Notes: ${data.notes || 'None'}`);
    this.setState({
      focusData: {
        header,
        id: data.id,
        data: attributes,
        type: dataType
      }
    });
  }

  becomeAdmin(e) {
    e.preventDefault();
    axios.post(`/api/experiment/${this.props.match.params.id}/join/admin`, {
      password: this.state.adminPassword
    }).then(resp => {
      if (resp.data.success) this.componentWillMount();
      else {
        this.setState({ error: resp.data.error });
      }
    }).catch(err => console.log(err));
  }

  updateAdminPassword(evt) {
    this.setState({
      adminPassword: evt.target.value
    });
  }

  toggleModal() { this.setState({ modalOpen: !this.state.modalOpen }); }

  deleteItem() {
    axios.delete(`/api/experiment/${this.state.experiment.id}/${this.state.focusData.type}/${this.state.focusData.id}`)
      .then(resp => {
        if (resp.data.success) {
          var newState = {
            modalOpen: false
          };
          switch (this.state.focusData.type) {
            case 'group':
              newState.groupSelected = null;
              newState.cageSelected = null;
              newState.mouseSelected = null;
              break;
            case 'cage':
              newState.cageSelected = null;
              newState.mouseSelected = null;
              break;
            default:
              newState.mouseSelected = null;
          }
          this.setState(newState);
        } else alert(resp.data.error);
      }).catch(e => alert(e.errors[0].message));
  }

  render() {
    if(this.state.experiment === null) {
      return null;
    }

    if(this.state.delete === true) {
      return <Redirect to={`/experiment/${this.state.experiment.id}`}/>;
    }
    if(this.state.experiment === false) {
      return <Redirect to={'/denied'} />;
    }
    return (
      <div id="dashboard-container">
        <Link to="/">
          <RaisedButton className="back-btn btn" label="Back to Experiments" secondary />
        </Link>
        <div id="dashboard-header">
          <h1>Dashboard: {this.state.experiment.name}</h1>
          <h3>Experiment ID: {this.state.experiment.id}</h3>
          <h3>Description: {this.state.experiment.description}</h3>
        </div>
        <div id="dashboard-main">
          <div id="dashboard-info">
            <div id="focus-data">
              {this.state.focusData.data ? (<div className="col">
                <h2>{this.state.focusData.header}</h2>
                <div id="attributes">
                  {this.state.focusData.data.map((attribute, index)=><p key={index}>{attribute}</p>)}
                </div>
                <Link to={`/experiment/${this.props.match.params.id}/${this.state.focusData.type}/${this.state.focusData.id}`}>
                  <RaisedButton className="btn" label={`Edit ${this.state.focusData.type}`} default />
                </Link>
                <RaisedButton className="btn" label={`Delete this ${this.state.focusData.type}`}
                  onClick={() => this.toggleModal()} secondary
                />
              </div>)
                : <p>Select a treatment group, cage, or mouse to the right to view data.</p>
              }
            </div>
          </div>
          <DashboardTable experiment={this.state.experiment}
            selectGroup={(evt, groupId)=>this.selectGroup(evt, groupId)}
            selectCage={(evt, cageId)=>this.selectCage(evt, cageId)}
            selectMouse={(evt, mouseId)=>this.selectMouse(evt, mouseId)}
            groupSelected={this.state.groupSelected}
            cageSelected={this.state.cageSelected}
            mouseSelected={this.state.mouseSelected}
          />
        </div>
        <div id="dashboard-footer">
          <a download="sessions.csv" href={`/api/experiment/${this.props.match.params.id}/sessions`}>
            <RaisedButton className="btn" style={{width: '220px'}} label="Download Data" default />
          </a>
          {this.state.isAdmin ?
            (<Link to={`/experiment/${this.state.experiment.id}/edit`}>
              <RaisedButton style={{width: '220px'}} label="Edit Experiment" primary />
            </Link>) :
            (<div id="form-become-admin">
              <RaisedButton style={{marginRight: '20px', width: '220px'}} type="submit" onClick={(e)=>this.becomeAdmin(e)} primary label="Become Administrator" />
              <input type="password" name="password" placeholder="Admin Password" value={this.state.adminPassword} onChange={(e)=>this.updateAdminPassword(e)} />
              <div>
                { this.state.error ? <p className="error-msg">{this.state.error}</p> : null }
              </div>
            </div>)
          }
        </div>

        <Dialog open={this.state.modalOpen} modal title="Warning!"
          children={<p>This action will delete the {this.state.focusData.type} and all data associated with it. Do you wish to proceed?</p>}
          actions={[
            <RaisedButton label="Cancel" onClick={()=>this.toggleModal()} primary/>,
            <RaisedButton label="Delete" onClick={()=>this.deleteItem()} secondary/>
          ]}
        />
      </div>
    );
  }
}

export default Dashboard;
