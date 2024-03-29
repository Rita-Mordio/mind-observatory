import express from "express";
import _ from "lodash";

import Diary from "../schemas/Diary";
import User from "../schemas/User";

const router = express.Router();

const diariesCount = (userId, response) => {
  Diary.countDocuments(
    {
      userFrom: userId,
      isVisible: true,
    },
    (error, result) => {
      if (error)
        return response.status(200).json({
          success: false,
          message: "서버문제로 일기 개수를 가져오는데 실패하였습니다.",
          error,
        });

      return response.status(200).json({ success: true, count: result });
    }
  );
};

//작성한 일기의 총 개수
router.post("/myDiariesCount", (request, response) => {
  User.findOne({ token: request.body.token })
    .then((user) => {
      diariesCount(user._id, response);
    })
    .catch((error) => {
      return response.status(200).json({ success: false, error });
    });
});

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
        diariesCount(user._id, response);
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

//리포트 데이터 가져오기
router.post("/getReport", (request, response) => {
  User.findOne({ token: request.body.token })
    .then((user) => {
      if (!user)
        return response.status(200).json({
          success: false,
          message: "존재하지 않는 사용자 정보 입니다. 다시 로그인해 주세요.",
        });

      const date = request.body.selectDate;

      Diary.find(
        {
          userFrom: user._id,
          isVisible: true,
          createdAt: {
            $gte: `${date.year}-${date.month}-01 00:00:00`,
            $lte: `${date.year}-${date.month}-31 23:59:59`,
          },
        },
        { weather: 1, createdAt: 1 }
      )
        .sort({ createdAt: 1 })
        .then((weather) => {
          const count = _.countBy(weather, "weather");

          const report = {
            mostNumerous: Object.keys(count)[0],
            count,
            weather,
          };

          return response.status(200).json({ success: true, report });
        })
        .catch((error) => {
          return response.status(200).json({
            success: false,
            message: "해당 날짜의 일기 정보를 가져오는데 문제가 발생했습니다.",
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
