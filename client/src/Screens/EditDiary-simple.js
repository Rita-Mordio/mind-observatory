import React, { useContext, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Textarea from 'react-native-textarea';
import { KeyboardAwareScrollView } from '@codler/react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';
import moment from 'moment';
import Context from '../Redux/contexts/context';
import Alert from '../Components/Alert';
import WeatherChoiceModal from '../Components/WeatherChoiceModal';

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

const TopWrap = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const Date = styled.Text`
  color: #3f3e3c;
  font-size: 18px;
  align-self: center;
`;

const Weather = styled.Image`
  width: 32px;
  height: 32px;
`;

const ImageWrap = styled.View`
  width: 100%;
  height: ${width}px;
  border-style: dashed;
  border-width: 1px;
  border-color: #a9a9a9;
  border-radius: 20px;
`;

const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 20px;
`;

const BottomWrap = styled.View`
  flex: 1;
`;

const Title = styled.TextInput`
  border-bottom-color: #a9a9a9;
  border-bottom-width: 1px;
  border-style: solid;
  color: #3f3e3c;
  margin-top: 20px;
  height: 40px;
  font-size: 16px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const EditDiarySimple = () => {
  const { setDiary, getDiary } = useContext(Context);

  const [imageUrl, setImageUrl] = useState(
    'https://mind-observatory.s3.ap-northeast-2.amazonaws.com/default-choice.png',
  );

  const [weather, setWeather] = useState(
    require(`../../assets/images/weather-sun.png`),
  );

  const [modalVisible, setModalVisible] = useState(false);

  const [alertData, setAlertData] = useState({
    show: false,
    message: '',
    onConfirmPressed: null,
  });

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        setImageUrl(image.path);

        const currentDate = moment().format('YYYY-MM-DD-hh-mm-ss');

        setDiary({
          ...getDiary(),
          images: [
            {
              uri: `file://${image.path}`,
              name: `${currentDate}${image.filename}`,
              type: image.mime,
            },
          ],
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

  const handleTextChange = (key, value) => {
    setDiary({
      ...getDiary(),
      [key]: value,
    });
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView>
          <Container>
            <TopWrap>
              <View />
              <Date>2020년 07월 31일</Date>
              <TouchableWithoutFeedback onPress={toggleModal}>
                <Weather source={weather}></Weather>
              </TouchableWithoutFeedback>
            </TopWrap>
            <TouchableWithoutFeedback onPress={choosePhotoFromLibrary}>
              <ImageWrap>
                <Image source={{ uri: imageUrl }} resizeMode="cover" />
              </ImageWrap>
            </TouchableWithoutFeedback>

            <BottomWrap>
              <Title
                placeholder="제목"
                placeholderTextColor="#3f3e3c"
                onChangeText={(value) => {
                  handleTextChange('title', value);
                }}
              />
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                maxLength={100}
                placeholder={'내용을 작성해주세요, 최대 100자 까지 가능합니다.'}
                placeholderTextColor={'#3f3e3c'}
                underlineColorAndroid={'transparent'}
                onChangeText={(value) => {
                  handleTextChange('contents', [value]);
                }}
              />
            </BottomWrap>

            <WeatherChoiceModal
              visible={modalVisible}
              toggleModal={toggleModal}
              setWeather={setWeather}
            />
            <Alert alertData={alertData} setAlertData={setAlertData} />
          </Container>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default EditDiarySimple;

const styles = StyleSheet.create({
  textareaContainer: {
    height: 100,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#a9a9a9',
    marginTop: 20,
  },

  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 16,
    color: '#333',
  },
});
