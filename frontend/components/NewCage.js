import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { RaisedButton } from 'material-ui';

class NewCage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      accessDenied: false,
      loading: true,
      name: '',
      notes: '',
      wheelDiameter: '',
      error: ''
    };
  }

  componentWillMount() {
    axios.get(`/api/experiment/${this.props.match.params.id}`)
    .then((resp)=>{
      this.setState({
        loading: false,
        accessDenied: !resp
      });
    })
    .catch((err)=>{
      console.log(err);
      this.setState({
        loading: false,
        accessDenied: true
      });
    });
  }

  submit(e) {
    e.preventDefault();
    console.log("Submitted", e.target);
    if(!e.target.name.value) {
      this.setState({
        error: 'Cage name is required'
      });
      return;
    }
    if(!e.target.wheel_diameter.value) {
      this.setState({
        error: 'Wheel diameter is required (if none, put 0)'
      });
      return;
    }
    var wheelDiameter = parseInt(e.target.wheel_diameter.value, 10);
    if(isNaN(wheelDiameter) || wheelDiameter < 0) {
      this.setState({
        error: 'Invalid wheel diameter'
      });
      return;
    }
    axios.post(`/api/experiment/${this.props.match.params.id}/group/${this.props.match.params.groupId}/cage/new`, {
      name: e.target.name.value,
      notes: e.target.notes.value,
      wheel_diameter: e.target.wheel_diameter.value
    }).then((resp) => {
      console.log(resp.data);
      this.setState({ submitted: resp.data.success, error: resp.data.success ? '' : resp.data.error });
    }).catch(err => console.log(err));
  }

  changeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  changeNotes(e) {
    this.setState({
      notes: e.target.value
    });
  }

  changeDiam(e) {
    this.setState({
      wheelDiameter: e.target.value
    });
  }


  render() {
    if (this.state.submitted) return <Redirect to={`/experiment/${this.props.match.params.id}`} />;
    if (this.state.loading) return null;
    return (!this.state.accessDenied ? (
    <form onSubmit={e => this.submit(e)} className="form col">
      <h1>New Cage</h1>
      <p style={{color: 'red'}}>{this.state.error}</p>
      <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={(e)=>this.changeName(e)}/>
      <textarea name="notes" rows="3" placeholder="Notes" value={this.state.notes} onChange={(e)=>this.changeNotes(e)}/>
      <input type="number" name="wheel_diameter" placeholder="Wheel Diameter (cm)" value={this.state.wheelDiameter} onChange={(e)=>this.changeDiam(e)}/>
      <RaisedButton className="btn" primary label="Add Cage" type="submit" />
      <Link to={`/experiment/${this.props.match.params.id}`}>
        <RaisedButton className="btn" label="Cancel" secondary />
      </Link>
    </form>
    ) : <Redirect to="/denied" /> );
  }
}

export default NewCage;
