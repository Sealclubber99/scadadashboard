//import statemetn for react components
import React, {Component, useEffect, useState} from 'react'
//close/open png for the breakers
import closed from "../closed.png";
import open from "../open.png";
//style sheet
import '../Cards.css';
//library for adding/removing class names easier
import classNames from "classnames";
//this is used to open csv files
import {csv} from 'd3';
//the component file
import compfile from '../super_endpoints_component.csv';
//sute file only used for frequency
import sitefile from '../super_endpoints_site.csv';

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
class CardComp extends Component {
    //initializing the state data, all values to 0
    state = {
        //asset name
        asset: "null",
        //asset index
        asset_index: "null",
        //gen_lmp
        gen_price:0,
        //gen_soc
        gen_soc: 0,
        //gen_basepoint
        gen_basepoint: 0,
        //gen_net_mw
        gen_net_mw: 0,
        //gen_reg_down_requirement
        gen_regd_req:0,
        //gen_reg_down_responsibility
        gen_regd_res:0,
        //gen_reg_up_requirement
        gen_regu_req:0,
        //gen_reg_up_responsibility
        gen_regu_res:0,
        //gen_rrs_requirement
        gen_rrs_req:0,
        //gen_rrs_responsibility
        gen_rrs_res:0,
        //gen_updated_basepoint
        gen_upbp:0,
        //load_basepoint
        load_basepoint:0,
        //load_net_mw
        load_net_mw:0,
        //load_reg_down_requirement
        load_regd_req:0,
        //load_reg_down_responsibility
        load_regd_res:0,
        //load_reg_up_requirement
        load_regu_req:0,
        //load_reg_up_responsibility
        load_regu_res:0,
        //load_rrs_requirement
        load_rrs_req:0,
        //load_rrs_responsibility
        load_rrs_res:0,
        //load_updated_basepoint
        load_upbp:0,
        //ess_1_soc (1-4)
        ess_1:0,
        ess_2:0,
        ess_3:0,
        ess_4:0,
        //gen_max_discharge_mw
        gen_max_dis:0,
        //frequency
        frequency:0,
        //gen_resource_status
        gen_res_status:0,
        //load_resource_status
        load_res_status:0,
        //gen_net_mvar
        gen_net_mvar:0,
        //load_net_mvar
        load_net_mvar:0,
        //gen_max_operating_soc
        gen_max_soc:0,
        //gen_min_operating_soc
        gen_min_soc:0,
        //gen_sw1 or ds1
        gen_sw1:0,
        //gen_scct_flag
        gen_scct:0,
        //gen_52m_flag
        gen_52m:0,
        //load_scct_flag
        load_scct:0,
        //gen_pseudo_switch_status
        gen_breaker:0,
        //gen_line_flows_mw
        gen_flows:0,
        //load_pseudo_switch_status
        load_breaker:0,
        //load_line_flows_mw
        load_flows:0,
        //gen_flows_mvar
        gen_flows_mvar:0,
        //load_flows_mvar
        load_flows_mvar:0,
        //gen_voltage
        gen_voltage:0,
        //load_voltage
        load_voltage:0,
        //gen_normal_up_ramp_rate
        gen_nurr:0,
        //load_normal_up_ramp_rate
        load_nurr:0,
        //gen_normal_down_ramp_rate
        gen_ndrr:0,
        //load_normal_down_ramp_rate
        load_ndrr:0,
        //gen_normal_down_ramp_rate
        gen_eurr:0,
        //load_emergency_up_ramp_rate
        load_eurr:0,
        //gen_emergency_down_ramp_rate
        gen_edrr:0,
        //load_emergency_down_ramp_rate
        load_edrr:0,
        //gen_hsl = min(gen_max_discharge_mw, gen_default_ghsl)
        ghsl:0,
        //load_hsl = min(gen_max_charge_mw, gen_default_lhsl)
        lhsl:0,
        //gen_voltage
        gen_volt:0,
        //load_voltage
        load_volt:0,
        //gen_def_hsl - dictionary value
        gen_def_hsl:0,
        //load_def_hsl - dictionary value
        load_def_hsl:0,
        //width % for charge bar
        char_width:100,
        //width % from dishcharge
        dis_width:100,
        //width % for load hsl bar
        load_width:100,
        //width % gen hsl bar
        gen_width:100






    }
    //constructor, creates the card class object
    constructor(props){
        //super - allows us to use the props which are passed in from app parent
        super(props);
        //gets the index for the asset using the assets_dict, in order to select row from csv
        var temp = assets_dict[props.asset]
        //used to grab hsl values
        var gen_temp, load_temp;

        //status label defualt is ds1
        var status_label = 'gen_ds1_status'

        //checking indexes instead of asset name to set the deictionary hsl values
        // 3 = batcave, 9=Northfork
        if ((temp === 3)||(temp === 9)){
            gen_temp = Number(100.5).toFixed(1);
            load_temp = Number(100.5).toFixed(1);
            //batcave and northfork use ds1 instead
            status_label = 'gen_ds1_status';
        //4 = pueblo 1 7= zapata 2
        } else if ((temp === 4)||(temp === 7)){
            load_temp = Number(7.5).toFixed(1);
            gen_temp = Number(9.9).toFixed(1);
        //11 = sweeny
        }else if(temp === 11){
            load_temp = Number(5.0).toFixed(1);
            gen_temp = Number(9.9).toFixed(1);
        }
        //all else are at (9.9, 9.9)
        else{
            gen_temp = Number(9.9).toFixed(1);
            load_temp = Number(9.9).toFixed(1);
        }

        //setting some of the state vlaues before render, all before opening the csv
        this.state = ({
            asset: props.asset,//asset
            asset_index: temp,//index in csv file
            gen_def_hsl: gen_temp,//hsl values set in previous if/else
            load_def_hsl: load_temp,
            size: this.props.selectedSize,//chosen size in app, large or small for now
            switch_label:status_label,//switch label used later to show the right breaker status
            'sw1':closed,//default closed image before csv info
            '52m':closed,
            'gen':closed,
            'load':closed,
            'avr':closed,//default N/A until this info is available they wont change
            'vpn':closed,
            'rtu':"NA",
            'dnp3':"NA",
            'avr2':"NA"
        });

    }
    render(){

        var flashing = false;//flashing alert is off by default
        //if the price is below ten or over 75, flashing is set to true to turn on flash class
        if ((this.state.gen_price > 75)||(this.state.gen_price<10)){
            flashing = true;
        }

        return(
            <div id={this.props.id} className={classNames({
                'p-3':true,//padding three
                'pb-0':true,//padding bottom 0
                'card-l': this.state.size, //large true or false depending on size set earlier
                'card-s':!this.state.size,//opposite of size so if large not small
                'red-shadow-med':flashing// turn on flashing
                //there are several flashing classes in the stylesheets that we can set to different values
                //plan to create a button that allows the user to set their own alerts

            })}>
                {/*im not goint to document the html its practically english at this point*/}
                <div className="top_card row d-flex flex-row justify-content-around">
                    <div className="col-8 ">
                        <div className="row " id="top_row">
                            <div className="col-5 d-flex flex-column vpn">
                                <div className="row d-flex flex-row">
                                    <div className="col-12 d-flex flex-row">
                                        <img id="vpn_icon" className="light_indicator vpn" alt="err"  src={closed}/>
                                        <p className="secondary_text vpn m-0">VPN: ON_LINE</p>
                                    </div>
                                </div>
                                <div className="row p-0 m-0 d-flex flex-row ">
                                    <div className="col-6 d-flex flex-row">
                                        {/*<p className="fuse_text rtu p-0 m-0"></p>*/}
                                        <p className="fuse_text rtu p-0 m-0">RTU:&nbsp;{this.state.rtu}&nbsp;</p>
                                    </div>
                                    <div className="col-6 d-flex flex-row">

                                        {/*<p className="fuse_text rtu p-0 m-0"></p>*/}
                                        <p className="fuse_text rtu p-0 m-0">DNP3:&nbsp;{this.state.dnp3}</p>
                                    </div>

                                </div>
                            </div>
                            <div className="col-3 d-flex flex-row p-0">
                                <img id="avr_icon" className="light_indicator" alt="err" src={open}/>
                                <p className="secondary_text">AVR: {this.state.avr2}</p>
                            </div>
                            <div className="col-4 d-flex flex-row justify-content-around align-items-start p-0">
                                <div className=" d-flex flex-column" id="sw1_icon">
                                    <div className="row">
                                        <img  className="light_indicator" alt="err" src={this.state.sw1}/>
                                    </div>
                                    <div className="row">
                                        <p className='fuse_text m-0 p-0' id="sw1">SW1</p>
                                    </div>
                                </div>
                                <div className=" d-flex flex-column" id="ftm_icon">
                                    <div className="row">
                                        <img  className="light_indicator" alt="err" src={this.state.ftm_breaker}/>
                                    </div>
                                    <div className="row">
                                        <p className='fuse_text m-0 ' id="ftm">52M</p>
                                    </div>
                                </div>
                                <div className=" d-flex flex-column" id="gen_icon">
                                    <div className="row">
                                        <img  className="light_indicator" alt="err" src={this.state.gen_breaker_img}/>
                                    </div>
                                    <div className="row">
                                        <p className='fuse_text m-0 p-0' id="gen">GEN</p>
                                    </div>
                                </div>
                                <div className=" d-flex flex-column " id="load_icon">
                                    <div className="row">
                                        <img  className="light_indicator" alt="err" src={this.state.load_breaker_img}/>
                                    </div>
                                    <div className="row">
                                        <p className='fuse_text m-0 p-0' id="ld">LOAD</p>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div className="row">
                            <p className="asset_names primary_text">{this.state.asset}</p>
                        </div>
                    </div>




                    <div className="col-4 d-flex flex-column align-items-end">
                        <div className="row ">
                            <p className="primary_text price m-0" id="gen_price">${this.state.gen_price}</p>
                        </div>
                        <div className="col-10 d-flex flex-row justify-content-end">
                            <div className="row ">
                                <p className="price primary_text m-0" id="gen_soc"></p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div className="bottom_card m-0">*/}
                <div className={classNames({'bottom_card':true, 'm-0': true, 'bc_height':this.state.size})}>
                    <div className="row">
                        <div className="col-4 d-flex flex-column">
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6">
                                    <p className="nmw p-0 m-0" id="gen_basepoint">{this.state.gen_basepoint}</p>
                                </div>
                                <div className="col-6 d-flex flex-column justify-content-end align-items-start m-0 p-0">
                                    <p className="secondary_text pb-1 m-0 ">BP</p>
                                </div>

                            </div>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6">
                                    <p className="nmw p-0 m-0" id="gen_net_mw">{this.state.gen_net_mw}</p>
                                </div>
                                <div className="col-6 d-flex flex-column justify-content-end align-items-start m-0 p-0">
                                    <p className="secondary_text pb-1 m-0 ">NMW</p>
                                </div>


                            </div>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6 d-flex flex-row justify-content-start">
                                    <p className="reg_text  p-0 m-0" id="gen_regd_req">{this.state.gen_regd_req}</p>
                                    <p className="secondary_text p-0 m-0" id="gen_regd_res">/{this.state.gen_regd_res}</p>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-start p-0">
                                    <p className="secondary_text p-0 m-0">REG. DOWN</p>
                                </div>


                            </div>
                            <div className="row d-flex flex-row justify-content-between">

                                <div className="col-6 d-flex flex-row justify-content-start">
                                    <p className="reg_text  p-0 m-0" id="gen_regu_req">{this.state.gen_regu_req}</p>
                                    <p className="secondary_text p-0 m-0" id="gen_regu_res">/{this.state.gen_regu_res}</p>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-start p-0 m-0">
                                    <p className="secondary_text p-0 m-0">REG. UP</p>
                                </div>

                            </div>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6 d-flex flex-row justify-content-start">
                                    <p className="reg_text  p-0 m-0"id="gen_rrs_req">{this.state.gen_rrs_req}</p>
                                    <p className="secondary_text p-0 m-0" id="gen_rrs_res">/{this.state.gen_rrs_res}</p>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-start p-0">
                                    <p className="secondary_text">RRS</p>
                                </div>


                            </div>

                        </div>
                        <div className="col-4">
                            <div className="row">
                                {/*<ChargeBar/>*/}
                                <div className="container">
                                    <div className="row d-flex flex-row justify-content-center">
                                        <div className="col-5 d-flex flex-column justify-content-center align-items-end p-0">
                                            <div className="bar_left mb-1" id="dis_bar" style={{width: this.state.dis_width + '%'}}>
                                            </div>
                                            <div className="bar_left" id="genudbp" style={{width: this.state.gen_width + '%'}}>
                                            </div>
                                        </div>
                                        <div className="vertical_line p-0"></div>
                                        <div className="col-5 d-flex flex-column justify-content-center align-items-start p-0">

                                            <div className="bar_right mb-1" id="char_bar" style={{width: this.state.char_width + '%'}}>
                                            </div>
                                            <div className="bar_right " id="loadudbp" style={{width: this.state.load_width + '%'}}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<ChargeComponent charge={this.state.lhsl} discharge={this.state.ghsl} load_mw={this.state.load_net_mw} gen_mw={this.state.gen_net_mw}/>*/}
                            </div>
                            <div className="row d-flex flex-row justify-content-center pb-3">
                                <div className="col-4 d-flex flex-row justify-content-start">
                                    <div className="udbp">
                                        <p className="secondary_text p-0 m-0" id="gen_upbp">{this.state.gen_upbp}</p>
                                    </div>
                                </div>
                                <div className="col-4 d-flex flex-row justify-content-center">
                                    <p className="reg_text p-0 m-0">UDBP</p>

