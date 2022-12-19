import React from "react";
import { Typography, Divider} from "antd";
const { Title } = Typography;


const Answer = ({ answer, author }) => {
  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column"}}> 
      <p style={{fontSize:'1rem', fontWeight:'400'}}>{author}</p>
      <Title level={4} style={{fontWeight: '300'}}>{answer.answer}</Title>
      <Divider />
    </div>
  );
};

export default Answer;