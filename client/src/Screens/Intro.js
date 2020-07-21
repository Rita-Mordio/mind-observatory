import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const Intro = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Image
          animation="bounce"
          duration={2500}
          iterationDelay={1500}
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="stretch"
          iterationCount="infinite"
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.title}>당신의 마음을 남겨봐요</Text>
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
    backgroundColor: '#efc4cd',
  },
  header: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
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
    color: '#9e9e9e',
    fontFamily: 'NotoSerifKR-Regular',
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
