import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar, Drawer } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import COMMON from '../common';
import Context from '../Redux/contexts/context';
import Alert from '../Components/Alert';

//##################################
//##################################
//############# Styled #############
//##################################
//##################################

const Container = styled.View`
  flex: 1;
`;

const DrawerContent = styled.View`
  flex: 1;
`;

const UserInfoSection = styled.View`
  padding-left: 20px;
`;

const AvatarContent = styled.View`
  flex-direction: row;
  margin-top: 15px;
`;

const NicknameSection = styled.View`
  margin-left: 15px;
  flex-direction: column;
`;

const Nickname = styled.Text`
  color: #3f3e3c;
  font-size: 16px;
  font-weight: bold;
  margin-top: 3px;
`;

const AvatarCaption = styled.Text`
  color: #3f3e3c;
  font-size: 13px;
  margin-top: 2px;
`;

const HistorySection = styled.View`
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
`;

const Day = styled.Text`
  color: #3f3e3c;
  font-size: 14px;
  font-weight: bold;
  margin-right: 3px;
`;

const HistoryCaption = styled.Text`
  color: #3f3e3c;
  font-size: 14px;
`;

//###################################
//###################################
//############ Component ############
//###################################
//###################################

const DrawerContentScreen = (props) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const [alertData, setAlertData] = useState({
    show: false,
    message: '',
    onConfirmPressed: null,
  });

  const { signOut, setHeader, setHistoryCount, getCommon } = useContext(
    Context,
  );

  useEffect(() => {
    getHistoryCount();
  }, []);

  const getHistoryCount = () => {
    COMMON.getStoreData(
      '@historyCount',
      (value) => {
        if (!COMMON.isEmptyValue(value)) {
          setHistoryCount(value);
        }
      },
      (error) => {
        setAlertData({
          ...alertData,
          show: true,
          message: '기록 전체 개수 정보를 가져오는데 문제가 발생하였습니다.',
        });
      },
    );
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <Container>
      <DrawerContentScrollView {...props}>
        <DrawerContent>
          <UserInfoSection>
            <AvatarContent>
              <Avatar.Image
                source={{
                  uri:
                    'https://fimg4.pann.com/new/download.jsp?FileID=50483715',
                }}
                size={50}
              />
              <NicknameSection>
                <Nickname>김신예</Nickname>
                <AvatarCaption>오늘은 어떤 일이 있었나요?</AvatarCaption>
              </NicknameSection>
            </AvatarContent>
            <HistorySection>
              <Day>{getCommon().historyCount}</Day>
              <HistoryCaption>일의 기록이 있어요</HistoryCaption>
            </HistorySection>
          </UserInfoSection>
          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="ios-home" color={color} size={size} />
              )}
              label="홈"
              onPress={() => {
                setHeader({
                  headerColor: '#efc4cd',
                  headerTitle: '내 마음 관측소',
                });
                props.navigation.navigate('ObservatoryTab');
              }}
            />
          </Drawer.Section>

          <Drawer.Section>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="ios-settings" color={color} size={size} />
              )}
              label="내 정보 변경"
              onPress={() => {
                props.navigation.navigate('MyAccount');
              }}
            />
          </Drawer.Section>

          <Drawer.Section>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="ios-chatbubbles-sharp" color={color} size={size} />
              )}
              label="문의하기"
              onPress={() => {
                props.navigation.navigate('Support');
              }}
            />
          </Drawer.Section>

          <Drawer.Section>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon
                  name="information-circle-sharp"
                  color={color}
                  size={size}
                />
              )}
              label="앱 정보"
              onPress={() => {
                props.navigation.navigate('AppInfo');
              }}
            />
          </Drawer.Section>

          {/*<Drawer.Section title="테마 변경">*/}
          {/*  <TouchableRipple*/}
          {/*    onPress={() => {*/}
          {/*      toggleTheme();*/}
          {/*    }}*/}
          {/*  >*/}
          {/*    <View style={styles.preference}>*/}
          {/*      <Text>Dark Theme</Text>*/}
          {/*      <View pointerEvents="none">*/}
          {/*        <Switch value={isDarkTheme} />*/}
          {/*      </View>*/}
          {/*    </View>*/}
          {/*  </TouchableRipple>*/}
          {/*</Drawer.Section>*/}
        </DrawerContent>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => (
            <Icon name="md-exit" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>

      <Alert alertData={alertData} setAlertData={setAlertData} />
    </Container>
  );
};

export default DrawerContentScreen;

const styles = StyleSheet.create({
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
