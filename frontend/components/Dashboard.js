import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
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
        data: false
      }
    };
  }
  componentWillMount() {
    axios.get('/api/experiment/' + this.props.match.params.id).then(resp => {
      console.log('RESPONSE', resp);
      this.setState({
        experiment: resp.data.experiment,
        isAdmin: resp.data.isAdmin
      });
    }).catch(e => console.log(e));
  }

  updateFocusData(dataType, data) {
    // var attributes = [['ID:', data.id]];
    // var header = '';
    // switch (dataType) {
    //   case 'group':
    //     header = `Group: ${data.name} ${data.isControl ? '(control)' : ''}`;
    //     attributes.push();
    //     break;
    //   case 'cage':
    //     break;
    //   default:
    //     break;
    // }

    this.setState({
      focusData: {
        header: dataType,
        data: true
      }
    });
  }

  render() {
    console.log('STATE', this.state);
    return (this.state.experiment ? (
      <div id="dashboard-container">
        <div id="dashboard-header"><h1>Dashboard: {this.state.experiment.name}</h1></div>
        <div id="dashboard-main">
          <div id="dashboard-info">
            <h3>Experiment ID: {this.state.experiment.id}</h3>
            <h3>Description: {this.state.experiment.description}</h3>
            {this.state.experiment.user_experiments[0].isAdmin ?
              (<Link to={`/experiment/${this.state.experiment.id}/edit`}><button>Edit Experiment</button></Link>) :
              (<button>Become Administrator</button>)
            }
            <div id="focus-data">
              {this.state.focusData.data ? <h2>{this.state.focusData.header}</h2> : <p>Select a treatment group, cage, or mouse to the right to view data.</p>}
            </div>
          </div>
          <DashboardTable experiment={this.state.experiment} updateFocusData = {(dataType, data)=>this.updateFocusData(dataType, data)}/>
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
