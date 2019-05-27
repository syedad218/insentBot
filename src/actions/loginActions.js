import {
  LOGIN,
  GET_WORKSPACE_ID,
  GET_FLOW_ID,
  GET_CHANNEL_DETAILS,
  UPDATE_RESPONSE_KEY
} from "./types";
import axios from "axios";

export const login = (username, password) => dispatch => {
  axios
    .post("https://prod-be.insent.ai/app/login", {
      email: process.env.REACT_APP_USERNAME,
      password: process.env.REACT_APP_PASSWORD
    })
    .then(res => {
      console.log("1st ", res.data);
      dispatch({
        type: LOGIN,
        payload: res.data
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const getWorkspaceId = token => dispatch => {
  axios
    .get("https://prod-be.insent.ai/app/workspace", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      console.log("2nd ", res.data);
      dispatch({
        type: GET_WORKSPACE_ID,
        payload: res.data[0]
      });
    })
    .catch(error => {
      console.log(error);
    });
};

export const getFlowId = (token, workspaceId) => dispatch => {
  axios
    .get(`https://prod-be.insent.ai/app/${workspaceId}/flow`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("3rd ", response.data);
      dispatch({
        type: GET_FLOW_ID,
        payload: response.data[0]
      });
    })
    .catch(err => console.log(err));
};

export const getChannelDetails = (flowId, workspaceId) => dispatch => {
  axios
    .get(
      `https://prod-be.insent.ai/getuser?url=app.insent.ai/botBuild/${flowId}`,
      {
        headers: {
          Authorization: `Bearer ${workspaceId}`
        }
      }
    )
    .then(response => {
      console.log("4th ", response.data);
      let key = null;
      response.data.messages.map(item => {
        if (item.buttons) {
          key = item.buttons.key;
        }
        else if(item.input){
          key = item.input[0].key;
        }
        return null;
      });
      console.log("Key ", key);
      dispatch({
        type: GET_CHANNEL_DETAILS,
        payload: response.data,
        serverResponseKey: key
      });
    })
    .catch(err => console.log(err));
};

export const updateResponseKey = data => dispatch => {
  let key = null;
  data.messages.map(item => {
    if (item.buttons) {
      key = item.buttons.key;
    }
    return null;
  });
  console.log('New Response Key', key);
  dispatch({
    type: UPDATE_RESPONSE_KEY,
    payload: key
  });
};
