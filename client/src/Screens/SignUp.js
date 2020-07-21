import {
  Text,
  View,
  TouchableOpacity,
  Keyboard,
  TextInput,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import * as React from 'react';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FeatherIcon from 'react-native-vector-icons/Feather';
import LinearGradient from 'react-native-linear-gradient';
import * as Animatable from 'react-native-animatable';

const SignUp = ({ navigation }) => {
  const [data, setData] = React.useState({
    id: '',
    password: '',
    confirm_password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });

  const handleIdChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        id: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        id: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };

  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/*<StatusBar backgroundColor="#9DC8C8" barStyle="dark-content" />*/}
        <View style={styles.header}>
          <Text style={styles.text_header}>회원가입</Text>
        </View>
        <Animatable.View style={styles.footer} animation="fadeInUpBig">
          <Text style={styles.text_footer}>ID</Text>
          <View style={styles.action}>
            <FontAwesomeIcon name="user-o" color="#05375a" size={20} />
            <TextInput
              placeholder="당신의 소중한 아이디"
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleIdChange(val)}
            />
            {data.check_textInputChange ? (
              <Animatable.View animation="bounceIn">
                <FeatherIcon name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {/*<Text>이미 사용중인 아이디</Text>*/}
          <Text style={[styles.text_footer, { marginTop: 20 }]}>Password</Text>
          <View style={styles.action}>
            <FontAwesomeIcon name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="당신의 비밀스런 비밀번호"
              secureTextEntry={data.secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handlePasswordChange(val)}
            />
            <TouchableOpacity onPress={updateSecureTextEntry}>
              {data.secureTextEntry ? (
                <FeatherIcon name="eye-off" color="gray" size={20} />
              ) : (
                <FeatherIcon name="eye" color="gray" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <Text style={[styles.text_footer, { marginTop: 20 }]}>Confirm Password</Text>
          <View style={styles.action}>
            <FontAwesomeIcon name="lock" color="#05375a" size={20} />
            <TextInput
              placeholder="중요한 건 한번 더 체크"
              secureTextEntry={data.confirm_secureTextEntry ? true : false}
              style={styles.textInput}
              autoCapitalize="none"
              onChangeText={(val) => handleConfirmPasswordChange(val)}
            />
            <TouchableOpacity onPress={updateConfirmSecureTextEntry}>
              {data.confirm_secureTextEntry ? (
                <FeatherIcon name="eye-off" color="gray" size={20} />
              ) : (
                <FeatherIcon name="eye" color="gray" size={20} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity style={styles.signIn}>
              <LinearGradient colors={['#9dc8c8', '#58c9b9']} style={styles.signIn}>
                <Text style={[styles.textSign, { color: '#2b2b2b' }]}>회원가입</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
              style={[
                styles.signIn,
                {
                  borderColor: '#9DC8C8',
                  borderWidth: 1,
                  marginTop: 15,
                },
              ]}
            >
              <Text style={[styles.textSign, { color: '#2b2b2b' }]}>로그인하러 갈래요</Text>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#9DC8C8',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: Platform.OS === 'ios' ? 3 : 5,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#2b2b2b',
    fontFamily: 'Nanum Pen',
    fontSize: 50,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontFamily: 'NotoSerifKR-Medium',
  },
  textPrivate: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 20,
  },
  color_textPrivate: {
    color: 'grey',
  },
});
