import React from "react";
import "./customLandingButton.styles.scss";

const CustomLandingButton = ({title, onClick}) => {
    return (
        <div className="custom__landing__button" onClick={onClick}>
            {title}
        </div>
    )
}

export default CustomLandingButton;