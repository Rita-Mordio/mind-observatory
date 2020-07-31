import React, { useContext, useState } from 'react';
import { Dimensions, Keyboard, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import Context from '../Redux/contexts/context';
import Alert from '../Components/Alert';

const { width } = Dimensions.get('screen');

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const Container = styled.View`
  flex: 1;
  padding: 20px;
`;

const ScrollView = styled.ScrollView`
  flex: 1;
`;

const Date = styled.Text`
  color: #3f3e3c;
  font-size: 18px;
  text-align: center;
  margin-bottom: 15px;
`;

const Image = styled.Image`
  width: 100%;
  height: ${Math.round(width * 1.1)}px;
  border-style: dashed;
  border-width: 1px;
  border-color: #a9a9a9;
  border-radius: 20px;
`;

const BottomWrap = styled.View`
  flex: 1;
`;

const Title = styled.TextInput`
  border-bottom-color: #a9a9a9;
  border-bottom-width: 1px;
  color: #3f3e3c;
  margin-top: 20px;
  height: 40px;
`;

const Contents = styled.TextInput`
  border-color: #a9a9a9;
  border-width: 1px;
  color: #3f3e3c;
  margin-top: 20px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const EditDiarySimple = () => {
  const [imageUrl, setImageUrl] = useState(
    'https://mind-observatory.s3.ap-northeast-2.amazonaws.com/default-choice.png',
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
    })
      .then((image) => {
        setImageUrl(image.path);

        const currentDate = moment().format('YYYY-MM-DD-hh-mm-ss');

        setFile({
          uri: `file://${image.path}`,
          name: `${currentDate}${image.filename}`,
          type: image.mime,
        });
      })
      .catch((error) => {
        setAlertData({
          ...alertData,
          show: true,
          message:
            '이미지를 선택하지 않았거나, 사용 불가능한 이미지 입니다. 다른 이미지를 선택해 주세요.',
        });
      });
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <ScrollView>
            <Date>2020년 07월 31일</Date>
            <TouchableWithoutFeedback onPress={choosePhotoFromLibrary}>
              <Image source={{ uri: imageUrl }} resizeMode="cover" />
            </TouchableWithoutFeedback>

            <BottomWrap>
              <Title placeholder="제목"></Title>
              <Contents
                multiline
                numberOfLines={5}
                placeholder="내용"
              ></Contents>
            </BottomWrap>

            <Alert alertData={alertData} setAlertData={setAlertData} />
          </ScrollView>
        </Container>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default EditDiarySimple;
