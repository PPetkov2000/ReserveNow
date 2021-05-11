import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.scss";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import RoomList from "./pages/RoomList";
import Room from "./pages/Room";
import Host from "./pages/Host";

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <div className="content-wrapper">
        <Switch>
          <Route path="/" exact component={RoomList} />
          <Route path="/rooms" exact component={RoomList} />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/host/:id" component={Host} />
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
