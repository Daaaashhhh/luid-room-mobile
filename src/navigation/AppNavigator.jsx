import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  View,
  Text,
  Alert,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import HomeScreen from '../screens/homes/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import CreateDesign from '../screens/CreateDesign';
import GenerateImage from '../screens/GenerateImage';
import SplashScreen from '../screens/SplashScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

// Import assets
import Menu from '../../assets/images/menu.png';
import Profile from '../../assets/images/profile.jpg';
import apiService from '../services/apiService';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// Custom Drawer Content
const CustomDrawerContent = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const response = await apiService.getProfile();
      setUserData(response);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userToken');
              navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
            } catch (error) {
              console.error('Error logging out:', error);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return (
    <View style={styles.drawerContainer}>
      {/* Profile Section */}
      <View style={styles.drawerHeader}>
        <Image source={Profile} style={styles.drawerProfileImage} />
        {loading ? (
          <ActivityIndicator size="small" color="#FF7B7B" />
        ) : (
          <>
            <Text style={styles.drawerProfileName}>
              {userData?.firstName} {userData?.lastName}
            </Text>
            <Text style={styles.drawerProfileEmail}>{userData?.email}</Text>
          </>
        )}
      </View>

      {/* Menu Items */}
      <View style={styles.drawerBody}>
        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.drawerItemText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.drawerItemText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Create Design')}>
          <Text style={styles.drawerItemText}>Create Design</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.drawerItem}
          onPress={() => navigation.navigate('Generate Image')}>
          <Text style={styles.drawerItemText}>Generate Image</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

// Drawer Navigator
const MainDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({navigation}) => ({
        headerTransparent: true,
        headerTitle: '',
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.headerIcon}>
            <Image source={Menu} style={styles.menuIcon} />
          </TouchableOpacity>
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.headerIcon}>
            <Image source={Profile} style={styles.profileIcon} />
          </TouchableOpacity>
        ),
        headerBackground: () => (
          <LinearGradient
            colors={['#F8F9FA', '#F8F9FA']}
            style={styles.headerBackground}
          />
        ),
      })}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      <Drawer.Screen name="Create Design" component={CreateDesign} />
      <Drawer.Screen name="Generate Image" component={GenerateImage} />
    </Drawer.Navigator>
  );
};

// Main Navigator with Auth Flow
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash screen */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />

        {/* Auth screens */}
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={SignUpScreen}
          options={{headerShown: false}}
        />

        {/* Main app screen (with drawer) */}
        <Stack.Screen
          name="MainApp"
          component={MainDrawer}
          options={{headerShown: false}}
        />

        {/* Forgot Password screen */}
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
          options={{headerShown: false}}
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
    backgroundColor: 'white',
    padding: 5,
  },
  profileIcon: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
  headerBackground: {
    flex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  drawerHeader: {
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  drawerProfileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  drawerProfileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2D3436',
    marginBottom: 4,
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
  },
  drawerProfileEmail: {
    fontSize: 14,
    color: '#636E72',
    fontFamily: 'Outfit-Regular',
    textAlign: 'center',
  },
  drawerBody: {
    flex: 1,
    paddingTop: 16,
  },
  drawerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  drawerItemText: {
    fontSize: 16,
    color: '#2D3436',
    marginLeft: 32,
    fontFamily: 'Outfit-Medium',
  },
  logoutButton: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
    marginBottom: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    color: '#FF7B7B',
    textAlign: 'center',
    fontFamily: 'Outfit-Bold',
  },
});

export default AppNavigator;
