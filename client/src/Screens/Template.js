import { Text, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import React, { Component } from 'react';
import styled from 'styled-components/native';
import Carousel from 'react-native-snap-carousel';

const { width } = Dimensions.get('screen');

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  padding-top: 30px;
  padding-bottom: 30px;
  background-color: #ffffff;
`;

const TitleText = styled.Text`
  color: #3f3e3c;
  text-align: center;
  font-size: 17px;
  margin-bottom: 30px;
`;

const CarouselWrap = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

class Template extends Component {
  state = {
    activeIndex: 0,
    carouselItems: [
      {
        title: 'Item 1',
        text:
          '여기는 홈 화면으로 지금까지 작성했던 일기가 나오면 좋을꺼 같아요, 한번에 10개씩 보여주고 사용자가 9번째까지 화면을 넘기면 그때 서버에서 데이터를 추가적으로 \n' +
          '받아와서 더 보여 주는 방식이 좋을꺼 같아요, 그리고 해당 사용자가 일기를 터치하면 상세 화면으로 넘어가면 될꺼 같아요',
      },
      {
        title: 'Item 2',
        text: 'Text 2',
      },
    ],
  };

  _onPressCarousel = () => {
    alert('일기를 터치했어요~');
  };

  renderTemplate = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={this._onPressCarousel}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'floralwhite',
            borderRadius: 10,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 30,
            padding: 20,
            shadowColor: '#000',
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            elevation: 9,
          }}
        >
          <Text style={{ fontSize: 30 }}>{item.title}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <TitleText>원하시는 일기 형태를 선택해주세요.</TitleText>
        <CarouselWrap>
          <Carousel
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={width}
            itemWidth={Math.round(width * 0.7)}
            renderItem={this.renderTemplate}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />
        </CarouselWrap>
      </SafeAreaView>
    );
  }
}

export default Template;
