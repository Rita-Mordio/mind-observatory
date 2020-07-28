import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import EditDiary from "../Screens/EditDiary";
import Icon from 'react-native-vector-icons/Ionicons';

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
              <Icon.Button
                name="arrow-back-outline"
                size={30}
                backgroundColor="#efc4cd"
                onPressOut={() => {
                    navigation.goBack();
                }}
                // onPress={() => {
                //   navigation.goBack();
                // }}
              />
            ),
          }}
        />
      </EditDiaryStack.Navigator>
    );
};

export default EditDiaryStackScreen;
