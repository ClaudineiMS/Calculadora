import React from "react";
import '../css/display.css';

export const Display = (props) => {
    return(
        <div className="display">{props.value}</div>
    );
}