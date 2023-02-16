import React from "react"
import Logo from "./noImage.jpg"

export default function Header(){
    return (
        <header>
            <nav className="nav">
                <img src={Logo} className="nav-logo" alt="logo image"/>
                <ul className="nav-items">
                    <li>Home</li>
                    <li>Upload</li>
                    <li>About</li>
                    <li>Contact</li>
                </ul>
            </nav> 
        </header>
    )
}