import React from 'react'
import Search from "./components/Search.jsx"
import {useEffect, useState} from "react";

const API_BASE_URL='https://api.themoviedb.org/3/';

const API_KEY = import.meta.env.VITE_TMBD_API_KEY;
const App = () => {
    const[searchTerm, setSearchTerm] = React.useState('')

    useEffect( () => {},[])

    return (
        <main>
            <div className="pattern" />

            <div className = "wrapper">
                <header >
                    <img src = "./hero-img.png" alt="hero-banner"/>
                    <h1>Find <span className="text-gradient">Movies </span>You'll enjoy without the hassle</h1>
                </header>


                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </div>
        </main>

    )
}
export default App
