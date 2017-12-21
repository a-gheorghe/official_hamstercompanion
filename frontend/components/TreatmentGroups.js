import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { RaisedButton } from 'material-ui';

class TreatmentGroupEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retrieved: null,
      name: '',
      notes: '',
      isControl: null,
      submitted: false
    };
  }

  componentWillMount() {
    axios.get(`/api/experiment/${this.props.match.params.id}/group/${this.props.match.params.groupId}`).then(resp => {
      if (!resp.data) this.setState({ retrieved: false });
      else {
        this.setState({
          retrieved: true,
          name: resp.data.name,
          notes: resp.data.notes,
          isControl: resp.data.isControl
        });
      }
    }).catch(e => console.log(e));
  }

  submit(e) {
    e.preventDefault();
    axios.post(`/api/experiment/${this.props.match.params.id}/group/${this.props.match.params.groupId}`, {
      name: this.state.name,
      notes: e.target.notes.value,
      isControl: e.target.isControl.value === "yes"
    }).then(() => {
      this.setState({ submitted: true });
    }).catch(err => console.log(err));
  }

  toggleControl(isControl) {
    this.setState({
      isControl
    });
  }

  changeName(e) { this.setState({ name: e.target.value }); }

  render() {
    if (this.state.submitted) return <Redirect to={`/experiment/${this.props.match.params.id}`} />;
    if (this.state.retrieved === null) return null;
    return (this.state.retrieved ? (
      <form onSubmit={e => this.submit(e)} className="form col">
        <h1>Treatment Group: {this.state.name}</h1>
        <input type="text" name="name" placeholder="Group Name"
          value={this.state.name} onChange={e => this.changeName(e)}
        />
        <textarea name="notes" rows="3" placeholder="Group Notes">{this.state.notes}</textarea>
        <label>Is Control?
          <input type="radio" name="isControl" value="yes" checked={this.state.isControl} onChange={(e)=>this.toggleControl(e.target.value === "yes")}/>
            Yes
          <input type="radio" name="isControl" value="no" checked={!this.state.isControl} onChange={(e)=>this.toggleControl(e.target.value === "yes")}/>
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
