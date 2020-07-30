import React, { useContext, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import Context from "../Redux/contexts/context";
import Alert from "../Components/Alert";

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.View`
  flex: 1;
`;

const Image = styled.Image`
  flex: 2;
  background-color: darkred;
`;

const TextWrap = styled.View`
  flex: 1;
  background-color: yellowgreen;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const EditDiary = () => {
  const [imageUrl, setImageUrl] = useState(
    'https://blog.jinbo.net/attach/615/200937431.jpg',
  );

  const [alertData, setAlertData] = useState({
    show: false,
    message: '',
    onConfirmPressed: null,
  });

  const { setFile } = useContext(Context);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      setImageUrl(image.path);

      const currentDate = moment().format('YYYY-MM-DD-hh-mm-ss');

      setFile({
        uri: `file://${image.path}`,
        name: `${currentDate}${image.filename}`,
        type: image.mime,
      });
    }).catch((error) => {
      setAlertData({
        ...alertData,
        show: true,
        message: '사용 불가능한 이미지 입니다. 다른 이미지를 선택해 주세요.',
      });
    });
  };

  return (
    <Container>
      <TouchableWithoutFeedback onPress={choosePhotoFromLibrary}>
        <Image
          source={{
            uri: imageUrl,
          }}
        />
      </TouchableWithoutFeedback>
      <TextWrap></TextWrap>

      <Alert alertData={alertData} setAlertData={setAlertData} />
    </Container>
  );
};

export default EditDiary;
