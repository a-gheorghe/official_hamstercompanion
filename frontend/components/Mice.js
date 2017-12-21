import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { RaisedButton } from 'material-ui';

class MouseEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retrieved: null,
      sex: '',
      age: 0,
      notes: '',
      isAlive: null,
      submitted: false
    };
  }

  componentWillMount() {
    axios.get(`/api/experiment/${this.props.match.params.id}/mouse/${this.props.match.params.mouseId}`).then(resp => {
      if (!resp.data) this.setState({ retrieved: false });
      else {
        this.setState({
          retrieved: true,
          sex: resp.data.sex,
          age: resp.data.age,
          notes: resp.data.notes,
          isAlive: resp.data.isAlive,
          wheel_diameter: resp.data.wheel_diameter
        });
      }
    }).catch(e => console.log(e));
  }

  submit(e) {
    e.preventDefault();
    axios.post(`/api/experiment/${this.props.match.params.id}/mouse/${this.props.match.params.mouseId}`, {
      sex: e.target.sex.value,
      age: this.state.age,
      notes: e.target.notes.value,
      isAlive: e.target.isAlive.value === "yes",
    }).then(() => {
      this.setState({ submitted: true });
    }).catch(err => console.log(err));
  }

  changeAge(e) { this.setState({ age: e.target.value }); }

  render() {
    if (this.state.submitted) return <Redirect to={`/experiment/${this.props.match.params.id}`} />;
    if (this.state.retrieved === null) return null;
    return (this.state.retrieved ? (
      <form onSubmit={e => this.submit(e)} className="form col">
        <h1>Mouse: {this.props.match.params.mouseId}</h1>
        <label>Sex:
          <input type="radio" name="sex" value="M"
            // { this.state.sex ? "checked" : "" }
          /> Male
          <input type="radio" name="sex" value="F"
            // { this.state.sex ? "" : "checked" }
          /> Female
        </label>
        <textarea name="notes" rows="3" placeholder="Group Notes">{this.state.notes}</textarea>
        <input type="number" name="age" placeholder="Mouse Age"
          value={this.state.age} onChange={e => this.changeAge(e)}
        />
        <label>Is Alive?
          <input type="radio" name="isAlive" value="yes"
            // { this.state.isAlive ? "checked" : "" }
          /> Yes
          <input type="radio" name="isAlive" value="no"
            // { this.state.isAlive ? "" : "checked" }
          /> No
        </label>
        <RaisedButton className="btn" primary label="Submit" type="submit" />
        <Link to={`/experiment/${this.props.match.params.id}`}>
          <RaisedButton className="btn" label="Cancel" secondary />
        </Link>
      </form>
    ) : <Redirect to="/denied" /> );
  }
}

export default MouseEdit;
