import React, { PureComponent } from "react";
import { Chessground } from "chessground";
import "../assets/chessground.css";
import "../assets/theme.css";

import { ranks2fen } from "../lib/ranks2fen";

class Board extends PureComponent {
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
		// TODO put this on a function
		if (this.props.game !== "") {
			let myRelation = this.props.game.split(" ")[19];
			let flip = this.props.game.split(" ")[30];

			// castle move not verbose

			// let lastMove = this.props.game.split(" ")[27].split("/")[1].split("-");
			let fen = ranks2fen(
				this.props.game
					.split(" ")
					.slice(1, 9)
					.join(" ")
			);

			console.log("resetting cg");
			this.state.board.set({
				fen: fen,
				movable: { free: myRelation === "0" ? false : true },
				orientation: flip === "0" ? "white" : "black"
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
