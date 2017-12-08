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
    axios.get('./experiments').then(resp => {
      this.setState({exps: resp.data});
    }).catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <h1>Experiments</h1>
        {this.state.exps.map(() => {
          // TODO render the exeriment
        })}
      </div>
    );
  }
}

export default Experiments;
