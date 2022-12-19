import React from "react";
import { Card, Skeleton, Tag, Divider } from "antd";
const { Meta } = Card;

const QuestionCard = ({ questionO, loading, onClick}) => {
    const {keywords, question, owner} = questionO;
  return (
    <div className="custom__card" onClick={onClick}>
      <Card style={{ width: "100%" }}>
        <Skeleton loading={loading} avatar active>
          <Meta title={question} description={`By ${owner.username}`}/>
          <Divider />
          <div className="tags__grid">
            {keywords.map((tag) => {
              return <Tag color="geekblue">{tag}</Tag>;
            })}
          </div>
        </Skeleton>
      </Card>
    </div>
  );
};

export default QuestionCard;
