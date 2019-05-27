import Pusher from "pusher-js";
import { populateWidget } from "./populateWidget";
import { renderCustomComponent } from "react-chat-widget";
import logo from "../logo-link-preview.png";
import store from "../store";

export const getChannel = channelId => {
  const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
    cluster: process.env.REACT_APP_PUSHER_CLUSTER,
    authEndpoint: process.env.REACT_APP_AUTH_ENDPOINT,
    forceTLS: true
  });
  let channel = pusher.subscribe(channelId);
  // console.log(channel);
  channel.bind("client-message", function(data) {
    console.log("Sending to Server ", data);
  });

  channel.bind("server-message", function(data) {
    console.log("Server Responded: ", data);
    let myComponent = populateWidget(data, channel);
    renderCustomComponent(myComponent, {}, logo);
    let key = null;
    data.messages.map(item => {
      if (item.buttons) {
        key = item.buttons.key;
      }
      else if(item.input){
        key = item.input[0].key;
      }
      return null;
    });
    console.log('New Response Key', key);
    store.dispatch({
      type: "UPDATE_RESPONSE_KEY",
      payload: key
    });
    store.dispatch({
      type: "UPDATE_INPUT",
      payload: data.input
    });
  });

  channel.bind("pusher:subscription_succeeded", function() {
    console.log("pusher subscription complete ... ");
  });

  return channel;
};

// var elements = ["text", "buttons", "cards", "input"];
// var special_element = ["buttons", "input", "plainInput"];
