import React, { PureComponent } from "react";
import { Chessground } from "chessground";
import Chess from "chess.js";
import "../assets/chessground.css";
import "../assets/theme.css";

import { style12 } from "../lib/style12";

import { Card, CardBody, CardHeader, CardFooter } from "reactstrap";

function toDests(chess) {
	const dests = {};
	chess.SQUARES.forEach(s => {
		const ms = chess.moves({ square: s, verbose: true });
		if (ms.length) dests[s] = ms.map(m => m.to);
	});
	return dests;
}

class Game extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			board: null
		};
		this.onMove = this.onMove.bind(this);
		this.updateBoard = this.updateBoard.bind(this);
	}

	onMove(from, to, captured) {
		this.props.onMove(from + to);
	}

	updateBoard() {
		let chess = new Chess();
		if (this.props.game !== "") {
			let myRelation = this.props.game.split(" ")[19];
			let flip = this.props.game.split(" ")[30];
			let moveNumber = this.props.game.split(" ")[26];
			let move = this.props.game.split(" ")[29];
			let color = this.props.game.split(" ")[9];
			// castle move not verbose

			// let lastMove = this.props.game.split(" ")[27].split("/")[1].split("-");
			let fen = style12(
				this.props.game
					.split(" ")
					.slice(1, 9)
					.join(" ")
			);

			chess.load(fen + " " + color.toLowerCase() + " - - 0 1");
			console.log("resetting cg", chess.fen());
			console.log("fen:", fen + " " + color);
			this.state.board.set({
				fen: fen,
				movable: {
					dests: toDests(chess)
				},
				orientation: flip === "0" ? "white" : "black"
			});
		}
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
		this.updateBoard();
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
