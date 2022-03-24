const Question = require('../models/questions.models');
const Answer = require('../models/answers.models')

module.exports.postQuestion = async (req,res) => {

    if(!req.user){
        res.status(403).send({
            success: false,
            msg: "Please login to post the question"
        })
    }

    const { question, keywords} = req.body;
    const keyArr = keywords.split(",");
    const newQues = new Question({
        question: question,
        keywords: keyArr
    })

    newQues.owner = req.user._id
    await newQues.save();

    res.status(200).send({
        success: true,
        data: newQues
    })
}

module.exports.postAnswerToQuestion = async(req,res) => {
    if(!req.user){
        res.status(403).send({
            success: false,
            msg: "Please login to answer the question"
        })
    }
    const { questionID } = req.params;
    const ques = await Question.findById(questionID);

    const { answer } = req.body;
    const ans = new Answer({
        answer,
    })
    ans.owner = req.user._id;
    await ans.save();

    ques.answer = ans._id;
    await ques.save();

    res.status(200).send({
        success: true,
        ques
    })
}