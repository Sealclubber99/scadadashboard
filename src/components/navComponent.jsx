//import react
import React, {Component} from "react";
//import css stylesheet
import '../ToolBar.css';
//import dropdown component library
import Dropdown from "react-dropdown";
//css for the dropdown
import 'react-dropdown/style.css'
//import clock library to have a clock in the nav
import Clock from 'react-live-clock';
//assets, used in the dropdown as all the options
const assets =[
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
]
//create functional component for the Nav component
//essentially a constructor that has methods from app (add asset, remove all, change size, and fill all)
function NavComponent({addAsset, removeAll, changeSize, fillAll}) {
        //fill assets references the app function fillall
        const fillAssets = () => {
            fillAll();
        }
        //references add asset in app
        const submitAsset = asset => {
            addAsset(asset);
        }
        //creates a new window
        function openNew(url){
            window.open(url, '_blank', 'noopener,noreferrer');
        }
        //refreshes the page
        function refresh(){
            window.location.reload();
        };
        //return the actual html info
        return(
            <div>
                <nav className="d-flex flex-row justify-content-between nav_bar">


                    <div className="d-flex flex-column justify-content-center" >
                        <ul className="navbar-nav mr-auto d-flex flex-row justify-content-start">
                            <li className="ml-2 mr-2">
                                <div className="test ">
                                    {/*dropdown for the assets, on selection it sends the value to submit asset method which references the app addasset method*/}
                                    <Dropdown options={assets} id="asset_drop"  placeholder="New ASSET" onChange={(event) => {submitAsset(event.value)}}>
                                    </Dropdown>

                                </div>

                            </li>
                            <li className="mr-2 ">
                                    {/*open new url needs to be changed to whatever url we use/ip*/}
                                    {/*references the open new method to create a new window of this page*/}
                                    <button className="button_default" id="display_btn" onClick={() => openNew('http://localhost:3000/#')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-display" viewBox="0 0 16 16">
                                        <path
                                            d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75c.167-.333.25-.833.25-1.5H2s-2 0-2-2V4zm1.398-.855a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145z"/>
                                    </svg>
                                    New Display
                                </button>

                            </li>
                            <li className="mr-2">
                                {/*references the remove all function that removes all of the cards from the main page*/}
                                <button className="button_default" id="clear_btn" onClick={() => removeAll()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-eraser-fill" viewBox="0 0 16 16">
                                        <path
                                            d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
                                    </svg>
                                    Clear

                                </button>

                            </li>
                            <li className="mr-2">
                                {/*refresh method just refreshes the page - should change to connect to the card "update" method*/}

                                <button className="button_default" id="refresh_btn" onClick={()=> refresh()}>
                                    {/*<button className="button_default" id="refresh_btn" >*/}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                              d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                        <path
                                            d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                                    </svg>
                                </button>
                            </li>
                            <li className="mr-2">
                                {/*fill asset button autopopulates the page with cards for every asset*/}
                                <button className="button_default" id="refresh_btn" onClick={()=> fillAssets()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-paint-bucket" viewBox="0 0 16 16">
                                        <path
                                            d="M6.192 2.78c-.458-.677-.927-1.248-1.35-1.643a2.972 2.972 0 0 0-.71-.515c-.217-.104-.56-.205-.882-.02-.367.213-.427.63-.43.896-.003.304.064.664.173 1.044.196.687.556 1.528 1.035 2.402L.752 8.22c-.277.277-.269.656-.218.918.055.283.187.593.36.903.348.627.92 1.361 1.626 2.068.707.707 1.441 1.278 2.068 1.626.31.173.62.305.903.36.262.05.64.059.918-.218l5.615-5.615c.118.257.092.512.05.939-.03.292-.068.665-.073 1.176v.123h.003a1 1 0 0 0 1.993 0H14v-.057a1.01 1.01 0 0 0-.004-.117c-.055-1.25-.7-2.738-1.86-3.494a4.322 4.322 0 0 0-.211-.434c-.349-.626-.92-1.36-1.627-2.067-.707-.707-1.441-1.279-2.068-1.627-.31-.172-.62-.304-.903-.36-.262-.05-.64-.058-.918.219l-.217.216zM4.16 1.867c.381.356.844.922 1.311 1.632l-.704.705c-.382-.727-.66-1.402-.813-1.938a3.283 3.283 0 0 1-.131-.673c.091.061.204.15.337.274zm.394 3.965c.54.852 1.107 1.567 1.607 2.033a.5.5 0 1 0 .682-.732c-.453-.422-1.017-1.136-1.564-2.027l1.088-1.088c.054.12.115.243.183.365.349.627.92 1.361 1.627 2.068.706.707 1.44 1.278 2.068 1.626.122.068.244.13.365.183l-4.861 4.862a.571.571 0 0 1-.068-.01c-.137-.027-.342-.104-.608-.252-.524-.292-1.186-.8-1.846-1.46-.66-.66-1.168-1.32-1.46-1.846-.147-.265-.225-.47-.251-.607a.573.573 0 0 1-.01-.068l3.048-3.047zm2.87-1.935a2.44 2.44 0 0 1-.241-.561c.135.033.324.11.562.241.524.292 1.186.8 1.846 1.46.45.45.83.901 1.118 1.31a3.497 3.497 0 0 0-1.066.091 11.27 11.27 0 0 1-.76-.694c-.66-.66-1.167-1.322-1.458-1.847z"/>
                                    </svg>
                                </button>
                            </li>
                            <li >
                                <label className="switch mr-2">
                                    {/*changes size toggles on and off - large and small default small*/}
                                    <input type="checkbox" onClick={(event) => changeSize()}/>
                                    <span className="slider round"></span>
                                </label>
                            </li>
                            <li>
                                {/*this is not connected to anything yet, waiting for dark mode color scale from Jess*/}
                                <label className="switch ">
                                    <input type="checkbox"/>
                                    <span className="slider round"></span>
                                </label>
                            </li>

                        </ul>
                    </div>
                    <div>
                        {/*clock object, just tells the time as part of the nav bar*/}
                        <Clock className="clock" format={"HH:mm:ss"} ticking={true} timezone={'US/Central'}></Clock>
                    </div>
                </nav>
            </div>
        );
}
export default NavComponent;