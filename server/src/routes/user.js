import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

import User from "../schemas/User";

const router = express.Router();

dotenv.config();

//이메일 발송 함수
//data를 받아 해당 내용을 전송해준다
const sendEmail = async (data) => {
  let transporter = nodemailer.createTransport({
    service: "Naver",
    host: "smtp.naver.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  await transporter.sendMail(data);
};

//8자리 난수를 발생
//이메일을 인증하거나, 임시 비밀번호를 생성할 때 사용
const randomNumberGenerator = () => {
  let number = Math.floor(Math.random() * 100000000) + 10000000;
  if (number > 100000000) {
    number = number - 10000000;
  }

  return number;
};

//이메일 인증 라우터
//이메일로 랜덤한 8자리 난수를 보내 주는 라우터
router.post("/authEmailSend", (request, response) => {
  const randomNumber = randomNumberGenerator();

  sendEmail({
    from: process.env.EMAIL,
    to: request.body.email,
    subject: "내 마음 관측소 인증 번호",
    html: `<p>안녕하세요! 회원님의 인증 번호는 <b>${randomNumber}</b> 입니다</p>`,
  }).catch(console.error);

  return response.status(200).json({
    success: true,
    randomNumber: randomNumber,
  });
});

//이메일 중복 체크
//회원 가입시 사용중인 이메일이 존재하나 체크
router.post("/availableEmail", (request, response) => {
  User.findOne({ email: request.body.email })
    .then((result) => {
      if (result) {
        return response.status(200).json({
          success: false,
          isAvailable: true,
          message: "이미 사용중인 이메일 입니다.",
        });
      } else {
        return response.status(200).json({
          success: true,
          isAvailable: true,
        });
      }
    })
    .catch((error) => {
      return response.status(200).json({
        success: false,
        message:
          "이메일 중복확인중 문제가 발생했습니다, 관리자에게 문의해주세요.",
        error: error,
      });
    });
});

//단일 회원 정보
router.post("/getUser", (request, response, next) => {
  User.findOne({ token: request.body.token })
    .then((result) => {
      return response.status(200).json({
        success: true,
        user: {
          nickname: result.nickname,
          profileImage: result.profileImage,
        },
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message:
          "사용자 정보를 가져오는중 문제가 발생했습니다, 관리자에게 문의해주세요.",
        error: error,
      });
    });
});

//닉네임 중복 체크
//내 정보 수정시 사용중인 닉네임이 존재하나 체크
router.post("/availableNickname", (request, response) => {
  User.findOne({ nickname: request.body.nickname })
    .then((result) => {
      if (result) {
        return response.status(200).json({
          success: false,
          isAvailable: true,
          message: "이미 사용중인 닉네임 입니다.",
        });
      } else {
        return response.status(200).json({
          success: true,
          isAvailable: true,
        });
      }
    })
    .catch((error) => {
      return response.status(200).json({
        success: false,
        message:
          "닉네임 중복확인중 문제가 발생했습니다, 관리자에게 문의해주세요..",
        error: error,
      });
    });
});

//비밀번호 변경
//임시비밀번호를 발급해 저장하고, 회원가입시 사용한 이메일로 발송
router.post("/changeRandomPassword", (request, response, next) => {
  User.findOne({ email: request.body.email })
    .then((result) => {
      const randomNumber = randomNumberGenerator();

      sendEmail({
        from: process.env.EMAIL,
        to: request.body.email,
        subject: "내 마음 관측소 임시 비밀번호",
        html: `<p>안녕하세요! 회원님의 임시 비밀번호는 <b>${randomNumber}</b> 입니다</p>`,
      }).catch(console.error);

      result.password = randomNumber;

      result
        .save()
        .then((result) => {
          return response.status(200).json({
            success: true,
          });
        })
        .catch((error) => {
          return response.status(200).json({
            success: false,
            message:
              "회원정보에 임시 비밀번호를 저장중 문제가 발생했습니다. 관리자에게 문의해 주세요",
            error: error,
          });
        });
    })
    .catch((error) => {
      return response.status(200).json({
        success: false,
        message: "존재하지 않는 이메일 입니다.",
        error: error,
      });
    });
});

//회원가입
router.post("/register", (request, response) => {
  const user = new User(request.body);

  user.save((error, result) => {
    if (error)
      return response.status(200).json({
        success: false,
        message: "회원가입에 실패하였습니다. 관리자에게 문의해주세요.",
        error,
      });
    return response.status(200).json({
      success: true,
    });
  });
});

//로그인
router.post("/signIn", (request, response) => {
  User.findOne({ email: request.body.email })
    .then((result) => {
      if (!result) {
        return response.status(200).json({
          success: false,
          message: "존재하지 않는 이메일 입니다.",
        });
      } else {
        result.comparePassword(request.body.password, (error, isMatch) => {
          if (!isMatch)
            return response.status(200).json({
              success: false,
              message: "비밀번호가 일치하지 않습니다.",
            });

          result.generateToken((error, user) => {
            if (error)
              return response.status(200).json({
                success: false,
                message: "사용자 토큰 생성중 문제가 발생했습니다.",
              });

            return response.status(200).json({
              success: true,
              userId: user._id,
              token: user.token,
            });
          });
        });
      }
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: "로그인 DB 접속 에러",
        error: error,
      });
    });
});

//회원 정보 수정
router.post("/updateAccount", (request, response) => {
  User.updateOne({ token: request.body.token }, { $set: request.body })
    .then((result) => {
      return response.status(200).json({ success: true, result });
    })
    .catch((error) => {
      return response
        .status(200)
        .json({ success: false, message: "정보 수정중 문제가 발생했습니다." });
    });
});

export default router;
