import mongoose from "mongoose";

const { Schema } = mongoose;

const DiarySchema = new Schema(
  {
    //작성자 Id
    userFrom: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    //템플릿 타입
    templateType: {
      type: Number,
      required: true,
    },

    //제목
    title: {
      type: String,
      required: true,
    },

    //감정 날씨
    weather: {
      type: String,
      required: true,
    },

    //내용
    contents: {
      type: [String],
      required: true,
    },

    //이미지 URL
    images: {
      type: [String],
    },

    //공유 여부
    isShare: {
      type: Boolean,
      default: false,
    },

    //삭제 여부
    isVisible: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Diary = mongoose.model("Diary", DiarySchema);

export default Diary;
