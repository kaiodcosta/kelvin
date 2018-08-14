import React, { Component } from "react";
import Board from "./Board";

import { Card, CardBody, CardHeader, CardFooter } from "reactstrap";

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			white: {
				name: "",
				rating: 0,
				time: 0
			},
			black: {
				name: "",
				rating: 0,
				time: 0
			}
		};
	}
	render() {
		let white = (
			<CardHeader>
				<span> {this.props.game.split(" ")[17]}</span>
				<span> {this.state.white.rating}</span>
				<span style={{ float: "right" }}> {this.state.white.time}</span>
			</CardHeader>
		);
		let black = (
			<CardFooter>
				<span> {this.props.game.split(" ")[18]}</span>
				<span> {this.state.black.rating}</span>
				<span style={{ float: "right" }}> {this.state.black.time}</span>
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
