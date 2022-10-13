import React, {Component} from "react";
import '../deck.css'
import CardComponent from "./cardComponent";


function CardsComponent({selectedAsset}){
    return(
      <div className="gallery">
        {selectedAsset}
      </div>
    );


}
export default CardsComponent;