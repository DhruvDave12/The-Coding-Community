const MoreData = require('../models/moreUserData.models');
const Question = require('../models/questions.models');
const Answer = require('../models/answers.models')

module.exports.postQuestion = async (req,res) => {

    if(!req.user){
        return res.status(403).send({
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

    // increasing 5 points on asking a question
    // const moreData = await MoreData.findOne({owner: req.user._id});
    // moreData.level = moreData.level + 5;
    // await moreData.save();
    res.status(200).send({
        success: true,
        data: newQues
    })
}

module.exports.postAnswerToQuestion = async(req,res) => {
    if(!req.user){
        return res.status(403).send({
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

    ques.answer.push(ans._id);
    await ques.save();

    // 20 points on solving a question
    // const moreData = await MoreData.findOne({owner: req.user._id});
    // moreData.level = moreData.level + 20;
    // await moreData.save();

    res.status(200).send({
        success: true,
        data: ques
    })
}

module.exports.getQuestions = async (req,res) => {
    try {
        const questions = await Question.find().populate('owner').populate({
            path: 'answer',
            populate: 'owner'
        });
        res.status(200).send({
            success: true,
            data: questions
        })
    } catch (err) {
        console.log("ERROR IN QUESTION: ", err);
    }
}

module.exports.getQuestionsAnswer = async (req,res) => {
    try {
        if(!req.user) {
            return res.status(403).send({
                success: false,
                msg: "Please login to get the answer"
            })
        }
        const { questionID } = req.params;
        const ques = await Question.findById(questionID).populate('owner').populate({
            path: 'answer',
            populate: 'owner'
        });
        res.status(200).send({
            success: true,
            data: ques
        })
    } catch (err) { 
        console.log("ERROR IN QUESTION's ANSWER: ", err);
    }
}