import React, {Component,useEffect,useState} from "react";
import './menu.css';
import classNames from "classnames";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import AlertItems from "./alertItems";
const col_options =[
    'gen_lmp',
    'gen_soc',
    'gen_basepoint',
    'gen_net_mw',
    'gen_regd_req',
    'gen_reg_down_requirement',
    'gen_reg_down_responsibility',
    'gen_reg_up_requirement',
    'gen_reg_up_responsibility',
    'gen_rrs_requirement',
    'gen_rrs_responsibility',
    'gen_updated_basepoint',
    'load_basepoint',
    'load_net_mw',
    'load_reg_down_requirement',
    'load_reg_down_responsibility',
    'load_reg_up_requirement',
    'load_reg_up_responsibility',
    'load_rrs_requirement',
    'load_rrs_responsibility',
    'gen_resource_status',
    'load_resource_status',
    'gen_net_mvar',
    'load_net_mvar',
    'gen_max_operating_soc',
    'gen_min_operating_soc',
    'gen_line_flows_mw',
    'load_pseudo_switch_status',
    'load_lines_flows_mw',
    'gen_line_flows_mvar',
    'load_line_flows_mvar',
    'gen_voltage',
    'load_voltage',
    'gen_normal_up_ramp_rate',
    'load_normal_up_ramp_rate',
    'gen_normal_down_ramp_rate',
    'load_normal_down_ramp_rate',
    'gen_emergency_up_ramp_rate',
    'load_emergency_up_ramp_rate',
    'gen_emergency_down_ramp_rate',
    'load_emergency_down_ramp_rate',
    'gen_max_discharge_mw',
    'gen_max_charge_mw',






];
const assets =[
    'All',
    'BatCave',
    'Heights',
    'Loop 4631',
    'Brazoria',
    'Lopeno 1',
    'Pueblo 1',
    'Pueblo 2',
    'Ranchtown',
    'Sweeny',
    'Zapata 1',
    'Zapata 2',
    'Alvin',
    'Angleton',
    'Magnolia',
    'Odessa',
    'NorthFork'
];
const operations = [
    String('>'),
    String('<'),
    String('=')
];


class AlertMenu extends Component{
    state={
        column:'',
        asset:'',
        operator:'',
        value:'',
        key_index: 0,
        alerts:[],

    };
    constructor(props) {
        super(props);


        this.insertRow = this.insertRow.bind(this)
        this.deleteRow = this.deleteRow.bind(this)
    };
    insertRow() {
        // this.setState({})
        if((this.state.column != "")&&(this.state.asset != "")&&(this.state.operator != "")&&(this.state.value != "")){
            var row = {
                column:this.state.column,
                asset:this.state.asset,
                operator: this.state.operator,
                value:this.state.value,
                key:Date.now()


            };

            this.setState((prevState) =>{
                    var listTemp = prevState.alerts.concat(row)
                    this.props.update(listTemp)
                    return{
                        alerts: listTemp
                    }
                }
            )

        }

    };
    deleteRow(key){
        var filteredAlerts = this.state.alerts.filter(function(alert){
            return (alert.key !== key);
        })
        this.setState({
            alerts: filteredAlerts
        });
        this.props.update(filteredAlerts);
    }

    render(){
        return(
            <div className={classNames({
                'invis':this.props.vis,
                'vis':!(this.props.vis),
                'menu_full':true
            })}>
                <div className='menu '>
                    <div className="row d-flex justify-content-center">
                        <div className="col-6">
                            <h1>
                                Set Alerts:
                            </h1>
                        </div>
                    </div>

                    <div className="row d-flex justify-content-center p-0">

                        <div className="col-3 d-flex justify-content-center align-items-center">
                            <Dropdown options={col_options} id='col_drop' onChange={col => this.setState({column:col['value']})}>

                            </Dropdown>
                        </div>
                        <div className="col-3 d-flex justify-content-center align-items-center">
                            <Dropdown options={assets} id='asset_drop' onChange={ass => this.setState({asset:ass['value']})}>

                            </Dropdown>
                        </div>
                        <div className="col-2 d-flex justify-content-center align-items-center">
                            <Dropdown options={operations} id='col_drop' onChange={oper =>
                                this.setState({operator:oper['value']})}>

                            </Dropdown>
                        </div>
                        <div className="col-2 d-flex justify-content-center align-items-center" >
                            <input id='value_box' type='number'onChange={val => this.setState({value:val.target.value})}/>
                        </div>
                        <div className="col-2 d-flex justify-content-center align" >
                            <button className="button_add d-flex justify-content-center align0-items-center" onClick={this.insertRow.bind(this)}>
                                <h1 className="d-flex justify-content-center align0-items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
                                         className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                                    </svg>
                                </h1>

                            </button>
                        </div>
                    </div>
                    <div className="row d-flex justify-content-center alert_table">
                        <AlertItems entries={this.state.alerts} delete={this.deleteRow}></AlertItems>


                    </div>

                </div>
            </div>
        );
    }
}
export default AlertMenu;