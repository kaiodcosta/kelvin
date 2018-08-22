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
			command: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.scrollToBottom = this.scrollToBottom.bind(this);
	}

	handleChange(event) {
		this.setState({ command: event.target.value });
	}

	handleSubmit(event) {
		this.props.onCommand(this.state.command);
		this.setState({ command: "" });
		event.preventDefault();
	}

	scrollToBottom() {
		this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	componentDidMount() {
		this.scrollToBottom();
	}
	componentDidUpdate() {
		this.scrollToBottom();
	}

	render() {
		let messages = this.props.messages.map((message, key) => {
			return (
				<ListGroupItem key={key}>
					<pre>{message}</pre>
				</ListGroupItem>
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
							<Input
								className="btn-primary"
								type="submit"
								value="Send"
								size="sm"
								color="primary"
							/>
						</InputGroupAddon>
					</InputGroup>
				</Form>
			</Card>
		);
	}
}

export default Console;
