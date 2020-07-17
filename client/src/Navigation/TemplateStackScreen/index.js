import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import Template from '../../Screens/Template';

Icon.loadFont();

const TemplateStack = createStackNavigator();

const TemplateStackScreen = ({ navigation }) => {
  return (
    <TemplateStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5977e8',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <TemplateStack.Screen
        name="Template"
        component={Template}
        options={{
          title: '템플릿',
          headerLeft: () => (
            <Icon.Button
              name="ios-arrow-round-back"
              size={30}
              backgroundColor="#5977e8"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          // headerRight: () => <Image.Button name="ios-create" size={25} backgroundColor="#5977e8" />,
        }}
      />
    </TemplateStack.Navigator>
  );
};

export default TemplateStackScreen;
