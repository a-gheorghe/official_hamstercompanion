import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { RaisedButton } from 'material-ui';
import DashboardTable from './DashboardTable';
import './styles/dashboard.css';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      experiment: false,
      isAdmin: false,
      focusData: {
        header: '',
        data: false,
        type: null
      },
      error: ''
    };
  }
  componentWillMount() {
    axios.get('/api/experiment/' + this.props.match.params.id).then(resp => {
      this.setState({
        experiment: resp.data.experiment,
        isAdmin: resp.data.isAdmin
      });
    }).catch(e => console.log(e));
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
        data: attributes,
        type: dataType
      }
    });
  }

  becomeAdmin(e) {
    e.preventDefault();
    axios.post(`/api/experiment/${this.props.match.params.id}/join/admin`, {
      password: e.target.password.value
    }).then(resp => {
      if (resp.data.success) this.componentWillMount();
      else this.setState({ error: resp.data.error });
    }).catch(err => console.log(err));
  }

  render() {
    return (this.state.experiment ? (
      <div id="dashboard-container">
        <a href={`/api/experiment/${this.props.match.params.id}/sessions`} download="sessions.csv">
          <RaisedButton className="btn" label="Download Data" default />
        </a>
        <div id="dashboard-header"><h1>Dashboard: {this.state.experiment.name}</h1></div>
        <div id="dashboard-main">
          <div id="dashboard-info">
            <h3>Experiment ID: {this.state.experiment.id}</h3>
            <h3>Description: {this.state.experiment.description}</h3>
            {this.state.isAdmin ?
              (<Link to={`/experiment/${this.state.experiment.id}/edit`}>
                <RaisedButton label="Edit Experiment" primary />
              </Link>) :
              (<form className="col form" onSubmit={e => this.becomeAdmin(e)}>
                { this.state.error ? <p className="error-msg">{this.state.error}</p> : null }
                <input type="password" name="password" placeholder="Admin Password" />
                <RaisedButton type="submit" primary label="Become Administrator" />
              </form>)
            }
            <div id="focus-data">
              {this.state.focusData.data ? (<div>
                <h2>{this.state.focusData.header}</h2>
                <div id="attributes">
                  {this.state.focusData.data.map((attribute, index)=><p key={index}>{attribute}</p>)}
                </div>
                <button className="box btn">Edit {this.state.focusData.type}</button>
              </div>)
                : <p>Select a treatment group, cage, or mouse to the right to view data.</p>
              }
            </div>
          </div>
          <DashboardTable experiment={this.state.experiment} updateFocusData = {(dataType, data)=>this.updateFocusData(dataType, data)}/>
        </div>
        <Link to="/">
          <RaisedButton className="back-btn btn" label="Back to Experiments" secondary />
        </Link>
      </div>
    ) : (
      <div>
        <p className="error-msg">You do not have access to this experiment.</p>
        <Link to="/">
          <RaisedButton className="btn" label="Back to Experiments" secondary />
        </Link>
      </div>
    ));
  }
}

export default Dashboard;