                                </div>
                                <div className="col-4 d-flex flex-row justify-content-end">
                                    <div className="udbp">
                                        <p className="secondary_text p-0 m-0" id="load_upbp">{this.state.load_upbp}</p>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div className="col-4 d-flex flex-column">
                            <div className="row d-flex flex-row justify-content-between">

                                <div className="col-6 d-flex flex-column justify-content-end align-items-end m-0 p-0">
                                    <p className="secondary_text pb-1 m-0 ">BP</p>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-end">
                                    <p className="nmw p-0 m-0" id="load_basepoint">{this.state.load_basepoint}</p>
                                </div>

                            </div>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6 d-flex flex-column justify-content-end align-items-end m-0 p-0">
                                    <p className="secondary_text pb-1 m-0 ">NMW</p>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-end">
                                    <p className="nmw p-0 m-0 " id="load_net_mw">{this.state.load_net_mw}</p>
                                </div>



                            </div>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6 d-flex flex-row justify-content-end p-0">
                                    <p className="secondary_text p-0 m-0">REG. DOWN</p>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-end">
                                    <p className="reg_text  p-0 m-0" id="load_regd_req">{this.state.load_regd_req}</p>
                                    <p className="secondary_text p-0 m-0" id="load_regd_res">/{this.state.load_regd_res}</p>
                                </div>



