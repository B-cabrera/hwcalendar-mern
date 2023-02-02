import { Link } from "react-router-dom"
import "../styles/NavBar.css"

export default function NavBar() {
    return (
        <div id="navbar">
            <div>
                <h1 id="logo">[Add Logo Here]</h1>
            </div>
            <div>
                <h1><Link to='/'>HwCalendar</Link></h1>
            </div>
        </div>
    );
}