import express from "express";

import Diary from "../schemas/Diary";

const router = express.Router();

//일기 작성
router.post("/addDiary", (request, response) => {
  const diary = new Diary(request.body);

  diary.save((error, result) => {
    if (error) return response.status(400).json({ success: false, error });
    return response.status(200).json({ success: true, result });
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

export default router;
