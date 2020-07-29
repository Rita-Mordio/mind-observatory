import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';
import ImagePicker from 'react-native-image-crop-picker';
import { RNS3 } from 'react-native-aws3';
import AWS_KEY from '../AWS_Key';

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

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      const file = {
        uri: `file://${image.path}`,
        name: image.filename,
        type: image.mime,
      };

      console.log(file);

      const config = {
        keyPrefix: 'images/',
        bucket: 'mind-observatory',
        region: 'ap-northeast-2',
        accessKey: AWS_KEY.accessKey,
        secretKey: AWS_KEY.secretKey,
        successActionStatus: 201,
      };

      RNS3.put(file, config).then((result) => {
        console.log(result);
      });

      setImageUrl(image.path);
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
    </Container>
  );
};

export default EditDiary;
