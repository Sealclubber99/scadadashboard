//import statemetn for react components
import React, {Component, } from 'react'
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
class CardComponent extends Component {
    //initializing the state data, all values to 0
    state = {
        load_def_hsl:0,
        gen_def_hsl:0,
        switch_label:'0',
        size:false
    }

    constructor(props) {
        super(props);
        // console.log(this.props.row)
        var temp = assets_dict[this.props.asset];
        //used to grab hsl values
        var gen_temp, load_temp;

        //status label defualt is ds1
        var status_label = 'gen_ds1_status';

        //checking indexes instead of asset name to set the deictionary hsl values
        // 3 = batcave, 9=Northfork
        if ((temp === 3)||(temp === 9)){
            gen_temp = Number(100.5).toFixed(1);
            load_temp = Number(100.5).toFixed(1);
            //batcave and northfork use ds1 instead
            status_label = 'gen_sw1_status';
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
        this.setState({
            gen_def_hsl: gen_temp,
            load_def_hsl: load_temp,
            switch_label:status_label,
            size: this.props.size
        })



    }
    getPercents(){
        // console.log(this.props.siteRow)
        var percents = [0,0,0,0]
        for (let i = 0; i<4; i++){
            var temp_string = "ess_" + (i+1) + "_soc"
            var temp_percent = this.props.siteRow[temp_string];
            if (temp_percent != undefined){
                percents[i] = Number(temp_percent).toFixed(0)
                // console.log(percents[i])
            }

        }
        return percents;
    }
    getAlerts(){
        var alerted = false;
        if(typeof(this.props.rules) != "undefined"){
            console.log('in here')
            if(this.props.rules.length > 0){
                console.log('length > 0')
                this.props.rules.forEach((item) =>{
                    if((item.asset == this.state.asset)||(item.asset == "All")){
                        if(item.operator == ">"){

                            if(Number(this.props.row[item.column]) > Number(item.value)){
                                console.log('should work')
                                alerted = true;
                            }
                        }
                        else if(item.operator == "<"){
                            if(Number(this.props.row[item.column]) < Number(item.value)){
                                alerted = true;
                            }

                        }
                        else{
                            if(Number(this.props.row[item.column]) == Number(item.value)){
                                alerted = true;
                            }
                        }
                        // if(row[item.column])
                    }
                })
            }
        }
        return alerted;
    }
    render(){

        var hsl_gen, hsl_load;
        // console.log(this.props.row)
        // console.log(this.props.asset)
        //chooses the smaller of charge/lhsl and discharge/ghsl

        if (this.props.row['gen_max_discharge_mw'] > this.state.gen_def_hsl){
            hsl_gen = this.state.gen_def_hsl
        }
        else{
            hsl_gen = this.props.row['gen_max_discharge_mw']
        }

        if (this.props.row['gen_max_charge_mw'] > this.state.load_def_hsl){
            hsl_load = this.state.load_def_hsl
        }
        else{
            hsl_load = this.props.row['gen_max_charge_mw']
        }

        var char_width, dis_width, load_width, gen_width;
        char_width = ((this.props.row['load_net_mw']/this.props.row['gen_max_charge_mw'] )*.8)*100
        dis_width = ((this.props.row['gen_net_mw']/this.props.row['gen_max_discharge_mw'] )*.8)*100
        load_width =((this.props.row['load_updated_basepoint']/this.state.load_def_hsl)*.80)*100
        gen_width  =((this.props.row['gen_updated_basepoint']/this.state.load_def_hsl)*.80)*100

        var ftm, sw, gen, load, avr;
        //basically if true/1 = closed
        if (this.props.row['gen_avr_status'] == true || this.props.row['gen_avr_status'] == 1){
            avr = closed;
        }
        else{
            avr = open;
        }
        if (this.props.row[this.state.switch_label] == true || this.props.row[this.state.switch_label] == 1){
            sw = closed;
        }
        else{
            sw = open;
        }
        if (this.props.row['gen_pseudo_switch_status'] == true || this.props.row['gen_pseudo_switch_status'] == 1){
            gen = closed;
        }
        else{
            gen = open;
        }
        if (this.props.row['load_pseudo_switch_status'] == true || this.props.row['load_pseudo_switch_status'] == 1){
            load = closed;
        }
        else{
            load = open;
        }
        if (this.props.row['gen_52m_status'] == true || this.props.row['gen_52m_status'] == 1){
            ftm = closed;
        }
        else{
            ftm = open;
        }

        var percents = this.getPercents()
        var flashing = this.getAlerts();
        console.log(flashing)



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
                                        <p className="fuse_text rtu p-0 m-0">RTU:&nbsp;N/A&nbsp;</p>
                                    </div>
                                    <div className="col-6 d-flex flex-row">

                                        {/*<p className="fuse_text rtu p-0 m-0"></p>*/}
                                        <p className="fuse_text rtu p-0 m-0">DNP3:&nbsp;N/A</p>
                                    </div>

                                </div>
                            </div>
                            <div className="col-3 d-flex flex-row p-0">
                                <img id="avr_icon" className="light_indicator" alt="err" src={open}/>
                                <p className="secondary_text">AVR: N/A</p>
                            </div>
                            <div className="col-4 d-flex flex-row justify-content-around align-items-start p-0">
                                <div className=" d-flex flex-column" id="sw1_icon">
                                    <div className="row">
                                        <img  className="light_indicator" alt="err" src={sw}/>
                                    </div>
                                    <div className="row">
                                        <p className='fuse_text m-0 p-0' id="sw1">SW1</p>
                                    </div>
                                </div>
                                <div className=" d-flex flex-column" id="ftm_icon">
                                    <div className="row">
                                        <img  className="light_indicator" alt="err" src={ftm}/>
                                    </div>
                                    <div className="row">
                                        <p className='fuse_text m-0 ' id="ftm">52M</p>
                                    </div>
                                </div>
                                <div className=" d-flex flex-column" id="gen_icon">
                                    <div className="row">
                                        <img  className="light_indicator" alt="err" src={gen}/>
                                    </div>
                                    <div className="row">
                                        <p className='fuse_text m-0 p-0' id="gen">GEN</p>
                                    </div>
                                </div>
                                <div className=" d-flex flex-column " id="load_icon">
                                    <div className="row">
                                        <img  className="light_indicator" alt="err" src={load}/>
                                    </div>
                                    <div className="row">
                                        <p className='fuse_text m-0 p-0' id="ld">LOAD</p>
                                    </div>
                                </div>

                            </div>


                        </div>
                        <div className="row">
                            <p className="asset_names primary_text">{this.props.asset}</p>
                        </div>
                    </div>




                    <div className="col-4 d-flex flex-column align-items-end">
                        <div className="row ">
                            <p className="primary_text price m-0" id="gen_price">${Number(this.props.row['gen_lmp']).toFixed(2)}</p>
                        </div>
                        <div className="col-10 d-flex flex-row justify-content-end">
                            <div className="row ">
                                <p className="price primary_text m-0" id="gen_soc">{Number(this.props.row['gen_soc']).toFixed(2)}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div className="bottom_card m-0">*/}
                <div className={classNames({'bottom_card':true, 'm-0': true, 'bc_height':this.props.size})}>
                    <div className="row">
                        <div className="col-4 d-flex flex-column">
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6">
                                    <p className="nmw p-0 m-0" id="gen_basepoint">{Number(this.props.row['gen_basepoint']).toFixed(2)}</p>
                                </div>
                                <div className="col-6 d-flex flex-column justify-content-end align-items-start m-0 p-0">
                                    <p className="secondary_text pb-1 m-0 ">BP</p>
                                </div>

                            </div>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6">
                                    <p className="nmw p-0 m-0" id="gen_net_mw">{Number(this.props.row['gen_net_mw']).toFixed(2)}</p>
                                </div>
                                <div className="col-6 d-flex flex-column justify-content-end align-items-start m-0 p-0">
                                    <p className="secondary_text pb-1 m-0 ">NMW</p>
                                </div>


                            </div>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6 d-flex flex-row justify-content-start">
                                    <p className="reg_text  p-0 m-0" id="gen_regd_req">{Number(this.props.row['gen_reg_down_requirement']).toFixed(2)}</p>
                                    <p className="secondary_text p-0 m-0" id="gen_regd_res">/{Number(this.props.row['gen_reg_down_responsibility']).toFixed(2)}</p>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-start p-0">
                                    <p className="secondary_text p-0 m-0">REG. DOWN</p>
                                </div>


                            </div>
                            <div className="row d-flex flex-row justify-content-between">

                                <div className="col-6 d-flex flex-row justify-content-start">
                                    <p className="reg_text  p-0 m-0" id="gen_regu_req">{Number(this.props.row['gen_reg_up_requirement']).toFixed(2)}</p>
                                    <p className="secondary_text p-0 m-0" id="gen_regu_res">/{Number(this.props.row['gen_reg_up_responsibility']).toFixed(2)}</p>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-start p-0 m-0">
                                    <p className="secondary_text p-0 m-0">REG. UP</p>
                                </div>

                            </div>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6 d-flex flex-row justify-content-start">
                                    <p className="reg_text  p-0 m-0"id="gen_rrs_req">{Number(this.props.row['gen_rrs_requirement']).toFixed(2)}</p>
                                    <p className="secondary_text p-0 m-0" id="gen_rrs_res">/{Number(this.props.row['gen_rrs_responsibility']).toFixed(2)}</p>
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
                                            <div className="bar_left mb-1" id="dis_bar" style={{width: dis_width + '%'}}>
                                            </div>
                                            <div className="bar_left" id="genudbp" style={{width: gen_width + '%'}}>
                                            </div>
                                        </div>
                                        <div className="vertical_line p-0"></div>
                                        <div className="col-5 d-flex flex-column justify-content-center align-items-start p-0">

                                            <div className="bar_right mb-1" id="char_bar" style={{width: char_width + '%'}}>
                                            </div>
                                            <div className="bar_right " id="loadudbp" style={{width: load_width + '%'}}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<ChargeComponent charge={this.state.lhsl} discharge={this.state.ghsl} load_mw={this.state.load_net_mw} gen_mw={this.state.gen_net_mw}/>*/}
                            </div>
                            <div className="row d-flex flex-row justify-content-center pb-3">
                                <div className="col-4 d-flex flex-row justify-content-start">
                                    <div className="udbp">
                                        <p className="secondary_text p-0 m-0" id="gen_upbp">{this.props.row['gen_updated_basepoint']}</p>
                                    </div>
                                </div>
                                <div className="col-4 d-flex flex-row justify-content-center">
                                    <p className="reg_text p-0 m-0">UDBP</p>

