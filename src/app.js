
import React from "react";
import { hot } from "react-hot-loader";

class App extends React.Component {
  render() {
    const { name } = this.props;
    return <div>Hello {name}</div>;
  }
}

export default hot(module)(App);
