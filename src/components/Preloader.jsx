import preload from "../assets/img/VAyR.gif";
import React from "react";


export let Preloader = (props) => {
    return(
        <div>
            <img src={preload} alt="Preload Image"/>
        </div>
    );
}