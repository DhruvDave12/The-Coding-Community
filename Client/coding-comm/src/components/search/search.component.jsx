import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import SearchList from "../search-drop-list/search-drop-list.component";
import './search.styles.scss';

const SearchBar = () => {
    const [search, setSearch] = useState('');
    const [data, setData] = useState([]);
    const [sendArray, setArray] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const res = await axios.get('https://the-coding-community.herokuapp.com/user/all', {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            })
            setData(res.data.data);
        }

        getUsers();
    }, [])
    
    useEffect(() => {
        const dataOfUsers = [];
        // console.log("SEARCH: ", search);
        if(search.length === 0){
            setArray([]);
            return;
        }
        const searchResults = () => {
            for(let userr in data){
                let user1 = data[userr].username.toLowerCase();
                let userToSearch = search.toLowerCase();
                if(user1.includes(userToSearch)){
                    if(!sendArray.includes(data[userr])){
                        dataOfUsers.push(data[userr]);
                    }
                }
            }

            setArray(dataOfUsers);
        }
        searchResults();
    }, [search])

    return (
        <div className="search-bar">
            <input type="text" placeholder="Search" onChange={e => setSearch(e.target.value)}/>
            <Link to={'/search/results'}>Search</Link>

            {
                sendArray.length === 0 ?
                null
                :
                <SearchList listOfUsers={sendArray}/>

            }
        </div>
    )
}

export default SearchBar;