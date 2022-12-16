import React from "react";
import "./newCustomButton.styles.scss";
const CustomNewButton = ({title, onClick}) => {
    return (
        <div className="new__custom" onClick={onClick}>
            <div className="new__custom__title">{title}</div>
        </div>
    )
}

export default CustomNewButton;