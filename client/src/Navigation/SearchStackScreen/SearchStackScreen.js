import React from 'react';
import Search from '../../Screens/Search';
import Icon from 'react-native-vector-icons/Ionicons';
import { createStackNavigator } from '@react-navigation/stack';

Icon.loadFont();

const SearchStack = createStackNavigator();

const SearchStackScreen = ({ navigation }) => {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#BCC74F',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <SearchStack.Screen
        name="Observatory"
        component={Search}
        options={{
          title: '검색',
          headerLeft: () => (
            <Icon.Button
              name="ios-arrow-round-back"
              size={25}
              backgroundColor="#BCC74F"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          // headerRight: () => (
          //   <Icon.Button
          //     name="ios-create"
          //     size={25}
          //     backgroundColor="#BCC74F"
          //     onPress={() => {
          //       navigation.navigate('Template');
          //     }}
          //   />
          // ),
        }}
      />
    </SearchStack.Navigator>
  );
};

export default SearchStackScreen;
