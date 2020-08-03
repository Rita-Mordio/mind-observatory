import { SET_DIARY } from '../constants/actionTypes';

export const initialDiaryState = {
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
        token,
        templateType,
        title,
        weather,
        contents,
        images,
      } = action.diary;

      return {
        ...prevState,
        token,
        templateType,
        title,
        weather,
        contents,
        images,
      };
  }
};
