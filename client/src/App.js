import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.view}>
        <View>
          <Text style={styles.text}>안녕하세요!</Text>
          <Text style={styles.text2}>안녕하세요!</Text>
        </View>
      </SafeAreaView>
    </>
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
