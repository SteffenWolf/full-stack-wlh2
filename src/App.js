import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./ducks/store";
import routes from "./routes";
import "./App.css";

class App extends Component {
  render() {
    return (
      // You can either implement Provider and Hashrouter in index.js or App.js
      // App.js is preferred when you get to testing, so it's good to get in the habit
      <Provider store={store}>
        <HashRouter>
          <div className="App">{routes}</div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
