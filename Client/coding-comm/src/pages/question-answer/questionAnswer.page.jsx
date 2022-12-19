import React, { useContext, useEffect, useState } from "react";
import "./questionAnswer.styles.scss";
import CustomLandingButton from "../../components/button/customLandingButton.component";
import LazyLoader from "../../components/lazy-loader/lazy-loader.component";
import { QuestionContext } from "../../context/question.context";
import { Modal } from "antd";
import AskQuestionModal from "../../components/ask-question-modal/askQuestionModal.component";
import QuestionCard from "../../components/question-card/questionCard.component";
import GenericSearch from "../../components/generic-search/genericSearch.component";
import ParticularQuestionModal from "../../components/particular-question-modal/particularQuestionModal.component";

const QuestionAnswer = () => {
  const {
    questions,
    loading,
    getQuestions,
    askAQuestion,
    answerAQuestion,
    diffLoading,
    questionToRender,
    setQuestionToRender,
  } = useContext(QuestionContext);

  const [openQuestionModal, setOpenQuestionModal] = useState(false);
  const [openParticularQuestionModal, setOpenParticularQuestionModal] = useState(false);
  const [questionObj, setQuestionObj] = useState();
  const [particularQuestion, setParticularQuestion] = useState();
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    const bootstrap = async () => {
      await getQuestions();
    };
    bootstrap();
  }, [diffLoading]);

  const showQuestionModal = () => {
    setOpenQuestionModal(true);
  };

  const showParticularQuestionModal = (question) => {
    setParticularQuestion(question);
    setOpenParticularQuestionModal(true);
  };

  const handleAskQuestion = async () => {
    await askAQuestion(questionObj);
    setOpenQuestionModal(false);
  };

  const handleSearch = (searchText) => {
    setQuestionToRender(
      questions.filter((ques) => ques.keywords.includes(searchText))
    );
  };

  return !loading && questions && !diffLoading && questionToRender ? (
    <div className="question__page">
      <div className="question__page__wrapper">
        <div className="question__header">
          <p className="question__page__title">Ask your Queries</p>
          <div className="button__wrapper">
            <CustomLandingButton
              onClick={showQuestionModal}
              title={"Ask Question"}
            />
          </div>
        </div>

        <div className="search__bar">
          <div className="search__wrapper">
            <GenericSearch
              placeholder={"Search Questions..."}
              onSearch={handleSearch}
            />
          </div>
        </div>
        {questionToRender.length > 0 ? (
          <div className="question__grid">
            {questionToRender.map((ques) => (
              <QuestionCard
                questionO={ques}
                loading={loading}
                onClick={() => showParticularQuestionModal(ques)}
              />
            ))}
          </div>
        ) : (
          <p>No questions</p>
        )}
      </div>

      <Modal
        visible={openQuestionModal}
        onCancel={() => setOpenQuestionModal(false)}
        confirmLoading={loading}
        onOk={handleAskQuestion}
      >
        <AskQuestionModal setQuestionObj={setQuestionObj} />
      </Modal>
      <ParticularQuestionModal
        confirmLoading={diffLoading}
        handleCancel={() => {setOpenParticularQuestionModal(false)}}
        handleOk={() => {
            answerAQuestion({questionID: particularQuestion._id, answer: answer});
            setOpenParticularQuestionModal(false);
        }}
        open={openParticularQuestionModal}
        question={particularQuestion}
        setAnswer={setAnswer}
      />
    </div>
  ) : (
    <LazyLoader />
  );
};

export default QuestionAnswer;
