import React, { Component } from "react";
import { Chessground } from "chessground";
import "../assets/chessground.css";
import "../assets/theme.css";

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			config: {},
			board: null
		};
	}

	componentDidMount() {
		this.setState({
			board: Chessground(document.getElementById("board"), {})
		});
	}
	render() {
		return (
			<div>
				<div className="blue merida">
					<div id="board" />
				</div>
			</div>
		);
	}
}

export default Board;
