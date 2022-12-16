import React from "react";
import "./footer.styles.scss";

const Footer = () => {
    return (
        <footer className="footer__main">
            <div className="footer__left__container">
                Made with ❤️ by Dhruv Dave
            </div>
            <div className="more__links">
                <p className="more__links__text">More Links</p>
                <ul className="more__links__inner__wrapper">
                        <li>
                            <a href="https://github.com/DhruvDave12/">Github</a>
                        </li>
                        <li>
                            <a href="#">LinkedIn</a>
                        </li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;