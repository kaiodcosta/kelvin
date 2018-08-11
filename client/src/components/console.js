import React, { Component } from "react";
import { Card } from "reactstrap";
import {
	Button,
	Form,
	FormGroup,
	Input,
	InputGroup,
	InputGroupAddon
} from "reactstrap";
import { ListGroup, ListGroupItem } from "reactstrap";

const cardStyle = {
	height: "500px",
	overflowY: "auto"
};

class Console extends Component {
	constructor(props) {
		super(props);
		this.state = {
			socket: null,
			command: "",
			messages: []
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.scrollToBottom = this.scrollToBottom.bind(this);
	}

	handleChange(event) {
		this.setState({ command: event.target.value });
	}

	handleSubmit(event) {
		this.state.socket.send(this.state.command + "\r\n");
		this.setState({ command: "" });
		event.preventDefault();
	}

	scrollToBottom() {
		this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	componentDidMount() {
		const socket = new WebSocket("ws://localhost:8080");

		this.setState({ socket: socket });
		socket.addEventListener("message", event => {
			console.log("Message from server ", event.data);
			this.setState({
				messages: [...this.state.messages, event.data]
			});
		});
		this.scrollToBottom();
	}
	componentDidUpdate() {
		this.scrollToBottom();
	}

	render() {
		let messages = this.state.messages.map((message, key) => {
			return (
				<ListGroupItem key={key}>{<pre>{message}</pre>}</ListGroupItem>
			);
		});
		return (
			<Card border-primary body>
				<Card style={cardStyle}>
					<ListGroup>
						{messages}
						<div
							style={{ float: "left", clear: "both" }}
							ref={el => {
								this.messagesEnd = el;
							}}
						/>
					</ListGroup>
				</Card>
				<Form inline onSubmit={this.handleSubmit}>
					<InputGroup className="w-100">
						<Input
							type="text"
							name="command"
							id="command"
							placeholder="write a command ..."
							value={this.state.command}
							onChange={this.handleChange}
							size="sm"
						/>
						<InputGroupAddon addonType="append">
							<Input type="submit" value="Send" size="sm" />
						</InputGroupAddon>
					</InputGroup>
				</Form>
			</Card>
		);
	}
}

export default Console;
