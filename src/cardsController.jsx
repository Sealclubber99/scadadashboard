//import statemetn for react components
import React, {Component, useEffect, useState} from 'react'

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
import AlertMenu from "./alertMenu";
import NavComponent from "./navComponent";
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
//react component for app
class CardsController extends Component{
    //state stores frequency for nav bar, cards which is names of all the chosen cards, rules for alert rules
    //site data and comp data csv and vis for the alert menue and size for large or small cards

    //constructor grabs props and binds all relevant functions
    constructor(props) {
        super(props);
        this.toggleVisibile = this.toggleVisibile.bind(this)
        this.addAsset = this.addAsset.bind(this)
        this.update = this.update.bind(this)
        this.createCard = this.createCard.bind(this)
        this.fillDeck = this.fillDeck.bind(this)
        this.updateRules = this.updateRules.bind(this)
        this.toggleSize = this.toggleSize.bind(this)
        this.state ={
            frequency:0,
            cards: [],
            rules:[],
            siteData: [],
            compData: [],
            size:false,
            vis:true,

        }
    }
    //updates the rules list saved in state
    updateRules(list){
        this.setState({
            rules:list
        })
    }
    //removes all of the cards
    removeAll(){
        this.setState({cards:[]})
    }
    //toggles if the alert menu is visible or not
    toggleVisibile(){
        this.setState({vis:!(this.state.vis)})
    }
    //toggles the size of the cards, large or small
    toggleSize(){
        this.setState({
            size: !(this.state.size)
        })
    }
    //adds an asset to the assets array which is then created in render
    addAsset(asset){
        var temp = {
            asset:asset,
            size:this.state.size
        }
        this.setState({
            cards:this.state.cards.concat(temp)
        })

    }
    //fill deck auto populates the page with cards using the dictionary defined above
    fillDeck(){
        var temp_arr = []
        for(const [key, value] of Object.entries(assets_dict)){
            var temp = {
                asset:key,
                size:this.state.size
            }
            // var temp = <CardComponent key={Date.now()} asset={key} rules={this.state.rules} frequency={this.state.frequency} row={this.state.compData[value]} siteRow={this.state.siteData[value]} size={this.state.size}></CardComponent>
            temp_arr.push(temp)
        }
        this.setState({
            cards:this.state.cards.concat(temp_arr)
        })
    }
    //update function called every 4 second interfal and updates the compfile and sitefile csv
    //calls to set functions that actuall set the state data because asynchronosity it has to be a little weird
    async update(){

        csv(sitefile).then(data =>{
            this.setSite(data)
        })
        csv(compfile).then(data=>{
            this.setComp(data)
        })

    }
    //sets the comp file state data
    setComp(data){
        this.setState({
            compData:data
        })
    }
    //sets the site file state data
    setSite(data){
        //also sets frequency
        var temp = data[2]['frequency']
        this.setState({
            freq:temp,
            siteData:data

        })
    }
    //once the component is mounted it starts the interval loop that updates the files every 4 seconds - called before interval aswell
    componentDidMount() {
        this.update()
        setInterval(()=>

            this.update(),4000)

    }
    //creates the actual card item - key is set to a somewhat random number for uniqueness, the odds of a duplicate are like absurdly low
    createCard(item){
        return <CardComponent key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))} asset={item['asset']} rules={this.state.rules} frequency={this.state.freq} row={this.state.compData[assets_dict[item['asset']]]} siteRow={this.state.siteData[assets_dict[item['asset']]]} size={item['size']}></CardComponent>
    }

    render(){
        //renders the meat of the page, called every time something is changed
        //maps out the cards and creates a card every render using map function
        var deck = this.state.cards.map(this.createCard)
        return(
            <React.Fragment>
                {/*alert menu component*/}
                <AlertMenu vis={this.state.vis} update={this.updateRules}></AlertMenu>
                {/*nav component*/}
                <NavComponent frequency={this.state.freq} addAsset={this.addAsset} removeAll={this.removeAll} changeSize={this.toggleSize} fillAll={this.fillDeck} makeVis={this.toggleVisibile}></NavComponent>
                {/*the deck of cards initialized above*/}
                <div className="gallery">{deck}</div>
            </React.Fragment>
        )


    }

}
//export call
export default CardsController;