                            </div>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6 d-flex flex-row justify-content-end p-0 m-0">
                                    <p className="secondary_text p-0 m-0">REG. UP</p>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-end">
                                    <p className="reg_text  p-0 m-0"id="load_regu_req">{this.state.load_regu_req}</p>
                                    <p className="secondary_text p-0 m-0" id="load_regu_res">/{this.state.load_regu_res}</p>
                                </div>


                            </div>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6 d-flex flex-row justify-content-end p-0">
                                    <p className="secondary_text">RRS</p>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-end">
                                    <p className="reg_text" id="load_rrs_req">{this.state.load_rrs_req}</p>
                                    <p className="secondary_text" id="load_rrs_res">/{this.state.load_rrs_res}</p>
                                </div>



                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className="row d-flex flex-row justify-content-start " >
                                <p className="on_clr pb-0 m-0">{this.state.gen_res_status}</p>
                            </div>
                            <div className="row d-flex flex-row justify-content-start">
                                <p className="secondary_text">{this.state.asset}_UNIT1</p>
                            </div>
                        </div>
                        {/*<div className="col-2">*/}
                        {/*    */}
                        {/*</div>*/}
                        <div className="col-6 d-flex flex-row justify-content-between">
                            <div className="col-3 d-flex flex-row justify-content-start align-items-end">
                                <p className="secondary_text">GHSL</p>
                            </div>
                            <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                                <p className="nmw" id="gen_max_discharge">{this.state.ghsl} | {this.state.lhsl}</p>
                            </div>
                            <div className="col-3 d-flex flex-row justify-content-end align-items-end">
                                <p className="secondary_text">LHSL</p>
                            </div>

