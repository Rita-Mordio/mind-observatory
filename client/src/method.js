import Axios from 'axios';

const METHOD = {

  duplicateCheckId: (data, callback) => {
    Axios.post('http://192.168.0.98:5000/user/duplicateCheckId', data)
        .then((response) => {
          callback(response.data.isDuplicate)
        })
        .catch((error) => {
          console.log(error);
        });
  },

  register : (data, callback) => {
    Axios.post('http://192.168.0.98:5000/user/register', data)
        .then((response) => {
          //TODO response로 받은 값에서 토큰을 기기안에 넣어줘야함
          console.log('response : ', response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }
}

export default METHOD
