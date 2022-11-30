import React from "react";
import "./search-drop-list.styles.scss";
import { useNavigate } from "react-router";
import { Avatar, List } from "antd";

// todo -> Make a limit for mapping searched users and then create a new result page for different users
const SearchList = ({ listOfUsers }) => {
  
  return (
    <div className="search-drop-list">
      {listOfUsers.length === 0 ? (
        <p>No Users Found :(</p>
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={listOfUsers}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`/profile/${item._id}`} />}
                title={<a href={`/profile/${item._id}`}>{item.username}</a>}
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
};

export default SearchList;
