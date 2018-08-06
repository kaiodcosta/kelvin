import React, { Component } from "react";

class App extends Component {
  componentDidMount() {
    const ws = new WebSocket("ws://localhost:8080");
    // Listen for messages
    ws.addEventListener("message", function(event) {
      console.log("Message from server ", event.data);
    });
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <p />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
