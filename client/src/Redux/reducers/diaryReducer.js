import { SET_DIARY } from '../constants/actionTypes';

export const initialDiaryState = {
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
      const { title, weather, contents, images } = action.diary;

      return {
        ...prevState,
        title,
        weather,
        contents,
        images,
      };
  }
};
