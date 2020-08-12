import { SET_HEADER } from '../constants/actionTypes';

export const initialThemeState = {
  headerColor: '#efc4cd',
  headerTitle: '내 마음 관측소'
};

export const themeReducer = (prevState, action) => {
  switch (action.type) {
    case SET_HEADER:
      const { headerColor, headerTitle } = action.theme;

      return {
        ...prevState,
        headerColor,
        headerTitle
      };
  }
};
