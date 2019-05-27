import React, { Component } from "react";
import { connect } from "react-redux";
import {
  login,
  getWorkspaceId,
  getFlowId,
  getChannelDetails
} from "../actions/loginActions";
import { Widget, renderCustomComponent } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";
import logo from "../logo-link-preview.png";
import { getChannel } from "./Channel.js";
import { populateWidget } from "./populateWidget";
import store from "../store";
import { UPDATE_INPUT } from "../actions/types";

var channel = null;
var myComponent = null;

class ChatWidget extends Component {
  componentDidMount() {
    let persistedState = JSON.parse(localStorage.getItem("state"));
    if(persistedState === null){
      // do nothing
      this.props.login(
        process.env.REACT_APP_USERNAME,
        process.env.REACT_APP_PASSWORD
      );
    }
    else if (persistedState.loginDetails.activeFlowId !== null && persistedState.loginDetails.activeWorkspaceId !== null ) {
      console.log("Calling 4th");
      this.props.getChannelDetails(
        persistedState.loginDetails.activeFlowId,
        persistedState.loginDetails.activeWorkspaceId
      );
    }
    else {
      localStorage.clear();
    }
    
    let elem = document.querySelector(".rcw-launcher");
    // let that = this;
    elem.onclick = function() {
      setTimeout(function() {
        try {
          if (document.querySelector(".rcw-sender")) {
            console.log("Got it .....");
            let elem = document.querySelector(".rcw-sender");
            if (store.getState().loginDetails.input) {
              elem.style.display = "flex";
            } else {
              elem.style.display = "none";
            }
          }
        } catch (err) {
          console.log(err);
        }
      }, 1000);
    };
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps;
    if (channel) {
      // do nothing
    } else if (this.props.userChannelName) {
      channel = getChannel(this.props.userChannelName);
      store.dispatch({
        type: UPDATE_INPUT,
        payload: this.props.serverJson.input
      });
      myComponent = populateWidget(this.props.serverJson, channel);
      renderCustomComponent(myComponent, {}, logo);
    } else if (this.props.activeFlowId) {
      console.log("Inside 4th");
      this.props.getChannelDetails(
        this.props.activeFlowId,
        this.props.activeWorkspaceId
      );
    } else if (this.props.activeWorkspaceId) {
      console.log("Inside 3rd");
      this.props.getFlowId(
        this.props.insentPublisherLoginToken,
        this.props.activeWorkspaceId
      );
    } else if (this.props.insentPublisherLoginToken) {
      console.log("Inside 2nd");
      this.props.getWorkspaceId(this.props.insentPublisherLoginToken);
    }
  }

  handleNewUserMessage = newMessage => {
    console.log(`New message incoming! ${newMessage}`);
    let state = JSON.parse(localStorage.getItem("state")).loginDetails;
    channel.trigger("client-message", {
      userId: state.insentUserId,
      channelName: state.userChannelName,
      message: { text: newMessage }
    });
  };

  render() {
    try {
      if (document.querySelector(".rcw-sender")) {
        console.log("Got it .....");
        let elem = document.querySelector(".rcw-sender");
        if (store.getState().loginDetails.input) {
          elem.style.display = "flex";
        } else {
          elem.style.display = "none";
        }
      }
    } catch (err) {
      console.log(err);
    }
    return (
      <Widget
        handleNewUserMessage={this.handleNewUserMessage}
        profileAvatar={logo}
        title="Insent Bot"
        subtitle="You are talking to Insent Bot."
      />
    );
  }
}

const mapStateToProps = state => ({
  insentPublisherLoginToken: state.loginDetails.insentPublisherLoginToken,
  activeWorkspaceId: state.loginDetails.activeWorkspaceId,
  activeFlowId: state.loginDetails.activeFlowId,
  insentUserId: state.loginDetails.insentUserId,
  serverJson: state.loginDetails.serverJson,
  userChannelName: state.loginDetails.userChannelName,
  input: state.loginDetails.input
});

export default connect(
  mapStateToProps,
  { login, getWorkspaceId, getFlowId, getChannelDetails }
)(ChatWidget);
