import {
  SET_REFRESH_OBSERVATORY,
  SET_REFRESH_REPORT,
} from '../constants/actionTypes';

export const initialCommonState = {
  refreshObservatory: false, //홈 화면 데이터 다시 불러올지 여부
  refreshReport: false, //리포트 화면 데이터 다시 불러올지 여부
};

export const commonReducer = (prevState, action) => {
  switch (action.type) {
    case SET_REFRESH_OBSERVATORY:
      return {
        ...prevState,
        refreshObservatory: action.payload,
      };
    case SET_REFRESH_REPORT:
      return {
        ...prevState,
        refreshReport: action.payload,
      };
  }
};
