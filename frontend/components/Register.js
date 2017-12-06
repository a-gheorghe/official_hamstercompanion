import React from 'react';

class Register extends React.Component {
  submit(e) {
    e.preventDefault();
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

export default Register;
