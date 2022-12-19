import React from "react";
import axiosInstance from "../services/axiosInstance";

export const QuestionContext = React.createContext();

const QuestionProvider = ({children}) => {
    const [questions, setQuestions] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [diffLoading, setDiffLoading] = React.useState(false);
    const [questionToRender, setQuestionToRender] = React.useState(null);

    const getQuestions = async () => {
        try {
            setLoading(true);
            const res = await axiosInstance.get('/get-ques');
            setQuestions(res.data.data);
            setQuestionToRender(res.data.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log("ERROR IN QUESTION: ", err);
        }
    }

    const askAQuestion = async (questionObj) => {
        try {   
            setDiffLoading(true);
            const {question, keywords} = questionObj;
            const res = await axiosInstance.post('/ask-ques', {question, keywords});
            console.log("ASKED QUESTION: ", res.data.data);
            setDiffLoading(false);
        } catch (err) {
            setDiffLoading(false);
            console.log("ERROR IN ASKING QUESTION: ", err);
        }
    }

    const answerAQuestion = async (answerObj) => {
        try {
            setDiffLoading(true);
            const {questionID, answer} = answerObj;
            const res = await axiosInstance.post(`/ans-ques/${questionID}`, {answer});
            console.log("ANSWERED QUESTION: ", res.data.data);
            setDiffLoading(false);
        } catch (err) {
            setDiffLoading(false);
            console.log("ERROR IN ANSWERING QUESTION: ", err);
        }
    }
    return (
        <QuestionContext.Provider value={{
            questions,
            loading,
            getQuestions,
            askAQuestion,
            answerAQuestion,
            diffLoading,
            questionToRender,
            setQuestionToRender
        }}>
            {children}
        </QuestionContext.Provider>
    )
}

export default QuestionProvider;