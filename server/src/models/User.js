import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 12;
const { Schema } = mongoose;

const UserSchema = new Schema({
  // 닉네임
  nickname: {
    type: String,
    maxlength: 16,
    unique: true,
  },

  //이메일
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },

  //비밀번호
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 8,
  },

  //프로필 이미지 URL
  profileImage: {
    type: String,
  },

  //내가 작성한 다이어리 Id
  diaryIds: {
    type: [String],
    default: [],
  },

  //사용자 권한
  role: {
    type: Number,
    default: 0,
  },

  //인증 토큰
  token: {
    type: String,
  },

  //가입 일자
  registerDate: {
    type: Date,
    default: Date.now,
  },

  //프로필 변경 일자
  updateDate: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function (plainPassword, callback) {
  bcrypt.compare(plainPassword, this.password, (error, isMatch) => {
    if (error) return callback(error);
    callback(null, isMatch);
  });
};

UserSchema.methods.generateToken = function (callback) {
  const user = this;
  const token = jwt.sign(user._id.toHexString(), 'secretToken');
  user.token = token;
  user.save((error, user) => {
    if (error) return callback(error);
    callback(null, user);
  });
};

const User = mongoose.model('User', UserSchema);

export default User;
