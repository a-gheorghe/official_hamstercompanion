import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

class EditExperiment extends React.Component {
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
        name: e.target.name.value,
        password: e.target.password.value,
        description: e.target.desc.value || null,
        adminPassword: e.target.adminPassword.value
      }).then(resp => {
        if (resp.data.success) this.setState({ submitted: true });
      }).catch(err => console.log(err));
    } else this.setState({ error: 'Admin passwords do not match!'});
  }

  render() {
    if (this.state.submitted) return <Redirect to="/" />;

    return (
      <div>
        <h3>Create or edit an Experiment</h3>
        <form className="col form" onSubmit={e => this.submit(e)}>
          <input type="text" name="name" placeholder="Experiment Name" />
          <input type="password" name="password" placeholder="Password to Join Experiment" />
          <input type="text" name="desc" placeholder="Description of your experiment" />
          { this.state.error ? <p style={{ color: 'red' }}>{this.state.error}</p> : null }
          <input type="password" name="adminPassword" placeholder="Admin Password" />
          <input type="password" name="adminPassRepeat" placeholder="Repeat Admin Password" />
          <input type="submit" />
        </form>
        <Link to="/">Cancel</Link>
      </div>
    );
  }
}

export default EditExperiment;
