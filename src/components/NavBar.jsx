import React from 'react';
import { NavLink } from 'react-router-dom'

function NavBar(props) {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
            
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/login" activeClassName="active" exact={true}>Home</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/calendar" activeClassName="active" exact={true}>Calendar</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/meetings" activeClassName="active" exact={true}>Meetings</NavLink>
                        </li>

                    </ul>
                </div>
            </nav>
        </>
    );
}

export default NavBar;