import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { RaisedButton } from 'material-ui';
import axios from 'axios';

class NewExperiment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      error: ''
    };
  }

  submit(e) {
    e.preventDefault();
    if (e.target.adminPassword.value === e.target.adminPassRepeat.value) {
      axios.post('/api/experiment', {
        name: e.target.name.value || null,
        password: e.target.password.value || null,
        description: e.target.desc.value || null,
        adminPassword: e.target.adminPassword.value || null
      }).then(resp => {
        if (resp.data.success) this.setState({ submitted: true });
      }).catch(err => console.log(err));
    } else this.setState({ error: 'Admin passwords do not match!'});
  }

  changeName(e) { this.setState({ name: e.target.value }); }

  changeDesc(e) { this.setState({ desc: e.target.value }); }

  render() {
    if (this.state.submitted) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <h3>Create New Experiment</h3>
        { this.state.error ? <p style={{ color: 'red' }}>{this.state.error}</p> : '' }
        <form className="col form" onSubmit={e => this.submit(e)}>
          <input type="text" name="name" onChange={e => this.changeName(e)}
            placeholder="Experiment Name" value=""
          />
          <input type="password" name="password" placeholder="Password to Join Experiment" />
          <input type="text" name="desc" onChange={e => this.changeDesc(e)}
            placeholder="Description of your experiment" value=""
          />
          <input type="password" name="adminPassword" placeholder="Admin Password" value=""/>
          <input type="password" name="adminPassRepeat" placeholder="Repeat Admin Password" value=""/>
          <RaisedButton label="Submit" primary type="submit" />
        </form>
        <Link to="/">
          <RaisedButton className="btn" label="Cancel" secondary />
        </Link>
      </div>
    );
  }
}

export default NewExperiment;
