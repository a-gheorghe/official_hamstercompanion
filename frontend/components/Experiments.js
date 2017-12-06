import React from 'react';

class Experiments extends React.Component {
  componentDidMount() {
    $.ajax('./getExperiments');
  }

  render() {
    return (
      <div>
        <form onSubmit={e => this.submit(e)}>
          <input type="submit" />
        </form>
      </div>
    );
  }
}

export default Experiments;
