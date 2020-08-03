import { SET_DIARY } from '../constants/actionTypes';

export const initialDiaryState = {
  token: '',
  templateNumber: 1,
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
        templateNumber,
        title,
        weather,
        contents,
        images,
      } = action.diary;

      return {
        ...prevState,
        token,
        templateNumber,
        title,
        weather,
        contents,
        images,
      };
  }
};
