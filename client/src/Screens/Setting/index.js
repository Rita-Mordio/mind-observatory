import { Text, View, Button } from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

const Setting = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        설정 화면을 따로 빼놓기는 했는데 괜히 플로우만 더 복잡해지는 느낌이라 차라리 설정에
        들어갈내용들을 햄버거 메뉴에다가 넣어주는건 어떨까 해요 내 계정 관리 / 약관 확인 / 테마 변경
        밖에 없으니
      </Text>
    </View>
  );
};

export default Setting;
