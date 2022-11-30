import React from "react";
import "./profile-right-section.styles.scss";
const ProfileRightSection = ({header, children}) => {
    return (
        <div className="profile__right">
            <div className="profile__right__header">
                <p className="profile__right__header__title">{header}</p>
            </div>
            {children}
        </div>
    )
}

export default ProfileRightSection;