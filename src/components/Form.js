import React from "react";
import { Input, Form, Icon, Segment, Item } from "semantic-ui-react";

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    // alert("A name was submitted: " + this.state.value);
    let state = JSON.parse(localStorage.getItem("state")).loginDetails;
    let message = {};
    message[state.serverResponseKey] = this.state.value;
    console.log(message);
    this.props.channel.trigger("client-message", {
      userId: state.insentUserId,
      channelName: state.userChannelName,
      message: JSON.stringify(message)
    });
    console.log(this.state.value);
    // console.log(this.props.channel);
    event.preventDefault();
  }

  render() {
    return (
      <Segment
        raised
        color="blue"
        style={{ marginTop: "0.4rem", maxWidth: "90%" }}
      >
        <Form onSubmit={this.handleSubmit}>
          <Input
            iconPosition="left"
            placeholder={this.props.item.name}
            style={{ maxWidth: "100%" }}
            onChange={this.handleChange}
          >
            <input type={this.props.item.type}/>
          </Input>{" "}
        </Form>
      </Segment>
    );
  }
}

export default NameForm;
