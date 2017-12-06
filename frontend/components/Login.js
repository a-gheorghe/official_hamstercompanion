import React from 'react';

class Login extends React.Component {
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

export default Login;
