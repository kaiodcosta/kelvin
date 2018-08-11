import React, { Component } from "react";
import Console from "./Console";
import Game from "./Game";
import { Container, Row, Col } from "reactstrap";
class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <Row>
            <Col xs="6">
              <Game />
            </Col>
            <Col xs="6">
              <Console />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
