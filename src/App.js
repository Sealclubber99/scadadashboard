
// imports react and the use state function
import React, {useState} from "react";
//app style sheet
import './App.css';
//import nav functional component
import NavComponent from "./components/navComponent";
//import cards functional component
import CardsComponent from "./components/cardsComponent";
//import card comp class to make a card
import CardComp from "./components/cardComp";
import AlertMenu from "./components/alertMenu";
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
    //
    // //hooks vs class state because we went the functional component vs react component route
    // //selected asset is for the current dropdown selection from nav then adds it to a list of all the other assets chosen
    // //use state to access variables without using the react component class state storage
    // const [selectedAsset, setSelectedAsset] = useState(
    //     () => JSON.parse(localStorage.getItem("selectedAsset")) || []
    // );
    // //similar situation for selected size which essentially corresponds to large and big chosen in nav, sent here and then sent to the individual card
    // const [selectedSize, setSelectedSize] = useState(() => false);
    // //similar id variable sent into the card from the app to dictate the id for the new html elements, increases every new item to prevent duplicates
    // const [id, setID] = useState(() => 0);
    // const [vis, setVis] = useState(() => true);
    // const [alertList, setAlertList] = useState([]);
    // //add asset function called to from nav dropdown
    // function addAsset(asset){
    //     setID(id+1);//sets the id number to plus one before sending it to the new card component
    //     //creates a new card using the card comp class then sends in the asset name, id for the card, and the selected size from the nav component
    //     const newCard = <CardComp asset={asset} id={id} selectedSize={selectedSize} alerts={alertList}></CardComp>;
    //     //adds the new card to the array of cards
    //     setSelectedAsset([...selectedAsset, newCard]);
    // };
    // function updateList(list){
    //     setAlertList(list);
    //     console.log(list);
    // }
    // //empties the cards array
    // function removeAll(){
    //     setSelectedAsset([]);
    // };
    // function makevisible(){
    //     setVis(!vis);
    // }
    // //fill all function autopopulates the array
    // function fillAll(){
    //     //temp array so it can add all the cards simultaneously - one at a time wouldn't work correctly with the way these callbacks work
    //     var temp_arr = [];
    //     var temp_id = id;
    //     for (const [key, value] of Object.entries(assets_dict)) {
    //         temp_id +=1;
    //         const temp =<CardComp asset={key} id={temp_id} alerts={alertList}></CardComp>;
    //         temp_arr.push(temp);
    //
    //     }
    //     setID(temp_id+1);
    //     setSelectedAsset([...selectedAsset, temp_arr]);;
    // }
    // //change size just toggles the value
    // function changeSize(){
    //     setSelectedSize(!selectedSize);
    // };
    //basically returns the html for the page which is essentially just the Nav component with the array of cars below
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" >
                    <Route index element={<CardsController />} />
                    <Route path="voyager" element={<VoyagerController />} />
                </Route>
            </Routes>
        </BrowserRouter>
        // <React.Fragment>
        //     {/*<Routes>*/}
        //     {/*    <Route exact path={'/'} exact element={<CardsController/>}></Route>*/}
        //     {/*    <Route exact path={'/Voyager'} exact element={<Voy/>}></Route>*/}
        //     {/*</Routes>*/}
        //     {/*<AlertMenu vis={vis} update={updateList}></AlertMenu>*/}
        //     {/*<NavComponent addAsset={addAsset} removeAll = {removeAll} changeSize = {changeSize} fillAll={fillAll} makeVis={makevisible}></NavComponent>*/}
        //     {/*<CardsComponent selectedAsset = {selectedAsset}></CardsComponent>*/}
        // </React.Fragment>
    );

}

export default App;
