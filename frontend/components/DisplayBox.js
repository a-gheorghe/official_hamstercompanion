import React from 'react';
import { Redirect } from 'react-router';

class DisplayBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false
    };
  }

  render() {
    const e = this.props.experiment;
    if (this.state.clicked) return <Redirect to={`/experiment/${e.id}`} />;
    return (
      <div className="box" onClick={() => this.setState({ clicked: true })}>
        <h3>{e.name}</h3>
        <h4>ID: {e.id}</h4>
        <p>{e.description}</p>
      </div>
    );
  }
}

export default DisplayBox;
