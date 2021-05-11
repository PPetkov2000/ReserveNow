import { Link } from "react-router-dom";
import SearchForm from "./SearchForm";

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-brand-link">
          ReserveNow
        </Link>
      </div>
      <SearchForm />
      <ul className="navbar-items">
        <li className="navbar-item">
          <Link to="/" className="navbar-item-link">
            Rooms
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
