import express from "express";
import moment from "moment";

import Diary from "../schemas/Diary";
import User from "../schemas/User";

const router = express.Router();

//일기 작성
router.post("/addDiary", (request, response) => {
  User.findOne({ token: request.body.token })
    .then((user) => {
      request.body.userFrom = user._id;
      delete request.body.token;

      const diary = new Diary(request.body);

      diary.save((error, result) => {
        if (error)
          return response.status(400).json({
            success: false,
            message: "서버문제로 일기 저장에 실패하였습니다.",
            error,
          });
        return response.status(200).json({ success: true, result });
      });
    })
    .catch((error) => {
      response.status(400).json({ success: false, error });
    });
});

//일기 수정
//일기 Id를 클라이언트에서 보내줘야함
router.post("/editDiary", (request, response) => {
  request.body.updateDate = Date.now();
  Diary.update({ _id: request.body.diaryId }, { $set: request.body })
    .then((result) => {
      response.status(200).json({ success: true, result });
    })
    .catch((error) => {
      response.status(400).json({ success: false, error });
    });
});

//내가 작성한 일기List 가져오기
router.post("/getMyDiaries", (request, response) => {
  User.findOne({ token: request.body.token })
    .then((user) => {
      // Diary.find({ userFrom: user._id }).populate({ path: 'userFrom' })
      Diary.find({ userFrom: user._id })
        .sort({ createdAt: -1 })
        .then((diaries) => {
          response.status(200).json({ success: true, diaries });
        })
        .catch((error) => {
          response.status(400).json({
            success: false,
            message: "일기 리스트를 가져오는데 실패하였습니다.",
            error,
          });
        });
    })
    .catch((error) => {
      response.status(400).json({
        success: false,
        message: "사용자 정보를 가져오는데 실패하였습니다.",
        error,
      });
    });
});

//단일 일기 객체 가져오기
//일기 ID로 검색
router.post("/getDiary", (request, response) => {
  Diary.findOne({ _id: request.body.id })
    .then((result) => {
      response.status(200).json({ success: true, result });
    })
    .catch((error) => {
      response.status(400).json({ success: false, error });
    });
});

//제목으로 내가 작성한 일기 검색
router.post("/searchMyDiariesByTitle", (request, response) => {
  User.findOne({ token: request.body.token })
    .then((user) => {
      Diary.find({ userFrom: user._id, title: { $regex: request.body.title } })
        .then((result) => {
          response.status(200).json({ success: true, result });
        })
        .catch((error) => {
          response.status(400).json({ success: false, error });
        });
    })
    .catch((error) => {
      response.status(400).json({ success: false, error });
    });
});

export default router;
