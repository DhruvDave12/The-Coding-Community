import React from "react";
import { Input } from 'antd';
import "./genericSearch.styles.scss";
const {Search} = Input;

const GenericSearch = ({ placeholder, onSearch }) => {
  return (
    <div className="search__wrapper">
        <Search
          placeholder={placeholder}
          allowClear
          onSearch={onSearch}
          className="search__bar"
        />
    </div>
  );
};

export default GenericSearch;
