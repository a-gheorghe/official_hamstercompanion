import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { RaisedButton } from 'material-ui';

class CageEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      retrieved: null,
      name: '',
      wheel_diameter: 0,
      notes: '',
      submitted: false
    };
  }

  componentWillMount() {
    axios.get(`/api/experiment/${this.props.match.params.id}/cage/${this.props.match.params.cageId}`).then(resp => {
      if (!resp.data) this.setState({ retrieved: false });
      else {
        this.setState({
          retrieved: true,
          name: resp.data.name,
          notes: resp.data.notes,
          wheel_diameter: resp.data.wheel_diameter
        });
      }
    }).catch(e => console.log(e));
  }

  submit(e) {
    e.preventDefault();
    axios.post(`/api/experiment/${this.props.match.params.id}/cage/${this.props.match.params.cageId}`, {
      name: this.state.name,
      notes: e.target.notes.value,
      wheel_diameter: this.state.wheel_diameter
    }).then(() => {
      this.setState({ submitted: true });
    }).catch(err => console.log(err));
  }

  changeName(e) { this.setState({ name: e.target.value }); }

  changeDiam(e) { this.setState({ wheel_diameter: e.target.value }); }

  render() {
    if (this.state.submitted) return <Redirect to={`/experiment/${this.props.match.params.id}`} />;
    if (this.state.retrieved === null) return null;
    return (this.state.retrieved ? (
      <form onSubmit={e => this.submit(e)} className="form col">
        <h1>Cage: {this.state.name}</h1>
        <input type="text" name="name" placeholder="Group Name"
          value={this.state.name} onChange={e => this.changeName(e)}
        />
        <textarea name="notes" rows="3" placeholder="Group Notes">{this.state.notes}</textarea>
        <input type="number" name="wheel_diameter" placeholder="Wheel Diameter"
          value={this.state.wheel_diameter} onChange={e => this.changeDiam(e)}
        />
        <RaisedButton className="btn" primary label="Submit" type="submit" />
        <Link to={`/experiment/${this.props.match.params.id}`}>
          <RaisedButton className="btn" label="Cancel" secondary />
        </Link>
      </form>
    ) : <Redirect to="/denied" /> );
  }
}

export default CageEdit;
