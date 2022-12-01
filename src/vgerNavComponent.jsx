//import react
import React, {Component, useState} from "react";
//import css stylesheet
import './ToolBar.css';
import 'react-dropdown/style.css'
//import clock library to have a clock in the nav
import Clock from 'react-live-clock';
//assets, used in the dropdown as all the options
const assets =[
    'BatCave',
    'Heights',
    'Loop 4631',
    'Brazoria',
    'Lopeno 1',
    'Pueblo 1',
    'Pueblo 2',
    'Ranchtown',
    'Sweeny',
    'Zapata 1',
    'Zapata 2',
    'Alvin',
    'Angleton',
    'Magnolia',
    'Odessa',
    'NorthFork'
]
//create functional component for the Nav component
//essentially a constructor that has methods from app (add asset, remove all, change size, and fill all)
function VgerNavComponent() {
    //fill assets references the app function fillall

    function openNew(url){
        window.open(url, '_blank', 'noopener,noreferrer');
    }
    //return the actual html info
    return(
        <div>
            <nav className="d-flex flex-row justify-content-between nav_bar">


                <div className="d-flex flex-column justify-content-center" >
                    <ul className="navbar-nav mr-auto d-flex flex-row justify-content-start">
                        <button className="button_default" id="home_btn" onClick={()=> openNew('https://shark-app-a7mv2.ondigitalocean.app/')}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fillRule="currentColor"
                                 className="bi bi-house" viewBox="0 0 16 16">
                                <path
                                    d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5ZM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5 5 5Z"/>
                            </svg>
                        </button>

                    </ul>
                </div>
                <div>
                    {/*clock object, just tells the time as part of the nav bar*/}
                    <Clock className="clock" format={"HH:mm:ss"} ticking={true} timezone={'US/Central'}></Clock>
                </div>
            </nav>
        </div>
    );
}
export default VgerNavComponent;