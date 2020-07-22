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
//회원가입시 이메일을 인증하거나, 임시 비밀번호를 생성할 때 사용
const randomNumberGenerator = () => {
  let number = Math.floor(Math.random() * 100000000) + 10000000;
  if (number > 100000000) {
    number = number - 10000000;
  }

  return number;
};

//이메일 인증 라우터
//회원 가입시 이메일로 랜덤한 8자리 난수를 보내 주는 라우터
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
      return response.status(200).json({
        success: true,
        isAvailable: result ? false : true,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: "이메일 중복확인 실패.",
        error: error,
      });
    });
});

//닉네임 중복 체크
//회원가입 또는 내 정보 수정시 사용중인 닉네임이 존재하나 쳌크
router.post("/duplicateNicknameCheck", (request, response) => {
  User.findOne({ nickname: request.body.nickname })
    .then((result) => {
      return response.status(200).json({
        success: true,
        isDuplicate: result ? true : false,
      });
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: "닉네임 중복확인 실패.",
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
          return response.json({
            success: false,
            message: "임시 비밀번호 생성 실패",
            error: error,
          });
        });
    })
    .catch((error) => {
      return response.json({
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
    if (error) return response.json({ success: false, error });
    return response.status(200).json({
      success: true,
    });
  });
});

//로그인
router.post("/login", (request, response) => {
  User.findOne({ email: request.body.email })
    .then((result) => {
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
    })
    .catch((error) => {
      return response.json({
        success: false,
        message: "로그인 DB 접속 에러",
        error: error,
      });
    });
});

export default router;
