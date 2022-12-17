import React from "react";
import {getGoogleOAuthURL} from "../../utils/google.util";
import GoogleIcon from "../../assets/images/google.svg";
import "./googleButton.styles.scss";

const GoogleButton = () => {
    return (
        <a href={getGoogleOAuthURL()}>
            <div className="google__button">
                <div className="google__button__wrapper">
                    <div className="google__button__icon">
                        <img src={GoogleIcon} alt="Google Icon"/>
                    </div>
                    <div className="google__button__text">
                        Sign in with Google
                    </div>
                </div>
            </div>
        </a>
    )
}

export default GoogleButton;