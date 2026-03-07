import { BrowserRouter } from "react-router";
import { Home } from "./components/Home";
import { Provider } from "react-redux";
import { store } from "./store";
function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Home></Home>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
