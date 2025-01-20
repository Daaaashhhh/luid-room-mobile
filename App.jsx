import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { TouchableOpacity, Image, View, Text, StyleSheet } from 'react-native';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/homes/HomeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CreateDesign from './src/screens/CreateDesign';
import Menu from './assets/images/menu.png';
import Profile from './assets/images/profile.jpg';
import LinearGradient from 'react-native-linear-gradient'; // Import LinearGradient
import GenerateImage from './src/screens/GenerateImage';

import 'react-native-gesture-handler';
import 'react-native-reanimated';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  return (
    <Drawer.Navigator
      screenOptions={({ navigation }) => ({
        headerTransparent: true,
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.headerIcon}
          >
            <Image
              source={Menu}
              style={styles.menuIcon}
            />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.headerIcon}
          >
            <Image
              source={Profile}
              style={styles.profileIcon}
            />
          </TouchableOpacity>
        ),
        headerBackground: () => (
          <LinearGradient
            colors={['#F8F9FA', '#F8F9FA']} // Gradient colors
            style={styles.headerBackground}
          />
        ),
      })}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Create Design" component={CreateDesign} />
      <Drawer.Screen name="Generate Image" component={GenerateImage} />
    </Drawer.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainDrawer">
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainDrawer"
          component={MainDrawer}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerIcon: {
    marginHorizontal: 16,
    padding: 8,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'white', // White background to enhance icon visibility
    padding: 5,
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white', // Border for better visibility
  },
  headerBackground: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
});

export default App;
