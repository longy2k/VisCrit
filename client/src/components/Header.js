import React from "react"
import Logo from "../noImage.jpg"
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import UploadP from "./UploadP";
import Home from "./Home";
//import About from "./About";
import MainBody from "./MainBody";

export default function Header() {
    return (
        <Router> 
        <ul className="nav-items">
            <li style={{marginRight:"70%"}}> <Link to="/"><img src={Logo} className="nav-logo" alt="logo image"/></Link></li>
            <li> <Link to="/">Home</Link></li>
            <li> <Link to="/upload"> Upload</Link></li>
            <li> <Link to="/testing">Testing</Link></li>
        </ul>
            <Routes>
                <Route exact path='/' element={< Home />}></Route>
                <Route exact path='/testing' element={< MainBody />}></Route>
                <Route exact path='/upload' element={< UploadP />}></Route>
            </Routes>
        </Router>
    )
}
