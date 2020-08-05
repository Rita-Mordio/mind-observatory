import { SET_COMMON } from '../constants/actionTypes';

export const initialCommonState = {
  isChangeDiaryData: false,
};

export const commonReducer = (prevState, action) => {
  switch (action.type) {
    case SET_COMMON:
      return {
        ...prevState,
        isChangeDiaryData: action.value,
      };
  }
};
