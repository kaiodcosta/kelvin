import React, { Component } from "react";
import Board from "./Board";

import { Card, CardBody, CardHeader, CardFooter } from "reactstrap";

class Game extends Component {
	constructor(props) {
		super(props);
		this.state = {
			wName: "Magnus Carlsen",
			bName: "Fabiano Caruana",
			wRating: 2824,
			bRating: 2810,
			wTime: 231,
			bTime: 200,
			variant: "",
			pgn: {}
		};
	}
	render() {
		return (
			<Card border-primary>
				<CardHeader>
					<span> {this.state.wName}</span>
					<span> {this.state.wRating}</span>
					<span style={{ float: "right" }}> {this.state.wTime}</span>
				</CardHeader>

				<CardBody style={{ padding: "0" }}>
					<Board />
				</CardBody>
				<CardHeader>
					<span> {this.state.bName}</span>
					<span> {this.state.bRating}</span>
					<span style={{ float: "right" }}> {this.state.bTime}</span>
				</CardHeader>
			</Card>
		);
	}
}

export default Game;