                        </div>
                        {/*<div className="col-2">*/}
                        {/*    */}
                        {/*</div>*/}
                        <div className="col-3">
                            <div className="row d-flex flex-row justify-content-end" >
                                <p className=" d-flex flex-row justify-content-end on_clr pb-0 m-0">{this.state.load_res_status}</p>
                            </div>
                            <div className="row d-flex flex-row justify-content-end">
                                <p className="secondary_text d-flex flex-row justify-content-end">{this.state.asset}_LD1</p>
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">Status:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_res_status"></p>
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0">Frequency:&nbsp;</p>
                            <p className="secondary_text m-0" id="frequency">{this.state.frequency}</p>
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">Status:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_res_status">{this.state.load_res_status}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">Basepoint:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_basepoint_2">{this.state.gen_basepoint}</p>
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0">SOC:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_soc_2">{this.state.gen_soc}</p>
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">Basepoint:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_basepoint_2">{this.state.load_basepoint}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">UDBP:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_upbp_2">{this.state.gen_upbp}</p>
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">UDBP:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_upbp_2">{this.state.load_upbp}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">Net MW:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_net_mw_2">{this.state.gen_net_mw}</p>
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0" id="percents">
                                {this.state.ess_1}%|{this.state.ess_2}%|{this.state.ess_3}%|{this.state.ess_4}%
                            </p>
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">Net MW:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_net_mw_2">{this.state.load_net_mw}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">Net MVAR:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_net_mvar">{this.state.gen_net_mvar}</p>
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">Net MVAR:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_net_mvar">{this.state.load_net_mvar}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex flex-row justify-content-start m-0">
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0">Max Operating SOC:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_max_soc">{this.state.gen_max_soc}</p>
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0">
                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0 warning_col ">HSL:&nbsp;</p>
                            <p className="secondary_text m-0 warning_col">{this.state.gen_hsl}</p>
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0">Min Operating SOC:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_min_soc">{this.state.gen_min_soc}</p>
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0 warning_col">HSL:&nbsp;</p>
                            <p className="secondary_text m-0 warning_col">{this.state.load_hsl}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-2 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">HEL:&nbsp;</p>
                            <p className="secondary_text m-0">{this.state.gen_def_hsl}</p>
                        </div>
                        <div className="col-8 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0">Max Discharge Power Limit:&nbsp;</p>
                            <p className="secondary_text m-0"></p>
                        </div>
                        <div className="col-2  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">HEL:&nbsp;</p>
                            <p className="secondary_text m-0">{this.state.load_def_hsl}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-3 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">LSL:&nbsp;</p>
                            <p className="secondary_text m-0">0.0</p>
                        </div>
                        <div className="col-6 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0">Max Charge Power Limit:&nbsp;</p>
                            <p className="secondary_text m-0">0.0</p>
                        </div>
                        <div className="col-3  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">LSL:&nbsp;</p>
                            <p className="secondary_text m-0">0.0</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-3 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">LEL:&nbsp;</p>
                            <p className="secondary_text m-0">0.0</p>
                        </div>
                        <div className="col-6 d-flex justify-content-center m-0">
                        </div>
                        <div className="col-3  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">LEL:&nbsp;</p>
                            <p className="secondary_text m-0">0.0</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-3 d-flex flex-row justify-content-start m-0">
                        </div>
                        <div className="col-6 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0">Breaker SW1:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_sw1"></p>
                        </div>
                        <div className="col-3  d-flex flex-row justify-content-end m-0">

