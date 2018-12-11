import React, { Component } from "react";
import Console from "./Console";
import Game from "./Game";
import { Container, Row, Col } from "reactstrap";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      messages: [],
      game: ""
    };

    this.sendCommand = this.sendCommand.bind(this);
  }

  sendCommand(command) {
    this.state.socket.send(command + "\r\n");
  }

  componentDidMount() {
    const socket = new WebSocket("ws://localhost:8080");

    this.setState({ socket: socket });
    socket.addEventListener("message", event => {
      console.log("Message from server ", event.data);

      /*
      // login as guest
      if (event.data.match(/login:/)) {
        this.sendCommand("guest");
      }
      if (event.data.match(/Press return/)) {
        this.sendCommand("");
      }
      if (event.data.match(/fics%/)) {
        this.sendCommand("set seek 0");
        this.sendCommand("set shout 0");
        this.sendCommand("set style 12");
      }
      //
      */
      // handling game state
      if (event.data.includes("<12>")) {
        this.setState({ game: event.data.slice(event.data.indexOf("<12>")) });
      }
      this.setState({
        messages: [...this.state.messages, event.data]
      });
    });
  }
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col xs="auto" className="mt-5">
              <Game game={this.state.game} onMove={this.sendCommand} />
            </Col>
            <Col xs="6" className="mt-4">
              <Console
                messages={this.state.messages}
                onCommand={this.sendCommand}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
