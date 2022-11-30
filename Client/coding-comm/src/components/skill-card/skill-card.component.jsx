import React from "react";
import { Tag } from 'antd';

const SkillCard = ({skill}) => {
    return (
        <Tag color="cyan" style={{width: '100%'}}>{skill}</Tag>
    )
}

export default SkillCard;
