import React from "react";
import "./lazy-loader.styles.scss";

const LazyLoader = ({text}) => {
    return  (
        <div className="lazy__loader">
            {text && (<p className="loading__text">{text}</p>)}
            <div className="lazy__loader__center" />
        </div>
    )
}

export default LazyLoader;