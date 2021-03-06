import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

import COMMON from "../common";

dotenv.config();

const saltRounds = 12;
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    // 닉네임
    nickname: {
      type: String,
      maxlength: 8,
      required: true,
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
      default: "",
    },

    //구독 중인 사용자 ID
    subscribeUserIds: {
      type: [Schema.Types.ObjectId],
      ref: "User",
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

    promotion: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
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

UserSchema.pre("updateOne", function (next) {
  const user = this;

  if (COMMON.isEmptyValue(user._update.$set.password)) {
    next();
  } else {
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) return next(err);
      bcrypt.hash(user._update.$set.password, salt, (err, hash) => {
        if (err) return next(err);
        user._update.$set.password = hash;
        next();
      });
    });
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
  const token = jwt.sign(user._id.toHexString(), process.env.JWT_SECRET_TOKEN);
  user.token = token;
  user.save((error, user) => {
    if (error) return callback(error);
    callback(null, user);
  });
};

const User = mongoose.model("User", UserSchema);

export default User;
