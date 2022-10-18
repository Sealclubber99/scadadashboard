import React, {Component} from 'react'
import closed from "../closed.png";
import open from "../open.png";
import '../Cards.css';
import classNames from "classnames";
// import ChargeBar from "../ChargeBar";
import ChargeComponent from "./chargeComponent";
function CardComponent({asset, selectedSize, row, freq}){

        // const data = useEffect();
        // console.log(row['breaker_status'])
        const breakers ={
            'sw1':closed,
            '52m':closed,
            'gen':closed,
            'load':closed,
            'avr':closed,
            'vpn':closed,
            'rtu':"YES",
            'dnp3':"YES",
            'avr2':"ON"
        }
        if (row['gen_sw1_status'] == 'True'){
            breakers['sw1'] = open;
        };
        if (row['gen_52m_status'] == 'True'){
            breakers['52m'] = open;
        };
        if (row['gen_pseudo_switch_status'] == 'True'){
            breakers['gen'] = open;
        };
        if (row['load_pseudo_switch_status'] == 'True'){
            breakers['sw1'] = open;
        };
        if (row['gen_avr_status'] == 'True'){
            breakers['avr'] = open;
            breakers['avr2'] = "ON";
        }
        else{
            breakers['avr2'] = "OFF";
        }


        return(
        // <div className="card p-3 pb-0 ">

        <div className={classNames({
            'p-3':true,
            'pb-0':true,
            'card-l': selectedSize,
            'card-s':!selectedSize,
            // 'red-shadow-med':true

        })}>
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
                                    <p className="fuse_text rtu p-0 m-0">RTU:&nbsp;{breakers['rtu']}&nbsp;</p>
                                </div>
                                <div className="col-6 d-flex flex-row">

                                    {/*<p className="fuse_text rtu p-0 m-0"></p>*/}
                                    <p className="fuse_text rtu p-0 m-0">DNP3:&nbsp;{breakers['dnp3']}</p>
                                </div>

                            </div>
                        </div>
                        <div className="col-3 d-flex flex-row p-0">
                            <img id="avr_icon" className="light_indicator" alt="err" src={open}/>
                            <p className="secondary_text">AVR: {breakers['avr2']}</p>
                        </div>
                        <div className="col-4 d-flex flex-row justify-content-around align-items-start p-0">
                            <div className=" d-flex flex-column" id="sw1_icon">
                                <div className="row">
                                    <img  className="light_indicator" alt="err" src={breakers['sw1']}/>
                                </div>
                                <div className="row">
                                    <p className='fuse_text m-0 p-0' id="sw1">SW1</p>
                                </div>
                            </div>
                            <div className=" d-flex flex-column" id="ftm_icon">
                                <div className="row">
                                    <img  className="light_indicator" alt="err" src={breakers['52m']}/>
                                </div>
                                <div className="row">
                                    <p className='fuse_text m-0 ' id="ftm">52M</p>
                                </div>
                            </div>
                            <div className=" d-flex flex-column" id="gen_icon">
                                <div className="row">
                                    <img  className="light_indicator" alt="err" src={breakers['gen']}/>
                                </div>
                                <div className="row">
                                    <p className='fuse_text m-0 p-0' id="gen">GEN</p>
                                </div>
                            </div>
                            <div className=" d-flex flex-column " id="load_icon">
                                <div className="row">
                                    <img  className="light_indicator" alt="err" src={breakers['load']}/>
                                </div>
                                <div className="row">
                                    <p className='fuse_text m-0 p-0' id="ld">LOAD</p>
                                </div>
                            </div>

                        </div>


                    </div>
                    <div className="row">
                        <p className="asset_names primary_text">{asset}</p>
                    </div>
                </div>




                <div className="col-4 d-flex flex-column align-items-end">
                    <div className="row ">
                        <p className="primary_text price m-0">${Number(row['gen_lmp']).toFixed(2)}</p>
                    </div>
                    <div className="col-10 d-flex flex-row justify-content-end">
                        <div className="row ">
                            <p className="price primary_text m-0">{Number(row['gen_soc']).toFixed(2)}</p>
                        </div>
                    </div>
                </div>
            </div>
            {/*<div className="bottom_card m-0">*/}
            <div className={classNames({'bottom_card':true, 'm-0': true, 'bc_height':selectedSize})}>
                <div className="row">
                    <div className="col-4 d-flex flex-column">
                        <div className="row d-flex flex-row justify-content-between">
                            <div className="col-6">
                                <p className="nmw p-0 m-0">{Number(row['gen_basepoint']).toFixed(1)}</p>
                            </div>
                            <div className="col-6 d-flex flex-column justify-content-end align-items-start m-0 p-0">
                                <p className="secondary_text pb-1 m-0 ">BP</p>
                            </div>

                        </div>
                        <div className="row d-flex flex-row justify-content-between">
                            <div className="col-6">
                                <p className="nmw p-0 m-0">{Number(row['gen_net_mw']).toFixed(1)}</p>
                            </div>
                            <div className="col-6 d-flex flex-column justify-content-end align-items-start m-0 p-0">
                                <p className="secondary_text pb-1 m-0 ">NMW</p>
                            </div>


                        </div>
                        <div className="row d-flex flex-row justify-content-between">
                            <div className="col-6 d-flex flex-row justify-content-start">
                                <p className="reg_text  p-0 m-0">{Number(row['gen_reg_down_responsibility']).toFixed(1)}</p>
                                <p className="secondary_text p-0 m-0">/{Number(row['gen_reg_down_requirement']).toFixed(1)}</p>
                            </div>
                            <div className="col-6 d-flex flex-row justify-content-start p-0">
                                <p className="secondary_text p-0 m-0">REG. DOWN</p>
                            </div>


                        </div>
                        <div className="row d-flex flex-row justify-content-between">

                            <div className="col-6 d-flex flex-row justify-content-start">
                                <p className="reg_text  p-0 m-0">{Number(row['gen_reg_up_responsibility']).toFixed(1)}</p>
                                <p className="secondary_text p-0 m-0">/{Number(row['gen_reg_up_requirement']).toFixed(1)}</p>
                            </div>
                            <div className="col-6 d-flex flex-row justify-content-start p-0 m-0">
                                <p className="secondary_text p-0 m-0">REG. UP</p>
                            </div>

                        </div>
                        <div className="row d-flex flex-row justify-content-between">
                            <div className="col-6 d-flex flex-row justify-content-start">
                                <p className="reg_text  p-0 m-0">{Number(row['gen_rrs_responsibility']).toFixed(1)}</p>
                                <p className="secondary_text p-0 m-0">/{Number(row['gen_rrs_requirement']).toFixed(1)}</p>
                            </div>
                            <div className="col-6 d-flex flex-row justify-content-start p-0">
                                <p className="secondary_text">RRS</p>
                            </div>


                        </div>

                    </div>
                    <div className="col-4">
                        <div className="row">
                            {/*<ChargeBar/>*/}
                            <ChargeComponent/>
                        </div>
                        <div className="row d-flex flex-row justify-content-center pb-3">
                            <div className="col-4 d-flex flex-row justify-content-start">
                                <div className="udbp">
                                    <p className="secondary_text p-0 m-0">{row['gen_updated_basepoint']}</p>
                                </div>
                            </div>
                            <div className="col-4 d-flex flex-row justify-content-center">
                                <p className="reg_text p-0 m-0">UDBP</p>

                            </div>
                            <div className="col-4 d-flex flex-row justify-content-end">
                                <div className="udbp">
                                    <p className="secondary_text p-0 m-0">{row['load_updated_basepoint']}</p>
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
                                <p className="nmw p-0 m-0">{Number(row['load_basepoint']).toFixed(2)}</p>
                            </div>

                        </div>
                        <div className="row d-flex flex-row justify-content-between">
                            <div className="col-6 d-flex flex-column justify-content-end align-items-end m-0 p-0">
                                <p className="secondary_text pb-1 m-0 ">NMW</p>
                            </div>
                            <div className="col-6 d-flex flex-row justify-content-end">
                                <p className="nmw p-0 m-0 ">{Number(row['gen_net_mw']).toFixed(2)}</p>
                            </div>



                        </div>
                        <div className="row d-flex flex-row justify-content-between">
                            <div className="col-6 d-flex flex-row justify-content-end p-0">
                                <p className="secondary_text p-0 m-0">REG. DOWN</p>
                            </div>
                            <div className="col-6 d-flex flex-row justify-content-end">
                                <p className="reg_text  p-0 m-0">{Number(row['load_reg_down_responsibility']).toFixed(2)}</p>
                                <p className="secondary_text p-0 m-0">/{Number(row['load_reg_down_requirement']).toFixed(2)}</p>
                            </div>



                        </div>
                        <div className="row d-flex flex-row justify-content-between">
                            <div className="col-6 d-flex flex-row justify-content-end p-0 m-0">
                                <p className="secondary_text p-0 m-0">REG. UP</p>
                            </div>
                            <div className="col-6 d-flex flex-row justify-content-end">
                                <p className="reg_text  p-0 m-0">{Number(row['load_reg_up_responsibility']).toFixed(2)}</p>
                                <p className="secondary_text p-0 m-0">/{Number(row['load_reg_up_requirement']).toFixed(2)}</p>
                            </div>


                        </div>
                        <div className="row d-flex flex-row justify-content-between">
                            <div className="col-6 d-flex flex-row justify-content-end p-0">
                                <p className="secondary_text">RRS</p>
                            </div>
                            <div className="col-6 d-flex flex-row justify-content-end">
                                <p className="reg_text">{Number(row['load_rrs_responsibility']).toFixed(2)}</p>
                                <p className="secondary_text">/{Number(row['load_rrs_requirement']).toFixed(2)}</p>
                            </div>



                        </div>

                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <div className="row d-flex flex-row justify-content-start " >
                            <p className="on_clr pb-0 m-0">ON</p>
                        </div>
                        <div className="row d-flex flex-row justify-content-start">
                            <p className="secondary_text">BRPASSET_UNIT1</p>
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
                            <p className="nmw">{Number(row['gen_max_discharge_mw']).toFixed(1)} | {Number(row['gen_max_charge_mw']).toFixed(1)}</p>
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
                            <p className=" d-flex flex-row justify-content-end on_clr pb-0 m-0">ONCLR</p>
                        </div>
                        <div className="row d-flex flex-row justify-content-end">
                            <p className="secondary_text d-flex flex-row justify-content-end">BRPASSET_LD1</p>
                        </div>
                    </div>
                </div>
                <div className="row ">
                    <div className="col-4 d-flex flex-row justify-content-start m-0">
                        <p className="secondary_text font-weight-bold m-0">Status:&nbsp;</p>
                        <p className="secondary_text m-0">{row['gen_resource_status']}</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center m-0">
                        <p className="secondary_text font-weight-bold m-0">Frequency:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(freq).toFixed(2)}</p>
                    </div>
                    <div className="col-4  d-flex flex-row justify-content-end m-0">
                        <p className="secondary_text font-weight-bold m-0">Status:&nbsp;</p>
                        <p className="secondary_text m-0">{row['load_resource_status']}</p>

                    </div>

                </div>
                <div className="row ">
                    <div className="col-4 d-flex flex-row justify-content-start m-0">
                        <p className="secondary_text font-weight-bold m-0">Basepoint:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_basepoint']).toFixed(2)}</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center m-0">
                        <p className="secondary_text font-weight-bold m-0">SOC:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_soc']).toFixed(2)}</p>
                    </div>
                    <div className="col-4  d-flex flex-row justify-content-end m-0">
                        <p className="secondary_text font-weight-bold m-0">Basepoint:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['load_basepoint']).toFixed(2)}</p>

                    </div>

                </div>
                <div className="row ">
                    <div className="col-4 d-flex flex-row justify-content-start m-0">
                        <p className="secondary_text font-weight-bold m-0">UDBP:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_updated_basepoint']).toFixed(2)}</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center m-0">
                    </div>
                    <div className="col-4  d-flex flex-row justify-content-end m-0">
                        <p className="secondary_text font-weight-bold m-0">UDBP:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['load_updated_basepoint']).toFixed(2)}</p>

                    </div>

                </div>
                <div className="row ">
                    <div className="col-4 d-flex flex-row justify-content-start m-0">
                        <p className="secondary_text font-weight-bold m-0">Net MW:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_net_mw']).toFixed(2)}</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center m-0">
                        <p className="secondary_text font-weight-bold m-0">&nbsp;0%&nbsp;</p>
                        <p className="secondary_text m-0">|</p>
                        <p className="secondary_text font-weight-bold m-0">&nbsp;0%&nbsp;</p>
                        <p className="secondary_text m-0">|</p>
                        <p className="secondary_text font-weight-bold m-0">&nbsp;0%&nbsp;</p>
                        <p className="secondary_text m-0">|</p>
                        <p className="secondary_text font-weight-bold m-0">&nbsp;0%&nbsp;</p>
                    </div>
                    <div className="col-4  d-flex flex-row justify-content-end m-0">
                        <p className="secondary_text font-weight-bold m-0">Net MW:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['load_net_mw']).toFixed(2)}</p>

                    </div>

                </div>
                <div className="row ">
                    <div className="col-4 d-flex flex-row justify-content-start m-0">
                        <p className="secondary_text font-weight-bold m-0">Net MVAR:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_net_mvar']).toFixed(2)}</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center m-0">
                    </div>
                    <div className="col-4  d-flex flex-row justify-content-end m-0">
                        <p className="secondary_text font-weight-bold m-0">Net MVAR:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['load_net_mvar']).toFixed(2)}</p>

                    </div>

                </div>
                <div className="row ">
                    <div className="col-4 d-flex flex-row justify-content-start m-0">
                    </div>
                    <div className="col-4 d-flex justify-content-center m-0">
                        <p className="secondary_text font-weight-bold m-0">Max Operating SOC:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_max_operating_soc']).toFixed(1)}</p>
                    </div>
                    <div className="col-4  d-flex flex-row justify-content-end m-0">
                    </div>

                </div>
                <div className="row ">
                    <div className="col-4 d-flex flex-row justify-content-start m-0">
                        <p className="secondary_text font-weight-bold m-0 warning_col ">HSL:&nbsp;</p>
                        <p className="secondary_text m-0 warning_col">0.0</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center m-0">
                        <p className="secondary_text font-weight-bold m-0">Min Operating SOC:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_min_operating_soc']).toFixed(1)}</p>
                    </div>
                    <div className="col-4  d-flex flex-row justify-content-end m-0">
                        <p className="secondary_text font-weight-bold m-0 warning_col">HSL:&nbsp;</p>
                        <p className="secondary_text m-0 warning_col">0.0</p>

                    </div>

                </div>
                <div className="row ">
                    <div className="col-2 d-flex flex-row justify-content-start m-0">
                        <p className="secondary_text font-weight-bold m-0">HEL:&nbsp;</p>
                        <p className="secondary_text m-0">0.0</p>
                    </div>
                    <div className="col-8 d-flex justify-content-center m-0">
                        <p className="secondary_text font-weight-bold m-0">Max Discharge Power Limit:&nbsp;</p>
                        <p className="secondary_text m-0">0.0</p>
                    </div>
                    <div className="col-2  d-flex flex-row justify-content-end m-0">
                        <p className="secondary_text font-weight-bold m-0">HEL:&nbsp;</p>
                        <p className="secondary_text m-0">0.0</p>

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
                        <p className="secondary_text m-0">0.00</p>

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
                        <p className="secondary_text m-0">0.00</p>

                    </div>

                </div>
                <div className="row ">
                    <div className="col-3 d-flex flex-row justify-content-start m-0">
                    </div>
                    <div className="col-6 d-flex justify-content-center m-0">
                        <p className="secondary_text font-weight-bold m-0">Breaker SW1:&nbsp;</p>
                        <p className="secondary_text m-0">{row['gen_sw1_status']}</p>
                    </div>
                    <div className="col-3  d-flex flex-row justify-content-end m-0">

                    </div>

                </div>
                <div className="row">
                    <div className="col-4 d-flex flex-row justify-content-start m-0 unrow_r">
                        <p className="secondary_text font-weight-bold m-0 warning_col ">SCCT Mitigation Flag:&nbsp;</p>
                        <p className="secondary_text m-0 warning_col">{row['gen_scct_flag']}</p>
                    </div>
                    <div className="col-4 d-flex justify-content-center m-0">
                        <p className="secondary_text font-weight-bold m-0">Breaker 52M:&nbsp;</p>
                        <p className="secondary_text m-0">{row['gen_52m_status']}</p>
                    </div>
                    <div className="col-4  d-flex flex-row justify-content-end m-0 unrow_l">
                        <p className="secondary_text font-weight-bold m-0 warning_col ">SCCT Mitigation Flag:&nbsp;</p>
                        <p className="secondary_text m-0 warning_col">{row['load_scct_flag']}</p>
                    </div>

                </div>
                <div className="row ">
                    <div className="col-3 d-flex flex-row justify-content-start m-0">
                    </div>
                    <div className="col-6 d-flex justify-content-center m-0">
                        <p className="secondary_text font-weight-bold m-0">Breaker Gen:&nbsp;</p>
                        <p className="secondary_text m-0">{row['gen_pseudo_switch_status']}</p>
                    </div>
                    <div className="col-3  d-flex flex-row justify-content-end m-0">

                    </div>

                </div>
                <div className="row ">
                    <div className="col-3 d-flex flex-row justify-content-start m-0">
                        <p className="secondary_text font-weight-bold m-0">Line MW:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_line_flows_mw']).toFixed(1)}</p>
                    </div>
                    <div className="col-6 d-flex justify-content-center m-0">
                        <p className="secondary_text font-weight-bold m-0 warning_col" >Breaker Load:&nbsp;</p>
                        <p className="secondary_text m-0 warning_col">{Number(row['load_pseudo_switch_status']).toFixed(1)}</p>
                    </div>
                    <div className="col-3  d-flex flex-row justify-content-end m-0">
                        <p className="secondary_text font-weight-bold m-0">Line MW:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['load_line_flows_mw']).toFixed(1)}</p>

                    </div>

                </div>
                <div className="row ">
                    <div className="col-6 d-flex flex-row justify-content-start m-0">
                        <p className="secondary_text font-weight-bold m-0">Line MVAW:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_line_flows_mvar']).toFixed(1)}</p>
                    </div>
                    <div className="col-6  d-flex flex-row justify-content-end m-0">
                        <p className="secondary_text font-weight-bold m-0">Line MVAW:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['load_line_flows_mvar']).toFixed(1)}</p>

                    </div>

                </div>
                <div className="row ">
                    <div className="col-6 d-flex flex-row justify-content-start m-0">
                        <p className="secondary_text font-weight-bold m-0">VAB Voltage:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_voltage']).toFixed(1)}</p>
                    </div>
                    <div className="col-6  d-flex flex-row justify-content-end m-0">
                        <p className="secondary_text font-weight-bold m-0">VAB Voltage:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_voltage']).toFixed(1)}</p>

                    </div>

                </div>
                {/*<div className="row ">*/}
                {/*    <div className="col-6 d-flex flex-row justify-content-start m-0">*/}
                {/*        <p className="secondary_text font-weight-bold m-0">Line MW:&nbsp;</p>*/}
                {/*        <p className="secondary_text m-0">0.0</p>*/}
                {/*    </div>*/}
                {/*    <div className="col-6  d-flex flex-row justify-content-end m-0">*/}
                {/*        <p className="secondary_text font-weight-bold m-0">Line MW:&nbsp;</p>*/}
                {/*        <p className="secondary_text m-0">0.0</p>*/}

                {/*    </div>*/}

                {/*</div>*/}
                {/*<div className="row ">*/}
                {/*    <div className="col-6 d-flex flex-row justify-content-start ">*/}
                {/*        <p className="secondary_text font-weight-bold m-0">Line MVAR:&nbsp;</p>*/}
                {/*        <p className="secondary_text m-0">0.0</p>*/}
                {/*    </div>*/}
                {/*    <div className="col-6  d-flex flex-row justify-content-end ">*/}
                {/*        <p className="secondary_text font-weight-bold ">Line MVAR:&nbsp;</p>*/}
                {/*        <p className="secondary_text m-0">0.0</p>*/}

                {/*    </div>*/}

                {/*</div>*/}
                <div className="row ">
                    <div className="col-6 d-flex flex-row justify-content-start m-0">
                        <p className="secondary_text font-weight-bold m-0">NURR:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_normal_up_ramp_rate']).toFixed(1)}</p>
                    </div>
                    <div className="col-6  d-flex flex-row justify-content-end m-0">
                        <p className="secondary_text font-weight-bold m-0">NURR:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['load_normal_up_ramp_rate']).toFixed(1)}</p>

                    </div>

                </div>
                <div className="row ">
                    <div className="col-6 d-flex flex-row justify-content-start m-0">
                        <p className="secondary_text font-weight-bold m-0">NDRR:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_normal_down_ramp_rate']).toFixed(1)}</p>
                    </div>
                    <div className="col-6  d-flex flex-row justify-content-end m-0">
                        <p className="secondary_text font-weight-bold m-0">NDRR:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['load_normal_down_ramp_rate']).toFixed(1)}</p>

                    </div>

                </div>
                <div className="row ">
                    <div className="col-6 d-flex flex-row justify-content-start m-0">
                        <p className="secondary_text font-weight-bold m-0">EURR:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_emergency_up_ramp_rate']).toFixed(1)}</p>
                    </div>
                    <div className="col-6  d-flex flex-row justify-content-end m-0">
                        <p className="secondary_text font-weight-bold m-0">EURR:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['load_emergency_up_ramp_rate']).toFixed(1)}</p>

                    </div>

                </div>
                <div className="row ">
                    <div className="col-6 d-flex flex-row justify-content-start m-0">
                        <p className="secondary_text font-weight-bold m-0">EDRR:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_emergency_down_ramp_rate']).toFixed(1)}</p>
                    </div>
                    <div className="col-6  d-flex flex-row justify-content-end m-0">
                        <p className="secondary_text font-weight-bold m-0">EDRR:&nbsp;</p>
                        <p className="secondary_text m-0">{Number(row['gen_emergency_down_ramp_rate']).toFixed(1)}</p>

                    </div>

                </div>
                {/*<div className="row ">*/}
                {/*    <div className="col-6 d-flex flex-row justify-content-start m-0">*/}
                {/*        <p className="secondary_text font-weight-bold m-0">Line MVAW:&nbsp;</p>*/}
                {/*        <p className="secondary_text m-0">0.0</p>*/}
                {/*    </div>*/}
                {/*    <div className="col-6  d-flex flex-row justify-content-end m-0">*/}
                {/*        <p className="secondary_text font-weight-bold m-0">Line MVAW:&nbsp;</p>*/}
                {/*        <p className="secondary_text m-0">0.0</p>*/}

                {/*    </div>*/}

                {/*</div>*/}
            </div>
        </div>);
}
export default CardComponent;