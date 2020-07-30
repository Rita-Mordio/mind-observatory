import { SET_FILE } from '../constants/actionTypes';

export const initialFileState = {
  uri: '',
  name: '',
  type: '',
};

export const fileReducer = (prevState, action) => {
  switch (action.type) {
    case SET_FILE:
      const { uri, name, type } = action.file;

      return {
        ...prevState,
        uri,
        name,
        type,
      };
  }
};
