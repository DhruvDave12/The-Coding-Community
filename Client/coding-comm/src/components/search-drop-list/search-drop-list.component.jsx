import React from "react";
import "./search-drop-list.styles.scss";
import { useNavigate } from "react-router";
const SearchList = ({ listOfUsers }) => {
    const navigate = useNavigate();

    const handleClick = (id) =>{
        navigate(`/profile/${id}`);
        window.location.reload(false);
    }
  return (
    <div className="search-drop-list">
      {listOfUsers.length === 0 ? (
        <p>No Users Found :(</p>
      ) : (
        listOfUsers.map((user) => (
          <div className="search-user" onClick={() => {handleClick(user._id)}}>
            {user.username}
          </div>
        ))
      )}
    </div>
  );
};

export default SearchList;
