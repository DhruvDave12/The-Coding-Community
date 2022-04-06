import React from "react";
import './search-drop-list.styles.scss';

const SearchList = ({listOfUsers}) => {

    return (
        <div className="search-drop-list">
            {
                listOfUsers.length === 0 ? 
                <p>No Users Found :(</p>
                :
                listOfUsers.map(user => (
                    <div className="search-user">
                        {
                            user.username
                        }
                    </div>
                ))
            }
        </div>
    )
}

export default SearchList;