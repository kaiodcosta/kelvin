import React, { PureComponent } from "react";
import Board from "./Board";

import { Card, CardBody, CardHeader, CardFooter } from "reactstrap";

class Game extends PureComponent {
	render() {
		let white = (
			<CardHeader>
				<span> {this.props.game.split(" ")[17]}</span>
			</CardHeader>
		);
		let black = (
			<CardFooter>
				<span> {this.props.game.split(" ")[18]}</span>
			</CardFooter>
		);
		return (
			<Card border-primary>
				{this.props.game.split(" ")[30] === "0" ? black : white}

				<CardBody style={{ padding: "0" }}>
					<Board game={this.props.game} />
				</CardBody>

				{this.props.game.split(" ")[30] === "0" ? white : black}
			</Card>
		);
	}
}

export default Game;
