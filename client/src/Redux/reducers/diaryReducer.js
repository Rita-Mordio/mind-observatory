import { SET_DIARY } from '../constants/actionTypes';

export const initialDiaryState = {
  diaryId: '',
  token: '',
  templateType: 1,
  title: '',
  weather: 'sun',
  contents: [''],
  images: [
    {
      uri: '',
      name: '',
      type: '',
    },
  ],
};

export const diaryReducer = (prevState, action) => {
  switch (action.type) {
    case SET_DIARY:
      const {
        diaryId,
        token,
        templateType,
        title,
        weather,
        contents,
        images,
      } = action.diary;

      return {
        ...prevState,
        diaryId,
        token,
        templateType,
        title,
        weather,
        contents,
        images,
      };
  }
};
