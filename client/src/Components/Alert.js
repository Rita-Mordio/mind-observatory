import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

import COMMON from '../common';

//필수로 넣어야 될 항목
// const [alertData, setAlertData] = React.useState({
//     show: false,
//     message: '',
//     onConfirmPressed: null,
// });

const Alert = ({ alertData, setAlertData }) => {
  return (
    <AwesomeAlert
      contentContainerStyle={{ width: 300 }}
      messageStyle={{ fontSize: 16 }}
      confirmButtonStyle={{ width: 70 }}
      confirmButtonTextStyle={{ fontSize: 16, textAlign: 'center' }}
      show={alertData.show}
      showProgress={false}
      title={COMMON.isEmptyValue(alertData.title) ? '' : alertData.title}
      message={alertData.message}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={!COMMON.isEmptyValue(alertData.showCancelButton)}
      showConfirmButton={true}
      cancelText={
        COMMON.isEmptyValue(alertData.cancelText)
          ? '취소'
          : alertData.cancelText
      }
      confirmText={
        COMMON.isEmptyValue(alertData.confirmText)
          ? '확인'
          : alertData.confirmText
      }
      confirmButtonColor={
        COMMON.isEmptyValue(alertData.confirmButtonColor)
          ? '#efc4cd'
          : alertData.confirmButtonColor
      }
      onCancelPressed={
        COMMON.isEmptyValue(alertData.onConfirmPressed)
          ? () => {
              setAlertData({
                ...alertData,
                show: false,
              });
            }
          : () => {
              alertData.onConfirmPressed();
              setAlertData({
                ...alertData,
                onConfirmPressed: null,
              });
            }
      }
      onConfirmPressed={
        COMMON.isEmptyValue(alertData.onConfirmPressed)
          ? () => {
              setAlertData({
                ...alertData,
                show: false,
              });
            }
          : () => {
              alertData.onConfirmPressed();
              setAlertData({
                ...alertData,
                onConfirmPressed: null,
              });
            }
      }
    />
  );
};

export default Alert;
