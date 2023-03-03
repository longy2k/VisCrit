import React from "react"
import Logo from "../noImage.jpg"
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import CreatePage from "./CreatePage";
import Home from "./Home";
//import About from "./About";
import MainBody from "./MainBody";

export default function Header() {
    return (
        <Router>
        <ul className="nav-items">
            <li> <Link to="/CS410_northwestern">
            <img src={Logo}

            className="nav-logo" alt="logo image"/>
            </Link>
            </li>
            <li> <Link to="/CS410_northwestern">Home</Link></li>
            <li> <Link to="/CS410_northwestern/create">Create</Link></li>
            <li> <Link to="/CS410_northwestern/testing">Testing</Link></li>
        </ul>
            <Routes>
                <Route exact path='/CS410_northwestern/' element={< Home />}></Route>
                <Route exact path='/CS410_northwestern/create' element={< CreatePage />}></Route>
                <Route exact path='/CS410_northwestern/testing' element={< MainBody />}></Route>
            </Routes>
        </Router>
    )
}
