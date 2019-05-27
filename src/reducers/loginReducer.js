import {
  LOGIN,
  GET_WORKSPACE_ID,
  GET_FLOW_ID,
  GET_CHANNEL_DETAILS,
  UPDATE_RESPONSE_KEY,
  UPDATE_INPUT
} from "../actions/types";

const initialState = {
  insentPublisherLoginToken: null,
  activeWorkspaceId: null,
  activeFlowId: null,
  insentUserId: null,
  serverJson: null,
  userChannelName: null,
  serverResponseKey: null,
  input: true
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        insentPublisherLoginToken: action.payload.token
      };

    case GET_WORKSPACE_ID:
      return {
        ...state,
        activeWorkspaceId: action.payload.id
      };

    case GET_FLOW_ID:
      return {
        ...state,
        activeFlowId: action.payload.fid
      };

    case GET_CHANNEL_DETAILS:
      return {
        ...state,
        insentUserId: action.payload.userId,
        serverJson: {
          end: action.payload.end,
          input: action.payload.input,
          messages: action.payload.messages,
          sender: action.payload.sender
        },
        userChannelName: action.payload.channelId,
        serverResponseKey: action.serverResponseKey,
        input: action.payload.input
      };
    case UPDATE_RESPONSE_KEY:
      return {
        ...state,
        serverResponseKey: action.payload
      }
    case UPDATE_INPUT:
      return {
        ...state,
        input: action.payload
      }

    default:
      return state;
  }
}
