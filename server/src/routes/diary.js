import express from "express";

import Diary from "../schemas/Diary";
import User from "../schemas/User";

const router = express.Router();

//일기 작성
router.post("/addDiary", (request, response) => {
  User.findOne({ token: request.body.token })
    .then((user) => {
      request.body.userFrom = user._id;
      delete request.body.token;
      delete request.body._id;

      const diary = new Diary(request.body);

      diary.save((error, result) => {
        if (error)
          return response.status(200).json({
            success: false,
            message: "서버문제로 일기 저장에 실패하였습니다.",
            error,
          });
        return response.status(200).json({ success: true, result });
      });
    })
    .catch((error) => {
      return response.status(200).json({ success: false, error });
    });
});

//일기 수정
//일기 Id를 클라이언트에서 보내줘야함
router.post("/editDiary", (request, response) => {
  Diary.updateOne({ _id: request.body._id }, { $set: request.body })
    .then((result) => {
      return response.status(200).json({ success: true, result });
    })
    .catch((error) => {
      return response.status(200).json({ success: false, error });
    });
});

//내가 작성한 일기List 가져오기
router.post("/getMyDiaries", (request, response) => {
  User.findOne({ token: request.body.token })
    .then((user) => {
      if (!user)
        return response.status(200).json({
          success: false,
          message: "존재하지 않는 사용자 정보 입니다. 다시 로그인해 주세요.",
        });

      Diary.find({ userFrom: user._id, isVisible: true })
        .sort({ createdAt: -1 })
        .skip((request.body.page - 1) * 10)
        .limit(10)
        .then((diaries) => {
          return response.status(200).json({ success: true, diaries });
        })
        .catch((error) => {
          return response.status(200).json({
            success: false,
            message: "일기 리스트를 가져오는데 실패하였습니다.",
            error,
          });
        });
    })
    .catch((error) => {
      return response.status(200).json({
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
      return response.status(200).json({ success: true, result });
    })
    .catch((error) => {
      return response.status(400).json({ success: false, error });
    });
});

//제목으로 내가 작성한 일기 검색
router.post("/searchMyDiariesByTitle", (request, response) => {
  User.findOne({ token: request.body.token })
    .then((user) => {
      Diary.find({
        userFrom: user._id,
        isVisible: true,
        title: { $regex: request.body.title },
      })
        .then((result) => {
          return response.status(200).json({ success: true, result });
        })
        .catch((error) => {
          return response.status(400).json({ success: false, error });
        });
    })
    .catch((error) => {
      return response.status(400).json({ success: false, error });
    });
});

//최근 10일간의 날씨를 가져오기
router.post("/getReportWeather", (request, response) => {
  User.findOne({ token: request.body.token })
    .then((user) => {
      if (!user)
        return response.status(200).json({
          success: false,
          message: "존재하지 않는 사용자 정보 입니다. 다시 로그인해 주세요.",
        });

      Diary.find(
        { userFrom: user._id, isVisible: true },
        { weather: 1, createdAt: 1 }
      )
        .sort({ createdAt: -1 })
        .limit(10)
        .then((weather) => {
          return response.status(200).json({ success: true, weather });
        })
        .catch((error) => {
          return response.status(200).json({
            success: false,
            message: "날씨 정보를 가져오는데 실패하였습니다.",
            error,
          });
        });
    })
    .catch((error) => {
      return response.status(200).json({
        success: false,
        message: "사용자 정보를 가져오는데 실패하였습니다.",
        error,
      });
    });
});

export default router;
