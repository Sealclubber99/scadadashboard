//import statemetn for react components
import React, {Component, useEffect, useState} from 'react'
//close/open png for the breakers
import closed from "./closed.png";
import open from "./open.png";
//style sheet
import './Cards.css';
//library for adding/removing class names easier
import classNames from "classnames";
//this is used to open csv files
import {csv} from 'd3';
//the component file
import compfile from './super_endpoints_component.csv';
//sute file only used for frequency
import sitefile from './super_endpoints_site.csv';
import AlertMenu from "./components/alertMenu";
import NavComponent from "./components/navComponent";
import cardComp from "./components/cardComp";
import CardComponent from "./cardComponent";
//assets dict that has all of the assets and their paired csv indexes
const assets_dict = {
    'BatCave':3,
    'Heights':13,
    'Loop 4631':12,
    'Brazoria':1,
    'Lopeno':6,
    'Pueblo 1':4,
    'Pueblo 2':5,
    'NorthFork':9,
    'Ranchtown':10,
    'Sweeny':11,
    'Zapata 1':8,
    'Zapata 2':7,
    'Alvin':0,
    'Angleton':15,
    'Magnolia':2,
    'Odessa':14
}
//functional component for app
class CardsController extends Component{
    state = {
        frequency:0,
        cards: [],
        rules:[],
        siteData: [],
        compData: [],
        size:false,
        vis:true,

    }
    constructor(props) {
        super(props);
        this.toggleVisibile = this.toggleVisibile.bind(this)
        this.addAsset = this.addAsset.bind(this)
        this.update = this.update.bind(this)
        this.createCard = this.createCard.bind(this)
        this.fillDeck = this.fillDeck.bind(this)
        this.updateRules = this.updateRules.bind(this)
    }
    updateRules(list){
        console.log(list)
        this.setState({
            rules:list
        })
    }

    removeAll(){
        this.setState({cards:[]})
    }
    toggleVisibile(){
        this.setState({vis:!(this.state.vis)})
    }
    toggleSize(){
        this.setState({
            size: !(this.state.size)
        })
    }
    addAsset(asset){
        // console.log('is in here')
        // console.log(asset)
        // var newCard = <CardComponent key={Date.now()} asset={asset} rules={this.state.rules} frequency={this.state.frequency} row={this.state.compData[assets_dict[asset]]} siteRow={this.state.siteData[assets_dict[asset]]} size={this.state.size}></CardComponent>
        // // console.log(newCard)
        // var test = this.state.cards.push(newCard)
        // console.log(test)
        // this.setState({
        //     cards:test
        //     // cards:newCard
        // })
        var temp = {
            asset:asset,
            size:this.state.size
        }
        this.setState({
            cards:this.state.cards.concat(temp)
        })

    }

    fillDeck(){
        var temp_arr = []
        // console.log('in here')
        for(const [key, value] of Object.entries(assets_dict)){
            var temp = {
                asset:key,
                size:this.state.size
            }
            // console.log('in here too')
            // var temp = <CardComponent key={Date.now()} asset={key} rules={this.state.rules} frequency={this.state.frequency} row={this.state.compData[value]} siteRow={this.state.siteData[value]} size={this.state.size}></CardComponent>
            temp_arr.push(temp)
        }
        // console.log(temp_arr)
        this.setState({
            cards:this.state.cards.concat(temp_arr)
        })
    }
    //do I need async here?
    async update(){
        var freq = 0;
        var site;
        var comp
        csv(sitefile).then(data =>{
            this.setSite(data)
        })
        csv(compfile).then(data=>{
            this.setComp(data)
        })

    }
    setComp(data){
        this.setState({
            compData:data
        })
    }
    setSite(data){
        this.setState({
            freq:data[2]['frequency'],
            siteData:data

        })
    }
    componentDidMount() {
        this.update()
        setInterval(()=>

            this.update(),4000)

    }
    createCard(item){
        return <CardComponent  asset={item['asset']} rules={this.state.rules} frequency={this.state.frequency} row={this.state.compData[assets_dict[item['asset']]]} siteRow={this.state.siteData[assets_dict[item['asset']]]} size={item['size']}></CardComponent>
    }

    render(){
        // console.log(this.state.cards)
        var deck = this.state.cards.map(this.createCard)
        return(
            <React.Fragment>
                <AlertMenu vis={this.state.vis} update={this.updateRules}></AlertMenu>
                <NavComponent addAsset={this.addAsset} removeAll={this.removeAll} changeSize={this.toggleSize} fillAll={this.fillDeck} makeVis={this.toggleVisibile}></NavComponent>
                <div className="gallery">{deck}</div>
            </React.Fragment>
        )


    }

}

export default CardsController;
