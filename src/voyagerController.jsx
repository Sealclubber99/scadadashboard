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
    siteTableMap(item){
        console.log(item)
        return (<tr className="">
            <td>{item['resource']}</td>
            <td>{item['Timestamp']}</td>
            <td>{Number(item['frequency']).toFixed(3)}</td>
            <td>{Number(item['running_ess_num']).toFixed(3)}</td>

            <td>{Number(item['ess_1_soc']).toFixed(3)}</td>
            <td>{Number(item['ess_2_soc']).toFixed(3)}</td>
            <td>{Number(item['ess_3_soc']).toFixed(3)}</td>


            <td>{Number(item['ess_4_soc']).toFixed(3)}</td>
            <td>{Number(item['grid_voltage_l1_l2']).toFixed(3)}</td>
            <td>{Number(item['grid_voltage_l2_l3']).toFixed(3)}</td>
            <td>{Number(item['grid_voltage_l3_l1']).toFixed(3)}</td>
            <td>{item['gen_avr_status']}</td>
            <td>blank</td>
            <td>blank</td>


        </tr>)
    }
    regTableMap(item){
        console.log(item)
        return (<tr className="">
            <td>{item['resource']}</td>
            <td>{item['Timestamp']}</td>
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
    cellMap(item){
        // console.log(item)
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
        var char_width, dis_width;
        char_width = ((item['load_net_mw']/item['gen_max_charge_mw'] )*.8)*100
        dis_width = ((item['gen_net_mw']/item['gen_max_discharge_mw'] )*.8)*100

        // return ghsl
        return (<tr className="">
            <td>{item['resource']}</td>
            <td>{item['requestGMTtime']}</td>
            <td>{Number(item['gen_lmp']).toFixed(3)}</td>
            <td>{Number(item['gen_soc']).toFixed(3)}</td>
            <td>{(item['gen_max_operating_soc'])}</td>
            <td><div className="table_bars">
                <div className="table_charge_bar"></div>
                <div className="table_discharge_bar"></div>
            </div></td>
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
        var vger_items = []
        var reg_items = []
        if(this.state.compData != null && typeof(this.state.compData) != "undefined"){
            // for(let  i =0; i<this.state.compData.length; i++){
            //     console.log(this.state.compData[i])
            // }
            var comp_temp = this.state.compData
            vger_items  = comp_temp.map(this.cellMap)
            reg_items = comp_temp.map(this.regTableMap)
            // var test = this.state.compData.map(this.testMap()
        }
        var site_items = []
        if(this.state.compData != null && typeof(this.state.siteData) != "undefined"){

            var site_temp = this.state.siteData
            site_items  = site_temp.map(this.siteTableMap)
            // var test = this.state.compData.map(this.testMap()
        }

        return (
            <React.Fragment>
                <VgerNavComponent></VgerNavComponent>
                <table className="vger_table">
                    <tr className="">
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
                    {vger_items}
                </table>
                <table className="vger_table">
                    <tr className="">
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
                    {site_items}
                </table>
                <table className="vger_table">
                    <tr className="">
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
                    {reg_items}
                </table>

            </React.Fragment>


        );
    }

}
export default VoyagerController;