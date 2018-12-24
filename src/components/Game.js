import React from "react";
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

class Timer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			timer: props.start
		};
		this.timerID = null;
	}
	componentDidMount() {
		if (!this.props.stopped) {
			this.setTimerInterval();
		}
	}

	setTimerInterval = () => {
		if (this.timerID) {
			clearInterval(this.timerID);
		}

		this.timerID = setInterval(() => {
			this.setState({
				timer: this.state.timer - 1
			});
		}, 1000);
	};

	componentDidUpdate(prevProps) {
		if (this.state.timer === 0 || this.props.stopped) {
			clearInterval(this.timerID);
		}
		if (
			this.props.start !== prevProps.start ||
			this.props.stopped !== prevProps.stopped
		) {
			this.setState({ timer: this.props.start });
			this.setTimerInterval();
		}
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	render() {
		console.log("Timer component rendered");
		return (
			<div>
				{Math.floor(this.state.timer / 60)}:{this.state.timer % 60}
			</div>
		);
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			board: null,
			whiteTime: 0,
			blackTime: 0
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
			let increment = this.props.game.split(" ")[21];

			/*
			this.setState({
				whiteTime: parseInt(this.props.game.split(" ")[24])
			});
			this.setState({
				whiteTime: parseInt(this.props.game.split(" ")[25])
			});
			*/

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

			/*
			if (color === "white") {
				console.log("it's white's turn");
				this.whiteTimer = setInterval(() => {
					this.whiteTime = this.whiteTime - 1 + parseInt(increment);
				}, 1000);
				clearInterval(this.blackTimer);
			} else {
				console.log("it's black's turn");
				this.blackTimer = setInterval(() => {
					this.blackTime = this.blackTime - 1 + parseInt(increment);
				}, 1000);
				clearInterval(this.whiteTimer);
			}*/
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

	shouldComponentUpdate(nextProps) {
		return this.props.game !== nextProps.game;
	}

	componentDidUpdate() {
		this.updateBoard();
	}

	render() {
		console.log("Game component rendered");

		let white = (
			<CardHeader>
				<span style={{ float: "left" }}>
					{this.props.game.split(" ")[17]}
				</span>
				<span style={{ float: "right" }}>
					<Timer
						start={parseInt(this.props.game.split(" ")[24]) || 0}
						stopped={this.props.game.split(" ")[9] === "B"}
					/>
				</span>
			</CardHeader>
		);
		let black = (
			<CardFooter>
				<span style={{ float: "left" }}>
					{this.props.game.split(" ")[18]}
				</span>
				<span style={{ float: "right" }}>
					<Timer
						start={parseInt(this.props.game.split(" ")[25]) || 0}
						stopped={this.props.game.split(" ")[9] === "W"}
					/>
				</span>
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