                        </div>

                    </div>
                    <div className="row">
                        <div className="col-4 d-flex flex-row justify-content-start m-0 unrow_r">
                            <p className="secondary_text font-weight-bold m-0 warning_col ">SCCT Mitigation Flag:&nbsp;</p>
                            <p className="secondary_text m-0 warning_col" id="gen_scct">{this.state.gen_scct}</p>
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0">Breaker 52M:&nbsp;</p>
                            <p className="secondary_text m-0"id="gen_52m">{this.state.gen_52m}</p>
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0 unrow_l">
                            <p className="secondary_text font-weight-bold m-0 warning_col ">SCCT Mitigation Flag:&nbsp;</p>
                            <p className="secondary_text m-0 warning_col" id="load_scct">{this.state.load_scct}</p>
                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-3 d-flex flex-row justify-content-start m-0">
                        </div>
                        <div className="col-6 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0">Breaker Gen:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_breaker">{this.state.gen_breaker}</p>
                        </div>
                        <div className="col-3  d-flex flex-row justify-content-end m-0">

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-3 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">Line MW:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_flows">{this.state.gen_flows}</p>
                        </div>
                        <div className="col-6 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0 warning_col" >Breaker Load:&nbsp;</p>
                            <p className="secondary_text m-0 warning_col" id="load_breaker">{this.state.load_breaker}</p>
                        </div>
                        <div className="col-3  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">Line MW:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_flows">{this.state.load_flows}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-6 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">Line MVAW:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_flows_mvar">{this.state.gen_flows_mvar}</p>
                        </div>
                        <div className="col-6  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">Line MVAW:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_flows_mvar">{this.state.load_flows_mvar}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-6 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">VAB Voltage:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_voltage">{this.state.gen_voltage}</p>
                        </div>
                        <div className="col-6  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">VAB Voltage:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_voltage">{this.state.load_voltage}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-6 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">NURR:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_nurr">{this.state.gen_nurr}</p>
                        </div>
                        <div className="col-6  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">NURR:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_nurr">{this.state.load_nurr}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-6 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">NDRR:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_ndrr">{this.state.gen_ndrr}</p>
                        </div>
                        <div className="col-6  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">NDRR:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_ndrr">{this.state.load_ndrr}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-6 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">EURR:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_eurr">{this.state.gen_eurr}</p>
                        </div>
                        <div className="col-6  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">EURR:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_eurr">{this.state.load_eurr}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-6 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">EDRR:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_edrr">{this.state.gen_edrr}</p>
                        </div>
                        <div className="col-6  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">EDRR:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_edrr">{this.state.load_edrr}</p>

