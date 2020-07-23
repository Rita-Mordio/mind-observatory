import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

import COMMON from '../common';

const Alert = ({alert, setAlert}) => {
  return (
    <AwesomeAlert
      show={alert.show}
      showProgress={false}
      title={COMMON.isEmptyValue(alert.title) ? '' : alert.title}
      message={alert.message}
      closeOnTouchOutside={true}
      closeOnHardwareBackPress={false}
      showCancelButton={!COMMON.isEmptyValue(alert.showCancelButton)}
      showConfirmButton={true}
      cancelText={
        COMMON.isEmptyValue(alert.cancelText) ? '취소' : alert.cancelText
      }
      confirmText={
        COMMON.isEmptyValue(alert.confirmText) ? '확인' : alert.confirmText
      }
      confirmButtonColor={
        COMMON.isEmptyValue(alert.confirmButtonColor)
          ? '#efc4cd'
          : alert.confirmButtonColor
      }
      onCancelPressed={
        COMMON.isEmptyValue(alert.onConfirmPressed)
          ? () => {
              setAlert({
                ...alert,
                show: false,
              });
            }
          : () => {
              alert.onConfirmPressed();
              setAlert({
                ...alert,
                onConfirmPressed: null,
              });
            }
      }
      onConfirmPressed={
        COMMON.isEmptyValue(alert.onConfirmPressed)
          ? () => {
              setAlert({
                ...alert,
                show: false,
              });
            }
          : () => {
              alert.onConfirmPressed();
              setAlert({
                ...alert,
                onConfirmPressed: null,
              });
            }
      }
    />
  );
};

export default Alert;
