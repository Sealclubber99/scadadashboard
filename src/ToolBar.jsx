import './ToolBar.css';
import Dropdown from "react-dropdown";
import 'react-dropdown/style.css'

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
    'Odessa'
]
function ToolBar(){
    const openNew = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    const refresh = () => {
        window.location.reload();
    };

    return(
      <div>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">


              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav mr-auto">
                      <li className="nav-item dropdown button_default">
                          <Dropdown options={assets}   placeholder="New ASSET">
                              {/*<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"*/}
                              {/*     className="bi bi-plus-lg" viewBox="0 0 16 16">*/}
                              {/*    <path fill-rule="evenodd"*/}
                              {/*          d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>*/}
                              {/*</svg>*/}

                          </Dropdown>
                      </li>
                      <li className="nav-item active">
                          <button className="button_default" onClick={() => openNew('http://localhost:3000/#')}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                   className="bi bi-display" viewBox="0 0 16 16">
                                  <path
                                      d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4c0 .667.083 1.167.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75c.167-.333.25-.833.25-1.5H2s-2 0-2-2V4zm1.398-.855a.758.758 0 0 0-.254.302A1.46 1.46 0 0 0 1 4.01V10c0 .325.078.502.145.602.07.105.17.188.302.254a1.464 1.464 0 0 0 .538.143L2.01 11H14c.325 0 .502-.078.602-.145a.758.758 0 0 0 .254-.302 1.464 1.464 0 0 0 .143-.538L15 9.99V4c0-.325-.078-.502-.145-.602a.757.757 0 0 0-.302-.254A1.46 1.46 0 0 0 13.99 3H2c-.325 0-.502.078-.602.145z"/>
                              </svg>
                              New Display
                          </button>

                      </li>
                      <li className="nav-item">
                          <button className="button_default">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                   className="bi bi-eraser-fill" viewBox="0 0 16 16">
                                  <path
                                      d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm.66 11.34L3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z"/>
                              </svg>
                              Clear

                          </button>

                      </li>
                      <li className="nav-item">

                          <button className="button_default" onClick={refresh}>
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                   className="bi bi-arrow-clockwise" viewBox="0 0 16 16">
                                  <path fill-rule="evenodd"
                                        d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
                                  <path
                                      d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
                              </svg>
                          </button>
                      </li>
                  </ul>
              </div>
          </nav>
      </div>

    );
}
export default ToolBar;