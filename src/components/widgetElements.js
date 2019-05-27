import React from "react";
import { Card, Button} from "semantic-ui-react";
import { addUserMessage } from "react-chat-widget";
import NameForm from "./Form";

export const textElement = (item, index) => {
  return (
    <div key={index} className="rcw-response" style={{ marginTop: "0.4rem" }}>
      <div className="rcw-message-text">
        <p>{item.text}</p>
      </div>
    </div>
  );
};

export const cardElements = (item, index) => {
  return (
    <div
      key={index}
      className="cards_element"
      style={{ marginTop: "0.4rem", maxWidth: "50%" }}
    >
      {item.cards.map((item, index) => {
        return (
          <Card
            color="blue"
            key={index}
            image={item.imgUrl}
            header={item.title}
            description={item.desc}
            extra={<a href={item.url}>{item.button}</a>}
          />
        );
      })}
    </div>
  );
};

export const inputElements = (item, index, channel) => {
  return (
    <div className="input_elements" key={index}>
      {item.input.map((item, index) => {
        return <NameForm channel={channel} key={index} item={item}/>;
      })}
    </div>
  );
};

export const buttonElements = (item, index, channel) => {
  return (
    <div className="opts" key={index} style={{ marginTop: "0.5rem" }}>
      {item.buttons.fields.map((item, index) => {
        return (
          <Button
            key={index}
            basic
            color="blue"
            fluid
            onClick={() => {
              let state = JSON.parse(localStorage.getItem("state"))
                .loginDetails;
              let message = {};
              message[state.serverResponseKey] = [item];

              channel.trigger("client-message", {
                userId: state.insentUserId,
                channelName: state.userChannelName,
                message: JSON.stringify(message)
              });

              console.log(" Button Clicked...");
              let elem = document.querySelector(".opts");
              elem.parentNode.removeChild(elem);
              addUserMessage(item);
            }}
            style={{ marginTop: "0.2rem", maxWidth: "90%" }}
          >
            {item}
          </Button>
        );
      })}
    </div>
  );
};

// channel.trigger("client-message", {
//   userId: "5ce82bf2f05f1c002031f055",
//   channelName: "private-5ce82bf2f05f1c002031f0551558719944238",
//   message: '{"3347e8815de9cea0972269cda4b82e":["check"] }'
// });
