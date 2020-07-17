import {
  Text,
  View,
  SafeAreaView,
  Dimensions,
  TouchableWithoutFeedback, StatusBar,
} from 'react-native';
import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// const Home = () => {
//   return (
//       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//         <Text>여기는 홈~</Text>
//         <Icon name="heart" size={30} color="#900" />
//       </View>
//   );
// }

class Home extends Component {
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
      {
        title: 'Item 3',
        text: 'Text 3',
      },
      {
        title: 'Item 4',
        text: 'Text 4',
      },
      {
        title: 'Item 5',
        text: 'Text 5',
      },
    ],
  };

  _onPressCarousel = () => {
    alert("일기를 터치했어요~")
  }

  _renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={this._onPressCarousel}>
        <View style={{
          backgroundColor: 'floralwhite',
          borderRadius: 5,
          flex: 1,
          padding: 50,
          marginLeft: 0,
          marginRight: 0,
          marginBottom: 30,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
          elevation: 10,
        }}>
          <Text style={{ fontSize: 30 }}>{item.title}</Text>
          <Text>{item.text}</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  render() {
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: 30, backgroundColor: '#fff' }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Carousel
            layout={'default'}
            ref={(ref) => (this.carousel = ref)}
            data={this.state.carouselItems}
            sliderWidth={screenWidth}
            itemWidth={300}
            renderItem={this._renderItem}
            onSnapToItem={(index) => this.setState({ activeIndex: index })}
          />
        </View>
      </SafeAreaView>
    );
  }
}

export default Home;
