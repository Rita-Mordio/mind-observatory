import { SET_IS_CHANGE_DIARY_DATA, SET_HISTORY } from '../constants/actionTypes';

export const initialCommonState = {
  isChangeDiaryData: false,
  history: 0,
};

export const commonReducer = (prevState, action) => {
  switch (action.type) {
    case SET_IS_CHANGE_DIARY_DATA:
      return {
        ...prevState,
        isChangeDiaryData: action.payload,
      };
    case SET_HISTORY:
      return {
        ...prevState,
        history: action.payload,
      };
  }
};