                        </div>

                    </div>
                </div>
            </div>);

    }
    update(){
        //because it takes time to open and read a csv we need to use a "then" statement
        //because of this we need to initialize a few variables outside of the scope of the
        //then statement
        var freq = 0;//frequency, will be set in the then statement
        var percents = [0,0,0,0]//refers to ess_#_soc
        //open the site enpoints file
        csv(sitefile).then(data=>{
            freq = data[this.state.asset_index]['frequency']//set freq
            //for loop to cycle through an set ess_soc col vals, easier than creating 4 variables? maybe
            for (let i = 0; i<4; i++){
                var temp_string = "ess_" + (i+1) + "_soc"
                var temp_percent = data[this.state.asset_index][temp_string];
                if (temp_percent != undefined){
                    percents[i] = Number(temp_percent).toFixed(0)
                    // console.log(percents[i])
                }

            }
        })
        //open  super components csv
        csv(compfile).then(data =>{

            var row = data[this.state.asset_index]//grabs this asset's row of data
            //we might want to change this because it is so hard coded, but i would wait until
            //we switch to using a json because this is faster for now

            //initialize variables to be set in following if statement depending on
            //the discharge/charge numbers
            var hsl_gen, hsl_load;
            //chooses the smaller of charge/lhsl and discharge/ghsl
            if (row['gen_max_discharge_mw'] > this.state.gen_def_hsl){
                hsl_gen = this.state.gen_def_hsl
            }
            else{
                hsl_gen = row['gen_max_discharge_mw']
            }

            if (row['gen_max_charge_mw'] > this.state.load_def_hsl){
                hsl_load = this.state.load_def_hsl
            }
            else{
                hsl_load = row['gen_max_charge_mw']
            }

            //initialize variables for each of the breaker statuses
            var ftm, sw, gen, load, avr;
            //basically if true/1 = closed
            if (row['gen_avr_status'] == true || row['gen_avr_status'] == 1){
                avr = closed;
            }
            else{
                avr = open;
            }
            if (row[this.state.switch_label] == true || row[this.state.switch_label] == 1){
                sw = closed;
            }
            else{
                sw = open;
            }
            if (row['gen_pseudo_switch_status'] == true || row['gen_pseudo_switch_status'] == 1){
                gen = closed;
            }
            else{
                gen = open;
            }
            if (row['load_pseudo_switch_status'] == true || row['load_pseudo_switch_status'] == 1){
                load = closed;
            }
            else{
                load = open;
            }
            if (row['gen_52m_status'] == true || row['gen_52m_status'] == 1){
                ftm = closed;
            }
            else{
                ftm = open;
            }
            //set
            this.setState({
                asset: this.state.asset,
                asset_index: this.state.asset_index,
                gen_price: Number(row['gen_lmp']).toFixed(2),
                gen_soc: Number(row['gen_soc']).toFixed(2),
                gen_basepoint: Number(row['gen_basepoint']).toFixed(2),
                gen_net_mw: Number(row['gen_net_mw']).toFixed(2),
                gen_regd_req: Number(row['gen_reg_down_requirement']).toFixed(2),
                gen_regd_res: Number(row['gen_reg_down_responsibility']).toFixed(2),
                gen_regu_req: Number(row['gen_reg_up_requirement']).toFixed(2),
                gen_regu_res: Number(row['gen_reg_up_responsibility']).toFixed(2),
                gen_rrs_req: Number(row['gen_rrs_requirement']).toFixed(2),
                gen_rrs_res: Number(row['gen_rrs_responsibility']).toFixed(2),
                gen_upbp: row['gen_updated_basepoint'],
                load_basepoint: Number(row['load_basepoint']).toFixed(2),
                load_net_mw: Number(row['load_net_mw']).toFixed(2),
                load_regd_req: Number(row['load_reg_down_requirement']).toFixed(2),
                load_regd_res: Number(row['load_reg_down_responsibility']).toFixed(2),
                load_regu_req: Number(row['load_reg_up_requirement']).toFixed(2),
                load_regu_res: Number(row['load_reg_up_responsibility']).toFixed(2),
                load_rrs_req: Number(row['load_rrs_requirement']).toFixed(2),
                load_rrs_res: Number(row['load_rrs_responsibility']).toFixed(2),
                load_upbp: row['load_updated_basepoint'],
                ess_1:percents[0],
                ess_2:percents[1],
                ess_3:percents[2],
                ess_4:percents[3],
                gen_max_dis: String(Number(row['gen_max_discharge_mw']).toFixed(1)) +"|"+ String(Number(row['gen_max_charge_mw']).toFixed(1)),
                // frequency:0,
                gen_res_status: Number(row['gen_resource_status']),
                load_res_status: Number(row['load_resource_status']),
                gen_net_mvar: Number(row['gen_net_mvar']).toFixed(2),
                load_net_mvar: Number(row['load_net_mvar']).toFixed(2),
                gen_max_soc: Number(row['gen_max_operating_soc']).toFixed(1),
                gen_min_soc: Number(row['gen_min_operating_soc']).toFixed(1),
                gen_sw1: row[this.state.switch_label],
                gen_scct: row['gen_scct_flag'],
                gen_52m: row['gen_52m_status'],
                load_scct: row['load_scct_flag'],
                gen_breaker: row['gen_pseudo_switch_status'],
                gen_flows: Number(row['gen_line_flows_mw']).toFixed(1),
                load_breaker: Number(row['load_pseudo_switch_status']).toFixed(1),
                load_flows: Number(row['load_lines_flows_mw']).toFixed(1),
                gen_flows_mvar: Number(row['gen_line_flows_mvar']).toFixed(1),
                load_flows_mvar: Number(row['load_line_flows_mvar']).toFixed(1),
                gen_voltage: Number(row['gen_voltage']).toFixed(1),
                load_voltage: Number(row['load_voltage']).toFixed(1),
                gen_nurr: Number(row['gen_normal_up_ramp_rate']).toFixed(1),
                load_nurr: Number(row['load_normal_up_ramp_rate']).toFixed(1),
                gen_ndrr: Number(row['gen_normal_down_ramp_rate']).toFixed(1),
                load_ndrr: Number(row['load_normal_down_ramp_rate']).toFixed(1),
                gen_eurr: Number(row['gen_emergency_up_ramp_rate']).toFixed(1),
                load_eurr: Number(row['load_emergency_up_ramp_rate']).toFixed(1),
                gen_edrr: Number(row['gen_emergency_down_ramp_rate']).toFixed(1),
                load_edrr: Number(row['load_emergency_down_ramp_rate']).toFixed(1),
                ghsl:Number(row['gen_max_discharge_mw']).toFixed(1),
                lhsl:Number(row['gen_max_charge_mw']).toFixed(1),
                gen_hsl: hsl_gen,
                load_hsl: hsl_load,
                sw1:sw,
                ftm_breaker :ftm,
                gen_breaker_img :gen,
                load_breaker_img :load,
                avr_breaker : avr,
                vpn_breaker : closed,
                char_width:((row['load_net_mw']/row['gen_max_charge_mw'] )*.8)*100,
                dis_width:((row['gen_net_mw']/row['gen_max_discharge_mw'] )*.8)*100,
                load_width:((row['load_updated_basepoint']/this.state.load_def_hsl)*.80)*100,
                gen_width:((row['gen_updated_basepoint']/this.state.load_def_hsl)*.80)*100,
                frequency : freq

            });
        })

        // return await [csv(compfile), csv(sitefile)];

    }
    SAFE_componentWillMount() {
        this.update = this.update.bind(this);
    }

    componentDidMount() {

        setInterval(()=>
            this.update(), 4000)

    }
}

export default CardComp;