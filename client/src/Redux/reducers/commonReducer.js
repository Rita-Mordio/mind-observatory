import {
  SET_REFRESH_OBSERVATORY,
  SET_HISTORY_COUNT,
} from '../constants/actionTypes';

export const initialCommonState = {
  refreshObservatory: false,
  refreshReport: false,
  historyCount: 0,
};

export const commonReducer = (prevState, action) => {
  switch (action.type) {
    case SET_REFRESH_OBSERVATORY:
      return {
        ...prevState,
        refreshObservatory: action.payload
      };
    case SET_HISTORY_COUNT:
      return {
        ...prevState,
        historyCount: action.payload,
      };
  }
};
