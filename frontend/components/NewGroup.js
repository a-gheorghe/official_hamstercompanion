import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { RaisedButton } from 'material-ui';

class TreatmentGroupEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: null,
      submitted: false
    };
  }

  componentWillMount() {
    axios.get(`/api/experiment/${this.props.match.params.id}`).then(resp => {
      if (!resp.data) this.setState({ loading: false });
      else this.setState({ loading: true });
    }).catch(e => console.log(e));
  }

  submit(e) {
    e.preventDefault();
    if (e.target.name.value) {
      axios.post(`/api/experiment/${this.props.match.params.id}/group/new`, {
        name: e.target.name.value,
        notes: e.target.notes.value,
        isControl: e.target.isControl.value === "yes",
        experimentId: this.props.match.params.id
      }).then(() => {
        this.setState({ submitted: true });
      }).catch(err => console.log(err));
    } else {
      this.setState({ error: 'Group name required!'});
    }
  }

  render() {
    if (this.state.submitted) return <Redirect to={`/experiment/${this.props.match.params.id}`} />;
    if (this.state.loading === null) return null;
    return (this.state.loading ? (
      <form onSubmit={e => this.submit(e)} className="form col">
        <h1>New Treatment Group</h1>
        { this.state.error ? <p className="error-msg">{this.state.error}</p> : null }
        <input type="text" name="name" placeholder="Group Name" />
        <textarea name="notes" rows="3" placeholder="Group Notes" />
        <label>Is Control?
          <input type="radio" name="isControl" value="yes" />
            Yes
          <input type="radio" name="isControl" value="no" />
            No
        </label>
        <RaisedButton className="btn" primary label="Submit" type="submit" />
        <Link to={`/experiment/${this.props.match.params.id}`}>
          <RaisedButton className="btn" label="Cancel" secondary />
        </Link>
      </form>
    ) : <Redirect to="/denied" /> );
  }
}

export default TreatmentGroupEdit;
