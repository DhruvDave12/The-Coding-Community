import React from "react";
import { Button } from 'antd';
const CustomButton = ({title, handleClick}) => {
    return (
        <Button type="primary" onClick={handleClick}>{title}</Button>
    )
}

export default CustomButton;