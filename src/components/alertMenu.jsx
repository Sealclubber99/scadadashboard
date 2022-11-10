import React, {Component,useEffect,useState} from "react";
import '../menu.css';
import classNames from "classnames";
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css';
import AlertItems from "./alertItems";
const col_options =[
    'gen_lmp',
    'gen_soc',
    'gen_basepoint'
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

                    <div className="row d-flex justify-content-center">

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
                        <div className="col-2 d-flex justify-content-center align-items-center" >
                            <button onClick={this.insertRow.bind(this)}>
                                {/*<button onClick={this.insertRow()}>*/}
                                +
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