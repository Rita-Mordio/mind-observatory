import Axios from 'axios';

const COMMON = {
  axiosCall: (url, data, callBack) => {
    Axios.post(`http://10.0.2.2:4000/api/${url}`, data)
      .then((result) => {
          callBack(result);
      })
      .catch((error) => {
        alert('에러가 발생했습니다. 관리자에게 문의해주세요.');
      });
  },
};

export default COMMON;
