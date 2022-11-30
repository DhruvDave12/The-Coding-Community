import React from "react";
import "./profile-section.styles.scss";

const ProfileSection = ({children,header}) => {
    return (
        <div className="profile__section">
            <div className="profile__section__header">
                <p className="profile__section__header__title">{header}</p>
            </div>
            <div className="profile__section__divider"/>
            <div className="profile__section__content">
                {children}
            </div>
        </div>
    )
}

export default ProfileSection;