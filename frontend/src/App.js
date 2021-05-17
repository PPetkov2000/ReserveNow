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
      <main className="content-wrapper">
        <Switch>
          <Route
            path={["/", "/rooms", "/search/:keyword", "/page/:pageNumber"]}
            exact
            component={RoomList}
          />
          <Route path="/rooms/:id" component={Room} />
          <Route path="/host/:id" component={Host} />
        </Switch>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
