import React from "react";
import { Modal, Typography, Input, Divider } from "antd";
import Answer from "../answer/answer.component";
import "./particularQuestionModal.styles.scss";
const { Title } = Typography;
const { TextArea } = Input;

const ParticularQuestionModal = ({
  open,
  handleOk,
  confirmLoading,
  handleCancel,
  question,
  setAnswer,
}) => {
    if(!question) return null;
  const title = `#${question?._id.slice(5, 20).toUpperCase()}`;
  return (
    <>
      <Modal
        title={title}
        visible={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText={"Submit Answer"}
      >
         <Title level={4} style={{ textAlign: "center", margin: 0 }}>
          {question.question}
        </Title>
        <Divider />

       <div className="answer__wrapper">
          {question.answer.map((answer) => {
            return <Answer answer={answer} author={answer.owner.username} />;
          })}
        </div>

        <div className="own__answer">
          <TextArea
            rows={4}
            placeholder={"Type your answer here ..."}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default ParticularQuestionModal;
