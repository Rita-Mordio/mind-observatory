import { SET_HISTORY_COUNT, SET_ACCOUNT } from '../constants/actionTypes';
import COMMON from '../../common';

export const initialUserState = {
  historyCount: 0, //전체 기록 개수
  nickname: '',
  profileImage: '',
};

export const userReducer = (prevState, action) => {
  switch (action.type) {
    case SET_HISTORY_COUNT:
      return {
        ...prevState,
        historyCount: action.payload,
      };
    case SET_ACCOUNT:
      if (COMMON.isEmptyValue(action.payload.profileImage)) {
        return {
          ...prevState,
          nickname: action.payload.nickname,
        };
      } else {
        return {
          ...prevState,
          nickname: action.payload.nickname,
          profileImage: action.payload.profileImage,
        };
      }
  }
};
