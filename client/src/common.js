import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const COMMON = {
  axiosCall: (url, data, successCallBack, errorCallBack) => {
    Axios.post(`http://15.165.212.145:4000/api/${url}`, data)
      //   Axios.post(`http://127.0.0.1:4000/api/${url}`, data)
      //   Axios.post(`http://10.0.2.2:4000/api/${url}`, data)
      .then((result) => {
        successCallBack(result);
      })
      .catch((error) => {
        if (errorCallBack === undefined) {
          alert('서버쪽 응답이 없습니다. 관리자에게 문의해주세요.');
        } else {
          errorCallBack(error);
        }
      });
  },

  isEmptyValue: (value) => {
    if (value === null) return true;
    else if (value === undefined) return true;
    else if (value === '') return true;
    else return false;
  },

  checkSuccess: (object, alert, setAlert) => {
    if (!object.data.success) {
      setAlert({
        ...alert,
        show: true,
        message: object.data.message,
      });

      return false;
    }

    return true;
  },

  setStoreData: async (key, value, errorCallback) => {
    try {
      await AsyncStorage.setItem(key, value.toString());
    } catch (e) {
      errorCallback();
    }
  },

  getStoreData: async (key, successCallback, errorCallback) => {
    try {
      const value = await AsyncStorage.getItem(key);
      successCallback(value);
    } catch (e) {
      errorCallback();
    }
  },

  removeStoreData: async (key, errorCallback) => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      errorCallback();
    }
  },

  getViewTemplateNameByNo: (number) => {
    switch (number) {
      case 1:
        return 'ViewDiarySimple';
    }
  },

  getEditTemplateNameByNo: (number) => {
    switch (number) {
      case 1:
        return 'EditDiarySimple';
    }
  },
};

export default COMMON;
