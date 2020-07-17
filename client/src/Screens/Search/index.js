import { Text, View, Button } from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

Icon.loadFont();

const Search = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
        검색하는 방법은 2가지로 하나는 InputBox에 검색어를 누르면 제목이나 내용중에 일치하는 일기를
        보여주는 것이고 또 하나는 달력 (DataPicker) 를 보여줘 사용자가 해당 날짜를 터치하였을때
        보여주는 방식을 생각하고 있어요
      </Text>
      <Text style={{marginTop: 30}}>
        이때 InputBox로 검색을 하면 초기 홈화면에서 검색된 내용을 슬라이드로 보여주고, 달력에서 터치했을때는
        보여줄께 1개뿐이니 바로 디테일 화면으로 넘어가면 될꺼 같아요
      </Text>
    </View>
  );
};

export default Search;
