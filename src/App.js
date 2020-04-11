import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./router/AppRouter";
import configureStore from "./redux/setupStore";
import "./styles/main.scss";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
