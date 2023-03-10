const Questions = require("../Models/Questions");
const Answers = require("../Models/Answers");
const Users = require("../Models/Users");
module.exports.getCategories = async function (req, res) {
  try {
    const posts = await Questions.find();
    const categories = posts.map((el) => el.category);
    const uniqueCategories = categories.filter(
      (item, index) => categories.indexOf(item) === index
    );
    res.status(200).json({ categories: uniqueCategories });
  } catch (e) {
    res.status(400).send(e);
  }
};

module.exports.getQuestions = async function (req, res) {
  try {
    const category = req.params.category;
    let page, itemsCount;
    if (req.query.page) {
      page = req.query.page;
    } else {
      page = 1;
    }
    if (req.query.itemsCount) {
      itemsCount = req.query.itemsCount;
    } else {
      itemsCount = 5;
    }


    const questions = await Questions.find({ category: category }, { _v: 0 });
    const comments = [];
    for (let i = 0; i < questions.length; i++) {
      const answers = await Answers.find({ answeredTo: questions[i]._id });
      const user = await Users.findOne(
        { _id: questions[i].user },
        { _id: 0, email: 0, password: 0 }
      );
      comments.push({
        questionInfo: questions[i],
        answerInfo: answers,
        userInfo: user,
      });
    }



    const itemsFromCollectionSize = comments.length;

    const totalPages = Math.ceil(itemsFromCollectionSize / itemsCount);

    let newArr;
    if (page <= totalPages) { newArr = comments.slice((page - 1)*itemsCount, page * itemsCount); }
    else if (page > totalPages) {
      newArr = comments.slice((totalPages - 1)*itemsCount)
    }
    res.status(200).json({ comments:newArr, totalItemsCount: itemsFromCollectionSize,itemsCount });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};
module.exports.addQuestion = async function (req, res) {
  try {
    const questionDocument = { ...req.body.questionInfo, date: new Date(),user:"63cc42791eb3b2e8fc1c733f"};
    const category = req.params.category;
    const questionFromCollection = await Questions.findOne({
      question: questionDocument.question,
    });
    if (!questionFromCollection) {
      await new Questions({ ...questionDocument, category }).save();
      res.status(200).send("Question added with success!");
    } else {
      res.status(400).send("This question is already asked!");
    }
  } catch (e) {
    res.status(400).send(e);
  }
};
module.exports.addAnswer = async function (req, res) {
  const answerInfo = {...req.body.answerInfo, user:"63cc42791eb3b2e8fc1c733f", answeredTo:"63cd0a62dc1bf9122dc1e7d5" }
  console.log(answerInfo);
  const questionCandidate = await Questions.findOne({
    _id: answerInfo.answeredTo,
  });
  console.log(questionCandidate);
  if (questionCandidate) {
    const answerDocument = { ...answerInfo, date: new Date() };
    console.log(answerDocument)
    try {
      await new Answers(answerDocument).save();

      res
        .status(200)
        .send(
          `Answered to question ${questionCandidate.question} with success!`
        );
    } catch (e) {
      res.status(400).send(e);
    }
  } else {
    res.status(404).send("Question not found");
  }
};

module.exports.getCommentsByQuestion = async function (req, res) {
  const questionID = req.query.questionID;
  try {
    const question = await Questions.findOne({ _id: questionID });
    if (question) {
      const answers = await Answers.find({ answeredTo: questionID });
      const comment = { questionInfo: question, answerInfo: answers };
      res.status(200).send(comment);
    } else {
      res.status(400).send(questionID);
    }
  } catch (e) {
    res.status(404).send(e);
  }
};
