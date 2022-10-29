import React from "react";
import {Link} from "react-router-dom"
//import "./LandingPage.css"

export default function LandingPage() {
    return(
        <div className="fondo">
            <h1>Welcome to Henry Food</h1>
            <Link to='/home'>
                <button>Start</button>
            </Link>
        </div>
    )
}