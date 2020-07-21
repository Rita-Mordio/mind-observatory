import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'

const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.view}>
        <View>
          <Text style={styles.text}>안녕하세요!</Text>
          <Text style={styles.text2}>안녕하세요!</Text>
        </View>
      </SafeAreaView>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center"
  },
  text: {
    fontFamily: 'Nanum Pen'
  },
  text2: {
    fontFamily: 'NotoSerifKR-Regular'
  }
});

export default App;
