import './header.css'
import { Link } from "react-router-dom";
function Header() {
    return (
        <ul className="mainHeader">
            <li className="navButton"><Link to="/">To Do</Link></li>
            <li className="navButton"><Link to="/completed">Archive</Link></li>
            <li className="navButton"><Link to="/addTask">Add task</Link></li>
            <li className="navButton"><Link to="/calendar">Calendar</Link></li>
        </ul>

    )
}

export default Header;