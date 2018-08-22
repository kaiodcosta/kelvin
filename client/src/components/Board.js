import React, { Component } from "react";
import { Chessground } from "chessground";
import "../assets/chessground.css";
import "../assets/theme.css";

import { ranks2fen } from "../lib/ranks2fen";

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			board: null
		};
	}

	componentDidMount() {
		this.setState({
			board: Chessground(document.getElementById("board"), {})
		});
	}

	componentDidUpdate() {
		if (this.props.game !== "") {
			let myRelation = this.props.game.split(" ")[19];
			let flip = this.props.game.split(" ")[30];
			let fen = ranks2fen(
				this.props.game
					.split(" ")
					.slice(1, 9)
					.join(" ")
			);

			this.state.board.set({
				fen: fen,
				orientation: flip === "0" ? "white" : "white",
				viewOnly: myRelation === "0" ? true : false
			});
		}
	}
	render() {
		return (
			<div className="blue merida">
				<div id="board" style={{ width: "400px", height: "400px" }} />
			</div>
		);
	}
}

export default Board;
