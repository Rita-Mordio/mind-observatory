import {
  Text,
  View,
  Button,
  TouchableWithoutFeedback,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import React, { Component } from 'react';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

Icon.loadFont();

// const Template = () => {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>여기는 템플릿~</Text>
//       <Icon name="heart" size={30} color="#900" />
//     </View>
//   );
// };

class Template extends Component {
  state = {
    activeIndex: 0,
    carouselItems: [
      {
        content: (
          <View style={{ flex: 1 }}>
            <Text style={{ flex: 1 }}>여기는 글씨~</Text>
            <Image
              style={{ flex: 5 }}
              source={{
                uri:
                  'https://www.city.kr/files/attach/images/164/943/875/011/e1e97d5f0c06cfb58e466a21ee8f9d2b.png',
              }}
            />
          </View>
        ),
      },
      {
        content: (
          <View style={{ flex: 1 }}>
            <Image
              style={{ flex: 5 }}
              source={{
                uri:
                  'https://www.city.kr/files/attach/images/164/943/875/011/e1e97d5f0c06cfb58e466a21ee8f9d2b.png',
              }}
            />
            <Text style={{ flex: 1 }}>여기는 글씨~</Text>
          </View>
        ),
      },
      {
        content: (
          <View style={{ flex: 1 }}>
            <Image
              style={{ flex: 1 }}
              source={{
                uri:
                  'https://i.pinimg.com/originals/52/b3/9c/52b39cd0e5b9499fc2e0f3ec7184202f.jpg',
              }}
            />
            <Text style={{ flex: 1 }}>여기는 글씨~</Text>
          </View>
        ),
      },
      {
        content: <View style={{ flex: 1 }}>
          <Text style={{ flex: 1 }}>여기는 글씨~</Text>
          <Image
              style={{ flex: 1 }}
              source={{
                uri:
                    'https://i.pinimg.com/originals/52/b3/9c/52b39cd0e5b9499fc2e0f3ec7184202f.jpg',
              }}
          />
        </View>,
      },
      {
        content: <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <Image
                style={{ flex: 1, margin: 10 }}
                source={{
                  uri:
                      'https://i.pinimg.com/originals/52/b3/9c/52b39cd0e5b9499fc2e0f3ec7184202f.jpg',
                }}
            />
            <Image
                style={{ flex: 1, margin: 10 }}
                source={{
                  uri:
                      'https://i.pinimg.com/originals/52/b3/9c/52b39cd0e5b9499fc2e0f3ec7184202f.jpg',
                }}
            />
          </View>
          <Text style={{flex: 1}}>
            여기는 글자~
          </Text>
        </View>,
      },
    ],
  };

  _onPressCarousel = () => {
    alert('템플릿을 터치했어요~');
  };

  _renderItem = ({ item, index }) => {
    // const image =require('../../Assets/Image/' + item.image)

    return (
      <TouchableWithoutFeedback onPress={this._onPressCarousel}>
        <View
          style={{
            backgroundColor: 'floralwhite',
            borderRadius: 5,
            flex: 1,
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
          }}
        >
          {item.content}
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

export default Template;
