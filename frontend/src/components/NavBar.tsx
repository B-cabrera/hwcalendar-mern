import { Link, useNavigate } from "react-router-dom"
import "../styles/NavBar.css"
import HwCalendarLogo from '../assets/HWCalendarLogo.png';

export default function NavBar() {
  const navigate = useNavigate();

  function logUserOut() {
    sessionStorage.removeItem('token');
    navigate('/login');
  }


  return (
    <div id="navbar">
      <div id="name">
        <Link to='/'>
          <img
            id="logo"
            src={HwCalendarLogo}
          />
        </Link>
        <h1><Link to='/'>
          HwCalendar
        </Link></h1>
      </div>
        <button 
        id="logoutbtn"
        onClick={logUserOut}
        >Logout</button>
    </div>
  );
}