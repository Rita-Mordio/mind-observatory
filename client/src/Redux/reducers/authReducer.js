import { SIGN_IN, SIGN_OUT } from '../constants/actionTypes';
import COMMON from '../../common';

export const initialAuthState = {
  userToken: null,
};

export const authReducer = (prevState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...prevState,
        userToken: action.userToken,
      };
    case SIGN_OUT:
      COMMON.removeStoreData('@userToken', () => {
        alert('사용자 토큰 삭제중 오류가 발생했습니다.');
      });

      return {
        ...prevState,
        userToken: null,
      };
  }
};
