import {
  Text,
  View,
  Image,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import * as React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

Icon.loadFont();

const Intro = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/*<StatusBar backgroundColor="#9DC8C8" barStyle="dark-content" />*/}
      <View style={styles.header}>
        <Animatable.Image
          animation="bounceIn"
          duraton="1500"
          source={require('../../Assets/Image/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>당신의 마음을 그려봐요</Text>
        <Text style={styles.text}>감성일기에 어서오세요</Text>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignIn');
            }}
          >
            <LinearGradient colors={['#9dc8c8', '#58c9b9']} style={styles.signIn}>
              <Text style={styles.textSign}>시작하기</Text>
              <Icon name="navigate-next" color="#2b2b2b" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Intro;

const { height } = Dimensions.get('screen');
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9DC8C8',
  },
  header: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: '#2b2b2b',
    fontSize: 45,
    fontFamily: 'Nanum Pen',
  },
  text: {
    color: 'grey',
    fontFamily: 'NotoSerifKR-ExtraLight',
    marginTop: 5,
  },
  button: {
    alignItems: 'flex-end',
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: '#2b2b2b',
    fontFamily: 'NotoSerifKR-Bold',
  },
});
