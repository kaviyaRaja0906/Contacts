import React from "react";
import Navbar from "./Navbar";
import LineCharts from "./LineCharts";
import Map from "./Map";

function Charts(){
    return(
        <div className="home">
          <Navbar/>
          <div className="mains">
            <div className="charts">
            <LineCharts/>
            </div>
            <div className="charts">
            <Map/>
            </div>
          </div>
        </div>
    )
}

export default Charts;