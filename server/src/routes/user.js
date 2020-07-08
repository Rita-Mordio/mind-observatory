import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

import User from "../schemas/User";

const router = express.Router();

dotenv.config();

const main = async (data) => {
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
}

const randomNumberGenerator = () => {
  let number = Math.floor(Math.random() * 100000000) + 10000000;
  if (number > 100000000) {
    number = number - 10000000;
  }

  return number
}

router.post("/authEmailSend", (request, response) => {

  const randomNumber = randomNumberGenerator()

  main({
    from: process.env.EMAIL,
    to: request.body.email,
    subject: "내 마음 관측소 인증 번호",
    html: `<p>안녕하세요! 회원님의 인증 번호는 <b>${randomNumber}</b> 입니다</p>`,
  }).catch(console.error);

  return response.status(200).json({
    success: true,
    randomNumber: randomNumber
  });
});

router.post("/duplicateEmailCheck", (request, response) => {
  User.findOne({ email: request.body.email }, (error, result) => {
    if (error) return response.json({ success: false, error });

    return response.status(200).json({
      success: true,
      isDuplicate: result ? true : false,
    });
  });
});

router.post("/duplicateNicknameCheck", (request, response) => {
  User.findOne({ nickname: request.body.nickname }, (error, result) => {
    if (error) return response.json({ success: false, error });
    return response.status(200).json({
      success: true,
      isDuplicate: result ? true : false,
    });
  });
});

router.post("/changeRandomPassword", (request, response) => {
  User.findOne({ email: request.body.email }, (error, result) => {
    if (error) return response.json({ success: false, error });

    const randomNumber = randomNumberGenerator()

    main({
      from: process.env.EMAIL,
      to: request.body.email,
      subject: "내 마음 관측소 임시 비밀번호",
      html: `<p>안녕하세요! 회원님의 임시 비밀번호는 <b>${randomNumber}</b> 입니다</p>`,
    }).catch(console.error);

    result.password = randomNumber

    result.save((error, result) => {
      if (error) return response.json({ success: false, error });
      return response.status(200).json({
        success: true
      });
    });
  });
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
