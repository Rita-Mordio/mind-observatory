import { INIT_DIARY, SET_DIARY } from '../constants/actionTypes';

export const initialDiaryState = {
  _id: '',
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
        _id,
        token,
        templateType,
        title,
        weather,
        contents,
        images,
      } = action.diary;

      return {
        ...prevState,
        _id,
        token,
        templateType,
        title,
        weather,
        contents,
        images,
      };

    case INIT_DIARY:
      return {
        _id: '',
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
  }
};
