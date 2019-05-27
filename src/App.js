import React, { Component } from "react";
import "./App.css";
import ChatWidget from "./components/ChatWidget";
import { Provider } from "react-redux";
import store from "./store";


class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <ChatWidget />
        </div>
      </Provider>
    );
  }
}

export default App;










// componentDidMount() {
  //   // axios
  //         // .get(
  //         //   `https://prod-be.insent.ai/app/${sessionStorage.getItem(
  //         //     "insent-active-workspace-id"
  //         //   )}/flow/${sessionStorage.getItem("insent-active-flow-id")}`,
  //         //   {
  //         //     headers: {
  //         //       Authorization: `Bearer ${localStorage.getItem(
  //         //         "insent-publisher-login-token"
  //         //       )}`
  //         //     }
  //         //   }
  //         // )
  //         // .then(response => {
  //         //   console.log(response.data);
            
  //               // localStorage.setItem("insent-user-id", response.data.userId);
                
  //               // sessionStorage.setItem(
  //               //   "server-json",
  //               //   JSON.stringify(server_json)
  //               // );
  //               // sessionStorage.setItem(
  //               //   "user-channel-name",
  //               //   response.data.channelId
  //               // );
  //               // sessionStorage.setItem('user-response-json-key', response.data.messages[1].buttons.key);
  //               // this.populateWidget();
  //             // });
  //         // });
  //     // })
  //     // .catch(err => console.log(err));

  //   // addResponseMessage("Welcome to this awesome chat!");
  //   // const MyComponent = () => {
  //   //   return (
  //   //     <div>
  //   //       <div className="rcw-response">
  //   //         <div className="rcw-message-text">
  //   //           <p>This is my first React Component.</p>
  //   //         </div>
  //   //       </div>
  //   //       <br />
  //   //       <div className='opts'>
  //   //         <Button basic color="blue" fluid onClick={this.handleClick}>
  //   //           Button
  //   //         </Button>
  //   //       </div>
  //   //     </div>
  //   //   );
  //   // };
  //   // // let a = document.getElementById("messages");
  //   // // console.log(a);
  //   // renderCustomComponent(MyComponent, {}, logo);
  //   // // toggleInputDisabled();
  // }