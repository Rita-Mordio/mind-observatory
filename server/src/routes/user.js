import express from "express";
import User from "../schemas/User";

const router = express.Router();

router.post("/duplicateEmailCheck", (request, response) => {
  User.findOne({ email: request.body.email }, (error, result) => {
    if (error) return response.json({ success: false, error });
    return response.status(200).json({
      success: true,
      isDuplicate: result ? true : false
    });
  })
});

router.post("/duplicateNicknameCheck", (request, response) => {
  User.findOne({ nickname: request.body.nickname }, (error, result) => {
    if (error) return response.json({ success: false, error });
    return response.status(200).json({
      success: true,
      isDuplicate: result ? true : false
    });
  })
});

router.post("/register", (request, response) => {
  const user = new User(request.body);

  user.save((error, result) => {
    if (error) return response.json({ success: false, error });
    return response.status(200).json({
      success: true,
    });
  });
});

router.post("/login", (request, response) => {
  User.findOne(
    {
      email: request.body.email,
    },
    (error, result) => {
      if (!result) {
        return response.json({
          success: false,
          message: "존재하지 않는 E-mail 입니다.",
        });
      } else {
        result.comparePassword(request.body.password, (error, isMatch) => {
          if (!isMatch)
            return response.json({
              success: false,
              message: "비밀번호가 일치하지 않습니다.",
            });

          result.generateToken((error, user) => {
            if (error) return response.status(400).send(error);

            response.status(200).json({
              success: true,
              userId: user._id,
              token: user.token,
            });
          });
        });
      }
    }
  );
});

export default router;
