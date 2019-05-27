import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

// const initialState = {};

const middleware = [thunk];

function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (err) {
    console.log(err);
  }
}

function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) return {};
    return JSON.parse(serializedState);
  } catch (err) {
    console.log(err);
    return {};
  }
}

const persistedState = loadFromLocalStorage();

const store = createStore(rootReducer, persistedState, applyMiddleware(...middleware));

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
