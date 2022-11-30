
// imports react and the use state function
import React, {useState} from "react";
//app style sheet
import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import CardsController from "./cardsController";
import VoyagerController from "./voyagerController";

//assets dict that has all of the assets and their paired csv indexes
const assets_dict = {
    'BatCave':5,
    'Heights':15,
    'Loop 4631':14,
    'Brazoria':3,
    'Lopeno':8,
    'Pueblo 1':6,
    'Pueblo 2':7,
    'Ranchtown':12,
    'Sweeny':13,
    'Zapata 1':10,
    'Zapata 2':9,
    'Alvin':2,
    'Angleton':17,
    'Magnolia':4,
    'Odessa':16,
    'NorthFork':11,
}
//functional component for app
function App (){

    //basically returns the html for the page which is essentially just the Nav component with the array of cars below
    return(
        //browser router element used to create multiple pages for the voyager tab
        <BrowserRouter>
            <Routes>
                <Route path="/" >
                    {/*index = cards controller (card page)*/}
                    <Route index element={<CardsController />} />
                    {/*voyager path for voyager tables*/}
                    <Route path="voyager" element={<VoyagerController />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );

}

export default App;
