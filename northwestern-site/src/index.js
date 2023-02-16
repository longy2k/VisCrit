import Header from "./Header"
import Footer from "./Footer"
import MainBody from "./MainBody"
import React from "react"
import ReactDOM  from "react-dom"
import "./style.css"

function Page() {
    return (
        <div>
        <Header />
        <MainBody />
        <Footer />
        </div>
    )
}

ReactDOM.render(
    <Page />
    ,
    document.getElementById("root")
)