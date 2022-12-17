import React from "react";
import "./footer.styles.scss";

const Footer = () => {
    return (
        <footer className="footer__main">
            <div className="footer__left__container">
                Made with ❤️ by Dhruv Dave
            </div>
            <div className="divider"/>
            <div className="more__links">
                <div className="more__links__inner__wrapper">
                        <li>
                            <a href="https://github.com/DhruvDave12/">Github</a>
                        </li>
                        <li className="dot"/> 
                        <li>
                            <a href="#">LinkedIn</a>
                        </li>
                </div>
            </div>
        </footer>
    )
}

export default Footer;