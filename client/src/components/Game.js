import React, { PureComponent } from "react";
import { Chessground } from "chessground";
import Chess from "chess.js";
import "../assets/chessground.css";
import "../assets/theme.css";

import { ranks2fen } from "../lib/ranks2fen";

import { Card, CardBody, CardHeader, CardFooter } from "reactstrap";

class Game extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			board: null
		};
		this.onMove = this.onMove.bind(this);
	}

	onMove(from, to, captured) {
		this.props.onMove(from + to);
	}
	componentDidMount() {
		this.setState({
			board: Chessground(document.getElementById("board"), {
				movable: { free: false },
				events: { move: this.onMove }
			})
		});
	}

	componentDidUpdate() {
		let chess = new Chess();
		// TODO put this on a function
		if (this.props.game !== "") {
			let myRelation = this.props.game.split(" ")[19];
			let flip = this.props.game.split(" ")[30];
			let moveNumber = this.props.game.split(" ")[26];
			let move = this.props.game.split(" ")[29];
			// castle move not verbose

			// let lastMove = this.props.game.split(" ")[27].split("/")[1].split("-");
			let fen = ranks2fen(
				this.props.game
					.split(" ")
					.slice(1, 9)
					.join(" ")
			);

			chess.load(fen);
			console.log("resetting cg");
			console.log("fen:", fen);
			this.state.board.set({
				fen: fen,
				movable: { free: myRelation === "0" ? false : true },
				orientation: flip === "0" ? "white" : "black"
			});
		}
	}
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
					<div className="blue merida">
						<div
							id="board"
							style={{ width: "400px", height: "400px" }}
						/>
					</div>
				</CardBody>

				{this.props.game.split(" ")[30] === "0" ? white : black}
			</Card>
		);
	}
}

export default Game;
