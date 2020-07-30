import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from 'react-native-paper';

import Context from '../Redux/contexts/context';

const DrawerContentScreen = (props) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const { signOut } = useContext(Context);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri:
                    'https://fimg4.pann.com/new/download.jsp?FileID=50483715',
                }}
                size={50}
              />
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>김신예</Title>
                <Caption style={styles.caption}>
                  오늘은 어떤 일이 기다릴까요?
                </Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  80
                </Paragraph>
                <Caption style={styles.caption}>일의 기록이 있어요</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({ color, size }) => (
                <Icon name="ios-home" color={color} size={size} />
              )}
              label="홈"
              onPress={() => {
                props.navigation.navigate('Home');
              }}
            />
            {/* <DrawerItem*/}
            {/*     icon={({ color, size }) => <Icon name="ios-create" color={color} size={size} />}*/}
            {/*     label="일기 작성"*/}
            {/*     onPress={() => {*/}
            {/*       props.navigation.navigate('Template');*/}
            {/*     }}*/}
            {/* />*/}
            {/* <DrawerItem*/}
            {/*   icon={({ color, size }) => <Icon name="ios-cog" color={color} size={size} />}*/}
            {/*   label="설정"*/}
            {/*   onPress={() => {*/}
            {/*     props.navigation.navigate('Setting');*/}
            {/*   }}*/}
            {/*/>*/}
          </Drawer.Section>
          <Drawer.Section title="테마 변경">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
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
    </View>
  );
};

export default DrawerContentScreen;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
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
