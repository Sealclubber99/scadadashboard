
import './Cards.css';
import closed from './closed.png';
import open from './open.png';
import ChargeBar from './ChargeBar'
function Cards(props) {
    function make_visible(e){

    }
    return (
        <div className="card p-3 pb-0 ">
            <div className="top_card row d-flex flex-row justify-content-around">
                <div className="col-8 ">
                    <div className="row">
                        <div className="col-5 d-flex flex-column vpn">
                            <div className="row d-flex flex-row">
                                <div className="col-12 d-flex flex-row">
                                    <img id="vpn_icon" className="light_indicator vpn" alt="err"  src={closed}/>
                                    <p className="secondary_text vpn m-0">VPN: ON_LINE</p>
                                </div>
                            </div>
                            <div className="row p-0 m-0 d-flex flex-row ">
                                <div className="col-6 d-flex flex-row">
                                    <p className="fuse_text rtu p-0 m-0">RTU:&nbsp;</p>
                                    <p className="fuse_text rtu p-0 m-0">ON&nbsp;</p>
                                </div>
                                <div className="col-6 d-flex flex-row">

                                    <p className="fuse_text rtu p-0 m-0">DNP3:&nbsp;</p>
                                    <p className="fuse_text rtu p-0 m-0">YES</p>
                                </div>

                            </div>
                        </div>
                        <div className="col-3 d-flex flex-row p-0">
                            <img id="avr_icon" className="light_indicator" alt="err" src={open}/>
                            <p className="secondary_text">AVR: ON</p>
                        </div>
                        <div className="col-4 d-flex flex-row align-items-start">
                                <div className="col-3 d-flex flex-column" id="sw1_icon">
                                    <div className="row">
                                        <img  className="light_indicator" alt="err" src={closed}/>
                                    </div>
                                    <div className="row">
                                        <p className='fuse_text m-0' id="sw1">SW1</p>
                                    </div>
                                </div>
                                <div className="col-3 d-flex flex-column" id="ftm_icon">
                                    <div className="row">
                                        <img  className="light_indicator" alt="err" src={closed}/>
                                    </div>
                                    <div className="row">
                                        <p className='fuse_text m-0' id="ftm">52M</p>
                                    </div>
                                </div>
                                <div className="col-3 d-flex flex-column" id="gen_icon">
                                    <div className="row">
                                        <img  className="light_indicator" alt="err" src={closed}/>
                                    </div>
                                    <div className="row">
                                        <p className='fuse_text m-0' id="gen">GEN</p>
                                    </div>
                                </div>
                                <div className="col-3 d-flex flex-column" id="load_icon">
                                    <div className="row">
                                        <img  className="light_indicator" alt="err" src={closed}/>
                                    </div>
                                    <div className="row">
                                        <p className='fuse_text m-0' id="ld">LOAD</p>
                                    </div>
                                </div>

                                {/*<div className="col-3 d-flex align-items-start">*/}
                                {/*    <img id="52m_icon" className="light_indicator" alt="err"  src={closed}/>*/}
                                {/*</div>*/}
                                {/*<div className="col-3 d-flex align-items-start">*/}
                                {/*    <img id="gen_icon" className="light_indicator" alt="err" src={closed}/>*/}
                                {/*</div>*/}
                                {/*<div className="col-3 d-flex align-items-start">*/}
                                {/*    <img id="load_icon" className="light_indicator" alt="err" src={open}/>*/}
                                {/*</div>*/}
                            </div>


                    </div>
                    {/*<div className="row">*/}
                    {/*    <div className="col-5 d-flex flex-row">*/}
                    {/*        <p className="secondary_text rtu">RTU:&nbsp;</p>*/}
                    {/*        /!*<p className="secondary_text ">ON&nbsp;</p>*!/*/}
                    {/*        /!*<p className="secondary_text ">DNP3:&nbsp;</p>*!/*/}
                    {/*        /!*<p className="secondary_text ">YES:&nbsp;</p>*!/*/}
                    {/*    </div>*/}
                    {/*    <script>*/}
                    {/*        */}
                    {/*    </script>*/}

                    {/*    <div className="col-4 d-flex flex-row">*/}
                    {/*    </div>*/}
                    {/*    <div className="col-3 d-flex flex-row align-items-start">*/}
                    {/*        <div className="col-3 d-flex align-items-start">*/}
                    {/*        </div>*/}
                    {/*        <div className="col-3 d-flex align-items-start">*/}
                    {/*        </div>*/}
                    {/*        <div className="col-3 d-flex align-items-start">*/}
                    {/*        </div>*/}
                    {/*        <div className="col-3 d-flex align-items-start">*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <div className="row">
                        <p className="asset_names primary_text">{props.asset}</p>
                    </div>
                </div>




            <div className="col-4 d-flex flex-column align-items-end">
                <div className="row ">
                    <p className="primary_text price m-0">$0000.00</p>
                </div>
                <div className="col-10 d-flex flex-row justify-content-end">
                    <div className="row ">
                        <p className="price primary_text m-0">000.00</p>
                    </div>
                </div>
            </div>
        </div>
          <div className="bottom_card m-0">
              <div className="row">
                  <div className="col-4 d-flex flex-column">
                      <div className="row d-flex flex-row justify-content-between">
                          <div className="col-6">
                              <p className="nmw p-0 m-0">0.0</p>
                          </div>
                          <div className="col-6 d-flex flex-column justify-content-end align-items-start m-0 p-0">
                              <p className="secondary_text pb-1 m-0 ">BP</p>
                          </div>

                      </div>
                      <div className="row d-flex flex-row justify-content-between">
                          <div className="col-6">
                              <p className="nmw p-0 m-0">0.0</p>
                          </div>
                          <div className="col-6 d-flex flex-column justify-content-end align-items-start m-0 p-0">
                              <p className="secondary_text pb-1 m-0 ">NMW</p>
                          </div>


                      </div>
                      <div className="row d-flex flex-row justify-content-between">
                          <div className="col-6 d-flex flex-row justify-content-start">
                              <p className="reg_text  p-0 m-0">0.0</p>
                              <p className="secondary_text p-0 m-0">/0.0</p>
                          </div>
                          <div className="col-6 d-flex flex-row justify-content-start p-0">
                              <p className="secondary_text p-0 m-0">REG. DOWN</p>
                          </div>


                      </div>
                      <div className="row d-flex flex-row justify-content-between">

                          <div className="col-6 d-flex flex-row justify-content-start">
                              <p className="reg_text  p-0 m-0">0.0</p>
                              <p className="secondary_text p-0 m-0">/0.0</p>
                          </div>
                          <div className="col-6 d-flex flex-row justify-content-start p-0 m-0">
                              <p className="secondary_text p-0 m-0">REG. UP</p>
                          </div>

                      </div>
                      <div className="row d-flex flex-row justify-content-between">
                          <div className="col-6 d-flex flex-row justify-content-start">
                              <p className="reg_text  p-0 m-0">0.0</p>
                              <p className="secondary_text p-0 m-0">/0.0</p>
                          </div>
                          <div className="col-6 d-flex flex-row justify-content-start p-0">
                              <p className="secondary_text">RRS</p>
                          </div>


                      </div>

                  </div>
                  <div className="col-4">
                      <div className="row">
                        <ChargeBar/>
                      </div>
                      <div className="row d-flex flex-row justify-content-center pb-3">
                          <div className="col-4 d-flex flex-row justify-content-start">
                              <div className="udbp">
                                  <p className="secondary_text p-0 m-0">0.0</p>
                              </div>
                          </div>
                          <div className="col-4 d-flex flex-row justify-content-center">
                              <p className="reg_text p-0 m-0">UDBP</p>

                          </div>
                          <div className="col-4 d-flex flex-row justify-content-end">
                              <div className="udbp">
                                  <p className="secondary_text p-0 m-0">0.0</p>
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
                              <p className="nmw p-0 m-0">0.0</p>
                          </div>

                      </div>
                      <div className="row d-flex flex-row justify-content-between">
                          <div className="col-6 d-flex flex-column justify-content-end align-items-end m-0 p-0">
                              <p className="secondary_text pb-1 m-0 ">NMW</p>
                          </div>
                          <div className="col-6 d-flex flex-row justify-content-end">
                              <p className="nmw p-0 m-0 ">0.0</p>
                          </div>



                      </div>
                      <div className="row d-flex flex-row justify-content-between">
                          <div className="col-6 d-flex flex-row justify-content-end p-0">
                              <p className="secondary_text p-0 m-0">REG. DOWN</p>
                          </div>
                          <div className="col-6 d-flex flex-row justify-content-end">
                              <p className="reg_text  p-0 m-0">0.0</p>
                              <p className="secondary_text p-0 m-0">/0.0</p>
                          </div>



                      </div>
                      <div className="row d-flex flex-row justify-content-between">
                          <div className="col-6 d-flex flex-row justify-content-end p-0 m-0">
                              <p className="secondary_text p-0 m-0">REG. UP</p>
                          </div>
                          <div className="col-6 d-flex flex-row justify-content-end">
                              <p className="reg_text  p-0 m-0">0.0</p>
                              <p className="secondary_text p-0 m-0">/0.0</p>
                          </div>


                      </div>
                      <div className="row d-flex flex-row justify-content-between">
                          <div className="col-6 d-flex flex-row justify-content-end p-0">
                              <p className="secondary_text">RRS</p>
                          </div>
                          <div className="col-6 d-flex flex-row justify-content-end">
                              <p className="reg_text">0.0</p>
                              <p className="secondary_text">/0.0</p>
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
                          <p className="nmw">0.0 | 0.0</p>
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
                      <p className="secondary_text m-0">0/Status Code</p>
                  </div>
                  <div className="col-4 d-flex justify-content-center m-0">
                      <p className="secondary_text font-weight-bold m-0">Frequency:&nbsp;</p>
                      <p className="secondary_text m-0">00.00</p>
                  </div>
                  <div className="col-4  d-flex flex-row justify-content-end m-0">
                      <p className="secondary_text font-weight-bold m-0">Status:&nbsp;</p>
                      <p className="secondary_text m-0">0/Status Code</p>

                  </div>

              </div>
              <div className="row ">
                  <div className="col-4 d-flex flex-row justify-content-start m-0">
                      <p className="secondary_text font-weight-bold m-0">Basepoint:&nbsp;</p>
                      <p className="secondary_text m-0">0.00</p>
                  </div>
                  <div className="col-4 d-flex justify-content-center m-0">
                      <p className="secondary_text font-weight-bold m-0">SOC:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>
                  </div>
                  <div className="col-4  d-flex flex-row justify-content-end m-0">
                      <p className="secondary_text font-weight-bold m-0">Basepoint:&nbsp;</p>
                      <p className="secondary_text m-0">0.00</p>

                  </div>

              </div>
              <div className="row ">
                  <div className="col-4 d-flex flex-row justify-content-start m-0">
                      <p className="secondary_text font-weight-bold m-0">UDBP:&nbsp;</p>
                      <p className="secondary_text m-0">0.00</p>
                  </div>
                  <div className="col-4 d-flex justify-content-center m-0">
                  </div>
                  <div className="col-4  d-flex flex-row justify-content-end m-0">
                      <p className="secondary_text font-weight-bold m-0">UDBP:&nbsp;</p>
                      <p className="secondary_text m-0">0.00</p>

                  </div>

              </div>
              <div className="row ">
                  <div className="col-4 d-flex flex-row justify-content-start m-0">
                      <p className="secondary_text font-weight-bold m-0">Net MW:&nbsp;</p>
                      <p className="secondary_text m-0">0.00</p>
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
                      <p className="secondary_text m-0">0.00</p>

                  </div>

              </div>
              <div className="row ">
                  <div className="col-4 d-flex flex-row justify-content-start m-0">
                      <p className="secondary_text font-weight-bold m-0">Net MVAR:&nbsp;</p>
                      <p className="secondary_text m-0">0.00</p>
                  </div>
                  <div className="col-4 d-flex justify-content-center m-0">
                  </div>
                  <div className="col-4  d-flex flex-row justify-content-end m-0">
                      <p className="secondary_text font-weight-bold m-0">Net MVAR:&nbsp;</p>
                      <p className="secondary_text m-0">0.00</p>

                  </div>

              </div>
              <div className="row ">
                  <div className="col-4 d-flex flex-row justify-content-start m-0">
                  </div>
                  <div className="col-4 d-flex justify-content-center m-0">
                      <p className="secondary_text font-weight-bold m-0">Max Operating SOC:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>
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
                      <p className="secondary_text m-0">0.0</p>
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
                      <p className="secondary_text m-0">CLOSED</p>
                  </div>
                  <div className="col-3  d-flex flex-row justify-content-end m-0">

                  </div>

              </div>
              <div className="row">
                  <div className="col-4 d-flex flex-row justify-content-start m-0 unrow_r">
                      <p className="secondary_text font-weight-bold m-0 warning_col ">SCCT Mitigation Flag:&nbsp;</p>
                      <p className="secondary_text m-0 warning_col">ON</p>
                  </div>
                  <div className="col-4 d-flex justify-content-center m-0">
                      <p className="secondary_text font-weight-bold m-0">Breaker 52M:&nbsp;</p>
                      <p className="secondary_text m-0">CLOSED</p>
                  </div>
                  <div className="col-4  d-flex flex-row justify-content-end m-0 unrow_l">
                      <p className="secondary_text font-weight-bold m-0 warning_col ">SCCT Mitigation Flag:&nbsp;</p>
                      <p className="secondary_text m-0 warning_col">ON</p>
                  </div>

              </div>
              <div className="row ">
                  <div className="col-3 d-flex flex-row justify-content-start m-0">
                  </div>
                  <div className="col-6 d-flex justify-content-center m-0">
                      <p className="secondary_text font-weight-bold m-0">Breaker Gen:&nbsp;</p>
                      <p className="secondary_text m-0">CLOSED</p>
                  </div>
                  <div className="col-3  d-flex flex-row justify-content-end m-0">

                  </div>

              </div>
              <div className="row ">
                  <div className="col-3 d-flex flex-row justify-content-start m-0">
                      <p className="secondary_text font-weight-bold m-0">Line MW:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>
                  </div>
                  <div className="col-6 d-flex justify-content-center m-0">
                      <p className="secondary_text font-weight-bold m-0 warning_col" >Breaker Load:&nbsp;</p>
                      <p className="secondary_text m-0 warning_col">OPEN</p>
                  </div>
                  <div className="col-3  d-flex flex-row justify-content-end m-0">
                      <p className="secondary_text font-weight-bold m-0">Line MW:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>

                  </div>

              </div>
              <div className="row ">
                  <div className="col-6 d-flex flex-row justify-content-start m-0">
                      <p className="secondary_text font-weight-bold m-0">Line MVAW:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>
                  </div>
                  <div className="col-6  d-flex flex-row justify-content-end m-0">
                      <p className="secondary_text font-weight-bold m-0">Line MVAW:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>

                  </div>

              </div>
              <div className="row ">
                  <div className="col-6 d-flex flex-row justify-content-start m-0">
                      <p className="secondary_text font-weight-bold m-0">VAB Voltage:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>
                  </div>
                  <div className="col-6  d-flex flex-row justify-content-end m-0">
                      <p className="secondary_text font-weight-bold m-0">VAB Voltage:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>

                  </div>

              </div>
              <div className="row ">
                  <div className="col-6 d-flex flex-row justify-content-start m-0">
                      <p className="secondary_text font-weight-bold m-0">Line MW:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>
                  </div>
                  <div className="col-6  d-flex flex-row justify-content-end m-0">
                      <p className="secondary_text font-weight-bold m-0">Line MW:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>

                  </div>

              </div>
              <div className="row ">
                  <div className="col-6 d-flex flex-row justify-content-start ">
                      <p className="secondary_text font-weight-bold m-0">Line MVAR:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>
                  </div>
                  <div className="col-6  d-flex flex-row justify-content-end ">
                      <p className="secondary_text font-weight-bold ">Line MVAR:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>

                  </div>

              </div>
              <div className="row ">
                  <div className="col-6 d-flex flex-row justify-content-start m-0">
                      <p className="secondary_text font-weight-bold m-0">NURR:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>
                  </div>
                  <div className="col-6  d-flex flex-row justify-content-end m-0">
                      <p className="secondary_text font-weight-bold m-0">NURR:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>

                  </div>

              </div>
              <div className="row ">
                  <div className="col-6 d-flex flex-row justify-content-start m-0">
                      <p className="secondary_text font-weight-bold m-0">NDRR:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>
                  </div>
                  <div className="col-6  d-flex flex-row justify-content-end m-0">
                      <p className="secondary_text font-weight-bold m-0">NDRR:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>

                  </div>

              </div>
              <div className="row ">
                  <div className="col-6 d-flex flex-row justify-content-start m-0">
                      <p className="secondary_text font-weight-bold m-0">EURR:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>
                  </div>
                  <div className="col-6  d-flex flex-row justify-content-end m-0">
                      <p className="secondary_text font-weight-bold m-0">EURR:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>

                  </div>

              </div>
              <div className="row ">
                  <div className="col-6 d-flex flex-row justify-content-start m-0">
                      <p className="secondary_text font-weight-bold m-0">EDRR:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>
                  </div>
                  <div className="col-6  d-flex flex-row justify-content-end m-0">
                      <p className="secondary_text font-weight-bold m-0">EDRR:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>

                  </div>

              </div>
              <div className="row ">
                  <div className="col-6 d-flex flex-row justify-content-start m-0">
                      <p className="secondary_text font-weight-bold m-0">Line MVAW:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>
                  </div>
                  <div className="col-6  d-flex flex-row justify-content-end m-0">
                      <p className="secondary_text font-weight-bold m-0">Line MVAW:&nbsp;</p>
                      <p className="secondary_text m-0">0.0</p>

                  </div>

              </div>
          </div>
        </div>
    );
}

export default Cards;

