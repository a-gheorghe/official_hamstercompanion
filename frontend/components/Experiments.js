import React from 'react';
import axios from 'axios';

class Experiments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exps: []
    };
  }
  componentWillMount() {
    axios.get('./getExperiments')
      .then(resp => {
        this.setState({exps: resp.data});
      });
  }

  render() {
    return (
      <div>
        {this.state.exps.map(() => {
          // TODO render the exeriment
        })}
      </div>
    );
  }
}

export default Experiments;
