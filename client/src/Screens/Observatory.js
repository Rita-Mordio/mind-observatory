import {Text, View, Image} from 'react-native';
import * as React from 'react';

const Observatory = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>
        관측소에서 한달 전체를 모두 보여주는건 힘들꺼 같고 "최근" 일주일 또는
        10일정도를 보여주는게 좋을꺼 같아요
      </Text>
      <Text style={{marginTop: 20}}>
        아마 표시되야 할껀 해당 날짜 / 그 날짜에 대한 날씨를 표로 보여주고 표에
        나온 날씨들의 평균값을 보여주면 어떨까해요
      </Text>
    </View>
  );
};

export default Observatory;
