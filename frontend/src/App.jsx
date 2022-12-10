import { Link, Outlet } from "react-router-dom";
import "./App.css";

function Header() {
  return (
    <main>
      <header>
        <ul className="menu">
          <Link to="/">Exhange Information</Link>
          <Link to="announcements">Announcements</Link>
        </ul>
      </header>

      <Outlet />
    </main>
  );
}

export default Header;
