import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RaisedButton } from 'material-ui';
import axios from 'axios';

class EditExperiment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      error: '',
      name: '',
      desc: '',
      edit: false,
    };
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      axios.get('/api/experiment/' + this.props.match.params.id).then(resp => {
        this.setState({
          name: resp.data.experiment.name,
          desc: resp.data.experiment.description,
          edit: true
        });
      });
    }
  }

  submit(e) {
    e.preventDefault();
    if (this.state.edit) {
      if (!e.target.adminPasswordCheck.value) {
        this.setState({ error: 'Admin password required to edit' });
      } else {
        const body = {
          name: this.state.name,
          description: this.state.desc
        };
        if (e.target.password.value) body.password = e.target.password.value;
        if (e.target.adminPassword.value) {
          if (e.target.adminPassword.value !== e.target.adminPassRepeat.value) {
            this.setState({ error: 'Admin passwords must match!'});
            return;
          }
          body.adminPassword = e.target.adminPassword.value;
        }
        axios.post(`/api/experiment/${this.props.match.params.id}`, body)
          .then(resp => {
            if (resp.data.success) this.setState({ submitted: true });
            else this.setState({ error: resp.data.error });
          }).catch(err => console.log(err));
      }
    } else {
      if (e.target.adminPassword.value === e.target.adminPassRepeat.value) {
        axios.post('/api/experiment', {
          name: e.target.name.value,
          password: e.target.password.value,
          description: e.target.desc.value || null,
          adminPassword: e.target.adminPassword.value
        }).then(resp => {
          if (resp.data.success) this.setState({ submitted: true });
        }).catch(err => console.log(err));
      } else this.setState({ error: 'Admin passwords do not match!'});
    }
  }

  changeName(e) { this.setState({ name: e.target.value }); }

  changeDesc(e) { this.setState({ desc: e.target.value }); }

  render() {
    if (this.state.submitted) {
      return (this.state.edit ?
        <Redirect to={`/experiment/${this.props.match.params.id}`} />
        : <Redirect to="/" />);
    }

    return (
      <div>
        <h3>Create or edit an Experiment</h3>
        { this.state.error ? <p style={{ color: 'red' }}>{this.state.error}</p> : null }
        <form className="col form" onSubmit={e => this.submit(e)}>
          <input type="text" name="name" onChange={e => this.changeName(e)}
            placeholder="Experiment Name" value={this.state.name}
          />
          <input type="password" name="password" placeholder="Password to Join Experiment" />
          <input type="text" name="desc" onChange={e => this.changeDesc(e)}
            placeholder="Description of your experiment" value={this.state.desc}
          />
          <input type="password" name="adminPassword" placeholder="Admin Password" />
          <input type="password" name="adminPassRepeat" placeholder="Repeat Admin Password" />
          { this.state.edit ?
            <p>In order to edit this experimgnt you must enter the admin password:</p>
            : null }
          { this.state.edit ?
            <input type="password" name="adminPasswordCheck" />
            : null }
          <RaisedButton label="Submit" primary type="submit" />
        </form>
        { this.state.edit ?
          <Link to={`/experiment/${this.props.match.params.id}`}>
            <RaisedButton className="btn" label="Cancel" secondary />
          </Link>
          : <Link to="/">
            <RaisedButton className="btn" label="Cancel" secondary />
          </Link> }
      </div>
    );
  }
}

export default EditExperiment;
