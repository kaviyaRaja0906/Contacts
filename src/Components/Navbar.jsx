import React from "react";
import logo from  "../assets/logo1.png";
import side from  "../assets/side.png";
import {IoStatsChartSharp} from "react-icons/io5";
import {IoMdContacts} from "react-icons/io";
import {FiSettings} from "react-icons/fi";
import {useNavigate} from "react-router-dom";

function Navbar(){

   let navigate = useNavigate();

    return(
        <div className="Sidebar">
           <div className="sidebar-nav">
           <img src={logo} alt="logo" className="logo"/>
           <div className="menu">
              <div className="menu-item" onClick={() => navigate('/')}>
                 <IoMdContacts/>
                 <span>Contacts</span>
              </div>
              <div className="menu-item" onClick={() => navigate('/charts')}>
                 <IoStatsChartSharp/>
                 <span>Charts and Maps</span>
              </div>
              <div className="menu-item" onClick={() => navigate('/')}>
                 <FiSettings/>
                 <span>Settings</span>
              </div>
           </div>
           </div>
           <div className="learn-more">
            <h5 className="learn-h">Go PRO</h5>
            <span className="learn-p">
                upgrade to stay connected with your team while working from home
            </span>
            <button className="upgrade-btn">Upgrade Now</button>
            <img src={side} alt="" className="side-img"></img>
           </div>
        </div>
    )
}

export default Navbar;