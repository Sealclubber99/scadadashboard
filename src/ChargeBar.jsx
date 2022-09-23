import './bar.css';

function ChargeBar() {
    return(
        <div className="container">
            <div className="row d-flex flex-row justify-content-center">
                <div className="col-5 d-flex flex-column justify-content-center align-items-end p-0">

                    <div className="bar_left mb-1 main">
                    </div>
                    <div className="bar_left genudbp">
                    </div>

                    {/*<div className="vertical_line"></div>*/}

                </div>
                <div className="vertical_line p-0"></div>
                <div className="col-5 d-flex flex-column justify-content-center align-items-start p-0">
                    {/*<div className="vertical_line"></div>*/}

                    <div className="bar_right mb-1 charging">
                    </div>
                    <div className="bar_right loadudbp">
                    </div>


                </div>

            </div>
        </div>


    );

}
export default ChargeBar;