                                </div>
                                <div className="col-4 d-flex flex-row justify-content-end">
                                    <div className="udbp">
                                        <p className="secondary_text p-0 m-0" id="load_upbp">{this.props.row['load_updated_basepoint']}</p>
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
                                    <p className="nmw p-0 m-0" id="load_basepoint">{Number(this.props.row['load_basepoint']).toFixed(2)}</p>
                                </div>

                            </div>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6 d-flex flex-column justify-content-end align-items-end m-0 p-0">
                                    <p className="secondary_text pb-1 m-0 ">NMW</p>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-end">
                                    <p className="nmw p-0 m-0 " id="load_net_mw">{Number(this.props.row['load_net_mw']).toFixed(2)}</p>
                                </div>



                            </div>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6 d-flex flex-row justify-content-end p-0">
                                    <p className="secondary_text p-0 m-0">REG. DOWN</p>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-end">
                                    <p className="reg_text  p-0 m-0" id="load_regd_req">{Number(this.props.row['load_reg_down_requirement']).toFixed(2)}</p>
                                    <p className="secondary_text p-0 m-0" id="load_regd_res">/{Number(this.props.row['load_reg_down_responsibility']).toFixed(2)}</p>
                                </div>



                            </div>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6 d-flex flex-row justify-content-end p-0 m-0">
                                    <p className="secondary_text p-0 m-0">REG. UP</p>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-end">
                                    <p className="reg_text  p-0 m-0"id="load_regu_req">{Number(this.props.row['load_reg_up_requirement']).toFixed(2)}</p>
                                    <p className="secondary_text p-0 m-0" id="load_regu_res">/{Number(this.props.row['load_reg_up_responsibility']).toFixed(2)}</p>
                                </div>


