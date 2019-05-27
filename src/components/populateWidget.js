import React from "react";
import {
  textElement,
  cardElements,
  inputElements,
  buttonElements
} from "./widgetElements";

export const populateWidget = (data, channel) => {
  const MyComponent = () => {
    return (
      <div>
        {/* <p style={{ textAlign: 'left', color: '#A9A9A9', fontSize: '10px'}}> { `Insent Bot . ${moment(date).fromNow()}` }</p> */}
        {data.messages.map((item, index) => {
          let html_element = null;
          if (item.text) {
            html_element = textElement(item, index);
          } else if (item.cards) {
            html_element = cardElements(item, index);
          } else if (item.input) {
            html_element = inputElements(item, index, channel);
          } else if (item.buttons) {
            html_element = buttonElements(item, index, channel);
          } else {
            html_element = "";
          }
          return html_element;
        })}
      </div>
    );
  };
  return MyComponent;
};
