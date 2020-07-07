import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/register', (request, response) => {
  const user = new User(request.body);

  user.save((error, result) => {
    if (error) return response.json({ success: false, error });
    response.redirect(307, '/user/login');
    // return response.status(200).json({
    //   success: true,
    // });
  });
});

router.post('/login', (request, response) => {
  User.findOne(
    {
      email: request.body.email,
    },
    (error, result) => {
      if (!result) {
        return response.json({
          loginSuccess: false,
          message: '존재하지 않는 E-mail 입니다.',
        });
      } else {
        result.comparePassword(request.body.password, (error, isMatch) => {
          if (!isMatch)
            return response.json({
              loginSuccess: false,
              message: '비밀번호가 일치하지 않습니다.',
            });

          result.generateToken((error, user) => {
            if (error) return response.status(400).send(error);

            response.status(200).json({
              loginSuccess: true,
              userId: user._id,
              token: user.token,
            });
          });
        });
      }
    },
  );
});

export default router;