                            </div>
                            <div className="row d-flex flex-row justify-content-between">
                                <div className="col-6 d-flex flex-row justify-content-end p-0">
                                    <p className="secondary_text">RRS</p>
                                </div>
                                <div className="col-6 d-flex flex-row justify-content-end">
                                    <p className="reg_text" id="load_rrs_req">{Number(this.props.row['load_rrs_requirement']).toFixed(2)}</p>
                                    <p className="secondary_text" id="load_rrs_res">/{Number(this.props.row['load_rrs_responsibility']).toFixed(2)}</p>
                                </div>



                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            <div className="row d-flex flex-row justify-content-start " >
                                <p className="on_clr pb-0 m-0">{Number(this.props.row['gen_resource_status'])}</p>
                            </div>
                            <div className="row d-flex flex-row justify-content-start">
                                <p className="secondary_text">{this.props.asset}_UNIT1</p>
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
                                <p className="nmw" id="gen_max_discharge">{Number(this.props.row['gen_max_discharge_mw']).toFixed(1)} | {Number(this.props.row['gen_max_charge_mw']).toFixed(1)}</p>
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
                                <p className=" d-flex flex-row justify-content-end on_clr pb-0 m-0">{Number(this.props.row['load_resource_status'])}</p>
                            </div>
                            <div className="row d-flex flex-row justify-content-end">
                                <p className="secondary_text d-flex flex-row justify-content-end">{this.props.asset}_LD1</p>
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
                            <p className="secondary_text m-0" id="frequency">{this.props.frequency}</p>
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">Status:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_res_status">{Number(this.props.row['load_resource_status'])}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">Basepoint:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_basepoint_2">{Number(this.props.row['gen_basepoint']).toFixed(2)}</p>
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0">SOC:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_soc_2">{Number(this.props.row['gen_soc']).toFixed(2)}</p>
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">Basepoint:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_basepoint_2">{Number(this.props.row['load_basepoint']).toFixed(2)}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">UDBP:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_upbp_2">{this.props.row['gen_updated_basepoint']}</p>
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">UDBP:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_upbp_2">{this.props.row['load_updated_basepoint']}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">Net MW:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_net_mw_2">{Number(this.props.row['gen_net_mw']).toFixed(2)}</p>
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0" id="percents">
                                {percents[0]}%|{percents[1]}%|{percents[2]}%|{percents[3]}%
                            </p>
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">Net MW:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_net_mw_2">{Number(this.props.row['load_net_mw']).toFixed(2)}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">Net MVAR:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_net_mvar">{Number(this.props.row['gen_net_mvar']).toFixed(2)}</p>
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">Net MVAR:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_net_mvar">{Number(this.props.row['load_net_mvar']).toFixed(2)}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex flex-row justify-content-start m-0">
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0">Max Operating SOC:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_max_soc">{Number(this.props.row['gen_max_operating_soc']).toFixed(1)}</p>
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0">
                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-4 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0 warning_col ">HSL:&nbsp;</p>
                            <p className="secondary_text m-0 warning_col">{hsl_gen}</p>
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0">Min Operating SOC:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_min_soc">{Number(this.props.row['gen_min_operating_soc']).toFixed(1)}</p>
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0 warning_col">HSL:&nbsp;</p>
                            <p className="secondary_text m-0 warning_col">{hsl_load}</p>

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
                            <p className="secondary_text m-0 warning_col" id="gen_scct">{this.props.row['gen_scct_flag']}</p>
                        </div>
                        <div className="col-4 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0">Breaker 52M:&nbsp;</p>
                            <p className="secondary_text m-0"id="gen_52m">{this.props.row['gen_52m_status']}</p>
                        </div>
                        <div className="col-4  d-flex flex-row justify-content-end m-0 unrow_l">
                            <p className="secondary_text font-weight-bold m-0 warning_col ">SCCT Mitigation Flag:&nbsp;</p>
                            <p className="secondary_text m-0 warning_col" id="load_scct">{this.props.row['load_scct_flag']}</p>
                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-3 d-flex flex-row justify-content-start m-0">
                        </div>
                        <div className="col-6 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0">Breaker Gen:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_breaker">{this.props.row['gen_pseudo_switch_status']}</p>
                        </div>
                        <div className="col-3  d-flex flex-row justify-content-end m-0">

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-3 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">Line MW:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_flows">{Number(this.props.row['gen_line_flows_mw']).toFixed(1)}</p>
                        </div>
                        <div className="col-6 d-flex justify-content-center m-0">
                            <p className="secondary_text font-weight-bold m-0 warning_col" >Breaker Load:&nbsp;</p>
                            <p className="secondary_text m-0 warning_col" id="load_breaker">{Number(this.props.row['load_pseudo_switch_status']).toFixed(1)}</p>
                        </div>
                        <div className="col-3  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">Line MW:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_flows">{Number(this.props.row['load_lines_flows_mw']).toFixed(1)}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-6 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">Line MVAW:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_flows_mvar">{Number(this.props.row['gen_line_flows_mvar']).toFixed(1)}</p>
                        </div>
                        <div className="col-6  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">Line MVAW:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_flows_mvar">{Number(this.props.row['load_line_flows_mvar']).toFixed(1)}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-6 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">VAB Voltage:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_voltage">{Number(this.props.row['gen_voltage']).toFixed(1)}</p>
                        </div>
                        <div className="col-6  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">VAB Voltage:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_voltage">{Number(this.props.row['load_voltage']).toFixed(1)}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-6 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">NURR:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_nurr">{Number(this.props.row['gen_normal_up_ramp_rate']).toFixed(1)}</p>
                        </div>
                        <div className="col-6  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">NURR:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_nurr">{Number(this.props.row['load_normal_up_ramp_rate']).toFixed(1)}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-6 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">NDRR:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_ndrr">{Number(this.props.row['gen_normal_down_ramp_rate']).toFixed(1)}</p>
                        </div>
                        <div className="col-6  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">NDRR:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_ndrr">{Number(this.props.row['load_normal_down_ramp_rate']).toFixed(1)}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-6 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">EURR:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_eurr">{Number(this.props.row['gen_emergency_up_ramp_rate']).toFixed(1)}</p>
                        </div>
                        <div className="col-6  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">EURR:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_eurr">{Number(this.props.row['load_emergency_up_ramp_rate']).toFixed(1)}</p>

                        </div>

                    </div>
                    <div className="row ">
                        <div className="col-6 d-flex flex-row justify-content-start m-0">
                            <p className="secondary_text font-weight-bold m-0">EDRR:&nbsp;</p>
                            <p className="secondary_text m-0" id="gen_edrr">{Number(this.props.row['gen_emergency_down_ramp_rate']).toFixed(1)}</p>
                        </div>
                        <div className="col-6  d-flex flex-row justify-content-end m-0">
                            <p className="secondary_text font-weight-bold m-0">EDRR:&nbsp;</p>
                            <p className="secondary_text m-0" id="load_edrr">{Number(this.props.row['load_emergency_down_ramp_rate']).toFixed(1)}</p>

                        </div>

                    </div>
                </div>
            </div>);

    }
}

export default CardComponent;