import logo from './logo.svg';
import React, {useState, useEffect} from "react";
import './App.css';
import CardComponent from "./components/cardComponent";
import NavComponent from "./components/navComponent";
import CardsComponent from "./components/cardsComponent";
import {csv} from 'd3';

// import React from "@types/react";
import PapaParse from 'papaparse';
import compfile from './super_endpoints_component.csv';
import sitefile from './super_endpoints_site.csv';

import cardComponent from "./components/cardComponent";
import config from "bootstrap/js/src/util/config";
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
    'Odessa':16
}

function App (){
    const [compdata, setCompData] = useState(csv(compfile));
    const [sitedata, setSiteData] =useState(csv(sitefile))
    // const []
    window.onload = useEffect(()=>{
        setTimeout(()=>{
            csv(compfile).then(temp=>{setCompData(temp);});
            csv(sitefile).then(temp=>{setSiteData(temp);});
            // setData(csv(file));
            console.log(compdata);
        }, 4000)
    }, [])

    const [selectedAsset, setSelectedAsset] = useState(
        () => JSON.parse(localStorage.getItem("selectedAsset")) || []
    );
    const [selectedSize, setSelectedSize] = useState(() => false);
    function addAsset(asset){
        var index = assets_dict[asset];
        // var temp = .then(data);
        // console.log(index);
        // console.log(data);
        // console.log(data[index]['breaker_status']);
        const freq = sitedata[index]['frequency'];
        const row = compdata[index];
        // var variable_dict ={
        //     'SOC': row['gen_soc'],
        //     'LMP_gen':row['gen_lmp'],
        //     'LMP_load':row['load_lmp'],
        //     'AVR': row['gen_avr_status'],
        //     'Reg_down_gen':row['gen_reg_down_responsibility'],
        //     'Reg_down_load':row['load_reg_down_responsibility'],
        //     'Reg_up_gen':row['gen_reg_up_responsibility'],
        //     'Reg_up_load':row['load_reg_up_responsibility'],
        //     'rrs_gen':row['gen_rrs_responsibility'],
        //     'rrs_load':row['load_rrs_responsibility'],
        //     'SOC': row['gen_soc'],
        //     'LMP_gen':row['gen_lmp'],
        //     'LMP_load':row['load_lmp'],
        //
        // }
        console.log(row)
        const test = <CardComponent asset={asset} row={row} selectedSize={selectedSize} freq={freq}></CardComponent>

        setSelectedAsset([...selectedAsset, test]);
    };
    function removeAll(){
        setSelectedAsset([]);
    };
    function changeSize(){
        setSelectedSize(!selectedSize);
        console.log(selectedSize)
    };

    return(
        <React.Fragment>
            <NavComponent addAsset={addAsset} removeAll = {removeAll} changeSize = {changeSize}></NavComponent>
            {/*<CardComponent selectedAsset = {selectedAsset}></CardComponent>*/}
            <CardsComponent selectedAsset = {selectedAsset}></CardsComponent>
        </React.Fragment>
    );

}

export default App;
