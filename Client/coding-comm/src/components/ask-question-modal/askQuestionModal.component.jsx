import React from "react";
import "./askQuestionModal.styles.scss";
import { Input } from "antd";

const AskQuestionModal = ({ setQuestionObj }) => {
  return (
    <div className="ask__question__modal">
      <div className="ask__question__modal__header">
        <p className="ask__question__modal__title">Ask your Queries</p>
      </div>
      <div className="ask__question__modal__body">
        <div style={{marginBottom: "1rem"}}>
          <Input.TextArea
            placeholder="Ask your question here"
            onChange={(e) => {
              setQuestionObj((prev) => ({
                ...prev,
                question: e.target.value,
              }));
            }}
          />
        </div>

        <Input
          placeholder="Enter keywords. Eg. React, Redux, Node"
          onChange={(e) => {
            setQuestionObj((prev) => ({
              ...prev,
              keywords: e.target.value,
            }));
          }}
        />
      </div>
    </div>
  );
};

export default AskQuestionModal;
