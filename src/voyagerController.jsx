import closed from "./closed.png";
import open from "./open.png";
//style sheet
import React, {Component, } from 'react'
import './Cards.css';
//library for adding/removing class names easier
import classNames from "classnames";
//this is used to open csv files
import {csv} from 'd3';
//the component file
import compfile from './super_endpoints_component.csv';
//sute file only used for frequency
import sitefile from './super_endpoints_site.csv';
import VgerNavComponent from "./vgerNavComponent";
import './voyager.css'
//assets dict, connects asset name to the index in the component/site file
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
class VoyagerController extends Component {
    state ={
        compData:null,
        siteData:null,
    }
    constructor(props) {
        super(props);
        this.cellMap = this.cellMap.bind(this)
    }
    update(){

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
            siteData:data
        })
    }
    componentDidMount() {
        this.update()
        setInterval(()=>

            this.update(),4000)
    }
    cellMap(item){
        console.log(item)
        var ghsl = 9.9;
        var lhsl = 9.9;
        if(item['resource'] == 'batcave' || item['resource'] == 'northfork'){
            ghsl = 100.5;
            lhsl = 100.5;
        }
        else if(item['resource'] == 'pueblo1' || item['resource'] == 'zapata2'){
            ghsl= 7.5

        }
        else if (item['resource'] == 'sweeny'){
            ghsl = 5;
        }
        // return ghsl
        return (<tr className="">
            <td>{item['resource']}</td>
            <td>{item['requestGMTtime']}</td>
            <td>{Number(item['gen_lmp']).toFixed(3)}</td>
            <td>{Number(item['gen_soc']).toFixed(3)}</td>
            <td>{(item['gen_max_operating_soc'])}</td>
            <td>blank</td>
            <td>{Number(item['gen_line_flows_mw']).toFixed(3)}</td>
            <td>{Number(item['gen_line_flows_mvar']).toFixed(3)}</td>
            <td>{Number(item['gen_net_mw']).toFixed(3)}</td>
            <td>{item['gen_resource_status']}</td>
            <td>{Number(item['gen_basepoint']).toFixed(3)}</td>
            <td>{Number(item['gen_updated_basepoint']).toFixed(3)}</td>
            <td>{Number(item['gen_updated_basepoint_manual']).toFixed(3)}</td>
            <td>{Number(item['load_lmp']).toFixed(3)}</td>
            <td>{Number(item['load_net_mw']).toFixed(3)}</td>
            <td>{Number(item['load_resource_status']).toFixed(3)}</td>
            <td>{Number(item['load_basepoint']).toFixed(3)}</td>
            <td>{Number(item['load_updated_basepoint']).toFixed(3)}</td>
            <td>{Number(item['load_updated_basepoint_manual']).toFixed(3)}</td>
            <td>{ghsl}</td>
            <td>{lhsl}</td>
            <td>{Number(item['gen_avr_status']).toFixed(3)}</td>
            <td>{item['gen_kv_target']}</td>
            <td>{Number(item['gen_kv_target_manual']).toFixed(3)}</td>
            <td>{Number(item['gen_kv_measurement']).toFixed(3)}</td>
            <td>{Number(item['gen_aux_mw']).toFixed(3)}</td>
            <td>{Number(item['gen_aux_mvar']).toFixed(3)}</td>
        </tr>)
    }
    render(){
        // console.log(this.state.compData)
        var listItems = []
        if(this.state.compData != null && typeof(this.state.compData) != "undefined"){
            // for(let  i =0; i<this.state.compData.length; i++){
            //     console.log(this.state.compData[i])
            // }
            var test = this.state.compData
            listItems  = test.map(this.cellMap)
            console.log(listItems)
            // var test = this.state.compData.map(this.testMap()
        }

        return (
            <React.Fragment>
                <VgerNavComponent></VgerNavComponent>
                <table className="table_main">
                    <tr className="">
                        <th>Asset</th>
                        <th>TimeStamp</th>
                        <th>LMP</th>
                        <th>SOC</th>
                        <th>Max SOC</th>
                        <th>Discharge</th>
                        <th>Line MW</th>
                        <th>Line MVAR</th>
                        <th>GMW</th>
                        <th>G Status</th>
                        <th>GBP</th>
                        <th>GUDBP</th>
                        {/*<th></th>*/}
                        <th>GUDBPM</th>
                        <th>LMW</th>
                        <th>L Status</th>
                        <th>LBP</th>
                        <th>LUDBP</th>
                        {/*<th>LOFlag</th>*/}
                        <th>LUDBPM</th>
                        <th>GHSL</th>
                        <th>LHSL</th>
                        <th>AVR</th>
                        <th>KVT</th>
                        {/*<th>KVTOFlag</th>*/}
                        <th>KVTM</th>
                        <th>KVM</th>
                        <th>AUXMW</th>
                        <th>AUXMVAR</th>

                    </tr>
                    {listItems}
                </table>
            </React.Fragment>


        );
    }

}
export default VoyagerController;