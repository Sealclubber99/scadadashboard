import React, {Component} from "react";
import '../deck.css'

//basically a functional component just to hold all the cards
function CardsComponent({selectedAsset}){
    return(
      <div className="gallery">
        {selectedAsset}
      </div>
    );


}
export default CardsComponent;