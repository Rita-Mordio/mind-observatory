import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EditDiary from '../Screens/EditDiary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

const EditDiaryStack = createStackNavigator();

const EditDiaryStackScreen = ({ navigation }) => {
  return (
    <EditDiaryStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#efc4cd',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <EditDiaryStack.Screen
        name="EditDiary"
        component={EditDiary}
        options={{
          title: '일기 쓰기',
          headerLeft: () => (
            <Ionicons.Button
              name="arrow-back-outline"
              size={30}
              backgroundColor="#efc4cd"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
          headerRight: () => (
            <FontAwesome.Button
              name="edit"
              size={24}
              backgroundColor="#efc4cd"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        }}
      />
    </EditDiaryStack.Navigator>
  );
};

export default EditDiaryStackScreen;
