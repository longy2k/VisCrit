import React from "react"
import Logo from "./noImage.jpg"
import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import MainBody from "./MainBody";
import UploadP from "./UploadP";
import Home from "./Home";
import About from "./About";


export default function Header(){
    return (
        <Router> 
        <img src={Logo} className="nav-logo" alt="logo image"/>
        <ul className="nav-items">
                <li> <Link to="/">Home</Link></li>
                <li> <Link to="/upload">Upload</Link></li>
                <li> <Link to="/about">About</Link></li>
                <li> <Link to="/">Contact</Link></li>
            </ul>
            <Routes>
                <Route exact path='/' element={< Home />}></Route>
                <Route exact path='/about' element={< About />}></Route>
                <Route exact path='/upload' element={< MainBody />}></Route>
            </Routes>
        </Router>
    )
}
