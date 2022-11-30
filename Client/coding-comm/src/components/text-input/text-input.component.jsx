import React from "react";
import { Input } from "antd";
const TextInput = ({placeholder, type, setChange}) => {
  return (
    <Input
      placeholder={placeholder}
      onChange={(e) => setChange(e.target.value)}
      type={type}
    />
  );
};

export default TextInput;
