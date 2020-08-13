import { SET_IS_CHANGE_DIARY_DATA, SET_HISTORY_COUNT } from '../constants/actionTypes';

export const initialCommonState = {
  isChangeDiaryData: false,
  historyCount: 0,
};

export const commonReducer = (prevState, action) => {
  switch (action.type) {
    case SET_IS_CHANGE_DIARY_DATA:
      return {
        ...prevState,
        isChangeDiaryData: action.payload,
      };
    case SET_HISTORY_COUNT:
      return {
        ...prevState,
        historyCount: action.payload,
      };
  }
};
