import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from 'antd';
import { useNavigate } from "react-router";
import SearchList from "../search-drop-list/search-drop-list.component";
import "./search.styles.scss";
import axiosInstance from "../../services/axiosInstance";

const { Search } = Input;


const SearchBar = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [sendArray, setArray] = useState([]);

  
  useEffect(() => {
    const getUsers = async () => {
      const res = await axiosInstance.get('/user/all');
      setData(res.data.data);
    };

    getUsers();
  }, []);

  useEffect(() => {
    const dataOfUsers = [];
    if (search.length === 0) {
      setArray([]);
      return;
    }
    const searchResults = () => {
      for (let userr in data) {
        let user1 = data[userr].username.toLowerCase();
        let userToSearch = search.toLowerCase();
        if (user1.includes(userToSearch)) {
          if (!sendArray.includes(data[userr])) {
            dataOfUsers.push(data[userr]);
          }
        }
      }

      setArray(dataOfUsers);
    };
    searchResults();
  }, [search]);

  const onSearch = () => {
    navigate(`/search/results`);
  };

  return (
    <div className="search-bar">
      <div className="search-comp">
        <Search
        placeholder="Search..."
        onSearch={onSearch}
        autoComplete
        onChange={(e) => setSearch(e.target.value)}
        style={{
          display:"flex",
          justifyContent:"center",
          alignItems:"center",
          width: '100%',
          alignSelf:'center',
        }}
      />
      </div>
      {sendArray.length === 0 ? null : <SearchList listOfUsers={sendArray} />}
    </div>
  );
};

export default SearchBar;
