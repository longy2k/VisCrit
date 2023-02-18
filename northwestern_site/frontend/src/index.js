import React from 'react';
import Header from "./Header"
import ReactDOM  from "react-dom"
import Footer from "./Footer"
import "./style.css"

function Page() {
    return (
        <div>
        <Header/>
        <Footer />
        </div>
    )
}

ReactDOM.render(
    <Page />
    ,
    document.getElementById("root")
)
