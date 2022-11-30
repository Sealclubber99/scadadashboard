
import React, {Component, } from 'react'
import './Cards.css';
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
    //state storage of compdata and site data csvs
    state ={
        compData:null,
        siteData:null,
    }

    //no props are sent but it accepts them in the constructor by default
    constructor(props) {
        super(props);
        //binds the relevant functions
        this.cellMap = this.cellMap.bind(this)
        this.checkZero = this.checkZero.bind(this)
    }
    //update the state storage of csvs object data
    update(){

        csv(sitefile).then(data =>{
            this.setSite(data)
        })
        csv(compfile).then(data=>{
            this.setComp(data)
        })

    }
    //sets the aforementioned data to the state, same as in card controller class
    setComp(data){
        this.setState({
            compData:data
        })
    }
    //sets the site data
    setSite(data){
        this.setState({
            siteData:data
        })
    }
    //check zero function to replace 0s with "-", doesnt work, will fix eventually
    checkZero(val_temp){
        console.log(val_temp)
        if (((val_temp == 0) || (val_temp == false))||val_temp==undefined){
            return "-"
        }
        else if (val_temp != true){
            return Number(val_temp).toFixed(2)
        }
        else{
            return val_temp
        }
    }
    //update interval on load
    componentDidMount() {
        this.update()
        setInterval(()=>

            this.update(),4000)
    }
    //creates the site table
    siteTableMap(item){
        //random key generation
        return (<tr className="" key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}>
            <td>{item['resource']}</td>
            <td>{item['Timestamp'].slice(0,16)}</td>
            <td>{Number(item['frequency']).toFixed(2)}</td>
            <td>{Number(item['running_ess_num']).toFixed(2)}</td>

            <td>{Number(item['ess_1_soc']).toFixed(2)}</td>
            <td>{Number(item['ess_2_soc']).toFixed(2)}</td>
            <td>{Number(item['ess_3_soc']).toFixed(2)}</td>


            <td>{Number(item['ess_4_soc']).toFixed(2)}</td>
            <td>{Number(item['grid_voltage_l1_l2']).toFixed(2)}</td>
            <td>{Number(item['grid_voltage_l2_l3']).toFixed(2)}</td>
            <td>{Number(item['grid_voltage_l3_l1']).toFixed(2)}</td>
            <td>{item['gen_avr_status']}</td>
            <td>blank</td>
            <td>blank</td>


        </tr>)
    }
    //sets the reg table data
    regTableMap(item){
        return (<tr className="" key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}>
            <td>{item['resource']}</td>
            <td>{item['requestGMTtime'].slice(0,16)}</td>
            {/*<td>{this.checkZero(item['gen_rrs_responsibility'])}</td>*/}
            <td>{Number(item['gen_rrs_responsibility']).toFixed(2)}</td>
            <td>{Number(item['gen_rrs_requirement']).toFixed(2)}</td>
            <td>{Number(item['load_rrs_responsibility']).toFixed(2)}</td>
            <td>{Number(item['load_rrs_requirement']).toFixed(2)}</td>
            <td>{Number(item['reg_manual_override']).toFixed(2)}</td>
            <td>{Number(item['gen_reg_up_responsibility']).toFixed(2)}</td>
            <td>{Number(item['gen_reg_up_requirement']).toFixed(2)}</td>
            <td>{Number(item['calculated_gen_rurs']).toFixed(2)}</td>
            <td>{Number(item['gen_reg_down_responsibility']).toFixed(2)}</td>
            <td>{Number(item['gen_reg_down_requirement']).toFixed(2)}</td>
            <td>{Number(item['calculated_gen_rdrs']).toFixed(2)}</td>
            <td>{Number(item['load_reg_up_responsibility']).toFixed(2)}</td>
            <td>{Number(item['load_reg_up_requirement']).toFixed(2)}</td>
            <td>{Number(item['calculated_load_rurs']).toFixed(2)}</td>
            <td>{Number(item['load_reg_down_responsibility']).toFixed(2)}</td>
            <td>{Number(item['load_reg_down_requirement']).toFixed(2)}</td>
            <td>{Number(item['calculated_load_rdrs']).toFixed(2)}</td>
            <td>{Number(item['gen_frrs_up_responsibility']).toFixed(2)}</td>
            <td>{Number(item['load_frrs_up_responsibility']).toFixed(2)}</td>
            <td>{Number(item['gen_frrs_down_responsibility']).toFixed(2)}</td>
            <td>{Number(item['load_frrs_down_responsibility']).toFixed(2)}</td>
            <td>{Number(item['gen_ns_responsibility']).toFixed(2)}</td>
            <td>{Number(item['load_ns_responsibility']).toFixed(2)}</td>




        </tr>)
    }
    //this function takes the compdata and totals each of the columns and returns a single row for the bottom
    testSum(comp){

        if(comp != undefined){
            //uses a dictionary because after much trial and error this is the only way I could figure it out
            //not the most effecient but what can ya do
            var totals= {
                'gen_rrs_responsibility':0,
                'gen_rrs_requirement':0,
                'load_rrs_responsibility':0,
                'load_rrs_requirement':0,
                'reg_manual_override':0,
                'gen_reg_up_responsibility':0,
                'gen_reg_up_requirement':0,
                'calculated_gen_rurs':0,
                'gen_reg_down_responsibility':0,
                'gen_reg_down_requirement':0,
                'calculated_gen_rdrs':0,
                'load_reg_up_responsibility':0,
                'load_reg_up_requirement':0,
                'calculated_load_rurs':0,
                'load_reg_down_responsibility':0,
                'load_reg_down_requirement':0,
                'calculated_load_rdrs':0,
                'gen_frrs_up_responsibility':0,
                'load_frrs_up_responsibility':0,
                'gen_frrs_down_responsibility':0,
                'load_frrs_down_responsibility':0,
                'gen_ns_responsibility':0,
                'load_ns_responsibility':0
            }
            var total = 0
            var keys = Object.keys(totals)
            console.log(keys)
            // .ToList()
            comp.forEach(function(a){
                keys.forEach(function(key){
                    totals[key] = Number(totals[key]) + Number(a[key])
                })
                // foreach( key in keys){
                //
                // }
                total = Number(total) + Number(a.gen_rrs_responsibility)
                // console.log(total)
            })
            //returns the table row
            return(
                <tr className="vger_header">
                    <th className="vger_column">Totals</th>
                    <th className="vger_column"></th>
                    <th className="vger_column">{Number(totals['gen_rrs_responsibility']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['gen_rrs_requirement']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['load_rrs_responsibility']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['load_rrs_requirement']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['reg_manual_override']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['gen_reg_up_responsibility']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['gen_reg_up_requirement']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['calculated_gen_rurs']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['gen_reg_down_responsibility']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['gen_reg_down_requirement']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['calculated_gen_rdrs']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['load_reg_up_responsibility']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['load_reg_up_requirement']).toFixed(2)}</th>

                    <th className="vger_column">{Number(totals['calculated_load_rurs']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['load_reg_down_responsibility']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['load_reg_down_requirement']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['calculated_load_rdrs']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['gen_frrs_up_responsibility']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['load_frrs_up_responsibility']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['gen_frrs_down_responsibility']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['load_frrs_down_responsibility']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['gen_ns_responsibility']).toFixed(2)}</th>
                    <th className="vger_column">{Number(totals['load_ns_responsibility']).toFixed(2)}</th>

                </tr>
            )
        }
        else{
            return ""
        }
    }
    //creates the main table
    cellMap(item){
        // console.log(item)
        //sets ghsl and lhsl based on what asset is in each row
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
        //sets width for table column charge/discharge, also fixed the divide by 0 problem
        var char_width, color, char_val;
        if((item['load_net_mw'] > item['gen_net_mw'])&&(item['gen_max_charge_mw'] > 0) ){
            char_width = ((item['load_net_mw']/item['gen_max_charge_mw'] ))*100
            char_val = Number(item['load_net_mw']).toFixed(2)
            color = 'red'
        }
        else if ((item['load_net_mw'] < item['gen_net_mw'])&&(item['gen_max_discharge_mw'] > 0) ){
            char_width = ((item['gen_net_mw']/item['gen_max_discharge_mw'] )*.8)*100
            color = 'green'
            char_val = Number(item['gen_net_mw']).toFixed(2)
        }
        else{
            char_width = Number(0).toFixed(1);
            color = 'white';
            char_val = item['gen_net_mw']
        }

        //returns each row
        return (<tr className="" key={Math.floor(Math.random() * Math.floor(Math.random() * Date.now()))}>
            <td>{item['resource']}</td>
            <td>{item['requestGMTtime'].slice(0,16)}</td>
            <td>{Number(item['gen_lmp']).toFixed(2)}</td>
            <td>{Number(item['gen_soc']).toFixed(2)}</td>
            <td>{(item['gen_max_operating_soc'])}</td>

            <td className="charge_col d-flex justify-content-start p-0"><div className="table_bars p-0">

                <div className="table_charge_bar m-0" style={{width: char_width + '%', backgroundColor: color}}> {char_val}</div>

            </div></td>
            <td>{Number(item['gen_line_flows_mw']).toFixed(2)}</td>
            <td>{Number(item['gen_line_flows_mvar']).toFixed(2)}</td>
            <td>{Number(item['gen_net_mw']).toFixed(2)}</td>
            <td>{item['gen_resource_status']}</td>


            <td>{Number(item['gen_basepoint']).toFixed(2)}</td>
            <td>{Number(item['gen_updated_basepoint']).toFixed(2)}</td>
            <td>{Number(item['gen_updated_basepoint_manual']).toFixed(2)}</td>
            <td>{Number(item['load_net_mw']).toFixed(2)}</td>


            <td>{Number(item['load_resource_status']).toFixed(2)}</td>
            <td>{Number(item['load_basepoint']).toFixed(2)}</td>
            <td>{Number(item['load_updated_basepoint']).toFixed(2)}</td>
            <td>{Number(item['load_updated_basepoint_manual']).toFixed(2)}</td>
            <td>{ghsl}</td>

            <td>{lhsl}</td>
            <td>{Number(item['gen_avr_status']).toFixed(2)}</td>
            <td>{item['gen_kv_target']}</td>
            <td>{Number(item['gen_kv_target_manual']).toFixed(2)}</td>
            <td>{Number(item['gen_kv_measurement']).toFixed(2)}</td>

            <td>{Number(item['gen_aux_mw']).toFixed(2)}</td>
            <td>{Number(item['gen_aux_mvar']).toFixed(2)}</td>
        </tr>)
    }
    render(){
        //arrays to be set by map function
        var vger_items = []
        var reg_items = []
        var site_items = []
        //checks if data is even available, if not it will remain a mostly empty page
        if(this.state.compData != null && typeof(this.state.compData) != "undefined"){
            var comp_temp = this.state.compData
            vger_items  = comp_temp.map(this.cellMap)
            reg_items = comp_temp.map(this.regTableMap)

        }
        //seperate test statement for separate csvs
        if(this.state.compData != null && typeof(this.state.siteData) != "undefined"){

            var site_temp = this.state.siteData
            site_items  = site_temp.map(this.siteTableMap)
        }
        //calls the total function to get totals row
        var totals = this.testSum(this.state.compData)
        //creates each of the tables and uses generated rows
        return (
            <React.Fragment>
                {/*nav bar component, separate from the main page nav*/}
                <VgerNavComponent></VgerNavComponent>
                <div className="table_parent">
                    <table className="vger_table">
                        <tbody>


                        <tr className="vger_header">
                            <th className="vger_column">Asset</th>
                            <th className="vger_column">TimeStamp</th>
                            <th className="vger_column">LMP</th>
                            <th className="vger_column">SOC</th>
                            <th className="vger_column">Max SOC</th>
                            <th className="vger_column">Discharge</th>
                            <th className="vger_column">Line MW</th>
                            <th className="vger_column">Line MVAR</th>
                            <th className="vger_column">GMW</th>
                            <th className="vger_column">G Status</th>
                            <th className="vger_column">GBP</th>
                            <th className="vger_column">GUDBP</th>
                            {/*<th></th>*/}
                            <th className="vger_column">GUDBPM</th>
                            <th className="vger_column">LMW</th>
                            <th className="vger_column">L Status</th>
                            <th className="vger_column">LBP</th>
                            <th className="vger_column">LUDBP</th>
                            {/*<th>LOFlag</th>*/}
                            <th className="vger_column">LUDBPM</th>
                            <th className="vger_column">GHSL</th>
                            <th className="vger_column">LHSL</th>
                            <th className="vger_column">AVR</th>
                            <th className="vger_column">KVT</th>
                            {/*<th>KVTOFlag</th>*/}
                            <th className="vger_column">KVTM</th>
                            <th className="vger_column">KVM</th>
                            <th className="vger_column">AUXMW</th>
                            <th className="vger_column">AUXMVAR</th>

                        </tr>
                        {/*main table rows*/}
                        {vger_items}
                        </tbody>
                    </table>
                    <table className="vger_table">
                        <tbody>
                        <tr className="vger_header">
                            <th className="vger_column">Asset</th>
                            <th className="vger_column">TimeStamp</th>
                            <th className="vger_column">Frequency</th>
                            <th className="vger_column">RUNNING_ESS_NUM</th>
                            <th className="vger_column">ESS_1_SOC</th>
                            <th className="vger_column">ESS_2_SOC</th>
                            <th className="vger_column">ESS_3_SOC</th>
                            <th className="vger_column">ESS_4_SOC</th>
                            <th className="vger_column">V_L1_L2(V)</th>
                            <th className="vger_column">V_L2_L3(V)</th>
                            <th className="vger_column">V_L3_1(V)</th>
                            <th className="vger_column">AVR</th>
                            <th className="vger_column">MVAR</th>
                            <th className="vger_column">MVAR_VAL</th>

                        </tr>
                        {/*site table rows*/}
                        {site_items}
                        </tbody>
                    </table>
                    <table className="vger_table">
                        <tbody>

                        <tr className="vger_header">
                            <th className="vger_column">Asset</th>
                            <th className="vger_column">TimeStamp</th>
                            <th className="vger_column">GRRSR</th>
                            <th className="vger_column">GRRSQ</th>
                            <th className="vger_column">LRRSR</th>
                            <th className="vger_column">LRRSQ</th>
                            <th className="vger_column">DYNREGOFLAG</th>
                            <th className="vger_column">GRUR</th>
                            <th className="vger_column">GRUQ</th>
                            <th className="vger_column">CGRUR</th>
                            <th className="vger_column">GRDR</th>
                            <th className="vger_column">GRNQ</th>
                            <th className="vger_column">CGRDR</th>
                            <th className="vger_column">LRUR</th>
                            <th className="vger_column">LRUQ</th>

                            <th className="vger_column">CLRUR</th>
                            <th className="vger_column">LRDR</th>
                            <th className="vger_column">LRDQ</th>
                            <th className="vger_column">CLRDR</th>
                            <th className="vger_column">GFRUR</th>
                            <th className="vger_column">LFRUR</th>
                            <th className="vger_column">GFRDR</th>
                            <th className="vger_column">LFRDR</th>
                            <th className="vger_column">GNRR</th>
                            <th className="vger_column">LNRR</th>

                        </tr>
                        {/*reg table rows*/}
                        {reg_items}
                        {/*totals*/}
                        {totals}
                        </tbody>
                    </table>
                </div>

            </React.Fragment>


        );
    }

}
export default VoyagerController;