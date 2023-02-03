import { Link } from "react-router-dom"
import "../styles/NavBar.css"

export default function NavBar() {
  return (
    <div id="navbar">
      <div>
        <Link to='/'>
          <img
            id="logo"
            src="/src/assets/HWCalendarLogo.png"
          />
        </Link>
      </div>
      <div>
        <h1><Link to='/'>
          HwCalendar
        </Link></h1>
      </div>
    </div>
  );
}