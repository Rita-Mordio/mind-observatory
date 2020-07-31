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
  background-color: #ffffff;
`;

const Container = styled.View`
  flex: 1;
  padding: 30px 0px;
  background-color: #ffffff;
`;

const PageTitle = styled.Text`
  color: #3f3e3c;
  text-align: center;
  font-size: 18px;
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
  constructor(props) {
    super(props);

    this.state = {
      carouselItems: [
        {
          navigationName: 'EditDiarySimple',
        },
        {
          navigationName: 'EditDiarySimple',
        },
      ],
    };
  }

  onPressCarousel = (item) => {
    this.props.navigation.navigate(item.navigationName);
  };

  renderTemplate = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.onPressCarousel(item);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'floralwhite',
            borderRadius: 10,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 30,
            padding: 20,
            shadowColor: '#000000',
            shadowOpacity: 0.34,
            shadowRadius: 6.27,
            shadowOffset: {
              width: 0,
              height: 5,
            },
            elevation: 9,
          }}
        >
          <Text style={{ fontSize: 30 }}>{item.navigationName}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <Container>
          <PageTitle>원하시는 일기 형태를 선택해주세요.</PageTitle>
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
        </Container>
      </SafeAreaView>
    );
  }
}

export default Template;
